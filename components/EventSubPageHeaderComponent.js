import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

const EventSubPageHeaderComponent = ({
  eventData = null,
  pageTitle = "PAGE_TITLE"
}) => {
  return (
    <Link href={"/event/" + eventData.id}>
      <a>
        <div className="flex">
          <Avatar
            variant="rounded"
            src={DATA_SERVER_IMAGE_ADDRESS + eventData.imageUrl}
            sx={{ width: 180, height: 200 }}
          />
          <div>
            <HeadingComponent showBar={true} size={1}>
              {eventData.name}
            </HeadingComponent>
            <HeadingComponent showBar={false} size={3}>
              {pageTitle}
            </HeadingComponent>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default EventSubPageHeaderComponent;
