import React, { useState, useEffect } from "react";
import "./OrderPage.scss";
import ProvisionalInvoice from "../../components/ProvisionalInvoice/ProvisionalInvoice";
import PaymentMethodItem from "../../components/PaymentMethodItem/PaymentMethodItem";

import { useLocation } from "react-router-dom";

const OrderPage = ({
  orderItems = [1, 2, 3],
  paymentMethods = [
    {
      name: "Thanh toán khi nhận hàng",
      logoUrl: "/assets/logo/cod.png",
    },
    {
      name: "Thanh toán bằng ví MoMo",
      logoUrl: "/assets/logo/momo.png",
      voucherQuantity: 1,
    },
    {
      name: "Thanh toán bằng thẻ ATM nội địa",
      logoUrl: "/assets/logo/atm.png",
    },
  ],
}) => {
  const location = useLocation();
  const tempOrderInfor = location.state?.tempOrderInfor;
  useEffect(() => {
    if (tempOrderInfor) {
      console.log(tempOrderInfor);
    }
  }, [tempOrderInfor]);

  const [paymentMethodIndex, setPaymentMethodIndex] = useState(-1);
  const [isChooseShopModalOpen, setIsChooseShopModalOpen] = useState(false);
  const handleToggleChooseShopModal = () => {
    setIsChooseShopModalOpen(!isChooseShopModalOpen);
  };
  return (
    <div className="page order-page">
      <div className="left-side">
        <div className="order-general-info">
          <p className="product-quantity">Sản phẩm trong đơn (1)</p>
          <div className="list-order-item">
            {orderItems.map((item, index) => (
              <>
                <div className="order-item">
                  <div className="order-item__image">
                    <img src="/assets/images/iphone-13_2_ (1).png" alt="" />
                  </div>
                  <div className="order-item__info">
                    <div className="order-item__name">
                      <p className="product-name">
                        Máy tính xách tay Lenovo IdeaPad 3 14IAH8
                        i5-12450H/16GB/512GB/14"FHD/Win11_Xám_83EQ0005VN
                      </p>
                      <p className="product-variant">Màu: xám</p>
                    </div>
                    <div className="order-item__price">
                      <p className="product-price-sale">26.990.000đ</p>
                      <p className="product-price-through">27.990.000đ</p>
                    </div>
                    <p className="order-item__quantity">
                      Số lượng: <span>2</span>
                    </p>
                  </div>
                </div>
                {index !== orderItems.length - 1 && (
                  <div className="divider"></div>
                )}
              </>
            ))}
          </div>

          <button className="toggle-list-gift-modal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              color="var(--iconOnSemanticYellowDefault)"
            >
              <path
                d="M9.5 11V18H6.5C5.17452 18 4.08996 16.9685 4.00532 15.6644L4 15.5V11H9.5ZM16 11V15.5C16 16.8255 14.9685 17.91 13.6644 17.9947L13.5 18H10.5V11H16ZM12 2C13.3807 2 14.5 3.11929 14.5 4.5C14.5 5.06324 14.3137 5.58297 13.9995 6.00097L16 6C16.5523 6 17 6.44772 17 7V9C17 9.55228 16.5523 10 16 10H10.5V6H9.5V10H4C3.44772 10 3 9.55228 3 9V7C3 6.44772 3.44772 6 4 6L6.00055 6.00097C5.68626 5.58297 5.5 5.06324 5.5 4.5C5.5 3.11929 6.61929 2 8 2C8.81839 2 9.54493 2.39323 10.001 3.00106C10.4551 2.39323 11.1816 2 12 2ZM12 3C11.1716 3 10.5 3.67157 10.5 4.5V6H12C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5C6.5 5.2797 7.09489 5.92045 7.85554 5.99313L8 6H9.5V4.5L9.49313 4.35554C9.42045 3.59489 8.7797 3 8 3Z"
                fill="currentColor"
              ></path>
            </svg>
            <p>8 quà tặng đơn hàng</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4.14645 1.14645C3.95118 1.34171 3.95118 1.65829 4.14645 1.85355L8.29289 6L4.14645 10.1464C3.95118 10.3417 3.95118 10.6583 4.14645 10.8536C4.34171 11.0488 4.65829 11.0488 4.85355 10.8536L9.35355 6.35355C9.54882 6.15829 9.54882 5.84171 9.35355 5.64645L4.85355 1.14645C4.65829 0.951184 4.34171 0.951184 4.14645 1.14645Z"
                fill="#D97706"
              ></path>
            </svg>
          </button>
        </div>
        <div className="order-form">
          <p className="order-form__title">Người đặt hàng</p>
          <div className="block-order-form-input">
            <input
              type="text"
              className="order-form-input"
              placeholder="Họ và tên"
            />
            <input
              type="text"
              className="order-form-input"
              placeholder="Số điện thoại"
            />
            <input
              type="text"
              className="order-form-input"
              placeholder="Email (Không bắt buộc)"
            />
          </div>
        </div>
        <div className="address-form">
          <p className="address-form__title">Hình thức nhận hàng</p>
          <div className="delivery-methods">
            <div className="delivery-method">
              <input
                type="radio"
                name="delivery-method"
                id="delivery-method-1"
                value={1}
              />

              <label htmlFor="delivery-method-1">Giao hàng tận nơi</label>
            </div>
            <div className="delivery-method">
              <input
                type="radio"
                name="delivery-method"
                id="delivery-method-2"
                value={2}
              />
              <label htmlFor="delivery-method-2">Nhận tại cửa hàng</label>
            </div>
          </div>
          <button
            className="toggle-choose-shop-modal-btn"
            onClick={handleToggleChooseShopModal}
          >
            <p>Chọn shop có hàng gần nhất</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
            >
              <path
                d="M7.8499 4.20694C8.14982 3.92125 8.62456 3.93279 8.91025 4.23271L13.9116 9.48318C14.1875 9.77285 14.1875 10.2281 13.9116 10.5178L8.91025 15.7682C8.62456 16.0681 8.14982 16.0797 7.8499 15.794C7.54998 15.5083 7.53844 15.0336 7.82413 14.7336L12.3327 10.0005L7.82413 5.26729C7.53844 4.96737 7.54998 4.49264 7.8499 4.20694Z"
                fill=""
              ></path>
            </svg>
          </button>
          <div className="block-write-note">
            <p>Ghi chú yêu cầu</p>
            <textarea
              name="order-note"
              id="order-note"
              placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)"
              rows={3}
            ></textarea>
          </div>
          <div className="technical-support-request">
            {" "}
            <div className="custom-checkbox">
              <input type="checkbox" id="technical-support-request" />
              <div className="checkbox-indicator">
                <svg
                  width="15px"
                  height="15px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="check-icon"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Interface / Check">
                      {" "}
                      <path
                        id="Vector"
                        d="M6 12L10.2426 16.2426L18.727 7.75732"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
            </div>
            <label htmlFor="technical-support-request">
              Yêu cầ hỗ trợ kỹ thuật
            </label>
            <button
              className="technical-support-request-discription"
              title="Nếu bạn cần hỗ trợ kỹ thuật"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="var(--neutral-gray-5)"
                class="cursor-pointer"
              >
                <path
                  d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM10 13.5C10.4142 13.5 10.75 13.8358 10.75 14.25C10.75 14.6642 10.4142 15 10 15C9.58579 15 9.25 14.6642 9.25 14.25C9.25 13.8358 9.58579 13.5 10 13.5ZM10 5.5C11.3807 5.5 12.5 6.61929 12.5 8C12.5 8.72959 12.1848 9.40774 11.6513 9.8771L11.4967 10.0024L11.2782 10.1655L11.1906 10.2372C11.1348 10.2851 11.0835 10.3337 11.0346 10.3859C10.6963 10.7464 10.5 11.2422 10.5 12C10.5 12.2761 10.2761 12.5 10 12.5C9.72386 12.5 9.5 12.2761 9.5 12C9.5 10.988 9.79312 10.2475 10.3054 9.70162C10.4165 9.5832 10.532 9.47988 10.6609 9.37874L10.9076 9.19439L11.0256 9.09468C11.325 8.81435 11.5 8.42206 11.5 8C11.5 7.17157 10.8284 6.5 10 6.5C9.17157 6.5 8.5 7.17157 8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 6.61929 8.61929 5.5 10 5.5Z"
                  fill="inherit"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="payment-methods">
          <p className="payment-methods__title">Phương thức thanh toán</p>
          <div className="list-payment-method">
            {paymentMethods.map((method, index) => (
              <PaymentMethodItem
                key={index}
                isActive={paymentMethodIndex === index}
                onClick={() => setPaymentMethodIndex(index)}
                logoUrl={method.logoUrl}
                name={method.name}
                voucherQuantity={method.voucherQuantity}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="block-price-calculation">
        <ProvisionalInvoice />
      </div>
    </div>
  );
};

export default OrderPage;
