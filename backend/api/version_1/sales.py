from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.sale import Sale
from schemas.sale import SaleCreate, SaleResponse, SaleUpdate
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
    
@router.get("/{sale_id}", response_model=SaleResponse, summary="Retrieve a sale by ID")
def get_sale(sale_id: int, session: Session = Depends(get_db)):
    sale = session.query(Sale).filter(Sale.id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    return sale

@router.patch("/{sale_id}", response_model=SaleResponse, summary="Update a sale by ID")
def update_sale(sale_id: int, sale_data: SaleUpdate, session: Session = Depends(get_db)):
    sale = session.query(Sale).filter(Sale.id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    
    update_data = sale_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(sale, key, value)
    
    session.commit()
    session.refresh(sale)
    return sale

@router.delete("/{sale_id}", summary="Delete a sale by ID")
def delete_sale(sale_id: int, session: Session = Depends(get_db)):
    sale = session.query(Sale).filter(Sale.id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    
    session.delete(sale)
    session.commit()
    return {"detail": "Sale deleted successfully"}
