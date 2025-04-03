from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Import necessary components
from database.session import get_db
from models.role import Role
from schemas.role import RoleResponse, RoleCreate

router = APIRouter()

@router.get(
    "/",
    response_model=List[RoleResponse],
    summary="Retrieve all roles",
    description="This API returns a list of all roles, including descriptions and icon URLs."
)
def get_all_roles(
    session: Session = Depends(get_db)
):
    try:
        roles = Role.get_all(session)
        if not roles:
            return []
        return roles
    except Exception as e:
         # Log the error and raise an HTTP exception
         print(f"Error fetching roles: {e}")
         raise HTTPException(status_code=500, detail="Internal server error while querying roles.")

@router.post(
    "/",
    response_model=RoleResponse,
    summary="Create a new role",
    description="This API creates a new role with a name and an optional description."
)
def create_role(
    role_data: RoleCreate, session: Session = Depends(get_db)
):
    try:
        new_role = Role(**role_data.dict())  # Chuyển dữ liệu từ request vào model
        new_role.save(session)
        return new_role
    except Exception as e:
        
        raise HTTPException(status_code=500, detail=f"Internal server error while creating role.:{e}")

@router.get(
    "/{id}",
    response_model=RoleResponse,
    summary="Get role by ID",
    description="Retrieve role details by its ID."
)
def get_role_by_id(
    id: int, session: Session = Depends(get_db)
):
    role = Role.get_by_id(session, id)
    if not role:
        raise HTTPException(status_code=500, detail="Role not found")
    return role

@router.patch(
    "/{id}",
    response_model=RoleResponse,
    summary="Update role by ID",
    description="Update the name or description of a role."
)
def update_role(
    id: int, role_data: RoleCreate, session: Session = Depends(get_db)
):
    role = Role.get_by_id(session, id)
    if not role:
        raise HTTPException(status_code=500, detail="Role not found or update failed")

    # Cập nhật role với dữ liệu mới
    role.update_info(session, **role_data.dict(exclude_unset=True))
    return role

@router.delete(
    "/{id}",
    summary="Delete role by ID",
    description="Delete a role from the system."
)
def delete_role(
    id: int, session: Session = Depends(get_db)
):
    role = Role.get_by_id(session, id)
    if not role:
        raise HTTPException(status_code=500, detail="Role not found or deletion failed")

    role.delete(session)
    return {"message": "Role deleted successfully"}
