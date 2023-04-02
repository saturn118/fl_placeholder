import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import "react-awesome-button/dist/styles.css";
import {
  GetLogoElement,
  TriggerBadgeEarned,
  TriggerLoginPrompt,
  IsLoggedInLoginPrompt,
  IsLoggedIn,
  GetUsername,
  BACKGROUND_ATTR,
  dev,
  IsSmallScreen
} from "../config";
import NotificationPollingComponent from "./NotificationPollingComponent";
import ProfileButtonComponent from "./ProfileButtonComponent";
import { AnimAppear, AnimAppearDirection } from "./utility/AnimationUtility";
import HeadingComponent from "./utility/HeadingComponent";
import { LinearProgress, TextField, Autocomplete, Avatar } from "@mui/material";
import { AddUserFeedPostAction } from "helpers/api";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DrawerComponent from "./DrawerComponent";
import RecentlyViewedComponent from "./RecentlyViewedComponent";
import { IndividualTag } from "./FightSearchPreviewTagsComponent";
import SocialMediaLinksComponent from "./utility/SocialMediaLinksComponent";
import AdvertComponent from "./AdvertComponent";

const SearchDropdownComponent = ({ searchTrigger }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchType, setSearchType] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const searchBoxRef = React.useRef(null);
  const suggestionBoxRef = React.useRef(null);
  const dropDownRef = React.useRef(null);
  const router = useRouter();
  const handleSearchBoxClick = () => {
    setShowSuggestions(true);
  };

  const handleDocumentClick = event => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target) &&
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target) &&
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target)
    ) {
      setSearchType(null);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex bg-white rounded">
        <select
          className="customAccentBackground text-white rounded px-2"
          onChange={e => {
            console.log(e.target.value);

            setSearchType(e.target.value);
          }}
          onClick={handleSearchBoxClick}
          ref={dropDownRef}
        >
          {[
            ["figher", "People"],
            ["event", "Events"],
            ["user", "Users"],
            ["technique", "Techniques"],
            ["promo", "Promoters"],
            ["position", "Stances"],
            ["martialart", "Martial Art"]
          ].map(entry => {
            return <option value={entry[0]}>{entry[1]}</option>;
          })}
        </select>
        <input
          className="w-full bg-white  rounded pl-3 border-none outline-none border-0 "
          type="text"
          onClick={handleSearchBoxClick}
          ref={searchBoxRef}
          placeholder={"Search fight legacy"}
          onChange={e => {
            setSearchTerm(e.target.value);
            console.log(e.target.value);
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              searchTrigger(router, searchTerm, searchType);

              setShowSuggestions(false);
            }
          }}
        />
        <div className="">
          <button>
            <SearchIcon
              fontSize="large"
              color="info"
              onClick={() => {
                searchTrigger(router, searchTerm, searchType);

                setShowSuggestions(false);
              }}
            />
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div
          className={
            BACKGROUND_ATTR +
            ` mx-5 rounded-xl  border-r-10 rounded-xl primarybackground suggestion-box${
              showSuggestions ? " show" : ""
            }`
          }
          ref={suggestionBoxRef}
        >
          <div className="px-5 pb-5 ">
            <RecentlyViewedComponent
              displayFilter={null}
              fuzzyRefine={true}
              fuzzyTerm={searchTerm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchBoxFocused, setSearchBoxFocused] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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

  useEffect(() => {}, [searchBoxFocused]);

  useEffect(() => {
    setLoggedIn(IsLoggedIn());
  }, []);

  const HandleSearchChanged = e => {
    console.log(e);
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  let searchBoxElement = (
    <div className={searchBoxFocused == true ? "w-full" : "w-full"}>
      <div className="form-control w-full">
        <div className="flex  pt-1 ">
          <input
            type="text"
            onChange={HandleSearchChanged}
            value={searchTerm}
            placeholder={"Search fight legacy"}
            className={" min-h-[35px] max-h-[35px] w-10/12 "}
            onFocus={e => {
              console.log(e);
              setSearchBoxFocused(true);
            }}
            onBlur={e => {
              setSearchBoxFocused(false);
            }}
          />
          <button
            className=" w-2/12 btn customAccentBackground min-h-[35px] max-h-[35px]"
            onClick={() => {
              searchClickRedirect(router, searchTerm, searchType);
              window.dispatchEvent(new Event("drawer_close"));
            }}
          >
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
      </div>
    </div>
  );

  function searchClickRedirect(router, sTerm, sType) {
    console.log("Searching for " + sTerm + " as type " + sType);
    if (sTerm != "") {
      const toSearch = sTerm;
      if (sType == "promotion") {
        router.push("/search?promo=" + toSearch);
      } else if (sType == "fighter") {
        router.push("/search?fighter=" + toSearch);
      } else if (sType == "user") {
        router.push("/search?user=" + toSearch);
      } else if (sType == "technique") {
        router.push("/search?technique=" + toSearch);
      } else if (sType == "position") {
        router.push("/search?position=" + toSearch);
      } else if (sType == "martialart") {
        router.push("/search?martialart=" + toSearch);
      } else {
        router.push("/search?unknown=" + toSearch);
      }
    }
  }

  if (!dev) {
    return (
      <div className="bg-gray-900 w-full ">
        <div className="container flex justify-center">{GetLogoElement()}</div>
      </div>
    );
  }

  return (
    //
    <div>
      {/* //Used to buffer the fixed navbar to prevent things being placed behind it */}
      <div
        className={" w-full " + (IsSmallScreen() ? "min-h-[50px]" : "")}
      ></div>
      <div
        className={
          "bg-gray-900 w-full " + (IsSmallScreen() ? "fixedTopScreen" : " ")
        }
      >
        <div className="">
          <div className=" flex justify-between ">
            <div className="hide_on_big">
              <MenuButtonGroup />
            </div>

            <div className="flex  items-center pl-5">
              <Link href="/">
                <a>{GetLogoElement()}</a>
              </Link>
            </div>
            <div
              onClick={() => {
                window.dispatchEvent(new Event("suggestion_open"));
                setSearchBoxFocused(true);
              }}
              onFocus={e => {
                console.log(e);
                setSearchBoxFocused(true);
              }}
              onBlur={e => {
                setSearchBoxFocused(false);
              }}
              className={
                "hide_on_small pt-1  " +
                (searchBoxFocused ? " w-4/12" : " w-4/12")
              }
            >
              <SearchDropdownComponent searchTrigger={searchClickRedirect} />
            </div>

            <div className="hide_on_small flex justify-end">
              <MenuButtonGroup />
            </div>

            <div className="">
              <div className="flex">
                <div className={"hide_on_small" + " flex "}>
                  {loggedIn && <NotificationPollingComponent />}
                  <ProfileButtonComponent />
                </div>

                <Button className={"hide_on_big"}>
                  <SearchIcon
                    fontSize="large"
                    color="info"
                    onClick={() => {
                      window.dispatchEvent(new Event("drawer_open_search"));
                    }}
                  />
                </Button>
              </div>
            </div>
          </div>

          <DrawerComponent
            anchorName="right"
            displayDone={false}
            widthValue="100vw"
            listerName={"drawer_open_search"}
            onCloseLogic={() => {
              setSearchBoxFocused(false);
            }}
            titleContent={
              <HeadingComponent size={1} textColor="text-white ">
                SEARCH
              </HeadingComponent>
            }
          >
            <div className="flexwrap pt-5">
              {[
                "fighter",
                "event",
                "promotion",
                "technique",
                "position",
                "martialart",
                "user"
              ].map(entry => {
                return (
                  <div
                    onClick={() => {
                      setSearchType(entry);
                    }}
                  >
                    {IndividualTag(entry)}
                  </div>
                );
              })}
            </div>
            <Divider className="my-3 px-5" />
            {searchBoxElement}

            <Divider className="my-3 px-5" />
            <RecentlyViewedComponent
              displayFilter={searchType}
              fuzzyRefine={true}
              fuzzyTerm={searchTerm}
            />
          </DrawerComponent>
        </div>
      </div>
    </div>
  );
};
function MenuButtonGroup() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(null);

  let menuAttr = "p-5 py-10 space-x-5 flex w-full";
  let groupAttr = "w-4/12 border-r-2 border-gray-300";

  let menuButtonElements = MENU_RAW_DATA.map((item, index) => (
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

  let menuButtonElementsSmall = (
    <div className="flex">
      <MenuDrawerComponent />
    </div>
  );

  return (
    <div key={activeMenu}>
      <div className="menureddit" onMouseLeave={() => setActiveMenu(null)}>
        <div className={"hide_on_small justify-end flex"}>
          {menuButtonElements}
        </div>
        <div className={"hide_on_big" + "  z-10 menureddit space-x-5"}>
          {menuButtonElementsSmall}
        </div>
        <AnimAppearDirection
          directionX={0}
          directionY={-30}
          speed={10}
          className="z-1 menu-contentreddit drop-shadow-2xl customAccentBackground text-white"
        >
          {activeMenu != null && (
            <div
              className="w-full"
              onClick={() => {
                setActiveMenu(null);
              }}
            >
              {"custom" in MENU_RAW_DATA[activeMenu] && (
                <div>{MENU_RAW_DATA[activeMenu].custom}</div>
              )}

              {MENU_RAW_DATA[activeMenu].buttons.map(entry => {
                return (
                  <Button className="text-white w-full link">
                    <a>{entry.label}</a>
                  </Button>
                );
              })}
            </div>
          )}
        </AnimAppearDirection>
      </div>
    </div>
  );
}

function MenuDrawerComponent() {
  const [activeMenuIndex, setActiveMenuIndex] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!open) {
      setActiveMenuIndex(null);
    }
  }, [open]);

  const list = anchor => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      className=" py-0 my-0"
    >
      <List className="py-0 my-0">
        <div className="customAccentBackground">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="absolute top-2 right-2 "
          >
            <CloseIcon fontSize="large" className="text-white" />
          </button>
          <ProfileButtonComponent />
        </div>

        <Divider />

        {MENU_RAW_DATA.map((entry, index) => {
          return (
            <ListItem key={entry.label} disablePadding className="w-full">
              <MenuAccordian
                iconElement={entry.icon}
                title={entry.label}
                buttonList={entry.buttons}
                isOpen={index == activeMenuIndex}
                CloseOnlyThisTrigger={() => {
                  setActiveMenuIndex(9999999);
                }}
                onClickTrigger={() => {
                  setOpen(false);
                }}
                onGroupClickTrigger={() => {
                  setActiveMenuIndex(index);
                }}
              />
              <Divider />
            </ListItem>
          );
        })}

        <ListItem disablePadding className="my-1 px-5 w-full">
          <SocialMediaLinksComponent />
        </ListItem>

        <ListItem key={"feedback"} disablePadding className=" px-5 w-full">
          <Button
            className="clickupShadow w-full customAccentBackground text-white"
            onClick={() => {
              setOpen(false);
              const event = new Event("feedback_prompt");
              window.dispatchEvent(event);
            }}
          >
            Feedback
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map(anchor => (
        <React.Fragment key={anchor}>
          <Button
            onClick={() => {
              setOpen(!open);
            }}
          >
            <MenuIcon fontSize="large" />
          </Button>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

function MenuAccordian({
  iconElement = null,
  title = "SAMPLE TITLE",
  buttonList = [],
  onClickTrigger = null,
  onGroupClickTrigger = null,
  isOpen = false,
  CloseOnlyThisTrigger = null
}) {
  return (
    <Accordion expanded={isOpen} className="w-full border-0">
      <AccordionSummary
        onClick={() => {
          if (isOpen) {
            CloseOnlyThisTrigger();
          } else onGroupClickTrigger();
        }}
        expandIcon={<ExpandMoreIcon className="customAccentText" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="w-full border-0 "
      >
        {iconElement}{" "}
        <Typography className={isOpen ? "customAccentText" : ""}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="bg-blue-100">
        {buttonList.map(entry => {
          return (
            <div>
              <Link href={entry.url}>
                <a>
                  <Button
                    className="text-black font-bold text-left justify-left w-full"
                    onClick={() => {
                      onClickTrigger();
                    }}
                  >
                    {entry.label}
                  </Button>
                </a>
              </Link>
              <Divider />
            </div>
          );
        })}
        {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
      </AccordionDetails>
    </Accordion>
  );
}

export default Header;

const DEBUG_ENTRY = {
  label: "Debug",
  icon: null,
  buttons: [
    {
      label: "Venue",
      url: "venue/1"
    },
    {
      label: "Gym",
      url: "/gym/1166232 "
    },
    {
      label: "Division: Newcomer",
      url: "/division/14/newcomer"
    },
    {
      label: "PROMO: Newcomer",
      url: "/promotion/16/newcomer"
    },
    {
      label: "PROMO: EVENT DIRECTORY",
      url: "/promotion/16/events/1"
    },
    {
      label: "PROMO: TOP FIGHTS",
      url: "/promotion/16/favourite"
    },
    {
      label: "PROMO: FIGHT TAG SEARCH",
      url: "/promotion/16/bout"
    },
    {
      label: "PROMO: FIGHT DECISION",
      url: "/promotion/16/decision"
    },
    {
      label: "PROMO: RANKING",
      url: "/promotion/16/ranking"
    },
    {
      label: "PROMO: RECORD",
      url: "/promotion/16/record"
    },
    {
      label: "PROMO: DIVISION DIRECTORY",
      url: "/promotion/16/division"
    },
    {
      label: "PROMO: CHAMPIONS",
      url: "/promotion/16/champions"
    },
    {
      label: "PROMO: MEDIA",
      url: "/promotion/16/media"
    },
    {
      label: "Forum Directory",
      url: "/promotion/16/chat"
    },
    {
      label: "Jon Jones",
      url: "/person/312541"
    },
    {
      label: "Event",
      url: "/event/35062"
    },

    {
      label: "UFC",
      url: "/promotion/16"
    },
    {
      label: "Division",
      url: "/division/14"
    },
    {
      label: "User Profile",
      url: "/user/ekins2"
    },
    {
      label: "Judge",
      url: "/person/1103247"
    },
    {
      label: "Referee",
      url: "/person/200410"
    },
    {
      label: "Bout",
      url: "/bout/566157"
    },
    {
      label: "stance",
      url: "/position/15?role=bottom"
    },
    {
      label: "Technique",
      url: "/technique/130"
    }
  ]
};
const MENU_RAW_DATA = [
  // DEBUG_ENTRY,
  // {
  //   label: "My Profile",

  //   icon: null,
  //   buttons: [
  //     {
  //       label: "My Home",
  //       url: ""
  //     },
  //     {
  //       label: "Notifications",
  //       url: ""
  //     },
  //     {
  //       label: "Account Settings",
  //       url: ""
  //     }
  //   ]
  // },
  {
    label: "Athletes",
    icon: null,

    buttons: [
      {
        label: "Trending",
        url: ""
      },
      {
        label: "Nearby Athletes",
        url: ""
      },
      {
        label: "Most Popular",
        url: ""
      },
      {
        label: "Upcoming Fighters",
        url: ""
      },
      {
        label: "Hall of Fame",
        url: ""
      }
    ]
  },

  {
    label: "Events",
    icon: null,
    buttons: [
      {
        label: "Recent Events",
        url: "/event"
      },
      {
        label: "Upcoming Events",
        url: "/event"
      },
      {
        label: "My Events",
        url: ""
      },
      {
        label: "Create an Event",
        url: "/event"
      },
      {
        label: "Trending Events 2022",
        url: "/event"
      },
      {
        label: "Trending Events - All Time",
        url: "/event"
      }
    ]
  },
  {
    label: "Techniques",
    icon: null,
    buttons: [
      {
        label: "Technique Library",
        url: "/library"
      },
      {
        label: "Courses",
        url: "/library/courses"
      },
      {
        label: "Community Technique Lists",
        url: "/list/directory/technique"
      },
      {
        label: "Recently Added Techniques",
        url: "/library/recent"
      },
      {
        label: "Community Questions",
        url: "/library/questions"
      },
      {
        label: "Trending Techniques",
        url: "/trending/technique "
      },
      {
        label: "",
        url: ""
      }
    ]
  },
  // {
  //   label: "Promoters",
  //   icon: null,
  //   buttons: [
  //     {
  //       label: "Search",
  //       url: "/promotion"
  //     }
  //   ]
  // },
  {
    label: "Fights",
    icon: null,
    buttons: [
      {
        label: "Martial Art Directory",
        url: "/martialart"
      },
      {
        label: "Highest Rated Fights",
        url: "/bout/top"
      },
      {
        label: "Most Controversial Decisions",
        url: "/bout/decisions"
      },
      {
        label: "Trending Fights",
        url: "/trending/bout"
      },
      {
        label: "Community Fight Lists",
        url: "/list/directory/bout"
      },

      {
        label: "My Rated Fights",
        url: "/user/username/fight-rating"
      },

      {
        label: "My Decision Vote History",
        url: "/user/username/fight-decision"
      }
    ]
  }
];
