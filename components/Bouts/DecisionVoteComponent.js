import GavelIcon from "@mui/icons-material/Gavel";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LoginRedirectCheck } from "../../config/index";
import { AddBoutDecisionVoteAction, AddBoutRoundDecisionVoteAction } from "../../helpers/api";

const DecisionVoteComponent = ({ bout, userDecisionInitial, decisionData }) => {
  const [userDecision, setUserDecision] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUserDecision(userDecisionInitial);
  }, []);
  useEffect(() => {
    setUserDecision(userDecisionInitial);
  }, [userDecisionInitial]);

  function handleDecisionVote(fighterId, boutId) {
    if (LoginRedirectCheck(router)) {
      return;
    }

    AddBoutDecisionVoteAction(boutId, fighterId).then(data => {
      console.log("sending decision update");
      setUserDecision(fighterId);
    });
    console.log("New Decision Vote " + fighterId + " , " + boutId + ", ");
  }

  let fighterADecisionTotal = 0;
  let fighterBDecisionTotal = 0;
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

  let roundElements = [];
  const numberOfRounds = bout.roundsCompleted;
  for (let i = 0; i < numberOfRounds; i++) {
    let roundIndex = i + 1;

    roundElements.push(
      <li className="flex">
        <button
          className="btn"
          onClick={() => {
            AddBoutRoundDecisionVoteAction(
              bout.id,
              bout.fighterAId,
              roundIndex
            ).then(data => {});
          }}
        >
          0
        </button>{" "}
        <div>
          <li>Round {roundIndex}</li>
          <li>
            <a className="link link-primary"> 0 votes</a>
          </li>
        </div>
        <button
          className="btn"
          onClick={() => {
            AddBoutRoundDecisionVoteAction(
              bout.id,
              bout.fighterBId,
              roundIndex
            ).then(data => {});
          }}
        >
          0
        </button>
      </li>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="grid flex-grow h-20 card  rounded-box place-items-center">
          <button
            className="btn"
            disabled={bout.fighterAId == userDecision}
            onClick={() => {
              handleDecisionVote(bout.fighterAId, bout.id);
            }}
          >
            {fighterADecisionTotal}
          </button>
        </div>
        <div className="divider lg:divider-horizontal">
          {" "}
          <GavelIcon />
          <a className="link link-primary"> {totalVotesCast} votes</a>
          {/* <p>{totalVotesCast}</p> */}
          {/* {userDecision}
          <p>------</p>
          {userDecisionInitial} */}
        </div>
        <div className="grid flex-grow h-20 card  rounded-box place-items-center">
          <button
            className="btn"
            disabled={bout.fighterBId == userDecision}
            onClick={() => {
              handleDecisionVote(bout.fighterBId, bout.id);
            }}
          >
            {fighterBDecisionTotal}
          </button>
        </div>
      </div>

      <div>{roundElements}</div>
    </>
  );
};

export default DecisionVoteComponent;
