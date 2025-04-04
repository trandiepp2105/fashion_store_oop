from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, Query, Path, Body
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request
from pydantic import BaseModel

# Import necessary components
from database.session import get_db
from models.category import Category
from schemas.category import CategorySchema, NestedCategorySchema  # Import the new schema
import os
import shutil
import logging
from schemas.category import UpdateCategorySchema
# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

from models.role import Role
from schemas.role import RoleResponse



@router.get(
    "/",
    response_model=List[NestedCategorySchema],
    summary="Retrieve all categories",
    description="This API returns all categories in a nested JSON format, ensuring each category appears only once."
)
def get_all_categories(
    session: Session = Depends(get_db)
):
    """
    Endpoint to retrieve all categories in a nested JSON format.
    """
    try:
        # Fetch all categories
        categories = Category.get_all(session)
        if not categories:
            return []

        # Create a dictionary to map categories by their ID
        category_map = {category.id: category for category in categories}

        # Build the nested structure
        nested_categories = []
        for category in categories:
            if category.parent_id:
                # If the category has a parent, add it as a subcategory
                parent = category_map.get(category.parent_id)
                if parent:
                    if not hasattr(parent, "subcategories"):
                        parent.subcategories = []
                    parent.subcategories.append(category)
            else:
                # If the category has no parent, it's a top-level category
                nested_categories.append(category)

        # Convert the top-level categories to nested dictionaries
        return [category.to_nested_dict(session) for category in nested_categories]
    except Exception as e:
        print(f"Error fetching categories: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying categories.")


@router.get(
    "/{category_id}",
    response_model=NestedCategorySchema,
    summary="Retrieve a specific category by ID",
    description="This API returns a specific category and its subcategories."
)
def get_category_by_id(
    category_id: int = Path(..., description="Category ID to fetch a specific category"),
    session: Session = Depends(get_db)
):
    """
    Endpoint to retrieve a specific category by its ID, including its subcategories.
    """
    try:
        category = Category.get_by_id(session, category_id)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

        # Fetch all categories to build the nested structure
        categories = Category.get_all(session)
        if not categories:
            raise HTTPException(status_code=404, detail="No categories found")

        # Create a dictionary to map categories by their ID
        category_map = {cat.id: cat for cat in categories}

        # Build the nested structure for the requested category
        for cat in categories:
            if cat.parent_id:
                parent = category_map.get(cat.parent_id)
                if parent:
                    if not hasattr(parent, "subcategories"):
                        parent.subcategories = []
                    parent.subcategories.append(cat)

        # Convert the requested category to a nested dictionary
        return category.to_nested_dict(session)
    except Exception as e:
        print(f"Error fetching category by ID: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying category.")


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
        upload_dir = "d:/HK6/OOP_PROGRAMING/PROJECT/fashion_store_oop/backend/media/icons/"
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


@router.delete(
    "/{category_id}",
    summary="Delete a category by ID",
    description="This API deletes a category by its ID.",
    status_code=204
)
def delete_category(
    category_id: int = Path(..., description="Category ID to delete"),
    session: Session = Depends(get_db)
):
    """
    Endpoint to delete a category by its ID.
    """
    try:
        category = Category.get_by_id(session, category_id)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

        category.delete(session)  # Delete the category from the database
        return {"message": "Category deleted successfully"}
    except Exception as e:
        print(f"Error deleting category: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while deleting category.")


@router.put(
    "/{category_id}",
    response_model=CategorySchema,
    summary="Update a category by ID",
    description="This API updates the name and description of a specific category."
)
def update_category(
    category_id: int = Path(..., description="Category ID to update"),
    update_data: UpdateCategorySchema = Body(...),
    session: Session = Depends(get_db)
):
    """
    Endpoint to update a category's name and description.
    """
    try:
        category = Category.get_by_id(session, category_id)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

        # Use the update_info method to update the category
        category.update_info(session, name=update_data.name, description=update_data.description)

        return category
    except Exception as e:
        print(f"Error updating category: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while updating category.")