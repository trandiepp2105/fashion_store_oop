from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    original_price: int
    selling_price: int
    total_ratings: Optional[int] = 0
    rating_sum: Optional[int] = 0
    image_url: str            

class ProductResponse(BaseModel):
    id: int
    name: str
    selling_price: int
    image_url: Optional[str] = None
    rating: Optional[float] = None
    discount_price: Optional[float] = None
    stock: int
    supplier: Optional[dict] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    original_price: Optional[int] = None
    selling_price: Optional[int] = None
    total_ratings: Optional[int] = 0
    rating_sum: Optional[int] = 0
    image_url: Optional[str] = None