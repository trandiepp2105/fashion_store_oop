from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp

class OrderReturn(Base):
    __tablename__ = "orderreturn"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    total_refund = Column(DECIMAL(10, 2), nullable=False)
    total_items = Column(Integer, nullable=False)
    status = Column(Enum("Pending", "Completed", "Refunded", "Rejected", name="order_return_status"), nullable=False)
    general_reason = Column(Text)
    created_at = Column(DateTime, default=current_timestamp)
    processed_at = Column(DateTime, nullable=True)
    
    # order = relationship("Order", back_populates="returns")
    # items = relationship("OrderItemReturn", back_populates="order_return")

    def __repr__(self):
        return f"<OrderReturn(id={self.id}, order_id={self.order_id}, status={self.status})>"

    def approve_return(self):
        """Accept return request"""
        self.status = "approved"
        self.calculate_total_refund()
        self.set_processed_time()

    def reject_return(self, reason):
        """Reject return request and note reason"""
        self.status = "rejected"
        self.general_reason = reason
        self.set_processed_time()

    def calculate_total_refund(self):
        """Calculate total refund based on returned products"""
        self.total_refund = sum(item.refund_amount for item in self.items)
        self.total_items = sum(item.quantity_returned for item in self.items)

    def get_return_items(self):
        """Get a list of returned products"""
        return self.items

    def set_processed_time(self):
        """Update return request processing time"""
        self.processed_at = datetime.utcnow()
    
    def to_dict(self):
        """Convert objects to dictionaries for easy handling"""
        return {
            "id": self.id,
            "order_id": self.order_id,
            "total_refund": float(self.total_refund),
            "total_items": self.total_items,
            "status": self.status,
            "general_reason": self.general_reason,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "processed_at": self.processed_at.isoformat() if self.processed_at else None,
        }

# models/order_item_return.py
class OrderItemReturn(Base):
    __tablename__ = "orderitemreturn"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_return_id = Column(Integer, ForeignKey("order_returns.id", ondelete="CASCADE"), nullable=False)
    order_item_id = Column(Integer, ForeignKey("order_items.id", ondelete="CASCADE"), nullable=False)
    quantity_returned = Column(Integer, nullable=False)
    refund_amount = Column(DECIMAL(10, 2), nullable=False)
    return_reason = Column(Text)
    
    # order_return = relationship("OrderReturn", back_populates="items")
    # order_item = relationship("OrderItem", back_populates="returns")

    def __repr__(self):
        return f"<OrderItemReturn(id={self.id}, order_item_id={self.order_item_id}, quantity={self.quantity_returned})>"

    def set_refund_amount(self, amount):
        """Update refund amount for product"""
        if amount >= 0:
            self.refund_amount = amount
        else:
            raise ValueError("Refund amount cannot be negative")

    def update_quantity(self, quantity):
        """Update the number of returned products"""
        if quantity > 0:
            self.quantity_returned = quantity
        else:
            raise ValueError("Quantity returned must be greater than 0")

    def set_return_reason(self, reason):
        """Set up return reason"""
        self.return_reason = reason

    def to_dict(self):
        """Convert objects to dictionaries for easy handling"""
        return {
            "id": self.id,
            "order_return_id": self.order_return_id,
            "order_item_id": self.order_item_id,
            "quantity_returned": self.quantity_returned,
            "refund_amount": float(self.refund_amount),
            "return_reason": self.return_reason,
        }

    