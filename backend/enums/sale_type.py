from enum import Enum

class SaleType(Enum):
    PERCENTAGE = "PERCENTAGE"
    FIXED = "FIXED"
    
    @classmethod
    def choices(cls):
        return [(sale_type.value, sale_type.name) for sale_type in cls]
