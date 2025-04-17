from enum import Enum

class OrderStatus(Enum):
    PENDING = "PENDING"
    PACKED = "PACKED"
    DELIVERING = "DELIVERING"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"
    RETURNED = "RETURNED"
    @classmethod
    def choices(cls):
        return [(status.value, status.name) for status in cls]