import StarIcon from "@mui/icons-material/Star";
import {
  CircularProgress,
  DialogContent,
  Grid,
  Rating,
  Slide
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { IsLoggedIn, IsLoggedInLoginPrompt, IsSmallScreen } from "../config";
import {
  GetUserVoteForEntityAction,
  UserVoteForEntityAction
} from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";
import DrawerComponent from "./DrawerComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function PopupDrawerConditionalComponent({
  title = "",
  eventName = "combo_drawer_open",
  content = null
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  var nEventName = eventName + "_p";

  var smallscreen = IsSmallScreen();
  useEffect(() => {
    window.addEventListener(eventName, event => {
      if (smallscreen) {
        window.dispatchEvent(new Event(eventName + "_p"));
      } else {
        setOpen(true);
      }
    });
  }, []);

  return (
    <div>
      {!IsSmallScreen() && (
        <div className="hide_on_small">
          <Dialog
            onClose={handleClose}
            open={open}
            fullWidth={true}
            // TransitionComponent={Grow}
          >
            <DialogContent
              className=" centerdat "
              style={{ alignItems: "center" }}
            >
              <div className="w-12/12 space-y-4">
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 "
                >
                  <CloseIcon fontSize="large" />
                </button>
                {content}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {IsSmallScreen() && (
        <div className="hide_on_big">
          <DrawerComponent
            widthValue={"100vw"}
            anchorName="right"
            displayDone={false}
            listerName={eventName + "_p"}
            onCloseLogic={handleClose}
            titleContent={
              <HeadingComponent size={3} textColor="text-white ">
                {title}
              </HeadingComponent>
            }
          >
            <div className="pr-5">{content}</div>
          </DrawerComponent>
        </div>
      )}
    </div>
  );
}

export function UserRatingComponent({
  label = "No Label Provided",
  entityId = null,
  entityType = null
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  //We use this to preview a spinner while it's loading
  const [hasLoadedVote, setHasLoadedVote] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // behavior to be triggered when the component becomes visible on the screen
        if (IsLoggedIn() && hasLoadedVote == false) {
          GetUserVoteForEntityAction(entityId, entityType).then(data => {
            console.log("Retrieved user vote data for " + entityType);
            console.log(data);
            if (data.rating) {
              setRatingValue(data.rating.rating);
              setReviewText(data.rating.reviewText);
            }
            setHasLoadedVote(true);
          });
        } else {
          setHasLoadedVote(true);
        }
        setHasLoadedVote(true);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let displayedRatingString = null;

  if (hasLoadedVote == false) {
    displayedRatingString = <CircularProgress />;
  } else if (ratingValue) {
    displayedRatingString = (
      <>
        {" "}
        <StarIcon sx={{ color: "#1976d2" }} /> {ratingValue} / 5
      </>
    );
  } else {
    displayedRatingString = (
      <>
        <StarIcon sx={{ color: "#1976d2" }} /> Rate
      </>
    );
  }

  return (
    <div ref={ref}>
      <a
        onClick={e => {
          setOpen(!open);
          console.log("DANNY NEW CAT EVENT");
          window.dispatchEvent(new Event("cat"));
        }}
      >
        {displayedRatingString}
      </a>
      <UserRatingPopupComponent
        entityId={entityId}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        reviewText={reviewText}
        entityType={entityType}
        // selectedValue={selectedValue}
        ratedLabel={label}
        open={open}
        onClose={e => {
          setOpen(false);
        }}
      />
    </div>
  );
}

export function UserRatingPopupComponent(props) {
  const {
    onClose,
    selectedValue,
    ratedLabel,
    open,
    setRatingValue,
    ratingValue,
    reviewText,
    entityId,
    entityType
  } = props;
  // const [ratingValue, setRatingValue] = useState(0);
  const baseStarSize = 70;
  const starStepSize = 7;
  const handleClose = () => {
    onClose();
  };

  const router = useRouter();
  const [updatedRatingValue, setUpdatedRatingValue] = useState(ratingValue);
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  let MAX_CHARACTERS = 250;

  const formik = useFormik({
    initialValues: {
      review: ""
    },

    onSubmit: async values => {
      if (!IsLoggedInLoginPrompt("Sign in to leave a review")) {
        return;
      }

      onVoteChanged_Internal();
    }
  });

  let rating = ratingValue;
  if (rating == 0) rating = "-";

  function onVoteChanged_Internal(newValue) {
    if (!!entityId) {
      if (
        UserVoteForEntityAction(
          entityId,
          entityType,
          updatedRatingValue,
          formik.values.review
        )
      ) {
        setRatingValue(updatedRatingValue);
      }
    }
  }

  function ReviewElementGenerator() {
    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
          <p>
            {formik.values.review.length} / {MAX_CHARACTERS}
          </p>
          <li>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              id="review"
              type="text"
              placeholder="Leave an optional text review"
              value={formik.values.review}
              onChange={formik.handleChange}
            />
            <p>{reviewText}</p>
          </li>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Review Cotains Spoilers</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                // checked={containsSpoilers}
                // onClick={() => {
                //   setContainsSpoilers(containsSpoilers);
                // }}
              />
            </label>
          </div>
          <li>
            <button type="submit" className="btn btn-wide">
              Submit/Update Review
            </button>
          </li>
        </form>
      </div>
    );
  }

  return (
    <div>
      <PopupDrawerConditionalComponent
        title={ratedLabel}
        eventName="cat"
        content={
          <div>
            <Grid container className="rating-star">
              <Grid item xs={12}>
                <HeadingComponent size={3}>{ratedLabel}</HeadingComponent>
              </Grid>
              <Grid item xs={12}>
                <Rating
                  // style={{ width: "100%" }}
                  name="hover-feedback"
                  size="large"
                  max={5}
                  value={updatedRatingValue}
                  onChange={(event, newValue) => {
                    setUpdatedRatingValue(newValue);

                    // if (!LoginRedirectCheck(router)) {
                    //   onVoteChanged_Internal(newValue);
                    // }
                  }}

                  // emptyIcon={
                  //   <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  // }
                />
              </Grid>
            </Grid>

            {ReviewElementGenerator()}
          </div>
        }
      />
    </div>
  );
}
