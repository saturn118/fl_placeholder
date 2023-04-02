import React from "react";

export default function AdvertComponent({ height2 = "2300" }) {
  return (
    <div className={"w-full bg-yellow-500 p-5 min-h-[" + height2 + "px]"}>
      Advert Placeholder
    </div>
  );
}
