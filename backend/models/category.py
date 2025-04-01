from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Category(Base, BaseModel):
    __tablename__ = "category"
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    icon_url = Column(String(255), default="https://resource-server/category-icon/default.png")
    parent_id = Column(Integer, ForeignKey("category.id", ondelete="SET NULL"), nullable=True)
    
    # parent = relationship("Category", remote_side=[id], backref="subcategories")
    # products = relationship("ProductCategory", back_populates="category")

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
            "name": self.name,
            "parent_id": self.parent_id
        }