import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

export default function ProfileProgressSummaryComponent({ summaryData }) {
  // const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    // if (IsLoggedIn()) {
    //   GetEarnedPointsSummaryAction().then(data => {
    //     console.log("Danny badge summary");
    //     console.log(data);
    //     setSummaryData(data);
    //   });
    // }
  }, [summaryData]);

  if (summaryData == null) return <></>;

  let badgeTypeElements = summaryData.summary.map(entry => {
    return (
      <div className="bg-gray-200 rounded p-2 ">
        <Avatar
          sx={{ width: 20, height: 20 }}
          src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
        />

        <HeadingComponent size={4}>{entry.earnedcount}</HeadingComponent>
      </div>
    );
  });

  return (
    <div>
      <div className=" border-b-2  flex">
        <a href="/badges">
          <HeadingComponent size={3} showBar={true} showArrow={true}>
            BADGES
          </HeadingComponent>
        </a>
      </div>

      <div className="flex">
        <button className="flex space-x-2">{badgeTypeElements}</button>
      </div>

      <HeadingComponent size={4}>
        {/* Energy Points Earned{" "} */}
        <button className="btn customAccentBackground clickupShadow text-white">
          {summaryData.points} Points
        </button>
      </HeadingComponent>
    </div>
  );
}
