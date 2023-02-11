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

  direction = "horizontal"
}) => {
  return (
    <Swiper
      showsPagination={false}
      direction={direction}
      slidesPerView={perView}
      loop={loop}
      freeMode={!discrete}
      // grid={{
      //   rows: 2
      // }}
      pagination={{
        clickable: true
      }}
      navigation={false}
      autoplay={{
        delay: timeDelayMs,
        disableOnInteraction: false
      }}
      modules={[Navigation, Autoplay, Grid, Pagination]}
      className="mySwiper"
    >
      {inputData.map(entry => {
        return <SwiperSlide>{entry}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default SlideshowComponent;