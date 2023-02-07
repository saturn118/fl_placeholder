import { Avatar, Button, Dialog, DialogContent } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS, IsLoggedInLoginPrompt } from "../../config/index";
import { AddBoutDecisionVoteAction } from "../../helpers/api";
import HeadingComponent from "../utility/HeadingComponent";


const DecisionVoteWidget = ({
  bout,
  fighterA,
  fighterB,
  userDecisionInitial,
  decisionData,
  label
}) => {
  const [open, setOpen] = React.useState(false);
  const [userDecision, setUserDecision] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUserDecision(userDecisionInitial);
  }, []);
  useEffect(() => {
    setUserDecision(userDecisionInitial);
  }, [userDecisionInitial]);

  function handleDecisionVote(fighterId) {
    if (!IsLoggedInLoginPrompt("Sign in to cast a vote")) {
      return;
    }

    let boutId = bout.id;

    AddBoutDecisionVoteAction(boutId, fighterId).then(data => {
      console.log("sending decision update");
      setUserDecision(fighterId);
    });
    console.log("New Decision Vote " + fighterId + " , " + boutId + ", ");
  }

  let fighterADecisionTotal = 0;
  let fighterBDecisionTotal = 0;
  let agreeValue = 100;
  if (!!decisionData) {
    if (bout.fighterAId in decisionData) {
      fighterADecisionTotal = decisionData[bout.fighterAId];
    }
    if (bout.fighterBId in decisionData) {
      fighterBDecisionTotal = decisionData[bout.fighterBId];
    }
  }
  if (userDecision == bout.fighterAId) {
    fighterADecisionTotal += 1;
  } else if (userDecision == bout.fighterBId) {
    fighterBDecisionTotal += 1;
  }

  let totalVotesCast = fighterADecisionTotal + fighterBDecisionTotal;
  agreeValue = totalVotesCast;

  return (
    <div>
      <a
        className=""
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button>
          <img width="30" src="/scale.png"></img>
          <div className="p-1">
            <p style={{ fontSize: "1.1rem", lineHeight: "0.8rem" }}>99% </p>
            <p style={{ fontSize: "0.6rem" }}>Agree </p>
          </div>
        </Button>
      </a>

      {open && (
        <DecisionPopupComponent
          open={open}
          onClose={e => {
            setOpen(false);
          }}
          fighterA={fighterA}
          fighterB={fighterB}
          fighterAVotes={fighterADecisionTotal}
          fighterBVotes={fighterBDecisionTotal}
          totalVotes={totalVotesCast}
          currentUserVote={userDecision}
          handleUserVoteChanged={handleDecisionVote}
          label={label}
        />
      )}
    </div>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DecisionPopupComponent(props) {
  const {
    onClose,
    label,
    open,
    voteData,
    fighterA,
    fighterB,
    fighterAVotes,
    fighterBVotes,
    totalVotes,
    currentUserVote,
    handleUserVoteChanged
  } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      // TransitionComponent={Transition}
      onClose={handleClose}
      open={open}
      // maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent style={{ alignItems: "center" }}>
        <div className="text-align-center justify-center">
          <HeadingComponent size={3} showBar={true}>
            Community Decision
          </HeadingComponent>
        </div>

        <div className="flex justify-center">
          <div className="w-3/12">
            <Avatar
              variant="rounded"
              src={DATA_SERVER_IMAGE_ADDRESS + fighterA.imageUrl}
              sx={{ width: 125, height: 125 }}
            />
            <p>{fighterA.name}</p>
            <p>
              {fighterAVotes == 0
                ? 0
                : ((fighterAVotes / totalVotes) * 100).toFixed(1)}
              %
            </p>
            <button
              className="btn w-full"
              onClick={() => {
                handleUserVoteChanged(fighterA.id);
              }}
            >
              Winner {currentUserVote == fighterA.id ? "(W)" : "()"}
            </button>
          </div>

          <div className="w-3/12">
            <HeadingComponent size={4}>VS</HeadingComponent>
            {totalVotes} Votes
          </div>
          <div className="w-3/12">
            <Avatar
              variant="rounded"
              src={DATA_SERVER_IMAGE_ADDRESS + fighterB.imageUrl}
              sx={{ width: 125, height: 125 }}
            />
            <p>{fighterB.name} </p>

            <p>
              {fighterBVotes == 0
                ? 0
                : ((fighterBVotes / totalVotes) * 100).toFixed(1)}
              %
            </p>
            <button
              className={"btn "}
              onClick={() => {
                handleUserVoteChanged(fighterB.id);
              }}
            >
              Winner {currentUserVote == fighterB.id ? "(W)" : "()"}
            </button>
          </div>
          <button className={"btn "}>Draw (todo)</button>
        </div>
        <button
          className="btn btn-primary w-full m-1"
          onClick={() => {
            handleClose();
          }}
        >
          DONE
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default DecisionVoteWidget;
