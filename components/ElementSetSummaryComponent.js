import React from "react";
import HeadingComponent from "@components/utility/HeadingComponent";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import {
  EntryWithOverlayComponent,
  EntryWithCentralOverlayComponent,
  EntryItemVerticalComponent,
  EntryDiscussionComponent
} from "./utility/EntryWithImageComponent";
import { DATA_SERVER_ADDRESS } from "config";
import { DATA_SERVER_IMAGE_ADDRESS } from "config";

import SlideshowComponent from "./sections/SlideshowComponent";

export default function ElementSetSummaryComponent({
  title = "TITLE_PLACEHOLDER",
  mergedTitle = false,
  description = "DESCRIPTION PLACEHOLDER TACO TACO DANNY BOY HELLO",
  flip = false,
  scrolling = false,
  link = null,
  tiles = [],
  overrideTiles = false,
  elementOverride = "normal",
  imageAttributes = ""
}) {
  const SIZE = 200;

  function SelectElements(tiles) {
    return tiles
      .filter(entry => {
        return entry != null;
      })
      .map(entry => {
        if (entry) {
          if (elementOverride == "normal") {
            return (
              <EntryWithOverlayComponent
                width={SIZE}
                height={SIZE}
                imageUrl={entry.img}
                label1={entry.name}
                label2={entry.subName}
                targetLink={entry.link}
              />
            );
          }
          if (elementOverride == "central") {
            return (
              <EntryWithCentralOverlayComponent
                width={SIZE}
                height={SIZE}
                imageUrl={entry.img}
                label1={entry.name}
                label2={entry.subName}
                targetLink={entry.link}
              />
            );
          }
          if (elementOverride == "vertical") {
            return (
              <div className="w-full">
                <EntryItemVerticalComponent
                  imageUrl={entry.img}
                  labelList={[entry.name, entry.subName]}
                  targetLink={entry.link}
                />
              </div>
            );
          }
        }
        return null;
      });
  }

  return (
    <div class="summary_set_container">
      {!mergedTitle && (
        <HeadingComponent showArrow={false} showBar={true} size={2}>
          {title}
        </HeadingComponent>
      )}
      <div
        class={(flip ? "flexReverse" : "") + " summary_set_content_container"}
      >
        <div class="summary_set_container_description pr-5">
          {mergedTitle && (
            <HeadingComponent showArrow={false} showBar={true} size={2}>
              {title}
            </HeadingComponent>
          )}
          <HeadingComponent
            showArrow={false}
            useFont={false}
            showBar={false}
            size={4}
          >
            {description}
          </HeadingComponent>
          {link && (
            <Link href={link}>
              <a className="customAccentText link">See All</a>
            </Link>
          )}
        </div>
        <div class="summary_set_container_elements">
          {!overrideTiles && (
            <div className="hide_on_small flex  space-x-2 ">
              {SelectElements(tiles).slice(0, 4)}
            </div>
          )}
          {!overrideTiles && (
            <div className="hide_on_big full ">
              <SlideshowComponent
                discrete={false}
                perView={1.9}
                spaceBetween={2}
                showArrows={false}
                showProgress={false}
                loop={false}
                timeDelayMs={99999999}
                inputData={SelectElements(tiles, "w-full").slice(0, 4)}
                breakpointsInput={{
                  // when window width is >= 640px
                  10: {
                    slidesPerView: 1.9,
                    spaceBetween: 2
                  },
                  // when window width is >= 768px
                  600: {
                    slidesPerView: 2.5,
                    spaceBetween: 2
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3.5,
                    spaceBetween: 2
                  },
                  // when window width is >= 1024px
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 2
                  }
                }}
              />
            </div>
          )}
          {overrideTiles && <div className="w-full">{tiles}</div>}
        </div>
      </div>
    </div>
  );
  let rightSection = <div className="w-8/12 "></div>;

  return (
    <section className="my-20 w-full">
      <HeadingComponent showArrow={false} showBar={true} size={2}>
        {title}
      </HeadingComponent>
      <div className="flex w-full space-x-10">
        {leftSection}
        {rightSection}
      </div>
    </section>
  );
}

export function DiscussionSetSummaryComponent({
  title = "FORUM",
  inputData = [],
  urlPrefix = "",
  isRating = false
}) {
  function selectCorrectElement(inputData, attr) {
    return inputData.map(entry => {
      // let attr = "w-4/12 p-2";
      attr += " mt-2 mb-10";
      if (isRating) {
        let data = entry.reviewData;
        let username = entry.userData.username;

        return (
          <EntryDiscussionComponent
            className={attr}
            title="test"
            username={username}
            content={data.reviewText}
            rating={data.rating}
            timestamp={data.timestamp}
            upvotes={1}
            downvotes={1}
          />
        );
      } else {
        return (
          <EntryDiscussionComponent
            className={attr}
            title={entry.title}
            timestamp={entry.timestamp}
            username={entry.username}
            content={entry.content}
            link={"/topic/" + entry.id}
          />
        );
      }
    });
  }

  return (
    <div className="w-full">
      <Link href={urlPrefix + "chat"}>
        <a>
          <HeadingComponent showBar={true} showArrow={true} size={2}>
            {title}
          </HeadingComponent>
        </a>
      </Link>

      <div className="hide_on_big full ">
        <SlideshowComponent
          discrete={false}
          perView={1.1}
          showArrows={false}
          showProgress={false}
          loop={false}
          timeDelayMs={99999999}
          inputData={selectCorrectElement(inputData, "w-full")}
        />
      </div>

      <div className={"hide_on_small spaceEven w-full"}>
        {inputData.length == 0
          ? [0, 0, 0].map(entry => {
              return (
                <Skeleton
                  className="w-4/12"
                  variant="rectangular"
                  height={220}
                />
              );
            })
          : selectCorrectElement(inputData, "w-4/12 p-2")}
      </div>
    </div>
  );
}

export function CommunityListSetSummaryComponent({
  title = "COMMUNITY LISTS",
  inputData = [],
  urlPrefix = ""
}) {
  return (
    <div className="w-full">
      <Link href={urlPrefix + "chat"}>
        <a>
          <HeadingComponent showBar={true} showArrow={true} size={2}>
            {title}
          </HeadingComponent>
        </a>
      </Link>

      <div className={"flex space-x-2"}>
        {inputData.length == 0
          ? [0, 0, 0].map(entry => {
              return (
                <Skeleton
                  className="w-4/12"
                  variant="rectangular"
                  height={220}
                />
              );
            })
          : inputData.map(entry => {
              return (
                <EntryDiscussionComponent
                  title={entry.title}
                  timestamp={entry.timestamp}
                  username={entry.username}
                  content={entry.content}
                  link={"/topic/" + entry.id}
                />
              );
            })}
      </div>
    </div>
  );
}
