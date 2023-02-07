import { Avatar } from "@mui/material";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS, BACKGROUND_ATTR } from "../../config/index";
import { ExtractSurname } from "../../helpers/api";
import { UserRatingComponent } from "../UserRatingPopupComponent";
import UserStarRatingBreakdownComponent from "../UserStarRatingBreakdownComponent";

const BoutCompactComponent = ({ bout }) => {
  const AVATAR_WIDTH = 100;
  const AVATAR_HEIGHT = 100;

  let fighterA = bout.fighterData[bout.fighterAId];
  let fighterB = bout.fighterData[bout.fighterBId];
  return (
    <div className={"w-full flex space-x-2 p-2 " + BACKGROUND_ATTR}>
      <div className="flex space-x-5 w-2/12">
        <UserStarRatingBreakdownComponent
          boutId={bout.id}
          goToLink={"/bout/" + bout.id}
        />
        <UserRatingComponent entityId={bout.id} entityType="bout" />
      </div>
      <p className=" text-center">{fighterA.name}</p>
      <p>vs</p>
      <p className=" text-center">{fighterB.name}</p>
      <p>({bout.timestamp})</p>
    </div>
  );
};

export default BoutCompactComponent;
