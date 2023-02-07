import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, Dialog, DialogContent, Grow, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import { AnimAppear } from "./utility/AnimationUtility";
import HeadingComponent from "./utility/HeadingComponent";

const LibraryOnboardingPopupComponent = props => {
  const [open, setOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const handleClose = () => {
    // FinishedLibraryOnboarding();
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("onboarding_library", event => {
      console.log("Change to local storage!");

      setTimeout(() => {
        // function to be called after 3 seconds
        if (open == false) {
          setOpen(true);
        }
      }, 3000);
    });
  }, []);

  let TOTAL_PAGES = 5;
  let imageUrl = null;
  let content = null;
  if (pageIndex == 0) {
    imageUrl = "booty.jpg";
    content = (
      <HeadingComponent size={4}>
        {" "}
        Discover how to <span className="text-red-600">ATTACK</span>,{" "}
        <span className="text-yellow-600">DEFEND </span>
        and <span className="text-green-600">REACT</span> from any grappling
        position
      </HeadingComponent>
    );
  } else if (pageIndex == 1) {
    imageUrl = "booty2.jpg";
    content = (
      <HeadingComponent size={4}>
        Follow Positions to get notified of new techniques
      </HeadingComponent>
    );
  } else if (pageIndex == 2) {
    imageUrl = "booty3.jpg";
    content = (
      <HeadingComponent size={4}>
        Create and Share technique playlists with the community
      </HeadingComponent>
    );
  } else if (pageIndex == 3) {
    imageUrl = "booty4.jpg";
    content = (
      <HeadingComponent size={4}>
        Enroll in free guided courses in a range of martial arts
      </HeadingComponent>
    );
  } else if (pageIndex == 4) {
    imageUrl = "booty.jpg";
    content = (
      <HeadingComponent size={4}>
        Ask and Answer questions for each specific technique
      </HeadingComponent>
    );
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth="md" // sets the maximum width of the dialog to "small"
      TransitionComponent={Grow}
    >
      <DialogContent className="space-y-5 " style={{ alignItems: "center" }}>
        <button onClick={handleClose} className="absolute top-2 right-2 ">
          <CloseIcon fontSize="large" />
        </button>

        <HeadingComponent showBar={false} size={2}>
          FIGHT LIBRARY
        </HeadingComponent>

        <div className="flex w-full space-x-10" key={pageIndex}>
          <AnimAppear>
            <div className="w-6/12 flex">
              <Avatar
                variant="rounded"
                sx={{ width: 300, height: 300 }}
                src={DATA_SERVER_IMAGE_ADDRESS + imageUrl}
              />
              {/* <img src={DATA_SERVER_IMAGE_ADDRESS + imageUrl} /> */}
            </div>
            <div className="mt-3 ..">{content}</div>
          </AnimAppear>
        </div>

        <LinearProgress
          variant="determinate"
          value={(100 / TOTAL_PAGES) * pageIndex}
        />
        <div className="space-x-10 flex justify-center">
          <Button
            disabled={pageIndex <= 0}
            onClick={() => {
              if (pageIndex > 0) setPageIndex(pageIndex - 1);
            }}
          >
            <ArrowBackIosIcon fontSize="large" />
          </Button>
          <Button
            onClick={() => {
              let newValue = pageIndex + 1;
              if (newValue >= TOTAL_PAGES) {
                handleClose();
              } else setPageIndex(pageIndex + 1);
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </Button>
        </div>
        <a className="link customAccentText" onClick={handleClose}>
          Skip
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default LibraryOnboardingPopupComponent;
