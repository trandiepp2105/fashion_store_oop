from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.sql.functions import current_timestamp

class Product(Base, BaseModel):
    __tablename__ = "product"

    supplier_id = Column(Integer, ForeignKey("supplier.id", ondelete="SET NULL"), nullable=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    original_price = Column(Integer, nullable=False)
    selling_price = Column(Integer, nullable=False)
    total_ratings = Column(Integer, default=0)
    rating_sum = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)


    def __repr__(self):
        return f"<Product(name={self.name}, selling_price={self.selling_price})>"

    #Tính đánh giá trung bình
    def get_average_rating(self):
        if self.total_ratings > 0:
            return self.rating_sum / self.total_ratings
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

class ProductRaing(Base):
    __tablename__ = "productrating"
    __table_args__ = {"extend_existing": True}
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    rating = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=current_timestamp)

class ProductVariant(Base, BaseModel):
    __tablename__ = "productvariant"
    
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    variant_id = Column(Integer, ForeignKey("variant.id", ondelete="CASCADE"), nullable=False)
    stock_quantity = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)
    
    def __repr__(self):
        return f"<ProductVariant(variant_id={self.variant_id}, stock_quantity={self.stock_quantity})>"
    
    @classmethod
    def filter_by_stock(cls, session, min_stock=0, max_stock=float("inf")):
        return session.query(cls).filter(cls.stock_quantity.between(min_stock, max_stock)).all()

class ProductCategory(Base):
    __tablename__ = "product_categories"
    __table_args__ = {"extend_existing": True}
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    category_id = Column(Integer, ForeignKey("category.id", ondelete="CASCADE"), nullable=False, primary_key=True)

    def __repr__(self):
        return f"<ProductCategory(product_id={self.product_id}, category_id={self.category_id})>"
