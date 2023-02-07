import HeadingComponent from "@components/utility/HeadingComponent";
import { Avatar, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS, IsLoggedInByUser } from "../config";
import { accountGetFollowingAction } from "../helpers/api";
import { AnimAppear } from "./utility/AnimationUtility";

const FollowingDirectoryComponent = ({ username }) => {
  let iKey = 0;
  const router = useRouter();
  const [userFollowData, setUserFollowData] = React.useState(null);
  const [tagCategoryValue, setTagCategoryValue] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(IsLoggedInByUser(username));
    if (IsLoggedInByUser(username)) {
      accountGetFollowingAction().then(data => {
        console.log("Retrieved user following data");
        console.log(data);
        setUserFollowData(data.data);
      });
    }
  }, []);

  let followingElements = null;
  if (!!userFollowData) {
    console.log(userFollowData);
    followingElements = userFollowData.data.map(element => {
      iKey += 1;
      let subDirectory = null;

      if (!!tagCategoryValue && tagCategoryValue != element.followType)
        return null;

      if (element.followType == "fighter") {
        subDirectory = "/person/";
      } else if (element.followType == "promo") {
        subDirectory = "/promotion/";
      } else if (element.followType == "technique") {
        subDirectory = "/technique/";
      } else if (element.followType == "position") {
        subDirectory = "/position/";
      } else if (element.followType == "user") {
        subDirectory = "/user/";
      } else if (element.followType == "activity") {
        subDirectory = "/martialart/";
      } else {
        subDirectory = "/error-" + element.followType;
      }

      return (
        <div className="w-4/12 ">
          <div className="m-2 bg-gray-50 rounded  min-h-[125px] pl-5 pt-5 pr-2 border-solid border-2 pb-5 border-gray-300 drop-shadow-md hover:drop-shadow-xl">
            <Link key={iKey} href={`${subDirectory}${element.followId}`}>
              <a>
                <Avatar
                  variant="rounded"
                  src={DATA_SERVER_IMAGE_ADDRESS + element.imageUrl}
                  sx={{ width: 200, height: 150 }}
                />
                <HeadingComponent textColor="customAccentText" size={5}>
                  {element.name}
                </HeadingComponent>
              </a>
            </Link>
          </div>
        </div>
      );
    });
  }

  if (isLoggedIn == false) {
    return <HeadingComponent size={3}>Private</HeadingComponent>;
  }

  return (
    <div>
      {" "}
      <HeadingComponent showBar={true} size={2}>
        Following
      </HeadingComponent>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        value={tagCategoryValue}
        onChange={(event, newValue) => {
          setTagCategoryValue(newValue);
        }}
      >
        <Tab label="All" value={null} />
        <Tab label="Fighters" value={"fighter"} />
        <Tab label="Promotions" value={"promo"} />
        <Tab label="Techniques" value={"technique"} />
        <Tab label="Position" value={"position"} />
        <Tab label="Users" value={"user"} />
        <Tab label="Gym" value={"gym"} />
        <Tab label="Martial Art" value={"activity"} />
      </Tabs>
      <div className="p-5" key={tagCategoryValue}>
        <AnimAppear className="flexwrap ">{followingElements}</AnimAppear>
      </div>
    </div>
  );
};

export default FollowingDirectoryComponent;
