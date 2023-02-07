import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Tooltip } from "@mui/material";
import React from "react";

const SpoilerButtonComponent = (spoilerChangedCallback, spoilerState) => {
  return (
    <div onClick={spoilerChangedCallback}>
      <Tooltip
        title={"Hide fight results on this page"}
        enterDelay={500}
        leaveDelay={200}
      >
        <div className="text-white">
          <li>Spoilers</li>
          <li>
            {spoilerState ? (
              <VisibilityOffIcon className="event-fab-icon" />
            ) : (
              <VisibilityIcon className="event-fab-icon" />
            )}
          </li>
        </div>
      </Tooltip>
    </div>
  );
};
export default SpoilerButtonComponent;
