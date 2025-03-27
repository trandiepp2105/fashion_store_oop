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