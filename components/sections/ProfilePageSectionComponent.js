import LockIcon from "@mui/icons-material/Lock";
import { Avatar, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { DATA_SERVER_IMAGE_ADDRESS, GetNotificationCount, IsLoggedInByUser } from "../../config";
import FlagComponent from "../FlagComponent";
import FollowComponent from "../FollowComponent";
import { AnimAppear } from "../utility/AnimationUtility";
import HeadingComponent from "../utility/HeadingComponent";
import { BodyColumnSectionComponent } from "./BodyHeaderSectionComponent";




export const ProfilePageSectionComponent = ({
  userData,
  //  IsLoggedIn = false,
  pageContentElement = null,
  subPageId = null
}) => {
  const router = useRouter();

  const [IsLoggedIn, setLoggedIn] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState(0);
  useEffect(() => {
    console.log("Current Profile Data");
    console.log(userData);

    let isCurrentUser = IsLoggedInByUser(userData.data.username);
    setLoggedIn(isCurrentUser);

    if (isCurrentUser) {
      setNotificationCount(GetNotificationCount());
    }
  }, []);

  return (
    <BodyColumnSectionComponent
      twoSections={true}
      sideContent={
        <div className=" pr-5 border-r-2 border-gray-500">
          <Avatar
            // variant="rounded"
            sx={{ width: 150, height: 150 }}
            src={DATA_SERVER_IMAGE_ADDRESS + "fdsf.jpg"}
          />

          <HeadingComponent
            size={2}
            textColor={
              "customAccentText justify-center text-center align-center"
            }
          >
            {userData.data.username.toUpperCase()}
          </HeadingComponent>
          {FlagComponent(userData.data.country_code, 50)}

          <div className="flex align-center justify-end items-center w-5/12">
            {IsLoggedIn == false && (
              <FollowComponent
                followType="user"
                followId={userData.data.username}
                isFollowingInitial={false}
              />
            )}
            {userData.data.fighterData && (
              <Link href={"/person/" + userData.data.fighterData.id}>
                <a>
                  <button className="btn">Linked Profile</button>
                </a>
              </Link>
            )}
          </div>

          <div className="text-white justify-left align-left text-left ">
            {/* {interestElements} */}
            <Tabs
              orientation="vertical"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              value={subPageId}
              onChange={(event, newValue) => {
                let subValue = "/" + newValue;
                if (newValue == "overview") subValue = "";

                router.push("/user/" + userData.data.username + subValue);
              }}
            >
              <Tab
                value={"overview"}
                className="justify-left align-left text-left"
                label="Overview"
              />
              {IsLoggedIn && (
                <Tab
                  value={"messages"}
                  className="justify-left align-left text-left"
                  label={
                    "Inbox " +
                    (notificationCount > 0
                      ? "(" + notificationCount.toString() + ")"
                      : "")
                  }
                />
              )}
              <Tab value={"posts"} label={<div>Posts (Feed)</div>} />
              <Tab
                value={"following"}
                label={
                  <div>
                    Following{" "}
                    {userData.data.followVisibilityPublic == true ||
                    IsLoggedIn == true ? null : (
                      <LockIcon />
                    )}{" "}
                  </div>
                }
              />
              <Tab
                value={"followers"}
                label={
                  <div>
                    Followers{" "}
                    {userData.data.followVisibilityPublic == true ||
                    IsLoggedIn == true ? null : (
                      <LockIcon />
                    )}{" "}
                  </div>
                }
              />

              {/* <Tab
          value={"ranks"}
          label={
            <div>
              Martial Art Ranks{" "}
              {userData.data.commentVisibilityPublic == true ||
              IsLoggedIn == true ? null : (
                <LockIcon />
              )}{" "}
            </div>
          }
        /> */}
              <Tab
                value={"lists"}
                label={
                  <div>
                    Lists{" "}
                    {userData.data.listVisibilityPublic == true ||
                    IsLoggedIn == true ? null : (
                      <LockIcon />
                    )}{" "}
                  </div>
                }
              />
              <Tab
                value={"comments"}
                label={
                  <div>
                    Comments
                    {userData.data.commentVisibilityPublic == true ||
                    IsLoggedIn == true ? null : (
                      <LockIcon />
                    )}{" "}
                  </div>
                }
              />
              <Tab
                value={"votes"}
                label={
                  <div>
                    Votes{" "}
                    {userData.data.voteVisibilityPublic == true ||
                    IsLoggedIn == true ? null : (
                      <LockIcon />
                    )}{" "}
                  </div>
                }
              />
              <Tab
                value={"badges"}
                label={
                  <div>
                    Badges
                    {userData.data.badgeVisibilityPublic == true ||
                    IsLoggedIn == true ? null : (
                      <LockIcon />
                    )}{" "}
                  </div>
                }
              />

              {IsLoggedIn && (
                <Tab value={"settings"} label="Account Settings" />
              )}
            </Tabs>
          </div>
        </div>
      }
      mainContent={
        <div className="w-10/12 p-10">
          <AnimAppear>{pageContentElement}</AnimAppear>
        </div>
      }
    ></BodyColumnSectionComponent>
  );
};

export default ProfilePageSectionComponent;
