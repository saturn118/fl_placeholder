import { Grid, LinearProgress, Slide } from "@mui/material";
import React from "react";
import HeadingComponent from "./utility/HeadingComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecordBreakdownComponent({ label, value, maxValue }) {
  var tempMax = Math.max(value, maxValue);

  const normaliseSliderValue = (value, tempMax) =>
    ((value - 0) * 100) / (tempMax - 0);
  let percentage = 0;
  if (value != 0) percentage = normaliseSliderValue(value, tempMax);
  return (
    <>
      <Grid container xs={12}>
        <Grid item xs={2}>
          {/* : {parseInt(percentage)}% ({value}) */}
          <HeadingComponent size={6}>{label.toUpperCase()}</HeadingComponent>
          {/* <h3 className="statTitle"></h3> */}
        </Grid>
        <Grid item xs={6}>
          {/* <progress
            className="progress progress-info w-56"
            value={percentage}
            max={100}
          ></progress> */}
          <LinearProgress
            variant="determinate"
            sx={{ width: 250, height: 15 }}
            value={percentage}
          />
        </Grid>
      </Grid>
    </>
  );
}

export function DoubleBreakdownComponent({
  label = "TEST",
  leftValue = 0,
  rightValue = 0,
  maxValue
}) {
  const normaliseSliderValue = (value, tempMax) =>
    ((value - 0) * 100) / (tempMax - 0);

  return (
    <div className="flex w-full space-x-2">
      <p className="font-bold">9</p>
      <LinearProgress
        className="flipX w-4/12"
        variant="determinate"
        sx={{ width: 200, height: 15 }}
        value={normaliseSliderValue(leftValue, Math.max(leftValue, maxValue))}
      />
      <div className="w-2/12">
        {" "}
        <HeadingComponent textColor="w-full justify-center" size={6}>
          {label.toUpperCase()}
        </HeadingComponent>
      </div>
      <LinearProgress
        className=" w-4/12"
        variant="determinate"
        sx={{ width: 250, height: 15 }}
        value={normaliseSliderValue(rightValue, Math.max(rightValue, maxValue))}
      />
      <p className="font-bold">15</p>
    </div>
  );
}

export function RecordBreakdownFighterComponent({ label, value, maxValue }) {
  var tempMax = Math.max(value, maxValue);

  const normaliseSliderValue = (value, tempMax) =>
    ((value - 0) * 100) / (tempMax - 0);
  let percentage = 0;
  if (value != 0) percentage = normaliseSliderValue(value, tempMax);
  return (
    <div>
      <p className="font-bold">{label.toUpperCase()}</p>
      <LinearProgress
        variant="determinate"
        sx={{ width: 140, height: 8 }}
        value={percentage}
      />
    </div>
  );
}
