from enum import Enum

class PaymentStatus(Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"
    
    @classmethod
    def choices(cls):
        return [(payment_status.value, payment_status.name) for payment_status in cls]