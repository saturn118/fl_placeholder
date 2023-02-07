import React from "react";

export const RecordPageTemplateComponent = ({
  pageTitle,
  subTitle,
  subTitleUrl,
  description = "Decided by the voting habits of Opponent's users",
  filters = null,
  wrap = false,
  yearList = [],
  children
}) => {
  let contentAttributes = "w-full space-y-2  pt-5 pb-5";
  if (wrap) {
    contentAttributes += " flexwrap";
  }

  return (
    <div>
      <div className={contentAttributes}>{children}</div>
    </div>
  );
};

export default RecordPageTemplateComponent;
