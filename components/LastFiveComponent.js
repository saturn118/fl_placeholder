import { Tooltip } from "@mui/material";
import React from "react";


const LastFiveComponent = ({
  record = ["w", "l", "w", "d", "d"],
  ...props
}) => {
  let iKey = 0;
  let recordElements = null;
  let marginAttribute = "m-1";
  if (record) {
    recordElements = record.map(element => {
      iKey += 1;
      if (element == "w") {
        return (
          <Tooltip key={iKey} title={"Win"} enterDelay={500} leaveDelay={200}>
            <div className="customShadow bg-green-500 w-3 h-3 rounded ml-1 ..."></div>
          </Tooltip>
        );
      } else if (element == "l") {
        return (
          <Tooltip key={iKey} title={"Loss"} enterDelay={500} leaveDelay={200}>
            <div className="customShadow bg-red-500 w-3 h-3 rounded ml-1 ..."></div>
          </Tooltip>
        );
      } else if (element == "d") {
        return (
          <Tooltip key={iKey} title={"Draw"} enterDelay={500} leaveDelay={200}>
            <div className="customShadow bg-gray-500 w-3 h-3 rounded ml-1 ..."></div>
          </Tooltip>
        );
      } else if (element == "n") {
        return (
          <Tooltip
            key={iKey}
            title={"No Contest"}
            enterDelay={500}
            leaveDelay={200}
          >
            <div className="customShadow bg-yellow-500 w-3 h-3 rounded ml-1 ... "></div>
          </Tooltip>
        );
      }
    });
  }

  return (
    <div {...props} className="flex">
      {recordElements}
    </div>
  );
};

export default LastFiveComponent;
