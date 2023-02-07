import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

const BoutSubPageHeaderComponent = ({
  boutData = null,
  pageTitle = "PAGE_TITLE"
}) => {
  return (
    <Link href={"/bout/" + boutData.id}>
      <a>
        <div className="flex">
          <div>
            <div className="flex">
              <Avatar
                className={"customShadow "}
                src={DATA_SERVER_IMAGE_ADDRESS + boutData.fighterAImage}
                sx={{ width: 75, height: 75 }}
              />
              <HeadingComponent showBar={true} size={4}>
                {boutData.fighterAName}
              </HeadingComponent>
            </div>
          </div>

          <div>vs</div>
          <div>
            <HeadingComponent showBar={true} size={4}>
              {boutData.fighterBName}
            </HeadingComponent>
            <Avatar
              className={"customShadow "}
              src={DATA_SERVER_IMAGE_ADDRESS + boutData.fighterBImage}
              sx={{ width: 75, height: 75 }}
            />
          </div>
        </div>
        <HeadingComponent showBar={true} size={2}>
          {pageTitle}
        </HeadingComponent>
      </a>
    </Link>
  );
};

export default BoutSubPageHeaderComponent;
