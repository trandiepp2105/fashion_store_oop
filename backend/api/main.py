from fastapi import APIRouter, HTTPException, status
<<<<<<< HEAD
from api.version_1 import auth, users, products, orders, cart, categories, role
=======
from api.version_1 import auth, users, products, orders, cart, categories, orders_return
>>>>>>> 0ea4a6b1b4a7b0cd42303119080f5f1105ae142a

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
<<<<<<< HEAD
api_v1_router.include_router(orders.router, tags=["orders"], prefix="/orders")
api_v1_router.include_router(role.router, tags=["role"], prefix="/roles")


=======
api_v1_router.include_router(orders_return.router, tags=["orders_return"], prefix="/orders_return")
>>>>>>> 0ea4a6b1b4a7b0cd42303119080f5f1105ae142a

