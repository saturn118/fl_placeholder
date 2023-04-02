import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import TuneIcon from "@mui/icons-material/Tune";
import "react-awesome-button/dist/styles.css";
import {
  GetLogoElement,
  TriggerBadgeEarned,
  TriggerLoginPrompt,
  IsLoggedInLoginPrompt,
  GetUsername,
  dev
} from "../config";
import NotificationPollingComponent from "./NotificationPollingComponent";
import ProfileButtonComponent from "./ProfileButtonComponent";
import { AnimAppear, AnimAppearDirection } from "./utility/AnimationUtility";
import HeadingComponent from "./utility/HeadingComponent";
import { LinearProgress, Chip, Autocomplete, TextField } from "@mui/material";
import { AddUserFeedPostAction } from "helpers/api";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HeaderContextualComponent = ({
  value,
  options,
  onChangeTrigger,
  placeholderText
}) => {
  return (
    <div
      className={
        "hide_on_big w-full px-5 py-1 flex primaryBackground h-[40px] text-white "
      }
    >
      <Autocomplete
        className="hide_on_big"
        disablePortal
        value={value}
        id="combo-box-demo"
        size="small"
        sx={{ width: 350 }}
        options={options}
        onChange={onChangeTrigger}
        renderInput={params => (
          <TextField
            {...params}
            size="small"
            hiddenLabel
            variant="filled"
            className="bg-white"
            placeholder={placeholderText}
          />
        )}
      />

      <button
        className=" w-5/12 customAccentBackground text-white"
        onClick={() => {
          window.dispatchEvent(new Event("drawer_open"));
        }}
      >
        Filters <TuneIcon />
      </button>
    </div>
  );
};

export default HeaderContextualComponent;
