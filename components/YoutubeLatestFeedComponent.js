import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function YoutubeLatestFeedComponent({ channelName = "ufc" }) {
  const router = useRouter();

  useEffect(() => {}, []);

  let source = [1, 1, 1];
  let videoElements = source.map(entry => {
    return (
      // <iframe
      //   className="margin"
      //   width="250"
      //   height="135"
      //   src={
      //     "https://www.youtube.com/embed?max-results=3&controls=0&showinfo=0&rel=0&listType=user_uploads&list=" +
      //     channelName
      //   }
      //   frameborder="0"
      //   allowfullscreen
      // ></iframe>

      <div className="margin">
        <Skeleton variant="rectangular" width={250} height={135} />
      </div>
    );
  });

  return <div className="flexwrap">{videoElements}</div>;
}
