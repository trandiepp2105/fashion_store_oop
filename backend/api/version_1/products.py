from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request
import json  # Import json module for parsing category string

# Import necessary components
from database.session import get_db
from models.product import Product, ProductCategory  # Import ProductCategory model
from models.supplier import Supplier  # Import Supplier model
from schemas.product import ProductCreate, ProductResponse, ProductUpdate, ProductDetail  # Import the new ProductDetail schema
from models.variant import Variant  # Import Variant model
from models.category import Category  # Import Category model
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
        products = session.query(Product).all()
        if not products:
            return []

        product_responses = []
        for product in products:
            supplier = product.get_supplier(session)
            product_responses.append(ProductResponse(
                id=product.id,
                name=product.name,
                selling_price=product.selling_price,
                image_url=product.image_url,
                rating=product.get_average_rating(),
                discount_price=product.get_discount_price(session),
                stock=product.get_total_stock(session),
                supplier={
                    "id": supplier.id,
                    "company_name": supplier.company_name
                } if supplier else None
            ))

        return product_responses
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error while querying products: {e}")

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
    image_file: UploadFile = Form(...),
    supplier_id: int = Form(None),
    category: str = Form(None),  # Accept category as a string
    session: Session = Depends(get_db)
):
    try:
        upload_dir = "./media/products"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, image_file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)
        image_url = f"/media/products/{image_file.filename}"
        with session.begin():  # Start a transaction
            if supplier_id:
                supplier = session.query(Supplier).filter(Supplier.id == supplier_id).first()
                if not supplier:
                    supplier_id = None
            
            new_product = Product(
                name=name,
                description=description,
                original_price=original_price,
                selling_price=selling_price,
                total_rating=0,
                rating_sum=0,
                supplier_id=supplier_id,
                image_url=image_url
            )
            session.add(new_product)
            session.flush()  # Ensure `new_product.id` is available

            # Parse category string to dictionary if necessary
            if category:
                try:
                    category_data = json.loads(category) if isinstance(category, str) else category
                except json.JSONDecodeError:
                    raise HTTPException(status_code=400, detail="Invalid category format. Must be a valid JSON object.")
                
                # Handle nested categories and create ProductCategory records
                def process_category(category_data, product_id):
                    if not category_data:
                        return
                    category_id = category_data.get("id")
                    if category_id:
                        product_category = ProductCategory(product_id=product_id, category_id=category_id)
                        session.add(product_category)
                    subcategory = category_data.get("subcategory")
                    if subcategory:
                        process_category(subcategory, product_id)

                process_category(category_data, new_product.id)

        session.commit()
        session.refresh(new_product)

        # Ensure all required fields for ProductResponse are provided
        return ProductResponse(
            id=new_product.id,
            name=new_product.name,
            selling_price=new_product.selling_price,
            image_url=new_product.image_url,
            rating=new_product.get_average_rating(),
            discount_price=new_product.get_discount_price(session),
            stock=new_product.get_total_stock(session),  # Ensure stock is included
            supplier={
                "id": new_product.supplier_id,
                "company_name": new_product.get_supplier(session).company_name if new_product.get_supplier(session) else None
            } if new_product.supplier_id else None
        )
    except Exception as e:
        session.rollback()  # Rollback the transaction on error
        print(f"Error creating product: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error while creating product. {e}")

@router.get("/{product_id}", response_model=ProductDetail, summary="Retrieve detailed product information")
def get_product_detail(product_id: int, session: Session = Depends(get_db)):
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Get supplier details
    supplier = product.get_supplier(session)
    supplier_info = {
        "id": supplier.id,
        "company_name": supplier.company_name
    } if supplier else None

    # Get category hierarchy
    def get_category_hierarchy(category_id):
        category = session.query(Category).filter(Category.id == category_id).first()
        if not category:
            return {}
        subcategory = session.query(ProductCategory).filter(ProductCategory.product_id == product.id, ProductCategory.category_id == category_id).first()
        return {
            "id": category.id,
            "subcategory": get_category_hierarchy(subcategory.category_id) if subcategory else {}
        }

    categories = session.query(ProductCategory).filter(ProductCategory.product_id == product.id).all()
    category_hierarchy = {}
    if categories:
        root_category = categories[0].category_id
        category_hierarchy = get_category_hierarchy(root_category)

    # Get variants
    variants = product.get_variants(session)
    variant_details = []
    for variant in variants:
        variant_info = session.query(Variant).filter(Variant.id == variant.variant_id).first()
        if variant_info:
            variant_details.append({
                "id": variant.variant_id,  # ID of the product variant
                "size": variant_info.size.value,
                "color": variant_info.color.value,
                "stock": variant.stock_quantity,
                "image_url": variant.image_url
            })

    # Construct the response
    return ProductDetail(
        id=product.id,
        name=product.name,
        original_price=product.original_price,
        selling_price=product.selling_price,
        description=product.description,
        image_url=product.image_url,
        rating=product.get_average_rating(),
        stock=product.get_total_stock(session),
        supplier=supplier_info,
        category=category_hierarchy,
        variants=variant_details
    )

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