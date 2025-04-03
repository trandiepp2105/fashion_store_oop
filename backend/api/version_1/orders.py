from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.order import Order
from models.user import User
from models.role import Role
from schemas.order import OrderSchema

router = APIRouter()

@router.get(
    "/categories",
    response_model=List[OrderSchema],
    summary="Retrieve orders with user and role information",
    description="This API returns a list of all orders with detailed user and role information."
)
def get_order_categories(Session: Session = Depends(get_db)):
    try:
        orders = Order.get_all(Session)
        if not orders:
            return []
        
        result = []
        for order in orders:
            user = User.get_all(Session)
            role = Role.get_all(Session) if user else None
            
            order_data = {
                "user": {
                    "id": user.id if user else 0,
                    "name": user.name if user else "",
                    "email": user.email if user else "",
                    "phone_number": user.phone_number if user else "",
                    "active": user.active if user else True,
                    "role": {
                        "id": role.id if role else 0,
                        "name": role.name if role else ""
                    }
                },
                "shipping_info_id": order.shipping_info_id,
                "total_amount": order.total_amount,
                "final_amount": order.final_amount,
                "order_date": order.order_date,
                "status": order.status,
                "id": order.id
            }
            result.append(order_data)
        
        return result
    except Exception as e:
        # Log the error and raise an HTTP exception
        print(f"Error fetching categories: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying orders.")
    
@router.post(
    "/",
    response_model=OrderSchema,
    summary="Create a new order",
    description="This API endpoint allows creating a new order."
)
def add_order(
    order_data: OrderSchema,
    db: Session = Depends(get_db)
):
    """
    Endpoint to create a new order.
    """
    try:
        new_order = Order.create(db, order_data)
        return new_order
    except Exception as e:
        print(f"Error creating order: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while creating order.")
