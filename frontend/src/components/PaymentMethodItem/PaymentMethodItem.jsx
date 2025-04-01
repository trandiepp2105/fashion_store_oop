import React from "react";

const PaymentMethodItem = ({
  isActive,
  onClick,
  logoUrl = "/assets/logo/momo.png",
  name = "Thanh toán bằng ví MoMo",
  voucherQuantity = 0,
}) => {
  return (
    <div
      className={`payment-method ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="first-line">
        <span className="checkbox"></span>
        <div className="payment-method-logo">
          <img src={logoUrl || "/assets/logo/momo.png"} alt="mothod" />
        </div>
        <div className="payment-method-description">
          <p>{name}</p>
          {voucherQuantity !== 0 && (
            <p className="discount-quantity">{`${voucherQuantity} ưu đãi`}</p>
          )}
        </div>
      </div>
      {isActive && (
        <div className="list-voucher">
          <div className="voucher">
            <p className="title">
              Giảm 500,000đ cho Khách hàng mua sản phẩm Samsung AI qua Momo.
            </p>
            <p className="description">
              Áp dụng cho Samsung Galaxy Z Flip6 5G 256GB Xám SM-F741B
            </p>
          </div>
          <div className="voucher">
            <p className="title">
              Giảm 500,000đ cho Khách hàng mua sản phẩm Samsung AI qua Momo.
            </p>
            <p className="description">
              Áp dụng cho Samsung Galaxy Z Flip6 5G 256GB Xám SM-F741B
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodItem;
