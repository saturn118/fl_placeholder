import { Chip, CircularProgress, DialogContent, Rating, Slide } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IsLoggedIn } from "../config";
import { GetUserVoteForEntityAction } from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function UserRefereeRatingWidget({
  label = "No Label Provided",
  entityId = null,
  entityType = null
}) {
  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  //We use this to preview a spinner while it's loading
  const [hasLoadedVote, setHasLoadedVote] = useState(false);

  useEffect(() => {
    if (IsLoggedIn()) {
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
  }, []);

  let displayedRatingString = null;

  if (hasLoadedVote == false) {
    displayedRatingString = <CircularProgress />;
  } else if (ratingValue) {
    displayedRatingString = (
      <>
        <img width="30" src="/referee.png"></img>
        {ratingValue} / 5
      </>
    );
  } else {
    displayedRatingString = (
      <>
        <img width="30" src="/referee.png"></img>
        Rate
      </>
    );
  }

  return (
    <div>
      <a
        onClick={e => {
          setOpen(!open);
        }}
      >
        {displayedRatingString}
      </a>

      <UserRefereeRatingPopupComponent
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

export function UserRefereeRatingPopupComponent(props) {
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
  const [refresh, setRefresh] = React.useState(false);
  const [userSelectedTags, setUserSelectedTags] = useState({ test_1: null });

  const router = useRouter();

  let tagData = ["test_1", "test_2", "test_3", "test_4"];
  let optionalTags = tagData.map(entry => {
    let selectedAttribute = "outlined";
    if (entry in userSelectedTags) selectedAttribute = "filled";

    return (
      <div>
        <Chip
          onClick={() => {
            let temp = userSelectedTags;
            if (entry in temp) {
              delete temp[entry];
            } else {
              temp[entry] = null;
            }

            setUserSelectedTags(temp);
            setRefresh(!refresh);
          }}
          label={entry}
          color="success"
          variant={selectedAttribute}
        />
        <p>10</p>
      </div>
    );
  });

  return (
    <Dialog
      // TransitionComponent={Transition}
      onClose={handleClose}
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent style={{ alignItems: "center" }}>
        <HeadingComponent size={2} showBar={true}>
          Referee Rating
        </HeadingComponent>

        <div>
          <Rating
            // style={{ width: "100%" }}
            name="hover-feedback"
            size="large"
            max={5}
            // value={1}
            onChange={(event, newValue) => {
              // setUpdatedRatingValue(newValue);
              // if (!LoginRedirectCheck(router)) {
              //   onVoteChanged_Internal(newValue);
              // }
            }}

            // emptyIcon={
            //   <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            // }
          />
        </div>

        <div className="flex">{optionalTags}</div>

        <div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            id="review"
            type="text"
            placeholder="Leave an optional text review"
            // value={formik.values.review}
            // onChange={formik.handleChange}
          />
        </div>

        <li>
          <button
            onClick={() => {
              handleClose();
            }}
            type="submit"
            className="btn btn-wide"
          >
            Submit/Update Review
          </button>
        </li>
      </DialogContent>
    </Dialog>
  );
}
