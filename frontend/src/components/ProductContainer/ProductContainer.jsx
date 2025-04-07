import React from "react";
import { useState, useEffect } from "react";
import styles from "./ProductContainer.module.scss";
import formatCurrencyVN from "../../utils/formatCurrencyVN";
import generateSlug from "../../utils/generateSlug";
import { Link, useNavigate } from "react-router-dom";
const HOST = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

const ProductContainer = ({ className, productGeneralInfo }) => {
  const navigate = useNavigate();

  // const slug = generateSlug(productGeneralInfo.name, productGeneralInfo.id);
  const printProduct = (slug) => {
    console.log(slug);
  };
  const goToProductDetail = () => {
    if (
      !productGeneralInfo ||
      !productGeneralInfo.name ||
      !productGeneralInfo.id
    ) {
      console.error("productGeneralInfo is missing required fields.");
      return;
    }

    const slug = generateSlug(productGeneralInfo.name, productGeneralInfo.id);
    const endpoint = `/productdetail/${slug}`;
    printProduct(endpoint);
    navigate(endpoint);
  };
  const [wishListState, setWishListState] = useState(false);
  const handleClickWishList = () => {
    setWishListState(!wishListState);
  };

  return (
    <Link
      className={`${styles.productContainer} ${className}`}
      to={`/productdetail/${productGeneralInfo.id}`}
    >
      <div className={styles.productInfor}>
        <div className={styles.productLink}>
          <div className={styles.productImage}>
            <img
              src={`${HOST}${productGeneralInfo.image_url}`}
              alt={productGeneralInfo.name}
              class={styles.productImg}
            />
          </div>
          <div className={styles.productName}>
            <h3>{productGeneralInfo.name}</h3>
          </div>
          <div className={styles.boxPrice}>
            <div className={styles.priceShow}>
              {formatCurrencyVN(productGeneralInfo.selling_price)}
            </div>
            <div className={styles.priceThrough}>
              {formatCurrencyVN(productGeneralInfo.original_price)}
            </div>
            <div className={styles.pricePercent}>
              <p class={styles.pricePercentDetail}>Giảm&nbsp;66%</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productRating}>
        <div className={styles.boxRating}>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div className={styles.wapperIconStar}>
                <img
                  src="/assets/images/rating-star.svg"
                  alt=""
                  className={styles.iconStar}
                />
              </div>
            ))}
        </div>
        <div className={styles.boxWishList}>
          <span className={styles.wishListText}>Yêu thích &nbsp;</span>
          <div className={styles.wishListBtn} onClick={handleClickWishList}>
            {wishListState ? (
              <svg
                viewBox="20 18 29 28"
                aria-hidden="true"
                focusable="false"
                className={styles.iconHeart}
              >
                <path d="M28.3 21.1a4.3 4.3 0 0 1 4.1 2.6 2.5 2.5 0 0 0 2.3 1.7c1 0 1.7-.6 2.2-1.7a3.7 3.7 0 0 1 3.7-2.6c2.7 0 5.2 2.7 5.3 5.8.2 4-5.4 11.2-9.3 15a2.8 2.8 0 0 1-2 1 3.4 3.4 0 0 1-2.2-1c-9.6-10-9.4-13.2-9.3-15 0-1 .6-5.8 5.2-5.8m0-3c-5.3 0-7.9 4.3-8.2 8.5-.2 3.2.4 7.2 10.2 17.4a6.3 6.3 0 0 0 4.3 1.9 5.7 5.7 0 0 0 4.1-1.9c1.1-1 10.6-10.7 10.3-17.3-.2-4.6-4-8.6-8.4-8.6a7.6 7.6 0 0 0-6 2.7 8.1 8.1 0 0 0-6.2-2.7z"></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 19.2 18.5"
                aria-hidden="true"
                focusable="false"
                className={`${styles.iconHeart} ${styles.iconHeartActive}`}
              >
                <path d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z"></path>
              </svg>
            )}
          </div>
        </div>
      </div>
      {/* <div className={styles.installZeroPercentTag}>Trả góp 0%</div> */}
    </Link>
  );
};

export default ProductContainer;
