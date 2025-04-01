from fastapi import APIRouter, HTTPException, status
from api.version_1 import auth, users, products, orders, cart, categories, role

api_v1_router = APIRouter(
    prefix="/api/v1",
    # tags=["v1"],
)

# Import all routers from version_1
api_v1_router.include_router(auth.router, tags=["auth"], prefix="/auth")
api_v1_router.include_router(users.router, tags=["users"], prefix="/users")
api_v1_router.include_router(products.router, tags=["products"], prefix="/products")
api_v1_router.include_router(orders.router, tags=["orders"], prefix="/orders")
api_v1_router.include_router(cart.router, tags=["cart"], prefix="/cart")
api_v1_router.include_router(categories.router, tags=["categories"], prefix="/categories")
api_v1_router.include_router(orders.router, tags=["orders"], prefix="/orders")
api_v1_router.include_router(role.router, tags=["roles"], prefix="/roles")


