import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./CatalogSearchPage.scss";
import { Link } from "react-router-dom";
import ProductContainer from "../../components/ProductContainer/ProductContainer";
import productService from "../../services/productService";
const CatalogSearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQueryParam = queryParams.get("q");
    const categoryParam = queryParams.get("cate");

    setSearchQuery(searchQueryParam);
    setCategory(categoryParam);
    console.log("searchQuery", searchQuery);
    console.log("category", category);
    // Logic xử lý khi query param thay đổi
  }, [location]); // Dependency là location

  const [tempProducts, setTempProducts] = useState([
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 2,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 3,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 4,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 5,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 6,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 7,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 8,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 9,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 10,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
  ]);
  return (
    <div className="page catalog-search-page">
      <div className="navigator">
        <Link className="navigator-item" to="/">
          Trang chủ
        </Link>
        {searchQuery ? (
          <div className="navigator-item">Search</div>
        ) : (
          <>
            <Link className="navigator-item" to="/catalog">
              Danh mục
            </Link>
            <Link className="navigator-item" to="/catalog/search">
              T-Shirts
            </Link>
          </>
        )}
      </div>
      {searchQuery && (
        <div className="search-description">
          <h1>Tìm kiếm</h1>
          <p className="subtxt">Có 10 sản phẩm được tìm thấy</p>
          <p className="subtxt-result">
            Kết quả tìm kiếm cho <strong>{`"${searchQuery}"`}</strong>
          </p>
        </div>
      )}
      <div className="filter-bar">
        <div className="wrapper-filter-box">
          <button className="toggle-filter-btn">
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              id="filter-alt"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              class="icon flat-line"
              transform="rotate(90)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  id="secondary"
                  d="M5,17a2,2,0,1,0,2,2A2,2,0,0,0,5,17ZM12,3a2,2,0,1,0,2,2A2,2,0,0,0,12,3Zm7,7a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z"
                  style={{
                    fill: "#2ca9bc",
                    strokeWidth: 2,
                  }}
                />

                <path
                  id="primary"
                  d="M5,3V17M12,7V21m7-7v7m0-11V3"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />

                <path
                  id="primary-2"
                  data-name="primary"
                  d="M5,17a2,2,0,1,0,2,2A2,2,0,0,0,5,17ZM12,3a2,2,0,1,0,2,2A2,2,0,0,0,12,3Zm7,7a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />
              </g>
            </svg>
            <span>Filter</span>
          </button>
        </div>
        {category && (
          <div className="title">
            <p>T-Shirts</p>
          </div>
        )}
        <div className="wrapper-order-box">
          <div className="select">
            <div className="selected-option">Newest</div>
            <div className="dropdown-icon">
              <svg
                fill="#bababa"
                width="20px"
                height="20px"
                viewBox="-6.5 0 32 32"
                version="1.1"
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
                  <title>dropdown</title>{" "}
                  <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z" />{" "}
                </g>
              </svg>
            </div>
            <div className="options">
              <div className="option">Giá: tăng dần</div>
              <div className="option">Giá: giảm dần</div>
              <div className="option">Tên: A-Z</div>
              <div className="option">Tên: Z-A</div>
              <div className="option">Cũ nhất</div>
              <div className="option">Mới nhất</div>
              <div className="option">Bán chạy nhất</div>
            </div>
          </div>
        </div>
      </div>
      <div className="catalog-list">
        <div className="catalog-list-inner">
          {tempProducts.map((product, index) => {
            return (
              <div className="catalog-item" key={index}>
                <ProductContainer productGeneralInfo={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CatalogSearchPage;
