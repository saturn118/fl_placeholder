import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  DATA_SERVER_IMAGE_ADDRESS,
  GetRecentlyViewed,
  LOCAL_SERVER_ADDRESS
} from "../config";
import HeadingComponent from "./utility/HeadingComponent";
import { Avatar } from "@mui/material";

export function RecentlyViewedInjectorClearData() {
  localStorage.setItem("recent", "{}");
}

//Alert the recently viewed section that you've visited a page worth tracking
export function RecentlyViewedInjector(
  nameValue,
  imageUrl,
  optionalUrlId = null
) {
  let data = JSON.parse(localStorage.recent ? localStorage.recent : "{}");

  let subData = { image: imageUrl, name: nameValue };

  data[optionalUrlId] = subData;
  localStorage.setItem("recent", JSON.stringify(data));
}

const RecentlyViewedComponent = () => {
  let CARD_HEIGHT = 250;
  let CARD_WIDTH = CARD_HEIGHT * 0.7;
  const router = useRouter();
  const [itemsToRender, setItemsToRender] = React.useState({});
  const MAX_ELEMENTS = 10;

  useEffect(() => {
    //Retrieve the current list of recently viewed items

    setItemsToRender(GetRecentlyViewed());
  }, []);

  let outputArray = [];
  let outputCount = 0;
  Object.keys(itemsToRender).forEach(function(key) {
    let currentData = itemsToRender[key];

    outputArray.push(
      <SwiperSlide className="customShadow">
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
            // rotate: 5
          }}
          whileTap={{ scale: 0.9 }}
        >
          <div>
            <Link href={LOCAL_SERVER_ADDRESS + key}>
              <Avatar
                variant="rounded"
                src={DATA_SERVER_IMAGE_ADDRESS + currentData.image}
                sx={{ width: 200, height: 200 }}
              />

              {/* <img src={DATA_SERVER_IMAGE_ADDRESS + currentData.image} /> */}
            </Link>
            <p className="recentlyviewedname">{currentData.name}</p>
          </div>
        </motion.button>
      </SwiperSlide>
    );
    outputCount += 1;
  });

  let elementCount = outputArray.length;
  if (elementCount > 0) {
    outputArray.reverse();

    let entries = 0;
    let newArray = outputArray.map(element => {
      entries += 1;
      if (entries <= MAX_ELEMENTS) return element;
    });
    outputArray = newArray;
  } else {
    outputArray = <h4>You have no recently viewed pages</h4>;
  }

  return (
    <div className="bg-gray-900 ">
      <div className="pt-5">
        <div className="container">
          <div className="flex">
            <li className="recentlyViewedTitle">
              <HeadingComponent textColor="text-white" size={3} showBar={true}>
                RECENTLY VIEWED{" "}
              </HeadingComponent>
            </li>
            <li className="recentlyViewedClear flex">
              <button
                className="btn customAccentBackground text-white logoFont"
                onClick={() => {
                  RecentlyViewedInjectorClearData();
                  setItemsToRender({});
                }}
              >
                Clear
              </button>
            </li>
          </div>
          <div className="pt-5">
            <Swiper
              // modules={[Navigation]}
              // navigation
              // modules={[Zoom, Navigation]}

              spaceBetween={15}
              slidesPerView={MAX_ELEMENTS - 2}
            >
              {outputArray}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedComponent;
