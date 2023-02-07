import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { DialogContent, Grid, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetUsername, LoginRedirectCheck } from "../config";
import { GetPlaylistAction, UpdatePlaylistEntryAction } from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";



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
              setPlaylistOpenState(true);
            }}
          >
            <p>Add to List</p>
            <BookmarkAddIcon />
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
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
      <DialogContent className="primaryBackground">
        <Grid container xs={12}>
          <Grid item xs={3}></Grid>
          <Grid item xs={9} className="text-white">
            <HeadingComponent size={2} showBar={true}>
              Add {parentName} to a list
            </HeadingComponent>

            <h4>Create lists of {parentType}s to share with the community</h4>
          </Grid>
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

        {/* <a
          onClick={() => {
            if (!LoginRedirectCheck(router)) {
              router.push("/user/" + GetUsername() + "/playlists");
            }
          }}
        >
          <button className="btn"> View Playlists</button>
        </a> */}
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistPopupComponent;
