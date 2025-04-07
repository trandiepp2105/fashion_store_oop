import os
import urllib.parse

# MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
# MYSQL_PORT = os.getenv("MYSQL_PORT", "3308")
# MYSQL_ROOT_PASSWORD = os.getenv("MYSQL_ROOT_PASSWORD", "Diep2105@")
# MYSQL_USER = os.getenv("MYSQL_USER", "root")
# MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "Diep2105@")    
# MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "fashion_store")

MYSQL_HOST = "127.0.0.1"
MYSQL_PORT = "3308"
MYSQL_ROOT_PASSWORD = "Diep2105@"
MYSQL_USER = "root"
MYSQL_PASSWORD = "Diep2105@" 
MYSQL_DATABASE = "fashion_store"

MYSQL_PASSWORD_ENCODED = urllib.parse.quote(MYSQL_PASSWORD)

def get_mysql_connection_url():
    return f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD_ENCODED}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"


SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key_should_be_changed")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60*24 # Token hết hạn sau 30 phút
REFRESH_TOKEN_EXPIRE_DAYS = 7  
# --- Cookie Settings ---
ACCESS_TOKEN_COOKIE_NAME = "access_token"
# Đặt thành False nếu đang phát triển trên localhost (không HTTPS)
SECURE_COOKIE = os.getenv("SECURE_COOKIE", "False").lower() in ("true", "1", "t")
# Đặt thành 'lax' để tránh lỗi khi không dùng HTTPS
SAME_SITE_COOKIE = os.getenv("SAME_SITE_COOKIE", "lax")
# Ngăn JavaScript truy cập cookie (bảo vệ khỏi XSS)
HTTP_ONLY_COOKIE = False
# Kiểm soát khi nào cookie được gửi (bảo vệ khỏi CSRF)
# 'lax' (mặc định tốt), 'strict', 'none'
