from enum import Enum

class PaymentMethod(Enum):
    CREDIT_CARD = "CREDIT CARD"
    DEBIT_CARD = "DEBIT CARD"
    PAYPAL = "PAYPAL"
    GOOGLE_PAY = "GOOGLE PAY"
    APPLE_PAY = "APPLE PAY"
    CASH_ON_DELIVERY = "CASH ON DELIVERY"
    
    @classmethod
    def choices(cls):
        return [(payment_method.value, payment_method.name) for payment_method  in cls]