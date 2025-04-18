from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi import Request
import json  # Import json module for parsing category string
import uuid  # Import uuid for generating unique file names
from sqlalchemy.sql import func  # Import func for aggregation

# Import necessary components
from database.session import get_db
from models.product import Product, ProductCategory  # Import ProductCategory model
from models.supplier import Supplier  # Import Supplier model
from schemas.product import ProductCreate, ProductResponse, ProductUpdate, ProductDetail  # Import the new ProductDetail schema
from models.variant import Variant  # Import Variant model
from models.category import Category  # Import Category model
from models.product import ProductVariant  # Import ProductVariant model
from models.order import OrderItem  # Import OrderItem model
from schemas.sale import SaleResponse  # Import the SaleResponse schema
import os
import shutil
import logging
from config.settings import MEDIA, MEDIA_URL
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
    description="This API returns a list of all products with optional filters, sorting, and special queries for best-sellers or latest products."
)
def get_all_products(
    category_id: Optional[int] = Query(None, description="Filter by category ID"),
    search: Optional[str] = Query(None, description="Search products by name"),
    sort: Optional[str] = Query("asc", description="Sort order: 'asc' for ascending, 'desc' for descending"),
    sort_field: Optional[str] = Query("name", description="Sort field: 'name', 'date', or 'price'"),
    best_sellers: Optional[bool] = Query(False, description="Retrieve best-selling products"),
    latest: Optional[bool] = Query(False, description="Retrieve the latest products"),
    limit: Optional[int] = Query(30, description="Limit the number of products returned"),
    session: Session = Depends(get_db)
):
    """
    Retrieve all products with optional filters, sorting, and special queries for best-sellers or latest products.

    Args:
        category_id (int, optional): Filter by category ID.
        search (str, optional): Search products by name.
        sort (str, optional): Sort order: 'asc' for ascending, 'desc' for descending.
        sort_field (str, optional): Sort field: 'name', 'date', or 'price'.
        best_sellers (bool, optional): Retrieve best-selling products.
        latest (bool, optional): Retrieve the latest products.
        limit (int, optional): Limit the number of products returned.
        session (Session): The database session.

    Returns:
        List[ProductResponse]: A list of products.
    """
    try:
        query = session.query(Product)

        # Handle best-sellers query
        if best_sellers:
            best_sellers_query = (
                session.query(Product, func.sum(OrderItem.quantity).label("total_sold"))
                .join(OrderItem, Product.id == OrderItem.product_id)
                .group_by(Product.id)
                .order_by(func.sum(OrderItem.quantity).desc())
                .limit(limit)
                .all()
            )
            products = [product for product, _ in best_sellers_query]
        elif latest:
            # Handle latest products query
            products = query.order_by(Product.created_at.desc()).limit(limit).all()
        else:
            # Apply filters and sorting for general query
            # Filter by category
            if category_id:
                query = query.join(ProductCategory).filter(ProductCategory.category_id == category_id)

            # Search by name
            if search:
                query = query.filter(Product.name.ilike(f"%{search}%"))

            # Sorting
            if sort_field == "name":
                sort_column = Product.name
            elif sort_field == "date":
                sort_column = Product.created_at
            elif sort_field == "price":
                sort_column = Product.selling_price
            else:
                raise HTTPException(status_code=400, detail="Invalid sort_field value. Use 'name', 'date', or 'price'.")

            if sort == "desc":
                sort_column = sort_column.desc()
            elif sort != "asc":
                raise HTTPException(status_code=400, detail="Invalid sort value. Use 'asc' or 'desc'.")

            query = query.order_by(sort_column)
            products = query.all()

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
        # upload_dir = "./media/products"
        upload_dir = os.path.join(MEDIA, "products")
        file_path = save_file_with_unique_name(upload_dir, image_file)

        # image_url = f"/media/products/{os.path.basename(file_path)}"
        image_url = os.path.join(MEDIA_URL, "products", os.path.basename(file_path))
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
                print("Category data:", category_data)  # Debugging line
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

@router.get(
    "/latest",  # Change the path to avoid conflict
    response_model=List[ProductResponse],
    summary="Retrieve the latest products",
    description="This API returns the latest products based on their creation date."
)
def get_latest_products(
    limit: int = Query(50, description="Limit the number of products returned"),
    session: Session = Depends(get_db)
):
    """
    Retrieve the latest products based on their creation date.

    Args:
        limit (int): The maximum number of products to return.
        session (Session): The database session.

    Returns:
        List[ProductResponse]: A list of the latest products.
    """
    try:
        products = session.query(Product).order_by(Product.created_at.desc()).limit(limit).all()
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
        raise HTTPException(status_code=500, detail=f"Internal server error while querying latest products: {e}")

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
def update_product(
    product_id: int,
    name: str = Form(...),
    description: str = Form(None),
    supplier_id: int = Form(None),
    image_file: UploadFile = Form(None),
    session: Session = Depends(get_db)
):
    # product = session.query(Product).filter(Product.id == product_id).first()
    product = Product.get_by_id(session, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update text fields and supplier_id
    product.name = name
    product.description = description
    product.supplier_id = supplier_id

    # If new image is provided, delete old image and save new image
    if image_file:
        if product.image_url:
            # old_image_path = os.path.join("./media/products", product.image_url.split("/")[-1])
            old_image_path = os.path.join(MEDIA, "products", product.image_url.split("/")[-1])
            if os.path.exists(old_image_path):
                os.remove(old_image_path)
        # upload_dir = "./media/products"
        upload_dir = os.path.join(MEDIA, "products")
        file_path = save_file_with_unique_name(upload_dir, image_file)
        # product.image_url = f"/media/products/{os.path.basename(file_path)}"
        product.image_url = os.path.join(MEDIA_URL, "products", os.path.basename(file_path))

    session.commit()
    session.refresh(product)
    
    supplier = product.get_supplier(session)
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
            "company_name": supplier.company_name if supplier else None
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

        # image_path = os.path.join("./media/products", product.image_url.split("/")[-1])
        image_path = os.path.join(MEDIA, "products", product.image_url.split("/")[-1])
        if os.path.exists(image_path):
            os.remove(image_path)
        session.commit()
        return {"message": "Product deleted successfully"}

    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error while deleting product: {e}")

@router.post(
    "/{product_id}/variants",
    summary="Add variants to a product",
    description="This API allows adding multiple variants (sizes, color, stock, image) to a product."
)
async def add_variant_to_product(
    product_id: int,
    size: str = Form(...),  # Accept sizes as a comma-separated string
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

        # Clean and split the sizes string
        size_list = [size_item.strip() for size_item in size.split(",") if size_item.strip()]

        # Save the image file
        # upload_dir = "./media/variants"
        upload_dir = os.path.join(MEDIA, "variants")
        file_path = save_file_with_unique_name(upload_dir, image_file)
        # image_url = f"/media/variants/{os.path.basename(file_path)}"
        image_url = os.path.join(MEDIA_URL, "variants", os.path.basename(file_path))

        # Process each size
        for size in size_list:
            # Use get_or_create for Variant
            variant, created = Variant.get_or_create(session, size=size, color=color)

            # Use get_or_create for ProductVariant
            product_variant, created = ProductVariant.get_or_create(
                session,
                product_id=product_id,
                variant_id=variant.id
            )
            if not created:
                raise HTTPException(
                    status_code=400,
                    detail=f"Variant with size '{size}' and color '{color}' already exists for this product"
                )

            # Update the product-variant with stock and image_url
            product_variant.stock_quantity = stock
            product_variant.image_url = image_url

        session.commit()
        return {"message": "Variants added successfully", "sizes": size_list, "color": color}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error while adding variants: {e}")

@router.delete(
    "/{product_id}/variants/{variant_id}",
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
            # image_path = os.path.join(".", product_variant.image_url.lstrip("/"))
            image_path = os.path.join(MEDIA, "variants", product_variant.image_url.split("/")[-1])

            if os.path.exists(image_path):
                os.remove(image_path)

        # Use the delete method from the Base class
        product_variant.delete(session)

        return {"message": "Product variant deleted successfully"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error while deleting product variant: {e}")

