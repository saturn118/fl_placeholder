import React from "react";
import HeadingComponent from "@components/utility/HeadingComponent";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { EntryWithOverlayComponent } from "./utility/EntryWithImageComponent";
import { DATA_SERVER_ADDRESS } from "config";
import { DATA_SERVER_IMAGE_ADDRESS } from "config";
export default function ElementSetSummaryComponent({
  title = "TITLE_PLACEHOLDER",
  description = "DESCRIPTION PLACEHOLDER TACO TACO DANNY BOY HELLO",
  flip = false,
  link = "/",
  tiles = [],
  overrideTiles = false
}) {
  const SIZE = 200;

  let leftSection = (
    <div className={"w-4/12  p-5 text-xl space-y-3"}>
      <p>{description}</p>
      <div>
        <Link href={link}>
          <a className="customAccentText link">See All</a>
        </Link>
      </div>
    </div>
  );

  let rightSection = (
    <div className="w-8/12 ">
      {!overrideTiles && (
        <div className="flex space-x-2 ">
          {tiles
            .filter(entry => {
              return entry != null;
            })
            .map(entry => {
              if (entry) {
                return (
                  <EntryWithOverlayComponent
                    width={SIZE}
                    height={SIZE}
                    imageUrl={""} //DATA_SERVER_IMAGE_ADDRESS + entry.img}
                    label1={entry.name}
                    label2={entry.subName}
                    targetLink={entry.link}
                  />
                );
              }
              return null;
            })
            .slice(0, 4)}
          {/* <Skeleton width={SIZE} height={SIZE} /> */}
        </div>
      )}
      {overrideTiles && tiles}
    </div>
  );

  if (flip) {
    let temp = rightSection;
    rightSection = leftSection;
    leftSection = temp;
  }

  let i = 0;
  return (
    <div className="my-10">
      <HeadingComponent showArrow={false} showBar={true} size={2}>
        {title}
      </HeadingComponent>
      <div className="flex space-x-10">
        {leftSection}
        {rightSection}
      </div>
    </div>
  );
}
