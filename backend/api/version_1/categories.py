from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.category import Category
from schemas.category import CategorySchema
import os
import shutil
import logging

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

from models.role import Role
from schemas.role import  RoleResponse

@router.get(
    "/",
    response_model=List[CategorySchema],
    summary="Retrieve all categories",
    description="This API returns a list of all categories, including descriptions and icon URLs."
)
def get_all_categories(
    session: Session = Depends(get_db)
):
    """
    Endpoint to retrieve all Category records.
    """
    try:
        # Use the get_all method from the Category model
        categories = Category.get_all(session)
        if not categories:
            return []
        return categories
    except Exception as e:
        # Log the error and raise an HTTP exception
        print(f"Error fetching categories: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying categories.")


@router.post(
    "/",
    response_model=CategorySchema,
    summary="Create a new category",
    description="This API allows creating a new category with a name, description, parent ID, and an icon file."
)
async def create_category(
    name: str = Form(...),
    description: str = Form(None),
    parent_id: int = Form(None),
    icon_file: UploadFile = Form(...),
    session: Session = Depends(get_db)
):
    """
    Endpoint to create a new Category record.
    """

    
    try:
        # Save the uploaded file to the server
        upload_dir = "d:/HK6/OOP_PROGRAMING/PROJECT/fashion_store_oop/backend/media/icons"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, icon_file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(icon_file.file, buffer)

        # Validate parent_id
        if parent_id is not None:
            parent_category = Category.get_by_id(session, parent_id)
            if not parent_category:
                parent_id = None  # Set to NULL if parent_id is invalid
        
        # Create a new category instance
        new_category = Category(
            name=name,
            description=description,
            parent_id=parent_id,
            icon_url=file_path  # Save the file path as the icon_url
        )
        new_category.save(session)  # Save the new category to the database

        return new_category
    except Exception as e:
        print(f"Error creating category: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error while creating category. {e}")