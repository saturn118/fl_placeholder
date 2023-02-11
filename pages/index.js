import BoutCompactComponent from "@components/Bouts/BoutCompactComponent";
import FlagComponent from "@components/FlagComponent";
import Meta from "@components/Meta";
import NewsFeedComponent from "@components/NewsFeedComponent";
import OnHoverMenuComponent from "@components/OnHoverMenuComponent";
import { BodyColumnMainSectionComponent } from "@components/sections/BodyHeaderSectionComponent";
import SlideshowComponent from "@components/sections/SlideshowComponent";
import HeadingComponent from "@components/utility/HeadingComponent";
import { Avatar, Chip } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DATA_SERVER_ADDRESS,
  DATA_SERVER_IMAGE_ADDRESS,
  IsLoggedIn
} from "../config";
import {
  ConverDateToDaysAgoString,
  FollowedFighterActivityFeedAction
} from "../helpers/api";
import LandingComponent from "@components/3d/LandingComponent";

//Home page of the website

export default function Home({
  statsData,
  featuredData,
  trendingPeopleData,
  trendingTechniqueData,
  favouriteBoutsData,
  landingData
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [followedFighterFeed, setFollowedFighterFeed] = useState([]);

  useEffect(() => {
    setLoggedIn(IsLoggedIn());

    if (loggedIn) {
      FollowedFighterActivityFeedAction().then(data => {
        console.log("Followed Fighter Feed Debug");
        console.log(data);
        setFollowedFighterFeed(data.feed);
      });
    }
  }, []);

  if (loggedIn == false)
    return <LandingComponent landingData={landingData} statsData={statsData} />;

  // if (!loggedIn) {
  //   return <p>Original Landing page</p>;
  // }

  let followedUpcomingFightElements = followedFighterFeed.map(entry => {
    return (
      <div>
        <OnHoverMenuComponent
          anchorVerticalCustom="center"
          anchorHorizontalCustom="right"
          popupContent={
            <div>
              <BoutCompactComponent bout={entry.postTypeData} />
            </div>
          }
        >
          <Link href="/fdfd">
            <a>
              <div className="space-x-3 flex">
                <p className="w-5/12 customAccentText hover:link">
                  {entry.name}
                </p>
                <Chip
                  className="w-3/12"
                  label={entry.postTypeData.activityName}
                />
                <p>{ConverDateToDaysAgoString(entry.postTypeTimestamp)}</p>
              </div>
            </a>
          </Link>
        </OnHoverMenuComponent>
      </div>
    );
  });
  let topBoutsElements = favouriteBoutsData.data.slice(0, 9).map(entry => {
    return <BoutCompactComponent bout={entry.boutData} />;
  });

  let trendingPeopleElements = trendingPeopleData.popular
    .slice(0, 5)
    .map(entry => {
      return (
        <div className="border-b-2 border-blue-500 flex">
          {/* <Avatar
            variant="rounded"
            sx={{ width: 75, height: 75 }}
            src={DATA_SERVER_IMAGE_ADDRESS + entry.entity.imageUrl}
          /> */}

          <p className="pl-5 customAccentText hover:link w-10/12 ">
            {entry.entity.name}
          </p>
        </div>
      );
    });
  trendingPeopleElements = trendingPeopleElements.slice(0, 8);
  let trendingTechniqueElements = trendingTechniqueData.popular.map(entry => {
    return (
      <div className="w-3/12">
        <Avatar
          variant="rounded"
          sx={{ width: 100, height: 100 }}
          src={DATA_SERVER_IMAGE_ADDRESS + entry.entity.imageUrl}
        />
        {/* <img src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}></img> */}
        <HeadingComponent textColor=" overflow-hidden" size={5}>
          {entry.entity.name}
        </HeadingComponent>
      </div>
    );
  });
  trendingTechniqueElements = trendingTechniqueElements.slice(0, 8);

  let inputData = [
    <Avatar
      variant="rounded"
      sx={{ width: 250, height: 250 }}
      src={DATA_SERVER_IMAGE_ADDRESS + "booty.jpg"}
    />,
    <Avatar
      variant="rounded"
      sx={{ width: 250, height: 250 }}
      src={DATA_SERVER_IMAGE_ADDRESS + "booty2.jpg"}
    />,
    <Avatar
      variant="rounded"
      sx={{ width: 250, height: 250 }}
      src={DATA_SERVER_IMAGE_ADDRESS + "booty3.jpg"}
    />,
    <Avatar
      variant="rounded"
      sx={{ width: 250, height: 250 }}
      src={DATA_SERVER_IMAGE_ADDRESS + "advert2.jpg"}
    />
  ];
  let eventElements = <SlideshowComponent inputData={inputData} />;

  // let eventElements = featuredData.events.map(entry => {
  //   return (
  //     <div className="border-b-2 w-3/12 pb-2 border-blue-500">
  //       <Link href={"/event/" + entry.id}>
  //         <a>
  //           <div>
  //             <Avatar
  //               variant="rounded"
  //               sx={{ width: 200, height: 240 }}
  //               src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
  //             />
  //             {/* <img src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}></img> */}
  //             <HeadingComponent size={5}>{entry.name}</HeadingComponent>
  //           </div>
  //         </a>
  //       </Link>
  //     </div>
  //   );
  // });
  let eventLocalElements = featuredData.events.map(entry => {
    return (
      <div className="border-b-2 border-blue-500 text-black">
        <OnHoverMenuComponent
          anchorVerticalCustom="center"
          anchorHorizontalCustom="right"
          popupContent={
            <div className="flex p-4 w-12/12">
              <Avatar
                variant="rounded"
                sx={{ width: 300, height: 400 }}
                src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
              />
              {FlagComponent(entry.countryCode)}
            </div>
          }
        >
          <Link href={"/event/" + entry.id}>
            <a>
              <div className="flex">
                <p className="w-9/12">{entry.name}</p>
                <p>{ConverDateToDaysAgoString(entry.dateOfEvent)}</p>
              </div>
            </a>
          </Link>
        </OnHoverMenuComponent>
      </div>
    );
  });

  return (
    <div>
      <Meta />

      <BodyColumnMainSectionComponent
        mainContent={
          <div className="w-full px-5 space-y-2 justify-center">
            <div className="w-12/12 text-white">
              <div className="flex w-full space-x-1 ">{eventElements}</div>
            </div>

            <NewsFeedComponent displayFilters={true} showReplies={true} />
          </div>
        }
        sideContent={
          <div className="w-full px-10 space-y-10">
            <div className="w-full text-white bg-gray-300">
              <HeadingComponent
                textColor={" w-full customAccentBackground text-white"}
                size={3}
              >
                Trending
              </HeadingComponent>
              <div className="w-full border-t-2 space-y-5 pt-3 border-blue-500 text-black">
                {trendingPeopleElements}
              </div>
            </div>
            <div className="w-full text-white bg-gray-300">
              <HeadingComponent
                textColor={" w-full customAccentBackground text-white"}
                size={3}
              >
                Upcoming Events
              </HeadingComponent>
              <div className="w-full border-t-2 space-y-5 pt-3 border-blue-500">
                {eventLocalElements}
              </div>
            </div>
            <div className="w-full text-white bg-gray-300">
              <div className="flex customAccentBackground w-full ">
                <HeadingComponent textColor={" text-white"} size={3}>
                  Upcoming Fights
                </HeadingComponent>

                <button className="btn ml-10">View All</button>
              </div>
              <div className="w-full border-t-2 space-y-5 pt-3 border-blue-500 text-black">
                {followedUpcomingFightElements}
              </div>
            </div>
          </div>
        }
      ></BodyColumnMainSectionComponent>

      <div className="pt-10 pb-10">
        {/* <div className="mt-3 flex w-12/12 ">
          <div className="w-7/12">
            <HeadingComponent
              showBar={true}
              textColor={" w-full text-white"}
              size={3}
            >
              Trending Athletes
            </HeadingComponent>
            <div className="text-white flexwrap ">{trendingPeopleElements}</div>
          </div>
        </div> */}

        {/* <div className="w-12/12">
          <HeadingComponent
            showBar={true}
            textColor={" w-full customAccentText"}
            size={3}
          >
            Trending Bouts
          </HeadingComponent>
          <div className="text-white flexwrap">{topBoutsElements}</div>
        </div> */}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  //const res = await fetch(DATA_SERVER_ADDRESS + "api/stats/landing-page");
  const statsData = statsCached;
  const landingData = landingDataCached;

  const featuredData = null;

  const trendingPeopleData = null;

  const trendingTechniqueData = null;

  const favouriteBoutsData = null;
  return {
    props: {
      statsData,
      featuredData,
      trendingPeopleData,
      trendingTechniqueData,
      favouriteBoutsData,
      landingData
    }
  };
}

const statsCached = {
  stats: [
    ["people", "1.11M"],
    ["events", "725.73K"],
    ["fights", "3.18M"],
    ["martial arts", "58"],
    ["years of records", "122"],
    ["techniques", "294"]
  ]
};

const landingDataCached = {
    "activities": [
        {
            "id": 38,
            "imageUrl": "martialarts/style_images/vale_tudo.jpg",
            "name": "vale tudo"
        },
        {
            "id": 13,
            "imageUrl": "martialarts/style_images/savate.jpg",
            "name": "savate"
        },
        {
            "id": 16,
            "imageUrl": "martialarts/style_images/silat.jpg",
            "name": "silat"
        },
        {
            "id": 18,
            "imageUrl": "martialarts/style_images/kalari.jpg",
            "name": "kalari"
        },
        {
            "id": 2,
            "imageUrl": "martialarts/style_images/grappling.jpg",
            "name": "grappling"
        },
        {
            "id": 4,
            "imageUrl": "martialarts/style_images/judo.jpg",
            "name": "judo"
        },
        {
            "id": 6,
            "imageUrl": "martialarts/style_images/combat_sambo.jpg",
            "name": "combat sambo"
        },
        {
            "id": 7,
            "imageUrl": "martialarts/style_images/sumo.jpg",
            "name": "sumo"
        },
        {
            "id": 10,
            "imageUrl": "martialarts/style_images/freestyle_wrestling.jpg",
            "name": "freestyle wrestling"
        },
        {
            "id": 12,
            "imageUrl": "martialarts/style_images/folk_wrestling.jpg",
            "name": "folk wrestling"
        }
    ],
    "fighters": [
        {
            "id": 312541,
            "imageUrl": "/www.tapology.com/pages/fighter_images/275_____default_____Jones-Jon-UFCV2-1.jpg",
            "name": "Jon Jones"
        },
        {
            "id": 292105,
            "imageUrl": "/www.tapology.com/pages/fighter_images/74841_____default_____Angela-Lee.jpg",
            "name": "Angela Lee"
        },
        {
            "id": 292104,
            "imageUrl": null,
            "name": "Shiloh Torres-Umi"
        },
        {
            "id": 292109,
            "imageUrl": null,
            "name": "Stu Jones"
        }
    ],
    "positions": [
        {
            "id": 14,
            "imageUrl": "martialarts\\position_images\\technical_mount.jpg",
            "name": "technical mount"
        },
        {
            "id": 15,
            "imageUrl": "martialarts\\position_images\\closed_guard.jpg",
            "name": "closed guard"
        },
        {
            "id": 16,
            "imageUrl": "martialarts\\position_images\\closed_guard_standing.jpg",
            "name": "closed guard standing"
        },
        {
            "id": 17,
            "imageUrl": "martialarts\\position_images\\50-50.jpg",
            "name": "50-50"
        }
    ],
    "promoters": [
        {
            "id": 16,
            "imageUrl": "www.tapology.com\\pages\\promotion_images\\UFC-Ultimate-Fighting-Championship-logo.jpg",
            "name": "Ultimate Fighting Championship"
        },
        {
            "id": 127,
            "imageUrl": "www.tapology.com\\pages\\promotion_images\\28279558_1729633990393182_2700289092087194737_n.png",
            "name": "ONE Championship"
        },
        {
            "id": 128,
            "imageUrl": "www.tapology.com\\pages\\promotion_images\\Caged_Steel-logo.png",
            "name": "Caged Steel"
        },
        {
            "id": 129,
            "imageUrl": "www.tapology.com\\pages\\promotion_images\\Fight-King-MMA-promoter-logo.jpg",
            "name": "Fight King"
        }
    ],
    "tournamentTypes": {
        "1": {
            "imageUrl": "/single-elimination.svg",
            "name": "single elimination",
            "type": "tournament"
        },
        "2": {
            "imageUrl": "/double-elimination.svg",
            "name": "double elimination",
            "type": "tournament"
        },
        "3": {
            "imageUrl": "/round-robin.svg",
            "name": "round robin",
            "type": "tournament"
        },
        "4": {
            "imageUrl": "/double-elimination.svg",
            "name": "triple elimination",
            "type": "tournament"
        },
        "5": {
            "imageUrl": "/individual-bouts.svg",
            "name": "1 vs 1",
            "type": "single"
        },
        "6": {
            "imageUrl": "/individual-bouts.svg",
            "name": "best of 3",
            "type": "single"
        }
    }
};
