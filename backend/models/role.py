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
    
    def addRole(self, session):
        """Add a new role to the database."""
        session.add(self)
        session.commit()

    def updateRole(self, session, **kwargs):
        """Update role details."""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        session.commit()

    def deleteRole(self, session):
        """Delete role from the database."""
        session.delete(self)
        session.commit()
    
    @classmethod
    def getRoleByName(cls, session, name):
        """Retrieve a role by name."""
        return session.query(cls).filter(cls.name == name).first()
    
    @classmethod
    def getAllRoles(cls, session):
        """Retrieve all roles."""
        return session.query(cls).all()
    
    @classmethod
    def getRoleById(cls, session, role_id):
        """Retrieve a role by its ID."""
        return session.query(cls).filter(cls.id == role_id).first()
    
class UserRole(Base):
    __tablename__ = "user_roles"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)
    
    user = relationship("User", back_populates="roles")
    role = relationship("Role", back_populates="users")
    
    def __repr__(self):
        return f"<UserRole(user_id={self.user_id}, role_id={self.role_id})>"
    
    def assignUserRole(self, session):
        """Assign a role to a user."""
        session.add(self)
        session.commit()

    def revokeUserRole(self, session):
        """Revoke a user's role."""
        session.delete(self)
        session.commit()
    
    @classmethod
    def getRolesByUser(cls, session, user_id):
        """Retrieve all roles assigned to a specific user."""
        return session.query(cls).filter_by(user_id=user_id).all()
    
    @classmethod
    def getUsersByRole(cls, session, role_id):
        """Retrieve all users assigned to a specific role."""
        return session.query(cls).filter_by(role_id=role_id).all()
    
    @classmethod
    def assignRoleToUser(cls, session, user_id, role_id):
        """Assign a role to a user."""
        user_role = cls(user_id=user_id, role_id=role_id)
        session.add(user_role)
        session.commit()
    
    @classmethod
    def revokeRoleFromUser(cls, session, user_id, role_id):
        """Revoke a role from a user."""
        user_role = session.query(cls).filter_by(user_id=user_id, role_id=role_id).first()
        if user_role:
            session.delete(user_role)
            session.commit()