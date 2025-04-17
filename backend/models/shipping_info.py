from models.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text

class ShippingInfo(Base):
    __tablename__ = "shippinginfo"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    recipient_name = Column(String(50), nullable=False)
    phone_number = Column(String(20), nullable=False)
    province_city = Column(String(255), nullable=False)
    district = Column(String(255), nullable=False)
    ward_commune = Column(String(255), nullable=False)
    specific_address = Column(Text, nullable=False)
    is_default = Column(Boolean, default=False)

    def set_default(self, session):
        """Set this shipping information as the default one."""
        shipping_infos = session.query(ShippingInfo).filter_by(user_id=self.user_id).all()
        for info in shipping_infos:
            # info.is_default = False
            info.update_info(session, is_default=False)
        

        # self.is_default = True
        self.update_info(session, is_default=True)

    @classmethod
    def get_all_shipping_infos_by_user(cls, session, user_id):
        """Retrieve all shipping addresses of a user."""
        return session.query(cls).filter_by(user_id=user_id).all()