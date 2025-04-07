from pydantic import BaseModel, field_validator
from typing import Optional
from enums.sale_type import SaleType
from datetime import datetime

class SaleCreate(BaseModel):
    name: str
    description: Optional[str] = None
    type: SaleType
    value: Optional[int] = None
    start_date: datetime 
    end_date: datetime  

class SaleResponse(BaseModel):
    """Schema for a sale."""
    id: int
    name: str
    description: str
    type: str
    value: int
    start_date: datetime
    end_date: datetime

    class Config:
        orm_mode = True

class SaleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    type: Optional[SaleType] = None
    value: Optional[int] = None
    start_date: Optional[datetime] = None 
    end_date: Optional[datetime] = None  
    is_active: Optional[bool] = None

