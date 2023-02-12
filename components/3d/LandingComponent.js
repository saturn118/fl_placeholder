import {
  Environment,
  Image,
  MeshReflectorMaterial,
  useCursor
} from "@react-three/drei";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BeltComponent from "@components/BeltComponent";
import ElementSetSummaryComponent from "@components/ElementSetSummaryComponent";
import FightSearchPreviewTagsComponent from "@components/FightSearchPreviewTagsComponent";
import HeadingComponent from "@components/utility/HeadingComponent";
import { Skeleton, TextField, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import SummaryStatComponent from "@components/utility/SummaryStatComponent";
import { COMPANY_NAME, DATA_SERVER_IMAGE_ADDRESS } from "config";
import FlagComponent from "../FlagComponent";

import { AnimAppear, AnimOnHover } from "@components/utility/AnimationUtility";

//Firebase start
import { collection, addDoc } from "firebase/firestore/lite";
import { db, LogSiteAction } from "firebaseconnector";
import PieComponent from "@components/PieComponent";
import ReactPlayer from "react-player";
import { BACKGROUND_ATTR } from "config";
import { UserRatingComponent } from "@components/UserRatingPopupComponent";
import UserStarRatingBreakdownComponent from "@components/UserStarRatingBreakdownComponent";
import { dev } from "config";
import {
  EntryWithOverlayComponent,
  EntryWithCentralOverlayComponent
} from "@components/utility/EntryWithImageComponent";
import SlideshowComponent from "@components/sections/SlideshowComponent";

export default function LandingComponent({
  statsData = null,
  landingData = null
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState(null);

  function TrimFileName(input) {
    console.log("IMAGE ");
    console.log(input);

    if (input && !dev && input.includes("/")) {
      const splitString = input.split("/");

      return splitString[splitString.length - 1];
    } else {
      return input;
    }
  }

  let subSectionSkeletonElement = (
    <div className="w-full bg-green-500">
      <Skeleton className="w-full bg-yellow-500" height={300} />
    </div>
  );

  let statElements = statsData
    ? statsData.stats.map(entry => {
        return (
          <div className="w-2/12 pt-5 pb-5">
            <SummaryStatComponent
              label={entry[0]}
              mainLabel={entry[1]}
              secondaryColor=" clickupColor "
            />
          </div>
        );
      })
    : null;

  function DecisionChart(
    label,
    legendAName,
    legendAValue,
    legendBName,
    legendBValue
  ) {
    return (
      <div>
        <HeadingComponent textColor="justify-center flex w-full" size={6}>
          {label}
        </HeadingComponent>
        <PieComponent
          showLegend={false}
          customData={[
            {
              name: legendAName,
              value: legendAValue
            },
            {
              name: legendBName,
              value: legendBValue
            }
          ]}
        />
        <div className="flex justify-center w-full space-x-5">
          <SummaryStatComponent
            label={legendAName}
            mainLabel={legendAValue.toString()}
            secondaryColor=" clickupColor "
          />

          <SummaryStatComponent
            label={legendBName}
            mainLabel={legendBValue.toString()}
            secondaryColor=" clickupColor "
          />
        </div>
      </div>
    );
  }

  let boutRatingData = [
    {
      fa: "Brock Lesnar",
      fb: "Frank Mir",
      art: "MMA",
      year: "2000",
      ratingValue: 2,
      totalVotes: 35
    },
    {
      fa: "Lenox Lewis",
      fb: "Mike Tyson",
      art: "boxing",
      year: "2000",
      ratingValue: 3.2,
      totalVotes: 85
    },
    {
      fa: "Royce Gracie",
      fb: "Frank Shamrock",
      art: "mma",
      year: "2000",
      ratingValue: 4.5,
      totalVotes: 1223
    },
    {
      fa: "Joe Frazier",
      fb: "Muhammed Ali",
      art: "boxing",
      year: "2000",
      ratingValue: 1,
      totalVotes: 23
    }
  ];

  let beltData = [
    {
      name: "Cris Cyborg",
      flag: "br",
      art: "BJJ",
      belt: "belt_brown",
      year: "2001"
    },
    {
      name: "Ronda Rousey",
      flag: "us",
      art: "Judo",
      belt: "belt_black",
      year: "2001"
    },
    {
      name: "Stephen Thompson",
      flag: "us",
      art: "Kickboxing",
      belt: "belt_black",
      year: "2001"
    },
    {
      name: "Royce Gracie",
      flag: "br",
      art: "BJJ",
      belt: "belt_black",
      year: "2001"
    }
  ];

  let words = [
    "Legacy",
    "Fights",
    "Techniques",
    "Rankings",
    "Lineage",
    "Athletes",
    "Promoters",
    "Tournaments",
    "Champions",
    "Referees",
    "Judges",
    "Instructors"
  ];

  useEffect(() => {
    LogSiteAction("testy");
    var i = 0;
    setInterval(increment, 3000, i);
    function increment() {
      i = i + 1;

      if (i === words.length) {
        i = 0;
      }

      setCurrentIndex(i);
    }
  }, []);

  let tournamentTypes = [];
  for (const [id, data] of Object.entries(landingData.tournamentTypes)) {
    let current = {
      img: "/tournament_types" + data.imageUrl,
      name: data.name,
      id: "",
      link: ""
    };

    tournamentTypes.push(current);
  }

  let highlightWordElement = (
    <span className="customAccentText">
      <AnimAppear key={currentIndex}>
        {words[currentIndex].toUpperCase()}
      </AnimAppear>
    </span>
  );

  function registerSection() {
    return (
      <div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          className="clickupShadow w-10/12 min-h-[50px] "
          label="Enter your Email"
          type="email"
          value={email}
          onChange={e => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }}
        />
        <AnimOnHover
          translate={true}
          speed={0.05}
          scalar={5}
          className="btn w-10/12 mt-3 customAccentBackground clickupShadow logoFont text-xl"
        >
          <button
            onClick={() => {
              console.log("Clicked");
              console.log(email);
              if (email.length > 3) {
                addDoc(collection(db, "user_registrations"), {
                  email: email,
                  timestamp: new Date().toISOString()
                }).then(data => {
                  setEmail("Sign up successful");
                  console.log("Sent");
                });
              }
              // router.push("/account/register");
            }}
          >
            REGISTER FOR UPDATES
          </button>
        </AnimOnHover>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-10">
        <div className="clickup z-0"></div>
        <div className="flex min-h-[600px]">
          <div className="w-6/12 centerdat">
            <div>
              <div className="flex space-x-5">
                <HeadingComponent textColor="clickupColor">
                  {"THE ".toUpperCase()}
                </HeadingComponent>
                <HeadingComponent textColor="clickupColor">
                  {" "}
                  {highlightWordElement}
                </HeadingComponent>
              </div>
              <HeadingComponent textColor="clickupColor">
                {" of Martial Arts".toUpperCase()}
              </HeadingComponent>
              <HeadingComponent textColor="clickupColor" size={4}>
                {"THE ALL IN ONE MARTIAL ART COMMUNITY".toUpperCase()}
              </HeadingComponent>
              {registerSection()}
            </div>
          </div>
          <div className="w-6/12 centerdat ">
            <div className="w-full player-wrapper">
              <ReactPlayer
                // width="100%"
                // height="100%"
                className="clickupShadow"
                url="https://www.youtube.com/watch?v=BoJBfSbYNKU"
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 0,
                      controls: 1,
                      autohide: 0,
                      wmode: "opaque",
                      modestbranding: 1,
                      color: "blue",
                      rel: 0,
                      fs: 0,
                      controls: 1
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex border-t-2 pb-10">{statElements}</div>
        <div className="flex space-x-1 -translate-x-1/3 mt-10">
          {landingData.activities.map(entry => {
            return (
              <EntryWithCentralOverlayComponent
                width={200}
                height={200}
                imageUrl={
                  DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl)
                }
                label1={entry.name}
                targetLink={"/martialart/" + entry.id}
              />
            );
          })}
        </div>
        <div className="mb-10 flex space-x-1 -translate-x-1/4 ">
          {landingData.activities.map(entry => {
            return (
              <EntryWithCentralOverlayComponent
                width={200}
                height={200}
                imageUrl={
                  DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl)
                }
                label1={entry.name}
                targetLink={"/martialart/" + entry.id}
              />
            );
          })}
        </div>

        <ElementSetSummaryComponent
          title="DIVERSE PROFILES"
          description="Detailed profiles from all perspectives in the martial arts community"
          // tiles={
          //   <img src="https://media.gettyimages.com/id/1289775017/vector/people-avatar-round-icon-set-profile-diverse-faces-for-social-network-vector-abstract.jpg?s=1024x1024&w=gi&k=20&c=EPd4UW60wOzpBujo3tJbsNbY9HjB3CRJQtqcqXJ3_vQ="></img>
          // }
          // overrideTiles={true}
          // tiles={landingData.fighters.map(entry => {
          //   return {
          //     value: null,
          //     name: entry.name,
          //     img: DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl),
          //     subName: null,
          //     link: "/person/" + entry.id
          //   };
          // })}

          tiles={[
            ["fighter.jpg", "Athletes"],
            ["referee.jpg", "Referees"],
            ["judge.jpg", "Judges"],
            ["instructor.jpg", "Teachers"]
          ].map(entry => {
            return {
              value: null,
              name: entry[1].toUpperCase(),
              img: "/" + entry[0],
              subName: null,
              link: ""
            };
          })}
          // tiles={
          //   <div className="gallery-container">
          //     <div className="gallery-box">
          //       <span style={{ backgroundColor: "red" }}></span>
          //     </div>{" "}
          //     <div className="gallery-box">
          //       <span style={{ backgroundColor: "green" }}></span>
          //     </div>
          //     <div className="gallery-box">
          //       <span style={{ backgroundColor: "blue" }}></span>
          //     </div>
          //   </div>
          // }
          // overrideTiles={true}
          link={"/"}
        />
        <ElementSetSummaryComponent
          title="TOURNAMENT CREATOR"
          description="Seamless tournament creation. Any fight type, any progression format, any scoring system, fully customizable" // tiles={tournamentTypes}
          tiles={
            <SlideshowComponent
              discrete={false}
              perView={4}
              loop={true}
              timeDelayMs={2000}
              inputData={tournamentTypes.map(entry => {
                return (
                  <EntryWithOverlayComponent
                    width={200}
                    height={200}
                    imageUrl={entry.img}
                    label1={entry.name}
                    targetLink={"/martialart/" + entry.id}
                  />
                );
              })}
            />
          }
          overrideTiles={true}
          link={"/"}
        />
        {/* <img
          src={
            "https://download.smoothcomp.com/features/misc/bracket-illustration@2x.webp"
          }
        ></img> */}
        <ElementSetSummaryComponent
          title="TECHNIQUE LIBRARY"
          description="Learn how do react, defend and attack from any fight position in the fight technique library"
          tiles={landingData.positions.map(entry => {
            return {
              value: null,
              name: entry.name,
              img: DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl),
              subName: null,
              link: "/position/" + entry.id
            };
          })}
          link={"/"}
        />
        <div className="">
          <ElementSetSummaryComponent
            title="MARTIAL ART RANK DIRECTORY"
            description="Browse the worldwide verified list of martial art rank holders, past and present"
            tiles={
              <div className="space-y-1">
                {beltData.map(entry => {
                  return (
                    <div className={BACKGROUND_ATTR + "flex w-full p-2"}>
                      <div className="w-1/12">
                        {FlagComponent(entry.flag, 30)}
                      </div>
                      <p className="w-3/12 customAccentText">{entry.name}</p>
                      <p className="w-2/12">{entry.art}</p>
                      <div className="w-3/12">
                        {BeltComponent(entry.belt, 80)}
                      </div>
                      <p>{entry.year}</p>
                    </div>
                  );
                })}
              </div>
            }
            overrideTiles={true}
            link={"/"}
          />
          <ElementSetSummaryComponent
            title="FIGHT RATINGS"
            description="Rate, review and vote on fights to decide the best fights of the year, all time and a range of other categories"
            tiles={
              <div className="space-y-1">
                {boutRatingData.map(entry => {
                  return (
                    <div
                      className={
                        BACKGROUND_ATTR + "flex w-full space-x-10 px-2 py-1"
                      }
                    >
                      <UserStarRatingBreakdownComponent
                        voteData={entry}
                        initialTotalVotes={43}
                        goToLink={"/bout/"}
                      />
                      <UserRatingComponent />
                      <div className="customAccentText link w-4/12">
                        {entry.fa}
                      </div>
                      <p>vs</p>
                      <div className="customAccentText link w-4/12">
                        {entry.fb}
                      </div>
                      <p className="w-2/12">{entry.art}</p>
                      <div className="w-3/12">{entry.year}</div>
                    </div>
                  );
                })}
              </div>
            }
            overrideTiles={true}
            link={"/"}
          />
        </div>
        <ElementSetSummaryComponent
          title="ADVANCED FIGHT SEARCH"
          description="Browse fight data like never before with fight labels. Any moment, martial art, country and organization"
          tiles={<FightSearchPreviewTagsComponent />}
          overrideTiles={true}
          link={"/"}
        />
        <ElementSetSummaryComponent
          title="FIGHT PROMOTERS"
          description="Detailed Fight Promoters pages from around the world with their own internal rankings, records and ratings"
          tiles={landingData.promoters.map(entry => {
            return {
              value: null,
              name: null, //entry.name,
              img: DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl),
              subName: null,
              link: "/promotion/" + entry.id
            };
          })}
          link={"/"}
          flip={true}
        />
        <p>N earned a black belt</p>
        <p>N has a scheduled fight</p>
        <p>N announced a new event</p>
        <p>N made a fight prediction</p>
        <p>N rated Mike tyson vs Cheese</p>
        <p>N's rankings were updated</p>
        <p>N created a new tournament</p>
        <p>A near by open mat was created</p>
        <ElementSetSummaryComponent
          title="FOR YOU FEED"
          description="Tailor your content by following Fighters,  Promoters and  Martial Arts to create a custom update feed"
          tiles={
            <Avatar
              variant="rounded"
              className={""}
              src={"./social-graph.jpg"}
              sx={{ width: 700, height: 400 }}
            />
          }
          overrideTiles={true}
          link={"/"}
        />
        <ElementSetSummaryComponent
          title="WORLDWIDE AND LOCAL RANKINGS"
          description="Per martial art worldwide, national, division and gender fighter rankings. Track your journey from the 1st fight to world champion"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />
        <ElementSetSummaryComponent
          title="JUDGE DECISION TRACKING"
          description="Judge Profiles and ratings based on their scorecards compared against fellow judges and community scoring"
          tiles={
            <div className="flex w-full">
              {DecisionChart(
                "SPLIT DECISIONS",
                "Majority Vote",
                1,
                "Minority Vote",
                3
              )}
              <Avatar
                className="customShadow"
                variant="rounded"
                sx={{ width: 200, height: 100 }}
                src={"./judge_small.png"}
              />

              {DecisionChart("JUDGE VS COMMUNITY", "AGREE", 50, "DISAGREE", 20)}
            </div>
          }
          overrideTiles={true}
          link={"/"}
        />
        {/* <ElementSetSummaryComponent
          title="COMPETE"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        /> */}
        {/* <ElementSetSummaryComponent
          title="FIGHT RECORDS"
          description="Fight for the top spot in the annual and all time records"
          tiles={<FightSearchPreviewTagsComponent alternative={true} />}
          overrideTiles={true}
          link={"/"}
        /> */}
      </div>
    </div>
  );
}
