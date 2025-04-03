from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Import necessary components
from database.session import get_db
from schemas.order_return import OrderReturnSchema
from models.order_return import OrderReturn 

# Basic logging configuration

router = APIRouter()

@router.get(
    "/",
    response_model=List[OrderReturnSchema],
    summary="Retrieve all orders_reuturn",
    description="This API returns a list of all orders_return, including descriptions and icon URLs."
)
def get_all_returns(
    session: Session = Depends(get_db)
):
    """
    Endpoint to retrieve all Category records.
    """
    try:
        # Use the get_all method from the Category model
        orders_return = OrderReturn.get_all(session)
        if not orders_return:
            return []
        return orders_return
    except Exception as e:
        # Log the error and raise an HTTP exception
        print(f"Error fetching orders_reuturn: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying categories.")