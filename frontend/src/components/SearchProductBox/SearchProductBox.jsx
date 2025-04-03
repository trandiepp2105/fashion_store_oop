import React from "react";
import "./SearchProductBox.scss";
import { Link } from "react-router-dom";
const SearchProductBox = ({ searchResult }) => {
  if (!searchResult || searchResult.length <= 0) return null;
  return (
    <div className="search-product-result">
      <div className="result-container">
        <div className="search-result-item">
          <div className="title">
            <p className="product-name">Aurora Tee - Pink</p>
            <div className="product-price">
              <span className="original-price">294,000₫</span>
              <del>420,000₫</del>
            </div>
          </div>
          <img src="/assets/images/search-product-img.png" alt="" />
        </div>
        <div className="search-result-item">
          <div className="title">
            <p className="product-name">Aurora Tee - Pink</p>
            <div className="product-price">
              <span className="original-price">294,000₫</span>
              <del>420,000₫</del>
            </div>
          </div>
          <img src="/assets/images/search-product-img.png" alt="" />
        </div>
        <div className="search-result-item">
          <div className="title">
            <p className="product-name">Aurora Tee - Pink</p>
            <div className="product-price">
              <span className="original-price">294,000₫</span>
              <del>420,000₫</del>
            </div>
          </div>
          <img src="/assets/images/search-product-img.png" alt="" />
        </div>
        <div className="search-result-item">
          <div className="title">
            <p className="product-name">Aurora Tee - Pink</p>
            <div className="product-price">
              <span className="original-price">294,000₫</span>
              <del>420,000₫</del>
            </div>
          </div>
          <img src="/assets/images/search-product-img.png" alt="" />
        </div>
        <div className="search-result-item">
          <div className="title">
            <p className="product-name">Aurora Tee - Pink</p>
            <div className="product-price">
              <span className="original-price">294,000₫</span>
              <del>420,000₫</del>
            </div>
          </div>
          <img src="/assets/images/search-product-img.png" alt="" />
        </div>
        {searchResult?.length > 4 && (
          <Link className="results-more">Xem thêm 10 sản phẩm</Link>
        )}
      </div>
    </div>
  );
};

export default SearchProductBox;
