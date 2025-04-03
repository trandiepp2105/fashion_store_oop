from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.role import Role
from schemas.role import RoleCreate, RoleResponse

import os
import shutil
import logging

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.get(
    path="/",
    response_model=List[RoleResponse],
    summary="Retrieve all roles",
    description="This API returns a list of all roles, including descriptions and icon URLs."
)
def get_all_roles(
    session: Session = Depends(get_db)
):
    """
    Endpoint to retrieve all Role records.
    """
    try:
        # Use the get_all method from the Role model
        roles = Role.get_all(session)
        if not roles:
            return []
        return roles
    except Exception as e:
        # Log the error and raise an HTTP exception
        print(f"Error fetching roles: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying roles.")
