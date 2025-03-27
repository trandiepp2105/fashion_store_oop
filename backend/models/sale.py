from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, DateTime, Enum
from sqlalchemy import ForeignKey
from enums.sale_type import SaleType

class Sale(Base, BaseModel):
    __tablename__ = "sales"
    
    name = Column(String(255), nullable=False)
    description = Column(Text)
    type = Column(Enum(SaleType), nullable=False)
    value = Column(Integer, nullable = False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

class SaleProduct(Base):
    __tablename__ = "sale_products"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="CASCADE"), nullable=False, primary_key=True)

class SaleCategory(Base):
    __tablename__ = "sale_categories"
    
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="CASCADE"), nullable=False, primary_key=True)

class Coupon(Base, BaseModel):
    __tablename__ = "coupons"
    
    code = Column(String(255), nullable=False)
    description = Column(Text)
    type = Column(Enum(SaleType), nullable=False)
    value = Column(Integer, nullable=False)
    min_order_value = Column(Integer, nullable=False)
    discount_limit = Column(Integer)
    usage_limit = Column(Integer)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)