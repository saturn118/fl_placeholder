import { Avatar, Button } from "@mui/material";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS, BACKGROUND_ATTR } from "../../config/index";
import { ExtractSurname, ConvertDateObjToYear } from "../../helpers/api";
import { UserRatingComponent } from "../UserRatingPopupComponent";
import UserStarRatingBreakdownComponent from "../UserStarRatingBreakdownComponent";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const BoutCompactComponent = ({ bout }) => {
  let fighterA = bout.fighterData[bout.fighterAId];
  let fighterB = bout.fighterData[bout.fighterBId];
  return (
    <div className={"w-full flex_on_big  pt-1 " + BACKGROUND_ATTR}>
      <div className="spaceEven">
        <p className=" text-center link customAccentText">{fighterA.name}</p>
        <p className="font-bold">VS</p>
        <p className=" text-center link customAccentText">{fighterB.name}</p>
      </div>
      <div className="spaceEven w-6/12 centerX">
        <div>{bout.martialArt}</div>

        <div>{new Date(bout.timestamp).getUTCFullYear()}</div>
      </div>

      <div className="flex space-x-5 spaceEven w-2/12 wide_on_small bg-blue-100">
        <UserStarRatingBreakdownComponent
          entityType="bout"
          boutId={bout.id}
          goToLink={"/bout/" + bout.id}
        />

        <UserRatingComponent entityId={bout.id} entityType="bout" />

        <HowToVoteIcon fontSize="large" />
      </div>
    </div>
  );
};

export default BoutCompactComponent;
