import AddIcon from "@mui/icons-material/Add";
import { DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import HeadingComponent from "./utility/HeadingComponent";



export const RequestRecordComponent = ({}) => {
  const [popupOpenState, setPopupOpenState] = React.useState(false);

  return (
    <div>
      <motion.button
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.2 }
          // rotate: 5
        }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          className="btn customShadow "
          onClick={e => {
            setPopupOpenState(true);
          }}
        >
          Request New Record <AddIcon />
        </button>
      </motion.button>

      <RequestRecordPopupComponent
        open={popupOpenState}
        onClose={e => {
          setPopupOpenState(false);
        }}
      />
    </div>
  );
};

const RequestRecordPopupComponent = props => {
  let iKey = 0;
  const router = useRouter();
  const [success, setSuccess] = React.useState(null);

  const { onClose, open } = props;

  const formik = useFormik({
    initialValues: {
      recordName: ""
    },

    onSubmit: async values => {
      console.log("Submit request");
      console.log(values);

      // RequestNewLibraryEntryAction(
      //   values.recordName,
      //   values.recordDescription,
      // ).then(data => {
      //   console.log("Submission response");
      //   console.log(data);

      //   if (data.done == 1) {
      //     console.log("Success");

      //     setSuccess(true);
      //   } else {
      //     setSuccess(false);
      //   }
      // });
    }
  });

  const handleClose = () => {
    formik.values.recordName = "";

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
                REQUEST NEW RECORD
              </HeadingComponent>
              <form onSubmit={formik.handleSubmit}>
                <li>
                  <p className="font-bold">Name</p>
                  <input
                    type="text"
                    placeholder={"Enter name here"}
                    className="input input-bordered w-full max-w-xs"
                    id="name"
                    value={formik.values.recordName}
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

export default RequestRecordComponent;
