from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class ShippingInfo(Base, BaseModel):
    __tablename__ = "shipping_infos"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    is_default = Column(Boolean, default=False)
    recipient_name = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=False)
    provine_city = Column(String(255), nullable=False)
    district = Column(String(255), nullable=False)
    ward_commune = Column(String(255), nullable=False)
    specific_address = Column(String(255), nullable=False)
    user = relationship("User", back_populates="shipping_infos")
    
    def add_shipping_info(self, session):
        session.add(self)
        session.commit()

    def update_shipping_info(self, session, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()

    def delete_shipping_info(self, session):
        session.delete(self)
        session.commit()