import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";

const ACCCESS_TOKEN =
  "pk.eyJ1Ijoic2F0dXJuMTE4IiwiYSI6ImNrd2diZjRycTBuNDYyeG01b3c5MnJlZzUifQ.sAmDzZbUbrmHfAsymoWQCQ";
const MapComponent = ({
  heightString = "350px",
  mapStyle,
  center = [103.81109597458529, 1.3446872144511148]
}) => {
  useEffect(() => {
    mapboxgl.accessToken = ACCCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 10
    });

    // Add custom control
    // map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      // add any additional functionality here
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: "100%", height: heightString }} />;
};

export default MapComponent;
