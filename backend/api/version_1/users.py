from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Import necessary components
from database.session import get_db
from models.user import User
from models.role import Role, UserRole
from schemas.user import UserResponse, UserCreate, UserUpdate
from enums.role import Role as RoleEnum

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
    summary="Create a new user",
    description="This API creates a new user and assigns the CUSTOMER role."
)
def create_user(
    user_data: UserCreate, session: Session = Depends(get_db)
):
    try:
        # Check if the user already exists
        existing_user = User.filter_by_email(session, user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        # Create a new user
        new_user = User(
            user_data.name,
            user_data.email,
            user_data.password,
            user_data.phone_number,
        )
        new_user.save(session)

        # Get or create the CUSTOMER role
        customer_role, _ = Role.get_or_create(session, name=RoleEnum.CUSTOMER.value)

        # Assign the CUSTOMER role to the new user
        UserRole.assign_role_to_user(session, user_id=new_user.id, role_id=customer_role.id)

        return new_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"user data: {user_data}. Error creating user: {e}")

# POST /users/admin - Tạo admin user
@router.post(
    "/admin",
    response_model=UserResponse,
    summary="Create an admin user",
    description="This API creates a new admin user and assigns the ADMIN role."
)
def create_admin_user(
    user_data: UserCreate, session: Session = Depends(get_db)
):
    try:
        # Check if the user already exists
        existing_user = User.filter_by_email(session, user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        # Create a new user
        new_user = User(
            user_data.name,
            user_data.email,
            user_data.password,
            user_data.phone_number,
        )
        new_user.save(session)

        # Get or create the ADMIN role
        admin_role, _ = Role.get_or_create(session, name=RoleEnum.ADMIN.value)

        # Assign the ADMIN role to the new user
        UserRole.assign_role_to_user(session, user_id=new_user.id, role_id=admin_role.id)

        return new_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"user data: {user_data}. Error creating admin user: {e}")

# POST /users/staff - Tạo staff user
@router.post(
    "/staff",
    response_model=UserResponse,
    summary="Create a staff user",
    description="This API creates a new staff user and assigns the STAFF role."
)
def create_staff_user(
    user_data: UserCreate, session: Session = Depends(get_db)
):
    try:
        # Check if the user already exists
        existing_user = User.filter_by_email(session, user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        # Create a new user
        new_user = User(
            user_data.name,
            user_data.email,
            user_data.password,
            user_data.phone_number,
        )
        new_user.save(session)

        # Get or create the STAFF role
        staff_role, _ = Role.get_or_create(session, name=RoleEnum.STAFF.value)

        # Assign the STAFF role to the new user
        UserRole.assign_role_to_user(session, user_id=new_user.id, role_id=staff_role.id)

        return new_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"user data: {user_data}. Error creating staff user: {e}")

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