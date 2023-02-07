import {
  Environment,
  Image,
  MeshReflectorMaterial,
  useCursor
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ElementSetSummaryComponent from "@components/ElementSetSummaryComponent";
import FightSearchPreviewTagsComponent from "@components/FightSearchPreviewTagsComponent";
import HeadingComponent from "@components/utility/HeadingComponent";
import { Skeleton, TextField } from "@mui/material";
import { useRouter } from "next/router";
import SummaryStatComponent from "@components/utility/SummaryStatComponent";
import { COMPANY_NAME } from "config";
import { AnimAppear, AnimOnHover } from "@components/utility/AnimationUtility";

//Firebase start
import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "firebaseconnector";

export default function LandingComponent({
  statsData = null,
  landingData = null
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState(null);

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

  function TrimFileName(input) {
    if (input) {
      const splitString = input.split("/");

      return splitString[splitString.length - 1];
    } else {
      return input;
    }
  }

  useEffect(() => {
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

  let highlightWordElement = (
    <span className="customAccentText">
      <AnimAppear key={currentIndex}>
        {words[currentIndex].toUpperCase()}
      </AnimAppear>
    </span>
  );

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
                {"SOMETHING SOMETHIN DSADAD HJH JH HJHJ  SOMETHING".toUpperCase()}
              </HeadingComponent>
              <input />

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
          </div>
          <div className="w-6/12 centerdat ">
            <div className="w-full">
              <iframe
                width="700"
                height="450"
                src="https://www.youtube.com/embed/BoJBfSbYNKU"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              {/* <Skeleton className="w-full" height={600} /> */}
            </div>
          </div>
        </div>

        <div className="mt-10 mb-10 z-20 block-inline ">
          {/* <HeadingComponent size={5}>JOIN THE COMMUNITY</HeadingComponent> */}
          <div className="flexwrap border-t-2 ">{statElements}</div>
        </div>

        <ElementSetSummaryComponent
          title="WORLDWIDE MARTIAL ARTS"
          description="Covering martial arts from around the world. Popular, niche, old and new"
          tiles={landingData.activities.map(entry => {
            return {
              value: null,
              name: entry.name,
              img: TrimFileName(entry.imageUrl),
              subName: null,
              link: "/martialart/" + entry.id
            };
          })}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="FIGHT RATINGS"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="PERSONALIZED FEEDS"
          description="Follow Martial Arts, Fighters, Organizations,Divisions  and other users for your own custom front page"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="JUDGE PERFORMANCE REVIEWS"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="CONTROVERSIAL FIGHT DECISIONS"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="WORLDWIDE AND LOCAL RANKINGS"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="GRADE DIRECTORY"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="COMPETE"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />
        <ElementSetSummaryComponent
          title="GRASSROOT EVENTS"
          description="Create Local Events"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="FIGHT RECORDS"
          description="Key people involved in the running of the organization"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="TECHNIQUE LIBRARY"
          description="Key people involved in the running of the organization"
          tiles={landingData.positions.map(entry => {
            return {
              value: null,
              name: entry.name,
              img: TrimFileName(entry.imageUrl),
              subName: null,
              link: "/position/" + entry.id
            };
          })}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="FIGHTERS"
          description="Key people involved in the running of the organization"
          tiles={landingData.fighters.map(entry => {
            return {
              value: null,
              name: entry.name,
              img: TrimFileName(entry.imageUrl),
              subName: null,
              link: "/person/" + entry.id
            };
          })}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="FIGHTER PROMOTERS"
          description="Key people involved in the running of the organization"
          tiles={landingData.promoters.map(entry => {
            return {
              value: null,
              name: null, //entry.name,
              img: TrimFileName(entry.imageUrl),
              subName: null,
              link: "/promotion/" + entry.id
            };
          })}
          link={"/"}
          flip={true}
        />

        <ElementSetSummaryComponent
          title="ADVANCED FIGHT SEARCH"
          description="Key people involved in the running of the organization"
          tiles={<FightSearchPreviewTagsComponent />}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title="COMMUNITY DRIVEN"
          description="Suggest, Discuss and Vote on new website features"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />

        <ElementSetSummaryComponent
          title={("JOIN " + COMPANY_NAME + " TODAY").toUpperCase()}
          description="It's free ;)"
          tiles={subSectionSkeletonElement}
          overrideTiles={true}
          link={"/"}
        />
      </div>
    </div>
  );
}
