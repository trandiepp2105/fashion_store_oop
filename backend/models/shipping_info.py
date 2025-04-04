from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship

class ShippingInfo(Base):
    __tablename__ = "shippinginfo"
    __table_args__ = {"extend_existing": True}
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    is_default = Column(Boolean, default=False)
    recipient_name = Column(String(50), nullable=False)
    phone_number = Column(String(20), nullable=False)
    province_city = Column(String(255), nullable=False)
    district = Column(String(255), nullable=False)
    ward_commune = Column(String(255), nullable=False)
    specific_address = Column(Text, nullable=False)

    # user = relationship("User", back_populates="shipping_infos")
    
    # def get_shipping_info(self):
    #     """Retrieve shipping information details."""
    #     return {
    #         "recipient_name": self.recipient_name,
    #         "phone_number": self.phone_number,
    #         "province_city": self.province_city,
    #         "district": self.district,
    #         "ward_commune": self.ward_commune,
    #         "specific_address": self.specific_address,
    #         "is_default": self.is_default
    #     }
    
    def set_default(self, session):
        """Set this shipping information as the default one."""
        shipping_infos = session.query(ShippingInfo).filter_by(user_id=self.user_id).all()
        for info in shipping_infos:
            info.is_default = False
        self.is_default = True
        session.commit()
    
    @classmethod
    def get_all_shipping_infos_by_user(cls, session, user_id):
        """Retrieve all shipping addresses of a user."""
        return session.query(cls).filter_by(user_id=user_id).all()