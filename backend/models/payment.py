from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from enums.payment_method import PaymentMethod
from enums.payment_status import PaymentStatus
from datetime import datetime

class Payment(Base):
    """
    Represents a payment associated with an order.

    Attributes:
        id (int): The unique identifier for the payment.
        order_id (int): The ID of the associated order.
        amount (int): The payment amount.
        status (PaymentStatus): The current status of the payment.
        method (PaymentMethod): The payment method used.
        paid_at (datetime): The timestamp when the payment was completed.
        created_at (datetime): The timestamp when the payment was created.
    """
    __tablename__ = "payment"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    method = Column(Enum(PaymentMethod), nullable=False)
    paid_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False)
    
    def __init__(self, order_id: int, amount: int, method: PaymentMethod):
        """
        Initializes a new Payment instance.

        Args:
            order_id (int): The ID of the associated order.
            amount (int): The payment amount.
            method (PaymentMethod): The payment method used.
        """
        self.order_id = order_id
        self.amount = amount
        self.method = method
        self.status = PaymentStatus.PAID if method == PaymentMethod.PAY_IN_STORE else PaymentStatus.PENDING
        self.paid_at = datetime.now() if self.status == PaymentStatus.PAID else None
        self.created_at = datetime.now()

    def mark_as_paid(self, session):
        """
        Marks the payment as paid.

        Args:
            session (Session): The database session.

        Returns:
            Payment: The updated payment instance.
        """
        self.status = PaymentStatus.PAID
        return self.save(session)
    
    def mark_as_failed(self, session):
        """
        Marks the payment as failed.

        Args:
            session (Session): The database session.

        Returns:
            Payment: The updated payment instance.
        """
        self.status = PaymentStatus.FAILED
        return self.save(session)
    
    def mark_as_cancelled(self, session):
        """
        Cancels the payment.

        Args:
            session (Session): The database session.

        Returns:
            Payment: The updated payment instance.
        """
        self.status = PaymentStatus.CANCELLED
        return self.save(session)
    
    @classmethod
    def get_payment_by_order_id(cls, session, order_id):
        """
        Retrieves payment information for a specific order ID.

        Args:
            session (Session): The database session.
            order_id (int): The ID of the order.

        Returns:
            Payment: The payment instance associated with the order, or None if not found.
        """
        return session.query(cls).filter_by(order_id=order_id).first()

    @classmethod
    def get_payments_by_status(cls, session, status):
        """
        Retrieves all payments with a specific status.

        Args:
            session (Session): The database session.
            status (PaymentStatus): The status to filter payments by.

        Returns:
            list[Payment]: A list of payments with the specified status.
        """
        return session.query(cls).filter(cls.status == status).all()
