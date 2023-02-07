import DoneIcon from "@mui/icons-material/Done";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { Chip, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/router";
import React, { useEffect } from "react";




export const TechniqueFilterWidgetComponent = ({
  submissionTypes,
  activeOptions,
  setActiveOptions
}) => {
  const [popupOpenState, setPopupOpenState] = React.useState(false);

  return (
    <div>
      <button
        className="btn"
        onClick={e => {
          setPopupOpenState(true);
        }}
      >
        <TuneOutlinedIcon /> Filter
      </button>

      <TechniqueFilterPopupComponent
        open={popupOpenState}
        onClose={e => {
          setPopupOpenState(false);
        }}
        submissionTypes={submissionTypes}
        activeOptions={activeOptions}
        setActiveOptions={setActiveOptions}
      />
    </div>
  );
};

const TechniqueFilterPopupComponent = props => {
  let iKey = 0;
  const router = useRouter();
  const {
    onClose,
    open,
    submissionTypes,
    activeOptions,
    setActiveOptions
  } = props;

  const handleClose = () => {
    onClose();
  };
  useEffect(() => {}, [activeOptions]);
  const [refresh, setRefresh] = React.useState(false);
  const [hoverChip, setHoverChip] = React.useState(null);

  let submissionTypeElements = submissionTypes.map(entry => {
    let isActive = entry.name in activeOptions.submissionTypes;

    return (
      <Chip
        onClick={() => {
          let current = activeOptions;

          if (entry.name in current.submissionTypes) {
            delete current.submissionTypes[entry.name];
          } else {
            current.submissionTypes[entry.name] = null;
          }
          setActiveOptions(current);
          setRefresh(!refresh);
        }}
        onMouseEnter={() => {
          setHoverChip(entry);
        }}
        onMouseLeave={() => {
          setHoverChip(null);
        }}
        label={
          isActive ? (
            <p>
              {entry.name} <DoneIcon />
            </p>
          ) : (
            <p>{entry.name} +</p>
          )
        }
        color={"success"}
        variant={isActive ? "contained" : "outlined"}
      />
    );
  });

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <div>
          <p className="text-center ..." size={3}>
            Filter Results
          </p>
          <li>
            <li>
              <p>By Submission Damage Type (multi choice)</p>
            </li>
            <li>{submissionTypeElements}</li>
            <div>
              <div className="height100">
                <p className="">{hoverChip ? hoverChip.description : null}</p>
              </div>
            </div>
          </li>
          <li>
            <li>
              <li>By Difficulty</li>
              <li>
                <select
                  name="difficulty"
                  id="difficulty"
                  onChange={e => {
                    let current = activeOptions;
                    current.difficulty = e.target.value;

                    setActiveOptions(current);
                    setRefresh(!refresh);
                  }}
                  value={activeOptions.difficulty}
                >
                  <option value="0">All</option>
                  <option value="1">Fundamentals</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Advanced</option>
                </select>
              </li>
            </li>

            <li>
              <div className="form-control">
                <p>Effective against larger opponents</p>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={activeOptions.larger}
                  onClick={() => {
                    let current = activeOptions;
                    current.larger = !activeOptions.larger;
                    setActiveOptions(current);
                    setRefresh(!refresh);
                  }}
                />
              </div>
            </li>

            <li>
              <div className="form-control">
                <p>Show only gi techniques</p>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={activeOptions.larger}
                  onClick={() => {
                    let current = activeOptions;
                    current.larger = !activeOptions.larger;
                    setActiveOptions(current);
                    setRefresh(!refresh);
                  }}
                />
              </div>
            </li>
          </li>
          <li>
            <button
              onClick={() => {
                handleClose();
              }}
              className="btn w-full"
            >
              Confirm
            </button>
          </li>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TechniqueFilterPopupComponent;
