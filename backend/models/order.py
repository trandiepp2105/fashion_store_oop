from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from enums.order_status import OrderStatus

class Order(Base, BaseModel):
    __tablename__ = "orders"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    shipping_info_id = Column(Integer, ForeignKey("shipping_infos.id", ondelete="SET NULL"), nullable=True)
    total_amount = Column(Integer, nullable=False)
    final_amount = Column(Integer, nullable=False)
    order_date = Column(DateTime, default=current_timestamp)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    payments = relationship("Payment", back_populates="order")
    
    def add_order(self, session):
        session.add(self)
        session.commit()

    def update_status(self, session, new_status):
        self.status = new_status
        session.commit()

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    variant_id = Column(Integer, ForeignKey("variants.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    
    order = relationship("Order", back_populates="items")
    product = relationship("Product")

class OrderCoupon(Base):
    __tablename__ = "order_coupons"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    coupon_id = Column(Integer, ForeignKey("coupons.id", ondelete="CASCADE"), nullable=False)
    
    order = relationship("Order")
    coupon = relationship("Coupon")