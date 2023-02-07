import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function OnHoverMenuComponent({
  popupContent = null,
  anchorHorizontalCustom = "left",
  anchorVerticalCustom = "bottom",
  children
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </Typography>
      <Popover
        transitionDuration={500}
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none"
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: anchorVerticalCustom,
          horizontal: anchorHorizontalCustom
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        // PaperProps={{
        //   style: {
        //     width: 500,
        //     height: 200
        //   }
        // }}
      >
        {/* <Paper>
         */}
        {popupContent}

        {/* </Paper> */}
      </Popover>
    </div>
  );
}
