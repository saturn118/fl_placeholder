import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoginRedirectCheck } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

export default function PageContributionComponent() {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div className="grid py-10">
      <button className="btn center customAccentBackground logoFont">
        CONTRIBUTE TO THIS PAGE
      </button>
    </div>
  );

  return (
    <div>
      <HeadingComponent showBar={true} size={2}>
        {" "}
        CONTRIBUTE TO THIS PAGE
      </HeadingComponent>
      <p>Suggest an edit or add missing content</p>
      <button
        className="btn"
        onClick={() => {
          if (LoginRedirectCheck(router)) {
            return;
          }

          //TODO, go to edit page
        }}
      >
        Edit Page
      </button>
    </div>
  );
}
