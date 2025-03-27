from models.base import Base, BaseModel
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship

class User(Base, BaseModel):
    __tablename__ = "users"

    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hash_password = Column(String(255), nullable=False)
    phone_number = Column(String(20), unique=True)
    active = Column(Boolean, default=True)
    
    roles = relationship("UserRole", back_populates="user")
    carts = relationship("CartItem", back_populates="user")
    orders = relationship("Order", back_populates="user")
    shipping_infos = relationship("ShippingInfo", back_populates="user")
    
    def __repr__(self):
        return f"<User(email={self.email}, active={self.active})>"
    
    def update_info(self, session, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()
