import AddIcon from "@mui/icons-material/Add";
import { DialogContent, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RequestNewLibraryEntryAction } from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";

export const LibraryMissingEntryWidgetComponent = ({
  entityType,
  buttonColorAttribute = "",
  sizeAttribute = "libraryEntrySize",
  label = null,
  buttonLabelText = null
}) => {
  const [popupOpenState, setPopupOpenState] = React.useState(false);

  return (
    <div className={sizeAttribute}>
      <Tooltip
        title={"Add new " + entityType}
        enterDelay={100}
        leaveDelay={200}
        placement="top"
      >
        <button
          className={
            "btn customShadow  w-full h-full" + " " + buttonColorAttribute
          }
          onClick={e => {
            setPopupOpenState(true);
          }}
        >
          {buttonLabelText} <AddIcon />
        </button>
      </Tooltip>

      <LibraryMissingEntryPopupComponent
        label={label}
        entityType={entityType}
        open={popupOpenState}
        onClose={e => {
          setPopupOpenState(false);
        }}
      />
    </div>
  );
};

const LibraryMissingEntryPopupComponent = props => {
  let iKey = 0;
  const router = useRouter();
  const [success, setSuccess] = React.useState(null);
  const { onClose, open, entityType, label } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      url: ""
    },

    onSubmit: async values => {
      console.log("Submit request");
      console.log(values);

      RequestNewLibraryEntryAction(
        values.name,
        values.description,
        values.url,
        entityType
      ).then(data => {
        console.log("Submission response");
        console.log(data);

        if (data.done == 1) {
          console.log("Success");

          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
    }
  });

  const handleClose = () => {
    formik.values.name = "";
    formik.values.description = "";
    formik.values.url = "";
    setSuccess(null);

    onClose();
  };
  useEffect(() => {}, []);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <div>
          {success == true && (
            <div>
              <p>Success</p>
              <p>We'll verify the information and add the entry soon.</p>
            </div>
          )}

          {success == null && (
            <div className="w-full">
              Can't find a {entityType}? Add it to the library to help improve
              the website. Simply submit the form below and we'll do the rest.
              {/* <HeadingComponent size={3}>Add Missing {entityType}</HeadingComponent> */}
              <HeadingComponent size={5}>{label}</HeadingComponent>
              <form onSubmit={formik.handleSubmit}>
                <li>
                  <input
                    type="text"
                    placeholder={"Enter " + entityType + " name here"}
                    className="input input-bordered w-full max-w-xs"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    placeholder="(Optional) Enter a short description or any aliases"
                    className="input input-bordered w-full max-w-xs"
                    id="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    placeholder="(Optional) Provide any useful links for reference"
                    className="input input-bordered w-full max-w-xs"
                    id="url"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                  />
                </li>
                <li>
                  <button
                    type="submit"
                    disabled={formik.values.name.length == 0}
                    className="btn btn-primary w-full"
                  >
                    Submit
                  </button>
                </li>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LibraryMissingEntryPopupComponent;
