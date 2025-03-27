from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp

class OrderReturn(Base):
    __tablename__ = "order_returns"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    total_refund = Column(DECIMAL(10, 2), nullable=False)
    total_items = Column(Integer, nullable=False)
    status = Column(Enum("pending", "approved", "rejected", name="order_return_status"), nullable=False)
    general_reason = Column(Text)
    created_at = Column(DateTime, default=current_timestamp)
    processed_at = Column(DateTime, nullable=True)
    
    order = relationship("Order", back_populates="returns")
    items = relationship("OrderItemReturn", back_populates="order_return")

# models/order_item_return.py
class OrderItemReturn(Base):
    __tablename__ = "order_item_returns"
    
    id = Column(Integer, primary_key=True, index=True)
    order_return_id = Column(Integer, ForeignKey("order_returns.id", ondelete="CASCADE"), nullable=False)
    order_item_id = Column(Integer, ForeignKey("order_items.id", ondelete="CASCADE"), nullable=False)
    quantity_returned = Column(Integer, nullable=False)
    refund_amount = Column(DECIMAL(10, 2), nullable=False)
    return_reason = Column(Text)
    
    order_return = relationship("OrderReturn", back_populates="items")
    order_item = relationship("OrderItem", back_populates="returns")