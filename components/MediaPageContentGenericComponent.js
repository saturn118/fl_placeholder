import { Avatar, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import { ImageMissingEntryWidgetComponent } from "./ImageMissingEntryComponent";
export default function MediaPageContentGenericComponent({
  mediaData,
  entityType,
  entityId
}) {
  console.log("MEDIA dATA");
  console.log(mediaData);
  let i = 0;

  let WIDTH = 200;
  let HEIGHT = 118;
  let marginAttributes = "m-2 customShadow";

  let mediaElements = [];
  if (mediaData && "images" in mediaData) {
    mediaElements = mediaData.images.map(entry => {
      return (
        <motion.button
          whileHover={{
            scale: 1.08,
            transition: { duration: 0.2 }
            // rotate: 5
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Avatar
            className={marginAttributes}
            variant="rounded"
            sx={{ width: WIDTH, height: HEIGHT }}
            src={DATA_SERVER_IMAGE_ADDRESS + entry}
          />
        </motion.button>
      );
    });
  }

  if (mediaElements.length < 30) {
    mediaElements.push(
      <div className={"max-h-[" + HEIGHT + "px]"}>
        <ImageMissingEntryWidgetComponent
          entityId={entityId}
          entityType={entityType}
        />
      </div>
    );
  }

  for (let i = mediaElements.length; i < 30; i++) {
    mediaElements.push(
      <Skeleton
        className={marginAttributes}
        variant="rectangular"
        width={WIDTH}
        height={HEIGHT}
      />
    );
  }

  return <div className="flexwrap">{mediaElements}</div>;
}
