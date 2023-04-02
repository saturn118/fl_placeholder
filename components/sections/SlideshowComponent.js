import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Grid, Pagination, Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";

export const SlideshowComponent = ({
  inputData = [],
  timeDelayMs = 5000,
  discrete = true,
  perView = 4,
  loop = false,
  showProgress = true,
  showArrows = true,
  spaceBetween = 50,
  breakpointsInput = null,

  direction = "horizontal"
}) => {
  let showProg = showProgress
    ? {
        clickable: true
      }
    : {
        clickable: true,
        el: null
      };

  const breakpoints = breakpointsInput
    ? breakpointsInput
    : {
        // when window width is >= 640px
        10: {
          slidesPerView: 1.1,
          spaceBetween: 20
        },
        // when window width is >= 768px
        600: {
          slidesPerView: 1.1,
          spaceBetween: 30
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3.5,
          spaceBetween: 30
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      };

  return (
    <Swiper
      breakpoints={breakpoints}
      centeredSlides={false}
      showsPagination={showProgress}
      direction={direction}
      spaceBetween={spaceBetween}
      slidesPerView={perView}
      loop={loop}
      freeMode={!discrete}
      pagination={showProg}
      navigation={showArrows}
      autoplay={{
        delay: timeDelayMs == 0 ? 999999999 : timeDelayMs,
        disableOnInteraction: false
      }}
      modules={[Navigation, Autoplay, Grid, Pagination]}
      className="mySwiper w-full"
    >
      {inputData.map(entry => {
        return <SwiperSlide className="h-[100px]">{entry}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default SlideshowComponent;
