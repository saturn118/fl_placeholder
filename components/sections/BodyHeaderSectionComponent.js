import React from "react";
import { BACKGROUND_ATTR } from "../../config";
import AdvertComponent from "../AdvertComponent";

export const BodyHeaderSectionComponent = ({ children, ...props }) => {
  return (
    <div>
      <div className="pageHeaderColour pt-5 pb-10">
        <div className="container">{children}</div>
      </div>
      {/* <div className="container">
        <AdvertComponent />
      </div> */}
    </div>
  );
};

export const BodyColumnSectionComponent = ({
  sideContent = null,
  sideRContent = null,
  mainContent = null,
  twoSections = false,
  fixedPos = true,
  ...props
}) => {
  return (
    <div className="flex w-full min-h-screen containerNavBar ">
      <div className={" w-3/12  py-3 pl-5 " + BACKGROUND_ATTR}>
        {sideContent}
      </div>

      <div className={twoSections ? "w-9/12" : "w-6/12" + ""}>
        {mainContent}
      </div>
      {!twoSections && (
        <div className={"w-3/12 pt-5 pl-5 space-y-2 p-10"}>
          {sideRContent != null && sideRContent}
          {!sideRContent && (
            <div className="space-y-10">
              {" "}
              <AdvertComponent />
              <AdvertComponent />
              <AdvertComponent />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const BodyColumnResponsiveBottomComponent = ({
  sideContent = null,
  mainContent = null,
  flip = false,
  ...props
}) => {
  return (
    <div className={"container_responsive " + (flip ? "flexReverse" : "")}>
      <div className={"container_responsive_secondary"}>{sideContent}</div>

      <div className={"container_responsive_main"}>{mainContent}</div>
    </div>
  );
};

export const BodyColumnMainSectionComponent = ({
  sideContent = null,
  mainContent = null,
  ...props
}) => {
  return (
    <div className="flex w-full min-h-screen containerNavBar">
      <div className={"w-8/12 py-10"}>{mainContent}</div>
      <div className={" w-4/12  py-10" + BACKGROUND_ATTR}>{sideContent}</div>
    </div>
  );
};

export const BodyGridComponent = ({ elements = [], ...props }) => {
  return (
    <div class="grid-container">
      {elements.map(entry => {
        return <div class="grid-item">{entry}</div>;
      })}
    </div>
  );
};

export default BodyHeaderSectionComponent;
