import { Avatar, Badge, Chip, Tooltip, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import React, { useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config/index";
import LastFiveComponent from "../LastFiveComponent";
import { UserRatingComponent } from "../UserRatingPopupComponent";
import UserStarRatingBreakdownComponent from "../UserStarRatingBreakdownComponent";
import DecisionVoteWidget from "./DecisionVoteComponent2";

function CovertProLabel(txt) {
  if (txt == "y") {
    return "pro";
  } else if (txt == "n") {
    return "am";
  } else if ((txt = "e")) {
    return "exhibition";
  }
}

const BoutComponent = ({
  fighterMap,
  bout,
  promoId,
  hideSpoilers = false,
  votes = 0,
  userVote = 0,
  voteData = null,
  userDecisionInitial = null,
  decisionData = null,
  displayResult = true,
  displayBoutLink = true,
  displayRatings = true,
  displaySinglePersonId = null
}) => {
  if (!(bout.fighterAId in fighterMap || bout.fighterBId in fighterMap)) {
    return (
      <div className="flex w-12/12 bg-gray-50 rounded ">
        <div className="w-3/12">Pending</div>
        <div className="w-1/12">VS</div> <div className="w-3/12">Pending</div>
        <div className="w-2/12">{bout.martialArtId}</div>
      </div>
    );
  }

  const [open, setOpen] = useState(false);
  const router = useRouter();
  let recordMap = bout.bouttimerecord;
  let votesCommunity = null;
  let votingData = null;
  let winnerNameA = hideSpoilers
    ? null
    : " border-solid border-4 border-green-600 ...";
  let winnerNameB = hideSpoilers
    ? null
    : " border-solid border-4 border-red-600 ...";
  let winnerNameAText = "";
  let winnerNameBText = "";

  console.log("Bout OUTPUT");
  console.log(bout);
  let divisionId = bout.divisionId;

  if (!hideSpoilers) {
    if (bout.winnerId == bout.fighterAId) {
      winnerNameAText = "Win";
      winnerNameBText = "Loss";
    } else if (bout.result == "draw") {
      winnerNameB = winnerNameA = "draw-result";
      winnerNameAText = winnerNameAText = "Draw";
    } else if (bout.result == "no contest") {
      winnerNameB = winnerNameA = "nocontest-result";
      winnerNameAText = winnerNameAText = "NC";
    } else {
      let temp = winnerNameA;
      winnerNameA = winnerNameB;
      winnerNameB = temp;

      winnerNameBText = "Loss";
      winnerNameAText = "Win";
    }
  }

  let fighterAElo = null;
  let fighterBElo = null;
  if (bout.elo) {
    fighterAElo = bout.elo[bout.fighterAId];
    fighterBElo = bout.elo[bout.fighterBId];
  }

  let ratingLabel =
    fighterMap[bout.fighterAId].name +
    " vs " +
    fighterMap[bout.fighterBId].name;

  let decisionVoteElement = null;
  if (bout.winCondition == "decision" && !hideSpoilers) {
    decisionVoteElement = (
      <DecisionVoteWidget
        bout={bout}
        fighterA={fighterMap[bout.fighterAId]}
        fighterB={fighterMap[bout.fighterBId]}
        userDecisionInitial={userDecisionInitial}
        decisionData={decisionData}
        label={ratingLabel}
      />
    );
  }
  let boutId = bout.id;
  if (votesCommunity) {
    if (boutId in votesCommunity["ratings"]) {
      communityRatingValue = votesCommunity["ratings"][boutId]["ratingValue"];
      communityNumberOfRatings =
        votesCommunity["ratings"][boutId]["totalVotes"];
    }
  }

  console.log("testy");
  if (votingData) {
    if (boutId in votingData["ratings"]) {
      ratingValue = votingData["ratings"][boutId];
    }
    if (boutId in votingData["decisions"]) {
      decisionId = votingData["decisions"][boutId];
    }
    if (boutId in votingData["predictions"]) {
      predictionId = votingData["predictions"][boutId];
    }
  }

  let tagElements = null;
  if (bout.tags && hideSpoilers == false) {
    let iKey = 0;
    tagElements = bout.tags.map(tagElement => {
      iKey += 1;
      return (
        <Chip
          key={iKey}
          label={tagElement.name}
          color="success"
          variant="outlined"
          onClick={() => {
            router.push(
              "/promotion/" +
                promoId +
                "/bout/" +
                tagElement.name.replace(/ /g, "_")
            );
          }}
        />
      );
    });
  }

  let titleElement = null;
  if ("titleOnTheLine" in bout && bout.titleOnTheLine)
    titleElement = (
      <Tooltip title={"View Title Lineage"} enterDelay={500} leaveDelay={200}>
        <Link href="/">
          <img width="30px" src="/champion-belt.png"></img>
        </Link>
      </Tooltip>
    );

  let userHeaderButtonElements = [
    <UserStarRatingBreakdownComponent
      entityType="bout"
      boutId={bout.id}
      voteData={voteData}
      // initialUserVote={userVote}
      // initialTotalVotes={votes}
      label={ratingLabel}
      goToLink={"/bout/" + bout.id}
    />,

    <UserRatingComponent
      label={ratingLabel}
      entityId={bout.id}
      entityType="bout"
    />,

    decisionVoteElement
  ];

  let sectionRatingElement = (
    <div className="flexwrap spaceEven w-full  customAccentBackground rounded  mr-2 ...">
      {userHeaderButtonElements}
    </div>
  );

  let sectionLeftPersonElement = (
    <div className="w-3/12 flex pt-1 pb-1">
      <div className="ag-yellow-500">
        <Badge
          invisible={hideSpoilers}
          color="success"
          overlap="circular"
          badgeContent={winnerNameAText}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
        >
          <Avatar
            className={"customShadow " + winnerNameA}
            src={
              DATA_SERVER_IMAGE_ADDRESS + fighterMap[bout.fighterAId].imageUrl
            }
            sx={{ width: 75, height: 75 }}
          />
        </Badge>
      </div>
      <div className="ag-blue-500 w-full  p-2">
        <Link href={"/person/" + fighterMap[bout.fighterAId].id}>
          <a className="font-bold flex space-x-2">
            <p>{fighterMap[bout.fighterAId].name} </p>
            {/* {FlagComponent(
              fighterMap[bout.fighterAId].nationalityCountryCode,
              30
            )} */}
          </a>
        </Link>
        {recordMap && (
          <div>
            <p>
              {recordMap[bout.fighterAId].win}-{recordMap[bout.fighterAId].loss}
              -{recordMap[bout.fighterAId].draw}
              {recordMap[bout.fighterBId].streak}
            </p>
            <LastFiveComponent record={recordMap[bout.fighterAId].lastfive} />
            <p>{fighterAElo}</p>
          </div>
        )}
      </div>
    </div>
  );

  let sectionMiddleElement = (
    <div className="w-2/12 text-center rounded  ">
      <div className="justify-center text-center">
        <p className="customAccentText link">
          {/* CovertProLabel(bout.professional)} | */}
          <Link href={"/martialart/" + bout.martialArtId}>
            <a>{bout.martialArt}</a>
          </Link>
        </p>
        <Link href={"/division/" + divisionId}>
          <a className="customAccentText link"> {bout.weightValue} lbs </a>
        </Link>
        {/* <p> {bout.numberOfRounds} rounds</p> */}
        {titleElement}
        <p>{bout.date}</p>
      </div>
    </div>
  );

  let sectionRightPersonElement = (
    <div className="w-3/12 flex p-2">
      <div className="ag-blue-500 w-full text-right p-2">
        <Link href={"/person/" + fighterMap[bout.fighterAId].id}>
          <a className="font-bold">
            <p>{fighterMap[bout.fighterBId].name}</p>
          </a>
        </Link>
        {recordMap && (
          <div>
            <p>
              {" "}
              <p>
                {recordMap[bout.fighterBId].win}-
                {recordMap[bout.fighterBId].loss}-
                {recordMap[bout.fighterBId].draw}--
                {recordMap[bout.fighterBId].streak}
              </p>
              <p>{fighterBElo}</p>
            </p>
            <div className="flex justify-end">
              <LastFiveComponent record={recordMap[bout.fighterBId].lastfive} />
            </div>
          </div>
        )}
      </div>
      <div className="ag-yellow-500">
        <Badge
          invisible={hideSpoilers}
          color="error"
          overlap="circular"
          badgeContent={winnerNameBText}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <Avatar
            className={"customShadow " + winnerNameB}
            src={
              DATA_SERVER_IMAGE_ADDRESS + fighterMap[bout.fighterBId].imageUrl
            }
            sx={{ width: 75, height: 75 }}
          />
        </Badge>
      </div>
    </div>
  );

  let sectionResultElement = (
    <div className=" w-2/12 flex ag-yellow-500 p-3">
      <>
        <a
          className="bout-detail-font"
          onClick={() => {
            if (!!bout.techniqueId) {
              router.push("/technique/" + bout.techniqueId);
            }
          }}
        >
          {hideSpoilers == false && (
            <>
              <p className="font-bold">{bout.winCondition}</p>
              <p>{bout.winSubCondition}</p>
            </>
          )}
          {hideSpoilers && (
            <>
              <p className="font-bold p-5">Result Hidden</p>
            </>
          )}
        </a>
      </>
    </div>
  );

  let sectionLinksElement = (
    <div className=" centerdat w-1/12 ag-red-500 w-full  align-end">
      <Link href={"/bout/" + bout.id}>
        <a>
          <Button fontSize="large">
            <UnfoldMoreIcon />
          </Button>
        </a>
      </Link>
    </div>
  );

  return (
    <div className=" w-full bg-gray-50 rounded ">
      <div className="flex hide_on_small">
        {sectionLeftPersonElement}
        {sectionMiddleElement}

        {sectionRightPersonElement}
        {displayResult && sectionResultElement}
        {displayRatings && sectionRatingElement}
        {displayBoutLink && sectionLinksElement}
      </div>

      <div className="hide_on_big">
        <div className="flex">
          {sectionLeftPersonElement}
          {sectionMiddleElement}

          {sectionRightPersonElement}
          {displayResult && sectionResultElement}

          {displayBoutLink && sectionLinksElement}
        </div>
        {displayRatings && sectionRatingElement}
      </div>
    </div>
  );
};

export default BoutComponent;
