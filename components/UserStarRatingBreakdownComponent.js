import { DialogContent, Rating, Stack, LinearProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function UserStarRatingBreakdownComponent({
  initialUserVote = 0, //The base value of the current user's vote
  initialTotalVotes = 0, //The base value of the total votes cast
  boutId = null, //The callback that's triggered when teh vote changes
  voteData = null,
  label = null,
  goToLink
}) {
  const [ratingValue, setRatingValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    setRatingValue(initialTotalVotes);
  }, [initialTotalVotes]);

  useEffect(() => {
    setRatingValue(initialTotalVotes);
  }, []);

  let serverRatingValue = 0;
  let totalVotes = 0;

  console.log(voteData);
  if (voteData && voteData.ratingValue) {
    serverRatingValue = voteData.ratingValue.toFixed(1);
    totalVotes = voteData.totalVotes;
  }

  return (
    <Stack>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        <a>
          {/* <button className="btn"> */}
          <li>
            <div>
              <div>
                <div className="flex">
                  <Rating name="read-only" value={5} max={1} readOnly />
                  <div className="p-1 text-center">
                    <p
                      className="font-bold"
                      style={{ fontSize: "1.1rem", lineHeight: "0.8rem" }}
                    >
                      {serverRatingValue}{" "}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: "0.6rem" }}>{totalVotes} votes </p>
              </div>
            </div>
          </li>
        </a>
      </div>

      {open && (
        <RatingPopupComponent
          // selectedValue={selectedValue}
          ratedLabel={label}
          voteData={voteData}
          open={open}
          onClose={e => {
            setOpen(false);
          }}
          goToLink={goToLink}
        />
      )}

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label for="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </Stack>
  );
}

function RatingBreakdown(label, value, percentage) {
  return (
    <div className="flex items-center mt-1">
      <div className=" w-1/5 customAccentText">
        <span>{label}</span>
      </div>
      <LinearProgress
        variant="determinate"
        sx={{ width: 200, height: 8 }}
        value={percentage}
      />
      {/* <div className="w-3/5">
        <div className="bg-gray-300 w-full rounded-lg h-2">
          <div className=" w-7/12 bg-indigo-600 rounded-lg h-2"></div>
        </div>
      </div> */}
      <div className="w-1/5 text-gray-700 pl-3">
        <span className="text-sm">{percentage}%</span>
      </div>
    </div>
  );
}

export function GenerateBreakdownElements(voteData) {
  let dummy = [5, 4, 3, 2, 1];
  let breakdownElements = dummy.map(entry => {
    let hasEntry =
      voteData && voteData.breakdown && entry.toString() in voteData.breakdown;
    let percent = 0;
    if (hasEntry) {
      percent =
        (voteData.breakdown[entry.toString()].quantity / voteData.totalVotes) *
        100;

      percent = percent.toFixed(0);
    }

    return <>{RatingBreakdown(entry.toString() + " star", percent, percent)}</>;
  });

  return breakdownElements;
}

export function DisplayReviewBreakdownElements(
  voteData,
  label,
  goToLink = null
) {
  let breakdownElements = GenerateBreakdownElements(voteData);

  let serverRatingValue = 0;
  let totalVotes = 0;

  if (voteData && voteData.ratingValue) {
    serverRatingValue = voteData.ratingValue;
    totalVotes = voteData.totalVotes;
  }

  let goToElement = null;
  if (goToLink) {
    goToElement = (
      <Link href={goToLink}>
        <a>
          <button className="btn"> View All Reviews </button>
        </a>
      </Link>
    );
  }

  return (
    <div className=" ">
      <div className="mb-1 tracking-wide px-4 py-4">
        <h2 className="text-gray-800 font-semibold mt-1">
          {serverRatingValue} out of 5
        </h2>
        <h2 className="text-gray-800 font-semibold mt-1">
          {totalVotes} Users reviews ttt
        </h2>
        <div className="border-b -mx-8 px-8 pb-3">{breakdownElements}</div>
      </div>

      {goToElement}
    </div>
  );
}

export function RatingPopupComponent(props) {
  const { onClose, ratedLabel, goToLink, open, voteData } = props;
  const [ratingValue, setRatingValue] = useState(0);
  const handleClose = () => {
    onClose();
    setRatingValue(0);
  };

  let disableButton = ratingValue == 0;
  let rating = ratingValue;
  if (rating == 0) rating = "-";

  console.log("lalalala");
  console.log(voteData);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      // maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent style={{ alignItems: "center" }}>
        {DisplayReviewBreakdownElements(voteData, ratedLabel, goToLink)}
      </DialogContent>
    </Dialog>
  );
}
