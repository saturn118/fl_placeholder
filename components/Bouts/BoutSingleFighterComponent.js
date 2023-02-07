import { Avatar, Badge } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BACKGROUND_ATTR, DATA_SERVER_IMAGE_ADDRESS } from "../../config/index";
import { ConvertDateObjToSimple } from "../../helpers/api";
import LastFiveComponent from "../LastFiveComponent";
import { UserRatingComponent } from "../UserRatingPopupComponent";
import UserStarRatingBreakdownComponent from "../UserStarRatingBreakdownComponent";
import DecisionVoteWidget from "./DecisionVoteComponent2";

//Display a bout showing only the opponent. Used for displaying bouts from a
//fighter's page where you dont want to display their profile every time.
const BoutSingleFighterComponent = ({
  fighterData,
  bout,
  hideSpoilers = false,
  voteData = null,
  votes = 0,
  userVote = 0
}) => {
  let opponentRecord = bout.bouttimerecord;
  let divisions = fighterData.divisions;
  let opponentId = null;

  if (bout.fighterAId == fighterData.id) {
    opponentId = bout.fighterBId;
  } else {
    opponentId = bout.fighterAId;
  }

  let opponentInstance = fighterData.opponents[opponentId];

  let resultElement = "";
  let isWinner = fighterData.id == bout.winnerId;
  let winnerCircleColour = "";

  if (!hideSpoilers) {
    winnerCircleColour = isWinner
      ? " border-solid border-4 border-green-600 "
      : " border-solid border-4 border-red-600 ";
  }
  if (!hideSpoilers) {
    let result = bout.result;
    if (result) {
      if (result == "d") {
        resultElement = "DRAW";
      } else if (
        result == "nc" ||
        (bout.winCondition && bout.winCondition.includes("contest"))
      ) {
        resultElement = "NC";
      } else if (result == "cancelled") {
        return; // dont render cancelled bouts for now
        activeStyle = cancelledStyle;
      } else if (isWinner) {
        resultElement = "WIN";
      } else {
        resultElement = "LOSS";
      }
    }
  }

  let titleElement = null;
  if ("titleOnTheLine" in bout && bout.titleOnTheLine)
    titleElement = (
      <>
        <Link href="/">
          <img width="30px" src="/champion-belt.png"></img>
        </Link>
      </>
    );

  let divisionName = null;
  if (bout.divisionId) {
    divisionName = (
      <Link href={"/division/" + bout.divisionId}>
        <a className={"customAccentText link"}>
          {divisions[bout.divisionId].weightValue} lbs
        </a>
      </Link>
    );
  }

  let decisionVoteElement = null;
  if (bout.winCondition == "decision" && !hideSpoilers) {
    decisionVoteElement = (
      <DecisionVoteWidget
        bout={bout}
        fighterA={fighterData.opponents[bout.fighterAId]}
        fighterB={fighterData.opponents[bout.fighterBId]}
        // userDecisionInitial={userDecisionInitial}
        // decisionData={decisionData}
        // label={ratingLabel}
      />
    );
  }

  return (
    <div>
      <div className={"flex m-2 w-10/12" + BACKGROUND_ATTR}>
        {/* Start of user rating section */}
        <div className="flexwrap w-2/12 p-3 rounded text-white customAccentBackground ...">
          <div className="w-6/12 ag-red-500">
            <UserStarRatingBreakdownComponent
              boutId={bout.id}
              voteData={voteData}
              // label={ratingLabel}
            />
            <div className="ag-yellow-500">{decisionVoteElement}</div>
          </div>
          <div className="w-6/12 ag-blue-500">
            <UserRatingComponent
              label={fighterData.name + " vs " + opponentInstance.name}
              entityId={bout.id}
              entityType="bout"
              goToLink={"/bout/" + bout.id}
            />
          </div>
        </div>
        {/* end of user rating section */}

        {/* Start of left person */}
        <div className="w-4/12 flex p-2">
          <div className="ag-yellow-500 pl-3">
            <Badge
              invisible={hideSpoilers}
              color={resultElement == "WIN" ? "success" : "error"}
              overlap="circular"
              badgeContent={resultElement}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
              <Avatar
                // variant="rounded"
                className={"customShadow " + winnerCircleColour}
                src={DATA_SERVER_IMAGE_ADDRESS + opponentInstance.imageUrl}
                sx={{ width: 75, height: 75 }}
              />
            </Badge>
          </div>
          <div className="ag-blue-500 w-full  p-2">
            <Link href={"/person/" + opponentInstance.id}>
              <a className="font-bold customAccentText link">
                <h5 className="font-bold">{opponentInstance.name}</h5>
              </a>
            </Link>
            {opponentRecord && (
              <p>
                {opponentRecord.win}-{opponentRecord.loss}-{opponentRecord.draw}
                --
                {opponentRecord.streak}
              </p>
            )}
            {opponentRecord && (
              <LastFiveComponent record={opponentRecord.lastfive} />
            )}
          </div>
        </div>
        {/* end of left person */}

        <div className="w-2/12">
          <Link href={"/martialart/" + bout.martialArtId}>
            <a>
              <div className="customAccentText link">{bout.martialArt}</div>
            </a>
          </Link>
          <div className="customAccentText link">{divisionName}</div>
          {titleElement}

          <div>{ConvertDateObjToSimple(bout.dateOfEvent)}</div>
        </div>

        {/* Start of Result */}
        <div className="w-2/12 item-center">
          {hideSpoilers == false ? (
            <div>
              <div className="font-bold">{bout.winCondition}</div>
              <div className="">{bout.winSubCondition}</div>
            </div>
          ) : (
            <p className="font-extrabold py-5">Hidden</p>
          )}
        </div>
        {/* End of result */}

        {/* Start of buttons */}
        <div className="m-3">
          <div className="">
            <li>
              <Link href={"/bout/" + bout.id}>
                <a>
                  <button className="btn customAccentBackground  font-bold text-2xl">
                    ...
                  </button>
                </a>
              </Link>
            </li>
          </div>

          {/* <p>__bout__date__</p>
          <p>__event__name__</p> */}
        </div>
        {/* End of Buttons */}
      </div>
    </div>
  );
};

export default BoutSingleFighterComponent;
