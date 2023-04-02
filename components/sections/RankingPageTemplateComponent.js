import InfoIcon from "@mui/icons-material/Info";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { GetRankingGenericAction } from "../../helpers/api";
import AdvertComponent from "../AdvertComponent";
import FlagComponent from "../FlagComponent";
import { AnimOnHover } from "../utility/AnimationUtility";
import HeadingComponent from "../utility/HeadingComponent";
import {
  BodyColumnSectionComponent,
  BodyColumnResponsiveBottomComponent
} from "./BodyHeaderSectionComponent";
import { IsLoggedInLoginPrompt } from "config";

export const RankingPageTemplateComponent = ({
  pageTitle = "",
  pageSubTitle = "",
  initialRankingData = null,
  promoId = null,
  activityId = null,
  divisionId = null,
  divisionData = [],
  styleData = null
}) => {
  const router = useRouter();
  useEffect(() => {
    console.log("Query Debug");
    console.log(router);
    let query = router.query;
    if (Object.keys(query).length > 0) {
      console.log("User has requested custom rank");

      let triggerFresh = false;
      if ("activity" in query) {
        console.log("Activity Detected");
        setActivity(query.activity);
        triggerFresh = true;
      }

      if ("gender" in query) {
        console.log("Gender Detected");
        console.log(query.gender);
        setGender(query.gender);
        triggerFresh = true;
      }

      if ("country" in query) {
        console.log("Country Detected");
        console.log(query.country);
        setCountryValue(query.country);
        triggerFresh = true;
      }
      if ("type" in query) {
        console.log(query.country);
        let v = null;
        if (query.time == "peak") {
          v = null;
        } else if (query.time == "current") {
          v = true;
        }

        setPeakSnaphot(v);
        triggerFresh = true;
      }

      if ("time" in query) {
        console.log("time Detected");
        console.log(query.country);
        let v = null;
        if (query.time == "current") {
          v = true;
        } else if (query.time == "all") {
          v = false;
        }

        setStatus(v);
        triggerFresh = true;
      }

      if (triggerFresh) RefreshData();
    }
  }, [router]);

  useEffect(() => {
    if (activityId) setActivity(activityId);
  }, []);

  const [divisionSelectorId, setDivisionSelectorId] = React.useState(
    divisionId
  );
  const [peakSnaphot, setPeakSnaphot] = React.useState(null);
  const [activity, setActivity] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const [rankingData, setRankingData] = useState(null);
  const [countryValue, setCountryValue] = useState("all");
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  console.log("Ranking Data");
  console.log(rankingData);

  let styleElements = styleData
    ? styleData.dataList.map(entry => {
        return <option value={entry.id}>{entry.name} </option>;
      })
    : [];

  function RefreshData() {
    console.log("Fetching new rankings");
    let newCountry = countryValue;
    if (countryValue == "all") {
      newCountry = null;
    }

    let newStatus = status;
    if (
      newStatus == "all" ||
      newStatus == null ||
      newStatus == false ||
      newStatus == "false"
    ) {
      newStatus = null;
    }

    let newGender = gender;
    if (gender == "all") {
      console.log("Culling Gender");
      newGender = null;
    }

    setRankingData(null);
    GetRankingGenericAction(
      activity,
      50,
      newStatus,
      newCountry,
      newGender,

      divisionSelectorId,
      promoId,
      peakSnaphot
    ).then(data => {
      console.log("updated ranking");
      console.log(data);

      setRankingData(data);
    });

    setRefresh(!refresh);
  }

  function normaliseSliderValue(value, tempMax) {
    return ((value - 1000) * 100) / (tempMax - 1000);
  }

  function PointBar(value, maxValue) {
    var tempMax = Math.max(value, maxValue);

    let percentage = 0;
    if (value != 0) percentage = normaliseSliderValue(value, tempMax);
    return (
      <div>
        <LinearProgress
          variant="determinate"
          sx={{ width: 140, height: 8 }}
          value={percentage}
        />
      </div>
    );
  }

  let divisionSelectorElement = null;
  if (divisionData) {
    let otherDivisionElements = divisionData.map(entry => {
      return (
        <option value={entry.id}>
          {entry.weightValue} lbs - {entry.martialArt} - {entry.name} - (
          {entry.gender})
        </option>
      );
    });
    otherDivisionElements.unshift(<option value={null}>All</option>);

    divisionSelectorElement = (
      <select
        onChange={e => {
          setDivisionSelectorId(e.target.value);
        }}
        className="form-select text-black w-full"
      >
        {otherDivisionElements}
      </select>
    );
  }

  let ii = 0;

  let explainedButton = (
    <a
      className="link customAccentText w-full"
      onClick={() => {
        router.push("/rankings/explained");
      }}
    >
      How are rankings calculated? <InfoIcon />
    </a>
  );

  let rankingElements = <div className="space-y-10"></div>;

  if (rankingData) {
    rankingElements = rankingData.data.map(entry => {
      ii += 1;

      let ncElement = null;
      if (entry.nc > 0) {
        ncElement = "  " + entry.nc + " NC";
      }

      return (
        <Link href={"/person/" + entry.id}>
          <a>
            <motion.div
              key={refresh}
              // exit={{ x: -0, opacity: 0 }}
              initial={{ y: 100, opacity: 0, duration: 10 }}
              animate={{ y: 0, opacity: 1, duration: 10 }}
              className="text-center justify-center ..."
            >
              <div className={"w-12/12 p-2 mt-1 bg-gray-50 rounded"}>
                <div className="flex">
                  <div className="w-1/12 pl-2 text-center customAccentText font-bold">
                    #{ii}
                  </div>

                  <div className="flex w-7/12 font-bold link pl-5 customAccentText link ">
                    {FlagComponent(entry.nationalityCountryCode, 20)}{" "}
                    {entry.name}{" "}
                    {entry.nickname
                      ? "'" + entry.nickname.toString() + "'"
                      : null}
                  </div>

                  <div className="w-4/12 font-bold flex">
                    {PointBar(entry.score, 2200)} {entry.score}{" "}
                    <Link href={"/person/" + entry.id + "/ranking"}>
                      <a>
                        <AnimOnHover scalar={1.5}>
                          <UnfoldMoreIcon />
                        </AnimOnHover>
                      </a>
                    </Link>
                  </div>

                  <div className="w-2/12 font-bold">
                    {entry.win}-{entry.loss}-{entry.draw}
                    {ncElement}
                  </div>
                </div>
              </div>{" "}
            </motion.div>
          </a>
        </Link>
      );
    });

    rankingElements.unshift(
      <div className="flex  w-12/12  customAccentBackground rounded ...">
        <div className="w-1/12 text-center font-bold text-white">RANK</div>
        <div className="w-7/12 text-center font-bold text-white">NAME</div>
        <div className="w-4/12 font-bold text-white">POINTS</div>
        <div className="w-2/12 font-bold text-white">RECORD (W,L,D)</div>
      </div>
    );

    let advertRange = 15;
    let i = 0;
    for (let i = advertRange; i < rankingElements.length; i += advertRange) {
      rankingElements.splice(
        i,
        0,
        <div className="py-5">
          <AdvertComponent />
        </div>
      );
    }
  }

  let bodyElement = null;
  if (loading) {
    bodyElement = <progress className="progress w-8/12"></progress>;
  } else {
    bodyElement = (
      <div>
        <div key={refresh} className="mt-1">
          {rankingElements}
        </div>
      </div>
    );
  }

  return (
    <div>
      <BodyColumnResponsiveBottomComponent
        twoSections={true}
        sideContent={
          <div className="px-10">
            {/* <HeadingComponent size={3} showBar={true}>
              {pageTitle}
            </HeadingComponent> */}
            <div className="text-white  space-x-5 space-y-5">
              <div className="text-white font-bold ">
                <p className="customAccentText">MARTIAL ART</p>
                <select
                  value={activity}
                  onChange={e => {
                    let val = e.target.value;
                    if (val == "all") {
                      val = null;
                    }

                    setActivity(val);
                  }}
                  className="form-select text-black w-full"
                >
                  <option value={"all"}>Select a Martial Art</option>
                  {styleElements}
                </select>
              </div>

              <div className="text-white font-bold ">
                <p className="customAccentText">NATIONALITY</p>

                <CountryDropdown
                  defaultOptionLabel={"All Countries"}
                  style={{ color: "black", width: "100%" }}
                  value={countryValue ? countryValue.toUpperCase() : null} //This component requires uppercase values
                  valueType={"short"}
                  onChange={(val, t2) => {
                    console.log("Country Changed");

                    setCountryValue(val);
                  }}
                />
              </div>

              <div className="text-white font-bold ">
                <p className="customAccentText">GENDER</p>
                <select
                  value={gender}
                  onChange={e => {
                    setGender(e.target.value);
                  }}
                  className="form-select text-black w-full"
                >
                  <option value={null} selected>
                    all{" "}
                  </option>
                  <option value={"m"}>Male </option>
                  <option value={"f"}>Female </option>
                </select>
              </div>
              <div className="text-white font-bold ">
                <p className="customAccentText">TIME FRAME</p>
                <select
                  value={status}
                  onChange={e => {
                    setStatus(e.target.value);
                  }}
                  className="form-select text-black w-full"
                >
                  <option value={false}>All Time</option>
                  <option value={true}>Active </option>
                </select>
              </div>
              <div className="text-white font-bold ">
                <p className="customAccentText">RANK TYPE</p>
                <select
                  value={peakSnaphot}
                  onChange={e => {
                    setPeakSnaphot(e.target.value);
                  }}
                  className="form-select text-black w-full"
                >
                  <option value={null} selected>
                    Latest Rank
                  </option>
                  <option value={true}>Peak Rank</option>
                </select>
              </div>
              <div className="text-white font-bold ">
                <p className="customAccentText">FIGHT TYPE</p>
                <select
                  onChange={e => {
                    // setPeakSnaphot(e.target.value);
                  }}
                  className="form-select text-black w-full"
                >
                  <option value={null} selected>
                    all
                  </option>
                  <option value={"p"}>Professional</option>
                  <option value={"a"}>Amateur</option>
                </select>
              </div>

              {divisionData && divisionData.length > 0 && (
                <div className="text-white font-bold">
                  <p className="customAccentText">DIVISIONS</p>
                  {divisionSelectorElement}
                </div>
              )}

              {/* <button
                className="btn customAccentBackground w-full"
                onClick={() => {
                  RefreshData();
                }}
              >
                Show Followed Rankings TODO
              </button> */}

              {explainedButton}
              <button
                className="btn customAccentBackground w-full"
                onClick={() => {
                  if (
                    IsLoggedInLoginPrompt(
                      "Sign in to perform additional filtering"
                    )
                  ) {
                    RefreshData();
                    // setLoading(true);
                    // setRefresh(!refresh);
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        }
        mainContent={<div className="">{bodyElement}</div>}
      />
    </div>
  );
};

export default RankingPageTemplateComponent;
