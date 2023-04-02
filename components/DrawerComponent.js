import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
export default function DrawerComponent({
  anchorName = "left",
  widthValue = "80vw",
  heightValue = "100vh",
  openTrigger = false,
  displayDone = true,
  titleContent = null,
  onCloseLogic = null,
  listerName = "drawer_open",
  closeDrawerName = "drawer_close",
  children,
  ...props
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (open == false && onCloseLogic) {
      onCloseLogic();
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener(listerName, event => {
      setOpen(true);
    });
    window.addEventListener(closeDrawerName, event => {
      setOpen(false);
    });
  }, []);

  return (
    <div className="drawerZIndex">
      {[anchorName].map(anchor => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <Box
              sx={{
                width: widthValue,
                minHeight: heightValue
              }}
              role="presentation"
              className="relative drawerZIndex"
            >
              <div className="customAccentBackground w-full pl-5 pt-5 drawerZIndex">
                {titleContent}
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="absolute top-2 right-2 "
                >
                  <CloseIcon fontSize="large" className="text-white" />
                </button>
              </div>

              <div className="pl-5">{children}</div>
              {displayDone && (
                <div className="absolute bottom-2 left-2 w-full centerdat">
                  <button
                    className="btn customAccentBackground w-10/12 text-white clickupShadow"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    DONE{" "}
                  </button>
                </div>
              )}
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
