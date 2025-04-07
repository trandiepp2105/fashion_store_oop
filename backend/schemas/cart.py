from pydantic import BaseModel
from typing import List, Optional
class AddProductToCartSchema(BaseModel):
    product_id: int
    variant_id: int
    quantity: int
class VariantSchema(BaseModel):
    id: int
    color: str
    size: str

    class Config:
        orm_mode = True

class ProductVariantSchema(BaseModel):
    id: int
    stock_quantity: int
    image_url: Optional[str]
    variant: VariantSchema  # Nested schema for variant details

    class Config:
        orm_mode = True

class ProductSchema(BaseModel):
    id: int
    name: str
    selling_price: int
    discount_price: Optional[int]  # Add discount_price
    image_url: Optional[str]

    class Config:
        orm_mode = True

class CartItemResponse(BaseModel):
    id: int  # Cart item ID
    product: ProductSchema
    variant: ProductVariantSchema  # Updated to use ProductVariantSchema
    quantity: int

    class Config:
        orm_mode = True

# class CartItemsList(BaseModel):
#     items: List[CartItemResponse]