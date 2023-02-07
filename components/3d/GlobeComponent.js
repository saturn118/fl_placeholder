// import Globe from "react-globe.gl";
import dynamic from "next/dynamic";
import React from "react";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  import("react-globe.gl");
}
const Globe = dynamic(
  () => {
    return import("react-globe.gl").then(mod => mod.Globe);
  },
  { ssr: false }
);

function GlobeComponent() {
  const { useState, useEffect } = React;

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      pointAltitude="size"
      pointColor="color"
    />
  );
}

export default GlobeComponent;
