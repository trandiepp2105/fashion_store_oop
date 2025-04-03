from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class PaymentBase(BaseModel):
    """Schema cơ bản, bao gồm các trường có thể có khi tạo/cập nhật."""
    id: int
    order_id: int
    amount: int
    status: str
    method: str
    paid_at: datetime
    created_at: datetime

class PaymentSchema(PaymentBase):
    """Schema để đọc dữ liệu Payment, bao gồm id."""
    id: int

    # Cấu hình để Pydantic đọc dữ liệu từ ORM model
    # Pydantic V2:
    # model_config = ConfigDict(from_attributes=True)

    # Pydantic V1:
    class Config:
        orm_mode = True

# Tùy chọn: Schema cho response dạng list
class PaymentListResponse(BaseModel):
     data: List[PaymentSchema]