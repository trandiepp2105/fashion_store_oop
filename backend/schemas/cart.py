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