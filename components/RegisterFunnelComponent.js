import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Avatar, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS, GetReferral } from "../config";
import { CreateAccountAction } from "../helpers/api";
import OnHoverMenuComponent from "./OnHoverMenuComponent";
import { AnimAppearDirection } from "./utility/AnimationUtility";
import HeadingComponent from "./utility/HeadingComponent";

const RegisterFunnelComponent = ({ styleData, typesData }) => {
  const router = useRouter();
  let CREATION_ACCOUNT_STEP_ID = 3;
  const [loginErrorResponse, setLoginErrorResponse] = useState(null);
  const [panelId, setPanelId] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState({});
  const [selectedActivityTypes, setSelectedActivityTypes] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (panelId == CREATION_ACCOUNT_STEP_ID) {
      //Create the account here
    }
  }, [panelId]);

  let martialArtTypeElements = typesData.map(entry => {
    return (
      <div
        className={
          "customShadow " +
          (entry.name in selectedActivityTypes
            ? "border-8 border-blue-400"
            : "")
        }
        onClick={() => {
          let t = selectedActivityTypes;

          let id = entry.name;
          if (id in t) {
            delete t[id];
          } else {
            t[id] = null;
          }

          setSelectedActivityTypes(t);
          setRefresh(!refresh);
          console.log(t);
        }}
      >
        <OnHoverMenuComponent
          anchorHorizontalCustom="center"
          popupContent={
            <div className="flex p-4 w-12/12">
              <p>{entry.description}</p>
            </div>
          }
        >
          <Avatar
            variant="rounded"
            sx={{ width: 250, height: 250 }}
            src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
          />
        </OnHoverMenuComponent>

        <HeadingComponent
          textColor={"justify-center w-full customAccentBackground text-white"}
          size={4}
        >
          {entry.name.toUpperCase()}
        </HeadingComponent>
      </div>
    );
  });

  console.log("TTTT");
  console.log(styleData);
  let styleDataElements = [];

  for (const [label, listValues] of Object.entries(styleData)) {
    if (label in selectedActivityTypes == false) continue;

    let current = listValues.map(entry => {
      let selected = entry.id in selectedActivities;

      return (
        <a
          onClick={() => {
            let t = selectedActivities;

            if (entry.id in t) {
              delete t[entry.id];
            } else {
              t[entry.id] = null;
            }

            setSelectedActivities(t);
            setRefresh(!refresh);
          }}
        >
          <div className="flex p-2 rounded bg-gray-100 hover:bg-gray-400 my-1">
            <p className="text-left w-10/12"> {entry.name} </p>
            {selected && (
              <p>
                <CheckCircleIcon color="success" />
              </p>
            )}{" "}
            {!selected && <AddIcon />}
          </div>
        </a>
      );
    });

    styleDataElements.push(
      <div className="w-2/12">
        <p className="bg-white customAccentText">{label}</p>
        <div className="space-y-3">{current}</div>
      </div>
    );
  }

  // styleData.dataList
  //   .filter(entry => {
  //     return true;
  //   })
  //   .map(entry => {
  //     return (
  //       <div
  //         className={
  //           (entry.id in selectedActivities ? "customAccentBackground" : "") +
  //           " btn"
  //         }
  //         onClick={() => {
  //           let t = selectedActivities;

  //           if (entry.id in t) {
  //             delete t[entry.id];
  //           } else {
  //             t[entry.id] = null;
  //           }
  //           setSelectedActivities(t);
  //           setRefresh(!refresh);
  //         }}
  //       >
  //         <p>{entry.name}</p>
  //       </div>
  //     );
  //   });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: ""
    },

    onSubmit: async values => {
      console.log("account create request");
      console.log(values);

      CreateAccountAction(
        values.username,
        values.password,
        values.email,
        Object.keys(selectedActivities),
        GetReferral()
      ).then(data => {
        if (data.created == true) {
          console.log("Account create success");
          router.push("/");
        }
        console.log("account create response");
        console.log(data);
      });
    }
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!!token && token !== "" && token !== "null") {
      console.log("TOKEN");
      console.log(token);
      router.push("/");
    }
  }, []);

  function QuestionChecbox(label, checked = false, onValueChange = null) {
    return (
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{label}</span>
          <input
            type="checkbox"
            checked={checked}
            className="checkbox checkbox-primary"
            onClick={onValueChange}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="w-full h-screen justify-center text-center pt-10 ">
      <p>{loginErrorResponse}</p>
      <AnimAppearDirection className="space-y-10" key={panelId}>
        <form onSubmit={formik.handleSubmit}>
          {panelId == 0 && (
            <div>
              <HeadingComponent
                textColor={"w-full justify-center text-center customAccentText"}
              >
                {"Profile Information"}
              </HeadingComponent>

              <p className="customAccentText">Email</p>
              <input
                className="w-4/12 h-16 rounded"
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
              />

              <p className="customAccentText">Username</p>
              <input
                className="w-4/12 h-16 rounded"
                id="username"
                type="text"
                placeholder="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />

              <div>
                <p className="customAccentText">Password</p>
                <input
                  className="w-4/12 h-16 rounded"
                  id="password"
                  type="password"
                  placeholder="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <p className="customAccentText">Confirm Password</p>
                <input
                  className="w-4/12 h-16 rounded"
                  id="password"
                  type="password"
                  placeholder="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          )}

          {panelId == 1 && (
            <div className="my-10">
              <div className=" w-full justify-center text-center">
                <HeadingComponent
                  textColor={
                    "w-full justify-center text-center customAccentText"
                  }
                >
                  {"Martial Art Interests"}
                </HeadingComponent>
                <HeadingComponent
                  textColor={"w-full justify-center text-center"}
                  size={4}
                >
                  Select all that apply
                </HeadingComponent>

                <div className="flex space-x-10 w-12/12 justify-center my-10">
                  {martialArtTypeElements}
                </div>
              </div>

              <a
                className="customAccentText hover:link"
                onClick={() => {
                  setPanelId(panelId + 2);
                }}
              >
                Skip
              </a>
            </div>
          )}
          {panelId == 2 && (
            <div className=" w-full justify-center text-center">
              <HeadingComponent
                textColor={"w-full justify-center text-center customAccentText"}
              >
                {"Martial Art Communities"}
              </HeadingComponent>
              <HeadingComponent
                textColor={"w-full justify-center text-center"}
                size={4}
              >
                Select a few to get started. You can update them later.
              </HeadingComponent>

              <div className=" flexwrap justify-center space-x-5 ">
                {styleDataElements}
              </div>
            </div>
          )}

          {panelId == 3 && (
            <div>
              <HeadingComponent>Creating Profile</HeadingComponent>
              <p>This may take a few seconds</p>
              <CircularProgress />
            </div>
          )}

          <p>{loginErrorResponse}</p>
          <div className="flex justify-center item-center space-x-5 w-12/12">
            {panelId > 0 && (
              <button
                className="btn w-3/12 customAccentBackground text-white"
                onClick={e => {
                  if (panelId > 0) {
                    setPanelId(panelId - 1);
                  }
                }}
              >
                Back
              </button>
            )}
            <button
              className="btn customAccentBackground w-3/12 text-white"
              onClick={e => {
                setPanelId(panelId + 1);
                // if (panelId == 0) {
                //   //email
                //   IsEmailValidAction(formik.values.email).then(data => {
                //     if (data.success) {
                //       setPanelId(panelId + 1);
                //     } else {
                //       setLoginErrorResponse(data.errorMessage);
                //     }
                //   });
                // }
                // if (panelId == 1) {
                //   //username
                //   IsUsernameAvailableAction(formik.values.username).then(data => {
                //     if (data.available) {
                //       setPanelId(panelId + 1);
                //     } else {
                //       setLoginErrorResponse(data.error);
                //     }
                //   });
                // }
                // if (panelId == 2) {
                //   //username
                //   IsPasswordValidAction(formik.values.password).then(data => {
                //     if (data.success) {
                //       setPanelId(panelId + 1);
                //     } else {
                //       setLoginErrorResponse(data.error);
                //     }
                //   });
                // }

                // if (panelId == 3) {
                //   setPanelId(panelId + 1);
                // }
              }}
            >
              NEXT
            </button>
            <button className="btn" type="submit">
              Create
            </button>
          </div>

          {/* <ul className="steps">
            <li className={"step " + (panelId >= 0 ? "step-info" : "")}>
              Email
            </li>
            <li className={"step " + (panelId >= 1 ? "step-info" : "")}>
              Password
            </li>
            <li className={"step " + (panelId >= 2 ? "step-info" : "")}>
              Username
            </li>
            <li className={"step " + (panelId >= 3 ? "step-info" : "")}>454</li>
            <li className={"step " + (panelId >= 4 ? "step-info" : "")}>
              we3d
            </li>
            <li className={"step " + (panelId >= 5 ? "step-info" : "")}>
              yu7ji
            </li>
          </ul> */}
        </form>
      </AnimAppearDirection>
    </div>
  );
};

export default RegisterFunnelComponent;
