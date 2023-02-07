import React, { useState } from "react";
import { GetCurrentYear } from "../../config";
import HeadingComponent from "../utility/HeadingComponent";

export const ToggleSectionComponent = ({
  currentYearData,
  allTimeData,
  title = []
}) => {
  const [primary, setPrimary] = useState(true);

  let finalData = [];
  if (primary) {
    finalData = allTimeData;
  } else {
    finalData = currentYearData;
  }

  let highlight = " btn-primary ";

  return (
    <div>
      <div className="flex">
        <HeadingComponent size={2} showBar={true}>
          {title}
        </HeadingComponent>
        <button
          className={"btn" + (primary ? highlight : "")}
          onClick={() => {
            setPrimary(true);
          }}
        >
          All Time
        </button>
        <button
          className={"btn" + (primary == false ? highlight : "")}
          onClick={() => {
            setPrimary(false);
          }}
        >
          {GetCurrentYear()}
        </button>
      </div>
      <div className="flexwrap">{finalData}</div>
    </div>
  );
};

export default ToggleSectionComponent;
