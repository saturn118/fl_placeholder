import StarIcon from "@mui/icons-material/Star";
import { Chip, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { BACKGROUND_ATTR, IsLoggedInLoginPrompt } from "../../config";
import { searchBarBoutAction } from "../../helpers/api";
import AdvertComponent from "../AdvertComponent";
import {
  FightTagSelectorAutocomplete,
  FightTagSelectorPopupComponent
} from "../FightTagSelectorComponent";
import BoutPreviewComponent from "../search/BoutSearchPreviewComponent";
import HeadingComponent from "../utility/HeadingComponent";
import YearSelectorComponent from "../YearSelectorComponent";
import {
  BodyColumnSectionComponent,
  BodyColumnResponsiveBottomComponent
} from "./BodyHeaderSectionComponent";

export const BoutSearchSectionComponent = ({
  styleData = [],
  tagDefinitionsData,
  promoData = null,
  trendingBoutData = null,
  ratedBoutsData = null
}) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [ascending, setAscending] = useState(true);
  const [eventDataLatest, setEventDataLatest] = useState([]);
  const [countryValue, setCountryValue] = useState(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activityId, setActivityId] = useState(null);
  const [gender, setGender] = useState("all");
  const [registrationOpen, setRegistrationOpen] = useState(null);
  const [mapView, setMapView] = useState(false);
  const [promotionDivision, setPromotionDivision] = useState(null);
  const [
    availablePromotionDivisions,
    setAvailablePromotionDivisions
  ] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  let styleMap = {};
  styleData.map(entry => {
    styleMap[entry.id] = entry.name;
  });

  let groupedTagData = [];
  for (const [label, entries] of Object.entries(tagDefinitionsData)) {
    entries.map(entry => {
      groupedTagData.push({ displayName: entry.name, groupName: label });
    });
  }

  function RefreshPromotionDivisions(promoId) {
    GetPromotionDivisionsAction(promoId).then(data => {
      setAvailablePromotionDivisions(data.divisions);
    });
  }

  let ratedBoutElements = ratedBoutsData
    ? ratedBoutsData.data.map(entry => {
        return (
          <div className={BACKGROUND_ATTR + " p-2 flex"}>
            <div className="w-10/12">
              {entry.entry.fighterAName} vs {entry.entry.fighterBName}{" "}
            </div>
            <StarIcon className="text-yellow-500" />
            {entry.rating}
          </div>
        );
      })
    : null;

  console.log("DEBUG TRENDING BOUT DATA");
  console.log(trendingBoutData);
  let trendingBoutElements = trendingBoutData
    ? trendingBoutData.popular.slice(0, 8).map(entry => {
        //TODO, standardize names in the backend
        let entryName = null;
        let entryId = null;

        entryName = entry.entity.name;
        entryId = entry.entity.id;

        let element = entry.entity;

        // return <BoutComponent fighterMap={entry.fighterData} bout={entry} />;

        let fighterAInstance = null;
        let fighterBInstance = null;
        try {
          fighterAInstance = element.fighterData[element.fighterAId];

          fighterBInstance = element.fighterData[element.fighterBId];
        } catch (e) {
          return <div>error rending data</div>;
        }

        return (
          <div className={"w-full p-1 " + BACKGROUND_ATTR}>
            <div className="flex">
              <div className="w-9/12">
                <span>{fighterAInstance.name}</span> vs{" "}
                <span>{fighterBInstance.name}</span>
              </div>

              <Chip label={element.martialArt} />
            </div>
          </div>
        );
      })
    : null;

  const router = useRouter();

  useEffect(() => {
    console.log("Query Debug");
    console.log(router);
    let query = router.query;
    if (Object.keys(query).length > 1) {
      if ("country" in query) {
        setCountryValue(query.country);
      }

      if ("art" in query) {
        setActivityId(query.activity);
      }

      if ("promo" in query) {
        selectedPromotionId(query.promo);
        RefreshPromotionDivisions(query.promo);
      }

      if ("division" in query) {
        setPromotionDivision(query.division);
      }

      if ("gender" in query) {
        setGender(query.gender);
      }

      RefreshData();
    }
  }, [router]);

  function RefreshData() {}

  console.log("Country List");
  console.log(countryValue);

  let MAX_RESULTS = 20;
  let remaining = MAX_RESULTS;
  let eventListResultElements = eventDataLatest
    .filter(entry => {
      remaining -= 1;

      return remaining >= 0;
    })
    .map(entry => {
      return (
        <div className="bg-white w-full">
          <BoutPreviewComponent
            element={entry}
            hideDivision={true}
            hidePromo={true}
          />
        </div>
      );
    });

  let promotionElements = [];
  let i = 0;
  promoData
    ? promoData.names.map(entry => {
        promotionElements.push(
          <option value={promoData.ids[i]}>{entry} </option>
        );
        i += 1;
      })
    : null;
  promotionElements.unshift(<option value={"all"}>All </option>);

  let styleElements = styleData.map(entry => {
    return <option value={entry.id}>{entry.name} </option>;
  });
  styleElements.unshift(<option value={null}>All</option>);

  let availableDivisionElements = availablePromotionDivisions.map(entry => {
    return (
      <option value={entry.id}>
        {entry.gender} - {entry.name}
      </option>
    );
  });

  return (
    <BodyColumnResponsiveBottomComponent
      twoSections={false}
      sideRContent={
        <div>
          <div>
            <HeadingComponent showBar={true} showArrow={true} size={4}>
              Trending
            </HeadingComponent>
            <div className="flexwrap space-y-1">{trendingBoutElements}</div>
          </div>

          <AdvertComponent />
        </div>
      }
      sideContent={
        <div className="p-10">
          <div className=" space-x-5">
            <div className=" w-full">
              <div className="flex">
                <p className="customAccentText w-9/12 flex">
                  <p>Fight Tags</p>
                  <button className="px-2">
                    <FightTagSelectorPopupComponent />
                  </button>
                </p>
                <Link href="/bout/tags" target="_blank">
                  <a className="customAccentText link">view all</a>
                </Link>
              </div>
              <div>
                <FightTagSelectorAutocomplete
                  data={groupedTagData}
                  onChanged={setSelectedTags}
                />
              </div>
            </div>
            <p className="customAccentText">Martial Art</p>
            <select
              className="select w-full select-bordered"
              value={activityId}
              onChange={e => {
                setActivityId(e.target.value);
                forceUpdate();
                // RefreshData();
              }}
            >
              {styleElements}
            </select>
            <p className="customAccentText">Country</p>
            <CountryDropdown
              defaultOptionLabel={"All Countries"}
              style={{ color: "black", width: "100%" }}
              value={countryValue ? countryValue.toUpperCase() : null} //This component requires uppercase values
              valueType={"short"}
              onChange={(val, t2) => {
                console.log("Country Changed");

                setCountryValue(val);

                RefreshData();
                forceUpdate();
              }}
            />
            <p className="customAccentText">Fight Promoter</p>
            <select
              className="select w-full select-bordered"
              onChange={e => {
                let newVal = e.target.value;
                if (newVal == "all") {
                  newVal = null;
                } else {
                  RefreshPromotionDivisions(newVal);
                }

                setSelectedPromotionId(newVal);
                forceUpdate();
              }}
            >
              {promotionElements}
            </select>

            <div className="">
              <p className="customAccentText">Fight Promotion Division</p>
              <select
                // disabled={selectedPromotionId == null}
                value={promotionDivision}
                onChange={e => {
                  let val = e.target.value;

                  if (val == "all") val = null;

                  setPromotionDivision(val);
                }}
                className="form-select text-black w-full"
              >
                <option value={null}>All</option>
                {availableDivisionElements}
              </select>
            </div>

            <div className="flex w-12/12">
              <div className="w-4/12">
                <p className="customAccentText">Start Year</p>

                <YearSelectorComponent
                  placeholder="Start Date"
                  onChanged={year => {
                    setStartDate(year);
                  }}
                />
              </div>
              <div className="w-4/12">
                <p className="customAccentText">End Year</p>
                <YearSelectorComponent
                  placeholder="End Date"
                  onChanged={year => {
                    setEndDate(year);
                  }}
                />
              </div>
            </div>

            <Button
              onClick={() => {
                setAscending(!ascending);
              }}
            >
              {ascending ? "Asc" : null} {!ascending ? "Desc" : null}{" "}
            </Button>

            <p className="customAccentText">Gender</p>
            <select
              className="select w-full select-bordered"
              value={gender}
              onChange={e => {
                setGender(e.target.value);
                forceUpdate();
              }}
            >
              <option value={"all"}>All</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="mix">Male vs Female</option>
            </select>
            <button
              className="btn btn-primary w-full customAccentBackground"
              onClick={() => {
                if (!IsLoggedInLoginPrompt("Sign in to use this feature"))
                  return;

                setLoading(true);

                //TRIM THE SHIT FROM SELECTED TAGS like group name
                let outputSelectedTags = selectedTags.map(entry => {
                  return entry.displayName;
                });

                searchBarBoutAction(
                  outputSelectedTags,
                  startDate,
                  endDate,
                  selectedPromotionId,
                  promotionDivision,
                  gender,
                  activityId,
                  ascending,
                  countryValue
                ).then(data => {
                  setLoading(false);
                  console.log("Tag search ressults found");
                  console.log(data);
                  setEventDataLatest(data.bouts);
                });
              }}
              // disabled={loading}
            >
              REFRESH
            </button>
          </div>
        </div>
      }
      mainContent={
        <div className="p-10 w-full">
          {/* <p>Most Controversial Decisions</p> */}

          <div className="py-10">
            {!loading && (
              <div className=" min-h-screen">
                <HeadingComponent showBar={true} size={3}>
                  Showing first {eventListResultElements.length} results (
                  {eventDataLatest.length})
                </HeadingComponent>

                <div className="pt-5 space-y-2">{eventListResultElements}</div>
              </div>
            )}

            {loading && (
              <div className="w-full justify-center min-h-screen item-center text-center align-center">
                <CircularProgress />
                <p>Searching</p>
                <AdvertComponent />
              </div>
            )}

            <div>
              <p className="justify-center text-center text-3xl">
                {" "}
                <span className="customAccentText">TOP FIGHTS </span>{" "}
                <span>LAST 100 DAYS</span>
              </p>

              <div className="flex">
                <div className="w-4/12 px-1">
                  <p className="justify-center text-center text-xl font-bold mb-2">
                    TRENDING
                  </p>
                  <div>{trendingBoutElements}</div>
                </div>
                <div className="w-4/12 px-1">
                  <p className="justify-center text-center text-xl  font-bold mb-2">
                    BEST RATED
                  </p>
                  {ratedBoutElements}
                </div>
                <div className="w-4/12 px-1">
                  <p className="justify-center text-center text-xl  font-bold mb-2">
                    TRENDING
                  </p>
                  <div>{trendingBoutElements}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default BoutSearchSectionComponent;
