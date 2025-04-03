from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.order import Order
from schemas.order import OrderSchema

router = APIRouter()

@router.get(
    "/",
    response_model=List[OrderSchema],
    summary="Retrieve all orders",
    description="This API returns a list of all orders, including descriptions and icon URLs."
)
def get_all_orders(
    db: Session = Depends(get_db)
):
    """
    Endpoint to retrieve all Category records.
    """
    try:
        # Use the get_all method from the Category model
        orders = Order.get_all(db)
        if not orders:
            return []
        return orders
    except Exception as e:
        # Log the error and raise an HTTP exception
        print(f"Error fetching categories: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying orders.")