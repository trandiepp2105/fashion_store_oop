from fastapi import APIRouter, HTTPException, status, Depends, Request
from sqlalchemy.orm import Session
from database.session import get_db
from models.cart import CartItem
from models.product import ProductVariant
from models.user import User
from models.product import Product
from models.variant import Variant
from schemas.cart import CartItemResponse, ProductSchema, ProductVariantSchema, VariantSchema, AddProductToCartSchema
from typing import List
from pydantic import BaseModel

router = APIRouter()

class DeleteCartItemsRequest(BaseModel):
    cart_item_ids: List[int]

@router.post(
    "/",
    response_model=CartItemResponse,
    summary="Add product to cart",
    description="Add a product to the user's cart."
)
def add_product_to_cart(
    cart_data: AddProductToCartSchema,
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    """
    Add a product to the user's cart.

    Args:
        product_id (int): The ID of the product.
        variant_id (int): The ID of the product variant.
        quantity (int): The quantity to add.
        session (Session): The database session.
        current_user (User): The authenticated user.

    Returns:
        CartItemResponse: The added or updated cart item.
    """
    try:
        cart_item = CartItem.add_product_to_cart(
            session, user_id=current_user.id, product_id=cart_data.product_id, variant_id=cart_data.variant_id, quantity=cart_data.quantity
        )
        product = Product.get_by_id(session, cart_item.product_id)
        product_variant = session.query(ProductVariant).filter_by(product_id=cart_data.product_id, variant_id=cart_data.variant_id).first()
        if not product_variant:
            raise HTTPException(status_code=404, detail="Product variant not found.")
        # variant = session.query(Variant).filter_by(id=product_variant.variant_id).first()
        variant = Variant.get_by_id(session, product_variant.variant_id)
        if not variant:
            raise HTTPException(status_code=404, detail="Variant not found.")

        return CartItemResponse(
            id=cart_item.id,
            product=ProductSchema(
                id=product.id,
                name=product.name,
                selling_price=product.selling_price,
                discount_price=product.get_discount_price(session),  # Include discount_price
                image_url=product.image_url
            ),
            variant=ProductVariantSchema(
                id=product_variant.variant_id,
                stock_quantity=product_variant.stock_quantity,
                image_url=product_variant.image_url,
                variant=VariantSchema(
                    id=variant.id,
                    color=variant.color,
                    size=variant.size
                )
            ),
            quantity=cart_item.quantity
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.get(
    "/",
    response_model=List[CartItemResponse],
    summary="Get cart items",
    description="Retrieve all cart items for the authenticated user."
)
def get_cart_items(
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    """
    Retrieve all cart items for the authenticated user.

    Args:
        session (Session): The database session.
        current_user (User): The authenticated user.

    Returns:
        CartItemsList: A list of cart items.
    """
    cart_items = CartItem.get_cart_items_by_user(session, user_id=current_user.id)

    response_items = []
    for item in cart_items:
        # product = session.query(Product).filter_by(id=item.product_id).first()
        product = Product.get_by_id(session, item.product_id)
        product_variant = session.query(ProductVariant).filter_by(product_id=item.product_id, variant_id=item.variant_id).first()
        # variant = session.query(Variant).filter_by(id=product_variant.variant_id).first()
        variant = Variant.get_by_id(session, product_variant.variant_id)
        if not product_variant or not variant:
            continue

        response_items.append(CartItemResponse(
            id=item.id,
            product=ProductSchema(
                id=product.id,
                name=product.name,
                selling_price=product.selling_price,
                discount_price=product.get_discount_price(session),  # Include discount_price
                image_url=product.image_url
            ),
            variant=ProductVariantSchema(
                id=product_variant.variant_id,
                stock_quantity=product_variant.stock_quantity,
                image_url=product_variant.image_url,
                variant=VariantSchema(
                    id=variant.id,
                    color=variant.color,
                    size=variant.size
                )
            ),
            quantity=item.quantity
        ))

    return response_items

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
    # cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
    cart_item = CartItem.get_by_id(session, cart_item_id)
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
    # product = session.query(Product).filter_by(id=cart_item.product_id).first()
    product = Product.get_by_id(session, cart_item.product_id)
    product_variant = session.query(ProductVariant).filter_by(product_id=cart_item.product_id, variant_id=cart_item.variant_id).first()
    return CartItemResponse(
        id=cart_item.id,
        product=ProductSchema(
            id=product.id,
            name=product.name,
            selling_price=product.selling_price,
            image_url=product.image_url
        ),
        variant=ProductVariantSchema(
            id=product_variant.variant_id,
            size=product_variant.size,
            color=product_variant.color,
            stock_quantity=product_variant.stock_quantity,
            image_url=product_variant.image_url
        ),
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
    # cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
    cart_item = CartItem.get_by_id(session, cart_item_id)
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
    # product = session.query(Product).filter_by(id=cart_item.product_id).first()
    product = Product.get_by_id(session, cart_item.product_id)
    product_variant = session.query(ProductVariant).filter_by(product_id=cart_item.product_id, variant_id=cart_item.variant_id).first()
    return CartItemResponse(
        id=cart_item.id,
        product=ProductSchema(
            id=product.id,
            name=product.name,
            selling_price=product.selling_price,
            image_url=product.image_url
        ),
        variant=ProductVariantSchema(
            id=product_variant.variant_id,
            size=product_variant.size,
            color=product_variant.color,
            stock_quantity=product_variant.stock_quantity,
            image_url=product_variant.image_url
        ),
        quantity=cart_item.quantity
    )

@router.delete(
    "/bulk-delete",
    status_code=status.HTTP_200_OK,
    summary="Delete multiple cart items",
    description="Xóa nhiều cart items cùng một lúc dựa trên danh sách cart item id."
)
def delete_multiple_cart_items(
    request_data: DeleteCartItemsRequest,
    session: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    for cart_item_id in request_data.cart_item_ids:
        try:
            cart_item = CartItem.get_by_id(session, cart_item_id)
            if cart_item.user_id == current_user.id:
                cart_item.delete(session)
        except ValueError:
            # Nếu không tìm thấy cart item, bỏ qua
            pass
    return {"message": "Cart items deleted successfully."}

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
    try:
        cart_item = CartItem.get_by_id(session, cart_item_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found."
        )
    if cart_item.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found."
        )
    cart_item.delete(session)
    return {"message": "Cart item deleted successfully."}

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
    # cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
    cart_item = CartItem.get_by_id(session, cart_item_id)
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
    # product = session.query(Product).filter_by(id=cart_item.product_id).first()
    product = Product.get_by_id(session, cart_item.product_id)
    product_variant = session.query(ProductVariant).filter_by(product_id=cart_item.product_id, variant_id=cart_item.variant_id).first()
    return CartItemResponse(
        id=cart_item.id,
        product=ProductSchema(
            id=product.id,
            name=product.name,
            selling_price=product.selling_price,
            image_url=product.image_url
        ),
        variant=ProductVariantSchema(
            id=product_variant.variant_id,
            size=product_variant.size,
            color=product_variant.color,
            stock_quantity=product_variant.stock_quantity,
            image_url=product_variant.image_url
        ),
        quantity=cart_item.quantity
    )

