from models.base import Base
from sqlalchemy import Column, String, Integer, Text, Enum, ForeignKey
from sqlalchemy.orm import relationship
from enums.role import Role
class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Enum(Role), nullable=False)
    description = Column(Text)

    users = relationship("UserRole", back_populates="role")
    
    def __repr__(self):
        return f"<Role(name={self.name})>"
    
    def add_role(self, session):
        session.add(self)
        session.commit()

    def update_role(self, session, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()

    def delete_role(self, session):
        session.delete(self)
        session.commit()

    @classmethod
    def get_role_by_name(cls, session, name):
        return session.query(cls).filter(cls.name == name).first()
    
class UserRole(Base):
    __tablename__ = "user_roles"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)
    
    user = relationship("User", back_populates="roles")
    role = relationship("Role", back_populates="users")
    
    def __repr__(self):
        return f"<UserRole(user_id={self.user_id}, role_id={self.role_id})>"
    
    def assign_user_role(self, session):
        session.add(self)
        session.commit()

    def revoke_user_role(self, session):
        session.delete(self)
        session.commit()