# schemas/order.py
from pydantic import BaseModel
from typing import List, Optional

class VariantSchema(BaseModel):
    """Schema for product variant details."""
    id: int
    color: str
    size: str

class OrderItemSchema(BaseModel):
    """Schema for an order item."""
    product_id: int
    variant: VariantSchema
    selling_price: float
    discount_price: Optional[float] = None
    quantity: int

class ShippingInfoSchema(BaseModel):
    """Schema for shipping information."""
    id: int
    recipient_name: str
    phone_number: str
    province_city: str
    district: str
    ward_commune: str
    specific_address: str
    is_default: bool

class OrderCreate(BaseModel):
    """Schema for creating a new order."""
    shipping_info_id: int
    cart_item_ids: List[int]

class OrderSchema(BaseModel):
    """Schema for reading order data."""
    id: int
    user_id: int
    shipping_info: ShippingInfoSchema
    status: str
    total_amount: float
    final_amount: float
    order_items: List[OrderItemSchema]

    class Config:
        orm_mode = True

class OrderListResponse(BaseModel):
    """Schema for a list of orders."""
    data: List[OrderSchema]