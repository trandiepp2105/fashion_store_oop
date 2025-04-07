# schemas/order.py
from pydantic import BaseModel
from typing import List, Optional
from schemas.product import ProductSchema  # added import for ProductSchema

class VariantSchema(BaseModel):
    """Schema for product variant details."""
    id: int
    color: str
    size: str

# NEW: Schema for product variant information from the product variant table
class ProductVariantSchema(BaseModel):
    id: int
    image_url: Optional[str] = None
    variant: VariantSchema

class OrderItemSchema(BaseModel):
    """Schema for an order item."""
    id: int
    product: ProductSchema  # replaced product_id with product schema
    product_variant: ProductVariantSchema  # updated field remains
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

class UserSchema(BaseModel):
    """Schema for user details."""
    id: int
    name: str
    email: str
    phone_number: str

class OrderSchema(BaseModel):
    """Schema for reading order data."""
    id: int
    user: UserSchema
    shipping_info: ShippingInfoSchema
    order_date: str
    status: str
    total_amount: float
    final_amount: float
    order_items: List[OrderItemSchema]

    class Config:
        orm_mode = True

class OrderListResponse(BaseModel):
    """Schema for a list of orders."""
    data: List[OrderSchema]