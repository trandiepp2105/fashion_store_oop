# schemas/category.py
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from fastapi import UploadFile

class CategoryBase(BaseModel):
    """Schema cơ bản, bao gồm các trường có thể có khi tạo/cập nhật."""
    name: str
    parent_id: Optional[int] = None
    description: Optional[str] = None # Thêm description, Optional vì nullable=True
    icon_url: str                   # Thêm icon_url, bắt buộc vì nullable=False

class CategorySchema(CategoryBase):
    """Schema để đọc dữ liệu Category, bao gồm id."""
    id: int

    # Cấu hình để Pydantic đọc dữ liệu từ ORM model
    # Pydantic V2:
    # model_config = ConfigDict(from_attributes=True)

    # Pydantic V1:
    # class Config:
    #     orm_mode = True

# Tùy chọn: Schema cho response dạng list
class CategoryListResponse(BaseModel):
     data: List[CategorySchema]

class NestedCategorySchema(BaseModel):
    id: int
    name: str
    description: Optional[str]
    parent_id: Optional[int]
    icon_url: Optional[str]
    subcategories: List['NestedCategorySchema'] = []  # Recursive definition

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True

class CreateCategorySchema(BaseModel):
    name: str
    description: Optional[str] = None
    parent_id: Optional[int] = None
    icon_url: Optional[str] = "https://resource-server/category-icon/default.png"  # Default icon URL

class UpdateCategorySchema(BaseModel):
    name: str
    description: str

    class Config:
        orm_mode = True