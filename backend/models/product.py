from models.base import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Product(Base, BaseModel):
    __tablename__ = "products"

    supplier_id = Column(Integer, ForeignKey("suppliers.id", ondelete="SET NULL"), nullable=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    original_price = Column(Integer, nullable=False)
    selling_price = Column(Integer, nullable=False)
    total_ratings = Column(Integer, default=0)
    rating_sum = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)
    
    categories = relationship("ProductCategory", back_populates="product")
    variants = relationship("ProductVariant", back_populates="product")
    supplier = relationship("Supplier", back_populates="products")

    def __repr__(self):
        return f"<Product(name={self.name}, selling_price={self.selling_price})>"

    @staticmethod
    def current_time():
        """Trả về thời gian hiện tại dưới dạng chuỗi theo định dạng 'YYYY-MM-DD HH:MM:SS'.
        Tham số: Không
        Trả về: str: Thời gian hiện tại
        """
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        return {
            "id": self.id,
            "supplier_id": self.supplier_id,
            "name": self.name,
            "description": self.description,
            "original_price": self.original_price,
            "selling_price": self.selling_price,
            "total_ratings": self.total_ratings,
            "rating_sum": self.rating_sum,
            "average_rating": self.get_average_rating(),
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat() if hasattr(self, "created_at") and self.created_at else None,
            "updated_at": self.updated_at.isoformat() if hasattr(self, "updated_at") and self.updated_at else None,
        }

    def get_average_rating(self):
        """Tính toán và trả về điểm đánh giá trung bình của sản phẩm.
        Tham số: Không có
        Trả về: float hoặc None: Điểm đánh giá trung bình, hoặc None nếu chưa có đánh giá.
        """
        if self.total_ratings > 0:
            return self.rating_sum / self.total_ratings
        return None

    def update_info(self, name=None, description=None, original_price=None, selling_price=None, image_url=None, supplier_id=None):
        if name is not None:
            self.name = name
        if description is not None:
            self.description = description
        if original_price is not None:
            self.original_price = original_price
        if selling_price is not None:
            self.selling_price = selling_price
        if image_url is not None:
            self.image_url = image_url
        if supplier_id is not None:
            self.supplier_id = supplier_id
        self.updated_at = datetime.now()


class ProductVariant(Base, BaseModel):
    __tablename__ = "product_variants"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text)
    variant_id = Column(Integer, ForeignKey("variants.id", ondelete="CASCADE"), nullable=False)
    stock_quantity = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)

    product = relationship("Product", back_populates="variants")
    
    def __repr__(self):
        return f"<ProductVariant(variant_id={self.variant_id}, stock_quantity={self.stock_quantity})>"

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "description": self.description,
            "variant_id": self.variant_id,
            "stock_quantity": self.stock_quantity,
            "image_url": self.image_url,
        }

    def update_stock(self, session, quantity):
        """Cập nhật số lượng tồn kho cho phiên bản sản phẩm.
        Tham số: 
            session (SQLAlchemy session): dùng để lưu thay đổi về số lượng tồn kho
            quantity (int): Số lượng cần cộng thêm (có thể âm nếu muốn giảm số lượng).
        Trả về: None
        """
        self.stock_quantity += quantity
        session.commit()


class ProductCategory(Base):
    __tablename__ = "product_categories"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    
    product = relationship("Product", back_populates="categories")
    category = relationship("Category", back_populates="products")

    def __repr__(self):
        return f"<ProductCategory(product_id={self.product_id}, category_id={self.category_id})>"

    def to_dict(self):
        return {
            "product_id": self.product_id,
            "category_id": self.category_id,
        }
