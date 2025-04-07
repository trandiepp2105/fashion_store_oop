from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.sql.functions import current_timestamp
from models.sale import Sale, SaleProduct
from enums.sale_type import SaleType
class Product(Base, BaseModel):
    __tablename__ = "product"

    supplier_id = Column(Integer, ForeignKey("supplier.id", ondelete="SET NULL"), nullable=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    original_price = Column(Integer, nullable=False)
    selling_price = Column(Integer, nullable=False)
    total_rating = Column(Integer, default=0)
    rating_sum = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)


    def __repr__(self):
        return f"<Product(name={self.name}, selling_price={self.selling_price})>"

    #Tính đánh giá trung bình
    def get_average_rating(self):
        if self.total_rating > 0:
            return self.rating_sum / self.total_rating
        return None
    
    @classmethod
    def filter_by_name(cls, session, name):
        return session.query(cls).filter(cls.name.ilike(f"%{name}%")).all()

    @classmethod
    def filter_by_supplier(cls, session, supplier_id):
        return session.query(cls).filter_by(supplier_id=supplier_id).all()

    @classmethod
    def filter_by_price(cls, session, min_price=0, max_price=float("inf")):
        return session.query(cls).filter(cls.selling_price.between(min_price, max_price)).all()

    @classmethod
    def filter_by_category(cls, session, category_id):
        return session.query(cls).join(ProductCategory).filter(ProductCategory.category_id == category_id).all()

    @classmethod
    def filter_by_stock(cls, session, min_stock=0, max_stock=float("inf")):
        from sqlalchemy.sql import func
        stock_subquery = (
            session.query(ProductVariant.product_id, func.sum(ProductVariant.stock_quantity).label("total_stock"))
            .group_by(ProductVariant.product_id)
            .subquery()
        )
        return (
            session.query(cls)
            .join(stock_subquery, cls.id == stock_subquery.c.product_id)
            .filter(stock_subquery.c.total_stock.between(min_stock, max_stock))
            .all()
        )

    def get_variants(self, session):
        return session.query(ProductVariant).filter_by(product_id=self.id).all()

    def get_total_stock(self, session):
        from sqlalchemy.sql import func
        stock_subquery = (
            session.query(func.sum(ProductVariant.stock_quantity).label("total_stock"))
            .filter(ProductVariant.product_id == self.id)
            .scalar()
        )
        return stock_subquery or 0

    def get_discount_price(self, session):

        sale_product = session.query(SaleProduct).join(Sale).filter(
            SaleProduct.product_id == self.id,
            Sale.type == SaleType.PERCENTAGE,
            Sale.start_date <= datetime.now(),
            Sale.end_date >= datetime.now()
        ).first()

        if sale_product:
            sale = session.query(Sale).filter(Sale.id == sale_product.sale_id).first()
            if sale:
                discount = (self.selling_price * sale.value) / 100
                return max(0, self.selling_price - discount)
        return self.selling_price

    def get_supplier(self, session):
        from models.supplier import Supplier
        supplier = session.query(Supplier).filter(Supplier.id == self.supplier_id).first()
        if supplier:
            supplier.id = str(supplier.id)  # Ensure supplier.id is a string
        return supplier

    @classmethod
    def add_variant(cls, session, product_id, variant_id, stock, image_url):
        product_variant = session.query(ProductVariant).filter_by(product_id=product_id, variant_id=variant_id).first()
        if product_variant:
            raise ValueError("Variant already exists for this product")
        product_variant = ProductVariant(
            product_id=product_id,
            variant_id=variant_id,
            stock_quantity=stock,
            image_url=image_url
        )
        session.add(product_variant)
        return product_variant

    def get_sales(self, session):
        """
        Retrieve all sales associated with this product.

        Args:
            session (Session): The database session.

        Returns:
            List[Sale]: A list of sales associated with the product.
        """
        from models.sale import Sale, SaleProduct
        return (
            session.query(Sale)
            .join(SaleProduct, Sale.id == SaleProduct.sale_id)
            .filter(SaleProduct.product_id == self.id)
            .all()
        )

class ProductRaing(Base):
    __tablename__ = "productrating"
    __table_args__ = {"extend_existing": True}
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    rating = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=current_timestamp)

class ProductVariant(Base):
    __tablename__ = "productvariant"
    __table_args__ = {"extend_existing": True}
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    variant_id = Column(Integer, ForeignKey("variant.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    stock_quantity = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, server_default=func.current_timestamp(), nullable=False)
    updated_at = Column(DateTime, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)

    def __repr__(self):
        return f"<ProductVariant(variant_id={self.variant_id}, stock_quantity={self.stock_quantity})>"
    
    @classmethod
    def filter_by_stock(cls, session, min_stock=0, max_stock=float("inf")):
        return session.query(cls).filter(cls.stock_quantity.between(min_stock, max_stock)).all()

class ProductCategory(Base):
    __tablename__ = "productcategory"
    __table_args__ = {"extend_existing": True}
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    category_id = Column(Integer, ForeignKey("category.id", ondelete="CASCADE"), nullable=False, primary_key=True)

    def __repr__(self):
        return f"<ProductCategory(product_id={self.product_id}, category_id={self.category_id})>"
