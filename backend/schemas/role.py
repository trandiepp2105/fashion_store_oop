# schemas/role.py
from pydantic import BaseModel
from typing import Optional
from enums.role import Role

class RoleCreate(BaseModel):
    name: str
    description: Optional[str] = None

class RoleResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        orm_mode = True

class RoleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None