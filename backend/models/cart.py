from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
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
    added_at = Column(DateTime, default=current_timestamp)
    quantity = Column(Integer, default=1)
    
    def __repr__(self):
        return f"<CartItem(user_id={self.user_id}, product_id={self.product_id}, quantity={self.quantity})>"


    @classmethod
    def add_product_to_cart(cls, session, user_id, product_id, variant_id, quantity=1):
        """Add a product to the cart or update the quantity if it already exists."""
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
        """Get all cart items for a user."""
        return session.query(cls).filter_by(user_id=user_id).all()