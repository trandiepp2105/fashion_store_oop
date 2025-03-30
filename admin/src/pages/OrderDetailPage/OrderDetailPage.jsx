import React, { useState } from "react";
import "./OrderDetailPage.scss";
import CartItem from "../../components/CartItem/CartItem";
import PopupEditOrderInfo from "../../components/PopupEditOrderInfo/PopupEditOrderInfo";
import AcceptancePopup from "../../components/AcceptancePopup/AcceptancePopup";

const OrderDetailPage = () => {
  const [showListOrderItem, setShowListOrderItem] = useState(true);
  const [showInvoice, setShowInvoice] = useState(true);
  const [showHistoryOrderStatus, setShowHistoryOrderStatus] = useState(true);
  const [showOrderStatus, setShowOrderStatus] = useState(true);
  const toggleListOrderItem = () => {
    setShowListOrderItem(!showListOrderItem);
  };
  const toggleInvoice = () => {
    setShowInvoice(!showInvoice);
  };
  const toggleHistoryOrderStatus = () => {
    setShowHistoryOrderStatus(!showHistoryOrderStatus);
  };

  const toggleOrderStatus = () => {
    setShowOrderStatus(!showOrderStatus);
  };

  const [customerInfo, setCustomerInfo] = useState({
    id: 1,
    name: "Tran Van A",
    email: "email@gmail.com",
    phone: "0123456789",
  });

  const [shippingInfo, setShippingInfo] = useState({
    id: 1,
    name: "Nguyen Van B",
    phone: "0123456789",
    address: "123 Street, City, Country",
  });

  const [isOpenEditOrderInfoPopup, setIsOpenEditOrderInfoPopup] =
    useState(false);

  const handleToggleEditOrderInfoPopup = () => {
    setIsOpenEditOrderInfoPopup(!isOpenEditOrderInfoPopup);
  };

  const [isOpenDeleteOrderPopup, setIsOpenDeleteOrderPopup] = useState(false);

  const handleToggleDeleteOrderPopup = () => {
    setIsOpenDeleteOrderPopup(!isOpenDeleteOrderPopup);
  };
  return (
    <div className="page order-detail-page">
      {isOpenEditOrderInfoPopup && (
        <PopupEditOrderInfo
          orderInfor={customerInfo}
          handleToggle={handleToggleEditOrderInfoPopup}
        />
      )}
      {isOpenDeleteOrderPopup && (
        <AcceptancePopup handleClose={handleToggleDeleteOrderPopup} />
      )}
      <div className="page-content">
        <div className="header">
          <div className="left-side">
            <button className="back-btn">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#000000"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  />

                  <path
                    fill="#000000"
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  />
                </g>
              </svg>
            </button>
            <div className="title">
              <h5 className="back-description">Back to list</h5>
              <div className="order-summmary-info">
                <h2>Order ID: 879136</h2>
                <div className="list-status">
                  <span className="status-item order-status">Order Placed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <button className="confirm-btn">PACKAGED</button>
            <button
              className="delete-btn"
              onClick={handleToggleDeleteOrderPopup}
            >
              DELETE
            </button>
          </div>
        </div>
        <div className="wrapper-order-info">
          <div className="left-side">
            <div className="wrapper-info-item wrapper-order-item">
              <h4 className="container-title">
                Order Items
                <button
                  className="hidden-order-item-btn"
                  onClick={toggleListOrderItem}
                >
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`hidden-order-item-icon ${
                      showListOrderItem ? "rotate" : ""
                    }`}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                        fill="#878282"
                      />{" "}
                    </g>
                  </svg>
                </button>
              </h4>
              {showListOrderItem && (
                <div className="list-order-item">
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                </div>
              )}
            </div>
            <div className="wrapper-info-item wrapper-order-summary">
              <h4 className="container-title">
                Order Summary
                <button
                  className="hidden-order-item-btn"
                  onClick={toggleInvoice}
                >
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`hidden-order-item-icon ${
                      showInvoice ? "rotate" : ""
                    }`}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                        fill="#878282"
                      />{" "}
                    </g>
                  </svg>
                </button>
              </h4>
              <div className="list-status">
                <span className="status-item order-status">Order Placed</span>
              </div>
              {showInvoice && (
                <div className="invoice">
                  <div className="list-invoice-item">
                    <div className="invoice-item">
                      <div className="general-info">
                        <div className="invoice-item__name">
                          <p>Subtotal</p>
                        </div>
                        <div className="invoice-item__description">
                          <p>1 item</p>
                        </div>
                        <div className="invoice-item__value">2.500.000 đ</div>
                      </div>
                    </div>
                    <div className="invoice-item discount">
                      <div className="general-info">
                        <div className="invoice-item__name">
                          <p>Total Discount</p>
                        </div>
                        <div className="invoice-item__description">
                          <p>2 Vouchers</p>
                        </div>
                        <div className="invoice-item__value">1.500.000 đ</div>
                      </div>
                      <div className="detail-discount">
                        <div className="discount-item">
                          <div className="discount-item__name">Sale</div>
                          <div className="discount-item__value">
                            1.000.000 đ
                          </div>
                        </div>
                        <div className="discount-item">
                          <div className="discount-item__name">
                            New Customer
                          </div>
                          <div className="discount-item__value">500.000 đ</div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-item">
                      <div className="general-info">
                        <div className="invoice-item__name">
                          <p>Shipping</p>
                        </div>
                        <div className="invoice-item__description">
                          <p>Free Shipping</p>
                        </div>
                        <div className="invoice-item__value">0 đ</div>
                      </div>
                    </div>
                    <div className="invoice-item total">
                      <div className="general-info">
                        <div className="invoice-item__name">
                          <p>Total</p>
                        </div>

                        <div className="invoice-item__value">1.000.000 đ</div>
                      </div>
                    </div>
                    <div className="invoice-item paid-by-customer">
                      <div className="general-info">
                        <div className="invoice-item__name">
                          <p>Paid by customer</p>
                        </div>
                        <div className="invoice-item__description">
                          <p>COD</p>
                        </div>
                        <div className="invoice-item__value">0 đ</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="wrapper-info-item wrapper-history-order-status">
              <h4 className="container-title">
                History
                <button
                  className="hidden-order-item-btn"
                  onClick={toggleHistoryOrderStatus}
                >
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`hidden-order-item-icon ${
                      showHistoryOrderStatus ? "rotate" : ""
                    }`}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                        fill="#878282"
                      />{" "}
                    </g>
                  </svg>
                </button>
              </h4>
              {showHistoryOrderStatus && (
                <div className="wrapper-order-status-history">
                  <div className="order-status-history-item">
                    <p className="order-status-name">Order Pending</p>
                    <span className="timestamp">30/03/2025, 10:30 pm</span>
                    <div className="responsible-staff">
                      <div className="staff-name">
                        Responsible staff: <span>Tran Van A</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-status-history-item">
                    <p className="order-status-name">Order Pending</p>
                    <span className="timestamp">30/03/2025, 10:30 pm</span>
                    <div className="responsible-staff">
                      <div className="staff-name">
                        Responsible staff: <span>Tran Van A</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="right-side">
            <div className="container">
              <div className="order-detail-item">
                <div className="order-detail-item__title">
                  <p>Notes</p>
                  <button
                    className="edit-btn"
                    onClick={handleToggleEditOrderInfoPopup}
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M4 22H8M20 22H12"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                        <path
                          d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L14.9286 11.5204M11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="order-detail-item__content">
                  <div className="info-item">
                    <p>Here are user notes on the order</p>
                  </div>
                </div>
              </div>
              <div className="order-detail-item">
                <div className="order-detail-item__title">
                  <p>Customer info</p>
                  <button
                    className="edit-btn"
                    onClick={handleToggleEditOrderInfoPopup}
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M4 22H8M20 22H12"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                        <path
                          d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L14.9286 11.5204M11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="order-detail-item__content">
                  <div className="info-item">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke-width="3"
                      stroke="#000000"
                      fill="none"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        <circle cx="32" cy="18.14" r="11.14" />

                        <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
                      </g>
                    </svg>
                    <p>Tran Van A</p>
                  </div>
                  <div className="info-item">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M11 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V11M20.6067 8.26229L15.5499 11.6335C14.2669 12.4888 13.6254 12.9165 12.932 13.0827C12.3192 13.2295 11.6804 13.2295 11.0677 13.0827C10.3743 12.9165 9.73279 12.4888 8.44975 11.6335L3.14746 8.09863M18.4976 15.7119C17.7978 14.9328 16.6309 14.7232 15.7541 15.4367C14.8774 16.1501 14.7539 17.343 15.4425 18.1868C16.131 19.0306 18.4976 21 18.4976 21C18.4976 21 20.8642 19.0306 21.5527 18.1868C22.2413 17.343 22.1329 16.1426 21.2411 15.4367C20.3492 14.7307 19.1974 14.9328 18.4976 15.7119Z"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </g>
                    </svg>
                    <p>tranvana@gmail.com</p>
                  </div>
                  <div className="info-item">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.13641 12.764L8.15456 9.08664C8.46255 8.69065 8.61655 8.49264 8.69726 8.27058C8.76867 8.07409 8.79821 7.86484 8.784 7.65625C8.76793 7.42053 8.67477 7.18763 8.48846 6.72184L7.77776 4.9451C7.50204 4.25579 7.36417 3.91113 7.12635 3.68522C6.91678 3.48615 6.65417 3.35188 6.37009 3.29854C6.0477 3.238 5.68758 3.32804 4.96733 3.5081L3 4C3 14 9.99969 21 20 21L20.4916 19.0324C20.6717 18.3121 20.7617 17.952 20.7012 17.6296C20.6478 17.3456 20.5136 17.0829 20.3145 16.8734C20.0886 16.6355 19.7439 16.4977 19.0546 16.222L17.4691 15.5877C16.9377 15.3752 16.672 15.2689 16.4071 15.2608C16.1729 15.2536 15.9404 15.3013 15.728 15.4001C15.4877 15.512 15.2854 15.7143 14.8807 16.119L11.8274 19.1733M12.9997 7C13.9765 7.19057 14.8741 7.66826 15.5778 8.37194C16.2815 9.07561 16.7592 9.97326 16.9497 10.95M12.9997 3C15.029 3.22544 16.9213 4.13417 18.366 5.57701C19.8106 7.01984 20.7217 8.91101 20.9497 10.94"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </g>
                    </svg>
                    <p>(+84) 385 320 575</p>
                  </div>
                </div>
              </div>
              <div className="order-detail-item">
                <div className="order-detail-item__title">
                  <p>Shipping Info</p>
                  <button
                    className="edit-btn"
                    onClick={handleToggleEditOrderInfoPopup}
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M4 22H8M20 22H12"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                        <path
                          d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L14.9286 11.5204M11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="order-detail-item__content">
                  <div className="info-item">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke-width="3"
                      stroke="#000000"
                      fill="none"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        <circle cx="32" cy="18.14" r="11.14" />

                        <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
                      </g>
                    </svg>
                    <p>Tran Van A</p>
                  </div>
                  <div className="info-item">
                    <svg
                      width="10px"
                      height="10px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.13641 12.764L8.15456 9.08664C8.46255 8.69065 8.61655 8.49264 8.69726 8.27058C8.76867 8.07409 8.79821 7.86484 8.784 7.65625C8.76793 7.42053 8.67477 7.18763 8.48846 6.72184L7.77776 4.9451C7.50204 4.25579 7.36417 3.91113 7.12635 3.68522C6.91678 3.48615 6.65417 3.35188 6.37009 3.29854C6.0477 3.238 5.68758 3.32804 4.96733 3.5081L3 4C3 14 9.99969 21 20 21L20.4916 19.0324C20.6717 18.3121 20.7617 17.952 20.7012 17.6296C20.6478 17.3456 20.5136 17.0829 20.3145 16.8734C20.0886 16.6355 19.7439 16.4977 19.0546 16.222L17.4691 15.5877C16.9377 15.3752 16.672 15.2689 16.4071 15.2608C16.1729 15.2536 15.9404 15.3013 15.728 15.4001C15.4877 15.512 15.2854 15.7143 14.8807 16.119L11.8274 19.1733M12.9997 7C13.9765 7.19057 14.8741 7.66826 15.5778 8.37194C16.2815 9.07561 16.7592 9.97326 16.9497 10.95M12.9997 3C15.029 3.22544 16.9213 4.13417 18.366 5.57701C19.8106 7.01984 20.7217 8.91101 20.9497 10.94"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </g>
                    </svg>
                    <p>(+84) 385 320 575</p>
                  </div>
                  <div className="info-item">
                    <p>Phường 4</p>
                  </div>
                  <div className="info-item">
                    <p>Quận 5</p>
                  </div>
                  <div className="info-item">
                    <p>Thành phố Hồ Chí Minh</p>
                  </div>
                  <div className="info-item">
                    <p>
                      227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh
                    </p>
                  </div>
                  <div className="info-item info-item--map">
                    <svg
                      width="15px"
                      height="15px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
                          stroke="#728ce1"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </g>
                    </svg>
                    <p>View map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
