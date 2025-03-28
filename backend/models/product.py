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
    
    # Relationships with other tables
    categories = relationship("ProductCategory", back_populates="product")
    variants = relationship("ProductVariant", back_populates="product")
    supplier = relationship("Supplier", back_populates="products")

    def __repr__(self):
        return f"<Product(name={self.name}, selling_price={self.selling_price})>"

    @staticmethod
    def current_time():
        """Trả về thời gian hiện tại dưới dạng chuỗi."""
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        """Chuyển đổi đối tượng Product thành dict."""
        return {
            "id": self.id,
            "supplier_id": self.supplier_id,
            "name": self.name,
            "description": self.description,
            "original_price": self.original_price,
            "selling_price": self.selling_price,
            "total_ratings": self.total_ratings,
            "rating_sum": self.rating_sum,
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat() if hasattr(self, "created_at") and self.created_at else None,
            "updated_at": self.updated_at.isoformat() if hasattr(self, "updated_at") and self.updated_at else None,
        }

    def get_average_rating(self):
        """Tính và trả về điểm đánh giá trung bình của sản phẩm."""
        if self.total_ratings > 0:
            return self.rating_sum / self.total_ratings
        return None

    def add_variant(self, variant):
        """Thêm một đối tượng ProductVariant vào danh sách variants."""
        self.variants.append(variant)

    def display(self):
        """Hiển thị thông tin chi tiết của sản phẩm và các variant kèm theo."""
        print(f"Product ID: {self.id}")
        print(f"Name: {self.name}")
        print(f"Description: {self.description}")
        print(f"Original Price: {self.original_price}")
        print(f"Selling Price: {self.selling_price}")
        avg_rating = self.get_average_rating()
        print(f"Average Rating: {avg_rating if avg_rating is not None else 'No ratings yet'}")
        print(f"Image URL: {self.image_url}")
        if self.supplier:
            print(f"Supplier: {self.supplier}")  # Giả sử Supplier có __repr__ hợp lý
        else:
            print("Supplier: None")
        print("Variants:")
        for variant in self.variants:
            variant.display()
            print("-" * 20)

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
        """Chuyển đổi đối tượng ProductVariant thành dict."""
        return {
            "id": self.id,
            "product_id": self.product_id,
            "description": self.description,
            "variant_id": self.variant_id,
            "stock_quantity": self.stock_quantity,
            "image_url": self.image_url,
        }

    def update_stock(self, session, quantity):
        """
        Cập nhật số lượng tồn kho của variant và commit thay đổi vào cơ sở dữ liệu.
        :param session: SQLAlchemy session
        :param quantity: Số lượng cần cộng thêm (có thể âm nếu giảm số lượng)
        """
        self.stock_quantity += quantity
        session.commit()

    def display(self):
        """Hiển thị thông tin chi tiết của ProductVariant."""
        print(f"Product Variant ID: {self.id}")
        print(f"Product ID: {self.product_id}")
        print(f"Variant ID: {self.variant_id}")
        print(f"Description: {self.description}")
        print(f"Stock Quantity: {self.stock_quantity}")
        print(f"Image URL: {self.image_url}")

class ProductCategory(Base):
    __tablename__ = "product_categories"
    
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    
    product = relationship("Product", back_populates="categories")
    category = relationship("Category", back_populates="products")

    def __repr__(self):
        return f"<ProductCategory(product_id={self.product_id}, category_id={self.category_id})>"

    def to_dict(self):
        """Chuyển đổi đối tượng ProductCategory thành dict."""
        return {
            "product_id": self.product_id,
            "category_id": self.category_id,
        }
