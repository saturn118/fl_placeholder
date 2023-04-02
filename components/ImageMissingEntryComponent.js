import AddIcon from "@mui/icons-material/Add";
import { DialogContent, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RequestNewLibraryEntryAction } from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";

export const ImageMissingEntryWidgetComponent = ({
  entityType,
  entityId,
  label = null
}) => {
  const [popupOpenState, setPopupOpenState] = React.useState(false);

  return (
    <div>
      <Tooltip
        title={"Add new " + entityType}
        enterDelay={100}
        leaveDelay={200}
        placement="top"
      >
        <motion.button
          whileHover={{
            scale: 1.08,
            transition: { duration: 0.2 }
            // rotate: 5
          }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            className="btn customShadow m-1  libraryEntrySize"
            onClick={e => {
              setPopupOpenState(true);
            }}
          >
            Add Photo <AddIcon />
          </button>
        </motion.button>
      </Tooltip>

      <ImageMissingEntryPopupComponent
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

const ImageMissingEntryPopupComponent = props => {
  let iKey = 0;
  const router = useRouter();
  const [success, setSuccess] = React.useState(null);
  const [imageType, setImageType] = React.useState(null);
  const { onClose, open, entityType, label } = props;

  const formik = useFormik({
    initialValues: {
      copyright: "",
      imageType: ""
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
              <HeadingComponent showBar={true} size={2}>
                Add Image
              </HeadingComponent>
              <form onSubmit={formik.handleSubmit}>
                <li>
                  <p>DRAG IMAGE HERE</p>
                </li>
                <li>
                  <p className="font-bold">Select Image Category</p>
                  <select
                    onChange={e => {
                      console.log(e.target.value);
                      setImageType(e.target.value);
                    }}
                    className="form-select select select-info w-full max-w-xs"
                  >
                    <option value="none" selected disabled hidden>
                      Select Image Type
                    </option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                    <option value="type3">Type 3</option>
                  </select>
                </li>

                <li>
                  <p className="font-bold">Copyright Information</p>
                  <input
                    type="text"
                    placeholder={"Enter " + entityType + " name here"}
                    className="input input-bordered w-full max-w-xs"
                    id="name"
                    value={formik.values.copyright}
                    onChange={formik.handleChange}
                  />
                </li>

                <li>
                  <button type="submit" className="btn btn-primary w-full">
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

export default ImageMissingEntryPopupComponent;
