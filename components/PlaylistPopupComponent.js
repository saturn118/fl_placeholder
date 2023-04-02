import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddIcon from "@mui/icons-material/Add";
import { DialogContent, Grid, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetUsername, LoginRedirectCheck } from "../config";
import { GetPlaylistAction, UpdatePlaylistEntryAction } from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";
import { PopupDrawerConditionalComponent } from "./UserRatingPopupComponent";

export const PlaylistWidgetComponent = ({
  entityId = null,
  entityType = null,
  entityName = null
}) => {
  const [playlistOpenState, setPlaylistOpenState] = React.useState(false);

  let entityIdLocal = entityId;
  if (entityIdLocal && !(typeof entityIdLocal === "number")) {
    entityIdLocal = entityIdLocal;
  }

  return (
    <div>
      <Tooltip title={"Save to Playlist"} enterDelay={200} leaveDelay={200}>
        <div>
          <a
            className="text-white"
            onClick={e => {
              window.dispatchEvent(new Event("balls"));
              // setPlaylistOpenState(true);
            }}
          >
            <HeadingComponent textColor={"text-center text-gray-300 "} size={6}>
              PLAYLIST
            </HeadingComponent>
            <Button>
              <AddIcon className="text-white" fontSize="large" />
            </Button>
          </a>
        </div>
      </Tooltip>

      <PlaylistPopupComponent
        parentId={entityIdLocal}
        parentType={entityType}
        parentName={entityName}
        open={playlistOpenState}
        onClose={e => {
          setPlaylistOpenState(false);
        }}
      />
    </div>
  );
};

const PlaylistPopupComponent = props => {
  let iKey = 0;
  const router = useRouter();
  const { onClose, parentId, parentType, parentName, open } = props;
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [playlistData, setPlaylistData] = useState(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      RefreshData();
    }
  }, [open]);

  useEffect(() => {}, []);

  function RefreshData() {
    GetPlaylistAction().then(data => {
      console.log("Retriving playlists");
      console.log(data);
      setPlaylistData(data.data.playlists);
    });
  }

  let playlistElemenets = [];

  if (playlistData) {
    var thisTechniqueIsInPlaylists = {};
    playlistData.map(element => {
      element.entries.map(techniqueEntry => {
        if (parentId == techniqueEntry.id) {
          thisTechniqueIsInPlaylists[element.playlistId] = true;
        }
      });
    });

    console.log("Already in playlists");
    console.log(thisTechniqueIsInPlaylists);

    playlistElemenets = playlistData.map(element => {
      iKey += 1;
      let alreadyInColour = "success";
      let NotInColour = "primary";

      let alreadyAdded = element.playlistId in thisTechniqueIsInPlaylists;

      return (
        <div className="flex">
          <button
            key={iKey}
            className="btn width90"
            // color={alreadyAdded ? alreadyInColour : NotInColour}
            onClick={() => {
              let playlistName = element.playlistId;
              let techniqueId = parentId;

              UpdatePlaylistEntryAction(
                playlistName,
                techniqueId,

                !alreadyAdded,
                parentType
              ).then(data => {
                console.log("Adding technique to playlist");
                console.log(data);

                RefreshData();
              });
            }}
          >
            {alreadyAdded ? (
              <PlaylistAddCheckIcon color="success" />
            ) : (
              <AddIcon />
            )}{" "}
            {element.playlistName}
          </button>

          <Link href={"/list/" + element.playlistId}>
            <a>
              <button className="btn">
                <ArrowForwardIosIcon />
              </button>
            </a>
          </Link>
        </div>
      );
    });
  }

  return (
    <PopupDrawerConditionalComponent
      title={"ADD TO PLAYLIST"}
      eventName="balls"
      content={
        <div>
          <Grid item xs={9} className=" centerdat">
            <HeadingComponent size={3} showBar={false}>
              <span>
                ADD <span className="customAccentText">{parentName} </span> TO A
                LIST
              </span>
            </HeadingComponent>

            <h4>Create lists of {parentType}s to share with the community</h4>
          </Grid>

          <div>
            <Button
              className="btn width100"
              onClick={e => {
                LoginRedirectCheck(router);
                router.push("/user/" + GetUsername());
              }}
            >
              View My Lists <ArrowForwardIosIcon />
            </Button>

            <Button
              className="btn width100"
              onClick={e => {
                LoginRedirectCheck(router);
                router.push("/user/" + GetUsername());
              }}
            >
              View All Community Lists <ArrowForwardIosIcon />
            </Button>
          </div>

          <div className="flex">
            <Button
              className="btn width100 alignLeft"
              onClick={e => {
                LoginRedirectCheck(router);
                router.push("/list/create");
              }}
            >
              Create New List <ArrowForwardIosIcon />
            </Button>
          </div>

          {playlistElemenets}
        </div>
      }
    />
  );
};

export default PlaylistPopupComponent;
