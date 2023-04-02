import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  GetGlobalHideSpoilers,
  GetLinkedFighterId,
  GetNotificationCount,
  IsLoggedInLoginPrompt,
  SetGlobalHideSpoilers
} from "../config";

const ProfileButtonComponent = () => {
  const router = useRouter();
  const [forceRefresh, setForceRefresh] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [label, setLabel] = React.useState(null);
  const [accountType, setAccountType] = React.useState(null);
  const [unreadNotificationCount, setUnreadNotificationCount] = React.useState(
    0
  );
  const open = Boolean(anchorEl);
  //   const dispatch = useDispatch();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);

    if (event.currentTarget) {
      GetNotificationCount;
      setUnreadNotificationCount(GetNotificationCount());
    }
  };
  let loggedIn;

  useEffect(() => {
    loggedIn = localStorage.getItem("account_id");
    setAccountType(localStorage.getItem("account_type"));

    if (loggedIn && loggedIn != "null") {
      setLabel(localStorage.getItem("account_username"));
    } else {
      setLabel(null);
    }
  }, []);

  useEffect(() => {}, [accountType]);

  const handleClose = () => {
    setAnchorEl(null);
    // history("/profile");
  };

  const handleLogout = () => {
    setAnchorEl(null);

    localStorage.setItem("token", null);
    localStorage.setItem("account_id", null);
    localStorage.setItem("account_username", null);
    localStorage.setItem("account_type", null);
    window.location.reload();
  };

  let labelToShow = "SIGN IN";
  if (label) {
    labelToShow = null; //label;
  } else {
    return (
      <button
        className="btn customAccentBackground"
        onClick={() => {
          IsLoggedInLoginPrompt();
          //router.push("/account/login");
        }}
      >
        {labelToShow}
      </button>
    );
  }

  let optionMenuElements = null;
  if (accountType == "admin") {
    optionMenuElements = (
      <>
        <Link href="/admin/dashboard">
          <MenuItem
            onClick={e => {
              setAnchorEl(null);
            }}
          >
            Admin Dashboard
          </MenuItem>
        </Link>
        <Link href="/admin/feedback">
          <MenuItem
            onClick={e => {
              handleClose();
            }}
          >
            Feedback
          </MenuItem>
        </Link>
      </>
    );
  }

  return (
    <div>
      <Button
        className=" customAccentBackground text-white hover:bg-blue-500"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {labelToShow}
        {labelToShow == null && <AccountCircleIcon fontSize="large" />}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={e => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <Link href={"/user/" + label}>
          <MenuItem onClick={handleClose}>Account</MenuItem>
        </Link>
        {/* <Link href={"/user/" + label + "/messages"}>
          <MenuItem
            className={unreadNotificationCount > 0 ? "customAccentText" : ""}
          >
            Notifications{" "}
            {unreadNotificationCount > 0
              ? "(" + unreadNotificationCount + ")"
              : ""}
          </MenuItem>
        </Link> */}
        <Link href={"/person/" + GetLinkedFighterId()}>
          <a>
            <MenuItem onClick={handleClose}>Fighter Profile</MenuItem>
          </a>
        </Link>
        <Link href={"/user/" + label}>
          <MenuItem onClick={handleClose}>
            <BookmarkAddIcon />
            My Lists
          </MenuItem>
        </Link>
        <Link href={"/user/" + label + "/settings"}>
          <MenuItem onClick={handleClose}>Account Settings</MenuItem>
        </Link>
        {/* <Link href={"/"}> */}

        {/* <MenuItem>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Hide Spoilers</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={GetGlobalHideSpoilers()}
                onClick={() => {
                  SetGlobalHideSpoilers(!GetGlobalHideSpoilers());
                  setForceRefresh(!forceRefresh);
                  router.reload();
                }}
              />
            </label>
          </div>
        </MenuItem> */}
        {/* </Link> */}

        {optionMenuElements}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileButtonComponent;
