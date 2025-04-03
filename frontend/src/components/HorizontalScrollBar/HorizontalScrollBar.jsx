import React, { useState, useRef, useEffect } from "react";
import "./HorizontalScrollBar.scss";
import ProductContainer from "../ProductContainer/ProductContainer";
const HorizontalScrollBar = ({ similarProducts }) => {
  const containerListProductRef = useRef(null);
  const productContainerRef = useRef(null);
  const [productContainerWidth, setProductContainerWidth] = useState(0);

  useEffect(() => {
    const updateSlideContentWidth = () => {
      if (containerListProductRef.current) {
        if (productContainerRef.current) {
          const productContainerWidth = productContainerRef.current.offsetWidth;
          setProductContainerWidth(productContainerWidth);
        }
      }
    };

    // Initial update
    updateSlideContentWidth();

    // Update on window resize
    window.addEventListener("resize", updateSlideContentWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateSlideContentWidth);
  }, []);

  const [startProductIndex, setStartProductIndex] = useState(0);
  const [translateXProduct, setTranslateXProduct] = useState(0);
  const [currentTranslateXProduct, setCurrentTranslateXProduct] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [startCursorPosition, setStartCursorPosition] = useState(0);
  useEffect(() => {
    const handleMouseDown = (event) => {
      event.preventDefault();
      setStartCursorPosition(event.clientX);
      setCurrentTranslateXProduct(translateXProduct);
      setDragDistance(0);
      setIsDragging(true);
    };

    const handleMouseMove = (event) => {
      event.preventDefault();
      if (isDragging) {
        const distance = event.clientX - startCursorPosition;
        setDragDistance(distance);
        setTranslateXProduct(currentTranslateXProduct + distance);
      }
    };

    const handleMouseUp = (event) => {
      event.preventDefault();
      if (isDragging) {
        setIsDragging(false);
        setDragDistance(0);

        const numberScrollProduct = Math.floor(
          dragDistance / (productContainerWidth + 10)
        );
        const maxTranslateX = 0;
        const minTranslateX = -(
          similarProducts.length * (productContainerWidth + 10) -
          containerListProductRef.current.offsetWidth
        );
        const adjustedTranslateX = Math.min(
          maxTranslateX,
          Math.max(
            minTranslateX,
            currentTranslateXProduct +
              numberScrollProduct * (productContainerWidth + 10)
          )
        );
        //   const index = Math.round(distance / (productContainerWidth + 10));
        setTranslateXProduct(adjustedTranslateX);
      }
    };

    const container = containerListProductRef.current;

    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseUp);
      }
    };
  }, [isDragging, startCursorPosition, dragDistance, startProductIndex]);

  const goToNextProduct = () => {
    const maxTranslateX = -(
      similarProducts.length * (productContainerWidth + 10) -
      containerListProductRef.current.offsetWidth
    );
    setTranslateXProduct((prev) =>
      Math.max(maxTranslateX, prev - productContainerWidth - 10)
    );
  };

  const goToPrevProduct = () => {
    setTranslateXProduct((prev) =>
      Math.min(0, prev + productContainerWidth + 10)
    );
  };
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
    <div className="horizontal-scroll-bar">
      <span className="prev-product" onClick={goToPrevProduct}>
        <svg
          fill="#000000"
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          id="left-circle-2"
          data-name="Flat Line"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-line"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <circle
              id="secondary"
              cx="12"
              cy="12"
              r="9"
              style={{ fill: "#2ca9bc", strokeWidth: 2 }}
            />
            <polyline
              id="primary"
              points="10.5 14.5 8 12 10.5 9.5"
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
              d="M16,12H8M3,12a9,9,0,1,0,9-9A9,9,0,0,0,3,12Z"
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
      </span>
      <span className="next-product" onClick={goToNextProduct}>
        <svg
          fill="#000000"
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          id="left-circle-2"
          data-name="Flat Line"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-line"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <circle
              id="secondary"
              cx="12"
              cy="12"
              r="9"
              style={{ fill: "#2ca9bc", strokeWidth: 2 }}
            />
            <polyline
              id="primary"
              points="10.5 14.5 8 12 10.5 9.5"
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
              d="M16,12H8M3,12a9,9,0,1,0,9-9A9,9,0,0,0,3,12Z"
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
      </span>
      <div
        className="horizontal-scroll"
        ref={containerListProductRef}
        style={{ transform: `translateX(${translateXProduct}px)` }}
      >
        {tempProducts.map((product, index) => {
          return (
            <div className="product-container" ref={productContainerRef}>
              <ProductContainer productGeneralInfo={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalScrollBar;
