import { Avatar, Chip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import FlagComponent from "../FlagComponent";

const FighterSearchComponent = ({ searchData, searchTerm }) => {
  let iKey = 0;
  const router = useRouter();

  useEffect(() => {}, [searchData]);

  let searchResultElements = searchData.data.map(entry => {
    iKey += 1;

    let tagData = entry.tags;
    if (entry.isReferee) tagData.push("Referee");
    if (entry.isJudge) tagData.push("Judge");

    let activityTagElements = tagData.map(entry => {
      let name = entry;
      if (name == "mixed martial arts") name = "mma";

      return <Chip label={name} color="info" />;
    });

    let name = entry.name;
    if (entry.nickname) name += ' "' + entry.nickname + '"';

    return (
      <Link href={"/person/" + entry.id}>
        <a>
          <div className={"w-10/12 mt-3 bg-gray-50 rounded"}>
            <div className="flex">
              <div className="w-1/12">
                <Avatar
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                  src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
                />
              </div>
              <p className="w-5/12 font-bold link pl-5 customAccentText ">
                {name}
              </p>
              <div className="w-1/12">
                <div className="justify-center">
                  {FlagComponent(entry.nationalityCountryCode, 35)}
                </div>
              </div>
              <p className="w-2/12">
                {entry.yearStart}-{entry.yearEnd}
              </p>

              <div className="w-3/12 flex space-x-1">{activityTagElements}</div>
            </div>
          </div>
        </a>
      </Link>
    );
  });
  return <div className="p-5">{searchResultElements}</div>;
};

export default FighterSearchComponent;
