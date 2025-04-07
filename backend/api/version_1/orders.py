from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi import Request
from datetime import datetime

# Import necessary components
from database.session import get_db
from models.order import Order, OrderItem
from models.cart import CartItem
from models.user import User
from models.shipping_info import ShippingInfo
from models.product import Product, ProductVariant  # added ProductVariant import
from models.variant import Variant
from schemas.order import OrderSchema, OrderListResponse, OrderCreate
from schemas.product import ProductSchema  # ensure ProductSchema is imported
from enums.order_status import OrderStatus

router = APIRouter()

# Helper function to compose OrderSchema response
def compose_order_response(order, db):
    order_items_query = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
    order_items_list = []
    for item in order_items_query:
        product_obj = Product.get_by_id(db, item.product_id)
        discount_price = product_obj.get_discount_price(db) if product_obj else None
        # Fetch product variant from ProductVariant table
        product_variant_obj = db.query(ProductVariant).filter_by(
            product_id=item.product_id, variant_id=item.variant_id
        ).first()
        variant_obj = db.query(Variant).filter_by(id=item.variant_id).first()
        order_items_list.append({
            "id": item.id,
            # Use to_dict() (inherited from Base) for the product data
            "product": product_obj.to_dict() if product_obj else None,
            "product_variant": {
                "id": product_variant_obj.variant_id if product_variant_obj else None,
                "image_url": product_variant_obj.image_url if product_variant_obj else None,
                "variant": {
                    "id": variant_obj.id if variant_obj else None,
                    "color": variant_obj.color if variant_obj else None,
                    "size": variant_obj.size if variant_obj else None
                }
            },
            "selling_price": product_obj.selling_price if product_obj else None,
            "discount_price": discount_price,
            "quantity": item.quantity
        })
    shipping_info_obj = db.query(ShippingInfo).filter_by(id=order.shipping_info_id).first()
    user_obj = db.query(User).filter_by(id=order.user_id).first()
    return {
        "id": order.id,
        "user": {
            "id": user_obj.id,
            "name": user_obj.name,
            "email": user_obj.email,
            "phone_number": user_obj.phone_number
        } if user_obj else None,
        "shipping_info": {
            "id": shipping_info_obj.id,
            "recipient_name": shipping_info_obj.recipient_name,
            "phone_number": shipping_info_obj.phone_number,
            "province_city": shipping_info_obj.province_city,
            "district": shipping_info_obj.district,
            "ward_commune": shipping_info_obj.ward_commune,
            "specific_address": shipping_info_obj.specific_address,
            "is_default": shipping_info_obj.is_default
        } if shipping_info_obj else None,
        "order_date": order.order_date.strftime("%m/%d/%Y") if order.order_date else None,
        "status": order.status.value if hasattr(order.status, "value") else order.status,
        "total_amount": order.total_amount,
        "final_amount": order.final_amount,
        "order_items": order_items_list
    }

@router.get(
    "/statuses",
    response_model=List[str],
    summary="Get all order statuses",
    description="Retrieve a list of all possible order statuses."
)
def get_order_statuses():
    """
    Get all possible order statuses.

    Returns:
        List[str]: A list of order statuses.
    """
    return [status.value for status in OrderStatus]

@router.post(
    "/",
    response_model=OrderSchema,
    summary="Create a new order",
    description="This API endpoint creates a new order for the authenticated user."
)
def add_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    """
    Create a new order for the authenticated user.
    """
    new_order = None
    order_items = []
    try:
        # Fetch cart items using order_data.cart_item_ids
        cart_items = db.query(CartItem).filter(
            CartItem.id.in_(order_data.cart_item_ids),
            CartItem.user_id == current_user.id
        ).all()

        if not cart_items:
            raise HTTPException(status_code=404, detail="Cart items not found or do not belong to the user.")

        new_order = Order(
            session=db,
            user_id=current_user.id,
            shipping_info_id=order_data.shipping_info_id,
            cart_item_ids=order_data.cart_item_ids
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        for item in cart_items:
            order_item = OrderItem(
                order_id=new_order.id,
                product_id=item.product_id,
                variant_id=item.variant_id,
                quantity=item.quantity
            )
            db.add(order_item)
            order_items.append(order_item)

        db.commit()
        # Delete cart items after creating the order using delete method from Base
        for item in cart_items:
            item.delete(db)
        db.commit()

        # Compose the response using helper function
        order_response = compose_order_response(new_order, db)
        return order_response

    except Exception as e:
        # If any error occurs, manually delete the created order (cascade deletes order items)
        if new_order is not None and new_order.id:
            try:
                db.delete(new_order)
                db.commit()
            except Exception as del_e:
                db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error while creating order: {e}")

@router.get(
    "/me",
    response_model=List[OrderSchema],
    summary="Get all orders of the authenticated user",
    description="Retrieve all orders placed by the authenticated user."
)
def get_user_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        orders = db.query(Order).filter(Order.user_id == current_user.id).all()
        response = [compose_order_response(order, db) for order in orders]
        return response
    except Exception as e:
        print(f"Error fetching user orders: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while fetching orders.")

@router.get(
    "/filter",
    response_model=OrderListResponse,
    summary="Filter orders",
    description="Filter orders based on status, date range, amount range, or user ID."
)
def filter_orders(
    status: Optional[OrderStatus] = Query(None, description="Filter by order status"),
    start_date: Optional[datetime] = Query(None, description="Filter by start date"),
    end_date: Optional[datetime] = Query(None, description="Filter by end date"),
    min_amount: Optional[float] = Query(None, description="Filter by minimum total amount"),
    max_amount: Optional[float] = Query(None, description="Filter by maximum total amount"),
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    """
    Filters orders based on query parameters.

    Args:
        status (OrderStatus, optional): Filter by order status.
        start_date (datetime, optional): Filter by start date.
        end_date (datetime, optional): Filter by end date.
        min_amount (float, optional): Filter by minimum total amount.
        max_amount (float, optional): Filter by maximum total amount.
        user_id (int, optional): Filter by user ID.
        db (Session): The database session.
        current_user (User): The authenticated user.

    Returns:
        OrderListResponse: A list of filtered orders.
    """
    query = db.query(Order)

    # Apply filters
    if status:
        query = query.filter(Order.status == status)
    if start_date and end_date:
        query = query.filter(Order.order_date.between(start_date, end_date))
    if min_amount is not None and max_amount is not None:
        query = query.filter(Order.total_amount.between(min_amount, max_amount))
    if user_id:
        query = query.filter(Order.user_id == user_id)
    else:
        query = query.filter(Order.user_id == current_user.id)

    orders = query.all()
    response = [compose_order_response(order, db) for order in orders]
    return OrderListResponse(data=response)

@router.get(
    "/admin",
    response_model=List[OrderSchema],
    summary="Get all orders (Admin)",
    description="Retrieve all orders regardless of user. For admin use."
)
def get_all_orders(
    db: Session = Depends(get_db)
):
    try:
        orders = Order.get_all(db)
        response = [compose_order_response(order, db) for order in orders]
        return response
    except Exception as e:
        print(f"Error fetching all orders: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while fetching all orders.")


# @router.get(
#     "/{order_id}",
#     response_model=OrderSchema,
#     summary="Get order detail",
#     description="Retrieve detailed order information using order ID."
# )
# def get_order_detail(
#     order_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(User.get_current_user)
# ):
#     order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
#     if not order:
#         raise HTTPException(status_code=404, detail="Order not found or does not belong to the user.")
#     return compose_order_response(order, db)

@router.get(
    "/{order_id}",
    response_model=OrderSchema,
    summary="Get order detail (Admin)",
    description="Retrieve detailed order information using order ID. Admin functionality; no user filtering."
)
def get_order_detail(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()  # removed current_user filtering
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    return compose_order_response(order, db)

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

