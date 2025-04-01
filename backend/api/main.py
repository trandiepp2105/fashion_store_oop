from fastapi import APIRouter, HTTPException, status
from api.version_1 import auth, users, products, orders, cart, categories

router = APIRouter(
    prefix="/api/v1",
    # tags=["v1"],
)

# Import all routers from version_1
router.include_router(auth.router, tags=["auth"], prefix="/auth")
router.include_router(users.router, tags=["users"], prefix="/users")
router.include_router(products.router, tags=["products"], prefix="/products")
router.include_router(orders.router, tags=["orders"], prefix="/orders")
router.include_router(cart.router, tags=["cart"], prefix="/cart")
router.include_router(categories.router, tags=["categories"], prefix="/categories")
router.include_router(orders.router, tags=["orders"], prefix="/orders")



