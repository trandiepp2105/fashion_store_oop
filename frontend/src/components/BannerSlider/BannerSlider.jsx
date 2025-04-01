import React, { useState, useEffect, useRef } from "react";
import styles from "./BannerSlider.module.scss";

const BannerSlider = ({ slides, autoPlayTime = 8000, module = "default" }) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideContentWidth, setSlideContentWidth] = useState(0);
  const slidingBannerRef = useRef(null);

  useEffect(() => {
    const updateSlideContentWidth = () => {
      if (slidingBannerRef.current) {
        const bannerWidth = slidingBannerRef.current.offsetWidth;
        setSlideContentWidth(bannerWidth * 0.2); // Set width to 25% of banner width
      }
    };

    // Initial update
    updateSlideContentWidth();

    // Update on window resize
    window.addEventListener("resize", updateSlideContentWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateSlideContentWidth);
  }, []);

  useEffect(() => {
    let timer;

    if (autoPlay) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, autoPlayTime);
    } else {
      timer = setTimeout(() => {
        setAutoPlay(true);
      }, autoPlayTime);
    }

    return () => {
      if (autoPlay) {
        clearInterval(timer);
      } else {
        clearTimeout(timer);
      }
    };
  }, [autoPlay, autoPlayTime, slides.length]);

  const goToNextSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <div className={styles.slidingBanner} ref={slidingBannerRef}>
      <div className={styles.blockBanner}>
        <div className={styles.galleryTop}>
          <div
            className={styles.slides}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === currentIndex ? styles.active : ""
                }`}
              >
                <img src={slide.image} alt={slide.caption} />
              </div>
            ))}
          </div>
          <button className={styles.prev} onClick={goToPreviousSlide}></button>
          <button className={styles.next} onClick={goToNextSlide}></button>
        </div>
        <div className={styles.galleryThumbs}>
          <div
            className={styles.slidesContent}
            style={{ transform: `translateX(${0}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.slideContent} ${
                  index === currentIndex ? styles.slideContentActive : ""
                }`}
                style={{ minWidth: `${slideContentWidth}px` }}
                onClick={() => goToSlide(index)}
              >
                <>
                  {slide.captionLine1} <br /> {slide.captionLine2}
                </>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
