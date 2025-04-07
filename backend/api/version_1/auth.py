from fastapi import APIRouter, HTTPException, status, Depends, Response, Request
from sqlalchemy.orm import Session
from datetime import timedelta

from models.user import User
from database.session import get_db
from core.security import create_access_token # Import hàm tạo token
from config import settings # Import settings để lấy cấu hình cookie
from schemas.auth import UserLogin, LoginResponse # Import các schema đã định nghĩa
router = APIRouter()

 

@router.post(
    "/login",
    response_model=LoginResponse, # Sử dụng response model mới
    status_code=status.HTTP_200_OK,
    summary="login",
    description="Đăng nhập người dùng và đặt access token vào cookie."
)
def login(
    response: Response, # Thêm tham số Response để set cookie
    user_data: UserLogin,
    session: Session = Depends(get_db)
):
    """
    Đăng nhập người dùng, tạo access token và lưu vào HTTPOnly cookie.

    Args:
        response (Response): Đối tượng Response của FastAPI để set cookie.
        user_data (UserLogin): Dữ liệu đăng nhập (email, password).
        session (Session): Dependency session database.

    Returns:
        LoginResponse: Thông báo đăng nhập thành công và email người dùng.

    Raises:
        HTTPException: 401 nếu email hoặc mật khẩu không hợp lệ.
    """
    # 1. Tìm người dùng bằng email
    user = User.get_by_email(session, user_data.email)
    if not user:
        # Dùng thông báo chung chung để tránh tiết lộ email nào tồn tại
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email hoặc mật khẩu không chính xác",
            headers={"WWW-Authenticate": "Bearer"}, # Tiêu chuẩn cho lỗi 401
        )

    # 2. Xác minh mật khẩu
    if not user.check_password(user_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email hoặc mật khẩu không chính xác",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. (Tùy chọn) Kiểm tra người dùng có active không (nếu có trường is_active)
    # if not user.is_active:
    #     raise HTTPException(status_code=400, detail="Tài khoản không hoạt động")

    # 4. Tạo access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.email,  # Hoặc user.id tùy vào cách bạn muốn định danh
        expires_delta=access_token_expires
    )

    # 5. Đặt token vào cookie
    response.set_cookie(
        key=settings.ACCESS_TOKEN_COOKIE_NAME,
        value=access_token,
        max_age=int(access_token_expires.total_seconds()), # Thời gian sống của cookie (giây)
        expires=int(access_token_expires.total_seconds()), # Tương thích trình duyệt cũ
        path="/", # Cookie có hiệu lực trên toàn bộ site
        domain=None,  # Để None nếu không cần chia sẻ cookie giữa các subdomain
        secure=settings.SECURE_COOKIE,  # False nếu đang phát triển trên localhost
        httponly=settings.HTTP_ONLY_COOKIE, # Ngăn JS truy cập
        samesite=settings.SAME_SITE_COOKIE,  # 'lax' nếu không dùng HTTPS
    )

    # 6. Trả về phản hồi thành công
    return LoginResponse(message="Đăng nhập thành công", email=user.email)

@router.post(
    "/logout",
    status_code=status.HTTP_200_OK,
    summary="Logout",
    description="Log out the user by clearing the authentication token from cookies."
)
def logout(response: Response):
    """
    Log out the user by clearing the authentication token from cookies.

    Args:
        response (Response): The HTTP response object to clear the cookie.

    Returns:
        dict: A message indicating successful logout.
    """
    response.delete_cookie(
        key=settings.ACCESS_TOKEN_COOKIE_NAME,
        path="/",  # Ensure the cookie is cleared site-wide
    )
    return {"message": "Logged out successfully."}