import { Avatar, Chip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import HeadingComponent from "../utility/HeadingComponent";

const PositionSearchComponent = ({ searchData, searchTerm }) => {
  let iKey = 0;
  const router = useRouter();
  console.log("DEBUG SEARCH DATA");
  console.log(searchData);

  let searchResultElements = searchData.data.map(entry => {
    iKey += 1;

    return (
      <div className={"w-8/12 mt-3  bg-gray-50 rounded flex"}>
        <Avatar
          variant="rounded"
          sx={{ width: 100, height: 100 }}
          src={DATA_SERVER_IMAGE_ADDRESS + entry.imagePreviewId}
        />
        <div className="pl-5 pt-4">
          <Link href={"/position/" + entry.id}>
            <a>
              <HeadingComponent textColor={"customAccentText"} size={4}>
                {" "}
                {entry.name.toUpperCase()}
              </HeadingComponent>
            </a>
          </Link>

          <div className="flex space-x-2">
            <Link href={"/position/" + entry.id + "?role=" + entry.poseNameA}>
              <a>
                {" "}
                <Chip
                  label={entry.poseNameA}
                  color="info"
                  variant="outlined"
                  onClick={() => {}}
                />
              </a>
            </Link>
            <Link href={"/position/" + entry.id + "?role=" + entry.poseNameB}>
              <a>
                <Chip
                  label={entry.poseNameB}
                  color="info"
                  variant="outlined"
                  onClick={() => {}}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return <>{searchResultElements}</>;
};

export default PositionSearchComponent;
