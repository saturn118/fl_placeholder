import React, { useState, useEffect } from "react";
import HeadingComponent from "./utility/HeadingComponent";
import LinkIcon from "@mui/icons-material/Link";
import { AnimOnHover } from "./utility/AnimationUtility";
import AddIcon from "@mui/icons-material/Add";
import FlagComponent from "./FlagComponent";

export function IndividualTag(entry, colourAttribute = "") {
  let renderElement =
    typeof entry === "string" || entry instanceof String
      ? entry.toUpperCase()
      : entry;
  return (
    <AnimOnHover translate={true} speed={0.3} scalar={3}>
      <p
        className={
          "customShadow font-bold px-2 py-1 mt-1 ml-1 hover:bg-blue-100 hover:text-black   text-white " +
          (colourAttribute != "" ? colourAttribute : "customAccentBackground")
        }
      >
        {renderElement}
      </p>
    </AnimOnHover>
  );
}

export function FightSearchPreviewTagsAnimatedComponent({}) {
  useEffect(() => {
    const options = {
      rootMargin: "-25px",
      threshold: 1 //percentage of the element that must be visible [0,1],
    };

    const elements = document.querySelectorAll(".animatedtag");
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
  }, []);

  let words = [
    "TITLE FIGHT",
    "FEMALE",
    "FIRST ROUND KO",
    "MUAY THAI",
    "2011",

    FlagComponent("br", 40)
  ];

  return (
    <div>
      <HeadingComponent
        textColor="animatedtag flex w-full justify-center text-center animatedTagDelayLabel fadeY"
        size={4}
      >
        {"Mix tags for precise search".toUpperCase()}
      </HeadingComponent>
      <div className="w-full flex_on_big centerdat animatedtagset  justify-center">
        <p className="px-2 centerdat  space-x-2">
          <div>
            Show <span>{IndividualTag("FEMALE")}</span>
          </div>
          <div>{IndividualTag("MUAY THAI")} fights</div>
          <div>for a {IndividualTag("TITLE")}</div>
          <div>during {IndividualTag("2011")}</div>{" "}
          <div>that ended in a{IndividualTag("FIRST ROUND KO")} </div>
          <div> via {IndividualTag("UPPERCUT")}</div>
        </p>
        {/* <div className="animatedtag animatedtagDelay fadeY">
          {IndividualTag(words[0])}
        </div>

        <div className="animatedtag  centerdat  flex_on_big animatedtagDelay2 fadeY ">
          <div className="transform rotate-90 sm:md:max-lg:transform sm:md:max-lg:rotate-0">
            <AddIcon fontSize="large" />
          </div>
          {IndividualTag(words[1])}
        </div>

        <div className="animatedtag centerdat  flex_on_big animatedtagDelay3 fadeY">
          <div>
            <AddIcon fontSize="large" />
          </div>
          {IndividualTag(words[2])}
        </div>

        <div className="animatedtag  centerdat flex_on_big animatedtagDelay4 fadeY">
          <div>
            <AddIcon fontSize="large" />
          </div>
          {IndividualTag(words[3])}
        </div>
        <div className="animatedtag centerdat flex_on_big animatedtagDelay5 fadeY">
          <div>
            <AddIcon fontSize="large" />
          </div>
          {IndividualTag(words[4])}
        </div> */}
      </div>
    </div>
  );
}

export default function FightSearchPreviewTagsComponent({
  alternative = false
}) {
  const [fightSearchTags, setFightSearchTags] = useState([
    "Draw",
    "Split Decision",
    "No Contest",
    "Undefeated vs Undefeated",
    "Title Fight",

    "Unification Title Fight",
    "Rear Naked Choke",
    "One Strike KO",

    "Doctor's Stoppage",
    "Trilogy Fight",
    "Light Heavyweight",
    "Corner Towel Stoppage",
    "Broken Bone",

    "Retirement Fight",
    "Saved By the Bell",
    "Early Referee Stoppage",
    "Last Second Finish",
    "Kneebar Finish",

    "Comeback",
    "Fight of the Night",

    "Disqualificaton",
    "Fake Glove Touch",
    "2010 - 2014",
    "CANADA",

    "Female"
  ]);

  useEffect(() => {
    let data = fightSearchTags;

    if (alternative) {
      data = [
        "Longest Win Streak",
        "Longest Active Win Streak",
        "Most Wins",
        "Most Fights",
        "Fastest Knockout",
        "Fastest Submission",
        "Most Draws",
        "Tallest",
        "Longest Reach",
        "Oldest Champions",
        "Most Decisions",
        "Most Championship Wins",
        "Most Losses"
      ];
    }

    let newOrder = data.sort(() => 0.5 - Math.random());
    setFightSearchTags(newOrder);
  }, []);

  return (
    <div className="flexwrap space-x-2">
      {fightSearchTags.map(entry => {
        return IndividualTag(entry);
      })}
    </div>
  );
}
