import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import HeadingPairComponent from "../utility/HeadingPairComponent";
import BodyHeaderSectionComponent from "./BodyHeaderSectionComponent";





export const DivisionHeaderNavigationComponent = ({
  promotionData,
  divisionData,
  pageId = "summary",
  subTitle = null,
  children
}) => {
  let navData = [
    ["summary", "", false],
    ["Fight Search", "/bout", true],
    ["Lineage", "/champions", false],
    ["Rankings", "/ranking", true],
    ["Records", "/record", true],
    ["Best Fights", "/favourite", false],
    ["Close Decisions", "/decision", false]
  ];
  let nav2elements = navData.map(entry => {
    let currentHighlight = "";

    let buttonLabel = entry[0];
    let buttonLinkId = entry[1];
    let usePromoPage = entry[2];

    if (
      buttonLinkId == "/" + pageId ||
      (pageId == "summary" && buttonLinkId == "")
    ) {
      currentHighlight = "customAccentBackground";
    }

    let prefix = "/division/" + divisionData.id;
    let postfix = "";
    if (usePromoPage) {
      prefix = "/promotion/" + promotionData.id;
      postfix = "?division=" + divisionData.id;
    }

    return (
      <div className="w-32">
        <Link href={prefix + buttonLinkId + postfix}>
          <a>
            {/* <Avatar
              variant="rounded"
              sx={{ height: 100 }}
              className="w-full"
              src="/audience.png"
            /> */}

            <button className={"btn w-full  " + currentHighlight}>
              {buttonLabel}
            </button>
          </a>
        </Link>
      </div>
    );
  });

  return (
    <BodyHeaderSectionComponent>
      {subTitle && (
        <div className="flex">
          <div className="w-1/12 mr-4">
            <Avatar
              variant="rounded"
              className="customShadow rounded-xl"
              src={DATA_SERVER_IMAGE_ADDRESS + promotionData.imageUrl}
              sx={{ width: 100, height: 100 }}
            ></Avatar>
          </div>
          <HeadingPairComponent
            label1={subTitle.toUpperCase()}
            label2={
              divisionData.name.toUpperCase() +
              " " +
              divisionData.weightValue +
              " LBS"
            }
            targetLink={"/promotion/" + promotionData.id}
          ></HeadingPairComponent>
        </div>
      )}

      <div className="mt-10 flexwrap space-x-3">
        {/* {navigationButtonElements} */}
        {nav2elements}
      </div>
      {children}
    </BodyHeaderSectionComponent>
  );
};

export default DivisionHeaderNavigationComponent;
