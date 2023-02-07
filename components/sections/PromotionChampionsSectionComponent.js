import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BACKGROUND_ATTR } from "../../config";
import FlagComponent from "../FlagComponent";
import HeadingComponent from "../utility/HeadingComponent";
import { BodyColumnSectionComponent } from "./BodyHeaderSectionComponent";
import PromotionHeaderNavigationComponent from "./PromotionHeaderNavigationComponent";

const PromotionChampionsSectionComponent = ({
  promoData,
  divisionData,
  targetYear,
  yearsData,
  championData
}) => {
  const router = useRouter();
  let yearElements = yearsData.data.map(entry => {
    return <option value={entry}>{entry}</option>;
  });

  let championElements = championData.data.map(entry => {
    return (
      <div className={BACKGROUND_ATTR + " p-2 flex"}>
        <div className="w-1/12">
          {FlagComponent(entry.person.nationalityCountryCode, 35)}
        </div>
        <div className="w-5/12 link customAccentText">
          <Link href={"/person/" + entry.person.id}>
            <a>{entry.person.name}</a>
          </Link>
        </div>
        <div className="w-2/12">{entry.meta.martialArt}</div>
        <div className="w-2/12">{entry.meta.divisionName}</div>
        <Link href={"/division/" + entry.meta.divisionId + "/champions"}>
          <a className="link customAccentText">lineage</a>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <PromotionHeaderNavigationComponent
        pageId={"champions"}
        promotionData={promoData}
        subTitle={"Champions"}
      />
      <BodyColumnSectionComponent
        sideContent={
          <div className="p-5">
            <HeadingComponent size={3}>Champions Annual</HeadingComponent>
            <p>A summary of current title holders at the end of each year</p>

            <p className="customAccentText">Year</p>
            <select
              className="w-full"
              value={targetYear}
              onChange={e => {
                console.log(e.target.value);
                router.push(
                  "/promotion/" + promoData.id + "/champions/" + e.target.value
                );
              }}
            >
              {yearElements}
            </select>

            <p>OR</p>

            <p>Select a division</p>
            <p>To view the holder lineage</p>
            <div>
              <select>
                <option value={null}>Stick to promo</option>
              </select>
            </div>
            <button className="btn w-full customAccentBackground text-white">
              View{" "}
            </button>
          </div>
        }
        mainContent={<div className="p-10 space-y-2">{championElements}</div>}
      ></BodyColumnSectionComponent>
    </div>
  );
};

export default PromotionChampionsSectionComponent;
