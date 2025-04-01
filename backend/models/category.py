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
    
    def add_category(self, session):
        """Add a new category to the database."""
        return self.add(session)
    
    def update_category(self, session, **kwargs):
        """Update category details."""
        return self.update_info(session, **kwargs)
    
    def delete_category(self, session):
        """Delete category from the database."""
        return self.delete(session)
    
    @classmethod
    def get_category_by_name(cls, session, name):
        """Retrieve a category by name."""
        return session.query(cls).filter(cls.name == name).first()
    
    @classmethod
    def get_all_categories(cls, session):
        """Retrieve all categories."""
        return cls.get_all(session)
    
    @classmethod
    def get_category_by_id(cls, session, category_id):
        """Retrieve a category by its ID."""
        return cls.get_by_id(session, category_id)
    
    @classmethod
    def filter_by_category_ids(cls, session, category_ids):
        """Retrieve multiple categories by a list of IDs."""
        return session.query(cls).filter(cls.id.in_(category_ids)).all()
    
    @classmethod
    def filter_by_category_names(cls, session, category_names):
        """Retrieve multiple categories by a list of names."""
        return session.query(cls).filter(cls.name.in_(category_names)).all()
    
    def get_subcategories(self, session):
        """Retrieve all subcategories for the current category."""
        return session.query(Category).filter(Category.parent_id == self.id).all()
    
    def to_dict(self):
        """Convert objects to dictionaries for easy handling."""
        return self.to_dict