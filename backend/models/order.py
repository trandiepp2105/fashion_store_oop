from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from enums.order_status import OrderStatus

class Order(Base, BaseModel):
    __tablename__ = "orders"
    
    user_id = Column(Integer, ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    shipping_info_id = Column(Integer, ForeignKey("shippinginfo.id", ondelete="SET NULL"), nullable=False)
    total_amount = Column(Integer, nullable=False)
    final_amount = Column(Integer, nullable=False)
    order_date = Column(DateTime, default=current_timestamp)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    
    def add_order(self, session):
        return self.add(session)

    def update_status(self, session, new_status):
        self.status = new_status
        return self.save(session)
    
    def cancel_order(self, session):
        """Cancel order if not delivered."""
        if self.status in [OrderStatus.PENDING, OrderStatus.PACKAGED]:
            self.status = OrderStatus.CANCELLED
            return self.save(session)
        return False
    
    def calculate_final_amount(self, session):
        self.final_amount = sum(order.total_amount for order in session.query(Order).all())
    
    def update_order_date(self, session, new_date):
        self.order_date = new_date
        return self.save(session)
    
    @classmethod
    def get_orders_by_user(cls, session, user_id):
        """Query a user's list of orders."""
        return cls.get_by_id(session)
    
    @classmethod
    def get_order_by_id(cls, session, order_id):
        """Get order information by order_id."""
        return cls.get_by_id(session)
    
    @classmethod
    def get_all_orders(cls, session):
        """Get order information by order_id."""
        return cls.get_all(session)
    
    @classmethod
    def filter_orders_by_status(cls, session, status):
        return session.query(cls).filter_by(status=status).all()
    
    @classmethod
    def filter_orders_by_date_range(cls, session, start_date, end_date):
        return session.query(cls).filter(cls.order_date.between(start_date, end_date)).all()
    
    @classmethod
    def filter_orders_by_amount_range(cls, session, min_amount, max_amount):
        return session.query(cls).filter(cls.total_amount.between(min_amount, max_amount)).all()
    
    def to_dict(self):
        """Convert objects to dictionaries."""
        return self.to_dict

class OrderItem(Base):
    __tablename__ = "orderitem"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    variant_id = Column(Integer, ForeignKey("variant.id", ondelete="SET NULL"), nullable=True)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    

    def update_quantity(self, session, new_quantity):
        """Update the quantity of products in the order."""
        self.quantity = new_quantity
        return self.save(session)
    
    def remove_item(self, session):
        """Remove product from order."""
        return self.delete(session)
    
    @classmethod
    def get_items_by_order(cls, session, order_id):
        return session.query(cls).filter_by(order_id=order_id).all()
    
    @classmethod
    def get_item_by_id(cls, session, item_id):
        return session.query(cls).filter_by(id=item_id).first()
    
    @classmethod
    def filter_items_by_product(cls, session, product_id):
        return session.query(cls).filter_by(product_id=product_id).all()
    
    @classmethod
    def filter_items_by_variant(cls, session, variant_id):
        return session.query(cls).filter_by(variant_id=variant_id).all()

    def to_dict(self):
        """Convert objects to dictionaries."""
        return self.to_dict
    
class OrderCoupon(Base):
    __tablename__ = "ordercoupon"
    __table_args__ = {"extend_existing": True}
       # id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    coupon_id = Column(Integer, ForeignKey("coupon.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    
    def apply_coupon(self, session):
        """Apply discount code to order."""
        return self.add(session)
    
    def remove_coupon(self, session):
        """Remove coupon code from order."""
        return self.delete(session)

    def to_dict(self):
        """Convert objects to dictionaries."""
        return self.to_dict