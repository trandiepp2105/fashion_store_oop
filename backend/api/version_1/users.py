from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict

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
    description="This API returns a list of all users with their roles and statuses."
)
def get_all_users(
    session: Session = Depends(get_db)
):
    try:
        users = User.get_all(session)
        if not users:
            return []

        user_list = []
        for user in users:
            # Get roles for the user
            user_roles = UserRole.get_roles_by_user(session, user.id)
            roles = [
                {"id": str(role.role_id), "name": session.query(Role).get(role.role_id).name}
                for role in user_roles
            ]

            # Map user data to the response schema
            user_list.append({
                "id": user.id,
                "name": user.name,
                "phone_number": user.phone_number,
                "email": user.email,
                "status": user.active,
                "roles": roles,
                "join_date": user.created_at.strftime("%d/%m/%Y") if user.created_at else None
            })

        return user_list
    except Exception as e:
         # Log the error and raise an HTTP exception
         print(f"Error fetching users: {e}")
         raise HTTPException(status_code=500, detail="Internal server error while querying users.")

# POST /users - Tạo người dùng mới
@router.post(
    "/",
    # response_model=UserResponse,
    summary="Create a new user",
    description="This API creates a new user and assigns the CUSTOMER role."
)
def create_user(
    user_data: UserCreate, session: Session = Depends(get_db)
):
    print(f"[DEBUG] Creating user: {user_data}")

    try:
        # Check if the user already exists
        existing_user = User.filter_by_email(session, user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Check if the phone number already exists
        existing_phone = User.filter_by_phone_number(session, user_data.phone_number)
        if existing_phone:
            raise HTTPException(status_code=400, detail="Phone number already exists")
        
        # Create a new user
        new_user = User(
            user_data.name,
            user_data.email,
            user_data.password,
            user_data.phone_number,
        )
        new_user.save(session)
        session.commit()  # Commit sau khi lưu user

        # Get or create the CUSTOMER role
        customer_role, _ = Role.get_or_create(session, name=RoleEnum.CUSTOMER.value)
        session.commit()  # Commit sau khi lấy role

        # Assign the CUSTOMER role to the new user
        UserRole.assign_role_to_user(session, user_id=new_user.id, role_id=customer_role.id)
        session.commit()  # Commit sau khi gán role

        return new_user.to_dict()
    except Exception as e:
        print(f"[DEBUG] Error in create_user: {repr(e)}")
        session.rollback()  # Rollback nếu có lỗi
        raise HTTPException(status_code=500, detail=f"Error creating user: {repr(e)}")

# POST /users/admin - Tạo admin user
@router.post(
    "/admin",
    # response_model=UserResponse,
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

# UPDATED: GET /me - Retrieve the current authenticated user's information
@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user info",
    description="Retrieve the authenticated user's information using current user dependency."
)
def get_current_user_info(session: Session = Depends(get_db), current_user: User = Depends(User.get_current_user)):
    user_roles = UserRole.get_roles_by_user(session, current_user.id)
    roles = [
        {"id": str(role.role_id), "name": session.query(Role).get(role.role_id).name}
        for role in user_roles
    ]
    
    return {
        "id": current_user.id,
        "name": current_user.name,
        "phone_number": current_user.phone_number,
        "email": current_user.email,
        "status": current_user.active,
        "roles": roles,
        "join_date": current_user.created_at.strftime("%d/%m/%Y") if hasattr(current_user, "created_at") and current_user.created_at else None
    }
# GET /users/{id} - Lấy thông tin người dùng theo ID

@router.get(
    "/{id}",
    response_model=UserResponse,
    summary="Get user information by ID",
    description="Retrieve user information by ID, including roles and status(using by admin)."
)
def get_user_detail(
    id: int, session: Session = Depends(get_db)
):
    user = User.get_by_id(session, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get roles for the user
    user_roles = UserRole.get_roles_by_user(session, user.id)
    roles = [
        {"id": str(role.role_id), "name": session.query(Role).get(role.role_id).name}
        for role in user_roles
    ]

    # Map user data to the response schema
    return {
        "id": user.id,
        "name": user.name,
        "phone_number": user.phone_number,
        "email": user.email,
        "status": user.active,
        "roles": roles,
        "join_date": user.created_at.strftime("%d/%m/%Y") if user.created_at else None
    }

# PATCH /users/{id} - Cập nhật thông tin người dùng
@router.patch(
    "/{id}",
    response_model=UserResponse,
    summary="Update user information",
    description="Update user information by ID(using by admin)."
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
    summary="Delete a user by ID",
    description="Delete a user by ID(using by admin)."
)
def delete_user(
    id: int, session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    user = User.get_by_id(session, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    
    user.delete(session)
    return {"message": "User deleted successfully"}

