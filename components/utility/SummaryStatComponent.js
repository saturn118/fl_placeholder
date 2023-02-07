import React from "react";
export default function SummaryStatComponent({
  label = "placeholder",
  mainLabel = "placeholder",
  attr = "",
  primaryColor = "text-blue-600",
  secondaryColor = "text-white"
}) {
  return (
    <div className={"text-center " + attr}>
      {/* text-gray-400 */}
      <div className={"logoFont font-bold " + primaryColor}>
        {label.toUpperCase()}
      </div>
      <div className={" logoFont stat-value " + secondaryColor}>
        {mainLabel.toUpperCase()}
      </div>
    </div>
  );
}

export function SummaryStatCustomComponent({
  label = "placeholder",
  mainLabel = "placeholder",
  attr = "",
  children
}) {
  return (
    <div className={"text-center " + attr}>
      {/* text-gray-400 */}
      <div className=" font-bold text-blue-600 ">{label.toUpperCase()}</div>
      {children}
    </div>
  );
}
