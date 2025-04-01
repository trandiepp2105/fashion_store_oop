import React, { useState, useContext, useEffect } from "react";
import "./CartItem.scss";
import formatCurrencyVN from "../../utils/formatCurrencyVN";
import cartSurvice from "../../services/cartSurvice";
import AcceptancePopup from "../AcceptancePopup/AcceptancePopup";
import WaitingOverlay from "../WaitingOverlay/WaitingOverlay";
import { AppContext } from "../../App";
import WarningPopup from "../WarningPopup/WarningPopup";
const CartItem = ({
  cartItem,
  isSelected,
  onItemSelectedChange,
  setShoppingCart,
  tempOrderInfor,
  setTempOrderInfor,
}) => {
  const { setOnLoading, setIsShowWarningPopup } = useContext(AppContext);
  const [showVariant, setShowVariant] = useState(false);

  const [onAskingRemoveItem, setOnAskingRemoveItem] = useState(false);

  const isWarrantySelected = (cartItemId, warrantyId) => {
    const item = tempOrderInfor.find(
      (orderInfo) => orderInfo.cartItemId === cartItemId
    );

    if (!item || !item.listWarranty) {
      return false; // Không tìm thấy item hoặc listWarranty
    }

    // Kiểm tra xem có warranty với warrantyId và chosen là true không
    return item.listWarranty.some(
      (warranty) => warranty.id === warrantyId && warranty.chosen === true
    );
  };

  const onSelectWarranty = (cartItemId, warrantyId) => {
    setTempOrderInfor((prevTempOrderInfor) => {
      const updatedOrderInfor = prevTempOrderInfor.map((orderInfo) => {
        if (orderInfo.cartItemId === cartItemId) {
          // Kiểm tra và cập nhật mỗi warranty
          const updatedListWarranty = orderInfo.listWarranty.map((warranty) => {
            if (warranty.id === warrantyId) {
              // Nếu warranty chưa có trường "chosen", thêm trường "chosen" và đặt giá trị mặc định là false
              if (warranty.chosen === undefined) {
                warranty.chosen = false;
              }
              // Đảo giá trị của chosen (nếu đang true thì set false, ngược lại)
              return { ...warranty, chosen: !warranty.chosen };
            }
            return warranty;
          });

          return { ...orderInfo, listWarranty: updatedListWarranty };
        }
        return orderInfo;
      });

      return updatedOrderInfor;
    });
  };

  const adjustCartItemQuantity = async (quantity) => {
    const cartItemId = cartItem.id;
    if (cartItem.quantity === quantity) return;
    setOnLoading(true);
    try {
      const response = await cartSurvice.adjustCartItemInformation(
        cartItemId,
        quantity
      );
      if (response) {
        setShoppingCart(response);
      }
    } catch (error) {
      console.error("Error while adjusting cart item quantity", error);
    } finally {
      setOnLoading(false);
    }
  };

  const adjustCartItemVariant = async (variantId) => {
    const cartItemId = cartItem.id;
    if (cartItem.variant && cartItem.variant.id === variantId) return;
    setOnLoading(true);
    try {
      const response = await cartSurvice.adjustCartItemInformation(
        cartItemId,
        cartItem.quantity,
        variantId
      );
      if (response) {
        setShoppingCart(response);
      }
    } catch (error) {
      console.error("Error while adjusting cart item variant", error);
    } finally {
      setOnLoading(false);
    }
  };
  const handleRemoveSingleItem = async () => {
    const cartItemId = cartItem.id;
    try {
      const response = await cartSurvice.removeCartItem([cartItemId]);
      if (response) {
        setShoppingCart(response);
      }
    } catch (error) {
      console.error("Error while removing single item", error);
    } finally {
      setOnAskingRemoveItem(false);
    }
  };

  return (
    <div className="cart-item">
      {onAskingRemoveItem && (
        <AcceptancePopup
          handleClose={() => {
            setOnAskingRemoveItem(false);
          }}
          handleAccept={handleRemoveSingleItem}
        />
      )}
      <div className="block-product-info">
        <div className="left-side">
          <div className="custom-checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onItemSelectedChange}
            />
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
          <div className="product-image">
            <img
              src={
                (cartItem.variant && cartItem.variant.image_url) ||
                (cartItem.product && cartItem.product.main_image_url) ||
                "/assets/images/variant.jpg"
              }
              // src="/assets/images/variant.jpg"
              alt="variant"
              className="product-img"
            />
          </div>
        </div>

        <div className="right-side">
          <div className="product-variant-choose">
            <div className="product-name">
              {cartItem.product.name ||
                "Máy tính xách tay Lenovo IdeaPad 3 14IAH8i5-12450H/16GB/512GB/14FHD/Win11_Xám_83EQ0005VN"}
            </div>

            {cartItem.variant && (
              <div className="variant-choose">
                <button
                  className="variant-choose-btn"
                  onClick={() => setShowVariant(!showVariant)}
                >
                  Màu: <p>{cartItem.variant.name}</p>{" "}
                  <svg
                    width="64px"
                    height="64px"
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                        fill="#000000"
                      />{" "}
                    </g>
                  </svg>
                </button>
                {showVariant && (
                  <div className="list-variant">
                    <div className="triangle-top"></div>
                    {cartItem.product.variants.map((variant) => (
                      <button
                        type="button"
                        className="variant-item"
                        onClick={() => adjustCartItemVariant(variant.id)}
                      >
                        <img
                          src={variant.image_url}
                          alt="variant"
                          className="variant-image"
                        />
                        <p className="variant-name">{variant.name}</p>
                        {variant.id === cartItem.variant.id && (
                          <>
                            <div className="triangle"></div>
                            <svg
                              width="15px"
                              height="15px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="check-icon"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="1" />

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
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />{" "}
                                </g>{" "}
                              </g>
                            </svg>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="product-price">
            <p className="price-sale">
              {formatCurrencyVN(
                (cartItem.variant && cartItem.variant.price) ||
                  cartItem.product.price_show
              )}
            </p>
            <p className="price-through">
              {formatCurrencyVN(
                (cartItem.variant && cartItem.variant.price_through) ||
                  cartItem.product.price_through
              )}
            </p>
          </div>
          <div className="wrapper-quantity-selector">
            <div className="quantity-selector">
              <button
                className={`quantity-btn descrease ${
                  cartItem.quantity === 1 ? "disabled" : ""
                }`}
                onClick={() => {
                  if (cartItem.quantity === 1) return;
                  adjustCartItemQuantity(cartItem.quantity - 1);
                }}
              >
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
                      d="M6 12L18 12"
                      stroke="#d1d5db"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />{" "}
                  </g>
                </svg>
              </button>
              <p className="quantity">{cartItem.quantity || 1}</p>
              <button
                className={`quantity-btn increase ${
                  cartItem.variant &&
                  cartItem.variant.stock <= cartItem.quantity
                    ? "disabled"
                    : ""
                }`}
                onClick={() => {
                  adjustCartItemQuantity(cartItem.quantity + 1);
                }}
              >
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
                      d="M4 12H20M12 4V20"
                      stroke="#d1d5db"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />{" "}
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <button
            className="delete-selected-product"
            onClick={() => {
              setOnAskingRemoveItem(true);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="var(--neutral-gray-5)"
            >
              <path
                d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z"
                fill="inherit"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {cartItem.warranty_plans && cartItem.warranty_plans.length > 0 && (
        <div className="wrapper-warranty">
          <div className="block-warranty">
            <div className="block-warranty__title">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Shield Keyhole">
                  <path
                    id="Shape"
                    d="M8.27735 0.0839749C8.1094 -0.0279916 7.8906 -0.0279916 7.72265 0.0839749C5.78446 1.3761 3.68833 2.1823 1.42929 2.50503C1.18296 2.54021 1 2.75117 1 3V7.5C1 11.3913 3.30699 14.2307 7.82051 15.9667C7.93605 16.0111 8.06395 16.0111 8.17949 15.9667C12.693 14.2307 15 11.3913 15 7.5V3C15 2.75117 14.817 2.54021 14.5707 2.50503C12.3117 2.1823 10.2155 1.3761 8.27735 0.0839749ZM9.5 7C9.5 7.65311 9.0826 8.20873 8.5 8.41465V10.5C8.5 10.7761 8.27614 11 8 11C7.72386 11 7.5 10.7761 7.5 10.5V8.41465C6.9174 8.20873 6.5 7.65311 6.5 7C6.5 6.17157 7.17157 5.5 8 5.5C8.82843 5.5 9.5 6.17157 9.5 7Z"
                    fill="url(#paint0_linear_95_14735)"
                  ></path>
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_95_14735"
                    x1="8"
                    y1="0"
                    x2="8"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#E10202"></stop>
                    <stop offset="1" stop-color="#FF9B9B"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span>Chọn gói bảo hành</span>
            </div>

            <div className="block-warranty__content">
              {cartItem.warranty_plans &&
                cartItem.warranty_plans.map((warranty, index) => (
                  <div className="warranty-item">
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={`select-warranty-${index}`}
                        checked={
                          warranty.price > 0
                            ? isWarrantySelected(cartItem.id, warranty.id)
                            : true
                        }
                        onChange={() => {
                          if (!isSelected) {
                            setIsShowWarningPopup(true);
                          } else {
                            if (warranty.price > 0) {
                              onSelectWarranty(cartItem.id, warranty.id);
                            }
                          }
                        }}
                      />
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
                    <div className="warranty-info">
                      <div className="warranty-name">
                        {
                          // "Đặc quyền Bảo hành 1 đổi 1 MTXT (BT)"
                          warranty.name
                        }
                      </div>
                      <div className="warranty-price">
                        {
                          // "+ 500.000 đ"
                          warranty.price > 0
                            ? `+ ${formatCurrencyVN(warranty.price)}`
                            : "Miễn phí"
                        }
                      </div>
                      {/* <div className="warranty-price-through">2.400.000 đ</div> */}
                    </div>
                  </div>
                ))}

              {/* <div className="warranty-item">
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="select-all-product"
                    checked={warrantyType === 2}
                    onChange={() => {
                      setWarrantyType(2);
                    }}
                  />
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
                <div className="warranty-info">
                  <div className="warranty-name">
                    Đặc quyền Bảo hành 1 đổi 1 MTXT (BT)
                  </div>
                  <div className="warranty-price">+ 500.000 đ</div>
                  <div className="warranty-price-through">2.400.000 đ</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
