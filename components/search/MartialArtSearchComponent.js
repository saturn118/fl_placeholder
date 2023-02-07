import { Avatar, Chip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import HeadingComponent from "../utility/HeadingComponent";

const MartialArtSearchComponent = ({ searchData, searchTerm }) => {
  let iKey = 0;
  const router = useRouter();

  let searchResultElements = searchData.data.map(entry => {
    let typeData = [
      [entry.weapons, "Weapons"],
      [entry.striking, "Striking"],
      [entry.fullContact, "Full Contact"],
      [entry.grappling, "Grappling"]
    ];

    let typeElements = typeData.map(typeEntry => {
      if (typeEntry[0] == false) return <></>;

      return (
        <Chip
          label={typeEntry[1]}
          color="info"
          variant="outlined"
          onClick={() => {}}
        />
      );
    });

    iKey += 1;

    return (
      <Link href={"/martialart/" + entry.id}>
        <a>
          <div className={"w-8/12 mt-3  bg-gray-50 rounded flex"}>
            <Avatar
              variant="rounded"
              sx={{ width: 100, height: 100 }}
              src={DATA_SERVER_IMAGE_ADDRESS + entry.imageUrl}
            />
            <div className="pl-5 pt-4">
              <HeadingComponent textColor={"customAccentText"} size={4}>
                {" "}
                {entry.name.toUpperCase()}
              </HeadingComponent>

              <div className="flex space-x-2">{typeElements}</div>
            </div>
          </div>
        </a>
      </Link>
    );
  });

  return <>{searchResultElements}</>;
};

export default MartialArtSearchComponent;
