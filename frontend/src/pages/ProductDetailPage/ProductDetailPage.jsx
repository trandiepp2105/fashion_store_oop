import React, { useEffect, useState, useRef, useContext } from "react";
import "./ProductDetailPage.scss";
import { useLocation } from "react-router-dom";

import ProductContainer from "../../components/ProductContainer/ProductContainer";
import HorizontalScrollBar from "../../components/HorizontalScrollBar/HorizontalScrollBar";
import productService from "../../services/productService";
import BoxGallery from "../../components/BoxGallery/BoxGallery";
import formatCurrencyVN from "../../utils/formatCurrencyVN";
import AddToCartModal from "../../components/AddToCartModal/AddToCartModal";
import ModalLogin from "../../components/ModalLogin/ModalLogin";
import { AppContext } from "../../App";
import cartSurvice from "../../services/cartSurvice";
import addTemporaryComponent from "../../utils/renderAlertPopup";
const ProductDetailPage = () => {
  const tempProduductDetail = {
    id: 1,
    name: "TSUN Emotions Tee - Black",
    original_price: 1000000,
    selling_price: 800000,
    image_url: "/assets/images/temp_image_product.png",

    product_variants: [
      {
        id: 1,
        variant: {
          size: "XS",
          color: "Red",
        },
        image_url: "/assets/images/temp_image_product.png",
      },
    ],
  };
  const { isUserLogin, setShoppingCart, onLoading, setOnLoading } =
    useContext(AppContext);
  const [isOpenLoginPopup, setIsOpenLoginPopup] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  // Hàm hiển thị modal trong 5s rồi ẩn
  const handleShowModal = () => {
    setShowAddToCartModal(true); // Hiển thị modal
    setTimeout(() => {
      setShowAddToCartModal(false); // Ẩn modal sau 5s
    }, 3000);
  };
  const [selectedVariant, setSelectedVariant] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const productId = location.pathname.split("/")[2];
    productService.getProductById(productId).then((data) => {
      const sortedImages = [...data.images].sort(
        (a, b) => b.is_main - a.is_main
      );
      data.images = sortedImages;

      setProductDetail(data);
      // setSelectedVariant(data.variant);
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
        data.images.forEach((image, index) => {
          if (image.id === data.variants[0].image.id) {
            setGalleyryCurrentIndex(index);
          }
        });
      }
    });
  }, [location]); // Dependency là location
  const similarProducts = [];
  const technicalSpecifications = [
    {
      name: "Loại card đồ họa",
      value: "Apple GPU (4-core graphics)",
    },
    {
      name: "Chipset",
      value: "Apple A15 Bionic (5 nm)",
    },
    {
      name: "Hệ điều hành",
      value: "iOS 15",
    },
    {
      name: "RAM",
      value: "4 GB",
    },
    {
      name: "Bộ nhớ trong",
      value: "128 GB",
    },
    {
      name: "Công nghệ màn hình",
      value:
        "Màn hình Liquid Retina XDRXDR (Extreme Dynamic Range) Độ sáng XDR: 1.000 nit ở chế độ toàn màn hình, độ sáng đỉnh 1.600 nit (chỉ nội dung HDR) 1 tỷ màu Dải màu rộng (P3) Công nghệ True Tone Hỗ trợ tối đa hai màn hình ngoài",
    },
    {
      name: "Cổng giao tiếp",
      value:
        "Khe thẻ nhớ SDXC Cổng HDMI Jack cắm tai nghe 3.5 mm Cổng MagSafe 3 Ba cổng Thunderbolt 4 (USB‑C) hỗ trợ: Sạc, DisplayPort, Thunderbolt 4 (lên đến 40Gb/s), USB 4 (lên đến 40Gb/s)",
    },
    {
      name: "Pin",
      value:
        "Pin Li-Po 72.4 watt-giờ Thời gian xem video trực tuyến lên đến 24 giờ \n Thời gian duyệt web trên mạng không dây lên đến 16 giờ",
    },
  ];
  const series = [
    {
      name: "1TB",
      price: "30.990.000",
    },
    {
      name: "512GB",
      price: "27.990.000",
    },
    {
      name: "256GB",
      price: "24.990.000",
    },
    {
      name: "128GB",
      price: "21.990.000",
    },
  ];
  const [currentGalleyryIndex, setGalleyryCurrentIndex] = useState(0);
  const goToVariantImage = (variant) => {
    setSelectedVariant(variant);
    productDetail.images.forEach((image, index) => {
      if (image.id === variant.image.id) {
        setGalleyryCurrentIndex(index);
      }
    });
  };

  const handleAddToCart = async (event, productId, quantity, variantId) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isUserLogin) {
      setIsOpenLoginPopup(true);
    } else {
      setOnLoading(true);
      try {
        const response = await cartSurvice.addProductToCart(
          productId,
          quantity,
          variantId
        );
        setShoppingCart(response || []);
        handleShowModal();
        // addTemporaryComponent(<AddToCartModal />, 2000);
      } catch (error) {
        console.error("Error while adding product to cart", error);
      } finally {
        setOnLoading(false);
      }
    }
  };

  const handleCloseLoginPopup = () => {
    setIsOpenLoginPopup(false);
  };
  return (
    <div className="page product-detail-page">
      {showAddToCartModal && <AddToCartModal />}
      {isOpenLoginPopup && <ModalLogin handleClose={handleCloseLoginPopup} />}
      <div className="product-header">
        <div className="first-line">
          <div className="product-name">{productDetail.name}</div>
          <div className="quantity-sold">Đã bán 400</div>
        </div>
        <div className="second-line">
          <div className="rating">
            <div className="list-star">
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="star-icon"
                  >
                    <path
                      d="M4.47073 2.13024C5.26238 0.710081 5.65819 0 6.25 0C6.84181 0 7.23763 0.710075 8.02925 2.13023L8.23407 2.49764C8.45906 2.90121 8.5715 3.10299 8.74694 3.23613C8.92231 3.36927 9.14069 3.41869 9.57757 3.51753L9.97532 3.60752C11.5126 3.95535 12.2813 4.12926 12.4641 4.71733C12.647 5.30538 12.123 5.91819 11.0749 7.14369L10.8038 7.46075C10.506 7.809 10.3571 7.98313 10.2901 8.19856C10.2231 8.414 10.2456 8.64631 10.2906 9.111L10.3316 9.534C10.4901 11.1691 10.5693 11.9867 10.0906 12.3501C9.61175 12.7136 8.89207 12.3822 7.45269 11.7195L7.08031 11.548C6.67131 11.3597 6.46681 11.2655 6.25 11.2655C6.03319 11.2655 5.82869 11.3597 5.41969 11.548L5.04731 11.7195C3.60793 12.3822 2.88824 12.7136 2.40947 12.3501C1.9307 11.9867 2.00993 11.1691 2.16838 9.534L2.20936 9.111C2.2544 8.64631 2.27691 8.414 2.20991 8.19856C2.14293 7.98313 1.99402 7.809 1.6962 7.46075L1.42506 7.14369C0.377032 5.91819 -0.146986 5.30538 0.0358887 4.71733C0.218764 4.12926 0.987414 3.95535 2.52471 3.60752L2.92243 3.51753C3.35928 3.41869 3.57771 3.36927 3.75309 3.23613C3.92847 3.10299 4.04096 2.90121 4.26592 2.49764L4.47073 2.13024Z"
                      fill="#FF8C00"
                    />
                  </svg>
                );
              })}
            </div>
            <p className="blur-text">200 đánh giá</p>
          </div>
          <button className="view-specifications-button">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="view-specifications-icon"
            >
              <g clip-path="url(#clip0_156_851)">
                <path
                  d="M2.5 7.5L1.25 8.75H8.75V1.25L7.5 2.5M2.5 7.5L3.75 6.25M2.5 7.5L2.91667 7.91667M7.5 2.5L6.25 3.75M7.5 2.5L7.91667 2.91667M3.75 6.25L5 5M3.75 6.25L4.16667 6.66667M5 5L6.25 3.75M5 5L5.41667 5.41667M6.25 3.75L6.66667 4.16667M5 7.5H7.5V5L5 7.5Z"
                  stroke="#FC6703"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_156_851">
                  <rect
                    width="10"
                    height="10"
                    fill="white"
                    transform="matrix(0 -1 1 0 0 10)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p>Thông số</p>
          </button>

          <button className="view-compare-button">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="view-compare-icon"
            >
              <g clip-path="url(#clip0_156_831)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 9.375C2.58375 9.375 0.625 7.41563 0.625 5C0.625 2.58437 2.58375 0.625 5 0.625C7.41625 0.625 9.375 2.58437 9.375 5C9.375 7.41563 7.41625 9.375 5 9.375ZM5 0C2.23844 0 0 2.2375 0 5C0 7.7625 2.23844 10 5 10C7.76156 10 10 7.7625 10 5C10 2.2375 7.76156 0 5 0ZM6.875 4.6875H5.3125V3.125C5.3125 2.95312 5.17281 2.8125 5 2.8125C4.82719 2.8125 4.6875 2.95312 4.6875 3.125V4.6875H3.125C2.95219 4.6875 2.8125 4.82812 2.8125 5C2.8125 5.17188 2.95219 5.3125 3.125 5.3125H4.6875V6.875C4.6875 7.04688 4.82719 7.1875 5 7.1875C5.17281 7.1875 5.3125 7.04688 5.3125 6.875V5.3125H6.875C7.04781 5.3125 7.1875 5.17188 7.1875 5C7.1875 4.82812 7.04781 4.6875 6.875 4.6875Z"
                  fill="#FC6703"
                />
              </g>
              <defs>
                <clipPath id="clip0_156_831">
                  <rect width="10" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p>So sánh</p>
          </button>
        </div>
      </div>
      <div className="block-detail-product">
        <div className="left-side">
          <div className="product-gallery">
            {productDetail.images && productDetail.images.length > 0 && (
              <BoxGallery
                slides={productDetail.images}
                currentIndex={currentGalleyryIndex}
                setCurrentIndex={setGalleyryCurrentIndex}
              />
            )}
          </div>
        </div>
        <div className="right-side">
          <div className="series">
            {series.map((item, index) => {
              return (
                <div className="series-item">
                  <div className="series-name">{item.name}</div>
                  <div className="series-price">{item.price}₫</div>
                </div>
              );
            })}
          </div>
          <div className="wrapper-variants">
            <p className="title">Chọn màu để xem giá</p>
            <div className="variants">
              {productDetail.variants &&
                productDetail.variants.length > 0 &&
                productDetail.variants.map((item, index) => {
                  return (
                    <div
                      className={`variant-item ${
                        selectedVariant && selectedVariant.id === item.id
                          ? "selected-variant-item"
                          : null
                      }`}
                      onClick={() => goToVariantImage(item)}
                    >
                      {selectedVariant && selectedVariant.id === item.id && (
                        <div className="wrapper-selected-variant-icon">
                          <svg
                            width="64px"
                            height="64px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="selected-variant-icon"
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
                                d="M4 12.6111L8.92308 17.5L20 6.5"
                                stroke="#ffffff"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />{" "}
                            </g>
                          </svg>
                        </div>
                      )}
                      <img
                        src={item.image.url}
                        alt=""
                        className="variant-image"
                      />

                      <div className="variant-detail">
                        <div className="variant-name">{item.name}</div>
                        <div className="variant-price">
                          {formatCurrencyVN(item.price)}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="wrapper-price">
            <div className="block-price">
              <div className="block-price-column">
                <p className="title">Mua ngay với giá</p>
                <p className="main-price">
                  {formatCurrencyVN(productDetail.price_show)}
                </p>
                <div className="wrapper-price-through">
                  <p className="price-through">
                    {formatCurrencyVN(productDetail.price_through)}
                  </p>
                  <p className="discount-rate">8%</p>
                </div>
              </div>
              <div className="block-price-column middle-column">
                <div className="divider-column"></div>
                <span>Hoặc</span>
                <div className="divider-column"></div>
              </div>
              <div className="block-price-column installment-column">
                <p className="title">Trả góp</p>
                <p className="installment-price">
                  {formatCurrencyVN(productDetail.price_show / 12)}{" "}
                  <span>/tháng</span>
                </p>
              </div>
              {/* <div className="block-product-price">
                <p className="product-price-title price-title">
                  Mua ngay với giá
                </p>
                <p className="product-price">21.990.000₫</p>
                <p className="product-price-through">
                  24.990.000đ <span className="discount-rate">8%</span>
                </p>
              </div>
              <p className="divider">Hoặc</p>
              <div className="block-installment-price price-title">
                <p className="installment-price-title">Trả góp</p>
                <p className="installment-price">1.990.000₫/tháng</p>
              </div> */}
            </div>
            <div className="wrapper-coupon">
              <p className="coupon-title">Chọn 1 trong các khuyến mãi sau</p>
              <div className="coupon-item">
                <p className="coupon-item__title">Khuyến mãi 1</p>
                <div className="coupon-item__detail">
                  <span className="check-icon">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 text-green-green-7"
                    >
                      <path
                        d="M8 2.8335C11.3137 2.8335 14 5.51979 14 8.8335C14 12.1472 11.3137 14.8335 8 14.8335C4.68629 14.8335 2 12.1472 2 8.8335C2 5.51979 4.68629 2.8335 8 2.8335ZM8 3.8335C5.23858 3.8335 3 6.07207 3 8.8335C3 11.5949 5.23858 13.8335 8 13.8335C10.7614 13.8335 13 11.5949 13 8.8335C13 6.07207 10.7614 3.8335 8 3.8335ZM7.24953 9.87592L10.1203 6.99748C10.3153 6.80195 10.6319 6.80153 10.8274 6.99653C11.0012 7.16987 11.0208 7.43926 10.8861 7.63431L10.8283 7.70364L7.60403 10.9366C7.43053 11.1105 7.16082 11.13 6.96576 10.995L6.89645 10.937L5.14645 9.18705C4.95118 8.99179 4.95118 8.6752 5.14645 8.47994C5.32001 8.30638 5.58944 8.28709 5.78431 8.42209L5.85355 8.47994L7.24953 9.87592L10.1203 6.99748L7.24953 9.87592Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Giảm ngay 900.000đ áp dụng đến hết 30/12
                </div>
              </div>
              <div className="coupon-item">
                <p className="coupon-item__title">Khuyến mãi 2</p>
                <div className="coupon-item__detail">
                  <span className="check-icon">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 text-green-green-7"
                    >
                      <path
                        d="M8 2.8335C11.3137 2.8335 14 5.51979 14 8.8335C14 12.1472 11.3137 14.8335 8 14.8335C4.68629 14.8335 2 12.1472 2 8.8335C2 5.51979 4.68629 2.8335 8 2.8335ZM8 3.8335C5.23858 3.8335 3 6.07207 3 8.8335C3 11.5949 5.23858 13.8335 8 13.8335C10.7614 13.8335 13 11.5949 13 8.8335C13 6.07207 10.7614 3.8335 8 3.8335ZM7.24953 9.87592L10.1203 6.99748C10.3153 6.80195 10.6319 6.80153 10.8274 6.99653C11.0012 7.16987 11.0208 7.43926 10.8861 7.63431L10.8283 7.70364L7.60403 10.9366C7.43053 11.1105 7.16082 11.13 6.96576 10.995L6.89645 10.937L5.14645 9.18705C4.95118 8.99179 4.95118 8.6752 5.14645 8.47994C5.32001 8.30638 5.58944 8.28709 5.78431 8.42209L5.85355 8.47994L7.24953 9.87592L10.1203 6.99748L7.24953 9.87592Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Giảm ngay 900.000đ áp dụng đến hết 30/12
                </div>
                <div className="coupon-item__detail">
                  <span className="check-icon">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 text-green-green-7"
                    >
                      <path
                        d="M8 2.8335C11.3137 2.8335 14 5.51979 14 8.8335C14 12.1472 11.3137 14.8335 8 14.8335C4.68629 14.8335 2 12.1472 2 8.8335C2 5.51979 4.68629 2.8335 8 2.8335ZM8 3.8335C5.23858 3.8335 3 6.07207 3 8.8335C3 11.5949 5.23858 13.8335 8 13.8335C10.7614 13.8335 13 11.5949 13 8.8335C13 6.07207 10.7614 3.8335 8 3.8335ZM7.24953 9.87592L10.1203 6.99748C10.3153 6.80195 10.6319 6.80153 10.8274 6.99653C11.0012 7.16987 11.0208 7.43926 10.8861 7.63431L10.8283 7.70364L7.60403 10.9366C7.43053 11.1105 7.16082 11.13 6.96576 10.995L6.89645 10.937L5.14645 9.18705C4.95118 8.99179 4.95118 8.6752 5.14645 8.47994C5.32001 8.30638 5.58944 8.28709 5.78431 8.42209L5.85355 8.47994L7.24953 9.87592L10.1203 6.99748L7.24953 9.87592Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Trả góp 0% lãi suất
                </div>
              </div>
            </div>

            <div className="wrapper-student-coupon">
              <div className="student-coupon-banner">Đặc quyền sinh viên</div>
              <div className="student-discount-block">
                <p className="student-discount-title">Giảm ngay</p>
                <p className="student-discount-value">200.000 đ</p>
              </div>
              <div className="verify-button-block">
                <button className="verify-button">Xác thực ngay</button>
              </div>
            </div>
          </div>

          <div className="cart-services">
            <button
              className="cart-buton"
              onClick={(event) => {
                handleAddToCart(event, productDetail.id, 1, selectedVariant.id);
              }}
            >
              <img src="/assets/Icons/cart.png" alt="" className="cart-img" />
            </button>
            <button className="buy-now-button">Mua Ngay</button>
            <div className="installment-button">
              <p className="installment-title">Trả góp</p>
              <p className="installment-value"></p>
            </div>
          </div>

          <div className="wrapper-call-to-order">
            <img src="/assets/Icons/phone.png" alt="" className="phone-icon" />
            <div className="call-to-order-text">
              Gọi<span className="phone-number">1800-6601</span>để được tư vấn
              mua hàng (Miễn phí)
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="similar-products">
        <p className="similar-products-title">Sản phẩm tương tự</p>

        <HorizontalScrollBar />
      </div>
      <div className="divider"></div>
      <div className="block-content-product">
        <div className="block-content-product-left">
          <div className="box-review">
            <p className="box-review-title">
              Đánh giá & nhận xét MacBook Pro 14 M4 10CPU 10GPU 16GB 512GB |
              Chính hãng Apple Việt Nam
            </p>

            <div className="box-review-no-comment">
              <img
                src="/assets/images/review-empty.png"
                alt=""
                className="review-empty-img"
              />
              <p>
                Hiện chưa có đánh giá nào. <br />
                Bạn sẽ là người đầu tiên đánh giá sản phẩm này chứ?
              </p>
              <div className="button__review">Đánh giá ngay</div>
            </div>
          </div>
          <div className="block-comments">
            <p className="block-comments-title">Hỏi và đáp</p>
            <div className="textarea-comment">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:55:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png"
                width="55"
                alt="assistant-img"
                className="textarea-comment__img"
              />
              <textarea
                placeholder="Xin mời để lại câu hỏi, viperphone sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                className="textarea-comment__input"
              />
              <button class="button__cmt-send">
                <svg
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="icon-paper-plane"
                >
                  <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path>
                </svg>
                Gửi
              </button>
            </div>
            <span className="divider"></span>
            <div className="comment-list">
              <div className="comment-item">
                <div className="user-avatar">
                  {/* <img src="" alt="user-avatar-img" /> */}
                  <p>Đ</p>
                </div>
                <div className="comment-detail">
                  <div className="comment-general-info">
                    <div className="username">Trần Điệp</div>
                    <span className="divider"></span>
                    <div className="comment-time">1 giờ trước</div>
                  </div>
                  <div className="comment-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, quidem.
                    </p>
                  </div>
                  <div className="comment-services">
                    <button className="like-comment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M9.79594 6.65072L10.031 5.9822L10.5124 4.61316C10.5124 4.61312 10.5124 4.61307 10.5124 4.61302C10.6446 4.23646 10.6725 3.73668 10.5652 3.27951C10.4574 2.81968 10.2332 2.47819 9.93626 2.31283L9.93624 2.31282C9.72287 2.19397 9.43614 2.14813 9.24901 2.19724L9.24897 2.19725C9.19114 2.21242 9.12927 2.25707 9.09136 2.32397C9.07765 2.34818 9.06292 2.38889 9.04966 2.47936C9.04408 2.51748 9.03986 2.55522 9.03457 2.60266C9.03338 2.61329 9.03214 2.62441 9.03081 2.63613C9.02413 2.6953 9.01555 2.76753 9.00192 2.84248L9.79594 6.65072ZM9.79594 6.65072L10.5046 6.64805L10.5027 6.14805M9.79594 6.65072L10.5027 6.14805M10.5027 6.14805L10.5046 6.64805L10.5047 6.64805L10.5052 6.64805L10.5071 6.64804L10.5144 6.64801L10.5432 6.64791L10.6527 6.64752L11.0439 6.64622C11.3681 6.64521 11.801 6.64399 12.2361 6.64318C12.6714 6.64236 13.1084 6.64196 13.4409 6.64257C13.6073 6.64287 13.7466 6.64343 13.8461 6.6443C13.8961 6.64474 13.9345 6.64524 13.9607 6.6458L13.9642 6.64589C14.3176 6.7205 14.5678 7.00911 14.6427 7.3828C14.7194 7.76595 14.593 8.15032 14.2695 8.36633L13.8902 8.61961L14.1076 9.02055C14.341 9.45091 14.1972 10.0154 13.8124 10.2723L13.4331 10.5255L13.6505 10.9265C13.884 11.3568 13.7401 11.9213 13.3553 12.1782L12.976 12.4315L13.1935 12.8324C13.5357 13.4635 13.0543 14.2252 12.4387 14.2248H12.4384H5.32063V7.31629L5.52013 7.12737C5.73816 6.92069 6.03631 6.63756 6.35673 6.33179C6.99494 5.72276 7.72967 5.01616 8.09116 4.64862C8.57735 4.1543 8.88091 3.50779 9.00191 2.8425L10.5027 6.14805ZM13.9858 6.64649C13.995 6.64686 13.9934 6.64703 13.9853 6.64647L13.9858 6.64649ZM1.66406 15.1777V6.64806H3.40649V15.1777H1.66406Z"
                          stroke="#212121"
                        ></path>
                      </svg>
                      <p>0</p>
                    </button>
                    <button className="reply-comment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M3.87106 8.67721L6.55315 11.3597C6.74841 11.555 6.74841 11.8716 6.55315 12.0668C6.37958 12.2404 6.11016 12.2597 5.91529 12.1247L5.84604 12.0668L2.2801 8.49804L2.23046 8.4269L2.20281 8.37109L2.18004 8.30345L2.17515 8.28273C2.16789 8.24905 2.16406 8.21384 2.16406 8.17775L2.16952 8.25166L2.16586 8.22023L2.16586 8.13522L2.18085 8.04891L2.20185 7.98671L2.24125 7.91074L2.29575 7.83959L5.84604 4.28866C6.04131 4.0934 6.35789 4.0934 6.55315 4.28866C6.72672 4.46222 6.746 4.73165 6.61101 4.92652L6.55315 4.99577L3.87106 7.67721L8.16406 7.67775C11.6858 7.67775 14.0495 9.65355 14.16 12.4702L14.1641 12.6777C14.1641 12.9539 13.9402 13.1777 13.6641 13.1777C13.3879 13.1777 13.1641 12.9539 13.1641 12.6777C13.1641 10.4046 11.3566 8.77316 8.42558 8.68179L8.16406 8.67775L3.87106 8.67721L6.55315 11.3597L3.87106 8.67721Z"
                          fill="#212121"
                        ></path>
                      </svg>
                      <p>Trả lời</p>
                    </button>
                  </div>

                  {/* <div className="reply-comment-box">
                    <div className="ref-user-avatar"></div>
                    <div className="reply-comment-content">
                      <div className="block-ref-username">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                        >
                          <path
                            d="M3.87106 8.67721L6.55315 11.3597C6.74841 11.555 6.74841 11.8716 6.55315 12.0668C6.37958 12.2404 6.11016 12.2597 5.91529 12.1247L5.84604 12.0668L2.2801 8.49804L2.23046 8.4269L2.20281 8.37109L2.18004 8.30345L2.17515 8.28273C2.16789 8.24905 2.16406 8.21384 2.16406 8.17775L2.16952 8.25166L2.16586 8.22023L2.16586 8.13522L2.18085 8.04891L2.20185 7.98671L2.24125 7.91074L2.29575 7.83959L5.84604 4.28866C6.04131 4.0934 6.35789 4.0934 6.55315 4.28866C6.72672 4.46222 6.746 4.73165 6.61101 4.92652L6.55315 4.99577L3.87106 7.67721L8.16406 7.67775C11.6858 7.67775 14.0495 9.65355 14.16 12.4702L14.1641 12.6777C14.1641 12.9539 13.9402 13.1777 13.6641 13.1777C13.3879 13.1777 13.1641 12.9539 13.1641 12.6777C13.1641 10.4046 11.3566 8.77316 8.42558 8.68179L8.16406 8.67775L3.87106 8.67721L6.55315 11.3597L3.87106 8.67721Z"
                            fill="#212121"
                          ></path>
                        </svg>
                        <p>
                          Đang trả lời:{" "}
                          <span className="ref-username">Trần Điệp</span>
                        </p>
                      </div>

                      <textarea
                        name="reply-comment-textarea"
                        id=""
                        className="reply-comment-textarea"
                        placeholder="Nhập nội dung bình luận"
                        rows={2}
                      ></textarea>
                      <button class="button__cmt-send">
                        <svg
                          height="15"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="icon-paper-plane"
                        >
                          <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path>
                        </svg>
                        Gửi
                      </button>
                    </div>
                  </div> */}
                  <div className="reply-comment-box admin-response-comment">
                    <div className="ref-user-avatar admin-avatar"></div>
                    <div className="admin-response-content reply-comment-content">
                      <div className="admin-response-header">
                        <p className="admin-username">Trần Văn Điệp</p>
                        <span>Quản trị viên</span>
                        <div className="reply-comment-header-divider"></div>
                        <p className="time-reply">2 giờ trước</p>
                      </div>
                      <div className="admin-response-text">
                        <p>
                          Chào bạn Điệp,
                          <br />
                          <br />
                          Dạ bên em đang có giá trong hiện tại anh tham khảo mua
                          với giá ưu đãi siêu hờ nhé. Sản phẩm Samsung Galaxy
                          M55 5G 256GB giá ưu đãi chỉ từ 8.390.000đ áp dụng đến
                          09/12. Với Chip mạnh mẽ, chơi game liền mạch và Pin
                          5.000 mAh với công nghệ sạc siêu nhanh. Anh tham khảo
                          lựa chọn mua ngay nhé. Bên em xin phép liên hệ để tư
                          vấn chi tiết hơn. Nếu cần thêm thông tin khác anh gọi
                          tổng đài miễn phí 18006601 hoặc có thể chat qua Zalo
                          tại đây <br />
                          <br />
                          Thân mến!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block-content-product-right">
          <div className="technical-container">
            <p className="technical-title">Thông số kỹ thuật</p>
            <ul className="technical-content">
              {technicalSpecifications.map((item, index) => {
                return (
                  <li className="technical-content-item">
                    <p>{item.name}</p>
                    <div>{item.value}</div>
                  </li>
                );
              })}
              {/* <li className="technical-content-item">
                <p>Ổ cứng</p>
                <div>512GB</div>
              </li> */}
            </ul>

            <button className="button__show-modal-technical">
              Xem cấu hình chi tiết
              <div class="icon-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="10"
                  height="10"
                >
                  <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* <AddToCartModal /> */}
    </div>
  );
};

export default ProductDetailPage;
