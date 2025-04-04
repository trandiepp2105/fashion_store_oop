from pydantic import BaseModel
from typing import Optional, List, Dict

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


class VariantResponse(BaseModel):
    variant_id: int  # ID of the product variant
    size: str
    color: str
    stock: int
    image_url: Optional[str]

    class Config:
        orm_mode = True

class ProductDetail(BaseModel):
    id: int
    name: str
    original_price: int
    selling_price: int
    discount_price: int
    description: Optional[str]
    image_url: Optional[str]
    rating: Optional[float]
    stock: int
    supplier: Optional[Dict[str, Optional[str]]]
    category: Dict
    variants: List[VariantResponse]  # Use VariantResponse for variants

    class Config:
        orm_mode = True