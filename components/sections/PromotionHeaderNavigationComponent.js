import { Avatar, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import CountryPresenceWidgetComponent from "../CountryPresenceComponent";
import FlagComponent from "../FlagComponent";
import FollowComponent from "../FollowComponent";
import { PlaylistWidgetComponent } from "../PlaylistPopupComponent";
import PopularityComponent from "../PopularityComponent";
import HeadingComponent from "../utility/HeadingComponent";
import { HeadingPairCustomComponent } from "../utility/HeadingPairComponent";
import SummaryStatComponent, {
  SummaryStatCustomComponent
} from "../utility/SummaryStatComponent";
import BodyHeaderSectionComponent from "./BodyHeaderSectionComponent";

export const PromotionHeaderNavigationComponent = ({
  promotionData,
  pageId = "summary",
  subTitle = null,
  children
}) => {
  let tagCombinedString = "";
  let i = 0;
  let tagElements = promotionData.tags
    ? promotionData.tags.map(tag => {
        i += 1;
        tagCombinedString += tag.name + "  ";

        return (
          <p className="p-2 customAccentBackground text-white">{tag.name}</p>
          // <Chip
          //   className="m-1"
          //   key={i}
          //   color="primary"
          //   variant="filled"
          //   label={tag.name}
          // />
        );
        // return <h3 key={i}></h3>;
      })
    : [];

  let firstYear = new Date(
    Date.parse(promotionData.firstEventDate)
  ).getFullYear();
  let lastYear = new Date(
    Date.parse(promotionData.latestEventDate)
  ).getFullYear();
  ////
  let statMap = {
    establised: {
      label: "Years Active",
      value: firstYear + "-" + lastYear,
      img: null
    },
    head: {
      label: "Primary Location",
      value: FlagComponent(
        promotionData.countries ? promotionData.countries.list[0].code : null,
        70
      ), // promotionData.town,
      custom: true
    },
    bouts: {
      label: "Bouts",
      value: promotionData.totalBouts,
      custom: false
    },
    // fighters: {
    //   label: "Total Roster",
    //   value: promotionData.totalRosterCount,
    //   custom: false
    // },
    fightersActive: {
      label: "Active Roster",
      value: promotionData.activeRosterEstimate,
      custom: false
    },
    events: {
      label: "Events",
      value: promotionData.totalEvents,
      custom: false
    },

    flag: {
      label: "Country Presence",
      value: (
        <CountryPresenceWidgetComponent countryData={promotionData.countries} />
      ),
      custom: true
    }
    // divisions: {
    //   label: "Socials",
    //   value: (
    //     <div className="justify-center">
    //       <SocialMediaLinksComponent attributes="space-x-1" />
    //     </div>
    //   ),
    //   custom: true
    // }
  };
  let statElements = [];
  for (const [label, d] of Object.entries(statMap)) {
    if (d.custom) {
      statElements.push(
        <div className="w-6/12">
          <SummaryStatCustomComponent label={d.label}>
            {d.value}
          </SummaryStatCustomComponent>
        </div>
      );
    } else {
      statElements.push(
        <div className="w-6/12">
          <SummaryStatComponent label={d.label} mainLabel={"" + d.value} />
        </div>
      );
    }

    // <div className="flex w-11/12 m-1 bg-gray-50 rounded p-2 customShadow">
    //   <div className="w-4/12 font-bold">{d.label}</div>
    //   <div className="w-8/12">{d.value}</div>
    // </div>
  }

  let navData = [
    // ["summary", ""],
    ["Events", "/events/1", "View Events"],
    ["Divisions", "/division", "View Divisions"],
    ["Fights", "/bout", "Search Fights"],
    ["Rankings", "/ranking", "Fighter Rankings"],
    ["Records", "/record", "Statistics and Records"],
    ["Best Fights", "/favourite", "Highest Rated Fights"],
    ["decisions", "/decision", "Most Controversial Decisions"],
    ["Champions", "/champions", "Champions Past and Present"],
    ["Media", "/media", "Images "]
  ];
  if (pageId == "summary") {
    navData = [];
  }
  let nav2elements = navData.map(entry => {
    let currentHighlight = "";

    let buttonLabel = entry[0];
    let buttonLinkId = entry[1];
    let tooltipContent = entry[2];

    if (
      buttonLinkId == "/" + pageId ||
      (pageId == "summary" && buttonLinkId == "")
    ) {
      currentHighlight = "customAccentBackground";
    }

    return (
      <div className="w-1/12 ">
        <Tooltip title={tooltipContent} enterDelay={500} leaveDelay={200}>
          <Link href={"/promotion/" + promotionData.id + buttonLinkId}>
            <a>
              <button className={"btn w-full  " + currentHighlight}>
                {buttonLabel}
              </button>
            </a>
          </Link>
        </Tooltip>
      </div>
    );
  });

  if (pageId != "summary") {
    return (
      <BodyHeaderSectionComponent>
        <Link href={"/promotion/" + promotionData.id}>
          <a>
            <div className="flex">
              <div className="w-1/12 mr-4">
                <Avatar
                  variant="rounded"
                  className="customShadow rounded-xl"
                  src={DATA_SERVER_IMAGE_ADDRESS + promotionData.imageUrl}
                  sx={{ width: 100, height: 100 }}
                ></Avatar>
              </div>
              {/* <HeadingPairComponent
            label1={subTitle.toUpperCase()}
            label2={promotionData.name.toUpperCase()}
            targetLink={"/promotion/" + promotionData.id}
          ></HeadingPairComponent> */}

              <div className="">
                <HeadingComponent size={2} textColor={"text-white"}>
                  {subTitle.toUpperCase()}
                </HeadingComponent>
                <HeadingComponent size={3} textColor={"customAccentText"}>
                  {promotionData.name.toUpperCase()}
                </HeadingComponent>
              </div>
            </div>
          </a>
        </Link>

        <div className="mt-5 flexwrap space-x-8 justify-center">
          {/* {navigationButtonElements} */}
          {/* {nav2elements} */}
        </div>
      </BodyHeaderSectionComponent>
    );
  }

  return (
    <BodyHeaderSectionComponent>
      <div className=" flex">
        <div className="w-7/12">
          {/* <HeadingComponent size={3} showBar={true} textColor={"text-white"}>
        {promotionData.name.toUpperCase()}
      </HeadingComponent>
      <div>{tagElements}</div> */}

          <HeadingPairCustomComponent label1={promotionData.name.toUpperCase()}>
            <div className="flex space-x-2 ">{tagElements}</div>
          </HeadingPairCustomComponent>
        </div>

        <div className="flex w-5/12 justify-end  space-x-6">
          {/* <Link href={promotionData.id + "/bout"}>
            <button className="btn btn-primary">
              <div>Fight Search</div> <SearchIcon />
            </button>
          </Link> */}
          <FollowComponent
            followType="promo"
            followId={promotionData.id}
            isFollowingInitial={false}
          />

          <PlaylistWidgetComponent
            entityId={promotionData.id}
            entityType="promotion"
          />

          <PopularityComponent
            rankData={promotionData.rankData}
            entityType="promotion"
            entityId={promotionData.id}
          />
        </div>
      </div>

      <div className="flex pt-5">
        <div className="w-3/12">
          {/* Poster */}

          <Avatar
            variant="rounded"
            className="customShadow rounded-xl PageHeaderMainImage"
            src={DATA_SERVER_IMAGE_ADDRESS + promotionData.imageUrl}
          ></Avatar>
        </div>
        <div className="flexwrap w-5/12 pt-4 pb-4">
          {/* Middle Section */}

          {statElements}
        </div>

        <div className="w-4/12 bg-red-500">
          ADVERT HERE
          {/* Avert here */}
        </div>
      </div>
      <div className="mt-10 flexwrap space-x-3  justify-center">
        {nav2elements}
      </div>
    </BodyHeaderSectionComponent>
  );
};

export default PromotionHeaderNavigationComponent;
