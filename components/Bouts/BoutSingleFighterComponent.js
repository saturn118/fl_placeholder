import { Avatar, Badge, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BACKGROUND_ATTR, DATA_SERVER_IMAGE_ADDRESS } from "../../config/index";
import {
  ConvertDateObjToSimple,
  ConvertDateObjToYear
} from "../../helpers/api";
import LastFiveComponent from "../LastFiveComponent";
import { UserRatingComponent } from "../UserRatingPopupComponent";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
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

  let resultColour = "bg-gray-400";
  if (!hideSpoilers) {
    if (resultElement == "DRAW") {
      resultColour = "bg-gray-400";
    } else if (resultElement == "NC") {
      resultColour = "bg-orange-400";
    } else if (isWinner) {
      resultColour = "bg-green-400";
    } else {
      resultColour = "bg-red-400";
    }
  }

  let communityButtonElements = [
    <UserStarRatingBreakdownComponent
      entityType="bout"
      boutId={bout.id}
      voteData={voteData}
      // label={ratingLabel}
    />,
    <UserRatingComponent
      label={fighterData.name + " vs " + opponentInstance.name}
      entityId={bout.id}
      entityType="bout"
      goToLink={"/bout/" + bout.id}
    />,
    decisionVoteElement
  ];

  return (
    <div>
      <div className={"flex full" + BACKGROUND_ATTR}>
        {/* Start of left person */}
        <div className="w-8/12 flex">
          <div
            className={
              resultColour +
              " h-[100%] w-2/12 centerdat mr-2 font-bold text-white customShadow"
            }
          >
            <p>{resultElement.slice(0, 1)}</p>
          </div>
          <div className="ag-blue-500 w-full  p-2">
            <Link href={"/person/" + opponentInstance.id}>
              <a className="font-bold flex space-x-5 customAccentText link">
                <h5 className="font-bold">{opponentInstance.name}</h5>{" "}
                {titleElement}
              </a>
            </Link>

            <div className="flex space-x-5 pt-2">
              {opponentRecord && (
                <LastFiveComponent record={opponentRecord.lastfive} />
              )}

              <div className="text-gray-400">
                {ConvertDateObjToYear(bout.dateOfEvent)}
              </div>
            </div>
            {/* {opponentRecord && (
              <p>
                {opponentRecord.win}-{opponentRecord.loss}-{opponentRecord.draw}
                --
                {opponentRecord.streak}
              </p>
            )}
            */}
          </div>
        </div>
        {/* end of left person */}

        <div className="w-2/12 pt-4">
          <div>
            <Link href={"/martialart/" + bout.martialArtId}>
              <a>
                <div className="customAccentText link">{bout.martialArt}</div>
              </a>
            </Link>
            <div className="customAccentText link">{divisionName}</div>
          </div>
        </div>

        {/* Start of Result */}
        <div className="w-3/12 item-center pt-4">
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

        {/* Start of user rating section */}
        <div className="flex hide_on_small space-x-5 w-4/12 p-3 customAccentBackground rounded text-white  ...">
          {communityButtonElements}
        </div>
        {/* end of user rating section */}
        {/* End of Buttons */}
        {/* Start of buttons */}
        <div className="bg-green-100 float-right justify-right justify-end ">
          <div className="">
            <li>
              <Link href={"/bout/" + bout.id}>
                <a>
                  <Button className="">
                    <UnfoldMoreIcon fontSize="large" />
                  </Button>
                </a>
              </Link>
            </li>
          </div>
        </div>
      </div>
      <div className="flex hide_on_big spaceEven  bg-gray-300 rounded text-white  ...">
        {communityButtonElements}
      </div>
    </div>
  );
};

export default BoutSingleFighterComponent;
