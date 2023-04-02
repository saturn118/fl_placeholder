import { Avatar, Chip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import { ConvertDateObjToSimple } from "../../helpers/api";
import { PlaylistWidgetComponent } from "../PlaylistPopupComponent";
import SpoilerButtonComponent from "@components/SpoilerButtonComponent";
import PopularityComponent from "../PopularityComponent";
import { UserRatingComponent } from "../UserRatingPopupComponent";
import UserStarRatingBreakdownComponent from "../UserStarRatingBreakdownComponent";
import { HeadingPairCustomComponent } from "../utility/HeadingPairComponent";
import SocialMediaLinksComponent from "../utility/SocialMediaLinksComponent";
import BodyHeaderSectionComponent from "./BodyHeaderSectionComponent";
import HeadingComponent from "@components/utility/HeadingComponent";
import AdvertComponent from "@components/AdvertComponent";

export const EventHeaderNavigationComponent = ({
  eventData,
  promoData,
  voteData,
  handSpoilerChanged = null,
  hideSpoilers = false,
  pageId = "summary",
  children
}) => {
  let statMap = {
    date: {
      label: "Date",
      value: ConvertDateObjToSimple(eventData.dateOfEvent),
      img: null
    },
    promotor: {
      label: "Organization",
      value: (
        <Link href={"/promotion/" + promoData.id}>
          <a className="link customAccentText">{promoData.name}</a>
        </Link>
      )
    },

    venue: {
      label: "Venue",
      value: (
        <Link href={"/venue/" + eventData.venueId}>
          <a className="link customAccentText">
            VENUE_TEST {eventData.venueName}
          </a>
        </Link>
      ),

      img: null
    },
    location: { label: "Location", value: eventData.location, img: null },
    bouts: {
      label: "Bouts",
      value: eventData.bouts ? eventData.bouts.length : 0,
      img: null
    },
    competitors: {
      label: "Competitors",
      value: eventData.opponentCount ? eventData.opponentCount : 0,
      img: null
    },
    socials: {
      label: "Socials",
      value: <SocialMediaLinksComponent />,
      img: null
    }
  };
  let statElements = [];
  for (const [label, d] of Object.entries(statMap)) {
    statElements.push(
      <div className="flex w-full m-1 bg-gray-50 rounded p-2 customShadow ">
        <div className="pl-3 w-5/12 font-bold">{d.label}</div>
        <div className="w-7/12">{d.value}</div>
      </div>
    );
  }

  let tagMetaString = "";
  let tagElements = eventData.eventTags
    ? eventData.eventTags.map(tagName => {
        tagMetaString += " " + tagName;

        return (
          <Chip
            label={tagName}
            color="info"
            variant="outlined"
            className="text-white"
          />
        );
      })
    : [];

  let userHeaderButtonListElements = [
    <div>
      <PlaylistWidgetComponent entityId={eventData.id} entityType="event" />
    </div>,

    SpoilerButtonComponent(handSpoilerChanged, hideSpoilers),
    <div className="text-white">
      <HeadingComponent textColor={"text-center text-gray-300 "} size={6}>
        RATING
      </HeadingComponent>
      <UserStarRatingBreakdownComponent
        entityType="event"
        boutId={eventData.id}
        voteData={voteData ? voteData.eventvotes : null}
        label={eventData.name}
      />
    </div>,
    <div className="text-white">
      <HeadingComponent textColor={"text-center text-gray-300 "} size={6}>
        MY RATING
      </HeadingComponent>
      <UserRatingComponent
        label={eventData.name}
        entityId={eventData.id}
        entityType="event"
      />{" "}
    </div>,
    <div className="text-white">
      <PopularityComponent
        rankData={eventData.rankData}
        entityType="event"
        entityId={eventData.id}
      />{" "}
    </div>
  ];

  return (
    <BodyHeaderSectionComponent>
      <div className="hide_on_big space-y-2 ">
        <div className="centerdat space-y-2">
          <HeadingComponent size={4} textColor="text-white">
            {eventData.name.toUpperCase()}
          </HeadingComponent>
          <div className="flex space-x-2 ">{tagElements}</div>
          <div className="w-5/12">
            <Avatar
              className="imgR customShadow rounded-xl"
              src={DATA_SERVER_IMAGE_ADDRESS + eventData.imageUrl}
            ></Avatar>
          </div>
        </div>
        <div className="spaceEven">{userHeaderButtonListElements}</div>

        <div>{statElements}</div>
      </div>

      <div className="hide_on_small">
        {/* start of toolbar */}
        <div className="flex items-start mb-4">
          <div className="w-6/12">
            <HeadingPairCustomComponent label1={eventData.name.toUpperCase()}>
              <div className="flex space-x-2 ">{tagElements}</div>
            </HeadingPairCustomComponent>
          </div>

          <div className="flex w-6/12 justify-end space-x-8 ">
            {userHeaderButtonListElements}
          </div>
        </div>
        {/* End of toolbar */}
        <div className="flex  mb-10">
          <div className="w-3/12">
            <Avatar
              className="customShadow rounded-xl PageHeaderMainImage"
              src={DATA_SERVER_IMAGE_ADDRESS + eventData.imageUrl}
            ></Avatar>
          </div>
          <div className="w-5/12">{statElements}</div>
          <div className="w-4/12 bg-yellow-100">
            <div className="">
              {/* Avert here */}
              <AdvertComponent />
            </div>
          </div>
        </div>
        {/* <div className="space-x-5 pl-5 mb-10">
        <Link href={"/event/" + eventData.id}>
          <a>
            <button
              className={
                "w-2/12 btn " +
                (pageId == "summary" ? "customAccentBackground" : "")
              }
            >
              Summary
            </button>
          </a>
        </Link>
        <Link href={"/event/" + eventData.id + "/entrants"}>
          <a>
            <button
              className={
                "w-2/12 btn " +
                (pageId == "entrants" ? "customAccentBackground" : "")
              }
            >
              Entrants
            </button>
          </a>
        </Link>
        <Link href={"/event/" + eventData.id + "/review"}>
          <a>
            <button
              className={
                "w-2/12 btn " +
                (pageId == "reviews" ? "customAccentBackground" : "")
              }
            >
              Community Reviews
            </button>
          </a>
        </Link>
        <Link href={"/event/" + eventData.id + "/brackets"}>
          <a>
            <button
              className={
                "w-2/12 btn " +
                (pageId == "brackets" ? "customAccentBackground" : "")
              }
            >
              Bouts
            </button>
          </a>
        </Link>
        <Link href={"/event/" + eventData.id + "/media"}>
          <a>
            <button
              className={
                "w-2/12 btn " +
                (pageId == "media" ? "customAccentBackground" : "")
              }
            >
              Media
            </button>
          </a>
        </Link>
      </div> */}

        {children}
      </div>
    </BodyHeaderSectionComponent>
  );
};

export default EventHeaderNavigationComponent;
