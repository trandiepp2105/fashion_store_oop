from enum import Enum

class Role(Enum):
    ADMIN = "ADMIN"
    CUSTOMER = "CUSTOMER"
    STAFF = "STAFF"

    @classmethod
    def choices(cls):
        return [(role.value, role.name) for role in cls]
