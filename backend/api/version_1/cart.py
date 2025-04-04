from fastapi import APIRouter, HTTPException, status, Depends, Request
from sqlalchemy.orm import Session
from database.session import get_db
from models.cart import CartItem
from models.variant import Variant
from models.user import User
from models.product import Product
from schemas.cart import CartItemResponse

router = APIRouter()

@router.post(
    "/",
    status_code=status.HTTP_200_OK,
    summary="Add product to cart",
    description="Thêm sản phẩm vào giỏ hàng."
)
def add_product_to_cart(
    product_id: int,
    variant_id: int,
    quantity: int,
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    """
    Thêm sản phẩm vào giỏ hàng.
    """
    try:
        cart_item = CartItem.add_product_to_cart(
            session, user_id=current_user.id, product_id=product_id, variant_id=variant_id, quantity=quantity
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    return {
        "message": "Sản phẩm đã được thêm vào giỏ hàng.",
        "cart_item": {
            "product_id": cart_item.product_id,
            "variant_id": cart_item.variant_id,
            "quantity": cart_item.quantity,
        },
    }

@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    summary="Get all cart items",
    description="Lấy toàn bộ sản phẩm trong giỏ hàng của người dùng."
)
def get_cart_items(
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    """
    Lấy toàn bộ sản phẩm trong giỏ hàng của người dùng.
    """
    cart_items = CartItem.get_cart_items_by_user(session, user_id=current_user.id)

    response = []
    for item in cart_items:
        product = session.query(Product).filter_by(id=item.product_id).first()
        variant = session.query(Variant).filter_by(id=item.variant_id).first()
        response.append(CartItemResponse(
            id=item.id,
            product_id=product.id,
            product_name=product.name,
            variant_id=variant.id,
            size=variant.size,
            color=variant.color,
            quantity=item.quantity
        ))

    return response

@router.patch(
    "/{cart_item_id}/increase",
    status_code=status.HTTP_200_OK,
    summary="Increase cart item quantity",
    description="Tăng số lượng của một sản phẩm trong giỏ hàng."
)
def increase_cart_item_quantity(
    cart_item_id: int,
    increment: int = 1,
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found."
        )
    try:
        cart_item.increase_quantity(session, increment=increment)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    product = session.query(Product).filter_by(id=cart_item.product_id).first()
    variant = session.query(Variant).filter_by(id=cart_item.variant_id).first()
    return CartItemResponse(
        id=cart_item.id,
        product_id=product.id,
        product_name=product.name,
        variant_id=variant.id,
        size=variant.size,
        color=variant.color,
        quantity=cart_item.quantity
    )

@router.patch(
    "/{cart_item_id}/decrease",
    status_code=status.HTTP_200_OK,
    summary="Decrease cart item quantity",
    description="Giảm số lượng của một sản phẩm trong giỏ hàng."
)
def decrease_cart_item_quantity(
    cart_item_id: int,
    decrement: int = 1,
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found."
        )
    try:
        cart_item.decrease_quantity(session, decrement=decrement)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    product = session.query(Product).filter_by(id=cart_item.product_id).first()
    variant = session.query(Variant).filter_by(id=cart_item.variant_id).first()
    return CartItemResponse(
        id=cart_item.id,
        product_id=product.id,
        product_name=product.name,
        variant_id=variant.id,
        size=variant.size,
        color=variant.color,
        quantity=cart_item.quantity
    )

@router.put(
    "/{cart_item_id}/set-quantity",
    status_code=status.HTTP_200_OK,
    summary="Set cart item quantity",
    description="Đặt số lượng cụ thể cho một sản phẩm trong giỏ hàng."
)
def set_cart_item_quantity(
    cart_item_id: int,
    quantity: int,
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found."
        )
    try:
        cart_item.update_quantity(session, quantity=quantity)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    product = session.query(Product).filter_by(id=cart_item.product_id).first()
    variant = session.query(Variant).filter_by(id=cart_item.variant_id).first()
    return CartItemResponse(
        id=cart_item.id,
        product_id=product.id,
        product_name=product.name,
        variant_id=variant.id,
        size=variant.size,
        color=variant.color,
        quantity=cart_item.quantity
    )

@router.delete(
    "/{cart_item_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete cart item",
    description="Xóa một sản phẩm cụ thể khỏi giỏ hàng."
)
def delete_cart_item(
    cart_item_id: int,
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found."
        )
    try:
        session.delete(cart_item)
        session.commit()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred."
        )
    return {"message": "Cart item deleted successfully."}