import React, { useState, useContext, useEffect } from "react";
import "./CartPage.scss";
import CartItem from "../../components/CartItem/CartItem";
import ProvisionalInvoice from "../../components/ProvisionalInvoice/ProvisionalInvoice";
import { AppContext } from "../../App";
import cartSurvice from "../../services/cartSurvice";
import AcceptancePopup from "../../components/AcceptancePopup/AcceptancePopup";
import HotSaleDisplay from "../../components/HotSaleDisplay/HotSaleDisplay";
import productService from "../../services/productService";
import { useNavigate } from "react-router-dom";
import formatCurrencyVN from "../../utils/formatCurrencyVN";
import { Link } from "react-router-dom";
import storeService from "../../services/storeService";
import ChooseShop from "../../components/ChooseShop/ChooseShop";
import UserSelectAddress from "../../components/UserSelectAddress/UserSelectAddress";
const CartPage = () => {
  const navigate = useNavigate();

  const { shoppingCart, setShoppingCart, setOnLoading } =
    useContext(AppContext);
  const [orderStep, setOrderStep] = useState(1);
  const [temporaryInvoice, setTemporalInvoice] = useState(null);
  const [onAskingRemoveItem, setOnAskingRemoveItem] = useState(false);

  const [hotSaleProducts, setHotSaleProducts] = useState([]);

  const [tempOrderInfor, setTempOrderInfor] = useState([]); // item: {cartItemId, listWarrantyId,listPromotion}

  const [isSelectAll, setIsSelectAll] = useState(false); // Biến isSelectAll để kiểm tra xem tất cả items đã được chọn chưa
  const [allStores, setAllStores] = useState([]);
  const [isChooseShopModalOpen, setIsChooseShopModalOpen] = useState(false);
  const [isUserSelectAddressModalOpen, setIsUserSelectAddressModalOpen] =
    useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    storeId: null,
    deliveryAddress: null,
    estimatedDeliveryTime: null,
    consigneeName: "",
    consigneePhone: "",
    consigneeEmail: "",
    // deliveryPhone: "",
    deliveryNote: "",
    deliveryMethod: 1,
  });

  const [listErrorActive, setListErrorActive] = useState({
    consigneeName: false,
    consigneePhone: false,
  });
  const initTempAddress = {
    province: {
      name: "",
      code: "",
    },
    district: {
      name: "",
      code: "",
    },
    ward: {
      name: "",
      code: "",
    },
    specificAddress: "",
  };
  const [tempDeliveryAddress, setTempDeliveryAddress] =
    useState(initTempAddress);
  const handleConfirmDeliveryAddress = (address) => {
    setDeliveryInfo((prevDeliveryInfo) => ({
      ...prevDeliveryInfo,
      deliveryAddress: address,
    }));
    setIsUserSelectAddressModalOpen(false);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    setDeliveryInfo((prevDeliveryInfo) => ({
      ...prevDeliveryInfo,
      estimatedDeliveryTime: deliveryDate,
    }));
  };

  const handleConfirmStore = (storeId) => {
    setDeliveryInfo((prevDeliveryInfo) => ({
      ...prevDeliveryInfo,
      storeId: storeId,
    }));
    setIsChooseShopModalOpen(false);
  };

  const handleToggleChooseShopModal = () => {
    setIsChooseShopModalOpen(!isChooseShopModalOpen);
  };

  const handleToggleUserSelectAddressModal = () => {
    setIsUserSelectAddressModalOpen(!isUserSelectAddressModalOpen);
  };
  const handleGetStores = async () => {
    try {
      const response = await storeService.getStores();
      setAllStores(response);
    } catch (error) {
      console.error("Error while fetching stores", error);
      setAllStores([]);
    }
  };

  useEffect(() => {
    console.log("allStores", allStores);
  }, [allStores]);
  const getShoppingCart = async () => {
    try {
      const response = await cartSurvice.getShoppingCart();
      setShoppingCart(response || []);
    } catch (error) {
      console.error("Error while fetching shopping cart", error);
    }
  };

  const fetchHotSaleProducts = async (tagName = "SALE") => {
    const response = await productService.getProductsByTagName(tagName);
    if (response) {
      setHotSaleProducts(response);
    }
  };

  useEffect(() => {
    getShoppingCart();
    fetchHotSaleProducts();
    handleGetStores();
  }, []); // Gọi API để lấy shoppingCart khi component được mount

  const handleSelectCartItem = (cartItem) => {
    setTempOrderInfor((prevTempOrderInfor) => {
      const updatedOrderInfor = [...prevTempOrderInfor];
      const index = updatedOrderInfor.findIndex(
        (orderInfo) => orderInfo.cartItemId === cartItem.id
      );
      if (index !== -1) {
        updatedOrderInfor.splice(index, 1);
      } else {
        updatedOrderInfor.push({
          cartItemId: cartItem.id,
          listWarranty: cartItem.warranty_plans || [],
        });
      }
      return updatedOrderInfor;
    });
  };

  const handleSelectAllCartItems = () => {
    if (isSelectAll) {
      setTempOrderInfor([]);
      setIsSelectAll(false);
      return;
    }
    setIsSelectAll(true);
    setTempOrderInfor((prevTempOrderInfor) => {
      const updatedOrderInfor = [...prevTempOrderInfor];
      const shoppingCartIds = shoppingCart?.items?.map((item) => item.id) || [];

      // Thêm các phần tử từ shoppingCart vào TempOrderInfor nếu chưa có
      shoppingCart?.items?.forEach((cartItem) => {
        const index = updatedOrderInfor.findIndex(
          (orderInfo) => orderInfo.cartItemId === cartItem.id
        );
        if (index === -1) {
          updatedOrderInfor.push({
            cartItemId: cartItem.id,
            listWarranty: cartItem.warranty_plans || [],
          });
        }
      });

      // Xóa các phần tử trong TempOrderInfor nếu không có trong shoppingCart
      const filteredOrderInfor = updatedOrderInfor.filter((orderInfo) =>
        shoppingCartIds.includes(orderInfo.cartItemId)
      );

      return filteredOrderInfor;
    });
  };

  useEffect(() => {
    if (shoppingCart && shoppingCart.items) {
      setTempOrderInfor((prevTempOrderInfor) => {
        const shoppingCartIds = shoppingCart.items.map((item) => item.id) || [];

        // Lọc các phần tử trong TempOrderInfor nếu không có trong shoppingCart
        const filteredOrderInfor = prevTempOrderInfor.filter((orderInfo) =>
          shoppingCartIds.includes(orderInfo.cartItemId)
        );

        return filteredOrderInfor;
      });
    }
  }, [shoppingCart]);

  const getTemporaryInvoice = async () => {
    setOnLoading(true);
    try {
      const response = await cartSurvice.getTemporaryInvoice(tempOrderInfor);
      console.log("setTemporalInvoice", response);
      setTemporalInvoice(response);
    } catch (error) {
      console.error("Error while fetching temporary invoice", error);
      setTemporalInvoice({});
    } finally {
      setOnLoading(false);
    }
  };
  useEffect(() => {
    if (tempOrderInfor.length > 0) {
      getTemporaryInvoice();
    }
    console.log("tempOrderInfor", tempOrderInfor);
  }, [tempOrderInfor]);

  const handleRemoveAllItems = async () => {
    if (tempOrderInfor.length === 0) {
      return;
    }
    const cartItemIds = tempOrderInfor.map((orderInfo) => orderInfo.cartItemId);
    setOnAskingRemoveItem(false);

    try {
      const response = await cartSurvice.removeCartItem(cartItemIds);
      if (response) {
        setShoppingCart(response);
      }
    } catch (error) {
      console.error("Error while removing selected items", error);
    } finally {
      setOnLoading(false);
    }
  };
  const handleVerifyInvoice = () => {
    if (tempOrderInfor && tempOrderInfor.length > 0) {
      setOrderStep(2);
    }
  };

  const backToCart = () => {
    setOrderStep(1);
  };
  const getProductImageSrc = (cartItemId) => {
    const cartItem = shoppingCart.items.find((item) => item.id === cartItemId);

    return (
      cartItem?.variant?.image_url ||
      cartItem?.product?.main_image_url ||
      "/assets/images/iphone-13_2_ (1).png"
    );
  };

  const getProductPrice = (cartItemId) => {
    const cartItem = shoppingCart.items.find((item) => item.id === cartItemId);

    return cartItem?.variant?.price || cartItem?.product?.price_show;
  };

  const getProductPriceThrough = (cartItemId) => {
    const cartItem = shoppingCart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      return "";
    }
    if (cartItem?.variant?.price_through) {
      return cartItem?.variant?.price_through;
    }

    if (cartItem?.product?.price_through) {
      return cartItem?.product?.price_through;
    }
    return "";
  };

  return (
    <div className="page cart-page">
      <div className="navigator">
        <Link className="navigator-item" to="/">
          Trang chủ
        </Link>
        <Link className="navigator-item" to="/catalog">
          Giỏ hàng
        </Link>
      </div>
      <div className="search-description">
        <h1>Giỏ hàng của bạn</h1>
        <p className="subtxt">
          Có <strong>0 sản phẩm</strong> trong giỏ hàng của bạn
        </p>
      </div>
      {onAskingRemoveItem && (
        <AcceptancePopup
          handleClose={() => {
            setOnAskingRemoveItem(false);
          }}
          handleAccept={handleRemoveAllItems}
        />
      )}
      {orderStep === 1 && shoppingCart?.items?.length && (
        <div className="cart-container">
          <div className="block-product">
            <div className="select-all">
              <div className="select-all-product">
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="select-all-product"
                    checked={isSelectAll} // Kiểm tra xem tất cả items đã được chọn chưa
                    onChange={handleSelectAllCartItems}
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
                <label htmlFor="select-all-product">
                  Chọn tất cả{" "}
                  <p>
                    {`( ${tempOrderInfor && tempOrderInfor.length} )
                  `}
                  </p>
                </label>
              </div>
              <button
                className="delete-selected-product"
                onClick={() => {
                  if (tempOrderInfor && tempOrderInfor.length > 0) {
                    setOnAskingRemoveItem(true);
                  }
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

            <div className="list-cart-item">
              {shoppingCart?.items?.map(
                (cartItem, index) =>
                  cartItem !== undefined && (
                    <CartItem
                      key={index}
                      index={index}
                      // isSelected={listItemSelected[index]}
                      isSelected={
                        tempOrderInfor.findIndex(
                          (orderInfo) => orderInfo.cartItemId === cartItem.id
                        ) !== -1
                      }
                      onItemSelectedChange={() => {
                        handleSelectCartItem(cartItem);
                      }}
                      cartItem={cartItem}
                      shoppingCart={shoppingCart}
                      setShoppingCart={setShoppingCart}
                      setTemporalInvoice={setTemporalInvoice}
                      tempOrderInfor={tempOrderInfor}
                      setTempOrderInfor={setTempOrderInfor}
                    />
                  )
              )}
            </div>
          </div>
          <div className="block-price-calculation">
            <div className="block-gift">
              <div className="block-gift__title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="var(--neutral-gray-900)"
                >
                  <path
                    d="M12 2C13.3807 2 14.5 3.11929 14.5 4.5C14.5 5.06324 14.3137 5.58297 13.9995 6.00097L16 6C16.5523 6 17 6.44772 17 7V10C17 10.5523 16.5523 11 16 11V15.5C16 16.8807 14.8807 18 13.5 18H6.5C5.11929 18 4 16.8807 4 15.5V11C3.44772 11 3 10.5523 3 10V7C3 6.44772 3.44772 6 4 6L6.00055 6.00097C5.68626 5.58297 5.5 5.06324 5.5 4.5C5.5 3.11929 6.61929 2 8 2C8.81839 2 9.54493 2.39323 10.001 3.00106C10.4551 2.39323 11.1816 2 12 2ZM9.5 11H5V15.5C5 16.3284 5.67157 17 6.5 17H9.5V11ZM15 11H10.5V17H13.5C14.3284 17 15 16.3284 15 15.5V11ZM9.5 7H4V10H9.5V7ZM16 7H10.5V10H16V7ZM12 3C11.1716 3 10.5 3.67157 10.5 4.5V6H12C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5C6.5 5.2797 7.09489 5.92045 7.85554 5.99313L8 6H9.5V4.5L9.49313 4.35554C9.42045 3.59489 8.7797 3 8 3Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p>Quà tặng</p>
              </div>
              <p className="empty-gift">Xem quà (0)</p>
            </div>
            <ProvisionalInvoice
              handleVerifyInvoice={handleVerifyInvoice}
              receipt={temporaryInvoice}
            />
          </div>
        </div>
      )}

      {orderStep === 1 && (!shoppingCart || shoppingCart.length === 0) && (
        <div className="empty-cart-page">
          <div className="empty-cart-container">
            <div className="left-side">
              <p className="title">Chưa có sản phẩm nào trong giỏ hàng</p>
              <p className="title-small">
                Cùng mua sắm hàng ngàn sản phẩm tại viperphone nhé!
              </p>
              <Link to="/" className="back-to-home">
                Mua hàng
              </Link>
            </div>
            <div className="right-side">
              <img src="/assets/images/empty_cart.png" alt="" />
            </div>
          </div>
        </div>
      )}
      {orderStep === 2 && (
        <div className="verify-order">
          <div className="navigate-step">
            <button className="navigate-step-btn" onClick={backToCart}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Chevron">
                  <path
                    id="Shape"
                    d="M12.2676 15.793C11.9677 16.0787 11.493 16.0672 11.2073 15.7672L6.20597 10.5168C5.93004 10.2271 5.93004 9.77187 6.20597 9.4822L11.2073 4.23173C11.493 3.93181 11.9677 3.92028 12.2676 4.20597C12.5676 4.49166 12.5791 4.96639 12.2934 5.26631L7.78483 9.99949L12.2934 14.7327C12.5791 15.0326 12.5676 15.5073 12.2676 15.793Z"
                    fill="#1250DC"
                  ></path>
                </g>
              </svg>
              <p>Quay lại giỏ hàng</p>
            </button>
          </div>
          <div className="verify-order-inner">
            <div className="order-item-side">
              <div className="order-general-info">
                <p className="product-quantity">Sản phẩm trong đơn (1)</p>
                <div className="list-order-item">
                  {tempOrderInfor.map((item, index) => (
                    <>
                      <div className="order-item">
                        <div className="order-item-inner">
                          <div className="order-item__image">
                            <img
                              src={getProductImageSrc(item.cartItemId)}
                              alt=""
                            />
                          </div>
                          <div className="order-item__info">
                            <div className="order-item__name">
                              <p className="product-name">
                                {
                                  shoppingCart.items.find(
                                    (cartItem) =>
                                      cartItem.id === item.cartItemId
                                  )?.product.name
                                }
                              </p>
                              <p className="product-variant">
                                Màu:{" "}
                                {
                                  shoppingCart.items.find(
                                    (cartItem) =>
                                      cartItem.id === item.cartItemId
                                  )?.variant?.name
                                }
                              </p>
                            </div>
                            <div className="order-item__price">
                              <p className="product-price-sale">
                                {formatCurrencyVN(
                                  getProductPrice(item.cartItemId)
                                )}
                              </p>

                              <p className="product-price-through">
                                {getProductPriceThrough(item.cartItemId) &&
                                  formatCurrencyVN(
                                    getProductPriceThrough(item.cartItemId)
                                  )}
                              </p>
                            </div>
                            <p className="order-item__quantity">
                              Số lượng:{" "}
                              <span>
                                {
                                  shoppingCart.items.find(
                                    (cartItem) =>
                                      cartItem.id === item.cartItemId
                                  )?.quantity
                                }{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="list-warranty">
                          {item.listWarranty.map(
                            (warranty, index) =>
                              (warranty.chosen ||
                                warranty.price === "0.00") && (
                                <div key={index} className="warranty-item">
                                  <div className="warranty-item__icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_174_10762)">
                                        <path
                                          d="M10.7338 0.901551C10.5323 0.767191 10.2697 0.767191 10.0682 0.901551C7.74233 2.4521 5.22698 3.41955 2.51612 3.80681C2.22053 3.84904 2.00098 4.10219 2.00098 4.40078V9.80078C2.00098 14.4704 4.76937 17.8776 10.1856 19.9608C10.3242 20.0141 10.4777 20.0141 10.6164 19.9608C16.0326 17.8776 18.801 14.4704 18.801 9.80078V4.40078C18.801 4.10219 18.5814 3.84904 18.2858 3.80681C15.575 3.41955 13.0596 2.4521 10.7338 0.901551ZM12.201 9.20078C12.201 9.98451 11.7001 10.6513 11.001 10.8984V13.4008C11.001 13.7322 10.7323 14.0008 10.401 14.0008C10.0696 14.0008 9.80098 13.7322 9.80098 13.4008V10.8984C9.10186 10.6513 8.60098 9.98451 8.60098 9.20078C8.60098 8.20667 9.40686 7.40078 10.401 7.40078C11.3951 7.40078 12.201 8.20667 12.201 9.20078Z"
                                          fill="url(#paint0_linear_174_10762)"
                                        ></path>
                                      </g>
                                      <defs>
                                        <linearGradient
                                          id="paint0_linear_174_10762"
                                          x1="10.401"
                                          y1="0.800781"
                                          x2="10.401"
                                          y2="20.0008"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#E10202"></stop>
                                          <stop
                                            offset="1"
                                            stop-color="#FF9B9B"
                                          ></stop>
                                        </linearGradient>
                                        <clipPath id="clip0_174_10762">
                                          <rect
                                            width="19.2"
                                            height="19.2"
                                            fill="white"
                                            transform="translate(0.400391 0.399902)"
                                          ></rect>
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                  <div className="warranty-item__description">
                                    <p className="warranty-item__name">
                                      {warranty.name}
                                    </p>
                                    <p className="warranty-item__price">
                                      {warranty.price === "0.00"
                                        ? "Miễn phí"
                                        : formatCurrencyVN(warranty.price)}
                                    </p>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                      {index !== tempOrderInfor.length - 1 && (
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
                    className={`order-form-input ${
                      listErrorActive.consigneeName && "error"
                    }`}
                    placeholder="Họ và tên"
                    onChange={(e) => {
                      setDeliveryInfo({
                        ...deliveryInfo,
                        consigneeName: e.target.value,
                      });
                    }}
                  />
                  {listErrorActive.consigneeName && (
                    <span className="error">Vui lòng nhập tên người nhận</span>
                  )}
                  <input
                    type="text"
                    className={`order-form-input ${
                      listErrorActive.consigneePhone && "error"
                    }`}
                    placeholder="Số điện thoại"
                    onChange={(e) => {
                      setDeliveryInfo({
                        ...deliveryInfo,
                        consigneePhone: e.target.value,
                      });
                    }}
                  />
                  {listErrorActive.consigneePhone && (
                    <span className="error">Vui lòng nhập số điện thoại</span>
                  )}

                  <input
                    type="text"
                    className="order-form-input"
                    placeholder="Email (Không bắt buộc)"
                    onChange={(e) => {
                      setDeliveryInfo({
                        ...deliveryInfo,
                        consigneeEmail: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="address-form">
                {isChooseShopModalOpen && (
                  <ChooseShop
                    stores={allStores}
                    setStores={setAllStores}
                    handleToggle={handleToggleChooseShopModal}
                    // setDeliveryInfo={setDeliveryInfo}
                    handleConfirm={handleConfirmStore}
                  />
                )}

                {isUserSelectAddressModalOpen && (
                  <UserSelectAddress
                    handleToggle={handleToggleUserSelectAddressModal}
                    setTempAddress={setTempDeliveryAddress}
                    tempAddress={tempDeliveryAddress}
                    handleConfirmAddress={handleConfirmDeliveryAddress}
                  />
                )}
                <p className="address-form__title">Hình thức nhận hàng</p>
                <div className="delivery-methods">
                  <div className="select-delivery-method">
                    <div className="delivery-method">
                      <input
                        type="radio"
                        name="delivery-method"
                        id="delivery-method-1"
                        value={1}
                        checked={deliveryInfo.deliveryMethod === 1}
                        onChange={(e) => {
                          setDeliveryInfo({
                            ...deliveryInfo,
                            deliveryMethod: parseInt(e.target.value),
                          });
                        }}
                      />

                      <label htmlFor="delivery-method-1">
                        Giao hàng tận nơi
                      </label>
                    </div>
                    <div className="delivery-method select-delivery-method-2">
                      <input
                        type="radio"
                        name="delivery-method"
                        id="delivery-method-2"
                        checked={deliveryInfo.deliveryMethod === 2}
                        value={2}
                        onChange={(e) => {
                          setDeliveryInfo({
                            ...deliveryInfo,
                            deliveryMethod: parseInt(e.target.value),
                          });
                        }}
                      />
                      <label htmlFor="delivery-method-2">
                        Nhận tại cửa hàng
                      </label>
                    </div>
                  </div>

                  <div className="delivery-method-content">
                    {deliveryInfo.deliveryMethod === 1 &&
                      !deliveryInfo.deliveryAddress?.ward?.code && (
                        <div className="delivery-method-1">
                          <button
                            className="toggle-select-address-btn"
                            onClick={handleToggleUserSelectAddressModal}
                          >
                            <p>Chọn địa chỉ nhận hàng</p>
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
                        </div>
                      )}
                    {deliveryInfo.deliveryMethod === 2 && (
                      <div className="delivery-method-2">
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
                      </div>
                    )}
                    <div className="delivery-info">
                      {deliveryInfo.deliveryAddress?.ward?.code && (
                        <div className="delivery-info-item address-info">
                          <div className="delivery-info-item__header">
                            <p className="delivery-info-item__title">
                              Địa chỉ nhận hàng
                            </p>
                            <button
                              type="button"
                              className="delivery-info-item__change-btn"
                              onClick={handleToggleUserSelectAddressModal}
                            >
                              Thay đổi
                            </button>
                          </div>
                          <div className="address-info__content">
                            <p className="address-info__address">
                              {tempDeliveryAddress.ward.name},
                              {tempDeliveryAddress.district.name},
                              {tempDeliveryAddress.province.name}
                            </p>
                            <p className="address-info__specific-address">
                              {tempDeliveryAddress.specificAddress}
                            </p>
                          </div>
                        </div>
                      )}
                      {deliveryInfo.estimatedDeliveryTime && (
                        <div className="delivery-info-item time-delivery-info">
                          <div className="delivery-info-item__header">
                            <p className="delivery-info-item__title">
                              Thời gian giao hàng
                            </p>
                            {/* <button
                              type="button"
                              className="delivery-info-item__change-btn"
                            >
                              Thay đổi
                            </button> */}
                          </div>
                          <div className="time-delivery-info__content">
                            <p>
                              {/* Vào lúc{" "}
                              {String(
                                deliveryInfo.estimatedDeliveryTime?.getHours()
                              ).padStart(2, "0")}
                              :
                              {String(
                                deliveryInfo.estimatedDeliveryTime?.getMinutes()
                              ).padStart(2, "0")}
                              , ngày{" "} */}
                              {"Vào ngày: "}
                              {String(
                                deliveryInfo.estimatedDeliveryTime?.getDate()
                              ).padStart(2, "0")}
                              /
                              {String(
                                deliveryInfo.estimatedDeliveryTime?.getMonth() +
                                  1
                              ).padStart(2, "0")}
                              /
                              {deliveryInfo.estimatedDeliveryTime?.getFullYear()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="block-write-note">
                      <p>Ghi chú yêu cầu</p>
                      <textarea
                        name="order-note"
                        id="order-note"
                        placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)"
                        rows={3}
                        onChange={(e) =>
                          setDeliveryInfo({
                            ...deliveryInfo,
                            deliveryNote: e.target.value,
                          })
                        }
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
                </div>
              </div>
              <div className="payment-methods">
                <p className="payment-methods__title">Phương thức thanh toán</p>
                {/* <div className="list-payment-method">
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
            </div> */}
              </div>
            </div>
            <div className="block-price-calculation">
              <ProvisionalInvoice
                receipt={temporaryInvoice}
                deliveryFeeVisible={true}
                mainButtonName="Đặt hàng"
                activeButton={
                  deliveryInfo.consigneeName &&
                  deliveryInfo.consigneePhone &&
                  ((deliveryInfo.deliveryMethod === 2 &&
                    deliveryInfo.storeId) ||
                    (deliveryInfo.deliveryMethod === 1 &&
                      deliveryInfo.deliveryAddress))
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
