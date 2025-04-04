from models.base import Base
from sqlalchemy import Column, Integer, String, UniqueConstraint

class Variant(Base):
    __tablename__ = "variant"
    __table_args__ = (
        UniqueConstraint('color', 'size', name='unique_color_size'),
        {"extend_existing": True}
    )
    id = Column(Integer, primary_key=True, autoincrement=True)
    color = Column(String(20), nullable=False)
    size = Column(String(20), nullable=False)

    def __repr__(self):
        return f"<Variant(id={self.id}, color={self.color}, size={self.size})>"

    @classmethod
    def filter_by_color(cls, session, color):
        return session.query(cls).filter(cls.color == color).all()
    
    @classmethod
    def filter_by_size(cls, session, size):
        return session.query(cls).filter(cls.size == size).all()