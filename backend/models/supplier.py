from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Enum, DateTime
from sqlalchemy.orm import relationship
from enums.supplier_status import SupplierStatus
class Supplier(Base, BaseModel):
    __tablename__ = "suppliers"
    
    company_name = Column(String(255), unique=True, nullable=False)
    contact_person = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=False)
    address = Column(Text, nullable = False)
    tax_id = Column(String(20), nullable=False)
    website = Column(String(255), nullable=True)
    status = Column(Enum(SupplierStatus), default=SupplierStatus.ACTIVE)
    started_at = Column(DateTime, nullable=False)

    products = relationship("Product", back_populates="supplier")
    
    def add_supplier(self, session):
        session.add(self)
        session.commit()
    
    def update_supplier(self, session, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()
    
    def delete_supplier(self, session):
        session.delete(self)
        session