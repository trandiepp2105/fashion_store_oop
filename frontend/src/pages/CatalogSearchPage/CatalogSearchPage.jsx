import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./CatalogSearchPage.scss";
import { Link } from "react-router-dom";
import ProductContainer from "../../components/ProductContainer/ProductContainer";
import HorizontalScrollBar from "../../components/HorizontalScrollBar/HorizontalScrollBar";
import productService from "../../services/productService";
const CatalogSearchPage = () => {
  const [products, setProducts] = useState({
    data: [],
    next: null,
    previous: null,
    count: 0,
  });

  const [viewedProducts, setViewedProducts] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const location = useLocation();
  const categoryNameReference = {
    WATCH: "đồng hồ",
    HEADPHONE: "tai nghe",
    ACCESSORIES: "phụ kiện",
  };
  const fetchProductsByCategory = async (
    categoryName,
    next = products.next
  ) => {
    const response = await productService.searchProductsByCategory(
      categoryName,
      1,
      next
    );
    setProducts(() => ({
      data: response.results,
      next: response.next,
      previous: response.previous,
      count: response.count,
    }));
  };

  const fetchSubCategories = async (categoryName) => {
    const response = await productService.getSubCategories(categoryName);
    console.log("subcates: ", response);
    setSubCategories(response);
  };
  const getNextProducts = async (next = products.next) => {
    if (!products.next) return;
    const queryParams = new URLSearchParams(location.search);
    setCategoryName(queryParams.get("cate"));
    const response = await productService.searchProductsByCategory(
      categoryName,
      1,
      next
    );
    setProducts((prevProducts) => ({
      ...prevProducts,
      data: [...prevProducts.data, ...response.results],
      next: response.next,
      previous: response.previous,
      count: response.count,
    }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setCategoryName(queryParams.get("cate"));
    fetchSubCategories(queryParams.get("cate"));
    fetchProductsByCategory(queryParams.get("cate"), null);
    // Logic xử lý khi query param thay đổi
  }, [location]); // Dependency là location

  const [isDisplaySortByPrice, setIsDisplaySortByPrice] = useState(false);
  const listQuickLink = [
    {
      logo: "/assets/logo/asus-logo.png",
    },
    {
      logo: "/assets/logo/dell-logo.png",
    },
    {
      logo: "/assets/logo/hp-logo.png",
    },
    {
      logo: "/assets/logo/lenovo-logo.png",
    },
    {
      logo: "/assets/logo/acer-logo.png",
    },
    {
      logo: "/assets/logo/macbook-logo.png",
    },
    {
      text: "Laptop Gaming",
    },
  ];
  const listProduct = Array.from(
    { length: 13 },
    (_, index) => `Item ${index + 1}`
  );

  return (
    <div className="page catalog-search-page">
      <div className="search-result">
        <div className="cate-main-filter">
          {subCategories.length > 0 && subCategories[0].logo_url && (
            <div className="box-filter">
              <div className="filter-total">
                <div className="button__toggle-filter-total">
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
                        d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"
                        stroke="#2a83e9"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </g>
                  </svg>
                  <p>Lọc</p>
                </div>
              </div>
              <div className="box-quicklink">
                <div className="list-quicklink">
                  {subCategories.map((item, index) => (
                    <Link
                      to={`/catalogsearch?cate=${item.name}`}
                      className="quicklink-item"
                      key={index}
                    >
                      <img src={item.logo_url} alt="logo" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {subCategories.length > 0 && subCategories[0].background_url && (
            <div className="box-filter-type">
              <p className="box-filter-type__title">
                {"Chọn loại " + categoryNameReference[categoryName]}
              </p>
              <div className="box-filter-type__list">
                {subCategories.map((subCategory, index) => (
                  <Link
                    to={`/catalogsearch?cate=${subCategory.name}`}
                    // onClick={() => {
                    //   fetchProductsByCategory(subCategory.name);
                    // }}
                    className="filter-type-item"
                    key={index}
                    style={{
                      backgroundImage: `url(${subCategory.background_url})`,
                    }}
                  >
                    <p>{subCategory.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="box-sortby">
            <p className="box-sortby__title">Sắp xếp theo:</p>
            <div className="box-sortby__select">
              <button className="sort-select-item active">Bán chạy</button>
              <span className="divider"></span>
              <button className="sort-select-item">Nổi bật</button>
              <span className="divider"></span>

              <button className="sort-select-item">Giảm giá</button>
              <span className="divider"></span>

              <button className="sort-select-item">Mới</button>
              <span className="divider"></span>
              <div
                className="sort-select-item sortby-price"
                onClick={() => {
                  setIsDisplaySortByPrice(!isDisplaySortByPrice);
                }}
              >
                {isDisplaySortByPrice && (
                  <div className="box-choose-sortby-price">
                    <p>Giá thấp - cao</p>
                    <p>Giá cao - thấp</p>
                  </div>
                )}
                <p>Giá</p>
                <svg
                  width="18px"
                  height="18px"
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
              </div>
            </div>
          </div>
        </div>
        <div className="list-product">
          {products.data.map((productItem, index) => (
            <div className="product-item" key={index}>
              <ProductContainer productGeneralInfo={productItem} />
            </div>
          ))}
        </div>
        {products.next && (
          <button
            className="load-more-btn"
            onClick={() => {
              getNextProducts(products.next);
            }}
          >
            <p>
              {"Xem thêm " +
                (products.count - products.data.length) +
                " sản phẩm"}
            </p>
            <svg
              width="18px"
              height="18px"
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
        )}
      </div>
      {viewedProducts.length > 0 && (
        <div
          className="product-you-may-like"
          style={{
            background: `url("/assets/images/item-may-you-like-bg.jpg")`,
          }}
        >
          <div className="title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 1080 1080"
              fill="none"
            >
              <path
                d="M515.09 725.824L472.006 824.503C455.444 862.434 402.954 862.434 386.393 824.503L343.308 725.824C304.966 638.006 235.953 568.104 149.868 529.892L31.2779 477.251C-6.42601 460.515 -6.42594 405.665 31.2779 388.929L146.164 337.932C234.463 298.737 304.714 226.244 342.401 135.431L386.044 30.2693C402.239 -8.75637 456.159 -8.75646 472.355 30.2692L515.998 135.432C553.685 226.244 623.935 298.737 712.234 337.932L827.121 388.929C864.825 405.665 864.825 460.515 827.121 477.251L708.53 529.892C622.446 568.104 553.433 638.006 515.09 725.824Z"
                fill="url(#paint0_radial_2525_777)"
              ></path>{" "}
              <path
                d="M915.485 1036.98L903.367 1064.75C894.499 1085.08 866.349 1085.08 857.481 1064.75L845.364 1036.98C823.765 987.465 784.862 948.042 736.318 926.475L698.987 909.889C678.802 900.921 678.802 871.578 698.987 862.61L734.231 846.951C784.023 824.829 823.623 783.947 844.851 732.75L857.294 702.741C865.966 681.826 894.882 681.826 903.554 702.741L915.997 732.75C937.225 783.947 976.826 824.829 1026.62 846.951L1061.86 862.61C1082.05 871.578 1082.05 900.921 1061.86 909.889L1024.53 926.475C975.987 948.042 937.083 987.465 915.485 1036.98Z"
                fill="url(#paint1_radial_2525_777)"
              ></path>{" "}
              <defs>
                <radialGradient
                  id="paint0_radial_2525_777"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(670.447 474.006) rotate(78.858) scale(665.5 665.824)"
                >
                  <stop stop-color="#1BA1E3"></stop>{" "}
                  <stop offset="0.0001" stop-color="#1BA1E3"></stop>{" "}
                  <stop offset="0.300221" stop-color="#5489D6"></stop>{" "}
                  <stop offset="0.545524" stop-color="#9B72CB"></stop>{" "}
                  <stop offset="0.825372" stop-color="#D96570"></stop>{" "}
                  <stop offset="1" stop-color="#F49C46"></stop>
                </radialGradient>{" "}
                <radialGradient
                  id="paint1_radial_2525_777"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(670.447 474.006) rotate(78.858) scale(665.5 665.824)"
                >
                  <stop stop-color="#1BA1E3"></stop>{" "}
                  <stop offset="0.0001" stop-color="#1BA1E3"></stop>{" "}
                  <stop offset="0.300221" stop-color="#5489D6"></stop>{" "}
                  <stop offset="0.545524" stop-color="#9B72CB"></stop>{" "}
                  <stop offset="0.825372" stop-color="#D96570"></stop>{" "}
                  <stop offset="1" stop-color="#F49C46"></stop>
                </radialGradient>
              </defs>
            </svg>
            <p>SẢN PHẨM BẠN ĐÃ XEM</p>
          </div>

          {/* <div className="viewed-items">
          <HorizontalScrollBar />
        </div> */}
        </div>
      )}
    </div>
  );
};

export default CatalogSearchPage;
