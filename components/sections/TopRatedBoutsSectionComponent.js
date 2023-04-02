import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress, Skeleton, Button } from "@mui/material";
import Link from "next/link";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import React, { useState } from "react";
import { BACKGROUND_ATTR } from "../../config";
import {
  GetControDecisionsAction,
  GetHighestBoutsAction
} from "../../helpers/api";
import { UserRatingComponent } from "../UserRatingPopupComponent";
import {
  BodyColumnSectionComponent,
  BodyColumnResponsiveBottomComponent
} from "./BodyHeaderSectionComponent";
import BoutCompactComponent from "@components/Bouts/BoutCompactComponent";

export const TopRatedBoutsSectionComponent = ({
  ratedBoutsData,
  styleData = null,
  promoData = null,
  pageType = "activity",
  dataType = "rating",
  inputPromoId = null,
  yearList = []
}) => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(ratedBoutsData);

  const [gender, setGender] = useState(null);
  const [year, setYear] = useState(null);
  const [promotion, setPromotion] = useState(inputPromoId);
  const [promotionDivision, setPromotionDivision] = useState(null);
  const [
    availablePromotionDivisions,
    setAvailablePromotionDivisions
  ] = useState([]);

  const [activity, setActivity] = useState(null);
  let fighterIdNameMap = {};

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

  let yearElements = yearList.map(entry => {
    return <option value={entry}>{entry}</option>;
  });

  let rankIndex = 0;
  let ratedBoutElements = data
    ? data.data.map(entry => {
        rankIndex += 1;

        return <BoutCompactComponent bout={entry.entry} />;

        let attributes =
          dataType == "rating" ? (
            <>
              <div className="w-2/12 flex justify-center">
                <UserRatingComponent
                  label={""}
                  entityId={entry.entry.id}
                  entityType="bout"
                />
                {/* <StarIcon className="text-blue-500" />
          {parseInt(Math.random() * 5)} */}
              </div>
              <div className="w-2/12 flex  justify-center">
                <StarIcon className="text-yellow-500" />
                {entry.rating}
              </div>
            </>
          ) : (
            <>
              <div className="w-2/12 flex justify-center">
                {fighterIdNameMap[entry.entry.winnerId].split(" ")[1]}
              </div>
              <div className="w-2/12 flex  justify-center">
                {100 - entry.percent} %{" "}
              </div>
              <div>
                <Button className="" onClick={() => {}}>
                  <HowToVoteIcon />
                </Button>
              </div>
            </>
          );

        return (
          <div className={BACKGROUND_ATTR + " p-2 flex"}>
            <div className="w-1/12 pl-5"> {rankIndex}.</div>
            <div className="w-6/12 customAccentText hover:link">
              <Link href={"/bout/" + entry.entry.id}>
                <a>
                  {entry.entry.fighterAName} vs {entry.entry.fighterBName}{" "}
                </a>
              </Link>
              <span className="text-gray-500">
                ({new Date(entry.entry.timestamp).getUTCFullYear()})
              </span>
              <span className="text-gray-500"> {entry.entry.activityName}</span>
            </div>
            {attributes}
          </div>
        );
      })
    : null;

  for (let i = rankIndex; i < 250; i++) {
    ratedBoutElements.push(
      <Skeleton className="w-full h-[26x] py-1" variant="rectangular" />
    );
  }

  let styleElements = styleData
    ? styleData.map(entry => {
        return <option value={entry.id}>{entry.name} </option>;
      })
    : null;

  let availableDivisionElements = availablePromotionDivisions.map(entry => {
    return (
      <option value={entry.id}>
        {entry.gender} - {entry.name}
      </option>
    );
  });

  return (
    <BodyColumnResponsiveBottomComponent
      sideContent={
        <div className="p-5">
          <div className="space-y-5">
            <div className="">
              <p className="customAccentText">Martial Art</p>
              <select
                value={activity}
                onChange={e => {
                  let val = e.target.value;

                  if (val == "all") val = null;
                  setActivity(val);
                }}
                className="form-select text-black w-full"
              >
                <option value={"all"}>All</option>
                {styleElements}
              </select>
            </div>

            <div className="">
              <p className="customAccentText">Year</p>
              <select
                value={year}
                onChange={e => {
                  let val = e.target.value;

                  if (val == "all") val = null;
                  setYear(val);
                }}
                className="form-select text-black w-full"
              >
                <option value={"all"}>All Time</option>
                {yearElements}
              </select>
            </div>

            <div className="">
              <p className="customAccentText">Gender</p>
              <select
                value={gender}
                onChange={e => {
                  let val = e.target.value;

                  if (val == "all") val = null;
                  setGender(val);
                }}
                className="form-select text-black w-full"
              >
                <option value={"all"}>All</option>
                <option value={"m"}>Male </option>
                <option value={"f"}>Female</option>
              </select>
            </div>

            {pageType == "activity" && (
              <div className="">
                <p className="customAccentText">Fight Promotion</p>
                <select
                  value={promotion}
                  onChange={e => {
                    let val = e.target.value;

                    if (val == "all") {
                      val = null;
                    } else {
                      GetPromotionDivisionsAction(val).then(data => {
                        setAvailablePromotionDivisions(data.divisions);
                      });
                    }
                    setPromotion(val);
                  }}
                  className="form-select text-black w-full"
                >
                  <option value={null}>All</option>
                  {promotionElements}
                </select>
              </div>
            )}

            <div className="">
              <p className="customAccentText">Division</p>
              <select
                disabled={promotion == null}
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

            <button
              className="btn customAccentBackground text-white w-full"
              onClick={() => {
                setLoading(true);

                if (dataType == "rating") {
                  GetHighestBoutsAction(
                    100,
                    gender,
                    year,
                    activity,
                    promotionDivision,
                    promotion
                  ).then(data => {
                    setLoading(false);
                    setData(data);
                  });
                }
                if (dataType == "decision") {
                  GetControDecisionsAction(
                    100,
                    1,
                    null,
                    null,
                    null,
                    null,
                    promotion
                  ).then(data => {
                    setLoading(false);
                    setData(data);
                  });
                }
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      }
      mainContent={
        <div className="">
          {dataType == "rating" && (
            <div className="flex mb-1 font-bold mt-5 ">
              <p className="w-7/12 pl-5">Rank and Name</p>
              <p className="w-2/12 text-end flex justify-end">Your Rating</p>
              <p className="w-2/12 text-end flex justify-end ">Rating</p>
            </div>
          )}
          {dataType == "decision" && (
            <div className="flex font-bold mt-5 ">
              <p className="w-7/12 pl-5">Rank and Name</p>
              <p className="w-2/12 text-end flex justify-end">Winner</p>
              <p className="w-2/12  justify-center text-center ">
                <p>Community </p>
                <p>Agreement</p>
              </p>
              <p className="w-2/12 text-center  justify-center ">
                <p>My </p>
                <p>Vote</p>
              </p>
            </div>
          )}

          <div className=" space-y-3">
            {!loading && <div className="spacey-2">{ratedBoutElements}</div>}
            {loading && (
              <div>
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default TopRatedBoutsSectionComponent;
