from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request
import json  # Import json module for parsing category string
import uuid  # Import uuid for generating unique file names

# Import necessary components
from database.session import get_db
from models.product import Product, ProductCategory  # Import ProductCategory model
from models.supplier import Supplier  # Import Supplier model
from schemas.product import ProductCreate, ProductResponse, ProductUpdate, ProductDetail  # Import the new ProductDetail schema
from models.variant import Variant  # Import Variant model
from models.category import Category  # Import Category model
from models.product import ProductVariant  # Import ProductVariant model
import os
import shutil
import logging

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter()

def save_file_with_unique_name(upload_dir: str, file: UploadFile) -> str:
    """
    Save a file to the specified directory with a unique name if a file with the same name already exists.
    """
    os.makedirs(upload_dir, exist_ok=True)
    file_name = file.filename
    file_path = os.path.join(upload_dir, file_name)

    # Generate a unique name if the file already exists
    while os.path.exists(file_path):
        name, ext = os.path.splitext(file_name)
        file_name = f"{name}_{uuid.uuid4().hex[:8]}{ext}"
        file_path = os.path.join(upload_dir, file_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path

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
        file_path = save_file_with_unique_name(upload_dir, image_file)
        image_url = f"/media/products/{os.path.basename(file_path)}"

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

    # Get category hierarchy as a tree
    categories = session.query(ProductCategory).filter(ProductCategory.product_id == product.id).all()
    category_hierarchy = {}

    if categories:
        # Retrieve all associated categories
        category_ids = [cat.category_id for cat in categories]
        all_categories = session.query(Category).filter(Category.id.in_(category_ids)).all()

        # Build a mapping of category ID to category object
        category_map = {category.id: category for category in all_categories}

        # Build the tree structure
        def build_category_tree(category_id):
            category = category_map.get(category_id)
            if not category:
                return None
            subcategories = [
                build_category_tree(sub.id)
                for sub in all_categories
                if sub.parent_id == category_id
            ]
            return {
                "id": category.id,
                "name": category.name,
                "subcategory": [sub for sub in subcategories if sub]
            }

        # Find root categories (categories without a parent in the list)
        root_categories = [
            category for category in all_categories
            if category.parent_id not in category_map
        ]

        # Build the hierarchy starting from the first root category
        if root_categories:
            category_hierarchy = build_category_tree(root_categories[0].id)

    # Get variants
    variants = product.get_variants(session)
    variant_details = []
    for variant in variants:
        variant_info = session.query(Variant).filter(Variant.id == variant.variant_id).first()
        if variant_info:
            variant_details.append({
                "variant_id": variant.variant_id,
                "size": variant_info.size,
                "color": variant_info.color,
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
        discount_price=product.get_discount_price(session),
        supplier=supplier_info,
        category=category_hierarchy,
        variants=variant_details
    )

@router.patch("/{product_id}", response_model=ProductResponse, summary="Update a product by ID")
def update_product(product_id: int, product_data: ProductUpdate, session: Session = Depends(get_db)):
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Use the update_info method from the Base class
    product.update_info(session, **product_data.model_dump(exclude_unset=True))
    
    return ProductResponse(
        id=product.id,
        name=product.name,
        selling_price=product.selling_price,
        image_url=product.image_url,
        rating=product.get_average_rating(),
        discount_price=product.get_discount_price(session),
        stock=product.get_total_stock(session),
        supplier={
            "id": product.supplier_id,
            "company_name": product.get_supplier(session).company_name if product.get_supplier(session) else None
        } if product.supplier_id else None
    )

@router.delete("/{product_id}", summary="Delete a product by ID")
def delete_product(product_id: int, session: Session = Depends(get_db)):
    try:
        product = session.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Delete associated product variants
        product_variants = session.query(ProductVariant).filter(ProductVariant.product_id == product_id).all()
        for variant in product_variants:
            session.delete(variant)
        
        # Delete the product
        session.delete(product)

        image_path = os.path.join("./media/products", product.image_url.split("/")[-1])
        if os.path.exists(image_path):
            os.remove(image_path)
        shutil.rmtree("./media/products", ignore_errors=True)
        session.commit()
        return {"message": "Product deleted successfully"}

    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error while deleting product: {e}")

@router.post(
    "/{product_id}/add-variant",
    summary="Add a variant to a product",
    description="This API allows adding a variant (size, color, stock, image) to a product."
)
async def add_variant_to_product(
    product_id: int,
    size: str = Form(...),
    color: str = Form(...),
    stock: int = Form(...),
    image_file: UploadFile = Form(...),
    session: Session = Depends(get_db)
):
    try:
        # Check if the product exists
        product = session.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        # Use get_or_create for Variant
        variant, created = Variant.get_or_create(session, size=size, color=color)

        # Check if the product-variant association exists
        product_variant, created = ProductVariant.get_or_create(
            session,
            product_id=product_id,
            variant_id=variant.id
        )
        if not created:
            raise HTTPException(status_code=400, detail="Variant already exists for this product")

        # Save the image file
        upload_dir = "./media/variants"
        file_path = save_file_with_unique_name(upload_dir, image_file)
        image_url = f"/media/variants/{os.path.basename(file_path)}"

        # Update the product-variant with stock and image_url
        product_variant.stock_quantity = stock
        product_variant.image_url = image_url
        session.commit()

        return {"message": "Variant added successfully", "variant_id": variant.id, "product_id": product_variant.product_id}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error while adding variant: {e}")

@router.delete(
    "/{product_id}/add-variant/{variant_id}",
    summary="Delete a product variant",
    description="This API deletes a product variant using the composite key (product_id, variant_id)."
)
def delete_product_variant(
    product_id: int,
    variant_id: int,
    session: Session = Depends(get_db)
):
    try:
        # Find the product variant
        product_variant = session.query(ProductVariant).filter_by(product_id=product_id, variant_id=variant_id).first()
        if not product_variant:
            raise HTTPException(status_code=404, detail="Product variant not found")

        # Delete the image file if it exists
        if product_variant.image_url:
            image_path = os.path.join(".", product_variant.image_url.lstrip("/"))
            if os.path.exists(image_path):
                os.remove(image_path)

        # Use the delete method from the Base class
        product_variant.delete(session)

        return {"message": "Product variant deleted successfully"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error while deleting product variant: {e}")

