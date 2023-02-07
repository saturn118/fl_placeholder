import InfoIcon from "@mui/icons-material/Info";
import { Autocomplete, Dialog, DialogContent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKGROUND_ATTR } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

export const FightTagsExampleComponent = () => {
  function Op(name) {
    return <span className="mx-2  font-bold text-2xl"> {name} </span>;
  }

  function Tag(name) {
    return <p className="customAccentBackground text-white p-1"> {name} </p>;
  }

  return (
    <div className={"bg-gray-100 " + BACKGROUND_ATTR + " p-5 mb-10 space-y-1 "}>
      <HeadingComponent size={4}>Example Usage</HeadingComponent>
      <p>Mix and tags to find fights (tags can be selected in any order)</p>

      <div className="flex">
        {Tag("Championship Bout")} {Op("+")}
        {Tag(" Kimura")} {Op("=")} All fights for a title that ended in a kimura{" "}
      </div>
      <div className="flex">
        {Tag("Arm Triangle")} {Op("+")}
        {Tag(" Standing")} {Op("=")} Fights that ended in an arm-triangle while
        standing{" "}
      </div>
      <div className="flex">
        {Tag("Submission")} {Op("+")}
        {Tag("Broken Bone")} {Op("=")} Fights ending in a submission that
        resulted in a broken bone
      </div>
      <div className="flex">
        {Tag("Kimura")} {Op("+")}
        {Tag("Triangle Choke")} {Op("=")} Fights ending in a triangle choke
        kimura combination submission{" "}
      </div>
      <div className="flex">
        {Tag("Perfect vs Perfect")} {Op("+")}
        {Tag("Draw")} {Op("=")} Fights were both opponents had unbeaten records
        and it ended in a draw
      </div>
      <div className="flex">
        {Tag("Flying")} {Op("+")}
        {Tag("Triangle")} {Op("=")} Fight ends in a flying triangle submission
        ended in a draw
      </div>
    </div>
  );
};

export function FightTagSelectorPopupComponent() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <InfoIcon
        onClick={() => {
          setOpen(!open);
        }}
      />

      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        fullWidth={true}
        maxWidth="lg" // sets the maximum width of the dialog to "small"
        //fullScreen={false} // enables full screen mode when the prop is true
      >
        <DialogContent className={BACKGROUND_ATTR}>
          <FightTagsExampleComponent />

          <button className="btn w-6/12 customAccentBackground">
            View All Fight Tags
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function FightTagSelectorAutocomplete({
  data,
  onChanged = null
}) {
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  function handleAutocompleteChange(event, newValues) {
    console.log(newValues);
    if (newValues.length <= 3) {
      setSelectedTags(newValues);
      onChanged(newValues);
    }
  }

  useEffect(() => {
    const dataGrouped = data.reduce((acc, curr) => {
      if (!acc[curr.groupName]) {
        acc[curr.groupName] = [];
      }
      acc[curr.groupName].push(curr);
      return acc;
    }, {});
    const sortedGroups = Object.keys(dataGrouped).sort();
    const options = sortedGroups
      .map(groupName => dataGrouped[groupName])
      .flat();
    setOptions(options);
  }, []);

  return (
    <Autocomplete
      multiple={true}
      value={selectedTags}
      limit={3}
      options={options}
      groupBy={option => option.groupName}
      getOptionLabel={option => option.displayName}
      onChange={handleAutocompleteChange}
      renderInput={params => (
        <TextField {...params} label="select up to 3 tags" variant="outlined" />
      )}
    />
  );
}
