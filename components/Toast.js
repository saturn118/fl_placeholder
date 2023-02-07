import { Alert, Slide } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

function TransitionLeft(props) {
  return <Slide {...props} direction="up" />;
}

export default function ToastComponent({ label = "Test Message" }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {label}
        </Alert>
      </Snackbar>
    </div>
  );
}
