from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, DateTime, Enum
from sqlalchemy import ForeignKey
from enums.sale_type import SaleType
from datetime import datetime

class Sale(Base, BaseModel):
    __tablename__ = "sales"
    
    name = Column(String(255), nullable=False)
    description = Column(Text)
    type = Column(Enum(SaleType), nullable=False)
    value = Column(Integer, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    def is_active(self):
        """Kiểm tra xem đợt sale có đang hoạt động hay không."""
        now = datetime.utcnow()
        return self.start_date <= now <= self.end_date

    def to_dict(self):
        """Chuyển đổi đối tượng Sale thành dict."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "type": self.type.name if self.type else None,
            "value": self.value,
            "start_date": self.start_date.isoformat() if self.start_date else None,
            "end_date": self.end_date.isoformat() if self.end_date else None,
        }

class SaleProduct(Base):
    __tablename__ = "sale_products"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="CASCADE"), nullable=False, primary_key=True)

    def __repr__(self):
        return f"<SaleProduct(product_id={self.product_id}, sale_id={self.sale_id})>"

class SaleCategory(Base):
    __tablename__ = "sale_categories"
    
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="CASCADE"), nullable=False, primary_key=True)

    def __repr__(self):
        return f"<SaleCategory(category_id={self.category_id}, sale_id={self.sale_id})>"

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

    def is_active(self):
        """Kiểm tra xem coupon có còn hiệu lực theo thời gian không."""
        now = datetime.utcnow()
        return self.start_date <= now <= self.end_date

    def is_valid(self, order_value, usage_count):
        """
        Kiểm tra xem coupon có hợp lệ dựa trên:
         - Có đang còn hiệu lực không.
         - Giá trị đơn hàng có đủ không.
         - Số lần sử dụng đã vượt quá giới hạn hay chưa.
        """
        if not self.is_active():
            return False
        if order_value < self.min_order_value:
            return False
        if self.usage_limit is not None and usage_count >= self.usage_limit:
            return False
        return True

    def to_dict(self):
        """Chuyển đổi đối tượng Coupon thành dict."""
        return {
            "id": self.id,
            "code": self.code,
            "description": self.description,
            "type": self.type.name if self.type else None,
            "value": self.value,
            "min_order_value": self.min_order_value,
            "discount_limit": self.discount_limit,
            "usage_limit": self.usage_limit,
            "start_date": self.start_date.isoformat() if self.start_date else None,
            "end_date": self.end_date.isoformat() if self.end_date else None,
        }
