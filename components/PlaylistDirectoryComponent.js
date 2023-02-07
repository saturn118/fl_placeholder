import HeadingComponent from "@components/utility/HeadingComponent";
import EditIcon from "@mui/icons-material/Edit";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IsLoggedInByUser } from "../config";
import { ConverDateToDaysAgoString, CreateDestroyTechniquePlaylistAction, GetPlaylistAction } from "../helpers/api";

const PlaylistDirectoryComponent = ({ username }) => {
  let iKey = 0;
  const router = useRouter();
  const [editMode, setEditMode] = React.useState(false);
  const [playlistData, setPlaylistData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const MAX_PLAYLISTS = 15;

  function RefreshData() {
    if (IsLoggedInByUser(username)) {
      GetPlaylistAction().then(data => {
        console.log("Retriving playlists");
        console.log(data);
        setPlaylistData(data.data.playlists);
      });
    }
  }

  useEffect(() => {
    setIsLoggedIn(IsLoggedInByUser(username));
    RefreshData();
  }, []);

  function ToggleEditMode(e) {
    let newValue = !editMode;
    setEditMode(newValue);
  }

  let playlistElemenets = [];

  if (playlistData) {
    playlistElemenets = playlistData.map(element => {
      iKey += 1;
      return (
        <div
          key={iKey}
          className="margin bg-gray-50 rounded  min-h-[125px] pl-5 pt-5 pr-2 border-solid border-2 pb-5 border-gray-300 drop-shadow-md hover:drop-shadow-xl"
        >
          <Link href={`//list/${element.playlistId}`}>
            <a>
              <Skeleton variant="rectangular" width={210} height={118} />
              <div className="flexwrap">
                {/* <button className="btn" variant="contained"> */}
                <HeadingComponent textColor={"customAccentText"} size={4}>
                  {" "}
                  {element.playlistName}
                </HeadingComponent>

                {/* </button> */}
              </div>
            </a>
          </Link>
          <p>{element.description}</p>
          <p>Updated : {ConverDateToDaysAgoString(element.updatedTimestamp)}</p>
          <p>Entries : {element.entries.length}</p>

          {editMode ? (
            <button
              className="btn"
              onClick={() => {
                CreateDestroyTechniquePlaylistAction(
                  element.playlistName,
                  false,
                  element.playlistId
                ).then(data => {
                  RefreshData();
                });
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      );
    });
  }

  let conditionalTitleElement = (
    <HeadingComponent showBar={true} size={2}>
      Created Playlists
    </HeadingComponent>
  );

  playlistElemenets.push(
    <button
      className="btn customAccentBackground text-white"
      onClick={() => {
        router.push("/list/create");
      }}
    >
      Create New Playlist
    </button>
  );

  if (isLoggedIn == false) {
    return (
      <center className="align-middle">
        <HeadingComponent size={3}>Private</HeadingComponent>
      </center>
    );
  }

  return (
    <div className="container">
      {conditionalTitleElement}
      <p>
        {playlistElemenets.length - 1} / {MAX_PLAYLISTS} Playlists
      </p>

      <button
        className="btn customAccentBackground text-white"
        onClick={ToggleEditMode}
        variant={"contained"}
      >
        {editMode ? "Finished Editing" : "Edit Playlist"}

        <EditIcon />
      </button>

      <div className="flexwrap">{playlistElemenets}</div>
    </div>
  );
};

export default PlaylistDirectoryComponent;
