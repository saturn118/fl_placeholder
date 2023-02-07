import { DialogContent, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import FlagComponent from "./FlagComponent";
import HeadingComponent from "./utility/HeadingComponent";



export const CountryPresenceWidgetComponent = ({
  countryData = null,
  title = null,
  flagsToDisplay = 10
}) => {
  const [playlistOpenState, setPlaylistOpenState] = React.useState(false);

  let MAX_COUNTRY_PREVIEW = flagsToDisplay;
  let countryList =
    countryData && countryData.list
      ? countryData.list.map(entry => {
          MAX_COUNTRY_PREVIEW -= 1;
          if (MAX_COUNTRY_PREVIEW < 0) {
            return;
          }
          return (
            <div className="m-1 border-solid border-2 border-gray-100 ">
              {FlagComponent(entry.code, 30)}
            </div>
          );
        })
      : null;

  return (
    <div>
      <div>
        {" "}
        <motion.button
          whileHover={{
            scale: 1.075,
            transition: { duration: 0.2 }
          }}
        >
          <a
            onClick={e => {
              setPlaylistOpenState(true);
            }}
          >
            <div className="flexwrap">{countryList}</div>
          </a>
        </motion.button>
      </div>

      {countryData && (
        <CountryPresencePopupComponent
          countryData={countryData}
          open={playlistOpenState}
          title={title}
          onClose={e => {
            setPlaylistOpenState(false);
          }}
        />
      )}
    </div>
  );
};

const CountryPresencePopupComponent = props => {
  let iKey = 0;
  const router = useRouter();
  const { onClose, countryData, title, open } = props;

  const handleClose = () => {
    onClose();
  };

  let countryElements = countryData.list.map(entry => {
    return (
      <div>
        <Tooltip title={entry.name} enterDelay={200} leaveDelay={200}>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
          >
            <div className="m-3 border-solid border-2 border-gray-100 ">
              {FlagComponent(entry.code, 50)}
            </div>
          </motion.button>
        </Tooltip>
        <p className="text-white text-center ...">{entry.count}</p>
      </div>
    );
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogContent className="primaryBackground">
        <HeadingComponent
          size={3}
          textColor="text-white  justify-center font-center items-center"
          showBar={true}
        >
          {title ? title : "Apperances Per Country"}
        </HeadingComponent>

        <div className="flexwrap ">
          {countryElements}
          <Button
            className="btn width100 alignLeft"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryPresenceWidgetComponent;
