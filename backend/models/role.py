from models.base import Base, BaseModel
from sqlalchemy import Column, String, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

class Role(Base):
    __tablename__ = "role"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(Text, default="No description provided")
    
    #user_roles = relationship("UserRole", back_populates="role", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Role(name={self.name})>"
    
    @classmethod
    def get_role_by_name(cls, session, name):
        """Retrieve a role by name."""
        return session.query(cls).filter(cls.name == name).first()

class UserRole(Base):
    __tablename__ = "userrole"
    __table_args__ = {"extend_existing": True}
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True)
    role_id = Column(Integer, ForeignKey("role.id", ondelete="CASCADE"), primary_key=True)
    
    #user = relationship("User", back_populates="user_roles")
    #role = relationship("Role", back_populates="user_roles")

    def __repr__(self):
        return f"<UserRole(user_id={self.user_id}, role_id={self.role_id})>"
    
    @classmethod
    def get_roles_by_user(cls, session, user_id):
        """Retrieve all roles assigned to a specific user."""
        return session.query(cls).filter_by(user_id=user_id).all()
    
    @classmethod
    def get_users_by_role(cls, session, role_id):
        """Retrieve all users assigned to a specific role."""
        return session.query(cls).filter_by(role_id=role_id).all()
    
    @classmethod
    def assign_role_to_user(cls, session, user_id, role_id):
        """Assign a role to a user."""
        user_role = cls(user_id=user_id, role_id=role_id)
        user_role.save(session)
    
    @classmethod
    def revoke_role_from_user(cls, session, user_id, role_id):
        """Revoke a role from a user."""
        user_role = session.query(cls).filter_by(user_id=user_id, role_id=role_id).first()
        if user_role:
            user_role.delete(session)
            # session.delete(user_role)
            # session.commit()