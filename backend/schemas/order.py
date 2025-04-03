# schemas/order.py
from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class OrderBase(BaseModel):
    """Schema cơ bản, bao gồm các trường có thể có khi tạo/cập nhật."""
    user_id: Optional[int] = None
    shipping_info_id: int
    total_amount: int 
    final_amount: int
    order_date: int
    status: int

class OrderSchema(OrderBase):
    """Schema để đọc dữ liệu Order, bao gồm id."""
    id: int

    # Cấu hình để Pydantic đọc dữ liệu từ ORM model
    # Pydantic V2:
    model_config = ConfigDict(from_attributes=True)

    # Pydantic V1:
    # class Config:
    #     orm_mode = True

# Tùy chọn: Schema cho response dạng list
class OrderListResponse(BaseModel):
     data: List[OrderSchema]