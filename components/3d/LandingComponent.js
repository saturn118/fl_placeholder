import {
  Environment,
  Image,
  MeshReflectorMaterial,
  useCursor
} from "@react-three/drei";
import Meta from "@components/Meta";
import BoutCompactComponent from "@components/Bouts/BoutCompactComponent";
import PublicIcon from "@mui/icons-material/Public";
import Marquee from "react-fast-marquee";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BeltComponent from "@components/BeltComponent";
import ElementSetSummaryComponent from "@components/ElementSetSummaryComponent";
import FightSearchPreviewTagsComponent, {
  FightSearchPreviewTagsAnimatedComponent,
  IndividualTag
} from "@components/FightSearchPreviewTagsComponent";
import HeadingComponent from "@components/utility/HeadingComponent";
import {
  Skeleton,
  TextField,
  Avatar,
  CircularProgress,
  Button,
  Divider
} from "@mui/material";
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
import { YOUTUBE_URL } from "config";
import { INSTAGRAM_URL } from "config";
import { NewsFeedAnimatedComponent } from "@components/NewsFeedComponent";
import { IsSmallScreen } from "config";
import SocialMediaLinksComponent from "@components/utility/SocialMediaLinksComponent";
import FollowComponent from "@components/FollowComponent";
import PopularityComponent from "@components/PopularityComponent";

export default function LandingComponent({
  statsData = null,
  landingData = null
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [registerPending, setRegisterPending] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [email, setEmail] = useState(null);

  function TrimFileName(input) {
    console.log("IMAGE ");
    console.log(input);

    input = input.replace(/\\/g, "/");

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

  let ii = 0;
  let statElements = statsData
    ? statsData.stats.map(entry => {
        ii += 1;
        return (
          <div className={"w-4/12 pt-5 pb-5"}>
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

  let localActivityData = [
    {
      name: "Wresting",
      imageUrl:
        "https://storage.googleapis.com/afs-prod/media/db5c21bf088d4a429fa84f0aa7cdd10a/1000.jpeg"
    },
    {
      name: "Karate",
      imageUrl:
        "https://assets3.cbsnewsstatic.com/hub/i/r/2011/05/18/31f259be-1c51-11e3-9918-005056850598/thumbnail/620x465/20336ecaeb918dbed8d79ed71f46b7b4/karatefinal2.jpg"
    },
    {
      name: "MMA",
      imageUrl:
        "http://images.fanpop.com/images/image_uploads/Action---UFC-the-ultimate-fighting-championship-288527_400_300.jpg"
    },
    {
      name: "Jujitsu",
      imageUrl:
        "https://jiujitsu-news.com/wp-content/uploads/2020/01/Action-Reaction-in-Jiu-Jitsu-300x200.png"
    },
    {
      name: "Boxing",
      imageUrl: "http://cdn.ebaumsworld.com/thumbs/picture/2104182/83036449.jpg"
    },
    {
      name: "Judo",
      imageUrl:
        "https://i2-prod.chroniclelive.co.uk/incoming/article2509374.ece/ALTERNATES/s615/Judo.jpg"
    },
    {
      name: "Taekwondo",
      imageUrl:
        "https://assets2.cbsnewsstatic.com/hub/i/r/2011/05/18/320fae01-1c51-11e3-9918-005056850598/thumbnail/620x465/881d2cfa82cd4121164e9bc4d5798aa1/taekwondofinal1.jpg"
    },
    {
      name: "Fencing",
      imageUrl:
        "https://kawamorinaoki.jp/wp-content/uploads/2015/08/Romania_v_France_EFS_2013_Fencing_WCH_t163933.jpg"
    },
    {
      name: "Sambo",
      imageUrl:
        "https://sambo.sport/upload/iblock/e90/e90078077f050309e6565b0688b30f44.jpg"
    },
    {
      name: "Muay Thai",
      imageUrl: "https://i.ytimg.com/vi/fCSuDz9ix6c/hqdefault.jpg"
    },
    {
      name: "Kickboxing",
      imageUrl:
        "https://photos1.blogger.com/x/blogger/7428/1729/320/827062/01_11_07_Baxter%2520Humby_5218.jpg"
    },

    {
      name: "HEMA",
      imageUrl:
        "https://i0.wp.com/indyfencing.net/wp-content/uploads/2021/01/5g6uefw9jsd31.jpg?resize=863%2C863&ssl=1"
    }
  ];

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
    const options = {
      rootMargin: "-40px",
      threshold: 0.4 //percentage of the element that must be visible [0,1],
    };

    const elements = document.querySelectorAll("section");
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeX");
          io.unobserve(entry.target);
        } else {
          entry.target.classList.remove("fadeX");
        }
      });
    }, options);

    elements.forEach(entry => {
      io.observe(entry);
    });

    LogSiteAction("testy");
    var i = 0;
    // setInterval(increment, 3000, i);
    // function increment() {
    //   i = i + 1;

    //   if (i === words.length) {
    //     i = 0;
    //   }

    //   setCurrentIndex(i);
    // }
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

  function registerSection(showSocials = false) {
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
          {registerPending && <CircularProgress />}

          {!registerPending && (
            <button
              className="text-white"
              onClick={() => {
                console.log("Clicked");
                console.log(email);
                if (email.length > 3) {
                  setRegisterPending(true);
                  addDoc(collection(db, "user_registrations"), {
                    email: email,
                    timestamp: new Date().toISOString()
                  }).then(data => {
                    setRegisterPending(false);
                    setRegistered(true);
                    // setEmail("Sign up successful");
                    console.log("Sent");
                  });
                }
              }}
            >
              {registered ? "SUCCESS" : "JOIN THE WAITLIST"}
            </button>
          )}
        </AnimOnHover>

        {/* {showSocials && <SocialMediaLinksComponent />} */}
      </div>
    );
  }

  let headerColor = " customAccentText "; //" text-gray-300 ";
  let communityBoutRatingElements = [
    <div className="w-6/12 centerdat my-3">
      <HeadingComponent textColor={"text-center " + headerColor} size={6}>
        RATING
      </HeadingComponent>
      <UserStarRatingBreakdownComponent
        entityType="bout"
        voteData={{
          ratingValue: 2,
          totalVotes: 35
        }}
        initialTotalVotes={43}
        goToLink={"/bout/"}
      />
    </div>,
    <div className="w-6/12 centerdat  my-3">
      <HeadingComponent textColor={"text-center " + headerColor} size={6}>
        DECISION
      </HeadingComponent>
      <div className="centerdat">
        <div className="flex">
          <div className=" text-center">
            <p
              className="font-bold"
              style={{
                fontSize: "1.1rem",
                lineHeight: "0.8rem"
              }}
            >
              JONES
            </p>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem" }}> 59% votes </p>
      </div>
    </div>,
    <div className="w-6/12 centerdat  my-3">
      <HeadingComponent textColor={"text-center " + headerColor} size={6}>
        PREDICTION
      </HeadingComponent>

      <div className="centerdat">
        <div className="flex">
          <div className="text-center">
            <p
              className="font-bold"
              style={{
                fontSize: "1.1rem",
                lineHeight: "0.8rem"
              }}
            >
              TYSON
            </p>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem" }}> 90% votes </p>
      </div>
    </div>,
    <div className="w-6/12 centerdat my-3">
      <PopularityComponent
        rankData={{ rank: 9, oldRank: 23 }}
        titleColor="customAccentText"
        secondaryColor="text-black"
        // entityType="fighter"
        // entityId={fighterData.id}
      />
    </div>
  ];

  let titleFontSize = 1;
  let smallScreen = IsSmallScreen();

  return (
    <div className="container">
      <Meta />
      <div className="py-10">
        {/* <div className=" bg-transparent clickup z-0"></div> */}
        <div className="flex_full_on_big  lg:min-h-[400px] pb-5">
          <div className="w-6/12 wide_on_small centerdat   ">
            <div className="w-full centerdat ">
              <div className=" w-full  centerdat ">
                <HeadingComponent
                  size={titleFontSize}
                  textColor="w-full clickupColor"
                >
                  {"Martial Arts".toUpperCase()} <br />
                  {highlightWordElement}
                </HeadingComponent>
                <HeadingComponent
                  size={titleFontSize + 3}
                  textColor="clickupColor"
                >
                  {"THE ALL IN ONE"} {IsSmallScreen() && <br />}{" "}
                  {"MARTIAL ART PLATFORM".toUpperCase()}
                </HeadingComponent>
              </div>

              <div className="w-full hide_on_small">{registerSection()}</div>
            </div>
          </div>
          <div className="w-6/12 wide_on_small  pt-8">
            <div className="player-wrapper ">
              <ReactPlayer
                className="react-player"
                width="100%"
                height="100%"
                className="clickupShadow react-player"
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
        <div className="space-y-20 container mx-auto">
          <AnimAppear delay={1000}>
            <div className="hide_on_small flex_full_on_big border-t-2 ">
              {statElements}
            </div>
            <div className="hide_on_big rounded-xl bg-gray-100 flexwrap  border-t-2">
              {statElements}
            </div>
          </AnimAppear>
          {/* <div className="flex space-x-1  mt-10"> */}
          <div>
            <Marquee gradientWidth={5} speed={30}>
              {localActivityData
                .map(entry => {
                  return (
                    <div className="p-1">
                      <EntryWithCentralOverlayComponent
                        width={130}
                        height={130}
                        imageUrl={entry.imageUrl}
                        // imageUrl={
                        //   DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl)
                        // }
                        label1={entry.name}
                        targetLink={"/martialart/"}
                      />
                    </div>
                  );
                })
                .slice(0, smallScreen ? 6 : 12)}
            </Marquee>
            {smallScreen && (
              <Marquee speed={30} direction={"right"} gradientWidth={5}>
                {localActivityData
                  .map(entry => {
                    return (
                      <div className="p-1">
                        <EntryWithCentralOverlayComponent
                          width={130}
                          height={130}
                          imageUrl={entry.imageUrl}
                          // imageUrl={
                          //   DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl)
                          // }
                          label1={entry.name}
                          targetLink={"/martialart/"}
                        />
                      </div>
                    );
                  })
                  .slice(6, 12)}
              </Marquee>
            )}
          </div>

          {/* </div> */}
          <div className="mb-10 flex space-x-1  ">
            {/* {localActivityData
              .map(entry => {
                return (
                  <EntryWithCentralOverlayComponent
                    width={200}
                    height={200}
                    imageUrl={entry.imageUrl}
                    // imageUrl={
                    //   DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl)
                    // }
                    label1={entry.name}
                    targetLink={"/martialart/"}
                  />
                );
              })
              .slice(6, 12)} */}
          </div>
          <ElementSetSummaryComponent
            title="WORLDWIDE PROFILES"
            description="Browse the world of martial arts. Athletes, referees, judges and instructors.Past and present. Follow their profiles to get notified of their latest activity"
            elementOverride="vertical"
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
            link={null}
          />

          <ElementSetSummaryComponent
            title="RATINGS, REVIEWS, PREDICTIONS, DECISIONS"
            description="Rate, review and vote on fights to decide the best fights of the year, all time and a range of other categories"
            tiles={
              <div className="space-y-1">
                <div className="relative ">
                  <img
                    variant="rounded"
                    className="w-full  "
                    src={"landing_rating.jpg"}
                  />
                  <div className=" ignoreMouse  py-2  w-full rounded-xl bg-gray-100  border-t-2">
                    <div className="hide_on_small w-full spaceEven">
                      {communityBoutRatingElements}
                    </div>
                    <div className="hide_on_big flexwrap">
                      {communityBoutRatingElements}
                    </div>
                  </div>
                </div>
                {/* {boutRatingData.map(entry => {
               
                  return (
                    <div
                      className={
                        BACKGROUND_ATTR + "spaceEven w-full  px-2 py-1"
                      }
                    >
                      <div className="spaceEven hide_on_small">
                        <UserStarRatingBreakdownComponent
                          entityType="bout"
                          voteData={entry}
                          initialTotalVotes={43}
                          goToLink={"/bout/"}
                        />
                        <UserRatingComponent />
                      </div>
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
                })} */}
              </div>
            }
            overrideTiles={true}
            link={null}
          />

          <div className="space-y-10">
            <ElementSetSummaryComponent
              title="FIGHT TAGS"
              description="Browse fight data like never before with fight tags. Search based on moments, win methods, country, time frame, fight promoter and many more"
              tiles={
                <div className="mr-5 rounded-xl ">
                  <img
                    variant="rounded"
                    className="w-full rounded-xl "
                    src={"annotated.jpg"}
                  />
                </div>
              }
              overrideTiles={true}
              flip={true}
              link={null}
            />

            <div className="spaceEven bg-gray-100 rounded-xl">
              <div className={"w-4/12 py-3"}>
                <SummaryStatComponent
                  label={"Fight Tags"}
                  mainLabel={"2000+"}
                  secondaryColor=" clickupColor "
                />
              </div>
              <div className={"w-4/12 py-3"}>
                <SummaryStatComponent
                  label={"Tags Applied"}
                  mainLabel={"13.2M+"}
                  secondaryColor=" clickupColor "
                />
              </div>
            </div>

            <div className="w-full ignoreMouse space-y-3">
              <Marquee gradientWidth={15}>
                <FightSearchPreviewTagsComponent />
              </Marquee>
              <Marquee gradientWidth={15}>
                <FightSearchPreviewTagsComponent />
              </Marquee>
              <Marquee gradientWidth={15} direction={"right"}>
                <FightSearchPreviewTagsComponent />
              </Marquee>
              <Marquee gradientWidth={15}>
                <FightSearchPreviewTagsComponent />
              </Marquee>
            </div>

            <div className="bg-gray-100 rounded-xl py-5">
              <FightSearchPreviewTagsAnimatedComponent />
            </div>
          </div>

          <ElementSetSummaryComponent
            flip={true}
            title={"COMPETITION SCOUT".toUpperCase()}
            description="Never miss a chance to compete. Register your competition profile and automatically get notified of new events that fit your requirements" // tiles={tournamentTypes}
            tiles={
              <div className="space-y-3 rounded-xl ">
                <img
                  src={"scout.jpg"}
                  className="rounded-xl transform max-h-[350px]"
                ></img>
              </div>
            }
            overrideTiles={true}
            link={null}
          />
          <div className="flex_on_big w-full">
            <div className="wide_on_big mr-10">
              <img
                src={
                  "https://www.researchgate.net/profile/Richard-Oentaryo-2/publication/303750841/figure/fig1/AS:667903661727765@1536252050943/Prediction-of-check-ins-based-on-the-location-indicated-by-the-blue-pin-The-red-pins.ppm"
                }
                className="imgR rounded-xl "
              ></img>
            </div>

            <div className="w-6/12 wide_on_small">
              {/* <HeadingComponent size={2}>
                MATCHING EVENTS FOUND
              </HeadingComponent> */}

              {[
                ["Grappling Open", "15/64", "In 31 days"],
                ["Wrestle Rumble", "5/12", "In 15 days"],
                ["Sambo Open", "19/24", "In 21 days"],
                ["Submission Underground", "64/100", "In 5 days"]
              ].map(entry => {
                return (
                  <div className={BACKGROUND_ATTR + " spaceBetween my-1 p-2"}>
                    <div>
                      <p className="font-bold customAccentText">{entry[0]}</p>
                      {entry[2]}
                    </div>{" "}
                    <div className="spaceEven space-x-2">
                      <div>
                        <p>Entrants</p>
                        <p> {entry[1]}</p>
                      </div>
                      <Button className="customAccentBackground text-white">
                        Register
                      </Button>
                    </div>
                    {/* 3 friends enrolled */}
                  </div>
                );
              })}
            </div>
          </div>

          <ElementSetSummaryComponent
            flip={true}
            title={"COMPETITION BUILDER".toUpperCase()}
            description="Cant find a tournament? Tap into Fight Legacy's community to form local tournaments with our tournament software" // tiles={tournamentTypes}
            tiles={
              <div className="space-y-3">
                <img className="rounded-xl" src={"tournament_crowd.jpg"}></img>
              </div>
            }
            overrideTiles={true}
            link={null}
          />
          <div>
            <Marquee gradientWidth={15}>
              {tournamentTypes.map(entry => {
                return (
                  <div className="mx-1" speed={50}>
                    <EntryWithOverlayComponent
                      width={100}
                      height={100}
                      imageUrl={entry.img}
                      label1={entry.name}
                      targetLink={"/martialart/" + entry.id}
                    />
                  </div>
                );
              })}
            </Marquee>
            {smallScreen && (
              <Marquee gradientWidth={15} direction={"right"}>
                >
                {tournamentTypes.map(entry => {
                  return (
                    <div className="mx-1" speed={50}>
                      <EntryWithOverlayComponent
                        width={100}
                        height={100}
                        imageUrl={entry.img}
                        label1={entry.name}
                        targetLink={"/martialart/" + entry.id}
                      />
                    </div>
                  );
                })}
              </Marquee>
            )}
          </div>

          <ElementSetSummaryComponent
            title={"TECHNIQUE LIBRARY".toUpperCase()}
            mergedTitle={true}
            description="Learn how do react, defend and attack from any fight position in the cross discipline technique library. Select your position and learn techniques from experienced instructors around the world"
            tiles={
              <div className="relative">
                <img
                  className="hide_on_small scale-[0.7] absolute -top-10"
                  src={"technique_montage.png"}
                />
                <img
                  className="hide_on_big transform -translate-x-3 w-full"
                  src={"technique_montage.png"}
                />
              </div>
            }
            overrideTiles={true}
            link={null}
          />

          <div className="w-full spaceEven flexwrap">
            {[
              ["Strikes", "landing/strikes.jpg"],
              ["Submissions", "landing/submission.jpg"],
              ["Takedowns", "landing/takedown.jpg"],
              ["Grips", "landing/grips.jpg"],
              ["Sweeps", "landing/sweep.jpg"],
              ["Footwork", ""]
            ].map(entry => {
              return (
                <EntryWithCentralOverlayComponent
                  width={150}
                  height={150}
                  imageUrl={entry[1]}
                  label1={entry[0]}
                  targetLink={"/martialart/"}
                />
              );
            })}
          </div>
          {/* 
          <div className="sm:md:w-6/12 wide_on_big h-[200px] wide_on_big centerX bg-red-100 ignoreMouse ">
            <div className="player-wrapper ">
              <ReactPlayer
                className="react-player"
                width="100%"
                height="100%"
                className="clickupShadow react-player"
                url="https://www.youtube.com/watch?v=w-U1N_oSwEQ"
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
          </div> */}
          {/*
          <div>
            <HeadingComponent showBar={false} size={3} textColor="centerX">
              TECHNIQUE FILTERS
            </HeadingComponent>

            <div className=" mx-2 py-2">
              <div className="flex_full_on_big ">
                <div className=" centerdat w-4/12 wide_on_small bg-gray-100 rounded-xl m-1 my-3 py-3">
                  <HeadingComponent size={5} textColor="customAccentText">
                    Move Type
                  </HeadingComponent>
                  {["Strikes", "Submissions", "Takedowns", "Sweeps"].map(
                    entry => {
                      return <p className="centerX py-2">{entry}</p>;
                    }
                  )}
                </div>

                 <div className="centerdat w-4/12 wide_on_small bg-gray-100 rounded-xl m-1  my-3 py-3">
                  <HeadingComponent size={5} textColor="customAccentText">
                    Experience Level
                  </HeadingComponent>
                  {[
                    "First Month",
                    "Fundamental",
                    "Intermediate",
                    "Advanced"
                  ].map(entry => {
                    return <p className="centerX py-2">{entry}</p>;
                  })}
                </div>

                <div className="centerdat w-4/12 wide_on_small bg-gray-100 rounded-xl m-1  my-3 py-3">
                  <HeadingComponent size={5} textColor="customAccentText">
                    Meta
                  </HeadingComponent>
                  {[
                    "High Risk/High Reward",
                    "Energy Usage",
                    "Unorthodox",
                    "Counters"
                  ].map(entry => {
                    return <p className="centerX py-2">{entry}</p>;
                  })}
                </div>

                <div className="  w-4/12 wide_on_small bg-gray-100 rounded-xl m-1 centerdat  my-3 py-3">
                  <HeadingComponent size={5} textColor="customAccentText">
                    Body Type
                  </HeadingComponent>

                  {[
                    "Larger Opponent",
                    "Agile",
                    "Reach Disadvantage",
                    "Southpaw vs Orthodox"
                  ].map(entry => {
                    return <p className="centerX py-2">{entry}</p>;
                  })}
                </div>
              </div>
            </div>
          </div> */}

          <div className="space-y-5">
            <ElementSetSummaryComponent
              flip={false}
              mergedTitle={true}
              title="LINEAGE AND RANKS"
              description="Browse the worldwide verified list of martial art rank holders, past and present"
              tiles={
                <div className="space-y-1 rounded-xl pr-10 ">
                  <div>
                    {beltData.map(entry => {
                      return (
                        <div className={BACKGROUND_ATTR + "flex w-full p-2"}>
                          <div className="w-1/12">
                            {FlagComponent(entry.flag, 30)}
                          </div>
                          <p className="w-3/12 customAccentText">
                            {entry.name}
                          </p>
                          <p className="w-2/12">{entry.art}</p>
                          <div className="w-3/12">
                            {BeltComponent(entry.belt, 80)}
                          </div>
                          <p>{entry.year}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="spaceEven w-full">
                    <Avatar
                      className="customShadow w-4/12 h-[100px]"
                      variant="rounded"
                      //sx={{ width: 210, height: 210 }}
                      src="belt_promotion.jpg"
                    />
                    <Avatar
                      className="customShadow w-4/12 h-[100px]"
                      variant="rounded"
                      //sx={{ width: 210, height: 210 }}
                      src="belt_promotion.jpg"
                    />
                    <Avatar
                      className="customShadow w-4/12 h-[100px]"
                      variant="rounded"
                      //  sx={{ width: 210, height: 210 }}
                      src="belt_promotion.jpg"
                    />
                  </div>
                </div>
              }
              overrideTiles={true}
              link={null}
            />
          </div>

          <ElementSetSummaryComponent
            title="FIGHT ORGANIZATIONS"
            description="Pro, amatuer and grassroots promoters from around the world with unique rankings, records and ratings"
            tiles={landingData.promoters.map(entry => {
              return {
                value: null,
                name: null, //entry.name,
                img: DATA_SERVER_IMAGE_ADDRESS + TrimFileName(entry.imageUrl),
                subName: null,
                link: "/promotion/" + entry.id
              };
            })}
            elementOverride="vertical"
            link={null}
          />

          {/* <p>N earned a black belt</p>
          <p>N has a scheduled fight</p>
          <p>N announced a new event</p>
          <p>N made a fight prediction</p>
          <p>N rated Mike tyson vs Cheese</p>
          <p>N's rankings were updated</p>
          <p>N created a new tournament</p>
          <p>A near by open mat was created</p> */}
          <ElementSetSummaryComponent
            title="WORLDWIDE RANKINGS"
            description="Each recorded fight contributes to worldwide rankings. Broken down in a range of categories. Track your journey from the 1st fight to world champion"
            tiles={
              <div>
                {/* <div className="space-y-3 rounded-xl ">
                  <img
                    src={"scout.jpg"}
                    className="rounded-xl transform max-h-[350px]"
                  ></img>
                </div> */}

                <div>
                  {[
                    [
                      <PublicIcon fontSize="large" />,
                      "(Active)",
                      "#57/2.1M",
                      "10W-2L-3D"
                    ],
                    [
                      <PublicIcon fontSize="large" />,
                      " (All Time)",
                      "#57/3.1M",
                      "10W-2L-3D"
                    ],
                    [
                      FlagComponent("fr", 50),
                      "National",
                      "#76/200K",
                      "23W-4L-1D"
                    ],
                    [
                      <div className="flex">
                        <Avatar src={""} /> Judo Grappling Championship
                      </div>,
                      null,
                      "#4/234",
                      "7W-1L-0D"
                    ]
                  ].map(entry => {
                    return (
                      <div
                        className={
                          BACKGROUND_ATTR + " px-5 py-3 w-full spaceBetween"
                        }
                      >
                        <div>{entry[0]}</div> <div>{entry[1]}</div>
                        <div>{entry[2]}</div>
                        <div>{entry[3]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            }
            overrideTiles={true}
            link={null}
            flip={true}
          />

          <ElementSetSummaryComponent
            title="WORLDWIDE STATS"
            description="Each recorded fight contributes to worldwide rankings. Broken down in a range of categories. Track your journey from the 1st fight to world champion"
            mergedTitle={true}
            tiles={
              <div className="space-y-3">
                <Marquee gradientWidth={5} speed={50}>
                  {RECORDS_LIST.map(entry => {
                    if (entry.alltime)
                      return <div>{IndividualTag(entry.name)}</div>;
                    return null;
                  })}
                </Marquee>
                <Marquee gradientWidth={5} speed={20}>
                  {RECORDS_LIST.map(entry => {
                    if (entry.alltime)
                      return <div>{IndividualTag(entry.name)}</div>;
                    return null;
                  })}
                </Marquee>
                <Marquee gradientWidth={5} speed={40}>
                  {RECORDS_LIST.map(entry => {
                    if (entry.alltime)
                      return <div>{IndividualTag(entry.name)}</div>;
                    return null;
                  })}
                </Marquee>
                <Marquee gradientWidth={5} speed={70}>
                  {RECORDS_LIST.map(entry => {
                    if (entry.alltime)
                      return <div>{IndividualTag(entry.name)}</div>;
                    return null;
                  })}
                </Marquee>
              </div>
            }
            overrideTiles={true}
            link={null}
            flip={false}
          />
          {/* <p>
            Show Points system animation, martial art, age, win condition, win
            speed, streak,fight frequency, amatuer, professional, grassroots,
            exhibition
          </p> */}
          <ElementSetSummaryComponent
            title="YOUR FRONT PAGE"
            mergedTitle={true}
            description="Curate your front page by following fighters, organizations, martial arts and other users to see their fight and website activity"
            tiles={<img className="imgR" src={"landing/feed.jpg"} />} //<NewsFeedAnimatedComponent />}
            overrideTiles={true}
            link={null}
          />
          <section className=" centerdat text-center fadeY">
            <div className="w-6/12 wide_on_small space-y-2">
              <HeadingComponent
                textColor="text-center w-full justify-center flex_on_big "
                size={2}
              >
                START YOUR{" "}
                <span className="customAccentText pl-4"> LEGACY</span>
              </HeadingComponent>
              <div>Follow us to get notified when we launch</div>
              {registerSection(true)}
            </div>
          </section>
          {/* <ElementSetSummaryComponent
            flip={true}
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

                {DecisionChart(
                  "JUDGE VS COMMUNITY",
                  "AGREE",
                  50,
                  "DISAGREE",
                  20
                )}
              </div>
            }
            overrideTiles={true}
            link={null}
          /> */}
          {/* <ElementSetSummaryComponent
          title="COMPETE"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={null}
        /> */}
          {/* <ElementSetSummaryComponent
          title="FIGHT RECORDS"
          description="Fight for the top spot in the annual and all time records"
          tiles={<FightSearchPreviewTagsComponent alternative={true} />}
          overrideTiles={true}
          link={null}
        /> */}
        </div>
      </div>
    </div>
  );
}

const RECORDS_LIST = [
  {
    alltime: true,
    annual: true,
    name: "Tallest Fighter"
  },
  {
    alltime: true,
    annual: true,
    name: "Shortest Fighter"
  },
  {
    alltime: true,
    annual: true,
    name: "Longest Reach"
  },
  {
    alltime: true,
    annual: true,
    name: "Shortest Reach"
  },
  {
    alltime: true,
    annual: true,
    name: "Longest Leg Reach"
  },
  {
    alltime: true,
    annual: true,
    name: "Shortest Leg Reach"
  },
  {
    alltime: true,
    annual: true,
    name: "Heaviest Fighter"
  },
  {
    alltime: true,
    annual: true,
    name: "Lightest Fighter"
  },
  {
    alltime: true,
    annual: true,
    name: "Oldest Fight Age"
  },
  {
    alltime: true,
    annual: true,
    name: "Youngest Debut"
  },
  {
    alltime: true,
    annual: true,
    name: "Oldest Fighter"
  },
  {
    alltime: true,
    annual: true,
    name: "Youngest Debut"
  },
  {
    alltime: true,
    annual: true,
    name: "Pensioner Fights"
  },
  {
    alltime: true,
    annual: false,
    name: "Fastest Title Run"
  },
  {
    alltime: true,
    annual: false,
    name: "Slowest Title Run"
  },
  {
    alltime: true,
    annual: true,
    name: "Oldest Champion"
  },
  {
    alltime: true,
    annual: true,
    name: "Youngest Champion"
  },
  {
    alltime: true,
    annual: true,
    name: "Champion Win Streak"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Champion Wins"
  },
  {
    alltime: true,
    annual: true,
    name: "David vs Goliath"
  },
  {
    alltime: true,
    annual: true,
    name: "Streakbreakers"
  },
  {
    alltime: true,
    annual: false,
    name: "Most Annual Fights"
  },
  {
    alltime: true,
    annual: true,
    name: "Win Streak"
  },
  {
    alltime: true,
    annual: true,
    name: "Loss Streak"
  },
  {
    alltime: true,
    annual: true,
    name: "Best Active Win Streak"
  },
  {
    alltime: true,
    annual: true,
    name: "Best Active Loss Streak"
  },
  {
    alltime: true,
    annual: true,
    name: "Rare Submissions Finishes"
  },
  {
    alltime: true,
    annual: true,
    name: "Popular Submissions Finishes"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Decision Wins"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Wins"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Losses"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Fights"
  },
  {
    alltime: true,
    annual: true,
    name: "Fastest Win"
  },
  {
    alltime: true,
    annual: true,
    name: "Fastest TKO"
  },
  {
    alltime: true,
    annual: true,
    name: "Fastest Submission"
  },
  {
    alltime: true,
    annual: true,
    name: "Undefeated"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Finishes"
  },
  {
    alltime: true,
    annual: true,
    name: "Most TKOs"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Submissions"
  },
  {
    alltime: true,
    annual: true,
    name: "Most Draws"
  },
  {
    alltime: true,
    annual: true,
    name: "Most DQs"
  },
  {
    alltime: true,
    annual: true,
    name: "Most No Contests"
  },
  {
    alltime: true,
    annual: true,
    name: "Champion Nationalities"
  },
  {
    alltime: true,
    annual: true,
    name: "Fighter Nationalities"
  },
  {
    alltime: true,
    annual: true,
    name: "Finish Percentage"
  }
];
