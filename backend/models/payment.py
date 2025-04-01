from models.base import Base
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from enums.payment_method import PaymentMethod
from enums.payment_status import PaymentStatus

class Payment(Base):
    __tablename__ = "payment"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    method = Column(Enum(PaymentMethod), nullable=False)
    paid_at = Column(DateTime, nullable=True)
    create_at = Column(DateTime, nullable=False)
    def mark_as_paid(self, session):
        """Mark payment as paid."""
        self.status = PaymentStatus.PAID
        self.paid_at = datetime.utcnow()
        session.commit()
    
    def mark_as_failed(self, session):
        """Mark payment as failed."""
        self.status = PaymentStatus.FAILED
        session.commit()
    
    def mark_as_cancelled(self, session):
        """Cancel payment."""
        self.status = PaymentStatus.CANCELLED
        session.commit()
    
    @classmethod
    def get_payment_by_order_id(cls, session, order_id):
        """Get payment information based on order_id."""
        return session.query(cls).filter_by(order_id=order_id).first()
    
    @classmethod
    def create_payment(cls, session, order_id, amount, method):
        """Create a new payment."""
        new_payment = cls(order_id=order_id, amount=amount, method=method)
        session.add(new_payment)
        session.commit()
        return new_payment
    
    def to_dict(self):
        """Convert objects to dictionaries."""
        return {
            "id": self.id,
            "order_id": self.order_id,
            "amount": self.amount,
            "status": self.status.name,
            "method": self.method.name,
            "paid_at": self.paid_at.isoformat() if self.paid_at else None,
        }