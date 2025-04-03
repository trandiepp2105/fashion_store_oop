from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database.session import get_db
from models.payment import Payment
from schemas.payment import PaymentSchema

router = APIRouter()

@router.get(
    "/",
    response_model=List[PaymentSchema],
    summary="Retrieve all payments",
    description="This API returns a list of all payments, including descriptions and icon URLs."
)
def get_all_payments(
    session: Session = Depends(get_db)
):
    """
    Endpoint to retrieve all Category records.
    """
    try:
        # Use the get_all method from the Category model
        payments = Payment.get_all(session)
        if not payments:
            return []
        return payments
    except Exception as e:
        # Log the error and raise an HTTP exception
        print(f"Error fetching payments: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying payments.")
    
@router.post(
    "/",
    response_model=PaymentSchema,
    summary="Create a new payment",
    description="This API endpoint allows creating a new payment."
)
def create_payment(
    payment_data: PaymentSchema,
    db: Session = Depends(get_db)
):
    """
    Endpoint to create a new payment.
    """
    try:
        new_payment = Payment.create(db, payment_data)
        return new_payment
    except Exception as e:
        print(f"Error creating payment: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while creating payment.")
