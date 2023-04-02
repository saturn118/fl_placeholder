import { Avatar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BACKGROUND_ATTR, DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import { ConverDateToDaysAgoString } from "../../helpers/api";
import AdvertComponent from "../AdvertComponent";
import OnHoverMenuComponent from "../OnHoverMenuComponent";
import HeadingComponent from "../utility/HeadingComponent";
import { BodyColumnResponsiveBottomComponent } from "./BodyHeaderSectionComponent";
import HeadingPairComponent from "@components/utility/HeadingPairComponent";

export const RecentQuestionsSectionComponent = ({
  questionData,
  positionData = null,
  displayOriginPosition = true
}) => {
  const router = useRouter();

  let questionElements = questionData.questions.map(entry => {
    return (
      <div className={"flex p-1" + BACKGROUND_ATTR}>
        <Avatar
          className="hide_on_small "
          // variant="rounded"
          sx={{ width: 50, height: 50 }}
          src={DATA_SERVER_IMAGE_ADDRESS + "fdsf.jpg"}
          width={100}
        />

        <div className="">
          <div className="flex ">
            <OnHoverMenuComponent
              anchorHorizontalCustom="center"
              popupContent={
                <div className="flex">
                  <Avatar
                    variant="rounded"
                    sx={{ width: 100, height: 100 }}
                    src={DATA_SERVER_IMAGE_ADDRESS + "fdsf.jpg"}
                    width={100}
                  />
                  <div>
                    Verified
                    <p>Martial art 1 - rank A</p>
                    <p>Martial art 1 - Rank B</p>
                    <p>competitor</p>
                    <p>teacher</p>
                    <p>member since 2011</p>
                    <p>points</p>
                    <p>w-l-d</p>
                    <p>Flag</p>
                  </div>
                </div>
              }
            >
              <Link href={"/user/" + entry.username}>
                <a className="customAccentText  hover:link">{entry.username}</a>
              </Link>
            </OnHoverMenuComponent>
            <p className="pl-2">{ConverDateToDaysAgoString(entry.timestamp)}</p>
          </div>
          <div className="flex space-x-1">
            <p className="hide_on_small">Posted in</p>
            <Link href={"/technique/" + entry.origin.id}>
              <a className="customAccentText  hover:link">
                {entry.origin.name}
              </a>
            </Link>
            {displayOriginPosition && (
              <span className="flex space-x-1">
                <p> - </p>

                <OnHoverMenuComponent
                  anchorHorizontalCustom="center"
                  popupContent={
                    <div className="flex">
                      <Avatar
                        variant="rounded"
                        sx={{ width: 150, height: 150 }}
                        src={DATA_SERVER_IMAGE_ADDRESS + "fdsf.jpg"}
                        width={100}
                      />
                    </div>
                  }
                >
                  <Link href={"/position/" + entry.origin.positionId}>
                    <a className="customAccentText  hover:link">
                      {entry.origin.positionName} : {entry.origin.role}
                    </a>
                  </Link>
                </OnHoverMenuComponent>
              </span>
            )}
          </div>

          <p>{entry.reviewText}</p>
        </div>
      </div>
    );
  });

  let title = positionData
    ? positionData.position.name.toUpperCase()
    : "Techniques";

  return (
    <BodyColumnResponsiveBottomComponent
      sideContent={
        <div className="pl-5 py-3 bg-gray-300 px-10">
          <HeadingComponent size={2}>{title.toUpperCase()}</HeadingComponent>

          {positionData && (
            <Link href={"/position/" + positionData.position.id}>
              <a className="customAccentText hover:link">Back to Position</a>
            </Link>
          )}

          {positionData && (
            <Avatar
              className=""
              variant="rounded"
              // sx={{ width: 250, height: 250 }}
              className="imgR"
              src={
                DATA_SERVER_IMAGE_ADDRESS + positionData.position.imagePreviewId
              }
            />
          )}

          <div className="hide_on_small">
            <p className="border-gray-400 border-b-2 pt-3">
              <HeadingComponent size={3}>Give a great answer</HeadingComponent>
            </p>
            <p>Be a guide</p>
            <p>
              We're teaching each other – so don't just answer "Yes" or "No",
              share your answer the way your favorite teacher would.
            </p>
            <p>Vote, don't echo</p>
            <p>
              If someone has already answered the question well, don't repeat
              their answer – vote it up instead.{" "}
            </p>
            <p className="border-gray-400 border-b-2 pt-3">
              <HeadingComponent size={3}>
                Flag inappropriate posts
              </HeadingComponent>
            </p>

            <p>
              Here are posts to avoid making. If you do encounter them, flag
              them for attention from our Guardians.
            </p>
            <p>abuse</p>
            <ul>
              <li>disrespectful or offensive</li>
              <li> an advertisement</li>
            </ul>
            <p>not helpful</p>
            <ul>
              <li>low quality not about the video topic </li>
              <li> contentious posts about politics, religion/atheism</li>
              <li>soliciting votes or seeking badges</li>
              <li>a duplicate answer</li> repeatedly
              <li>making the same post</li>
            </ul>
          </div>
        </div>
      }
      mainContent={
        <div>
          <div className="flex_full_on_big px-2 pt-2">
            <div className="">
              <HeadingComponent size={3} showBar={true}>
                QUESTIONS
              </HeadingComponent>
            </div>
            <p>Visit a technique page to ask a question.</p>
          </div>
          <div className="space-y-1 mt-3">
            {questionElements}
            <button className="btn mt-2 clickupShadow w-full customAccentBackground">
              More Questions
            </button>
          </div>
        </div>
      }
    />
  );
};

export default RecentQuestionsSectionComponent;
