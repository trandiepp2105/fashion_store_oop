from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from enums.order_status import OrderStatus

class Order(Base, BaseModel):
    __tablename__ = "orders"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    shipping_info_id = Column(Integer, ForeignKey("shipping_infos.id", ondelete="SET NULL"), nullable=True)
    total_amount = Column(Integer, nullable=False)
    final_amount = Column(Integer, nullable=False)
    order_date = Column(DateTime, default=current_timestamp)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    payments = relationship("Payment", back_populates="order")
    
    def add_order(self, session):
        session.add(self)
        session.commit()

    def update_status(self, session, new_status):
        self.status = new_status
        session.commit()
    
    def cancel_order(self, session):
        """Cancel order if not delivered."""
        if self.status in [OrderStatus.PENDING, OrderStatus.PACKAGED]:
            self.status = OrderStatus.CANCELLED
            session.commit()
            return True
        return False
    
    def get_total_items(self):
        """Returns the total number of products in the order."""
        return sum(item.quantity for item in self.items)
    
    @classmethod
    def get_orders_by_user(cls, session, user_id):
        """Query a user's list of orders."""
        return session.query(cls).filter_by(user_id=user_id).all()
    
    @classmethod
    def get_order_by_id(cls, session, order_id):
        """Get order information by order_id."""
        return session.query(cls).filter_by(id=order_id).first()
    
    def to_dict(self):
        """Convert objects to dictionaries."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "shipping_info_id": self.shipping_info_id,
            "total_amount": self.total_amount,
            "final_amount": self.final_amount,
            "order_date": self.order_date.isoformat() if self.order_date else None,
            "status": self.status.name,
        }


class OrderItem(Base):
    __tablename__ = "order_items"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    variant_id = Column(Integer, ForeignKey("variants.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    
    order = relationship("Order", back_populates="items")
    product = relationship("Product")

    def update_quantity(self, session, new_quantity):
        """Update the quantity of products in the order."""
        self.quantity = new_quantity
        session.commit()
    
    def remove_item(self, session):
        """Remove product from order."""
        session.delete(self)
        session.commit()

    def to_dict(self):
        """Convert objects to dictionaries."""
        return {
            "id": self.id,
            "order_id": self.order_id,
            "variant_id": self.variant_id,
            "product_id": self.product_id,
            "quantity": self.quantity
        }

class OrderCoupon(Base):
    __tablename__ = "order_coupons"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    coupon_id = Column(Integer, ForeignKey("coupons.id", ondelete="CASCADE"), nullable=False)
    
    order = relationship("Order")
    coupon = relationship("Coupon")

    def apply_coupon(self, session):
        """Apply discount code to order."""
        session.add(self)
        session.commit()
    
    def remove_coupon(self, session):
        """Remove coupon code from order."""
        session.delete(self)
        session.commit()

    def to_dict(self):
        """Convert objects to dictionaries."""
        return {
            "id": self.id,
            "order_id": self.order_id,
            "coupon_id": self.coupon_id,
        }
