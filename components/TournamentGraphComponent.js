import dynamic from "next/dynamic";
import React from "react";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  import("@g-loot/react-tournament-brackets");
}
const SingleEliminationBracket = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.SingleEliminationBracket
    );
  },
  { ssr: false }
);

const Match = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(mod => mod.Match);
  },
  { ssr: false }
);
const MATCH_STATES = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.MATCH_STATES
    );
  },
  { ssr: false }
);
const SVGViewer = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.SVGViewer
    );
  },
  { ssr: false }
);

const createTheme = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.createTheme
    );
  },
  { ssr: false }
);

export const TournamentGraphComponent = ({
  fighterList = [],
  boutList = [],
  boutMetaList = [],
  tournamentType = "singleElimation" //TODO, support RR and other types
}) => {
  let entrantMap = {}; //id, instance
  let boutMetaMap = {};
  let boutMap = {};

  fighterList.map(entry => {
    entrantMap[entry.id] = entry;
  });

  boutList.map(entry => {
    boutMap[entry.id] = entry;
  });

  boutMetaList.map(entry => {
    boutMetaMap[entry.boutId] = entry;
  });

  let customMatchData = boutList.map(entry => {
    let fighterA = entrantMap[entry.fighterAId];
    let fighterB = entrantMap[entry.fighterBId];

    if (entry.id in boutMetaMap == false) {
      return;
    }

    return {
      id: entry.id,
      nextMatchId: boutMetaMap[entry.id].nextBoutIdForWinner,
      nextLooserMatchId: null,
      tournamentRoundText: "1",
      name: entry.winCondition + ", " + entry.winSubCondition,
      // startTime: "2021-07-28T00:00:00.000+00:00",
      state: "SCORE_DONE",
      participants: [
        {
          id: entry.id.toString() + "_" + fighterA.id.toString(),
          resultText: entry.winnerId == fighterA.id ? entry.result : null,
          isWinner: entry.winnerId == fighterA.id,
          status: "PLAYED",
          name: fighterA.name
        },
        {
          id: entry.id.toString() + "_" + fighterB.id.toString(),
          resultText: entry.winnerId == fighterB.id ? entry.result : null,
          isWinner: entry.winnerId == fighterB.id,
          status: "PLAYED",
          name: fighterB.name
        }
      ]
    };

    //   id: 20464,
    //   name: "Semi Final - Match 1",
    //   nextMatchId: 20463,
    //   nextLooserMatchId: null,
    //   tournamentRoundText: "2",
    //   startTime: "2021-07-28T00:00:00.000+00:00",
    //   state: "SCORE_DONE",
    //   participants: [
    //     {
    //       id: "9fd1f0e6-eb92-4159-a96d-6657fbdd963e",
    //       resultText: null,
    //       isWinner: false,
    //       status: "NO_SHOW",
    //       name: "GlootOne"
    //     },
    //     {
    //       id: "1d11ce35-de11-49de-b48e-cec5427eb82c",
    //       resultText: null,
    //       isWinner: false,
    //       status: "NO_SHOW",
    //       name: "Alex"
    //     }
    //   ]
    // }
  });

  let graphElement = null;
  if (boutMetaList.length > 0) {
    graphElement = <SingleElimination customMatchData={customMatchData} />;
  } else {
    graphElement = <SingleElimination />;
  }

  return <div>{graphElement}</div>;
};

const SingleElimination = ({ customMatchData = null }) => (
  <SingleEliminationBracket
    matches={customMatchData ? customMatchData : matches}
    // options={{
    //   style: {
    //     roundHeader: { backgroundColor: "#AAA" },
    //     connectorColor: "#FF8C00",
    //     connectorColorHighlight: "#000"
    //   }
    // }}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer
        SVGBackground="rgba(0,0,0,0)"
        // background="#FFF"
        // SVGBackground="#FFF"
        width={1000}
        height={1000}
        {...props}
      >
        {children}
      </SVGViewer>
    )}
    matchComponent={Match}
    // matchComponent={({
    //   match,
    //   onMatchClick,
    //   onPartyClick,
    //   onMouseEnter,
    //   onMouseLeave,
    //   topParty,
    //   bottomParty,
    //   topWon,
    //   bottomWon,
    //   topHovered,
    //   bottomHovered,
    //   topText,
    //   bottomText,
    //   connectorColor,
    //   computedStyles,
    //   teamNameFallback,
    //   resultFallback
    // }) => (
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-around",
    //       color: "#000",
    //       width: "100%",
    //       height: "100%"
    //     }}
    //   >
    //     <div
    //       onMouseEnter={() => onMouseEnter(topParty.id)}
    //       style={{ display: "flex" }}
    //     >
    //       <div>{topParty.name || teamNameFallback}</div>
    //       <div>{topParty.resultText ?? resultFallback(topParty)}</div>
    //     </div>
    //     <div style={{ height: "1px", width: "100%", background: "#FF8C00" }} />
    //     <div
    //       onMouseEnter={() => onMouseEnter(bottomParty.id)}
    //       style={{ display: "flex" }}
    //     >
    //       <div>{bottomParty.name || teamNameFallback}</div>
    //       <div>{bottomParty.resultText ?? resultFallback(topParty)}</div>
    //     </div>
    //   </div>
    // )}
  />
);

//Fallback test data
let matches = [
  {
    id: 20464,
    name: "Semi Final - Match 1",
    nextMatchId: 20463,
    nextLooserMatchId: null,
    tournamentRoundText: "2",
    startTime: "2021-07-28T00:00:00.000+00:00",
    state: "SCORE_DONE",
    participants: [
      {
        id: "9fd1f0e6-eb92-4159-a96d-6657fbdd963e",
        resultText: null,
        isWinner: false,
        status: "NO_SHOW",
        name: "GlootOne"
      },
      {
        id: "1d11ce35-de11-49de-b48e-cec5427eb82c",
        resultText: null,
        isWinner: false,
        status: "NO_SHOW",
        name: "Alex"
      }
    ]
  },
  {
    id: 20465,
    name: "Round 1 - Match 1",
    nextMatchId: 20464,
    nextLooserMatchId: null,
    tournamentRoundText: "1",
    startTime: "2021-07-27T23:00:00.000+00:00",
    state: "SCORE_DONE",
    participants: [
      {
        id: "1d11ce35-de11-49de-b48e-cec5427eb82c",
        resultText: "1",
        isWinner: true,
        status: "PLAYED",
        name: "Alex"
      },
      {
        id: "a504c49a-e9b2-4a2e-b4b8-a2c11651c356",
        resultText: "0",
        isWinner: false,
        status: "PLAYED",
        name: "BTC"
      }
    ]
  },
  {
    id: 20466,
    name: "Round 1 - Match 2",
    nextMatchId: 20464,
    nextLooserMatchId: null,
    tournamentRoundText: "1",
    startTime: "2021-07-27T23:00:00.000+00:00",
    state: "WALK_OVER",
    participants: [
      {
        id: "9fd1f0e6-eb92-4159-a96d-6657fbdd963e",
        resultText: null,
        isWinner: false,
        status: null,
        name: "GlootOne"
      }
    ]
  },
  {
    id: 20467,
    name: "Semi Final - Match 2",
    nextMatchId: 20463,
    nextLooserMatchId: null,
    tournamentRoundText: "2",
    startTime: "2021-07-28T00:00:00.000+00:00",
    state: "WALK_OVER",
    participants: [
      {
        id: "b9a3cc7a-95d9-483a-b515-f24bd0531f45",
        resultText: null,
        isWinner: true,
        status: "WALKOVER",
        name: "spacefudg3"
      },
      {
        id: "7535778a-24db-423f-928b-ca237cff67fc",
        resultText: null,
        isWinner: false,
        status: "NO_SHOW",
        name: "SeatloN"
      }
    ]
  },
  {
    id: 20468,
    name: "Round 1 - Match 3",
    nextMatchId: 20467,
    nextLooserMatchId: null,
    tournamentRoundText: "1",
    startTime: "2021-07-27T23:00:00.000+00:00",
    state: "WALK_OVER",
    participants: [
      {
        id: "b9a3cc7a-95d9-483a-b515-f24bd0531f45",
        resultText: null,
        isWinner: false,
        status: null,
        name: "spacefudg3"
      }
    ]
  },
  {
    id: 20469,
    name: "Round 1 - Match 4",
    nextMatchId: 20467,
    nextLooserMatchId: null,
    tournamentRoundText: "1",
    startTime: "2021-07-27T23:00:00.000+00:00",
    state: "WALK_OVER",
    participants: [
      {
        id: "7535778a-24db-423f-928b-ca237cff67fc",
        resultText: null,
        isWinner: false,
        status: null,
        name: "SeatloN"
      }
    ]
  },
  {
    id: 20463,
    name: "Final - Match",
    nextMatchId: null,
    nextLooserMatchId: null,
    tournamentRoundText: "3",
    startTime: "2021-07-28T01:00:00.000+00:00",
    state: "DONE",
    participants: [
      {
        id: "b9a3cc7a-95d9-483a-b515-f24bd0531f45",
        resultText: null,
        isWinner: false,
        status: null,
        name: "spacefudg3"
      },
      { id: null, resultText: null, isWinner: false, status: "NO_PARTY" }
    ]
  }
];
