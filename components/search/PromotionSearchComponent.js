import { Avatar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import { ConverDateToDaysAgoString } from "../../helpers/api";
import FlagComponent from "../FlagComponent";

const PromotionSearchComponent = ({ searchData, searchTerm }) => {
  let iKey = 0;
  const router = useRouter();
  console.log("DEBUG SEARCH DATA");
  console.log(searchData);

  let searchResultElements = searchData.data.map(entry => {
    iKey += 1;

    let firstYear = new Date(Date.parse(entry.firstEventDate)).getFullYear();
    let lastYear = new Date(Date.parse(entry.latestEventDate)).getFullYear();

    let amProText = "PRO";
    if (entry.hasAmateurBouts) {
      amProText += "-AM";
    }

    let activityTagElements = entry.tags.map(entry => {
      let name = entry;
      if (name == "mixed martial arts") name = "mma";

      return <p className="bg-gray-200">{name}</p>;
    });

    return (
      <div className={"w-12/12 mt-3  bg-gray-50 rounded"}>
        <div className="flex">
          <div className="w-1/12">
            <Avatar
              variant="rounded"
              sx={{ width: 50, height: 50 }}
              src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
            />
          </div>

          <div className="w-5/12 ">
            <p className="customAccentText link ">
              {" "}
              <Link href={"/promotion/" + entry.id}>
                <a>{entry.name} </a>
              </Link>
            </p>

            <div className="flex space-x-2 ">{activityTagElements}</div>
          </div>

          <p className="w-2/12">
            {firstYear} - {lastYear}
          </p>
          <div className="w-1/12">
            <div className="justify-center">
              {FlagComponent(entry.primaryCountryCode, 35)}
            </div>
          </div>

          <div className="w-1/12">
            <p>
              {entry.hasProfessionalBouts == true && <span>Pro</span>}{" "}
              {entry.hasAmateurBouts == true && <span>Am</span>}
            </p>
          </div>

          <div className="w-1/12">
            {ConverDateToDaysAgoString(entry.latestEventDate)}
          </div>
        </div>
      </div>
    );
  });

  return <>{searchResultElements}</>;
};

export default PromotionSearchComponent;
