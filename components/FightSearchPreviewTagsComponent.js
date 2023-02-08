import React, { useState, useEffect } from "react";

export default function FightSearchPreviewTagsComponent(alternative = false) {
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
        return (
          <p className="customShadow font-bold px-5 py-2 mt-2 hover:bg-blue-100 hover:text-black customAccentBackground  text-white">
            {entry.toUpperCase()}
          </p>
        );
      })}
    </div>
  );
}
