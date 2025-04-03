from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.sale import Sale
from schemas.sale import SaleCreate, SaleResponse
import os
import shutil
import logging

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter()

@router.get(
    "/",
    response_model=List[SaleResponse],
    summary="Retrieve all sales",
    description="This API returns a list of all sales."
)

def get_all_sale(
    session: Session = Depends(get_db)
):
    try:
        sales = Sale.get_all(session)
        if not sales:
            return []
        return sales
    except Exception as e:
        print(f"Error fetching sales: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying sales.")
    
@router.post(
    "/",
    response_model=SaleResponse,
    summary="Create a new sale",
    description="This API allows creating a new sale with a name, description, type, value, start date, and end date."
)

async def create_sale(
    sale_data: SaleCreate,
    session: Session = Depends(get_db)
):
    try:

        new_sale = Sale(
            name=sale_data.name,
            description=sale_data.description,
            type=sale_data.type,
            value=sale_data.value,
            start_date=sale_data.start_date,
            end_date=sale_data.end_date
        )

        new_sale.save(session)

        return new_sale  # This will be returned as SaleResponse because of response_model
    except Exception as e:
        logger.error(f"Error creating sale: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error while creating sale: {e}")