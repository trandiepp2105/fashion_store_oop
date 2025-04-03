from pydantic import BaseModel, field_validator
from typing import Optional
from enums.supplier_status import SupplierStatus
from datetime import datetime

class SupplierCreate(BaseModel):
    company_name: str
    contact_person: str
    email: str
    phone_number: str
    address: str
    tax_id: str
    website: Optional[str] = None
    status: SupplierStatus
    started_at: datetime

class SupplierResponse(SupplierCreate):
    id: int

class SupplierUpdate(BaseModel):
    company_name: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    tax_id: Optional[str] = None
    website: Optional[str] = None
    status: Optional[SupplierStatus] = None
    started_at: Optional[datetime] = None
