import { React, useRef, useState, useEffect } from "react";
import style from "./BoxGallery.module.scss";
import { Link } from "react-router-dom";

const BoxGallery = ({ slides, currentIndex, setCurrentIndex }) => {
  const [slideWidth, setSlideWidth] = useState(0);
  const [thumbItemWidth, setThumbItemWidth] = useState(0);
  const [translateXSlide, setTranslateXSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const containerSlidingRef = useRef(null);
  const slidingRef = useRef(null);

  useEffect(() => {
    const updateSlideContentWidth = () => {
      if (containerSlidingRef.current) {
        const slideWidth = containerSlidingRef.current.offsetWidth;
        setSlideWidth(slideWidth);
        setThumbItemWidth((slideWidth - 100) * (1 / 11));
      }
    };

    updateSlideContentWidth();
    window.addEventListener("resize", updateSlideContentWidth);

    return () => window.removeEventListener("resize", updateSlideContentWidth);
  }, []);

  useEffect(() => {
    let animationFrame;

    const handleMouseDown = (event) => {
      event.preventDefault();
      const { clientX } = event;
      setInitialPosition({ x: clientX });
      setDragDistance(0);
      setIsDragging(true);
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        const { clientX } = event;
        const distance = clientX - initialPosition.x;

        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          setTranslateXSlide((prevTranslate) => prevTranslate + distance);
        });

        setInitialPosition({ x: clientX });
        setDragDistance(distance);
      }
    };

    const handleMouseUp = () => {
      if (-dragDistance > slideWidth / 2) {
        goToNextSlide();
      } else if (dragDistance > slideWidth / 2) {
        goToPrevSlide();
      } else {
        setTranslateXSlide(-(currentIndex * (slideWidth + 20)));
      }

      setIsDragging(false);
      setDragDistance(0);
    };

    const container = containerSlidingRef.current;

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
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isDragging, initialPosition, dragDistance, currentIndex, slideWidth]);

  useEffect(() => {
    setTranslateXSlide(-(currentIndex * slideWidth + currentIndex * 20));
  }, [currentIndex, slideWidth]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, slides.length - 1));
    setTranslateXSlide(-(currentIndex + 1) * (slideWidth + 20));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setTranslateXSlide(-(currentIndex - 1) * (slideWidth + 20));
  };

  return (
    <div className={style.boxGallery}>
      <div className={style.container} ref={containerSlidingRef}>
        <div className={style.galleryTop}>
          {currentIndex > 0 && (
            <span className={style.prevGallery} onClick={goToPrevSlide}>
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
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
          {currentIndex < slides.length - 1 && (
            <span className={style.nextGallery} onClick={goToNextSlide}>
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
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
          <div
            className={style.wrapperSliding}
            style={{
              transform: `translateX(${translateXSlide}px)`,
              // transition: "transform 0.3s ease-in-out",
            }}
          >
            {slides.map((slide, index) => (
              <div
                className={style.slide}
                style={{ width: `${slideWidth}px` }}
                key={index}
              >
                <Link className={style.imageLink}>
                  <img
                    src={slide.url}
                    alt=""
                    className={style.slideImg}
                    ref={slidingRef}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={style.galleryBottom}>
          <div className={style.wrapperSlidingThumbs}>
            {slides.map((slide, index) => (
              <div
                className={`${style.thumbItem} ${
                  currentIndex === index ? style.thumbItemActive : ""
                }`}
                // style={{ width: `${thumbItemWidth}px !important` }}
                key={index}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={slide.url} alt="" className={style.thumbItemImg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxGallery;
