# core/security.py
from datetime import datetime, timedelta, timezone
from typing import Optional, Any
from jose import jwt, JWTError
from passlib.context import CryptContext

from config import settings

# --- Password Hashing ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Xác minh mật khẩu thường với mật khẩu đã hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash mật khẩu."""
    return pwd_context.hash(password)

# --- JWT Token Creation ---
def create_access_token(subject: str | Any, expires_delta: Optional[timedelta] = None) -> str:
    """Tạo access token JWT."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expire, "sub": str(subject)} # 'sub' là subject (thường là user_id hoặc email)
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

# --- (Tùy chọn) Hàm xác minh token (sẽ cần cho các endpoint yêu cầu xác thực) ---
def verify_token(token: str, credentials_exception: Exception) -> Optional[str]:
    """Xác minh token và trả về subject (payload['sub']) nếu hợp lệ."""
    try:
        print(f"Verifying token: {token}")
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        subject: Optional[str] = payload.get("sub")
        if subject is None:
            raise credentials_exception
        # Thêm các kiểm tra khác nếu cần (ví dụ: token có bị thu hồi không?)
        return subject
    except JWTError:
        raise credentials_exception