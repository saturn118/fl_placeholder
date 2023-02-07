import { Avatar, Tab, Tabs } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import HeadingComponent from "./HeadingComponent";

export default function HighlightGroupComponent({
  title,
  defaultSelected = "all",
  groupUrl = "",
  divisionData = null,
  activityData = null,
  imageUrl = null
}) {
  const [tagCategoryValue, setTagCategoryValue] = useState(defaultSelected);
  console.log("ttt");
  console.log(divisionData);

  let tabElements = [];
  let entryElements = [];

  function GenerateViewAllButton(selectedUrl) {
    return (
      <Link href={currentSelectedId} className="flex">
        <button className="btn customAccentBackground font-bold  w-full">
          View {tagCategoryValue} Leaderboard
        </button>
      </Link>
    );
  }

  let currentSelectedId = "";

  if (divisionData) {
    divisionData.map(divisionContainer => {
      tabElements.push(
        <Tab
          label={
            divisionContainer.name + " (" + divisionContainer.fightrecord + ")"
          }
          value={divisionContainer.name.toLowerCase()}
        />
      );
      divisionContainer.entries
        .filter(entry => {
          let isCurrentDivision =
            entry.resolvedname.toLowerCase() == tagCategoryValue.toLowerCase();
          if (isCurrentDivision) {
            if (entry.divisionId)
              currentSelectedId = "/division/" + entry.divisionId + "/record";
            else if (entry.promoId) {
              currentSelectedId = "/promotion/" + entry.promoId + "/record";
            }
          }

          return isCurrentDivision;
        })
        .map(entry => {
          let url = "";
          if (entry.divisionId) url += "/division/" + entry.divisionId + "/";
          else if (entry.promoId) url += "/promotion/" + entry.promoId + "/";
          else if (entry.activityId)
            url += "/martialart/" + entry.activityId + "/";

          url += "record/";

          if (entry.year) {
            url += "annual/" + entry.year + "/";
          }

          url += entry.url;

          entryElements.push(
            <Link href={url}>
              <a>
                <div className={"w-12/12 p-2 mt-1 bg-gray-50 rounded"}>
                  <div className="flex">
                    <div className="w-1/12 pl-2 text-center customAccentText font-bold">
                      #{entry.rankIndex}
                    </div>

                    <div className="w-7/12 font-bold link pl-5 customAccentText link ">
                      {entry.name}
                    </div>

                    <div className="w-4/12 font-bold">
                      {entry.value} {entry.measuredUnit}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        });
    });
  }

  ////////////////

  if (activityData) {
    console.log("acti");
    console.log(activityData);
    activityData.entries.map(entry => {
      let url = "";
      if (entry.divisionId) url += "/division/" + entry.divisionId + "/";
      else if (entry.promoId) url += "/promotion/" + entry.promoId + "/";
      else if (entry.activityId) url += "/martialart/" + entry.activityId + "/";
      currentSelectedId = "/martialart/" + entry.activityId + "/record";
      url += "record/";

      if (entry.year) {
        url += "annual/" + entry.year + "/";
      }

      url += entry.url;

      entryElements.push(
        <Link href={url}>
          <a>
            <div className={"w-12/12 p-2 mt-1 bg-gray-50 rounded"}>
              <div className="flex">
                <div className="w-1/12 pl-2 text-center customAccentText font-bold">
                  #{entry.rankIndex}
                </div>

                <div className="w-7/12 font-bold link pl-5 customAccentText link ">
                  {entry.name}
                </div>

                <div className="w-4/12 font-bold">
                  {entry.value} {entry.measuredUnit}
                </div>
              </div>
            </div>
          </a>
        </Link>
      );
    });
  }

  ///////////

  return (
    <div>
      <Link href={groupUrl ? groupUrl : ""}>
        <a>
          <div className="flex">
            <HeadingComponent showBar={true} size={3}>
              {title}
            </HeadingComponent>
            {/* <Avatar
              variant="rounded"
              sx={{ width: 50, height: 50 }}
              src={DATA_SERVER_IMAGE_ADDRESS + imageUrl}
            /> */}
          </div>
        </a>
      </Link>

      <div className="flex">
        <div className="w-9/12">
          {tabElements.length > 0 && (
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              value={tagCategoryValue}
              onChange={(event, newValue) => {
                setTagCategoryValue(newValue.toLowerCase());
              }}
            >
              {tabElements}
            </Tabs>
          )}
        </div>
        <div className="w-3/12">
          {" "}
          <motion.div
            key={tagCategoryValue}
            // exit={{ x: -0, opacity: 0 }}
            initial={{ x: -0, opacity: 0, duration: 10 }}
            animate={{ x: 0, opacity: 1, duration: 10 }}
            className="text-center justify-center ..."
          >
            {GenerateViewAllButton(currentSelectedId)}{" "}
          </motion.div>
        </div>
      </div>

      <motion.div
        key={tagCategoryValue}
        exit={{ x: 0, opacity: 0, duration: 4 }}
        initial={{ x: 0, opacity: 0, duration: 4 }}
        animate={{ x: 0, opacity: 1, duration: 4 }}
        className="text-center justify-center ..."
      >
        {entryElements}
      </motion.div>
    </div>
  );
}
