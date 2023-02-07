import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ReplyIcon from "@mui/icons-material/Reply";
import { Avatar, Button, Chip, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { COMPANY_NAME, DATA_SERVER_IMAGE_ADDRESS, GetUsername, IsLoggedIn, IsLoggedInByUser, IsLoggedInLoginPrompt } from "../config";
import { AddUserFeedPostAction, ConverDateToDaysAgoString, DeleteFeedPostAction, FeedPostLikeAction, GetUserFeedAction, GetUserFeedLikesAction } from "../helpers/api";
import OnHoverMenuComponent from "./OnHoverMenuComponent";
import SpoilerButtonComponent from "./SpoilerButtonComponent";
import { CommentMenu } from "./UserEntityReviewSectionComponent";
import { AnimAppear } from "./utility/AnimationUtility";


function NewsFeedEntryComponent({
  entry,
  likesData,
  username,
  router,
  pendingReplyMap,
  setPendingReplyMap,
  setMyReplyText,
  myReplyText,
  setMyPostText,
  myPostText,
  showReplies,
  hideSpoilers
}) {
  const [displayReplyInput, setDisplayReplyInput] = useState(false);

  let replyInputElement = (
    <div className="w-12/12 flex border-t-2 border-blue-500 pt-2">
      {/* <Avatar
        // variant="rounded"
        sx={{ width: 60, height: 60 }}
        src={DATA_SERVER_IMAGE_ADDRESS + "dfsf.jpg"}
      /> */}
      <input
        type="text"
        placeholder="Add a comment"
        className="input input-bordered input-lg w-full rounded"
        value={entry.id in pendingReplyMap ? pendingReplyMap[entry.id] : ""}
        onChange={e => {
          let value = e.target.value;
          if (value.length == 1) {
            IsLoggedInLoginPrompt("Sign in to post a comment");
            return;
          }

          let temp = pendingReplyMap;
          pendingReplyMap[entry.id] = value;

          setPendingReplyMap(temp);
          setMyReplyText(!myReplyText);
        }}
      />{" "}
      <button
        className="btn customAccentBackground text-white"
        onClick={() => {
          if (IsLoggedInLoginPrompt("Sign in to post a comment")) {
            if (entry.id in pendingReplyMap) {
              let txt = pendingReplyMap[entry.id];
              if (txt != "") {
                AddUserFeedPostAction(txt, false, entry.id).then(data => {
                  if (data.success == true) {
                    console.log("Reply Added");
                    setMyPostText(!myPostText);
                    setDisplayReplyInput(false);
                  }
                });
              }
            }
          }
        }}
      >
        Post
      </button>
    </div>
  );

  let likedIcon = <FavoriteBorderIcon />;
  if (entry.id in likesData) {
    likedIcon = <FavoriteIcon color="error" />;
  }

  let content = entry.textContent;
  if (entry.spoilers == true && hideSpoilers) {
    content = "Spoilers Hidden";
  }

  let replyCount = entry.replycount ? entry.replycount : 0;
  let replyElements =
    entry.replies && showReplies
      ? entry.replies.replies.map(replyEntry => {
          return (
            <NewsFeedEntryComponent
              hideSpoilers={hideSpoilers}
              entry={replyEntry}
              likesData={likesData}
              username={username}
              router={router}
              pendingReplyMap={pendingReplyMap}
              setPendingReplyMap={setPendingReplyMap}
              setMyReplyText={setMyReplyText}
              myReplyText={myReplyText}
              setMyPostText={setMyPostText}
              myPostText={myPostText}
            />
          );
        })
      : null;

  let doesUserOwnPost = entry.originUrl == "/user/" + username;

  let outputMainEntry = (
    <div className="bg-gray-300 w-full p-2 flex rounded border-b-2 border-blue-500">
      <div className="w-2/12 border-r-2 border-blue-500 px-5 pt-2">
        <Avatar
          variant="rounded"
          sx={{ width: 75, height: 75 }}
          src={DATA_SERVER_IMAGE_ADDRESS + entry.originImage}
          width={100}
        />
      </div>
      <div className="pl-5 w-full ">
        <div className="flex ">
          <div className="w-11/12">
            <OnHoverMenuComponent
              anchorHorizontalCustom="center"
              popupContent={
                <div className="flex p-4 w-12/12">
                  <Avatar
                    variant="rounded"
                    sx={{ width: 200, height: 200 }}
                    src={DATA_SERVER_IMAGE_ADDRESS + entry.originImage}
                  />
                  <div className="p-5">
                    {" "}
                    <p>{entry.name}</p>
                    <Chip label={entry.originEntity} color="primary" />
                  </div>
                </div>
              }
            >
              <Link href={entry.originUrl}>
                <a className="customAccentText font-bold hover:link">
                  {" "}
                  {entry.name}
                </a>
              </Link>
            </OnHoverMenuComponent>
            <p>{ConverDateToDaysAgoString(entry.timestamp)}</p>
            {/* <p>fffff S{entry.originEntity}</p> */}
          </div>

          <CommentMenu
            handleDelete={() => {
              DeleteFeedPostAction(entry.id).then(data => {
                if (data.success == true) {
                  //Temporary, we shouldn't need to call this again, just append it locally
                  GetUserFeedAction().then(data => {
                    console.log("FEED DEBUG");
                    console.log(data);
                    setFeedData(data.data.feed);
                  });
                }
              });
            }}
            handleReport={null}
            isCurrentUser={doesUserOwnPost}
          />
        </div>

        <p className="mt-3 pr-10"> {content}</p>
        {entry.targetUrl && (
          <Link href={entry.targetUrl}>
            <Button className="link">View</Button>
          </Link>
        )}

        {entry.imageUrl && (
          <Avatar
            variant="rounded"
            sx={{ width: 300, height: 300 }}
            src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
          />
        )}

        <div className="flex w-full space-x-10 mt-3">
          <Button
            className="text-black"
            onClick={e => {
              if (IsLoggedInLoginPrompt("Sign in to like content")) {
                let temp = likesData;
                let isLiking = null;

                if (entry.id in temp) {
                  console.log("Deleting like");
                  delete temp[entry.id];
                  isLiking = false;
                } else {
                  console.log("Adding like");
                  temp[entry.id] = null;
                  isLiking = true;
                }

                FeedPostLikeAction(entry.id, isLiking).then(data => {
                  console.log("Danny likey");
                  //TEMPORARY, CHANGE TO SINGLE POST UPDATE RATHER TH
                  GetUserFeedAction().then(data => {
                    console.log("FEED DEBUG");
                    console.log(data);
                    setFeedData(data.data.feed);
                  });
                });

                setLikesData(null);
                setLikesData(temp);
              }
            }}
          >
            {likedIcon} 0 Likes
          </Button>{" "}
          <Button className="text-black">
            {" "}
            <CommentIcon /> View {replyCount} Comments
          </Button>
          <Button
            className="text-black"
            onClick={() => {
              setDisplayReplyInput(!displayReplyInput);
            }}
          >
            <ReplyIcon /> Reply
          </Button>
          <Button
            className="text-black"
            onClick={() => {
              router.push("/posts/" + entry.id);
            }}
          >
            {" "}
            <InsertLinkIcon /> Link
          </Button>
        </div>
        {displayReplyInput && replyInputElement}
      </div>
    </div>
  );

  return (
    <div>
      {outputMainEntry}
      <div className="pl-10">{replyElements}</div>
    </div>
  );
}

export default function NewsFeedComponent({
  feedOwnerUsername = null,
  inputFeedData = null,
  showReplies = false,
  displayFilters = false
}) {
  const router = useRouter();

  const [filterCategoryValue, setFilterCategoryValue] = useState("all");
  const [myPostText, setMyPostText] = useState(null);
  const [pendingReplyMap, setPendingReplyMap] = useState({});
  const [myReplyPostId, setmyReplyPostId] = useState(null);
  const [myReplyText, setMyReplyText] = useState(null);
  const [feedData, setFeedData] = useState([]);
  const [likesData, setLikesData] = useState({});
  const [hideSpoilers, setHideSpoilers] = useState(false);
  const [username, setUsername] = useState("");
  const [displayPostElement, setDisplayPostElement] = useState(true);

  function handSpoilerChanged() {
    setHideSpoilers(!hideSpoilers);
  }

  useEffect(() => {}, [likesData]);

  useEffect(() => {
    setDisplayPostElement(
      IsLoggedInByUser(feedOwnerUsername ? feedOwnerUsername : GetUsername())
    );
    setUsername(GetUsername());
    if (!inputFeedData) {
      GetUserFeedAction().then(data => {
        console.log("FEED DEBUG");
        console.log(data);
        setFeedData(data.data.feed);
      });
    } else {
      setFeedData(inputFeedData);
    }

    if (IsLoggedIn()) {
      GetUserFeedLikesAction().then(data => {
        console.log("LIKES DEBUG");
        console.log(data.data);
        setLikesData(data.data);
      });
    }
  }, []);

  let feedElements = null;
  if (feedData) {
    feedElements = feedData
      .filter(entry => {
        return (
          filterCategoryValue == "all" ||
          entry.originEntity === filterCategoryValue
        );
      })
      .map(entry => {
        return (
          <NewsFeedEntryComponent
            hideSpoilers={hideSpoilers}
            entry={entry}
            likesData={likesData}
            username={username}
            router={router}
            pendingReplyMap={pendingReplyMap}
            setPendingReplyMap={setPendingReplyMap}
            setMyReplyText={setMyReplyText}
            myReplyText={myReplyText}
            setMyPostText={setMyPostText}
            myPostText={myPostText}
            showReplies={showReplies}
          />
        );
      });
  }

  let filterData = [
    ["all", "all"],
    ["Fights", "Athlete"],
    ["Events", "event"],
    ["Promoters", "Promoter"],
    ["Techniques", "Martial Art Position"],
    ["Rankings", "rank"],
    ["Community", "Community Member"],
    ["Announcements", "website"]
  ];
  let filterElements = filterData.map(entry => {
    return <Tab label={entry[0]} value={entry[1]} />;
  });

  return (
    <div className="space-y-2" key={Object.keys(likesData).length}>
      {displayPostElement && (
        <div className="bg-gray-400 rounded p-2">
          <div className="flex ">
            <Avatar
              // variant="rounded"
              sx={{ width: 75, height: 75 }}
              src={DATA_SERVER_IMAGE_ADDRESS + "dfsf.jpg"}
              width={100}
            />
            <input
              type="text"
              placeholder="Share an update with your followers"
              className="input input-bordered input-lg w-full"
              value={myPostText}
              onChange={e => {
                setMyPostText(e.target.value);
              }}
            />{" "}
            {SpoilerButtonComponent(handSpoilerChanged, hideSpoilers)}
          </div>
          <button
            disabled={myPostText == ""}
            onClick={e => {
              AddUserFeedPostAction(myPostText, false).then(data => {
                if (data.success == true) {
                  //Temporary, we shouldn't need to call this again, just append it locally

                  GetUserFeedAction().then(data => {
                    console.log("FEED DEBUG");
                    console.log(data);
                    setFeedData(data.data.feed);
                  });
                  setMyPostText("");
                }
              });
            }}
            className="btn w-full customAccentBackground"
          >
            Post
          </button>
        </div>
      )}
      {displayFilters && (
        <div className="">
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            value={filterCategoryValue}
            onChange={(event, newValue) => {
              setFilterCategoryValue(newValue);
            }}
          >
            {filterElements}
          </Tabs>
        </div>
      )}

      <AnimAppear key={filterCategoryValue}>
        <div>{feedElements}</div>
        {feedElements.length == 0 && (
          <p className=" text-center space-y-5">
            <p className="">No posts founds</p>
            <p>
              Follow {filterCategoryValue}s on {COMPANY_NAME} see more
            </p>
          </p>
        )}
      </AnimAppear>

      {/* <p>TODO - Dynamic feed on scroll</p>
      <p>TODO - Feed post replies</p>
      <p>
        TODO - When you go to a post's main page it should be a subdirectory of
        the original poster. This will require promotion fighter, event etc to
        have dedicated feed directories
      </p> */}
    </div>
  );
}
{
  /* <p className="bg-white rounded">Event Completed</p>
            <p className="bg-white rounded">New Event</p>
            <p className="bg-white rounded">Fight Record Change Event</p>
            <p className="bg-white rounded">New Promotion</p>
            <p className="bg-white rounded">New Course Video / Course</p>
            <p className="bg-white rounded">New Position Technique</p>
            <p className="bg-white rounded">New Position</p>
            <p className="bg-white rounded">Followed User Created Playlist</p>
            <p className="bg-white rounded">
              Followed Fighter New Bout / Result
            </p>
            <p className="bg-white rounded">New Local Open Event</p>
            <p className="bg-white rounded">
              Followed Promotion New Roster/Roster Change
            </p>
            <p className="bg-white rounded">Global Ranking Change</p> */
}
