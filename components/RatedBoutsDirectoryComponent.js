import HeadingComponent from "@components/utility/HeadingComponent";
import { Menu, MenuItem, Rating } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IsLoggedInByUser } from "../config";
import { ConverDateToDaysAgoString, GetUserCommentsAction } from "../helpers/api";

const RatedBoutsDirectoryComponent = ({ username }) => {
  let iKey = 0;
  const router = useRouter();
  const [userFollowData, setUserFollowData] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ratedBoutsData, setRatedBoutsData] = useState(false);
  useEffect(() => {
    setIsLoggedIn(IsLoggedInByUser(username));
    if (IsLoggedInByUser(username)) {
      GetUserCommentsAction().then(data => {
        console.log("Comment history");
        console.log(data);
        setRatedBoutsData(data.comments);
      });

      // GetUserRatingHistoryAction().then(data => {
      //   console.log("Rated Bouts");
      //   console.log(data);
      //   setRatedBoutsData(data);
      // });
    }
  }, []);

  const handleLogout = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  if (isLoggedIn == false) {
    return <HeadingComponent size={3}>Private</HeadingComponent>;
  }

  let ratedBoutElements = null;
  if (!!ratedBoutsData) {
    ratedBoutElements = ratedBoutsData.map(entry => {
      return (
        <div className="bg-gray-50 rounded m-3 p-2 pl-10  drop-shadow-md hover:border-1 hover:drop-shadow-xl">
          <Link href={"/" + entry.url}>
            <a>
              <div className="flex">
                <HeadingComponent textColor={"customAccentText"} size={5}>
                  {entry.name}{" "}
                </HeadingComponent>
                <p className="ml-10">
                  {ConverDateToDaysAgoString(entry.timestamp)}
                </p>
              </div>
              <p>{entry.content}</p>

              <p>
                {entry.rating && entry.rating > 0 && (
                  <Rating className="p-2" value={entry.rating} readOnly />
                )}
              </p>
            </a>
          </Link>
        </div>
      );
    });
  }

  return (
    <>
      {" "}
      <HeadingComponent showBar={true} size={2}>
        Discussions and Reviews
      </HeadingComponent>
      <button
        className="btn"
        style={{ color: "white", border: "10px", borderColor: "red" }}
        id="basic-button"
        variant="outlined"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // startIcon={<AccountCircleIcon sx={{ fontSize: 40 }} />}
      >
        Sort Bouts By Rating
      </button>
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
        <MenuItem onClick={handleClose}>Recent</MenuItem>
        <MenuItem onClick={handleLogout}>5 Star</MenuItem>
        <MenuItem onClick={handleLogout}>4 Star</MenuItem>
        <MenuItem onClick={handleLogout}>3 Star</MenuItem>
        <MenuItem onClick={handleLogout}>2 Star</MenuItem>
        <MenuItem onClick={handleLogout}>1 Star</MenuItem>
      </Menu>
      {ratedBoutElements}
    </>
  );
};

export default RatedBoutsDirectoryComponent;
