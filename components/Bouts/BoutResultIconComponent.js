import { Tooltip } from "@mui/material";
import React from "react";

const BoutResultIconComponent = ({ result }) => {
  let resultElement = null;
  if (result == "w" || result == "win") {
    resultElement = (
      <Tooltip title={"Win"} enterDelay={500} leaveDelay={200}>
        <button className="btn btn-success btn-sm">W</button>
      </Tooltip>
    );
  } else if (result == "l") {
    resultElement = (
      <Tooltip title={"Loss"} enterDelay={500} leaveDelay={200}>
        <button className="btn btn-danger btn-sm">L</button>
      </Tooltip>
    );
  } else if (result == "d") {
    resultElement = (
      <Tooltip title={"Draw"} enterDelay={500} leaveDelay={200}>
        <button className="btn btn-secondary btn-sm">D</button>
      </Tooltip>
    );
  } else if (result == "n") {
    resultElement = (
      <Tooltip title={"No Contest"} enterDelay={500} leaveDelay={200}>
        <button className="btn btn-warning">NC</button>
      </Tooltip>
    );
  } else {
    resultElement = (
      <Tooltip title={"No Contest"} enterDelay={500} leaveDelay={200}>
        <button className="btn btn-warning">{result}</button>
      </Tooltip>
    );
  }

  return <>{resultElement}</>;
};

export default BoutResultIconComponent;
