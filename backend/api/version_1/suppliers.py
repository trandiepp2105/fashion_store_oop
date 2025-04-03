from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.supplier import Supplier
from schemas.supplier import SupplierCreate, SupplierResponse, SupplierUpdate
import os
import shutil
import logging

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter()

@router.get(
    "/",
    response_model=List[SupplierResponse],
    summary="Retrieve all suppliers",
    description="This API returns a list of all suppliers."
)

def get_all_supplier(
    session: Session = Depends(get_db)
):
    try:
        suppliers = Supplier.get_all(session)
        if not suppliers:
            return []
        return suppliers
    except Exception as e:
        print(f"Error fetching suppliers: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while querying suppliers.")
    
@router.post(
    "/",
    response_model=SupplierResponse,
    summary="Create a new supplier",
    description="This API allows creating a new supplier with company name, contact person, email, phone number, address, tax ID, website, status, and start date."
)

async def create_supplier(
    supplier_data: SupplierCreate,
    session: Session = Depends(get_db)
):
    
    try:

        new_supplier = Supplier(
            company_name = supplier_data.company_name,
            contact_person = supplier_data.contact_person,
            email = supplier_data.email,
            phone_number = supplier_data.phone_number,
            address = supplier_data.address,
            tax_id = supplier_data.tax_id,
            website = supplier_data.website,
            status = supplier_data.status,
            started_at = supplier_data.started_at,
        )

        new_supplier.save(session)

        return new_supplier  # This will be returned as SaleResponse because of response_model
    except Exception as e:
        logger.error(f"Error creating sale: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error while creating product: {e}")
    
@router.get("/{supplier_id}", response_model=SupplierResponse, summary="Retrieve a supplier by ID")
def get_supplier(supplier_id: int, session: Session = Depends(get_db)):
    supplier = session.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@router.patch("/{supplier_id}", response_model=SupplierResponse, summary="Update a supplier by ID")
def update_supplier(supplier_id: int, supplier_data: SupplierUpdate, session: Session = Depends(get_db)):
    supplier = session.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    update_data = supplier_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(supplier, key, value)
    
    session.commit()
    session.refresh(supplier)
    return supplier

@router.delete("/{supplier_id}", summary="Delete a supplier by ID")
def delete_supplier(supplier_id: int, session: Session = Depends(get_db)):
    supplier = session.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    session.delete(supplier)
    session.commit()
    return {"detail": "Supplier deleted successfully"}