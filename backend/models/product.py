from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Product(Base, BaseModel):
    __tablename__ = "products"

    supplier_id = Column(Integer, ForeignKey("suppliers.id", ondelete="SET NULL"), nullable=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    original_price = Column(Integer, nullable=False)
    selling_price = Column(Integer, nullable=False)
    total_ratings = Column(Integer, default=0)
    rating_sum = Column(Integer, default=0)    
    image_url = Column(String(255), nullable=True)
    
    # Relationships(relations) with other tables
    categories = relationship("ProductCategory", back_populates="product")
    variants = relationship("ProductVariant", back_populates="product")
    supplier = relationship("Supplier", back_populates="products")
    def __repr__(self):
        return f"<Product(name={self.name}, price={self.price})>"
    
    def update_stock(self, session, quantity):
        self.stock_quantity += quantity
        session.commit()


class ProductVariant(Base, BaseModel):
    __tablename__ = "product_variants"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text)
    variant_id = Column(Integer, ForeignKey("variants.id", ondelete="CASCADE"), nullable=False)
    stock_quantity = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)

    product = relationship("Product", back_populates="variants")
    
    def __repr__(self):
        return f"<ProductVariant(name={self.name}, price={self.price})>"
    
    def update_stock(self, session, quantity):
        self.stock_quantity += quantity
        session.commit()

class ProductCategory(Base):
    __tablename__ = "product_categories"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    
    product = relationship("Product", back_populates="categories")
    category = relationship("Category", back_populates="products")