from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from enums.payment_method import PaymentMethod
from enums.payment_status import PaymentStatus
from datetime import datetime

class Payment(Base, BaseModel):
    __tablename__ = "payment"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    method = Column(Enum(PaymentMethod), nullable=False)
    paid_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False)
    
    def mark_as_paid(self, session):
        """Mark payment as paid."""
        self.status = PaymentStatus.PAID
        return self.save(session)
    
    def mark_as_failed(self, session):
        """Mark payment as failed."""
        self.status = PaymentStatus.FAILED
        return self.save(session)
    
    def mark_as_cancelled(self, session):
        """Cancel payment."""
        self.status = PaymentStatus.CANCELLED
        return self.save(session)
    
    @classmethod
    def get_payment_by_order_id(cls, session, order_id):
        """Get payment information based on order_id."""
        return cls.get_by_id(session, order_id)
    
    @classmethod
    def get_payments_by_status(cls, session, status):
        """Get all payments by status."""
        return session.query(cls).filter_by(status=status).all()
    
    @classmethod
    def create_payment(cls, session, order_id, amount, method):
        """Create a new payment."""
        new_payment = cls(order_id=order_id, amount=amount, method=method)
        return new_payment.add(session)
    
    def to_dict(self):
        self.to_dict