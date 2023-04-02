import React from "react";
import HeadingComponent from "./HeadingComponent";

export default function SummaryStatComponent({
  label = "placeholder",
  mainLabel = null,
  attr = "",
  primaryColor = "text-blue-600",
  secondaryColor = "text-white"
}) {
  return (
    <div className={"text-center " + attr}>
      <HeadingComponent size={6} textColor={primaryColor + " centerX " + attr}>
        {label.toUpperCase()}
      </HeadingComponent>

      <HeadingComponent
        size={2}
        textColor={secondaryColor + " centerX " + attr}
      >
        {mainLabel}
      </HeadingComponent>
    </div>
  );
}

export function SummaryStatButtonComponent({ label = "", content = null }) {
  return (
    <SummaryStatComponent
      label={label}
      mainLabel={"CAKE"}
      secondaryColor="bg-red-100"
    />
  );
}
export function SummaryStatCustomComponent({
  label = "placeholder",
  mainLabel = "placeholder",
  attr = "",
  children
}) {
  return (
    <div className={"text-center  " + attr}>
      {/* text-gray-400 */}
      <div className=" font-bold text-blue-600 ">{label.toUpperCase()}</div>
      <div className="centerdat">{children}</div>
    </div>
  );
}
