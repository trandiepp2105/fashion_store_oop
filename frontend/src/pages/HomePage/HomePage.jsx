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
// toast
import { toast } from "react-toastify";
const HomePage = ({
  listFeaturedProduct = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ],
}) => {
  const [bestSellerProducts, setBestSellerProducs] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  const fetchNewArrivalProducts = async () => {
    try {
      const response = await productService.getNewArrivalProducts();
      setNewArrivalProducts(response);
    } catch (error) {
      console.error("Error while fetching new arrival products", error);
      // toast.error("Error while fetching new arrival products");
    }
  };

  useEffect(() => {
    fetchNewArrivalProducts();
  }, []);

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
        {/* <div className="block-featured-product">
          <div className="product-list-title">
            <div className="title-link">NEW ARRIVAL</div>
            <p>Some description for this category</p>
          </div>
          <HorizontalScrollBar similarProducts={newArrivalProducts} />
        </div> */}
        <div className="block-featured-product">
          <div className="product-list-title">
            <Link to="/" className="title-link">
              NEW ARRIVAL
            </Link>
            <p>Some description for this category</p>
          </div>
          <div className="wrapper-list-product">
            <div className="list-product">
              {newArrivalProducts.map((product, index) => {
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
        {bestSellerProducts && bestSellerProducts.length > 0 && (
          <div className="block-featured-product">
            <div className="product-list-title">
              <Link to="/" className="title-link">
                BEST SELLER
              </Link>
            </div>
            <div className="wrapper-list-product">
              <div className="list-product">
                {bestSellerProducts.map((product, index) => {
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
        )}
      </div>
    </div>
  );
};

export default HomePage;
