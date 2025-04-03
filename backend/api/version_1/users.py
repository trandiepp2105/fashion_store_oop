from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Import necessary components
from database.session import get_db
from models.user import User
from schemas.user import UserResponse, UserCreate, UserUpdate

router = APIRouter()

# GET /users - Lấy tất cả người dùng
@router.get(
    "/",
    response_model=list[UserResponse],
    summary="Retrieve all users",
    description="This API returns a list of all users, including descriptions and icon URLs."
)
def get_all_users(
    session: Session = Depends(get_db)
):
    try:
        users = User.get_all(session)
        if not users:
            return []
        return users
    except Exception as e:
         # Log the error and raise an HTTP exception
         print(f"Error fetching users: {e}")
         raise HTTPException(status_code=500, detail="Internal server error while querying users.")

# POST /users - Tạo người dùng mới
@router.post(
    "/",
    response_model=UserResponse,
    summary="Retrieve all users",
    description="This API returns a list of all users, including descriptions and icon URLs."
)
def create_user(
    user_data: UserCreate, session: Session = Depends(get_db)
):
    try:
        # Sử dụng create_or_get để tìm người dùng theo email hoặc tạo mới nếu không có
        new_user = User.create_or_get(session, email=user_data.email)
        
        if not new_user:
            # Nếu không tìm thấy người dùng, tạo một người dùng mới
            new_user = User(**user_data.dict())
            new_user.set_password(user_data.password)
            new_user.save(session)
        
        return new_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating user: {e}")

# GET /users/{id} - Lấy thông tin người dùng theo ID
@router.get(
    "/{id}",
    response_model=UserResponse,
    summary="Retrieve all users",
    description="This API returns a list of all users, including descriptions and icon URLs."
)
def get_user_by_id(
    id: int, session: Session = Depends(get_db)
):
    user = User.get_by_id(session, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# PATCH /users/{id} - Cập nhật thông tin người dùng
@router.patch(
    "/{id}",
    response_model=UserResponse,
    summary="Retrieve all users",
    description="This API returns a list of all users, including descriptions and icon URLs."
)
def update_user(
    id: int, user_data: UserUpdate, session: Session = Depends(get_db)
):
    user = User.get_by_id(session, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.update_info(session, **user_data.dict(exclude_unset=True))
    return user

# DELETE /users/{id} - Xóa người dùng
@router.delete(
    "/{id}",
    summary="Retrieve all users",
    description="This API returns a list of all users, including descriptions and icon URLs."
)
def delete_user(
    id: int, session: Session = Depends(get_db)
):
    user = User.get_by_id(session, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.delete(session)
    return {"message": "User deleted successfully"}