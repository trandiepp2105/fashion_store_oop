from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.orm import declarative_base, Session, DeclarativeBase
from database.metadata import database_metadata
from sqlalchemy.sql.functions import current_timestamp

class Base(DeclarativeBase):
    metadata = database_metadata
    
    def save(self, session: Session):
        session.add(self)
        session.commit()
        session.refresh(self)
        return self

    def delete(self, session: Session):
        session.delete(self)
        session.commit()

    # alias for save method
    def add(self, session: Session): 
        return self.save(session)
    
    def update_info(self, session: Session, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()
        return self
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    
    @classmethod
    def get_all(cls, session: Session):
        return session.query(cls).all()

    @classmethod
    def get_by_id(cls, session: Session, record_id: int):
        instance = session.get(cls, record_id)
        if not instance:
            raise ValueError(f"{cls.__name__} with ID {record_id} not found.")
        return instance
    
    @classmethod
    def get_or_create(cls, session: Session, **kwargs):
        instance = session.query(cls).filter_by(**kwargs).first()
        if instance:
            return instance, False  # Return the instance and False (not created)
        
        # Create a new instance if it doesn't exist
        instance = cls(**kwargs)
        session.add(instance)
        session.commit()
        session.refresh(instance)  # Refresh to get the latest state
        return instance, True  # Return the instance and True (created)


    
class BaseModel:
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, server_default=func.current_timestamp(),
                 nullable=False)
    updated_at = Column(DateTime, server_default=func.current_timestamp(), 
                onupdate=func.current_timestamp(), nullable=False)

