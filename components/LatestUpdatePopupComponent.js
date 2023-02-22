import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Dialog, DialogContent, Grow } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DATA_SERVER_IMAGE_ADDRESS,
  COMPANY_NAME,
  BACKGROUND_ATTR
} from "../config";
import HeadingComponent from "./utility/HeadingComponent";
import { ConverDateToDaysAgoString } from "helpers/api";
import { useRouter } from "next/router";

const LatestUpdatePopupComponent = props => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("latest_update", event => {
      let eventData = event.data;

      console.log(event.data);

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
      // BackdropProps={{
      //   invisible: true
      // }}
    >
      <DialogContent
        className="centerdat  py-5 w-full"
        style={{ alignItems: "center" }}
      >
        <button onClick={handleClose} className="absolute top-2 right-2 ">
          <CloseIcon fontSize="large" />
        </button>

        <HeadingComponent size={3}>
          {"Since You've Been Gone".toUpperCase()}
        </HeadingComponent>
        <p>Updates from the {COMPANY_NAME} team</p>

        <div className="py-5 w-full">
          {[0, 0, 0, 0].map(entry => {
            return (
              <div className={BACKGROUND_ATTR + " w-full py-3 px-3"}>
                <div className="flex">
                  <p className="customAccentText w-8/12">
                    tsgsg gsgsdgsgs gsdgsg
                  </p>{" "}
                  <p>{ConverDateToDaysAgoString(new Date())}</p>
                </div>
                <p>
                  test fdsjfhjsdfhj fhsdjfhsdjkhf hfjdsfhsdkhfj hfjdkfhskjfhs
                  hfjkdsfhksfhkh{" "}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex space-x-5">
          <button
            className="btn customAccentBackground text-white"
            onClick={() => {
              setOpen(false);
              const event = new Event("feedback_prompt");
              window.dispatchEvent(event);
            }}
          >
            Suggest a Feature
          </button>
          <button
            className="btn customAccentBackground text-white"
            onClick={() => {
              setOpen(false);
              router.push("/feedback");
            }}
          >
            View Community Suggestions
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LatestUpdatePopupComponent;
