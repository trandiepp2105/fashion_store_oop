import React, { useState, useEffect } from "react";
import "./HomePages.scss";
import MainMenu from "../../components/MainMenu/MainMenu";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import BoxGallery from "../../components/BoxGallery/BoxGallery";
import { Link } from "react-router-dom";
import HotSaleDisplay from "../../components/HotSaleDisplay/HotSaleDisplay";
import ProductContainer from "../../components/ProductContainer/ProductContainer";
import ScrollListFeaturedProduct from "../../components/ScrollListFeaturedProduct/ScrollListFeaturedProduct";
import HorizontalScrollBar from "../../components/HorizontalScrollBar/HorizontalScrollBar";
import BlockCategory from "../../components/BlockCategory/BlockCategory";
import productService from "../../services/productService";
const HomePage = ({
  listFeaturedProduct = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ],
}) => {
  const bannerSlides = [
    {
      id: 1,
      image: "/assets/banner/banner1.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",

      captionLine2: "Mua ngay",
    },
    {
      id: 1,
      image: "/assets/images/banner2.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",
      captionLine2: "Mua ngay",
    },
    {
      id: 1,
      image: "/assets/banner/banner3.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",
      captionLine2: "Mua ngay",
    },
    {
      id: 1,
      image: "/assets/banner/banner4.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",
      captionLine2: "Mua ngay",
    },
    {
      id: 1,
      image: "/assets/banner/banner5.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",
      captionLine2: "Mua ngay",
    },
    {
      id: 1,
      image: "/assets/banner/banner6.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",
      captionLine2: "Mua ngay",
    },
    {
      id: 1,
      image: "/assets/banner/banner7.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",
      captionLine2: "Mua ngay",
    },
    {
      id: 1,
      image: "/assets/banner/banner8.png",
      caption: "IPHONE 16 SERIES",
      captionLine1: "IPHONE 16 SERIES",
      captionLine2: "Mua ngay",
    },
  ];

  const listRelatedTag = [
    "Apple",
    "Samsung",
    "Oppo",
    "Vivo",
    "Xiaomi",
    "Realme",
    "Xem tất cả",
  ];

  const [hotSaleProducts, setHotSaleProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const fetchHotSaleProducts = async (tagName = "SALE") => {
    const response = await productService.getProductsByTagName(tagName);
    if (response) {
      setHotSaleProducts(response);
    }
  };

  const fetchNewArrivalProducts = async (tagName = "NEW_ARRIVAL") => {
    const response = await productService.getProductsByTagName(tagName);
    if (response) {
      setNewArrivalProducts(response);
    }
  };

  useEffect(() => {
    fetchHotSaleProducts();
    fetchNewArrivalProducts();
  }, []);
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
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
    {
      id: 1,
      name: "Quần Dài Vải Nhung Tâm Ống Rộng - Corduroy Baggy Pants - Light Blue",
      image_url: "/assets/images/temp_image_product.png",
      description: "default description",
      original_price: 500000,
      selling_price: 300000,
    },
  ]);
  return (
    <div className="page home-page">
      <div className="main-banner">
        <img src="/assets/banner/home-banner.png" alt="" />
      </div>
      <div
        className="home-page-inner"
        //   style={{
        //     background: `url("/assets/images/noel-background.png") left top / 100% no-repeat fixed`,
        //   }}
      >
        {/* <div className="hot-sale">
          <HotSaleDisplay hotSaleProducts={hotSaleProducts} />
        </div> */}
        <div className="block-featured-product">
          <div className="product-list-title">
            <Link to="/" className="title-link">
              NEW ARRIVAL
            </Link>
          </div>
          <HorizontalScrollBar similarProducts={newArrivalProducts} />
        </div>
        <div className="block-featured-product">
          <div className="product-list-title">
            <Link to="/" className="title-link">
              BEST SELLER
            </Link>
          </div>
          <div className="wrapper-list-product">
            <div className="list-product">
              {tempProducts.map((product, index) => {
                return (
                  <div className="product-contaner">
                    <ProductContainer
                      key={index}
                      productGeneralInfo={product}
                      className="product-item"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="block-category">
          <div className="block-category-title">
            <Link to="/" className="title-link">
              ĐIỆN THOẠI
            </Link>
          </div>
          <BlockCategory />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
