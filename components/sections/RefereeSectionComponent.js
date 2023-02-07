import Link from "next/link";
import React from "react";
import BoutComponent from "../Bouts/BoutComponent";
import HeadingComponent from "../utility/HeadingComponent";

export const RefereeSectionComponent = ({ fighterData }) => {
  let recentRefBoutElements = [];
  let maxNumber = 5;
  if (fighterData.refereedata) {
    recentRefBoutElements = fighterData.refereedata.bouts.map(entry => {
      maxNumber -= 1;
      if (maxNumber < 0) return null;

      return (
        <BoutComponent
          bout={entry}
          fighterMap={fighterData.refereedata.fighters}
        />
      );

      return (
        <li>
          <Link href={"/bout/" + entry}>
            <a>{entry.id} </a>
          </Link>
        </li>
      );
    });
  }

  if (recentRefBoutElements.length == 0) {
    return <></>;
  }

  return (
    <div>
      <Link href={"/person/" + fighterData.id + "/referee"}>
        <a>
          <HeadingComponent showArrow={true} showBar={true} size={2}>
            Referee History
          </HeadingComponent>
        </a>
      </Link>
      <p>
        Total Bouts Refereed :{" "}
        {fighterData.refereedata && fighterData.refereedata.count}
      </p>
      <HeadingComponent size={6}>Recent Bouts</HeadingComponent>
      <div>{recentRefBoutElements}</div>
      <HeadingComponent showBar={true} size={6}>
        Rating
      </HeadingComponent>
      <p>
        Bouts with Bad Ref tags (unpunished fouls, early stoppage, interrupting
        fight flow)
      </p>
      <p>
        Bouts with Good Ref tags (good stoppage, fighter safety, good fighter
        control)
      </p>
    </div>
  );
};

export default RefereeSectionComponent;
