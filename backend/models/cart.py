from models.base import Base
from models.product import ProductVariant
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum, func
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from enums.order_status import OrderStatus

class CartItem(Base):
    __tablename__ = "cartitem"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    variant_id = Column(Integer, ForeignKey("variant.id", ondelete="CASCADE"), nullable=False)
    added_at = Column(DateTime, server_default=func.current_timestamp())  # Use server_default instead of default
    quantity = Column(Integer, default=1)
    
    def __repr__(self):
        return f"<CartItem(user_id={self.user_id}, product_id={self.product_id}, quantity={self.quantity})>"

    @classmethod
    def add_product_to_cart(cls, session, user_id, product_id, variant_id, quantity=1):
        """
        Add a product to the cart or update the quantity if it already exists.

        Args:
            session (Session): The database session.
            user_id (int): The ID of the user.
            product_id (int): The ID of the product.
            variant_id (int): The ID of the product variant.
            quantity (int, optional): The quantity to add. Defaults to 1.

        Returns:
            CartItem: The updated or newly created cart item.
        """
        cart_item = session.query(cls).filter_by(
            user_id=user_id, product_id=product_id, variant_id=variant_id
        ).first()
        
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = cls(user_id=user_id, product_id=product_id, variant_id=variant_id, quantity=quantity)
            session.add(cart_item)
        
        session.commit()
        return cart_item

    @classmethod
    def get_cart_items_by_user(cls, session, user_id):
        """
        Retrieve all cart items for a specific user.

        Args:
            session (Session): The database session.
            user_id (int): The ID of the user.

        Returns:
            list[CartItem]: A list of cart items for the user.
        """
        return session.query(cls).filter_by(user_id=user_id).all()
    
    def update_quantity(self, session, quantity):
        """
        Update the quantity of the cart item.

        Args:
            session (Session): The database session.
            quantity (int): The new quantity to set.
        """
        self.quantity = quantity
        session.commit()

    def increase_quantity(self, session, increment=1):
        """
        Increment the quantity of the cart item.

        Args:
            session (Session): The database session.
            increment (int, optional): The amount to increment. Defaults to 1.

        Raises:
            ValueError: If the increment exceeds the available stock or the product variant is not found.
        """
        product_variant = session.query(ProductVariant).get((self.product_id, self.variant_id))
        if product_variant:
            if self.quantity + increment <= product_variant.stock_quantity:
                self.quantity += increment
            else:
                raise ValueError("Cannot increase quantity beyond available stock.")
        else:
            raise ValueError("Product variant not found.")
        
        session.commit()

    def decrease_quantity(self, session, decrement=1):
        """
        Decrement the quantity of the cart item.

        Args:
            session (Session): The database session.
            decrement (int, optional): The amount to decrement. Defaults to 1.

        Notes:
            If the quantity becomes zero or less, the cart item is removed from the cart.
        """
        if self.quantity - decrement > 0:
            self.quantity -= decrement
        else:
            session.delete(self)
        session.commit()