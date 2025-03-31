from models.base import Base
from sqlalchemy import Column, Integer, Enum, UniqueConstraint
from enums.sizes import BaseSizeEnum
from enums.colors import FashionColor

class Variant(Base):
    __tablename__ = "variants"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    color = Column(Enum(FashionColor), nullable=False)
    size = Column(Enum(BaseSizeEnum), nullable=False)

    __table_args__ = (UniqueConstraint('color', 'size', name='unique_color_size'),)

    def __repr__(self):
        return f"<Variant(color={self.color.value}, size={self.size.value})>"
