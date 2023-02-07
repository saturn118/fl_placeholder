import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { GetGradesGenericAction } from "../../helpers/api";
import BeltComponent from "../BeltComponent";
import FlagComponent from "../FlagComponent";
import BodyHeaderSectionComponent from "../sections/BodyHeaderSectionComponent";
import HeadingPairComponent from "../utility/HeadingPairComponent";
const GradePageTemplateComponent = ({
  title,
  subtitle,
  activityListOptional = null,
  activityId,
  gradeData,
  promoId = null,
  divisionId = null,
  gymId = null,
  description = null,
  displayPromoCountry = false,
  displayGender = true,
  displayGym = true
}) => {
  const [grade, setGrade] = useState(null);
  const [gender, setGender] = useState(null);
  const [sort, setSort] = useState("alphabetical");
  const [nationalityValue, setNationalityValue] = useState("all");
  const [countryValue, setCountryValue] = useState("all");
  const [resultData, setResultData] = useState(null);
  const [year, setYear] = useState(null);
  const [page, setPage] = useState(0);
  const [refreshed, setRefreshed] = useState(false);

  let gradeMap = {};

  const router = useRouter();
  useEffect(() => {
    RefreshData();
  }, []);
  useEffect(() => {
    console.log("Query Debug");
    console.log(router);
    let query = router.query;
    if (Object.keys(query).length > 1) {
      console.log("User has requested custom rank");

      let triggerFresh = false;
      if ("activity" in query) {
        console.log("Activity Detected");
        setActivity(query.activity);
        triggerFresh = true;
      }

      if ("nationality" in query) {
        setNationalityValue(query.nationality);
        triggerFresh = true;
      }

      if ("page" in query) {
        setPage(query.page);
        triggerFresh = true;
      }

      if ("year" in query) {
        setYear(query.year);
        triggerFresh = true;
      }

      if ("country" in query) {
        setCountryValue(query.country);
        triggerFresh = true;
      }

      if ("gender" in query) {
        setGender(query.gender);
        triggerFresh = true;
      }

      if ("grade" in query) {
        setGrade(query.grade);
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

  let total = 0;

  console.log("Grade Data");
  console.log(gradeData);

  let gradeList = gradeData;
  gradeList.reverse();

  let activityIdToNameMap = {};
  if (activityListOptional) {
    activityListOptional.map(entry => {
      activityIdToNameMap[entry.id] = entry;
    });
  }

  let gradeElements = gradeList.map(entry => {
    gradeMap[entry.id] = entry;
    return <option value={entry.id}>{entry.name}</option>;
  });
  console.log("Grade map");
  console.log(gradeMap);
  console.log(gradeList);

  if (gradeElements.length == 0) {
    gradeElements = <p>No grades Detected</p>;
  }

  let resultElements = [];
  if (resultData && "data" in resultData) {
    resultElements = resultData.data.map(entry => {
      let name = null;
      if ("grade" in entry) name = entry.grade;

      let gymName = null;
      if (displayGym && entry.gym.name) {
        gymName = (
          <Link href={"/gym/" + entry.gym.id}>
            <a>
              <p>({entry.gym.name})</p>
            </a>
          </Link>
        );
      }

      let activityElement = null;
      if (activityListOptional) {
        let associatedActivityInstance =
          activityIdToNameMap[gradeMap[entry.grade].activity];

        activityElement = (
          <Link href={"/martialart/" + associatedActivityInstance.id}>
            <a className="link link-primary">
              <p>({associatedActivityInstance.name})</p>
            </a>
          </Link>
        );
      }

      return (
        <div className={"w-12/12 p-2 mt-1 bg-gray-50 rounded"}>
          <Link href={"/person/" + entry.id}>
            <a>
              <div className="flex">
                <div className="w-3/12 ">
                  <Link href={"/person/" + entry.id}>
                    <a className="link link-primary flex space-x-4">
                      {FlagComponent(entry.country, 30)}
                      <p>{entry.name}</p>
                    </a>
                  </Link>
                </div>
                <div className="w-4/12 flex space-x-4">
                  {BeltComponent(gradeMap[entry.grade].imageUrl, 70)}{" "}
                  <p>{gradeMap[entry.grade].name}</p>
                  {activityElement}
                </div>

                {/* <div className="w-3/12">gym name</div> */}
                <div className="w-5/12">
                  <Link href={"/person/" + entry.instructor.id}>
                    <a className="link link-primary flex space-x-4">
                      {" "}
                      {FlagComponent(entry.instructor.country, 30)}
                      <p>{entry.instructor.name}</p>
                      {gymName}
                    </a>
                  </Link>
                </div>
                <div className="w-2/12">{entry.date}</div>
                {/* <div className="w-1/12">
                  <CheckCircleIcon color="primary" />
                </div> */}
              </div>
            </a>
          </Link>
        </div>
      );
    });
  }

  resultElements.unshift(
    <div className="flex  w-12/12  customAccentBackground rounded ...">
      <div className="w-3/12 font-bold text-white">NAME</div>
      <div className="w-3/12 font-bold text-white">RANK</div>

      <div className="w-4/12 font-bold text-white">INSTRUCTOR</div>
      <div className="w-2/12 font-bold text-center  text-white">YEAR</div>
      {/* <div className="w-2/12 font-bold text-center text-white">VERIFIED</div> */}
    </div>
  );

  function RefreshData() {
    let nation = nationalityValue;
    let promoCountry = countryValue;
    let gradeNew = grade;
    if (nation == "all") {
      nation = null;
    }
    if (grade == "all") {
      gradeNew = null;
    }
    if (promoCountry == "all") {
      promoCountry = null;
    }

    GetGradesGenericAction(
      activityId,
      nation,
      gender,
      gradeNew,
      promoCountry,
      promoId,
      gymId,
      year,
      divisionId,
      page
    ).then(data => {
      console.log("updated ranking");
      console.log(data);

      setRefreshed(!refreshed);
      setResultData(data);
    });
  }

  let yearElements = [];
  for (let i = 2022; i > 1900; i--) {
    yearElements.push(<option value={i}>{i}</option>);
  }
  yearElements.unshift(<option value={null}>All</option>);

  return (
    <div>
      <BodyHeaderSectionComponent>
        <div className="container " id="top">
          <div className="mb-5">
            <HeadingPairComponent
              label1={title}
              label2={subtitle}
              targetLink={""}
            ></HeadingPairComponent>
          </div>

          <p className="text-white pb-5">
            {description}
            TODO - Add activity to each entry description
          </p>

          <div className="text-white flex space-x-5">
            <div className="text-white font-bold w-2/12">
              <p className="customAccentText">GRADE</p>
              <select
                value={grade}
                onChange={e => {
                  setGrade(e.target.value);
                }}
                className="form-select text-black w-full"
              >
                <option value={null}>all </option>
                {gradeElements}
              </select>
            </div>

            <div className="text-white font-bold w-2/12">
              <p className="customAccentText">NATIONALITY</p>

              <CountryDropdown
                defaultOptionLabel={"All"}
                style={{ color: "black", width: "100%" }}
                value={nationalityValue ? nationalityValue.toUpperCase() : null} //This component requires uppercase values
                valueType={"short"}
                onChange={(val, t2) => {
                  console.log("Country Changed");
                  setNationalityValue(val);
                }}
              />
            </div>

            {displayPromoCountry && (
              <div className="text-white font-bold w-2/12">
                <p className="customAccentText">COUNTRY</p>

                <CountryDropdown
                  defaultOptionLabel={"All"}
                  style={{ color: "black", width: "100%" }}
                  value={countryValue ? countryValue.toUpperCase() : null} //This component requires uppercase values
                  valueType={"short"}
                  onChange={(val, t2) => {
                    console.log("Country Changed");
                    setCountryValue(val);
                  }}
                />
              </div>
            )}

            {displayGender && (
              <div className="text-white font-bold w-2/12">
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
            )}

            <div className="text-white font-bold w-2/12">
              <p className="customAccentText">Sort By</p>
              <select
                value={sort}
                onChange={e => {
                  setSort(e.target.value);
                }}
                className="form-select text-black w-full"
              >
                <option value={"alphabetical"}>Aphabetical</option>
                <option value={"recent"}>Recently Promoted</option>
                <option value={"age-ascending"}>Age Ascending</option>
                <option value={"age-descending"}>Age Descending</option>
              </select>
            </div>

            <div className="text-white font-bold w-2/12">
              <p className="customAccentText">Year</p>
              <select
                value={year}
                onChange={e => {
                  setYear(e.target.value);
                }}
                className="form-select text-black w-full"
              >
                {yearElements}
              </select>
            </div>
          </div>
          <div className="flex w-12/12">
            <button
              className="btn w-6/12 font-bold customAccentBackground mt-5"
              onClick={() => {
                RefreshData();
              }}
            >
              REFRESH
            </button>
          </div>
        </div>
      </BodyHeaderSectionComponent>
      <div className="container">
        <motion.div
          key={refreshed}
          exit={{ x: 100, opacity: 0, duration: 1000 }}
          initial={{ x: -500, opacity: 0, duration: 1000 }}
          animate={{ x: 0, opacity: 1, duration: 1000 }}
          className="text-center justify-center mt-10 ..."
        >
          {resultElements}
        </motion.div>
        {resultElements.length > 1 && (
          <div className="flex w-12/12 mt-5 pb-5 justify-center">
            <Pagination
              count={resultData.totalpages}
              defaultPage={page} //resultData.currentPage}
              siblingCount={3}
              size="large"
              color="primary"
              hide
              onChange={(event, pageNumber) => {
                setPage(pageNumber);
                RefreshData();
                router.push("#top");
                // router.push(
                //   "/martialart/" + activityId + "/grades?page=" + pageNumber
                // );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GradePageTemplateComponent;
