from pydantic import BaseModel, EmailStr # Import BaseModel và EmailStr

# --- Input Schema ---
# Định nghĩa UserLogin bên ngoài hàm và kế thừa từ BaseModel
class UserLogin(BaseModel):
    email: EmailStr # Sử dụng EmailStr để validation tốt hơn
    password: str

# --- Output Schema (Ví dụ) ---
class LoginResponse(BaseModel):
    message: str
    email: EmailStr