from enum import Enum

class PaymentMethod(Enum):
    CREDIT_CARD = "CREDIT CARD"
    BANK_TRANSFER = "BANK TRANSFER"
    CASH_ON_DELIVERY = "CASH ON DELIVERY"
    PAY_IN_STORE = "PAY IN STORE"
    @classmethod
    def choices(cls):
        return [(payment_method.value, payment_method.name) for payment_method  in cls]