import CommentIcon from "@mui/icons-material/Comment";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, Grow, Drawer } from "@mui/material";
import {
  browserName,
  browserVersion,
  isBrowser,
  isMobile
} from "react-device-detect";
import HeadingComponent from "./utility/HeadingComponent";
import {
  DATA_SERVER_IMAGE_ADDRESS,
  IsSmallScreen,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  YOUTUBE_URL,
  REDDIT_URL
} from "config";
import { COMPANY_NAME } from "config";
import { AddFeedbackAction } from "helpers/api";
import { GetUsername } from "config";
import { IsLoggedInLoginPrompt } from "config";
import DrawerComponent from "./DrawerComponent";

const FeedbackPopupContentComponent = ({
  displayTitle = true,
  handleClose = null
}) => {
  const [comment, setComment] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);
  const [maxCharacters, setMaxCharacters] = useState(500);
  const [currentCharacters, setCurrentCharacters] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [feedbackDispatched, setFeedbackDispatched] = useState(false);
  const fullImageInputRef = useRef(null);

  const [formats, setFormats] = React.useState(() => ["bold", "italic"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  //   const dispatch = useDispatch();

  function handleSubmitFeedback() {
    if (comment.length > 0) {
      console.log("sending feedback");

      let output = {
        source_url: window.location.href,
        resolution_width: window.screen.availWidth,
        resolution_height: window.screen.availHeight,
        mobile: isMobile,
        desktop: isBrowser,
        browser_name: browserName,
        browser_version: browserVersion,
        comment: comment.toString(),
        username: GetUsername(),
        feedback_type: feedbackType,
        file: selectedImage
      };

      setFeedbackDispatched(true);

      AddFeedbackAction(output);
      //   dispatch(AddFeedbackAction(output));
    }
  }

  if (feedbackDispatched) {
    return (
      <div className="space-y-1">
        <HeadingComponent size={3}>THANK YOU!</HeadingComponent>
        <p>Community feedback helps improve {COMPANY_NAME}.</p>
        <p>You will recieve a notification when it's updated.</p>
        <p>
          Or checkout the link below to track it and view feedback from rest of
          the community
        </p>
        <Link href="/feedback">
          <button
            onClick={() => {
              handleClose();
            }}
            className="btn  w-full  customAccentBackground text-white"
          >
            Community Feedback
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-1 py-5">
      {displayTitle && <HeadingComponent size={4}>FEEDBACK</HeadingComponent>}

      <div>
        <p>Suggest a features and report website problems.</p>
      </div>

      <div>
        <p>Is this about the current page?</p>
      </div>

      <div>
        <textarea
          className="w-full textarea textarea-info"
          rows="4"
          onChange={e => {
            if (e.target.value.length <= maxCharacters) {
              setComment(e.target.value);
              setCurrentCharacters(e.target.value.length);
            }
          }}
          value={comment}
          placeholder={"Suggest a feature, report a problem or anything else."}
        />
        <p>
          {currentCharacters} / {maxCharacters}{" "}
        </p>
      </div>

      <Link href="/feedback/">
        <a
          className="customAccentText link"
          onClick={() => {
            handleClose();
          }}
        >
          View Community Feedback
        </a>
      </Link>
      <button
        className="clickupShadow w-full customAccentBackground text-white py-2"
        onClick={handleSubmitFeedback}
        variant="contained"
      >
        Send
      </button>
    </div>
  );
};

const ShareFeedbackButtonComponent = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const smallscreen = IsSmallScreen();

  useEffect(() => {
    window.addEventListener("feedback_prompt", event => {
      if (open == false) {
        if (smallscreen) {
          window.dispatchEvent(new Event("drawer_open"));
        } else {
          setOpen(true);
        }
      }
    });
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn customAccentBackground logoFont feedback-absolute clickupShadow"
        onClick={() => {
          setOpen(true);
        }}
      >
        <CommentIcon /> FEEDBACK
      </button>

      <div className="hide_on_small">
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={true}
          TransitionComponent={Grow}
        >
          <DialogContent
            className=" centerdat "
            style={{ alignItems: "center" }}
          >
            <div className="w-12/12 space-y-4">
              <button onClick={handleClose} className="absolute top-2 right-2 ">
                <CloseIcon fontSize="large" />
              </button>
              <FeedbackPopupContentComponent handleClose={handleClose} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="hide_on_big">
        <DrawerComponent
          widthValue={"100vw"}
          anchorName="right"
          displayDone={false}
          listerName={"drawer_open"}
          onCloseLogic={handleClose}
          titleContent={
            <HeadingComponent size={3} textColor="text-white ">
              FEEDBACK
            </HeadingComponent>
          }
        >
          <div className="pr-5">
            <FeedbackPopupContentComponent
              displayTitle={false}
              handleClose={handleClose}
            />
          </div>
        </DrawerComponent>
      </div>
    </div>
  );
};

export default ShareFeedbackButtonComponent;
