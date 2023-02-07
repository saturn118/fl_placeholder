import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoginRedirectCheck } from "../config";
import { AddReviewUpvoteAction, GetReviewCurrentUserVoteAction } from "../helpers/api";



const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function UserVoteComponent({
  // initialUserVote = 0, //The base value of the current user's vote
  initialTotalVotes = 0, //The base value of the total votes cast
  boutId = null //The callback that's triggered when teh vote changes
}) {
  const [state, setState] = React.useState(0);
  const [initialUserVote, setInitialUserVote] = React.useState(0);

  const router = useRouter();

  // useEffect(() => {
  //   setState(initialUserVote);
  // }, [initialUserVote]);

  useEffect(() => {
    GetReviewCurrentUserVoteAction(boutId).then(data => {
      console.log("Retrieved UP/DOWN Data");
      console.log(data);
      if (data.rating) {
        // setInitialUserVote(data.rating);
        setState(data.rating);
      }
    });
  }, []);

  function onVoteChanged_Internal(newValue) {
    if (!!boutId) {
      console.log("Sending vote for " + boutId + " , " + newValue);

      if (AddReviewUpvoteAction(boutId, newValue)) {
        setState(newValue);
        console.log("DANNY SET");
      }
    }
  }

  return (
    <Stack>
      <Item>
        <Button
          color={state == 1 ? "error" : "primary"}
          component="span"
          onClick={() => {
            if (!LoginRedirectCheck(router)) {
              let newValue = 0;
              if (state == 1) newValue = 0;
              else newValue = 1;

              onVoteChanged_Internal(newValue);
            }
          }}
        >
          {state == 1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowUpIcon />}
        </Button>
      </Item>
      <Item>
        <h5>{state}</h5>
        {/* <h5>
          {initialUserVote}
          {initialTotalVotes - initialUserVote + state}
        </h5> */}
      </Item>
      <Item>
        <Button
          // variant="contained"
          color={state == -1 ? "error" : "primary"}
          component="span"
          onClick={() => {
            if (!LoginRedirectCheck(router)) {
              let newValue = 0;
              if (state == -1) newValue = 0;
              else newValue = -1;

              onVoteChanged_Internal(newValue);
            }
          }}
        >
          {state == -1 ? <KeyboardArrowDownIcon /> : <KeyboardArrowDownIcon />}
        </Button>
      </Item>
    </Stack>
  );
}
