from enum import Enum

class OrderStatus(Enum):
    PENDING = "PENDING"
    PACKAGED = "PACKED"
    SHIPPING = "DELIVERING"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"
    RETURNED = "RETURNED"
    @classmethod
    def choices(cls):
        return [(status.value, status.name) for status in cls]