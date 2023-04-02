import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import { Rating, Slide } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS, GetUsername, IsLoggedIn } from "../config";
import {
  ConverDateToDaysAgoString,
  ReportEntityAction,
  UserDeleteEntityRatingAction,
  UserVoteForEntityAction
} from "../helpers/api";
import { DisplayReviewBreakdownElements } from "./UserStarRatingBreakdownComponent";
import UserVoteComponent from "./UserVoteComponent";
import { AnimAppear } from "./utility/AnimationUtility";
import HeadingComponent from "./utility/HeadingComponent";

export function CommentMenu({
  handleDelete,
  handleReport,
  isCurrentUser = false
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {isCurrentUser && (
          <MenuItem
            onClick={() => {
              handleDelete();
              handleClose();
            }}
          >
            <DeleteIcon />
            Delete
          </MenuItem>
        )}

        {isCurrentUser && (
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <EditIcon />
            Edit
          </MenuItem>
        )}

        {!isCurrentUser && (
          <MenuItem
            onClick={() => {
              handleReport();
              handleClose();
            }}
          >
            <FlagIcon /> Report
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LeaveACommentElement(
  entityId,
  entityType,
  handleAdd,
  parentCommentId = null
) {
  const [pendingComment, setPendingComment] = useState("");
  return (
    <div className="w-12/12">
      <input
        type="text"
        placeholder="Add a new comment"
        className="input input-bordered input-lg w-8/12"
        value={pendingComment}
        onChange={e => {
          setPendingComment(e.target.value);
        }}
      />
      <div className="flex space-x-10 mb-5 ">
        <button
          onClick={() => {
            setPendingComment("");
          }}
          className="btn customAccentBackground w-3/12"
        >
          Cancel
        </button>
        <button
          disabled={pendingComment.length == 0}
          className={
            "btn w-3/12 " +
            (pendingComment.length > 0 ? "customAccentBackground" : "")
          }
          onClick={() => {
            UserVoteForEntityAction(
              entityId,
              entityType,
              5,
              pendingComment,
              "a"
            ).then(resultData => {
              console.log("Detected Result");
              console.log(resultData);
              let done = resultData;

              if (done) {
                handleAdd({
                  reviewData: {
                    rating: 5,
                    timestamp: null,
                    reviewText: pendingComment
                  },
                  userData: { username: GetUsername() }
                });
                setPendingComment("");
              }
            });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export function OtherUserReviewItem({
  reviewData,
  handleDelete,
  displayRating = true
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  let likes = 0;

  let rankElements = [];
  if (reviewData.userData.summary) {
    rankElements = reviewData.userData.summary.map(element => {
      return (
        <div>
          <a>
            <p>
              {element.activity} - {element.rank}
            </p>
            <img
              src={DATA_SERVER_IMAGE_ADDRESS + element.imageUrl}
              width={30}
            ></img>
          </a>
        </div>
      );
    });
  }

  let username = reviewData.userData.username;
  let deleteEditElement = null;

  let isCurrentUser = GetUsername() == username && IsLoggedIn();

  deleteEditElement = (
    <CommentMenu
      handleDelete={() => {
        UserDeleteEntityRatingAction(reviewData.reviewData.id).then(
          resultData => {
            if (resultData) {
              handleDelete(reviewData.reviewData.id);
            }
          }
        );
      }}
      handleReport={() => {
        ReportEntityAction(reviewData.reviewData.id, "comment", "DickNipples");
      }}
      isCurrentUser={isCurrentUser}
    />
  );

  let replyElement = null;
  if (isReplying) {
    replyElement = <p>Replying</p>;

    // replyElement = LeaveACommentElement(
    //   reviewData.reviewData.entityId,
    //   reviewData.reviewData.entityType,
    //   null,
    //   reviewData.reviewData.id
    // );
  }

  return (
    <div className="flex mt-1">
      <UserVoteComponent />
      <div
        onMouseEnter={e => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className=" w-full bg-white
        border-gray-200 sm:px-4 sm:py-1 md:px-4 sm:rounded-lg sm:shadow-sm "
      >
        <Link href={"/user/" + username}>
          <a>
            <strong> {username}</strong>
            {rankElements}
          </a>
        </Link>
        <span className="text-xs text-gray-400">
          {" "}
          {ConverDateToDaysAgoString(reviewData.reviewData.timestamp)}
        </span>
        <div className="flex w-full">
          <div className="w-10/12">
            {reviewData.reviewData.rating && displayRating && (
              <Rating
                className="p-2"
                value={reviewData.reviewData.rating}
                readOnly
              />
            )}
            <p className="text-sm pt-3">{reviewData.reviewData.reviewText}</p>
          </div>
          <div className="w-2/12">
            {deleteEditElement}
            <button
              className="customAccentText"
              onClick={() => {
                let newVal = !isReplying;
                setIsReplying(newVal);
              }}
            >
              <ReplyIcon />
              Reply
            </button>
          </div>
        </div>
        {replyElement}
      </div>
    </div>
  );
}

export function UserEntityReviewSectionComponent({
  entityId = null,
  entityType = null,
  displayTagsSection = false,
  label = null,
  breakdownVoteData = null,
  latestReviews = [],
  displayBreakdown = false,
  displayRating = true
}) {
  const [reviewDataLocal, setReviewDataLocal] = useState([]);

  useEffect(() => {
    setReviewDataLocal(latestReviews);
  }, [latestReviews]);

  console.log("Review debug");
  console.log(reviewDataLocal);

  function handleDelete(id) {
    let newList = [...reviewDataLocal];
    let list2 = newList
      .filter(entry => {
        return entry.reviewData.id != id;
      })
      .map(entry => {
        return entry;
      });

    setReviewDataLocal(list2);
  }

  function handleAdd(entry) {
    let newList = [...reviewDataLocal];
    newList.unshift(entry);
    setReviewDataLocal(newList);
  }

  let individualElements = reviewDataLocal.map(entry => {
    return (
      <div className="w-full">
        <AnimAppear>
          <OtherUserReviewItem
            reviewData={entry}
            handleDelete={handleDelete}
            displayRating={displayRating}
          />
        </AnimAppear>
      </div>
    );
  });

  individualElements.unshift(
    LeaveACommentElement(entityId, entityType, handleAdd)
  );

  return (
    <div className="w-full flex ">
      {displayBreakdown == true && (
        <div className="w-4/12">
          {DisplayReviewBreakdownElements(breakdownVoteData, label)}
        </div>
      )}
      <div className="w-full ">
        <div className="antialiased">
          <div className="flex w-full">
            <div className="w-8/12" key={individualElements.length}>
              <AnimAppear>
                <HeadingComponent showBar={true} size={3}>
                  {individualElements.length - 1} Comments
                </HeadingComponent>
              </AnimAppear>
            </div>

            <select
              onChange={e => {
                // setPeakSnaphot(e.target.value);
              }}
              className="form-select text-black w-3/12"
            >
              <option>Top Voted</option>
              <option>Recent</option>
            </select>
          </div>

          {individualElements}

          {individualElements.length == 0 && (
            <p> Be the first to leave a review</p>
          )}
        </div>
      </div>
    </div>
  );
}
