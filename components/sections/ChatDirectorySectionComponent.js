import { ImageMissingEntryWidgetComponent } from "@components/ImageMissingEntryComponent";
import HeadingComponent from "@components/utility/HeadingComponent";
import { Avatar, Skeleton, Pagination } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS, BACKGROUND_ATTR } from "../../config";
import ElementSetSummaryComponent from "@components/ElementSetSummaryComponent";
import { ConverDateToDaysAgoString } from "helpers/api";
import AdvertComponent from "@components/AdvertComponent";
import CreateTopicComponent from "@components/account/CreateTopicComponent";
import UserVoteComponent from "@components/UserVoteComponent";

export const ChatDirectorySectionComponent = ({
  entityType,
  entityId,
  threadData
}) => {
  return (
    <div >
      <div className="">
        {/* <HeadingComponent size={4}>
        Showing{" "}
        <span className="customAccentText">
          {threadData.stats.showing}{" "}
        </span>{" "}
        out of{" "}
        <span className="customAccentText">{threadData.stats.total}</span>{" "}
        Topics
      </HeadingComponent> */}

        <CreateTopicComponent entityType={entityType} entityId={entityId} />
      </div>

      {/* <p>Add general thread a stickied post</p>
      <p>report feature</p>
      <p>Maybe share to my timeline</p> */}

      <div className="">
        {threadData.topics.map(entry => {
          return (
            <Link href={"/topic/" + entry.id}>
              <a>
                <div className={BACKGROUND_ATTR + " w-full  flex"}>
                  <div className="w-1/12 mr-5">
                    <UserVoteComponent />

                    {/* {entry.score} */}
                  </div>
                  <div className="w-9/12 pt-5">
                    <HeadingComponent
                      textColor="customAccentText w-full hover:link"
                      size={5}
                    >
                      {entry.content}
                    </HeadingComponent>

                    <p>
                      By{" "}
                      <span className="mr-3 customAccentText hover:link">
                        <Link href={"/user/" + entry.username}>
                          <a>{entry.username}</a>
                        </Link>
                      </span>
                      {ConverDateToDaysAgoString(entry.timestamp)}
                    </p>
                  </div>
                  <div className="centerdat">
                    <div>
                      <p>{entry.replies}</p>
                      <p> Replies</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      <div className="centerdat w-full mt-5">
        <Pagination
          count={Math.floor(Math.random() * 10)}
          defaultPage={1}
          variant="outlined"
          color="primary"
          siblingCount={0}
          hideNextButton={false}
          hidePrevButton={false}
          onChange={(event, pageNumber) => {}}
        />
      </div>
    </div>
  );
};

export default ChatDirectorySectionComponent;
