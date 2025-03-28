from models.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    parent_id = Column(Integer, ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    
    parent = relationship("Category", remote_side=[id], backref="subcategories")
    products = relationship("ProductCategory", back_populates="category")

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}')>"

    def add_subcategory(self, subcategory):
        """Add a subcategory to the current category"""
        if subcategory not in self.subcategories:
            self.subcategories.append(subcategory)
            subcategory.parent = self

    def remove_subcategory(self, subcategory):
        """Remove a subcategory from the current category"""
        if subcategory in self.subcategories:
            self.subcategories.remove(subcategory)
            subcategory.parent = None

    def get_subcategories(self):
        """Returns a list of subcategories"""
        return self.subcategories

    def set_parent(self, parent_category):
        """Update parent category"""
        self.parent = parent_category

    def get_products(self):
        """Returns a list of products in the category"""
        return [product_category.product for product_category in self.products]
    
    def to_dict(self):
        """Convert objects to dictionaries for easy handling"""
        return {
            "id": self.id,
            "order_id": self.order_id,
            "total_refund": float(self.total_refund),
            "total_items": self.total_items,
            "status": self.status,
            "general_reason": self.general_reason,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "processed_at": self.processed_at.isoformat() if self.processed_at else None,
        }