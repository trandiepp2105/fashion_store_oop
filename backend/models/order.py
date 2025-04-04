from models.base import Base, BaseModel
from sqlalchemy import Column, Integer, DECIMAL, DateTime, String, ForeignKey, Enum
from sqlalchemy.orm import relationship, Session
from sqlalchemy.sql.functions import current_timestamp
from enums.order_status import OrderStatus
from models.cart import CartItem
from models.product import Product
from models.sale import Sale, SaleProduct, Coupon
from enums.sale_type import SaleType

class Order(Base, BaseModel):
    """
    Represents an order placed by a user.

    Attributes:
        user_id (int): The ID of the user who placed the order.
        shipping_info_id (int): The ID of the shipping information.
        total_amount (int): The total amount of the order before discounts.
        final_amount (int): The final amount of the order after discounts and coupons.
        order_date (datetime): The timestamp when the order was created.
        status (OrderStatus): The current status of the order.
    """

    __tablename__ = "orders"
    
    user_id = Column(Integer, ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    shipping_info_id = Column(Integer, ForeignKey("shippinginfo.id", ondelete="SET NULL"), nullable=False)
    total_amount = Column(Integer, nullable=False)
    final_amount = Column(Integer, nullable=False)
    order_date = Column(DateTime, default=current_timestamp)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)

    def __init__(self, session: Session, user_id: int, shipping_info_id: int, cart_item_ids: list, coupon_id: int = None):
        """
        Initializes a new Order instance.

        Args:
            session (Session): The database session.
            user_id (int): The ID of the user placing the order.
            shipping_info_id (int): The ID of the shipping information.
            cart_item_ids (list[int]): A list of cart item IDs associated with the order.
            coupon_id (int, optional): The ID of the coupon applied to the order. Defaults to None.
        """
        self.user_id = user_id
        self.shipping_info_id = shipping_info_id
        self.total_amount = 0
        self.final_amount = 0
        self.status = OrderStatus.PENDING

        # Query cart items and calculate total and final amounts
        cart_items = session.query(CartItem).filter(CartItem.id.in_(cart_item_ids)).all()
        for item in cart_items:
            product = session.query(Product).filter_by(id=item.product_id).first()
            if product:
                # Calculate total amount based on selling price
                self.total_amount += product.selling_price * item.quantity

                # Calculate discount from sales
                sale_product = session.query(SaleProduct).filter_by(product_id=product.id).first()
                if sale_product:
                    sale = session.query(Sale).filter_by(id=sale_product.sale_id).first()
                    if sale and sale.is_active():
                        if sale.type == SaleType.PERCENTAGE:
                            discount = (product.selling_price * sale.value / 100) * item.quantity
                        elif sale.type == SaleType.FIXED:
                            discount = min(sale.value * item.quantity, product.selling_price * item.quantity)
                        else:
                            discount = 0
                    else:
                        discount = 0
                else:
                    discount = 0

                # Subtract discount from final amount
                self.final_amount += (product.selling_price * item.quantity) - discount
            else:
                raise ValueError(f"Product with ID {item.product_id} not found.")

        # Apply coupon if provided
        if coupon_id:
            coupon = session.query(Coupon).filter_by(id=coupon_id).first()
            if coupon and coupon.is_active() and coupon.is_valid(self.total_amount, 0):  # Assuming usage_count = 0
                if coupon.type == SaleType.PERCENTAGE:
                    coupon_discount = self.total_amount * coupon.value / 100
                elif coupon.type == SaleType.FIXED:
                    coupon_discount = min(coupon.value, self.total_amount)
                else:
                    coupon_discount = 0
                self.final_amount -= coupon_discount

        # Ensure final_amount is not negative
        self.final_amount = max(self.final_amount, 0)

    def update_status(self, session):
        """
        Progresses the order to the next status in the workflow.

        Args:
            session (Session): The database session.

        Returns:
            Order: The updated order instance.

        Raises:
            ValueError: If the order is already in the final status or has an invalid status.
        """
        status_flow = [
            OrderStatus.PENDING,
            OrderStatus.PACKAGED,
            OrderStatus.SHIPPING,
            OrderStatus.DELIVERED
        ]
        if self.status not in status_flow:
            raise ValueError(f"Invalid current status: {self.status}. Cannot progress further.")
        
        current_index = status_flow.index(self.status)
        if current_index + 1 < len(status_flow):
            self.status = status_flow[current_index + 1]
            return self.save(session)
        else:
            raise ValueError("Order is already in the final status and cannot progress further.")
    
    def cancel_order(self, session):
        """
        Cancels the order if it has not been delivered.

        Args:
            session (Session): The database session.

        Returns:
            bool: True if the order was successfully cancelled, False otherwise.
        """
        if self.status in [OrderStatus.PENDING, OrderStatus.PACKAGED]:
            self.status = OrderStatus.CANCELLED
            return self.save(session)
        return False
    
    @classmethod
    def get_orders_by_user(cls, session, user_id):
        """
        Retrieves all orders placed by a specific user.

        Args:
            session (Session): The database session.
            user_id (int): The ID of the user.

        Returns:
            list[Order]: A list of orders placed by the user.
        """
        return session.query(cls).filter_by(user_id=user_id).all()
    
    @classmethod
    def filter_orders_by_status(cls, session, status):
        """
        Filters orders by their status.

        Args:
            session (Session): The database session.
            status (OrderStatus): The status to filter orders by.

        Returns:
            list[Order]: A list of orders with the specified status.
        """
        return session.query(cls).filter_by(status=status).all()
    
    @classmethod
    def filter_orders_by_date_range(cls, session, start_date, end_date):
        """
        Filters orders within a specific date range.

        Args:
            session (Session): The database session.
            start_date (datetime): The start date of the range.
            end_date (datetime): The end date of the range.

        Returns:
            list[Order]: A list of orders within the specified date range.
        """
        return session.query(cls).filter(cls.order_date.between(start_date, end_date)).all()
    
    @classmethod
    def filter_orders_by_amount_range(cls, session, min_amount, max_amount):
        """
        Filters orders within a specific amount range.

        Args:
            session (Session): The database session.
            min_amount (int): The minimum order amount.
            max_amount (int): The maximum order amount.

        Returns:
            list[Order]: A list of orders within the specified amount range.
        """
        return session.query(cls).filter(cls.total_amount.between(min_amount, max_amount)).all()

class OrderItem(Base):
    """
    Represents an item in an order.

    Attributes:
        id (int): The unique identifier for the order item.
        order_id (int): The ID of the associated order.
        variant_id (int): The ID of the variant.
        product_id (int): The ID of the product.
        quantity (int): The quantity of the product in the order.
    """

    __tablename__ = "orderitem"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    variant_id = Column(Integer, ForeignKey("variant.id", ondelete="SET NULL"), nullable=True)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)

    def update_quantity(self, session, new_quantity):
        """
        Updates the quantity of the order item if the associated order is in PENDING status.

        Args:
            session (Session): The database session.
            new_quantity (int): The new quantity to set.

        Raises:
            ValueError: If the associated order is not in PENDING status or does not exist.
        """
        # Fetch the associated order
        order = session.query(Order).filter_by(id=self.order_id).first()
        if not order:
            raise ValueError("Order not found.")
        
        # Check if the order status is PENDING
        if order.status != OrderStatus.PENDING:
            raise ValueError("Cannot update quantity. Order is not in PENDING status.")
        
        # Update the quantity
        self.quantity = new_quantity
        session.commit()

        # Recalculate the total and final amounts of the order
        self._recalculate_order_amounts(session, order)

    def remove_item(self, session):
        """
        Removes the order item and recalculates the total and final amounts of the associated order.

        Args:
            session (Session): The database session.

        Raises:
            ValueError: If the associated order is not in PENDING status or does not exist.
        """
        # Fetch the associated order
        order = session.query(Order).filter_by(id=self.order_id).first()
        if not order:
            raise ValueError("Order not found.")
        
        # Check if the order status is PENDING
        if order.status != OrderStatus.PENDING:
            raise ValueError("Cannot remove item. Order is not in PENDING status.")
        
        # Remove the item
        session.delete(self)
        session.commit()

        # Recalculate the total and final amounts of the order
        self._recalculate_order_amounts(session, order)

    def _recalculate_order_amounts(self, session, order):
        """
        Recalculates the total and final amounts of the associated order.

        Args:
            session (Session): The database session.
            order (Order): The associated order instance.
        """
        order_items = session.query(OrderItem).filter_by(order_id=self.order_id).all()
        total_amount = 0
        final_amount = 0

        for item in order_items:
            product = session.query(Product).filter_by(id=item.product_id).first()
            if product:
                # Calculate total amount
                total_amount += product.selling_price * item.quantity

                # Calculate discount from sales
                sale_product = session.query(SaleProduct).filter_by(product_id=product.id).first()
                if sale_product:
                    sale = session.query(Sale).filter_by(id=sale_product.sale_id).first()
                    if sale and sale.is_active():
                        if sale.type == SaleType.PERCENTAGE:
                            discount = (product.selling_price * sale.value / 100) * item.quantity
                        elif sale.type == SaleType.FIXED:
                            discount = min(sale.value * item.quantity, product.selling_price * item.quantity)
                        else:
                            discount = 0
                    else:
                        discount = 0
                else:
                    discount = 0

                # Subtract discount from final amount
                final_amount += (product.selling_price * item.quantity) - discount

        # Update order amounts
        order.total_amount = total_amount
        order.final_amount = max(final_amount, 0)  # Ensure final_amount is not negative
        order.save(session)
    
    @classmethod
    def get_items_by_order(cls, session, order_id):
        """
        Retrieves all items for a specific order.

        Args:
            session (Session): The database session.
            order_id (int): The ID of the order.

        Returns:
            list[OrderItem]: A list of items in the specified order.
        """
        return session.query(cls).filter_by(order_id=order_id).all()

class OrderCoupon(Base):
    __tablename__ = "ordercoupon"
    __table_args__ = {"extend_existing": True}
    # id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    coupon_id = Column(Integer, ForeignKey("coupon.id", ondelete="CASCADE"), primary_key=True, nullable=False)
