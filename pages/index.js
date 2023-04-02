import BoutCompactComponent from "@components/Bouts/BoutCompactComponent";
import FlagComponent from "@components/FlagComponent";
import Meta from "@components/Meta";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import NewsFeedComponent from "@components/NewsFeedComponent";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import ListIcon from "@mui/icons-material/List";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import OnHoverMenuComponent from "@components/OnHoverMenuComponent";
import {
  BodyColumnMainSectionComponent,
  BodyColumnResponsiveBottomComponent
} from "@components/sections/BodyHeaderSectionComponent";
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
  FollowedFighterActivityFeedAction,
  accountGetFollowingAction,
  GetPlaylistAction
} from "../helpers/api";
import LandingComponent from "@components/3d/LandingComponent";
import AdvertComponent from "@components/AdvertComponent";

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
  const [followingData, setFollowingData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  useEffect(() => {
    let ln = IsLoggedIn();

    if (ln) {
      FollowedFighterActivityFeedAction().then(data => {
        console.log("Followed Fighter Feed Debug");
        console.log(data);
        setFollowedFighterFeed(data.feed);
      });

      GetPlaylistAction().then(data => {
        console.log("danny Retriving playlists");
        console.log(data);
        setPlaylistData(data.data.playlists);
      });

      console.log("Following debug pre ");
      accountGetFollowingAction("fighter").then(data => {
        console.log("Following data debug");
        console.log(data);
        console.log(data.data);
        setFollowingData(data.data.data);
      });
    }

    setLoggedIn(ln);
  }, []);

  if (loggedIn == false)
    return <LandingComponent landingData={landingData} statsData={statsData} />;

  let followedUpcomingFightElements = followedFighterFeed.map(entry => {
    return (
      <div className="">
        {/* <OnHoverMenuComponent
          anchorVerticalCustom="center"
          anchorHorizontalCustom="right"
          popupContent={
            <div>
              <BoutCompactComponent bout={entry.postTypeData} />
            </div>
          }
        > */}
        <Link href="/fdfd">
          <a>
            <div className="spaceBetween text-gray-600  rounded hover:bg-blue-500 hover:text-white hover:rounded-md">
              <p className="w-5/12 ">{entry.name}</p>
              {/* <Chip
                  className="w-3/12"
                  label={entry.postTypeData.activityName}
                /> */}
              <p>{ConverDateToDaysAgoString(entry.postTypeTimestamp)}</p>
            </div>
          </a>
        </Link>
        {/* </OnHoverMenuComponent> */}
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
      <div className="text-gray-700">
        {/* <OnHoverMenuComponent
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
        > */}
        <Link href={"/event/" + entry.id}>
          <a>
            <div className="flex  rounded  rounded hover:bg-blue-500 hover:text-white hover:rounded-md">
              <p className="w-9/12 truncate pr-2">{entry.name}</p>
              <p>{ConverDateToDaysAgoString(entry.dateOfEvent)}</p>
            </div>
          </a>
        </Link>
        {/* </OnHoverMenuComponent> */}
      </div>
    );
  });

  function SidebarEntry(entyName, imageUrl = null, optionalIcon = null) {
    let showImage = optionalIcon ? false : true;

    return (
      <button className="w-full">
        <ListItem
          disablePadding
          className="flex pl-2 space-x-5 w-full py-1 hover:bg-blue-500 hover:text-white hover:rounded-md"
        >
          {optionalIcon}
          {showImage && (
            <Avatar
              variant="rounded"
              src={imageUrl}
              sx={{ width: 30, height: 30 }}
            />
          )}
          <p className="">{entyName}</p>
        </ListItem>
      </button>
    );
  }

  return (
    <div className="centerX pt-5">
      <Meta />

      <BodyColumnResponsiveBottomComponent
        flip={true}
        mainContent={
          <div className="w-full flex px-5 centerX space-y-2 ">
            {/* <div className="w-full  text-white justify-end">
              <div className="flex w-full space-x-1 ">{eventElements}</div>
            </div> */}

            <div className="w-3/12 pr-10 ">
              <List>
                <ListItem disablePadding className=" w-full">
                  <HeadingComponent textColor={"customAccentText"} size={6}>
                    EXPLORE
                  </HeadingComponent>
                </ListItem>
                <div>
                  {[
                    ["Records", "/records", <EmojiEventsIcon />],
                    ["Techniques", "/library", <SportsKabaddiIcon />],
                    ["Trending", "/trending/fighter", <WhatshotIcon />],
                    ["Rankings", "/rankings", <LeaderboardIcon />],
                    ["Martial Arts", "/", <SportsMartialArtsIcon />]
                  ].map(entry => {
                    return (
                      <Link href={entry[1]}>
                        <a>{SidebarEntry(entry[0], null, entry[2])}</a>
                      </Link>
                    );
                  })}
                </div>

                <Divider className="my-3" />
                <ListItem disablePadding className=" w-full">
                  <HeadingComponent
                    textColor={"customAccentText"}
                    size={6}
                    showArrow={true}
                    showArrowText={false}
                  >
                    PLAYLISTS
                  </HeadingComponent>
                </ListItem>
                <div>
                  {[["Watchlist", <OndemandVideoIcon />]].map(entry => {
                    return SidebarEntry(entry[0], null, entry[1]);
                  })}
                  {playlistData.map(entry => {
                    return (
                      <Link href={"/list/" + entry.playlistId}>
                        <a>
                          {SidebarEntry(
                            entry.playlistName,
                            null,
                            <PlaylistPlayIcon />
                          )}
                        </a>
                      </Link>
                    );
                  })}
                </div>

                <Divider className="my-3" />
                <ListItem disablePadding className=" w-full ">
                  <HeadingComponent
                    showArrow={true}
                    showArrowText={false}
                    textColor={"customAccentText"}
                    size={6}
                  >
                    FOLLOWING
                  </HeadingComponent>
                </ListItem>
                <div>
                  {followingData.map(entry => {
                    return (
                      <Link href={"/person/" + entry.followId}>
                        <a>
                          {SidebarEntry(
                            entry.name,
                            DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl
                          )}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </List>
            </div>

            <div className="w-9/12 centerX ">
              <NewsFeedComponent displayFilters={true} showReplies={true} />
            </div>
          </div>
        }
        sideContent={
          <div className="hide_on_small w-full space-y-3 pr-3">
            <div className="w-full text-white  rounded-xl">
              <HeadingComponent
                textColor={" w-6/12  customAccentText "}
                size={6}
                showArrow={true}
                showArrowText={false}
              >
                {"EVENT SCHEDULE".toUpperCase()}
              </HeadingComponent>
              <div className="w-full border-t-2 space-y-1 border-gray-200">
                {eventLocalElements}
              </div>
            </div>
            <AdvertComponent height2="200" />

            <div className="w-full ">
              <div className=" ">
                <HeadingComponent
                  textColor={" w-6/12  customAccentText "}
                  size={6}
                  showArrowText={false}
                  showArrow={true}
                >
                  {"FIGHT SCHEDULE".toUpperCase()}
                </HeadingComponent>
              </div>
              <div className="w-full border-t-2 space-y-1 pt-3 border-gray-200 text-black">
                {followedUpcomingFightElements}
              </div>
            </div>
            <AdvertComponent height2="200" />

            {/* <div className="w-full text-white bg-gray-300">
              <HeadingComponent
                textColor={" w-full customAccentBackground text-white"}
                size={3}
              >
                Trending
              </HeadingComponent>
              <div className="w-full border-t-2 space-y-5 pt-3 border-blue-500 text-black">
                {trendingPeopleElements}
              </div>
            </div> */}
          </div>
        }
      />

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
  const res = await fetch(DATA_SERVER_ADDRESS + "api/stats/landing-page");
  const statsData = await res.json();

  const landingRequest = await fetch(
    DATA_SERVER_ADDRESS + "landing-page-content"
  );
  const landingData = await landingRequest.json();

  const featuredRequest = await fetch(DATA_SERVER_ADDRESS + "events/featured");
  const featuredData = await featuredRequest.json();

  const trendingPeopleRequest = await fetch(
    DATA_SERVER_ADDRESS + `popularity/fighter`
  );
  const trendingPeopleData = await trendingPeopleRequest.json();

  const trendingTechniqueRequest = await fetch(
    DATA_SERVER_ADDRESS + `popularity/technique`
  );
  const trendingTechniqueData = await trendingTechniqueRequest.json();

  const favouriteBoutsRequest = await fetch(
    DATA_SERVER_ADDRESS + "activity/0/community-bout-favourite"
  );
  const favouriteBoutsData = await favouriteBoutsRequest.json();

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
