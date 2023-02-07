import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function ActivityFighterRankComponent({
  activityList = null,
  countryCode = null,
  fighterId = null
}) {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div>
      <p>Activity Rank</p>
      <p> (icon) (current) (activity) (country_code)</p>
    </div>
  );
}
