import React from "react";

export default function AdvertComponent({ height = "200" }) {
  return (
    <div className={"w-full bg-yellow-500 h-[" + height + "px]"}>
      <p>Advert Placeholder</p>
    </div>
  );
}
