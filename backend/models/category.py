from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Category(Base, BaseModel):
    __tablename__ = "category"
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    icon_url = Column(String(255), default="https://resource-server/category-icon/default.png")
    parent_id = Column(Integer, ForeignKey("category.id", ondelete="SET NULL"), nullable=True)

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}')>"
    
    def add_category(self, session):
        """
        Add a new category to the database.

        Args:
            session (Session): The SQLAlchemy session to use for the operation.

        Returns:
            Category: The added category instance.
        """
        return self.add(session)
    
    def update_category(self, session, **kwargs):
        """
        Update category details.

        Args:
            session (Session): The SQLAlchemy session to use for the operation.
            **kwargs: The fields to update with their new values.

        Returns:
            Category: The updated category instance.
        """
        return self.update_info(session, **kwargs)
    
    def delete_category(self, session):
        """
        Delete the category from the database.

        Args:
            session (Session): The SQLAlchemy session to use for the operation.

        Returns:
            bool: True if the deletion was successful, False otherwise.
        """
        return self.delete(session)
    
    @classmethod
    def get_category_by_name(cls, session, name):
        """
        Retrieve a category by its name.

        Args:
            session (Session): The SQLAlchemy session to use for the query.
            name (str): The name of the category to retrieve.

        Returns:
            Category: The category instance if found, None otherwise.
        """
        return session.query(cls).filter(cls.name == name).first()
    
    @classmethod
    def get_all_categories(cls, session):
        """
        Retrieve all categories from the database.

        Args:
            session (Session): The SQLAlchemy session to use for the query.

        Returns:
            list[Category]: A list of all category instances.
        """
        return cls.get_all(session)
    
    @classmethod
    def get_category_by_id(cls, session, category_id):
        """
        Retrieve a category by its ID.

        Args:
            session (Session): The SQLAlchemy session to use for the query.
            category_id (int): The ID of the category to retrieve.

        Returns:
            Category: The category instance if found, None otherwise.
        """
        return cls.get_by_id(session, category_id)
    
    @classmethod
    def filter_by_category_ids(cls, session, category_ids):
        """
        Retrieve multiple categories by a list of IDs.

        Args:
            session (Session): The SQLAlchemy session to use for the query.
            category_ids (list[int]): A list of category IDs to filter by.

        Returns:
            list[Category]: A list of category instances matching the IDs.
        """
        return session.query(cls).filter(cls.id.in_(category_ids)).all()
    
    @classmethod
    def filter_by_category_names(cls, session, category_names):
        """
        Retrieve multiple categories by a list of names.

        Args:
            session (Session): The SQLAlchemy session to use for the query.
            category_names (list[str]): A list of category names to filter by.

        Returns:
            list[Category]: A list of category instances matching the names.
        """
        return session.query(cls).filter(cls.name.in_(category_names)).all()
    
    def get_subcategories(self, session):
        """
        Retrieve all subcategories for the current category.

        Args:
            session (Session): The SQLAlchemy session to use for the query.

        Returns:
            list[Category]: A list of subcategory instances.
        """
        return session.query(Category).filter(Category.parent_id == self.id).all()
    
    def to_nested_dict(self, session):
        """
        Convert the category and its subcategories into a nested dictionary.
        """
        subcategories = getattr(self, "subcategories", [])
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "parent_id": self.parent_id,
            "icon_url": self.icon_url,
            "subcategories": [subcategory.to_nested_dict(session) for subcategory in subcategories]
        }

