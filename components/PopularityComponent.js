import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AddPopularityTrackingEntry } from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";

export default function PopularityComponent({
  rankData = null,
  entityId = null,
  entityType = null
}) {
  const router = useRouter();

  let rank = rankData ? rankData.rank : "-";
  let views = rankData ? rankData.views : "-";

  function AddSuffix(d) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  useEffect(() => {
    AddPopularityTrackingEntry(router.asPath);
  }, []);

  let iconElement = <EqualizerIcon />;

  return (
    <div>
      <Link href={"/trending/" + entityType}>
        <a>
          <li>
            <HeadingComponent textColor={"text-zinc-100 text-center "} size={6}>
              {/* Trending {entityType} */}
              Trending
            </HeadingComponent>
          </li>

          <li>
            <Button>
              {iconElement}
              <div className="flex">
                {" "}
                <HeadingComponent
                  textColor={"text-white font-extrabold"}
                  size={6}
                >
                  {rank}
                  {AddSuffix(rank)}
                </HeadingComponent>{" "}
                <ArrowDropUpIcon color="success" />
              </div>
            </Button>
          </li>
        </a>
      </Link>
    </div>
  );
}
