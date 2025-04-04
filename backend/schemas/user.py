# schemas/user.py
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
#from enums.role import Role

# Schema dùng để tạo người dùng mới
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    phone_number: str

# Schema dùng để trả về thông tin người dùng
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    #role: Role

    class Config:
        orm_mode = True

# Schema dùng để cập nhật thông tin người dùng
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    #role: Optional[Role] = None
    description: Optional[str] = None