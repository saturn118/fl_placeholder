import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AddPopularityTrackingEntry } from "../helpers/api";
import HeadingComponent from "./utility/HeadingComponent";

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

export default function PopularityComponent({
  rankData = null,
  entityId = null,
  entityType = null,
  titleColor = "text-gray-300",
  secondaryColor = "text-white"
}) {
  const router = useRouter();

  let rank = rankData ? rankData.rank : "-";
  let oldRank = rankData ? rankData.oldrank : "??";
  let views = rankData ? rankData.views : "-";

  useEffect(() => {
    AddPopularityTrackingEntry(router.asPath);
  }, []);

  let iconElement = <EqualizerIcon />;

  return (
    <div>
      <Link href={"/trending/" + entityType}>
        <a>
          <li>
            <HeadingComponent textColor={"text-center " + titleColor} size={6}>
              TRENDING
            </HeadingComponent>
          </li>

          <li>
            <Button>
              <PopularityRankArrowComponent
                rankIndex={rank}
                previousRankIndex={oldRank}
                textColor={secondaryColor}
              />
            </Button>
          </li>
        </a>
      </Link>
    </div>
  );
}

export function PopularityRankArrowComponent({
  rankIndex,
  previousRankIndex,
  textColor = "text-white"
}) {
  let delta = 0;
  let deltaElement = null;
  let iconElement = <TrendingUpIcon fontSize="large" color={"success"} />;

  if (rankIndex && previousRankIndex) {
    let c = Number(rankIndex);
    let o = Number(previousRankIndex);
    if (c > o) {
      iconElement = <TrendingDownIcon color={"error"} fontSize="large" />;
      delta = c - o;
      deltaElement = (
        <span className={textColor}>
          <ArrowDropDownIcon color={"error"} />
          {delta}
        </span>
      );
    } else {
      iconElement = <TrendingUpIcon fontSize="large" color={"success"} />;
      delta = o - c;
      deltaElement = (
        <span className={textColor}>
          <ArrowDropUpIcon color={"success"} />
          {delta}
        </span>
      );
    }
  }

  return (
    <div className="flex">
      {iconElement}
      <HeadingComponent textColor={"font-extrabold " + textColor} size={6}>
        {rankIndex}
        {AddSuffix(rankIndex)}
      </HeadingComponent>{" "}
      {delta != 0 && deltaElement}
    </div>
  );
}
