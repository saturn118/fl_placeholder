import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import { Badge, Button, CircularProgress, Link, Menu } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  GetNotificationCount,
  GetUsername,
  IsLoggedIn,
  IsLoggedInLoginPrompt,
  NOTIFICATION_FREQUENCY
} from "../config";
import {
  ConverDateToDaysAgoString,
  GetAccountNotificationsAction,
  MarkNotificationsAsRead
} from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";

const NotificationPollingComponent = ({ audio = true }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [username, setUsername] = useState(null);
  const audioElement = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
  };

  const playAudio = () => {
    if (audio) audioElement.current.play();
  };

  const handleClick = event => {
    if (IsLoggedInLoginPrompt()) {
      setAnchorEl(event.currentTarget);

      RefreshNotificationData();
    }
  };

  function RefreshNotificationData() {
    GetAccountNotificationsAction(null, 5).then(data => {
      setNotificationData(data.notifications);
    });
  }

  useEffect(() => {
    const checkUpdates = () => {
      // Check local storage for a stored timestamp
      const storedTimestamp = localStorage.getItem("polling_timestamp");
      const currentTimestamp = Date.now();

      if (
        !storedTimestamp ||
        currentTimestamp - storedTimestamp > NOTIFICATION_FREQUENCY
      ) {
        // Make a request to the server to check for updates

        if (IsLoggedIn()) {
          GetAccountNotificationsAction(true).then(data => {
            let oldCount = GetNotificationCount();
            localStorage.setItem("notifications", data.count);

            setData(data.count);
            if (data.count > oldCount) playAudio();
          });
        }

        localStorage.setItem("polling_timestamp", currentTimestamp);
      }
    };
    setUsername(GetUsername());
    setData(GetNotificationCount());

    const interval = setInterval(checkUpdates, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!username) {
    return <></>;
  }

  let notificationElements = <CircularProgress />;
  if (notificationData) {
    notificationElements = notificationData.map(entry => {
      return (
        <button
          className="my-2 w-full border-2 hover:bg-gray-200"
          onClick={() => {
            MarkNotificationsAsRead([entry.id]).then(data => {
              router.push(entry.targetUrl);
            });
          }}
        >
          <div className="text-left justify-start">
            <p className="customAccentText">
              {!entry.read ? <StarIcon /> : null}
            </p>
            <p>{entry.message}</p>
            <p className="font-bold">
              {entry.messagePreview
                ? '"' + entry.messagePreview + ' ..."'
                : null}
            </p>
            <p className="">
              {ConverDateToDaysAgoString(entry.createdTimestamp)}
            </p>
          </div>
        </button>
      );
    });
  }

  return (
    <div>
      {audio && <audio ref={audioElement} src="/notification.wav" />}
      <Badge
        invisible={data == 0}
        color="error"
        overlap="circular"
        badgeContent={data}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <Button
          id="basic-button"
          variant="outlined"
          aria-controls={open ? "basic-menu2" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="text-white mx-2"
        >
          <NotificationsIcon size="large" />
        </Button>
      </Badge>

      <Menu
        id="basic-menu2"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={e => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
        PaperProps={{ style: { minWidth: "30vw" } }}
      >
        <div className="p-5">
          <div className="flex space-x-10">
            <HeadingComponent showBar={false} showArrow={false} size={4}>
              NOTIFICATIONS
            </HeadingComponent>

            <Link href={"/user/" + username + "/messages"}>
              <a className="customAccentText hover:link">See All</a>
            </Link>
          </div>

          <div className="space-y-2 ">{notificationElements}</div>
        </div>
      </Menu>
    </div>
  );
};

// const ProfileButtonComponent = () => {
//   return (
//     <div>
//       <Button
//         className="customAccentBackground text-white"
//         id="basic-button"
//         variant="outlined"
//         aria-controls={open ? "basic-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//         startIcon={<AccountCircleIcon sx={{ fontSize: 40 }} />}
//       >
//         {labelToShow}
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={e => {
//           setAnchorEl(null);
//         }}
//         MenuListProps={{
//           "aria-labelledby": "basic-button"
//         }}
//       ></Menu>
//     </div>
//   );
// };

export default NotificationPollingComponent;
