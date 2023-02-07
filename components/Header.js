import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-awesome-button/dist/styles.css";
import {
  GetLogoElement,
  TriggerBadgeEarned,
  TriggerLoginPrompt,
  IsLoggedInLoginPrompt,
  GetUsername
} from "../config";
import NotificationPollingComponent from "./NotificationPollingComponent";
import ProfileButtonComponent from "./ProfileButtonComponent";
import { AnimAppear, AnimAppearDirection } from "./utility/AnimationUtility";
import HeadingComponent from "./utility/HeadingComponent";
import { LinearProgress } from "@mui/material";

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("fighter");
  const [searchBoxFocused, setSearchBoxFocused] = useState(false);

  const searchInput = React.useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchTypeChanged = e => {
    let newType = e.target.value;
    setSearchType(newType);
    console.log(newType);
  };

  const HandleSearchChanged = e => {
    console.log(e);
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  // const handleClick = e => {
  //   console.log("Searching for " + searchTerm + " as type " + searchType);
  //   if (searchTerm != "") {
  //     const toSearch = searchTerm;
  //     // setSearchTerm(null);

  //     if (searchType == "promotion") {
  //       router.push("/search?promo=" + toSearch);
  //     } else if (searchType == "fighter") {
  //       router.push("/search?fighter=" + toSearch);
  //     } else if (searchType == "user") {
  //       router.push("/search?user=" + toSearch);
  //     } else if (searchType == "technique") {
  //       router.push("/search?technique=" + toSearch);
  //     } else if (searchType == "position") {
  //       router.push("/search?position=" + toSearch);
  //     } else if (searchType == "style") {
  //       router.push("/search?style=" + toSearch);
  //     }
  //   }
  // };

  return (
    // fixedTopScreen
    <div className=" bg-gray-900 w-full ">
      <div className="containerNavBar flex">
        <div className="flex w-3/12 mx-5">{GetLogoElement()}</div>
        <div className=" w-9/12 mx-5">
          {searchBoxFocused == false && (
            <div className="flex space-x-2 justify-end w-full">
              {/* <MenuButtonGroup /> */}

              {/* <NotificationPollingComponent /> */}

              <ProfileButtonComponent />
            </div>
          )}

          {/* <li>
                <div className="form-control">
                  <div className="input-group">
                    <select
                      className="select select-bordered"
                      onChange={handleSearchTypeChanged}
                    >
                      <option value="fighter">Fighter</option>
                      <option value="promotion">Promoter</option>
                      <option value="position">Fight Position</option>
                      <option value="technique">Fight Technique</option>
                      <option value="style">Martial Arts</option>
                      <option value="user">User</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Search…"
                      className="input input-bordered"
                      onChange={HandleSearchChanged}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          handleClick();
                        }
                      }}
                    />
                    <button className="btn btn-square" onClick={handleClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        // stroke="currentColor"
                      >
                        <path
                          // stroke-linecap="round"
                          // stroke-linejoin="round"
                          // stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li> */}

          <div
            className={
              "flex " + (searchBoxFocused == true ? "w-full" : "w-4/12")
            }
          >
            {/* <div className="form-control w-full">
              <div className="input-group w-full pt-1 ">
                <input
                  type="text"
                  placeholder={"Search " + COMPANY_NAME}
                  className={
                    "input input-bordered  w-10/12 min-h-[35px] max-h-[35px]"
                  }
                  onFocus={e => {
                    console.log(e);
                    setSearchBoxFocused(true);
                  }}
                  onBlur={e => {
                    setSearchBoxFocused(false);
                  }}
                />
                <button className="btn customAccentBackground min-h-[35px] max-h-[35px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <LinearProgress
        // variant="determinate"
        sx={{ width: "100%", height: 3 }}
        value={50}
      /> */}
    </div>
  );
};
function MenuButtonGroup() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(null);

  let menuAttr = "p-5 py-10 space-x-5 flex w-full";
  let groupAttr = "w-4/12 border-r-2 border-gray-300";

  const menuItems = [
    {
      label: "Athletes",
      content: (
        <div>
          <div className={menuAttr}>
            <div className={groupAttr}>
              <p>Jon Jones</p>
              <img
                width={200}
                src={
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.sportscasting.com%2Fwp-content%2Fuploads%2F2019%2F10%2FJon-Jones-press-confrence.jpg"
                }
              ></img>
            </div>

            <div className={groupAttr}>
              <HeadingComponent size={3}>Athletes</HeadingComponent>
              <p>Trending</p>
              <p>Nearby Athletes</p>
              <p>Most Popular</p>
              <p>Upcoming Fighters</p>
              <p>Hall of Fame</p>
              <p></p>
            </div>
            <div className={groupAttr}>
              <HeadingComponent size={3}>Referees</HeadingComponent>
              <p>Nearby</p>
              <p>Most Popular</p>
              <p>Most Active 2022</p>
            </div>
            <div className={groupAttr}>
              <HeadingComponent size={3}>Judges</HeadingComponent>
              <p>Most Active 2022</p>
              <p>Most Active All Time</p>
              <p>Most Aligned Decisions with Community</p>
              <p>Most Conflicting Decisions with Community</p>
              <p>Judges with Fight Experience</p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      )
    },

    {
      label: "Events",
      content: (
        <div className={menuAttr}>
          <div className={groupAttr}>
            <p>UFC 200</p>
            <img
              width={180}
              src={
                "https://cdn.mmaweekly.com/wp-content/uploads/2016/07/UFC-200-Tate-vs-Nunes-Fight-Poster.jpg"
              }
            ></img>
          </div>

          <div className={groupAttr}>
            <HeadingComponent size={3}>Events</HeadingComponent>
            <Link href={"/event"}>
              <a className="hover:link">
                <p>Upcoming Events</p>
              </a>
            </Link>
            <Link href={"/event"}>
              <a className="hover:link">
                <p>Recent Events</p>
              </a>
            </Link>
            <Link href={"/event"}>
              <a className="hover:link">
                <p>Nearby Events</p>
              </a>
            </Link>
            <Link href={"/event/create"}>
              <a className="hover:link">
                <p>Create a new Event</p>
              </a>
            </Link>
            <Link href={"/venue"}>
              <a className="hover:link">
                <p>Find An Event Venue</p>
              </a>
            </Link>
            <Link href={"/venue"}>
              <a className="hover:link">
                <p>Create an event promotional poster</p>
              </a>
            </Link>
            <Link href={"/list/directory/event"}>
              <a className="hover:link">
                <p>Community Event Lists</p>
              </a>
            </Link>
          </div>

          <div className={groupAttr}>
            <HeadingComponent size={3}>Compete</HeadingComponent>
            <p> My Events </p>
            <p> Open Applications</p>
            <Link href="/event/kickstart">
              <a>
                <p> Kickstart an Event</p>
              </a>
            </Link>
          </div>
          <div className={groupAttr}>
            <HeadingComponent size={3}>Trending</HeadingComponent>
            <p>Most Popular Events - 2022</p>
            <p>Most Popular Events - All Time</p>
          </div>
        </div>
      )
    },
    {
      label: "Learn",
      content: (
        <div className={menuAttr}>
          <div className={groupAttr}>
            <HeadingComponent size={3}>Techiques</HeadingComponent>
            <Link href="/library">
              <a className="hover:link">
                <p>Technique Library</p>
              </a>
            </Link>
            <Link href="/library/courses">
              <a className="hover:link">
                <p>Courses</p>
              </a>
            </Link>
            <Link href="/list/directory/technique">
              <a className="hover:link">
                <p>Community Technique Lists</p>
              </a>
            </Link>
            <Link href="/library/recent">
              <a className="hover:link">
                <p>Recently Added Techniques</p>
              </a>
            </Link>
            <Link href="/library/questions">
              <a className="hover:link">
                <p>Community Questions</p>
              </a>
            </Link>

            <Link href="/trending/technique ">
              <a className="hover:link">
                <p>Trending Techniques</p>
              </a>
            </Link>
          </div>

          {/* <div className={groupAttr}>
            <HeadingComponent size={3}>Courses</HeadingComponent>
            <Link href="/library/course/1 ">
              <a className="hover:link">
                <p>Self Defense</p>
              </a>
            </Link>

            <Link href="/library/course/4 ">
              <a className="hover:link">
                <p>Jujitsu</p>
              </a>
            </Link>

            <Link href="/library/course/3 ">
              <a className="hover:link">
                <p>Wrestling</p>
              </a>
            </Link>

            <Link href="/library/course/2 ">
              <a className="hover:link">
                <p>Judo</p>
              </a>
            </Link>

            <Link href="/library/courses ">
              <a className="hover:link">
                <p>View All Courses</p>
              </a>
            </Link>
          </div>

          <div className={groupAttr}>
            <HeadingComponent size={3}>Near Me</HeadingComponent>

            <Link href="/trending/position  ">
              <a className="hover:link">
                <p>Introduction Lessons - TODO</p>
              </a>
            </Link>

            <Link href="/trending/position  ">
              <a className="hover:link">
                <p>Gyms -TODO</p>
              </a>
            </Link>

            <Link href="/trending/position  ">
              <a className="hover:link">
                <p>Instructors - TODO</p>
              </a>
            </Link>
          </div>
          <div className={groupAttr}>
            <a className="link link-primary">
              <img
                width={250}
                src={DATA_SERVER_IMAGE_ADDRESS + "/martialarts/root2.png"}
              ></img>
            </a>
          </div> */}
        </div>
      )
    },

    // {
    //   label: "Near Me",
    //   content: (
    //     <div className={menuAttr}>
    //       <p>People</p>
    //       <p>Find a training partner</p>
    //       <p>Managers</p>
    //       <p>Gym Finder</p>
    //       <p>Stores</p>
    //       <p>Events</p>
    //       <p>Jobs</p>
    //       <p>Available Venues</p>
    //     </div>
    //   )
    // },

    {
      label: "Promoters",
      content: (
        <div className={menuAttr}>
          <Link href="/promotion">
            <a>Search</a>
          </Link>
        </div>
      )
    },

    {
      label: "Fights",
      content: (
        <div className={menuAttr}>
          <div className={groupAttr}>
            <Link href="/bout">
              <a className="hover:link text-3xl">
                <p> Search</p>
              </a>
            </Link>
          </div>
          <div className={groupAttr}>
            <Link href="/bout/top">
              <a className="hover:link">
                <p>Highest Rated Fights</p>
              </a>
            </Link>
            <Link href="/bout/decisions">
              <a className="hover:link">
                <p>Most Controversial Decisions</p>
              </a>
            </Link>
            <Link href="/trending/bout">
              <a className="hover:link">
                <p>Trending Fights</p>
              </a>
            </Link>
            <Link href="/list/directory/bout">
              <a className="hover:link">
                <p>Community Fight Lists</p>
              </a>
            </Link>
          </div>
          <div className={groupAttr}>
            <a
              className="hover:link"
              onClick={() => {
                if (IsLoggedInLoginPrompt("View your rated fight history")) {
                  router.push("/user/" + GetUsername() + "/fight-rating");
                }
              }}
            >
              <p>My Rated Fights</p>
            </a>

            <a
              className="hover:link"
              onClick={() => {
                if (
                  IsLoggedInLoginPrompt(
                    "View your fight result decision history"
                  )
                ) {
                  router.push("/user/" + GetUsername() + "/fight-decision");
                }
              }}
            >
              <p>My Decision Vote History</p>
            </a>
          </div>
        </div>
      )
    },

    {
      label: "Martial Arts",
      content: (
        <div className={menuAttr}>
          <div className={groupAttr}>
            <img
              width={200}
              src={
                "https://img.grouponcdn.com/bynder/3CLPRFxg5TSn9YNLuWEiSNpQjU6Q/3C-2048x1229/v1/t440x300.jpg"
              }
            ></img>
            <p>Which Martial Art is best for me?</p>
          </div>
          <div className={groupAttr}>
            <HeadingComponent size={3}>Striking Type</HeadingComponent>
            <p>Mixed Martial Arts</p>
            <p>Boxing</p>
            <p>Muay Thai</p>
            <p>Kickboxing</p>
            <p>Karate</p>
            <Link href="/martialart?striking">
              <a className="hover:link">
                <p>View All</p>
              </a>
            </Link>
          </div>

          <div className={groupAttr}>
            <HeadingComponent size={3}>Grappling Type</HeadingComponent>
            <p>Judo</p>
            <p>Jujitsu</p>
            <p>Sambo</p>
            <p>Wrestling</p>
            <Link href="/martialart?grappling">
              <a className="hover:link">
                <p>View All</p>
              </a>
            </Link>
          </div>

          <div className={groupAttr}>
            <HeadingComponent size={3}>Weapons Type</HeadingComponent>
            <p>Fencing</p>
            <p>Hema</p>
            <p>Kendo</p>
            <p>Kali</p>
            <Link href="/martialart?weapons">
              <a className="hover:link">
                <p>View All</p>
              </a>
            </Link>
          </div>
        </div>
      )
    },
    {
      label: "Debug",
      content: (
        <div className="flex">
          <div>
            <li>
              <Link href={"/technique/130"}>
                <button className="btn ">Technique</button>
              </Link>
            </li>
            <li>
              <Link href={"/technique-type/1"}>
                <button className="btn ">Technique Type</button>
              </Link>
            </li>
            <li>
              <div>
                <Link href={"/person/312541"}>
                  <button className="btn ">Fighter (jj)</button>
                </Link>
              </div>
              <div>
                <Link href={"/person/153832"}>
                  <button className="btn ">Fighter (khabib)</button>
                </Link>
              </div>
              <div>
                <Link href={"/person/200410"}>
                  <button className="btn ">Fighter (Herb)</button>
                </Link>
              </div>
              <div>
                <Link href={"/person/1103247"}>
                  <button className="btn ">Judge (sal mato)</button>
                </Link>
              </div>

              <div>
                <Link href={"/person/204182"}>
                  <button className="btn ">Fighter (Goddard)</button>
                </Link>
              </div>
            </li>
          </div>
          <button
            onClick={() => {
              TriggerLoginPrompt();
            }}
          >
            LOGIN_PROMPT
          </button>
          <button
            onClick={() => {
              TriggerBadgeEarned(
                "Deez Nuts BADGE",
                "Tickle deez nuts for 10 seconds",
                100,
                "NONE.JPG"
              );

              //TriggerLoginPrompt();
            }}
          >
            BADGE_EARNED
          </button>

          <li>
            <Link href={"/event/35062"}>
              <button className="btn ">Event</button>
            </Link>
          </li>
          <li>
            <li>
              <Link href={"/promotion/16"}>
                <button className="btn ">Promotion</button>
              </Link>
            </li>
            <li>
              <Link href={"/promotion/16/tournament"}>
                <button className="btn ">Promo Tournament</button>
              </Link>
            </li>
            <li>
              <Link href={"/promotion/16/tournament/1"}>
                <button className="btn ">Tournament Individual</button>
              </Link>
            </li>
          </li>
          <div>
            <li>
              <Link href={"/bout/896485"}>
                <button className="btn ">Bout</button>
              </Link>
              <Link href={"/bout/466354"}>
                <button className="btn ">Bout 2</button>
              </Link>
            </li>
          </div>
          <li>
            <Link href={"/position/36"}>
              <button className="btn ">Position (standing)</button>
            </Link>
            <Link href={"/position/9"}>
              <button className="btn ">Position (walled)</button>
            </Link>
            <Link href={"/position/13"}>
              <button className="btn ">Position (cg)</button>
            </Link>
          </li>
          <li>
            <Link href={"/martialart/1"}>
              <button className="btn ">Martial Art</button>
            </Link>
          </li>
          <li>
            <div>
              <Link href={"/division/21"}>
                <button className="btn ">Division</button>
              </Link>
            </div>
            <div>
              <Link href={"/promotion/16/division"}>
                <button className="btn ">Division Directory</button>
              </Link>
            </div>
          </li>
          <li>
            <Link href={"/faceoff"}>
              <button className="btn ">Fighter Face Off</button>
            </Link>
          </li>
          <li>
            <Link href={"/promotion/16/bout"}>
              <button className="btn ">Promotion Bout Search by Tags</button>
            </Link>
          </li>
          <li>
            <Link href={"/gym/1166232"}>
              <button className="btn ">Gym</button>
            </Link>
          </li>
          <li>
            <div>
              <Link href={"/trending/fighter"}>
                <button className="btn ">pop fighter</button>
              </Link>
            </div>
            <div>
              <Link href={"/trending/event"}>
                <button className="btn ">pop event</button>
              </Link>
            </div>
            <div>
              <Link href={"/trending/promotion"}>
                <button className="btn ">pop promo</button>
              </Link>
            </div>
            <div>
              <Link href={"/trending/technique"}>
                <button className="btn ">pop technique</button>
              </Link>
            </div>
            <div>
              <Link href={"/trending/bout"}>
                <button className="btn ">pop Bouts</button>
              </Link>
            </div>

            <div>
              <Link href={"/trending/list"}>
                <button className="btn ">pop List</button>
              </Link>
            </div>
          </li>
        </div>
      )
    }
  ];

  let menuButtonElements = menuItems.map((item, index) => (
    <motion.button
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <Button
        className={
          " logoFont pt-2  text-base  hover:border-b-8 border-blue-500 transition duration-1000 ease-in-out " +
          (activeMenu == index ? " text-blue-500" : " text-white")
        }
        onMouseEnter={() => setActiveMenu(index)}
      >
        {item.label}
      </Button>
    </motion.button>
  ));

  return (
    <div key={activeMenu}>
      <div className="menureddit" onMouseLeave={() => setActiveMenu(null)}>
        <div className="z-10 menureddit space-x-5">{menuButtonElements}</div>

        <AnimAppearDirection
          directionX={0}
          directionY={-30}
          speed={10}
          className="z-1 menu-contentreddit drop-shadow-2xl customAccentBackground text-white"
        >
          {activeMenu != null && (
            <div>
              <div
                className="container"
                onClick={() => {
                  setActiveMenu(null);
                }}
              >
                {menuItems[activeMenu].content}
              </div>
            </div>
          )}
        </AnimAppearDirection>
      </div>
    </div>
  );
}

export default Header;
