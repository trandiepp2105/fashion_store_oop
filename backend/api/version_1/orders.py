from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.order import Order, OrderItem
from models.cart import CartItem
from models.user import User
from schemas.order import OrderSchema
from enums.order_status import OrderStatus

router = APIRouter()

@router.post(
    "/",
    response_model=OrderSchema,
    summary="Create a new order",
    description="This API endpoint allows creating a new order."
)
def add_order(
    shipping_info_id: int,
    cart_item_ids: List[int],
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    """
    Create a new order for the authenticated user.
    """
    try:
        # Fetch cart items
        cart_items = db.query(CartItem).filter(
            CartItem.id.in_(cart_item_ids), CartItem.user_id == current_user.id
        ).all()

        if not cart_items:
            raise HTTPException(status_code=404, detail="Cart items not found or do not belong to the user.")

        # Create the order
        new_order = Order(
            session=db,
            user_id=current_user.id,
            shipping_info_id=shipping_info_id,
            cart_item_ids=cart_item_ids
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        # Create order items
        for item in cart_items:
            order_item = OrderItem(
                order_id=new_order.id,
                product_id=item.product_id,
                variant_id=item.variant_id,
                quantity=item.quantity
            )
            db.add(order_item)

        db.commit()
        return new_order

    except Exception as e:
        print(f"Error creating order: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while creating order.")

@router.get(
    "/",
    response_model=List[OrderSchema],
    summary="Get all orders of the authenticated user",
    description="Retrieve all orders placed by the authenticated user."
)
def get_user_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        orders = Order.get_orders_by_user(db, current_user.id)
        return orders
    except Exception as e:
        print(f"Error fetching user orders: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while fetching orders.")

@router.delete(
    "/{order_id}",
    summary="Delete a specific order",
    description="Delete a specific order of the authenticated user."
)
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        order = db.query(Order).filter_by(id=order_id, user_id=current_user.id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found or does not belong to the user.")

        db.delete(order)
        db.commit()
        return {"detail": "Order deleted successfully."}
    except Exception as e:
        print(f"Error deleting order: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while deleting order.")

@router.put(
    "/{order_id}/status",
    summary="Update the status of an order",
    description="Update the status of a specific order."
)
def update_order_status(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        order = db.query(Order).filter_by(id=order_id, user_id=current_user.id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found or does not belong to the user.")

        order.update_status(db)
        return {"detail": "Order status updated successfully."}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Error updating order status: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while updating order status.")

@router.put(
    "/{order_id}/cancel",
    summary="Cancel an order",
    description="Cancel a specific order of the authenticated user."
)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        order = db.query(Order).filter_by(id=order_id, user_id=current_user.id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found or does not belong to the user.")

        if order.cancel_order(db):
            return {"detail": "Order canceled successfully."}
        else:
            raise HTTPException(status_code=400, detail="Order cannot be canceled.")
    except Exception as e:
        print(f"Error canceling order: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while canceling order.")