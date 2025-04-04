from pydantic import BaseModel

class ShippingInfoCreate(BaseModel):
    """Schema for creating a new shipping info."""
    recipient_name: str
    phone_number: str
    province_city: str
    district: str
    ward_commune: str
    specific_address: str
    is_default: bool = False

class ShippingInfoUpdate(BaseModel):
    """Schema for updating an existing shipping info."""
    recipient_name: str | None = None
    phone_number: str | None = None
    province_city: str | None = None
    district: str | None = None
    ward_commune: str | None = None
    specific_address: str | None = None
    is_default: bool | None = None

class ShippingInfoSchema(BaseModel):
    """Schema for retrieving shipping info."""
    id: int
    recipient_name: str
    phone_number: str
    province_city: str
    district: str
    ward_commune: str
    specific_address: str
    is_default: bool

    class Config:
        orm_mode = True
