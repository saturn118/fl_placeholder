import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetLogoElement } from "../../config";
import LoginPageComponent from "./LoginComponent";

const LoginPopupComponent = props => {
  const [open, setOpen] = useState(false);
  const [cachedMessage, setCachedMessage] = useState(null);
  const handleClose = () => {
    setCachedMessage(null);
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("login_prompt", event => {
      console.log("Change to local storage!");
      let eventData = event.data;
      let message = eventData.message;
      console.log(event.data);
      setCachedMessage(message);

      if (open == false) {
        setOpen(true);
      }
    });
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      TransitionComponent={Grow}
    >
      <DialogContent
        className="primaryBackground centerdat "
        style={{ alignItems: "center" }}
      >
        <div className="w-8/12 space-y-4">
          <button onClick={handleClose} className="absolute top-2 right-2 ">
            <CloseIcon fontSize="large" />
          </button>

          <div className="flex justify-center">{GetLogoElement()}</div>
          {cachedMessage && (
            <p className="flex justify-center text-white">{cachedMessage}</p>
          )}
          <LoginPageComponent statsData={null} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopupComponent;
