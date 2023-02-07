import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IsLoggedIn, IsLoggedInLoginPrompt } from "../config";
import { AccountFollowUpdateAction, AccountIsFollowingEntityAction } from "../helpers/api";

export default function FollowComponent({
  followType = null,
  followId = null,
  isFollowingInitial = false
}) {
  const [following, setFollowing] = useState(null);
  const [idLong, setIdLong] = useState(null);
  const [id, setId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (IsLoggedIn("Sign in to follow this page")) {
      AccountIsFollowingEntityAction(followType, followId).then(data => {
        console.log("Follow Status Response");
        // console.log("Checking For Follow Status " + data.data.following);
        console.log(data);

        setFollowing(data.data.following);

        // if (data.data.done) {
        //   console.log("Follow Status Changed " + newFollowValue);

        //   setFollowing(newFollowValue);
        // }
      });
    }
  }, []);

  function handleFollowChanged(e) {
    if (!IsLoggedInLoginPrompt()) {
      return;
    }

    let newFollowValue = !following;
    AccountFollowUpdateAction(newFollowValue, followType, followId).then(
      data => {
        console.log("Follow Response");
        console.log(data);

        if (data.data.done) {
          console.log("Follow Status Changed " + newFollowValue);

          setFollowing(newFollowValue);
        }
      }
    );
  }

  let followString = following ? "Following" : "Follow";
  <StarIcon sx={{ color: "#ffeb3b" }} />;

  return (
    <button
      className="btn rounded customAccentBackground"
      onClick={handleFollowChanged}
    >
      {followString}
    </button>
  );
}
