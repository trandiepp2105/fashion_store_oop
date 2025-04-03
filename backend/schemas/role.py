from pydantic import BaseModel
from typing import Optional
from enums.role import Role

class RoleCreate(BaseModel):
    name: Role
    description: Optional[str]

class RoleResponse(BaseModel):
    id: int
    name: Role
    description: Optional[str]

    class Config:
        orm_mode = True
