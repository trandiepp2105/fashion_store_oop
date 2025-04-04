from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.session import get_db
from models.shipping_info import ShippingInfo
from models.user import User
from schemas.shipping_info import ShippingInfoCreate, ShippingInfoUpdate, ShippingInfoSchema

router = APIRouter()

@router.post(
    "/",
    response_model=ShippingInfoSchema,
    summary="Add a new shipping info",
    description="Add a new shipping information for the authenticated user."
)
def add_shipping_info(
    shipping_info: ShippingInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        # Check if the user already has any shipping info
        existing_shipping_infos = ShippingInfo.get_all_shipping_infos_by_user(db, current_user.id)
        is_first_shipping_info = len(existing_shipping_infos) == 0

        # If it's the first shipping info, set it as default
        if is_first_shipping_info:
            shipping_info.is_default = True

        new_shipping_info = ShippingInfo(
            user_id=current_user.id,
            recipient_name=shipping_info.recipient_name,
            phone_number=shipping_info.phone_number,
            province_city=shipping_info.province_city,
            district=shipping_info.district,
            ward_commune=shipping_info.ward_commune,
            specific_address=shipping_info.specific_address,
            is_default=shipping_info.is_default
        )
        new_shipping_info.save(db)

        # If the new shipping info is set as default, update others
        if shipping_info.is_default:
            new_shipping_info.set_default(db)

        return new_shipping_info
    except Exception as e:
        print(f"Error adding shipping info: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while adding shipping info.")

@router.get(
    "/",
    response_model=list[ShippingInfoSchema],
    summary="Get all shipping infos",
    description="Retrieve all shipping information for the authenticated user."
)
def get_shipping_infos(
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        shipping_infos = ShippingInfo.get_all_shipping_infos_by_user(db, current_user.id)
        return shipping_infos
    except Exception as e:
        print(f"Error fetching shipping infos: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while fetching shipping infos.")

@router.put(
    "/{shipping_info_id}",
    response_model=ShippingInfoSchema,
    summary="Update a specific shipping info",
    description="Update a specific shipping information for the authenticated user."
)
def update_shipping_info(
    shipping_info_id: int,
    shipping_info: ShippingInfoUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        existing_info = db.query(ShippingInfo).filter_by(id=shipping_info_id, user_id=current_user.id).first()
        if not existing_info:
            raise HTTPException(status_code=404, detail="Shipping info not found or does not belong to the user.")

        # Update fields
        for key, value in shipping_info.dict(exclude_unset=True).items():
            setattr(existing_info, key, value)

        db.commit()
        db.refresh(existing_info)

        # If updated to default, update others
        if shipping_info.is_default:
            existing_info.set_default(db)

        return existing_info
    except Exception as e:
        print(f"Error updating shipping info: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while updating shipping info.")

@router.delete(
    "/{shipping_info_id}",
    summary="Delete a specific shipping info",
    description="Delete a specific shipping information for the authenticated user."
)
def delete_shipping_info(
    shipping_info_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(User.get_current_user)
):
    try:
        shipping_info = db.query(ShippingInfo).filter_by(id=shipping_info_id, user_id=current_user.id).first()
        if not shipping_info:
            raise HTTPException(status_code=404, detail="Shipping info not found or does not belong to the user.")

        db.delete(shipping_info)
        db.commit()
        return {"detail": "Shipping info deleted successfully."}
    except Exception as e:
        print(f"Error deleting shipping info: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while deleting shipping info.")
