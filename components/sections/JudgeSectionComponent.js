import Link from "next/link";
import React from "react";
import { JudgeGroupComponent } from "../../pages/person/[id]/judge";
import PieComponent from "../PieComponent";
import HeadingComponent from "../utility/HeadingComponent";





export function JudgeAlignmentOfficial(judgeData) {
  return (
    <PieComponent
      showLegend={false}
      label={"OFFICIAL DECISION"}
      label2={judgeData.summary.total + " bouts"}
      customData={[
        {
          name: "Agree",
          value: judgeData.summary.official.majority
        },
        {
          name: "Disagree",
          value: judgeData.summary.official.minority
        }
      ]}
    />
  );
}

export function JudgeAlignmentCommunity(judgeData) {
  return (
    <PieComponent
      showLegend={false}
      label={"COMMUNITY DECISION"}
      label2={
        judgeData.summary.community.minority +
        judgeData.summary.community.majority +
        " bouts"
      }
      customData={[
        {
          name: "Agree",
          value: judgeData.summary.community.majority
        },
        {
          name: "Against",
          value: judgeData.summary.community.minority
        }
      ]}
    />
  );
}

export function JudgeSummary(judgeData) {
  return (
    <div>
      <div className="flex">
        <PieComponent
          label={"BOUTS JUDGED"}
          label2={judgeData.summary.total + " bouts"}
          customData={[
            {
              name: "Early End",
              value:
                judgeData.summary.total -
                judgeData.summary.totalBoutsReachedJudging
            },
            {
              name: "Judged",
              value: judgeData.summary.totalBoutsReachedJudging
            }
          ]}
        />

        {JudgeAlignmentOfficial(judgeData)}
        {JudgeAlignmentCommunity(judgeData)}
      </div>
    </div>
  );
}

export const JudgeSectionComponent = ({ judgeData, fighterId }) => {
  return (
    <div>
      <Link href={"/person/" + fighterId + "/judge"}>
        <a>
          <HeadingComponent showArrow={true} showBar={true} size={2}>
            Judge History
          </HeadingComponent>
        </a>
      </Link>

      <div className=" w-10/12">{JudgeSummary(judgeData)}</div>
      <JudgeGroupComponent judgeData={judgeData} />
    </div>
  );
};

export default JudgeSectionComponent;
