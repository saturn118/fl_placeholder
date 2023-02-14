import React, { useState, useEffect } from "react";
import HeadingComponent from "./utility/HeadingComponent";
import LinkIcon from "@mui/icons-material/Link";

function IndividualTag(entry) {
  return (
    <p className="customShadow font-bold px-5 py-2 mt-2 hover:bg-blue-100 hover:text-black customAccentBackground  text-white">
      {entry.toUpperCase()}
    </p>
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

  let words = ["TITLE FIGHT", "FEMALE", "FIRST ROUND KO", "MUAY THAI", "2011"];

  return (
    <div>
      <HeadingComponent
        textColor="animatedtag flex w-full justify-center text-center animatedTagDelayLabel fadeY"
        size={4}
      >
        {"Combine tags for extra precision".toUpperCase()}
      </HeadingComponent>
      <div className="w-full animatedtagset  flex justify-center">
        <div className="animatedtag animatedtagDelay fadeY">
          {IndividualTag(words[0])}
        </div>

        <div className="animatedtag  items-center align-center  flex animatedtagDelay2 fadeY ">
          <LinkIcon fontSize="large" />
          {IndividualTag(words[1])}
        </div>

        <div className="animatedtag  items-center align-center  flex animatedtagDelay3 fadeY">
          <LinkIcon fontSize="large" />
          {IndividualTag(words[2])}
        </div>

        <div className="animatedtag items-center align-center  flex animatedtagDelay4 fadeY">
          <LinkIcon fontSize="large" />
          {IndividualTag(words[3])}
        </div>
        <div className="animatedtag items-center align-center  flex animatedtagDelay5 fadeY">
          <LinkIcon fontSize="large" />
          {IndividualTag(words[4])}
        </div>
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
