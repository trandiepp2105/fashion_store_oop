from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, DateTime, Enum
from sqlalchemy import ForeignKey
from enums.sale_type import SaleType
from datetime import datetime, timezone

class Sale(Base, BaseModel):
    __tablename__ = "sales"
    
    name = Column(String(255), nullable=False)
    description = Column(Text)
    type = Column(Enum(SaleType), nullable=False)
    value = Column(Integer, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    #Kiểm tra xem đợt sale có còn không
    def is_active(self):
        now = datetime.now(timezone.utc)
        return self.start_date <= now <= self.end_date


class SaleProduct(Base):
    __tablename__ = "sale_products"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="CASCADE"), nullable=False, primary_key=True)

    def __repr__(self):
        return f"<SaleProduct(product_id={self.product_id}, sale_id={self.sale_id})>"
    
    @classmethod
    def add_pro_to_sale(self, session, product_id):
        #Nếu đã tồn tại, trả về luôn
        if (sale_product := session.query(SaleProduct).filter_by(sale_id=self.id, product_id=product_id).first()):
            return sale_product
        #Nếu chưa tồn tại, tạo mới
        sale_product = SaleProduct(sale_id=self.id, product_id=product_id)
        session.add(sale_product)
        session.commit()
        return sale_product


class SaleCategory(Base):
    __tablename__ = "sale_categories"
    
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="CASCADE"), nullable=False, primary_key=True)

    def __repr__(self):
        return f"<SaleCategory(category_id={self.category_id}, sale_id={self.sale_id})>"
    
    @classmethod
    def add_cate_to_sale(self, session, category_id):
        #Nếu đã tồn tại, trả về luôn
        if (sale_category := session.query(SaleCategory).filter_by(sale_id=self.id, category_id=category_id).first()):
            return sale_category  

        #Nếu chưa tồn tại, tạo mới
        sale_category = SaleCategory(sale_id=self.id, category_id=category_id)
        session.add(sale_category)
        session.commit()
        return sale_category


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

    #Kiểm tra xem đợt coupon có còn không
    def is_active(self):
        now = datetime.now(timezone.utc)
        return self.start_date <= now <= self.end_date

    def is_valid(self, order_value, usage_count):
        #Kiểm tra còn hiệu lực
        if not self.is_active():
            return False
        
        #Kiểm tra giá trị đơn hàng
        if order_value < self.min_order_value:
            return False
        
        #Kiểm tra số lần sử dụng
        if self.usage_limit is not None and usage_count >= self.usage_limit:
            return False
        return True


