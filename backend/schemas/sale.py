from pydantic import BaseModel, field_validator
from typing import Optional
from enums.sale_type import SaleType
from datetime import datetime

class SaleCreate(BaseModel):
    name: str
    description: Optional[str] = None
    type: SaleType
    value: Optional[int] = None
    start_date: str 
    end_date: str  

    @field_validator("start_date", "end_date", mode="before")
    @classmethod
    def to_datetime(cls, value: str) -> datetime:
        try:
            return datetime.fromisoformat(value)  
        except ValueError:
            raise ValueError

class SaleResponse(SaleCreate):
    id: int
    is_active: bool

