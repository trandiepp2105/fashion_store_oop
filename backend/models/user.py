from models.base import Base, BaseModel
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
import hashlib
from models.shipping_info import ShippingInfo
from models.cart import CartItem
from models.order import Order
from models.role import UserRole, Role
from werkzeug.security import generate_password_hash, check_password_hash
from core.security import verify_token
from fastapi import Depends, HTTPException, status, Request
from database.session import get_db
from config import settings

class User(Base, BaseModel):
    """
    Represents a user in the system.

    Attributes:
        name (str): The name of the user.
        email (str): The email address of the user.
        password (str): The hashed password of the user.
        phone_number (str): The phone number of the user.
        active (bool): Indicates whether the user account is active.
    """
    __tablename__ = "user"

    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    phone_number = Column(String(20), unique=True)
    active = Column(Boolean, default=True)

    def __init__(self, name, email, password, phone_number):
        """
        Initialize a new User instance with hashed password.

        Args:
            name (str): The name of the user.
            email (str): The email of the user.
            password (str): The plain text password of the user.
        """
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)
        self.phone_number =phone_number
        self.active = True
    def __repr__(self):
        """
        Return a string representation of the User instance.

        Returns:
            str: A string representation of the user.
        """
        return f"<User(email={self.email}, active={self.active})>"
    
    def get_cart_items(self, session):
        """
        Retrieve all cart items belonging to this user.

        Args:
            session (Session): The database session.

        Returns:
            list[CartItem]: A list of cart items for this user.
        """
        return session.query(CartItem).filter_by(user_id=self.id).all()
    
    def add_shipping_info(self, session, recipient_name, phone_number, province_city, district, ward_commune, specific_address, is_default=False):
        """
        Add a new shipping info for this user.

        Args:
            session (Session): The database session.
            recipient_name (str): The recipient's name.
            phone_number (str): The recipient's phone number.
            province_city (str): The province or city.
            district (str): The district.
            ward_commune (str): The ward or commune.
            specific_address (str): The specific address.
            is_default (bool, optional): Whether this is the default shipping info. Defaults to False.

        Returns:
            ShippingInfo: The newly created shipping info.
        """
        shipping_info = ShippingInfo(
            user_id=self.id,
            recipient_name=recipient_name,
            phone_number=phone_number,
            province_city=province_city,
            district=district,
            ward_commune=ward_commune,
            specific_address=specific_address,
            is_default=is_default
        )
        shipping_info.save(session)
        return shipping_info
    
    def set_password(self, password):
        """
        Hash and set the user's password.

        Args:
            password (str): The plain text password to hash and store.
        """
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        """
        Check if the provided password matches the stored hash.

        Args:
            password (str): The plain text password to verify.

        Returns:
            bool: True if the password matches, False otherwise.
        """
        return check_password_hash(self.password, password)

    def get_orders(self, session):
        """
        Retrieve all orders belonging to this user.

        Args:
            session (Session): The database session.

        Returns:
            list[Order]: A list of orders for this user.
        """
        return session.query(Order).filter_by(user_id=self.id).all()

    @classmethod
    def filter_by_phone_number(cls, session, phone_number):
        """
        Filter users by phone number.

        Args:
            session (Session): The database session.
            phone_number (str): The phone number to filter by.

        Returns:
            list[User]: A list of users with the specified phone number.
        """
        return session.query(cls).filter_by(phone_number=phone_number).all()
    
    @classmethod
    def filter_by_email(cls, session, email):
        """
        Filter users by email.

        Args:
            session (Session): The database session.
            email (str): The email to filter by.

        Returns:
            list[User]: A list of users with the specified email.
        """
        return session.query(cls).filter_by(email=email).all()

    @classmethod
    def filter_by_phone_number(cls, session, phone_number):
        """
        Filter users by phone number.

        Args:
            session (Session): The database session.
            phone_number (str): The phone number to filter by.

        Returns:
            list[User]: A list of users with the specified phone number.
        """
        return session.query(cls).filter_by(phone_number=phone_number).all()
    @classmethod
    def filter_by_status(cls, session, active):
        """
        Filter users by status (active/inactive).

        Args:
            session (Session): The database session.
            active (bool): The status to filter by.

        Returns:
            list[User]: A list of users with the specified status.
        """
        return session.query(cls).filter_by(active=active).all()
    
    @classmethod
    def filter_by_role(cls, session, role_id):
        """
        Retrieve users filtered by role ID using the UserRole table.

        Args:
            session (Session): The database session.
            role_id (int): The ID of the role.

        Returns:
            list[User]: A list of users with the specified role.
        """
        return session.query(cls).join(UserRole).filter(UserRole.role_id == role_id).all()
    @classmethod
    def get_by_email(cls, session, email):
        """
        Retrieve a user by their email address.

        Args:
            session (Session): The database session.
            email (str): The email address of the user.

        Returns:
            User: The user with the specified email, or None if not found.
        """
        return session.query(cls).filter_by(email=email).first()
    
    @classmethod
    def verify_token(cls, session, token):
        """
        Verify a token and return the corresponding user.

        Args:
            session (Session): The database session.
            token (str): The token to verify.

        Returns:
            User: The user associated with the token, or None if not found.
        """
        try:
            print(token)
            email = verify_token(token, credentials_exception=None)
            if email:
                user = session.query(cls).filter_by(email=email).first()
                if user:
                    return user
            return None
        except Exception as e:
            print(f"Token verification failed: {e}")
            return None

    @classmethod
    def get_current_user(cls, request: Request, session=Depends(get_db)):
        """
        Retrieve the currently authenticated user based on the token in the request.

        Args:
            request (Request): The HTTP request object to extract the token.
            session (Session): The database session.

        Returns:
            User: The authenticated user.

        Raises:
            HTTPException: If the token is missing, invalid, or the user does not exist.
        """
        # Extract token from cookies
        token = request.cookies.get(settings.ACCESS_TOKEN_COOKIE_NAME)
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication token is missing.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Verify token and retrieve user
        user = cls.verify_token(session, token)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return user
    
    def get_roles(self, session):
        """
        Retrieve all roles associated with this user.

        Args:
            session (Session): The database session.

        Returns:
            list[Role]: A list of roles for this user.
        """
        return session.query(Role).join(UserRole).filter(UserRole.user_id == self.id).all()