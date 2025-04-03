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

import { Link } from "react-router-dom";
const ProductDetailPage = () => {
  return (
    <div className="page product-detail-page">
      <div className="navigator">
        <Link className="navigator-item" to="/">
          Trang chủ
        </Link>

        <Link className="navigator-item" to="/catalog">
          Danh mục
        </Link>
        <Link className="navigator-item" to="/catalog/search">
          T-Shirts
        </Link>
      </div>
      <div className="product-detail">
        <div className="images-side">
          <div className="image-container">
            <img src="/assets/images/product-image-1.png" alt="" />
          </div>
          <div className="image-container">
            <img src="/assets/images/product-image-2.png" alt="" />
          </div>
          <div className="image-container">
            <img src="/assets/images/product-image-3.png" alt="" />
          </div>
          <div className="image-container">
            <img src="/assets/images/product-image-4.png" alt="" />
          </div>
        </div>
        <div className="add-to-cart-side">
          <div className="product-title">
            <h1>TSUN Shy Teddy Woo Tee - White</h1>
            <span className="sku">SKU: shyteddywhite1</span>
          </div>
          <div className="product-price">
            <span className="pro-sale">-30%</span>
            <span className="pro-price">294,000₫</span>
            <del>420,000₫</del>
          </div>
          <div className="wrapper-variants">
            <p className="title">SIZE:</p>
            <div className="variants">
              <div className="variant-item">
                <input type="radio" name="size" id="" />
                <label htmlFor="size">S</label>
              </div>
              <div className="variant-item">
                <input type="radio" name="size" id="" />
                <label htmlFor="size">M</label>
              </div>
              <div className="variant-item">
                <input type="radio" name="size" id="" />
                <label htmlFor="size">L</label>
              </div>
              <div className="variant-item">
                <input type="radio" name="size" id="" />
                <label htmlFor="size">XL</label>
              </div>
            </div>
          </div>
          <div className="selector-actions">
            <div className="quantity-area">
              <input
                type="button"
                value="-"
                onclick="minusQuantity()"
                className="qty-btn btn-left-quantity"
              />
              <input
                type="text"
                id="quantity"
                name="quantity"
                value="1"
                min="1"
                className="quantity-selector"
              />
              <input
                type="button"
                value="+"
                onclick="plusQuantity()"
                className="qty-btn btn-right-quantity"
              />
            </div>
            <div className="wrap-addcart">
              <button
                type="button"
                id="add-to-cart"
                className="btn-addtocart"
                name="add"
              >
                Thêm vào giỏ
              </button>

              <button
                type="button"
                id="buy-now"
                className="btn-addtocart"
                name="add"
              >
                Mua ngay
              </button>
            </div>
          </div>
          <div className="product-description">
            <div className="product-detail-info">
              <div className="nav-bar">
                <div className="nav-item">
                  <p>Mô Tả</p>
                </div>
                <div className="nav-item">
                  <p>Chính sách đổi trả</p>
                </div>
                <div className="nav-item active">
                  <p>Hướng dẫn mua hàng</p>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane">
                  <strong>Hướng dẫn sử dụng website của cửa hàng:</strong>
                  <p>- Các bước mua hàng tại&nbsp;Web TSUN:</p>
                  <p>
                    + Chọn sản phẩm -&gt; chọn Size sản phẩm -&gt; thêm vào giỏ
                    hàng -&gt; thanh toán
                  </p>
                  <p>
                    (Trong trường hợp các bạn mua nhiều sản phẩm, các bạn thêm
                    từng sản phẩm vào giỏ hàng, sau khi&nbsp;đã&nbsp;đủ sản phẩm
                    và số lượng , các bạn vui lòng kiểm tra thật kỹ giỏ hàng
                    và&nbsp;ấn THANH TOÁN)
                  </p>
                  <p>
                    + Thanh toán -&gt;&nbsp;Điền&nbsp;đầy&nbsp;đủ thông tin
                    -&gt; Tên -&gt; Số&nbsp;Điện Thoại -&gt;&nbsp;Địa chỉ nhận
                    hàng - &gt; Mail.
                  </p>
                  <p>
                    (&nbsp;Đơn hàng thành công là khi các
                    bạn&nbsp;điền&nbsp;đầy&nbsp;đủ thông tin và chính xác, các
                    bạn cần&nbsp;điền&nbsp;đầy&nbsp;đủ thông tin và Mail&nbsp;để
                    TSUN có thể xác nhận&nbsp;đơn hàng qua Mail cho các bạn.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-featured-product">
        <div className="product-list-title">
          <div className="title-link">SIMILAR PRODUCTS</div>
          <p>Some description for this category</p>
        </div>
        <HorizontalScrollBar similarProducts={[]} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
