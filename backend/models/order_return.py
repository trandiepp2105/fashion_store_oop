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

    def approve_return(self, session):
        self.status = "Approved"
        self.calculate_total_refund()
        self.processed_at = current_timestamp()
        return self.save(session)

    def reject_return(self, session, reason):
        self.status = "Rejected"
        self.general_reason = reason
        self.processed_at = current_timestamp()
        return self.save(session)
    
    def calculate_total_refund(self):
        """Recalculate total refund amount"""
        self.total_refund = sum(item.refund_amount for item in self.items)
        self.total_items = sum(item.quantity_returned for item in self.items)
    
    def update_status(self, session, new_status):
        """Update return status"""
        self.status = new_status
        return self.save(session)
    
    @classmethod
    def get_returns_by_status(cls, session, status):
        return session.query(cls).filter_by(status=status).all()
    
    @classmethod
    def get_return_by_order(cls, session, order_id):
        return cls.get_by_id(session, order_id)
    
    @classmethod
    def get_all_returns(cls, session):
        """Retrieve all order returns"""
        return cls.get_all(session)
    
    @classmethod
    def filter_by_order_id(cls, session, order_id):
        """Filter order returns by order_id"""
        return session.query(cls).filter_by(order_id=order_id).all()
    
    @classmethod
    def filter_by_status(cls, session, status):
        """Filter order returns by status"""
        return session.query(cls).filter_by(status=status).all()
    
    def to_dict(self):
        """Convert objects to dictionaries for easy handling"""
        return self.to_dict

# models/order_item_return.py
class OrderItemReturn(Base):
    __tablename__ = "orderitemreturn"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_return_id = Column(Integer, ForeignKey("orderreturn.id", ondelete="CASCADE"), nullable=False)
    order_item_id = Column(Integer, ForeignKey("orderitem.id", ondelete="CASCADE"), nullable=False)
    quantity_returned = Column(Integer, nullable=False)
    refund_amount = Column(DECIMAL(10, 2), nullable=False)
    return_reason = Column(Text)
    
    # order_return = relationship("OrderReturn", back_populates="items")
    # order_item = relationship("OrderItem", back_populates="returns")

    def __repr__(self):
        return f"<OrderItemReturn(id={self.id}, order_item_id={self.order_item_id}, quantity={self.quantity_returned})>"

    def set_refund_amount(self,session, amount):
        """Update refund amount for product"""
        if amount >= 0:
            self.refund_amount = amount
            return self.save(session)
        else:
            raise ValueError("Refund amount cannot be negative")

    def update_quantity(self, session, quantity):
        """Update the number of returned products"""
        self.quantity_returned = quantity
        return self.save(session)

    def set_return_reason(self,session, reason):
        """Set up return reason"""
        self.return_reason = reason
        return self.save(session)
    
    @classmethod
    def get_return_items_by_order(cls, session, order_return_id):
        return cls.get_by_id(session, order_return_id)
    
    @classmethod
    def get_all_return_items(cls, session):
        """Retrieve all returned items"""
        return cls.get_all(session)
    
    @classmethod
    def filter_by_order_return_id(cls, session, order_return_id):
        """Filter order item returns by order_return_id"""
        return session.query(cls).filter_by(order_return_id=order_return_id).all()
    
    @classmethod
    def filter_by_order_item_id(cls, session, order_item_id):
        """Filter order item returns by order_item_id"""
        return session.query(cls).filter_by(order_item_id=order_item_id).all()
    
    @classmethod
    def filter_by_product_id(cls, session, product_id):
        """Filter order item returns by product_id"""
        return session.query(cls).filter_by(product_id=product_id).all()

    def to_dict(self):
        """Convert objects to dictionaries for easy handling"""
        return self.to_dict

    