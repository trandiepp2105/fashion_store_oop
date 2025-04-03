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
