import React, { useState, useContext, useEffect } from "react";
import "./CartItem.scss";
import formatCurrencyVN from "../../utils/formatCurrencyVN";
import cartSurvice from "../../services/cartSurvice";
import AcceptancePopup from "../AcceptancePopup/AcceptancePopup";
import WaitingOverlay from "../WaitingOverlay/WaitingOverlay";
import { AppContext } from "../../App";
import WarningPopup from "../WarningPopup/WarningPopup";
// toastify
import { toast } from "react-toastify";
const HOST = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

const CartItem = ({
  cartItem,
  fetchCart,
  isSelected,
  onItemSelectedChange,
}) => {
  const { setOnLoading, setIsShowWarningPopup } = useContext(AppContext);

  const [onAskingRemoveItem, setOnAskingRemoveItem] = useState(false);
  const handleDleteCartItem = async () => {
    setOnLoading(true);
    try {
      const response = await cartSurvice.removeCartItem(cartItem.id);
      if (response) {
        fetchCart();
        // Show success toast
        toast.success("Delete cart item success");
      }
    } catch (error) {
      console.error("Error while deleting cart item", error);
      // Show error toast
      toast.error("Delete cart item failed");
    } finally {
      setOnLoading(false);
    }
  };
  return (
    <div className="cart-item">
      {onAskingRemoveItem && (
        <AcceptancePopup
          handleClose={() => {
            setOnAskingRemoveItem(false);
          }}
          handleAccept={() => {
            handleDleteCartItem();
            setOnAskingRemoveItem(false);
          }}
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
                  <g id="Interface / Check">
                    <path
                      id="Vector"
                      d="M6 12L10.2426 16.2426L18.727 7.75732"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="product-image">
            <img
              src={`${HOST}${cartItem.variant.image_url}`}
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
                <button className="variant-choose-btn">
                  Color: <p>{cartItem.variant.variant.color}</p>{" "}
                </button>
                <button className="variant-choose-btn">
                  Size: <p>{cartItem.variant.variant.size}</p>{" "}
                </button>
              </div>
            )}
          </div>
          <div className="product-price">
            {cartItem.product.selling_price !==
            cartItem.product.discount_price ? (
              <>
                {" "}
                <p className="price-sale">
                  {formatCurrencyVN(cartItem.product.discount_price)}
                </p>
                <p className="price-through">
                  {formatCurrencyVN(cartItem.product.selling_price)}
                </p>{" "}
              </>
            ) : (
              <p className="price-sale">
                {formatCurrencyVN(cartItem.product.discount_price)}
              </p>
            )}
          </div>
          <div className="wrapper-quantity-selector">
            <div className="quantity-selector">
              <button
                className={`quantity-btn descrease ${
                  cartItem.quantity === 1 ? "disabled" : ""
                }`}
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
                    <path
                      d="M6 12L18 12"
                      stroke="#d1d5db"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
              </button>
              <p className="quantity">{cartItem.quantity || 1}</p>
              <button
                className={`quantity-btn increase ${
                  cartItem.variant &&
                  cartItem.variant.stock_quantity <= cartItem.quantity
                    ? "disabled"
                    : ""
                }`}
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
                    <path
                      d="M4 12H20M12 4V20"
                      stroke="#d1d5db"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
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
    </div>
  );
};

export default CartItem;
