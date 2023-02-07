import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import YearSelectorComponent from "../YearSelectorComponent";





function PreprocessType(category, timeFrame) {
  if (category == "record" && timeFrame != "") {
    return "record/annual";
  }

  return category;
}

export const DivisionSelectorComponent = ({
  divisionData, //Other divisions in the current promoter,We can grab teh current promoId here
  subTypeId, //"<id>"
  subType, //"division|style|promotion"
  category, //"record|favourite|decision"
  timeFrame, //"null for all|yearNumber",
  yearList,
  recordId = null,
  recordSetData = null
}) => {
  let highlight = " btn-primary ";
  let router = useRouter();

  let promoId = null;
  if (divisionData) promoId = divisionData[0].promoId;

  let typeElements = [];
  typeElements.push(
    <option
      value={"/" + subType + "/" + subTypeId + "/" + "decision"}
      selected={category == "decision"}
    >
      QUESTIONABLE DECISIONS
    </option>
  );
  typeElements.push(
    <option
      value={"/" + subType + "/" + subTypeId + "/" + "favourite"}
      selected={category == "favourite"}
    >
      BEST FIGHTS
    </option>
  );
  typeElements.push(
    <option
      value={
        "/" +
        subType +
        "/" +
        subTypeId +
        "/" +
        "record" +
        (timeFrame == "" ? "" : "/annual/" + timeFrame)
      }
      selected={category == "record" || category == "record/annual"}
    >
      FIGHT RECORDS
    </option>
  );

  let timeElements = [];
  timeElements.push(
    <Link
      href={
        "/" +
        subType +
        "/" +
        subTypeId +
        "/" +
        category +
        (recordId ? "/" + recordId : "")
      }
      className="p-1"
    >
      <a>
        {" "}
        <button className={"btn w-full" + (timeFrame == "" ? highlight : "")}>
          All Time
        </button>
      </a>
    </Link>
  );

  timeElements.push(
    <Link
      href={
        "/" +
        subType +
        "/" +
        subTypeId +
        "/" +
        PreprocessType(category, "2019") +
        "/" +
        "2018" +
        (recordId ? "/" + recordId : "")
      }
      className="p-1"
    >
      <a>
        {" "}
        <button className={"btn w-full" + (timeFrame != "" ? highlight : "")}>
          Annual ({timeFrame})
        </button>
      </a>
    </Link>
  );

  // let timeElements = [];
  // let subTypeId = "<id>"
  // let SubType = "division|style|promotion"
  // let category = "record|favourite|decision"
  // let timeFrame = "None for all|year"

  // let finalDivisionUrl = subType + subTypeId + category + timeFrame
  // let timeFrameUrl = subType + subTypeId + category + timeFrame
  // let allDivisionsInPromo = "/promotion/" + promoId + category + timeFrame

  // /division/id/record/
  // /division/id/record/annual/<year>/
  // /division/id/favourite
  // /division/id/favourite/<year>
  // /division/id/decision/</year>
  // /division/id/decision

  let otherRecordElements = [];
  if (recordSetData) {
    otherRecordElements = recordSetData.categories.map(entry => {
      let isCurrent = entry.url == recordId;

      return (
        <option
          value={
            "/" +
            subType +
            "/" +
            subTypeId +
            "/" +
            PreprocessType(category, timeFrame) +
            "/" +
            (timeFrame != "" ? timeFrame + "/" : "") +
            entry.url
          }
          selected={isCurrent}
        >
          {entry.name}
        </option>
      );
    });

    otherRecordElements.unshift(
      <option
        value={
          "/" +
          subType +
          "/" +
          subTypeId +
          "/" +
          PreprocessType(category, timeFrame)
        }
      >
        All Records
      </option>
    );
  }

  let otherDivisionElements = [];
  if (divisionData) {
    otherDivisionElements = divisionData.map(entry => {
      let isCurrent =
        subType == "division" && entry.id == subTypeId ? highlight : "";

      return (
        <option
          value={
            "/division/" +
            entry.id +
            "/" +
            PreprocessType(category, timeFrame) +
            "/" +
            timeFrame +
            (recordId ? "/" + recordId : "")
          }
          selected={isCurrent}
        >
          {entry.weightValue} lbs - {entry.martialArt} - {entry.name} - (
          {entry.gender})
        </option>
      );
    });
  }

  let isRootPromo = subType == "promotion" ? highlight : "";

  otherDivisionElements.unshift(
    <option
      value={
        "/promotion/" +
        promoId +
        "/" +
        PreprocessType(category, timeFrame) +
        "/" +
        timeFrame +
        (recordId ? "/" + recordId : "")
      }
      selected={isRootPromo}
    >
      All
    </option>
  );

  return (
    <div className="flexwrap">
      {/* <div className="w-6/12 pl-5 pr-5">
        <p className="font-bold customAccentText text-2xl  text-center">
          LEGACY TYPE
        </p>
        <select
          onChange={e => {
            router.push(e.target.value);
          }}
          className="select select-info select-bordered select-lg max-w-xs"
        >
          {typeElements}
        </select>
      </div> */}
      <div className="w-4/12">
        <p className="font-bold customAccentText text-2xl  text-center">
          TIME FRAME
        </p>
        {timeElements}{" "}
        {timeFrame != "" && (
          <YearSelectorComponent
            yearList={yearList}
            currentYear={Number(timeFrame)}
            subUrl={
              "/" +
              subType +
              "/" +
              subTypeId +
              "/" +
              PreprocessType(category, timeFrame) +
              "/"
            }
            subUrlPostFix={recordId ? "/" + recordId : ""}
          />
        )}
      </div>
      <div className="w-6/12">
        {subType != "style" && (
          <div>
            <p className="font-bold customAccentText text-2xl text-center">
              DIVISIONS
            </p>
            <select
              onChange={e => {
                router.push(e.target.value);
              }}
              className="select select-info select-bordered select-lg max-w-xs"
            >
              {otherDivisionElements}
            </select>
          </div>
        )}
      </div>

      {!!recordId && otherRecordElements.length > 0 && (
        <div className="w-6/12">
          <div>
            <p className="font-bold customAccentText text-2xl text-center">
              Record Type
            </p>
            <select
              onChange={e => {
                console.log("Moving to ");
                console.log(e.target.value);
                router.push(e.target.value);
              }}
              className="select select-info select-bordered select-lg w-full"
            >
              {otherRecordElements}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionSelectorComponent;
