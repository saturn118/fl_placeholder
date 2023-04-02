import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  DATA_SERVER_IMAGE_ADDRESS,
  GetRecentlyViewed,
  BACKGROUND_ATTR
} from "../config";
import HeadingComponent from "./utility/HeadingComponent";
import { Avatar, Button } from "@mui/material";
import EntryWithItemComponent, {
  EntryWithCentralOverlayComponent
} from "./utility/EntryWithImageComponent";
import { FuzzySearch } from "./utility/FuzzySearch";

export function RecentlyViewedInjectorClearData() {
  localStorage.setItem("recent", "{}");
}

export function RecentlyViewedInjectorClearEntry(key) {
  let data = JSON.parse(localStorage.recent ? localStorage.recent : "{}");
  delete data[key];
  localStorage.setItem("recent", JSON.stringify(data));
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

const RecentlyViewedComponent = ({
  displayFilter = null,
  fuzzyRefine = false,
  fuzzyTerm = null
}) => {
  let CARD_HEIGHT = 250;
  let CARD_WIDTH = CARD_HEIGHT * 0.7;
  const router = useRouter();
  const [itemsToRender, setItemsToRender] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  const [fuzzySearchData, setFuzzySearchData] = React.useState({});

  const MAX_ELEMENTS = 7;

  useEffect(() => {
    //Retrieve the current list of recently viewed items

    setItemsToRender(GetRecentlyViewed());
  }, []);

  useEffect(() => {
    if (fuzzyRefine && fuzzyTerm) {
      let fuzzySearchData = [];
      Object.keys(itemsToRender).forEach(function(key) {
        let currentData = itemsToRender[key];

        fuzzySearchData.push({
          title: currentData.name,
          entry: currentData
        });
      });

      let results = FuzzySearch(fuzzyTerm, fuzzySearchData, ["title"], 0);
      console.log("Fuzzy Results");
      console.log(results);

      let fuzzyFilterResults = {};
      if (results) {
        results.map(entry => {
          fuzzyFilterResults[entry.item.title] = null;
        });
      }
      setFuzzySearchData(fuzzyFilterResults);
    }
  }, [fuzzyTerm]);

  let outputArray = [];
  let outputCount = 0;
  Object.keys(itemsToRender).forEach(function(key) {
    let currentData = itemsToRender[key];

    if (displayFilter && key.includes(displayFilter) == false) return;

    if (
      fuzzyRefine &&
      fuzzyTerm &&
      fuzzyTerm != "" &&
      currentData.name in fuzzySearchData == false
    )
      return;

    outputArray.push(
      <div className={"flex p-1 " + BACKGROUND_ATTR}>
        <Link href={key}>
          <a className="flex w-11/12">
            <Avatar
              variant="rounded"
              src={DATA_SERVER_IMAGE_ADDRESS + currentData.image}
            />
            <div className="w-full py-1 pl-3">
              <p className="customAccentText link">{currentData.name}</p>
            </div>
          </a>
        </Link>
        <Button>
          <CloseIcon
            onClick={() => {
              RecentlyViewedInjectorClearEntry(key);

              let data = itemsToRender;
              delete data[key];
              setItemsToRender(data);
              setRefresh(!refresh);
            }}
          />
        </Button>
      </div>
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
    outputArray = (
      <h4>
        No recently viewed{" "}
        <span className="customAccentText">
          {displayFilter ? displayFilter + "s" : null}
        </span>{" "}
        pages
      </h4>
    );
  }

  return (
    <div className="w-full">
      <div className="pt-5">
        <div className="">
          <div className="flex">
            <li className="recentlyViewedTitle">
              <HeadingComponent size={5} showBar={true}>
                RECENTLY VIEWED{" "}
              </HeadingComponent>
            </li>
            {/* <li className="recentlyViewedClear flex">
              <button
                className="btn customAccentBackground text-white logoFont"
                onClick={() => {
                  RecentlyViewedInjectorClearData();
                  setItemsToRender({});
                }}
              >
                Clear
              </button>
            </li> */}
          </div>
          <div className="">{outputArray}</div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedComponent;
