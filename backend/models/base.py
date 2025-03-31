from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.orm import declarative_base, Session
from sqlalchemy.sql.functions import current_timestamp

Base = declarative_base()

class BaseRepository:
    def __init__(self, session: Session):
        self.session = session

    def save(self, instance):
        self.session.add(instance)
        self.session.commit()
        self.session.refresh(instance)
        return instance

    def delete(self, instance):
        self.session.delete(instance)
        self.session.commit()

    def get_by_id(self, model, id):
        return self.session.query(model).filter_by(id=id).first()

class BaseModel:
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=current_timestamp)
    updated_at = Column(DateTime, default=current_timestamp, onupdate=current_timestamp)

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