import React from "react";

const ContinentSelector = ({ continentValue, continentSetter }) => {
  const handleChange = event => {
    continentSetter(event.target.value);
  };

  return (
    <select
      id="continent-selector"
      value={continentValue}
      onChange={handleChange}
    >
      <option value={null}>Any</option>
      <option value="af">Africa</option>
      {/* <option value="an">Antarctica</option> */}
      <option value="as">Asia</option>
      <option value="eu">Europe</option>
      <option value="na">North America</option>
      <option value="oc">Oceania</option>
      <option value="sa">South America</option>
    </select>
  );
};

export default ContinentSelector;
