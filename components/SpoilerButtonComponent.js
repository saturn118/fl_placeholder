import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Tooltip, Button } from "@mui/material";
import React from "react";
import HeadingComponent from "./utility/HeadingComponent";

const SpoilerButtonComponent = (spoilerChangedCallback, spoilerState) => {
  return (
    <div onClick={spoilerChangedCallback}>
      <Tooltip
        title={"Hide fight results on this page"}
        enterDelay={500}
        leaveDelay={200}
      >
        <div>
          <HeadingComponent textColor={"text-center text-gray-300 "} size={6}>
            SPOILERS
          </HeadingComponent>
          <Button>
            <div>
              {spoilerState ? (
                <VisibilityOffIcon
                  // fontSize="large"
                  className=" text-white event-fab-icon"
                />
              ) : (
                <VisibilityIcon
                  // fontSize="large"
                  className="text-white event-fab-icon"
                />
              )}
            </div>
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};
export default SpoilerButtonComponent;
