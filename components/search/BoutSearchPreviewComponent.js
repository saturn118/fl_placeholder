import { Button, Chip } from "@mui/material";
// import { Link } from "react-router-dom";
import Link from "next/link";
import React from "react";
// import { getImage, getFlagImagePath } from "../api";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config/index";
import FlagComponent from "../FlagComponent";

export default function BoutPreviewComponent({
  element,
  hidePromo = false,
  hideDivision = false
}) {
  //pre checks

  let fighterAInstance = null;
  let fighterBInstance = null;
  try {
    fighterAInstance = element.fighterData[element.fighterAId];

    fighterBInstance = element.fighterData[element.fighterBId];
  } catch (e) {
    return <div>error rending data</div>;
  }

  let promoInstance = element.promoData;

  return (
    <div className="flex bout-search-container">
      <div>
        <Link href={`/bout/${element.id}`}>
          <Button>Bout</Button>
        </Link>
      </div>
      <div>
        <Link href={`/event/${element.eventId}`}>
          <Button>Event</Button>
        </Link>
      </div>
      <div>
        {/* <Rating name="customized-10" defaultValue={1} max={1} /> */}
      </div>
      <div>{FlagComponent(element.countryCode, 30)}</div>
      <div>
        <p>{element.date}, </p>
      </div>
      {hidePromo == false && promoInstance && (
        <div>
          <Link href={`/promotion/${promoInstance.id}`}>
            <Button>{promoInstance.name}</Button>
          </Link>
        </div>
      )}
      {hideDivision == false && (
        <div>
          <p>{element.divisionName} lbs</p>
        </div>
      )}
      <div>
        <Chip label={element.martialArt} />
      </div>

      <div>
        <Link href={`/person/${fighterAInstance.id}`}>
          {fighterAInstance.name}
        </Link>
        {"   "}
        vs{"   "}
        <Link href={`/person/${fighterBInstance.id}`}>
          {fighterBInstance.name}
        </Link>
      </div>

      {hidePromo == false && promoInstance && (
        <div>
          <img
            width="50px"
            src={DATA_SERVER_IMAGE_ADDRESS + promoInstance.imageUrl}
          ></img>
        </div>
      )}
    </div>
  );
}

export function BoutPreviewSidebarComponent({
  element,
  hidePromo = false,
  hideDivision = false
}) {
  //pre checks

  let fighterAInstance = null;
  let fighterBInstance = null;
  try {
    fighterAInstance = element.fighterData[element.fighterAId];

    fighterBInstance = element.fighterData[element.fighterBId];
  } catch (e) {
    return <div>error rending data</div>;
  }

  let promoInstance = element.promoData;

  return (
    <div className="flex bout-search-container">
      <div>
        <Link href={`/bout/${element.id}`}>
          <Button>Bout</Button>
        </Link>
      </div>
      <div>
        <Link href={`/event/${element.eventId}`}>
          <Button>Event</Button>
        </Link>
      </div>
      <div>
        {/* <Rating name="customized-10" defaultValue={1} max={1} /> */}
      </div>
      <div>{FlagComponent(element.countryCode, 30)}</div>
      <div>
        <p>{element.date}, </p>
      </div>
      {hidePromo == false && promoInstance && (
        <div>
          <Link href={`/promotion/${promoInstance.id}`}>
            <Button>{promoInstance.name}</Button>
          </Link>
        </div>
      )}
      {hideDivision == false && (
        <div>
          <p>{element.divisionName} lbs</p>
        </div>
      )}
      <div>
        <Chip label={element.martialArt} />
      </div>

      <div>
        <Link href={`/person/${fighterAInstance.id}`}>
          {fighterAInstance.name}
        </Link>
        {"   "}
        vs{"   "}
        <Link href={`/person/${fighterBInstance.id}`}>
          {fighterBInstance.name}
        </Link>
      </div>

      {hidePromo == false && promoInstance && (
        <div>
          <img
            width="50px"
            src={DATA_SERVER_IMAGE_ADDRESS + promoInstance.imageUrl}
          ></img>
        </div>
      )}
    </div>
  );
}
