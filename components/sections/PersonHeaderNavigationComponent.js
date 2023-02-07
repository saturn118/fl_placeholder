import PublicIcon from "@mui/icons-material/Public";
import { Chip, Rating, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BACKGROUND_ATTR, DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import CountryPresenceWidgetComponent from "../CountryPresenceComponent";
import FlagComponent from "../FlagComponent";
import FollowComponent from "../FollowComponent";
import { PlaylistWidgetComponent } from "../PlaylistPopupComponent";
import PopularityComponent from "../PopularityComponent";
import { RecordBreakdownFighterComponent } from "../RecordBreakdownComponent";
import SpoilerButtonComponent from "../SpoilerButtonComponent";
import HeadingComponent from "../utility/HeadingComponent";
import { HeadingPairCustomComponent } from "../utility/HeadingPairComponent";
import BodyHeaderSectionComponent from "./BodyHeaderSectionComponent";
import { JudgeAlignmentCommunity, JudgeAlignmentOfficial } from "./JudgeSectionComponent";






export const PersonHeaderNavigationComponent = ({
  fighterData,
  judgeData = null,
  handSpoilerChanged,
  hideSpoilers,
  pageId = "summary",
  children
}) => {
  const [recordSummaryTabValue, setRecordSummaryTabValue] = React.useState(
    !!fighterData.recordsByType ? fighterData.recordsByType[0].name : null
  );

  let isReferee =
    fighterData.refereedata && fighterData.refereedata.bouts.length > 0;
  let isJudge = judgeData && judgeData.events.length > 0;
  let isFighter = fighterData.bouts && fighterData.bouts.length > 0;

  let tagElements = [];
  if (fighterData.tags) {
    tagElements = fighterData.tags.map(entry => {
      return (
        <Link href={"/martialart/" + entry.id}>
          <a>
            <Chip
              label={entry.name}
              color="info"
              variant="outlined"
              className="text-white"
              onClick={() => {}}
            />
          </a>
        </Link>
      );
    });
  }

  let divisionPresence = [];
  if (fighterData.divisionPresence) {
    fighterData.divisionPresence.map(entry => {
      return (
        // <p className="font-bold">{entry}lbs</p>
        <Chip
          label={entry + "lbs"}
          className="text-white customAccentBackground"
        />
      );
    });
  }

  let statMap = {
    establised: {
      label: "Years Active",
      value: fighterData.activityYears
        ? fighterData.activityYears.start +
          " - " +
          fighterData.activityYears.end
        : "",
      img: null
    },
    age: { label: "Age", value: fighterData.dateOfBirth },
    // legReach: { label: "Leg Reach", value: fighterData.legReach },
    divisions: {
      label: "Weightclass",
      value: <div className="space-x-1 flex">{divisionPresence}</div>
    },
    flag: {
      label: "Presence",
      value: (
        <CountryPresenceWidgetComponent
          countryData={fighterData.countryPresence}
        />
      )
    },
    height: {
      label: "Height",
      value: !!fighterData.height
        ? fighterData.heightImperial + " / " + fighterData.heightMetric
        : "-"
    },
    reach: {
      label: "Reach",
      value: !!fighterData.reach
        ? fighterData.reach + " / " + fighterData.reachMetric
        : "-"
    }
    // town: { label: "Hometown", value: fighterData.homeTown },
    // socials: {
    //   label: "Social",
    //   value: <SocialMediaLinksComponent youtube="fdsfs" instagram={"fdsfs"} />
    // }
  };

  let statElements = [];
  for (const [label, d] of Object.entries(statMap)) {
    statElements.push(
      <div className="flex w-11/12 m-1 bg-gray-50 rounded p-2  pl-4">
        <div className="w-4/12 font-bold ">{d.label}</div>
        <div className="w-8/12">{d.value}</div>
      </div>
    );
  }

  let recordTabElements = [];
  let recordElements = [];
  if (fighterData.recordsByType) {
    fighterData.recordsByType.map(entry => {
      recordTabElements.push(
        <Tab label={entry.name.toUpperCase()} value={entry.name} />
      );

      if (recordSummaryTabValue != entry.name) return;

      let globalRank = null;
      let countryRank = null;
      if (entry.activityId && entry.activityId in fighterData.eloglobal) {
        let globalValue = fighterData.eloglobal[entry.activityId].world;
        let globalTotal = fighterData.eloglobal[entry.activityId].worldtotal;
        let countryValue = fighterData.eloglobal[entry.activityId].country;
        let countryTotal = fighterData.eloglobal[entry.activityId].countrytotal;

        let gender = fighterData.gender;
        if (gender == null) gender = "m";

        let sharedParams = "?gender=" + gender;

        globalRank = (
          <Link
            href={"/martialart/" + entry.activityId + "/ranking" + sharedParams}
          >
            <a>
              <p className="link link-primary flex space-x-2">
                <PublicIcon />{" "}
                <span>
                  #{globalValue}/ {globalTotal}
                </span>
              </p>
            </a>
          </Link>
        );

        countryRank = (
          <Link
            href={
              "/martialart/" +
              entry.activityId +
              "/ranking" +
              sharedParams +
              "&country=" +
              fighterData.nationalityCountryCode
            }
          >
            <a>
              <p className="link link-primary flex space-x-2">
                {FlagComponent(fighterData.nationalityCountryCode, 30)}{" "}
                <span>
                  #{countryValue}/ {countryTotal}
                </span>
              </p>
            </a>
          </Link>
        );
      }

      recordElements.push(
        <div className="p-5">
          <div className="flex space-x-5">
            {globalRank}
            {countryRank}
          </div>

          <div className="pl-5 pr-5 flex">
            <div className="w-3/12">
              <p className="recordValue">{entry.win}</p>
              <p className="recordLabel">WIN</p>
            </div>
            <div className="w-3/12">
              <p className="recordValue">{entry.loss}</p>
              <p className="recordLabel">LOSS</p>
            </div>
            <div className="w-3/12">
              <p className="recordValue">{entry.draw}</p>
              <p className="recordLabel">DRAW</p>
            </div>
            <div className="w-3/12">
              <p className="recordValue">{entry.noContest}</p>
              <p className="recordLabel">NC</p>
            </div>
            {/* <div className="w-3/12">
            <p className="recordValue">{fighterData.elo[entry.activityId]}</p>
            <p className="recordLabel">ELO</p>
          </div> */}

            <HeadingComponent size={1}>
              {/* -N{entry.noContest} */}
            </HeadingComponent>
          </div>
          <div className="flex space-x-10">
            <div className="space-y-2">
              <RecordBreakdownFighterComponent
                label="TKO"
                maxValue={entry.win}
                value={entry.winBreakdown.tko}
              />
              <RecordBreakdownFighterComponent
                label="DEC"
                maxValue={entry.win}
                value={entry.winBreakdown.decision}
              />
              <RecordBreakdownFighterComponent
                label="SUB"
                maxValue={entry.win}
                value={entry.winBreakdown.sub}
              />
              <RecordBreakdownFighterComponent
                label="DQ"
                maxValue={entry.win}
                value={entry.winBreakdown.dq}
              />
            </div>
            <div className="space-y-2">
              <RecordBreakdownFighterComponent
                label="TKO"
                maxValue={entry.loss}
                value={entry.lossBreakdown.tko}
              />
              <RecordBreakdownFighterComponent
                label="DEC"
                maxValue={entry.loss}
                value={entry.lossBreakdown.decision}
              />
              <RecordBreakdownFighterComponent
                label="SUB"
                maxValue={entry.loss}
                value={entry.lossBreakdown.sub}
              />
              <RecordBreakdownFighterComponent
                label="DQ"
                maxValue={entry.loss}
                value={entry.lossBreakdown.dq}
              />
            </div>
          </div>
        </div>
      );
    });
  }

  let navData = [
    ["Overview", ""],
    ["Media", "/media"],
    ["Records", "/record"],
    ["Ranking Breakdown", "/ranking"],
    ["Judge History", "/judge"],
    ["Referee History", "/referee"],
    ["Martial Art Lineage", "/grades"]
  ];
  let nav2elements = navData.map(entry => {
    let currentHighlight = "";

    let buttonLabel = entry[0];
    let buttonLinkId = entry[1];

    if (
      buttonLinkId == "/" + pageId ||
      (pageId == "summary" && buttonLinkId == "")
    ) {
      currentHighlight = "customAccentBackground";
    }

    return (
      <div className="w-2/12">
        <Link href={"/person/" + fighterData.id + buttonLinkId}>
          <a>
            {/* <Avatar
              variant="rounded"
              sx={{ height: 75 }}
              className="w-full"
              src="/audience.png"
            /> */}

            <button className={"btn w-full  " + currentHighlight}>
              {buttonLabel}
            </button>
          </a>
        </Link>
      </div>
    );
  });

  return (
    <BodyHeaderSectionComponent>
      {/* Start of toolbar */}
      <div className="flex w-full">
        <div className="w-6/12">
          <div>
            <div className="flex items-end">
              <HeadingPairCustomComponent
                label1={fighterData.name.toUpperCase()}
              >
                <div className="flex space-x-2 ">{tagElements}</div>
              </HeadingPairCustomComponent>

              {/* <HeadingPairComponent
                  label1={fighterData.name.toUpperCase()}
                  label2={"FIGHTER | REFEREE | JUDGE"}
                  targetLink={"/promotion/"}
                ></HeadingPairComponent> */}

              <div className="flex items-start">
                <HeadingComponent
                  showBar={false}
                  textColor={"customAccentText pl-3 pb-1 "}
                  size={5}
                >
                  {fighterData.nickname ? (
                    <p>"{fighterData.nickname}" </p>
                  ) : null}
                </HeadingComponent>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  w-6/12 justify-end p-3 space-x-8 ">
          {FlagComponent(fighterData.nationalityCountryCode, 80)}
          {SpoilerButtonComponent(handSpoilerChanged, hideSpoilers)}

          <PlaylistWidgetComponent
            entityId={fighterData.id}
            entityType="fighter"
            entityName={fighterData.name}
          />
          <FollowComponent
            followType="fighter"
            followId={fighterData.id}
            isFollowingInitial={false}
          />
          <PopularityComponent
            rankData={fighterData.rankData}
            entityType="fighter"
            entityId={fighterData.id}
          />
        </div>
      </div>
      {/* End of toolbar */}

      {/* Box */}
      <div className="flex my-2">
        <div className="w-3/12">
          {/* Poster */}
          <img
            className="customShadow rounded-xl PageHeaderMainImage"
            src={DATA_SERVER_IMAGE_ADDRESS + fighterData.imageUrl}
          ></img>
        </div>
        <div className="w-5/12">
          {/* Middle Section */}
          {statElements}
        </div>

        <div className={"w-4/12 " + BACKGROUND_ATTR}>
          {isFighter && (
            <div>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                value={recordSummaryTabValue}
                onChange={(event, newValue) => {
                  setRecordSummaryTabValue(newValue);
                }}
              >
                {recordTabElements}
              </Tabs>{" "}
              {recordElements}
            </div>
          )}

          {isReferee && (
            <div>
              <p>
                Referee Bouts:{" "}
                <span className="recordValue">
                  {fighterData.refereedata.count}
                </span>
              </p>
              <Rating value={3} max={5} />
            </div>
          )}
          {isJudge && (
            <div className="pb-1 pt-2 space-y-3">
              <div>
                <p className="text-center w-full font-bold">OUTCOME</p>
                <p className="text-center w-full font-bold text-xl">
                  AGREEMENT
                </p>
              </div>
              {JudgeAlignmentOfficial(judgeData)}

              {JudgeAlignmentCommunity(judgeData)}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-5 mt-10">{nav2elements}</div>
    </BodyHeaderSectionComponent>
  );
};

export default PersonHeaderNavigationComponent;
