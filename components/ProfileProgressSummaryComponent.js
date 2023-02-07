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
          sx={{ width: 48, height: 48 }}
          src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
        />

        <HeadingComponent size={4}>{entry.earnedcount}</HeadingComponent>
      </div>
    );
  });

  return (
    <div>
      <div className=" border-b-2 mb-10 flex">
        <HeadingComponent textColor={"customAccentText"} size={4}>
          Earned Badges
        </HeadingComponent>{" "}
        <a href="/badges" className="link link-primary ml-10">
          view all
        </a>
      </div>

      <div className="flex">
        <button className="flex space-x-2">{badgeTypeElements}</button>
      </div>

      <HeadingComponent size={4}>
        Energy Points Earned{" "}
        <button className="btn btn-primary">{summaryData.points}</button>
      </HeadingComponent>
    </div>
  );
}
