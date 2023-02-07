import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import HeadingPairComponent from "./utility/HeadingPairComponent";

const FighterSubPageHeaderComponent = ({
  fighterData = null,
  pageTitle = "PAGE_TITLE"
}) => {
  return (
    <Link href={"/person/" + fighterData.id}>
      <a>
        <div className="flex space-x-5">
          <Avatar
            variant="rounded"
            src={DATA_SERVER_IMAGE_ADDRESS + fighterData.imageUrl}
            sx={{ width: 100, height: 100 }}
          />
          <div>
            <HeadingPairComponent
              label1={fighterData.name.toUpperCase()}
              label2={pageTitle}
              targetLink={"/promotion/"}
            ></HeadingPairComponent>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default FighterSubPageHeaderComponent;
