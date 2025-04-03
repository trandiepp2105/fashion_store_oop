from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class OrderReturnBase(BaseModel):
    """Schema cơ bản, bao gồm các trường có thể có khi tạo/cập nhật."""
    id: int
    order_id: int
    total_refund: float 
    total_items: int
    status: str
    general_reason: Optional[str] = None
    created_at: datetime
    processed_at:Optional[datetime] = None         

class OrderReturnSchema(OrderReturnBase):
    """Schema để đọc dữ liệu OrderReturn, bao gồm id."""
    id: int

    # Cấu hình để Pydantic đọc dữ liệu từ ORM model
   
    class Config:
        orm_mode = True

# Tùy chọn: Schema cho response dạng list
class OrderReturnListResponse(BaseModel):
     data: List[OrderReturnSchema]