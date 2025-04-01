from models.base import Base, BaseModel
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
import hashlib

def User(Base, BaseModel):
    __tablename__ = "user"

    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    phone_number = Column(String(20), unique=True)
    active = Column(Boolean, default=True)   
    
    def __repr__(self):
        return f"<User(email={self.email}, active={self.active})>"
    
    def getInfo(self):
        """Retrieve user information."""
        return {
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "active": self.active
        }
    
    def getCartItems(self):
        """Retrieve user's cart items."""
        return [item.get_info() for item in self.carts]
    
    def updateInfo(self, session, **kwargs):
        """Update user information."""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()
    
    def deleteUser(self, session):
        """Delete user from the database."""
        session.delete(self)
        session.commit()
    
    def viewOrderHistory(self):
        """Retrieve user's order history."""
        return [order.get_info() for order in self.orders]
    
    def addShippingInfo(self, session, **kwargs):
        """Add a new shipping address."""
        new_shipping_info = ShippingInfo(user_id=self.id, **kwargs)
        session.add(new_shipping_info)
        session.commit()
    
    def deactivateAccount(self, session):
        """Deactivate user account."""
        self.active = False
        session.commit()
    
    def setPassword(self, password):
        """Hash and set the user's password."""
        self.hash_password = hashlib.sha256(password.encode()).hexdigest()
    
    def checkPassword(self, password):
        """Check if the provided password matches the stored hash."""
        return self.hash_password == hashlib.sha256(password.encode()).hexdigest()
