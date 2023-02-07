import { Avatar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BACKGROUND_ATTR, DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import { ConverDateToDaysAgoString } from "../../helpers/api";
import AdvertComponent from "../AdvertComponent";
import OnHoverMenuComponent from "../OnHoverMenuComponent";
import HeadingComponent from "../utility/HeadingComponent";




export const RecentQuestionsSectionComponent = ({
  questionData,
  positionData = null,
  displayOriginPosition = true
}) => {
  const router = useRouter();

  let questionElements = questionData.questions.map(entry => {
    return (
      <div className={"flex my-4  py-3 pl-5 " + BACKGROUND_ATTR}>
        <Avatar
          // variant="rounded"
          sx={{ width: 50, height: 50 }}
          src={DATA_SERVER_IMAGE_ADDRESS + "fdsf.jpg"}
          width={100}
        />

        <div className="pl-5">
          <div className="flex space-x-10">
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
            <p>{ConverDateToDaysAgoString(entry.timestamp)}</p>
          </div>
          <div className="flex space-x-1">
            <p>Posted in</p>
            <Link href={"/technique/" + entry.origin.id}>
              <a className="customAccentText  hover:link">
                {entry.origin.name}
              </a>
            </Link>
            {displayOriginPosition && (
              <span className="flex space-x-1">
                <p>from </p>

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

  let title = positionData ? positionData.position.name : "Techniques";

  return (
    <div className="">
      <div className=" flex">
        <div className="w-3/12 px-5 py-3 bg-gray-300 px-10">
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
              sx={{ width: 250, height: 250 }}
              src={
                DATA_SERVER_IMAGE_ADDRESS + positionData.position.imagePreviewId
              }
            />
          )}
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
            Here are posts to avoid making. If you do encounter them, flag them
            for attention from our Guardians.
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

        <div className="w-6/12 pt-5 pl-10">
          <div className="w-full flex pb-1 mb-5 border-b-2 border-gray-300">
            <div className="w-7/12">
              <HeadingComponent size={3}>Recent Questions</HeadingComponent>
            </div>
            <p>Visit a technique video or article to ask a question.</p>
          </div>
          {questionElements}
          <button className="btn w-full customAccentBackground">
            More Questions
          </button>
        </div>
        <div className="w-3/12 space-y-10 p-10">
          <AdvertComponent />
          <AdvertComponent />
          <AdvertComponent />
          <AdvertComponent />
        </div>
      </div>
    </div>
  );
};

export default RecentQuestionsSectionComponent;
