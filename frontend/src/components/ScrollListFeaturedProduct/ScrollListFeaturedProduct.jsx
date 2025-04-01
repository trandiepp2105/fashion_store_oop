import React, { useState, useEffect, useRef } from "react";
import "./ScrollListFeaturedProduct.scss";
import ProductContainer from "../ProductContainer/ProductContainer";
const ScrollListFeaturedProduct = ({ listFeaturedProduct }) => {
  const containerListProductRef = useRef(null);
  const [productContainerWidth, setProductContainerWidth] = useState(225);
  const [wrapperScrollWidth, setWrapperScrollWidth] = useState(0);
  useEffect(() => {
    setWrapperScrollWidth(
      Math.ceil(listFeaturedProduct.length / 2) * 225 +
        Math.ceil(listFeaturedProduct.length / 2) * 10
    );
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
          Math.ceil(listFeaturedProduct.length / 2) *
            (productContainerWidth + 10) -
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
        console.log("up: ", adjustedTranslateX);
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
      listFeaturedProduct.length * (productContainerWidth + 10) -
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
  return (
    <div className="scrollable-bar">
      <span className="prev-product" onClick={goToPrevProduct}>
        <svg
          width="49"
          height="95"
          viewBox="0 0 49 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.5 47.5C48.5 73.7335 27.2335 95 1 95L1.00002 47.5L1 0C27.2335 0 48.5 21.2665 48.5 47.5Z"
            fill="#D9D9D9"
          />
          <path
            d="M26.0156 33.0469L11.5625 47.5L26.0156 61.9531"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span className="next-product" onClick={goToNextProduct}>
        <svg
          width="48"
          height="95"
          viewBox="0 0 48 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 47.5C0.5 73.7335 21.7665 95 48 95L48 47.5L48 0C21.7665 0 0.5 21.2665 0.5 47.5Z"
            fill="#D9D9D9"
          />
          <path
            d="M21.9844 33.0469L36.4375 47.5L21.9844 61.9531"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <div
        className="block-product-grid"
        ref={containerListProductRef}
        style={{
          width: `${wrapperScrollWidth}px`,
          transform: `translateX(${translateXProduct}px)`,
        }}
      >
        {listFeaturedProduct.map((product) => (
          <div className="product-container">
            <ProductContainer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollListFeaturedProduct;
