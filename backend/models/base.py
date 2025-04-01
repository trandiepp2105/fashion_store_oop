from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.orm import declarative_base, Session, DeclarativeBase
from database.metadata import database_metadata


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

    #Alias của save vì chức năng của chúng là như nhau
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
    def get_by_id(cls, session: Session, record_id):
        return session.query(cls).filter_by(id=record_id).first()
    
    @classmethod
    def get_all(cls, session: Session):
        return session.query(cls).all()
    
    #Thêm Variant cho Product
    @classmethod
    def create_or_get(cls, session: Session, **kwargs):
        instance = session.query(cls).filter_by(**kwargs).first()
        
        #Nếu đã có thì trả về luôn
        if instance:
            return instance  
        
        #Nếu chưa có thì tạo mới
        instance = cls(**kwargs)
        session.add(instance)
        session.commit()
        return instance

class BaseModel:
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, server_default=func.current_timestamp(), nullable=False)
    updated_at = Column(DateTime, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)

