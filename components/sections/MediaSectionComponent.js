import { ImageMissingEntryWidgetComponent } from "@components/ImageMissingEntryComponent";
import HeadingComponent from "@components/utility/HeadingComponent";
import { Avatar, Skeleton } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import ElementSetSummaryComponent from "@components/ElementSetSummaryComponent";

export const MediaSectionComponent = ({
  entityType,
  entityId,
  mediaData = []
}) => {
  let MAX_ELEMENTS = 3;
  let mediaElements = [];

  if (mediaElements.length < MAX_ELEMENTS) {
    mediaElements.push(
      <ImageMissingEntryWidgetComponent
        entityId={entityId}
        entityType={entityType}
      />
    );
  }

  for (let i = 0; i < mediaData.length; i++) {
    mediaElements.push(
      <Avatar
        variant="rounded"
        sx={{ width: 210, height: 118 }}
        src={DATA_SERVER_IMAGE_ADDRESS + mediaData[i]}
      />
    );
  }

  for (let i = mediaElements.length; i < MAX_ELEMENTS; i++) {
    mediaElements.push(
      <Skeleton
        className="m-1 customShadow"
        variant="rectangular"
        width={210}
        height={118}
      />
    );
  }

  return (
    <div>
      <ElementSetSummaryComponent
        title="IMAGES"
        description="Photos from the top fight moments"
        tiles={<div className="flex space-x-5">{mediaElements}</div>}
        overrideTiles={true}
        link={"/" + entityType + "/" + entityId + "/media"}
      />
    </div>
  );
};

export default MediaSectionComponent;
