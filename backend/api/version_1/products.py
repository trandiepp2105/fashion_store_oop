from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

# Import necessary components
from database.session import get_db
from models.product import Product
from schemas.product import ProductCreate, ProductResponse, ProductUpdate
import os
import shutil
import logging

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter()

@router.get(
    "/", 
    response_model=List[ProductResponse],
    summary="Retrieve all products",
    description="This API returns a list of all products."
)

def get_all_products(
    session: Session = Depends(get_db)
):
    try:
        products = Product.get_all(session)
        if not products:
            return []
        return products
    except Exception as e:
        
        raise HTTPException(status_code=500, detail=f"Internal server error while querying products.:{e}")

@router.post(
    "/",
    response_model=ProductResponse,
    summary="Create a new products",
    description="This API allows creating a new products."
)
async def create_product(
    name: str = Form(...),
    description: str = Form(None),
    original_price: int = Form(...),
    selling_price: int = Form(...),
    total_rating:  int = Form(...),
    rating_sum:  int = Form(...),
    image_file: UploadFile = Form(...),
    supplier_id:  int = Form(None),
    session: Session = Depends(get_db)
):

    
    try:
        upload_dir = "d:/HK6/OOP_PROGRAMING/PROJECT/fashion_store_oop/backend/media/product"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, image_file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)

        if supplier_id:
            supplier_product = session.query(Product).filter(Product.id == supplier_id).first()
            if not supplier_product:
                supplier_id = None
        
        new_product = Product(
            name=name,
            description=description,
            original_price=original_price,
            selling_price=selling_price,
            total_rating=total_rating,
            rating_sum=rating_sum,
            supplier_id=supplier_id,
            image_url=file_path
        )
        new_product.save(session) 

        return new_product
    except Exception as e:
        print(f"Error creating category: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error while creating product. {e}")

@router.get("/{product_id}", response_model=ProductResponse, summary="Retrieve a product by ID")
def get_product(product_id: int, session: Session = Depends(get_db)):
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.patch("/{product_id}", response_model=ProductResponse, summary="Update a product by ID")
def update_product(product_id: int, product_data: ProductUpdate, session: Session = Depends(get_db)):
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
    
    session.commit()
    session.refresh(product)
    return product

@router.delete("/{product_id}", summary="Delete a product by ID")
def delete_product(product_id: int, session: Session = Depends(get_db)):
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    session.delete(product)
    session.commit()
    return {"detail": "Product deleted successfully"}