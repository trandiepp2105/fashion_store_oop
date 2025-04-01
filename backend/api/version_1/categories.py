from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Import necessary components
from database.session import get_db
from models.category import Category
from schemas.category import CategorySchema

router = APIRouter()

@router.get(
    "/",
    response_model=List[CategorySchema],
    summary="Retrieve all categories",
    description="This API returns a list of all categories, including descriptions and icon URLs."
)
def get_all_categories(
    db: Session = Depends(get_db)
):
    """
    Endpoint to retrieve all Category records.
    """
    try:
        # Use the get_all method from the Category model
        categories = Category.get_all(db)
        if not categories:
            return []
        return categories
    except Exception as e:
        # Log the error and raise an HTTP exception
        print(f"Error fetching categories: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying categories.")