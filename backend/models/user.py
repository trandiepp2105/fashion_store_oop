from models.base import Base, BaseModel
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
import hashlib

class User(Base, BaseModel):
    __tablename__ = "user"

    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    phone_number = Column(String(20), unique=True)
    active = Column(Boolean, default=True)
    role = Column(String(50), default="customer")

    shipping_infos = relationship("ShippingInfo", back_populates="user", cascade="all, delete-orphan")
    user_roles = relationship("UserRole", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User(email={self.email}, active={self.active})>"
    
    def get_cart_items(self):
        """Retrieve user's cart items."""
        return [item.get_info() for item in self.carts]
    
    def view_order_history(self):
        """Retrieve user's order history."""
        return [order.get_info() for order in self.orders]
    
    def add_shipping_info(self, session, **kwargs):
    """ Check if that address is default (is_default=True),
        then other addresses should be converted to False"""
    if kwargs.get("is_default", False):
        for info in self.shipping_infos:
            info.is_default = False
    """Add a new shipping address."""
    new_shipping_info = ShippingInfo(user_id=self.id, **kwargs)
    session.add(new_shipping_info)
    session.commit()
    
    def set_password(self, password):
        """Hash and set the user's password."""
        self.password = hashlib.sha256(password.encode()).hexdigest()
    
    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return self.password == hashlib.sha256(password.encode()).hexdigest()

    def update_status(self, session, active: bool):
        """Update user status (Active/Inactive)."""
        self.active = active
        session.commit()
    
    def update_role(self, session, role: str):
        """Update user role (Admin/Customer)."""
        if role in ["admin", "customer"]:
            self.role = role
            session.commit()

    @classmethod
    def filter_by_phone_number(cls, session, phone_number):
        """Filter users by phone number."""
        return session.query(cls).filter_by(phone_number=phone_number).all()
    
    @classmethod
    def filter_by_email(cls, session, email):
        """Filter users by email."""
        return session.query(cls).filter_by(email=email).all()
    
    @classmethod
    def filter_by_status(cls, session, active):
        """Filter users by status (active/inactive)."""
        return session.query(cls).filter_by(active=active).all()
    
    @classmethod
    def filter_by_role(cls, session, role):
        """Retrieve users filtered by role."""
        return session.query(cls).filter(cls.role == role).all()
