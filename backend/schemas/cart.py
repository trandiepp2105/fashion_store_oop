from pydantic import BaseModel
from typing import List

class CartItemSchema(BaseModel):
    product_id: int
    variant_id: int
    quantity: int

    class Config:
        orm_mode = True

class CartItemsList(BaseModel):
    items: List[CartItemSchema]

class CartItemResponse(BaseModel):
    id: int  # Add the cart item ID
    product_id: int
    product_name: str
    variant_id: int
    size: str
    color: str
    quantity: int

    class Config:
        orm_mode = True