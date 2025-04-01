from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship

class ShippingInfo(Base, BaseModel):
    __tablename__ = "shippinginfo"
    
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    is_default = Column(Boolean, default=False)
    recipient_name = Column(String(50), nullable=False)
    phone_number = Column(String(20), nullable=False)
    provine_city = Column(String(255), nullable=False)
    district = Column(String(255), nullable=False)
    ward_commune = Column(String(255), nullable=False)
    specific_address = Column(Text, nullable=False)
    
    def addShippingInfo(self, session):
        """Add new shipping information to the database."""
        session.add(self)
        session.commit()
    
    def updateShippingInfo(self, session, **kwargs):
        """Update shipping information details."""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()
    
    def deleteShippingInfo(self, session):
        """Delete shipping information from the database."""
        session.delete(self)
        session.commit()
    
    def getShippingInfo(self):
        """Retrieve shipping information details."""
        return {
            "recipient_name": self.recipient_name,
            "phone_number": self.phone_number,
            "provine_city": self.provine_city,
            "district": self.district,
            "ward_commune": self.ward_commune,
            "specific_address": self.specific_address,
            "is_default": self.is_default
        }
    
    def setDefault(self, session):
        """Set this shipping information as the default one."""
        for info in self.user.shipping_infos:
            info.is_default = False
        self.is_default = True
        session.commit()
    
    @classmethod
    def getAllShippingInfosByUser(cls, session, user_id):
        """Retrieve all shipping addresses of a user."""
        return session.query(cls).filter_by(user_id=user_id).all()
