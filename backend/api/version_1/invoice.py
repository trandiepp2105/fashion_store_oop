from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from database.session import get_db
from models.cart import CartItem
from models.product import Product
from models.sale import Coupon
from models.user import User
from enums.sale_type import SaleType
from datetime import datetime

router = APIRouter()

class TemporaryInvoiceRequest(BaseModel):
    cart_item_ids: List[int]
    coupon_id: Optional[int] = None

class TemporaryInvoiceResponse(BaseModel):
    original_total: float
    discounted_total: float
    discount_amount: float
    final_total: float

@router.post("/temporary-invoice", response_model=TemporaryInvoiceResponse, status_code=status.HTTP_200_OK, summary="Create provisional invoice", description="Tạo hóa đơn tạm cho đơn hàng từ danh sách cart item id và áp dụng coupon (nếu có).")
def create_temporary_invoice(request_data: TemporaryInvoiceRequest,
                             session: Session = Depends(get_db),
                             current_user: User = Depends(User.get_current_user)):
    original_total = 0.0
    discounted_total = 0.0

    for cart_item_id in request_data.cart_item_ids:
        cart_item = session.query(CartItem).filter_by(id=cart_item_id, user_id=current_user.id).first()
        if not cart_item:
            raise HTTPException(status_code=404, detail=f"Cart item {cart_item_id} not found.")

        product = session.query(Product).filter_by(id=cart_item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {cart_item.product_id} not found.")

        original_total += product.selling_price * cart_item.quantity
        discounted_price = product.get_discount_price(session)
        discounted_total += discounted_price * cart_item.quantity

    discount_amount = 0.0
    if request_data.coupon_id is not None and request_data.coupon_id > 0:
        coupon = session.query(Coupon).filter_by(id=request_data.coupon_id).first()
        if coupon and coupon.is_active() and coupon.is_valid(discounted_total):
            if coupon.type == SaleType.PERCENTAGE:
                discount_amount = discounted_total * coupon.value / 100
            else:
                discount_amount = coupon.value

    final_total = discounted_total - discount_amount
    if final_total < 0:
        final_total = 0.0

    return TemporaryInvoiceResponse(
        original_total=original_total,
        discounted_total=discounted_total,
        discount_amount=discount_amount,
        final_total=final_total
    )