import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Dialog, DialogContent, Grow } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

const BadgeEarnedPopupComponent = props => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [points, setPoints] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("badge_earned", event => {
      console.log("Change to local storage!");
      let eventData = event.data;
      setName(eventData.name);
      setDescription(eventData.description);
      setPoints(eventData.points);
      setImageUrl(eventData.imageUrl);
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
        className="centerdat space-y-3 py-5"
        style={{ alignItems: "center" }}
      >
        <button onClick={handleClose} className="absolute top-2 right-2 ">
          <CloseIcon fontSize="large" />
        </button>
        <Avatar
          // variant="rounded"
          sx={{ width: 100, height: 100 }}
          src={DATA_SERVER_IMAGE_ADDRESS + imageUrl}
        />

        <HeadingComponent size={3}>{name}</HeadingComponent>

        <p>{description}</p>
        <p>+{points} Points</p>

        <p>CURRENT SCORE</p>

        <Link href={"/badges"}>
          <a
            className="link text-center customAccentText w-7/12"
            onClick={handleClose}
          >
            View All Challenges
          </a>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeEarnedPopupComponent;
