import axios from "axios";
import { DATA_SERVER_ADDRESS, GetUsername } from "../config";

export async function FollowedFighterActivityFeedAction() {
  const form_data = new FormData();
  form_data.append("limit", 10);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/user/followed-people-activity",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function AccountIsFollowingEntityAction(entityType, entityId) {
  const form_data = new FormData();
  form_data.append("entity_type", entityType);
  form_data.append("entity_id", entityId);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/account/is-following",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

//Follow anything
//EntityType = fighter|promoter|technique|position|user|
export async function AccountFollowUpdateAction(
  follow = true,
  entityType,
  entityId
) {
  const form_data = new FormData();
  form_data.append("following", follow);
  form_data.append("entity_type", entityType);
  form_data.append("entity_id", entityId);

  let serverUrl = "account/follow";
  if (follow == false) {
    serverUrl = "account/unfollow";
  }

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + serverUrl,
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function AddBoutDecisionVoteAction(boutId, winnerId) {
  const form_data = new FormData();
  form_data.append("bout_id", boutId);
  form_data.append("winner_id", winnerId);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "bout/decision/vote",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data.done;
}

export async function SearchFighterAction(
  name,
  activityId,
  gender,
  countryCode,
  promotionId,
  personType,
  activityGradeId
) {
  let form_data = new Object();
  form_data.name = name;
  form_data.activity = activityId;
  form_data.gender = gender;
  form_data.country_code = countryCode;
  form_data.promotion_id = promotionId;
  form_data.person_type = personType;
  form_data.grade = activityGradeId;

  const responseData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "fighters/search",
    data: form_data
    // headers: {
    //   Authorization: "Bearer " + localStorage.getItem("token")
    // }
  });

  return responseData.data;
}

export async function SearchPromotionAction(
  name,
  activityId,
  status,
  gender,
  countryCode,
  presence,
  competitionLevel
) {
  let form_data = new Object();
  form_data.name = name;
  form_data.activity = activityId;
  form_data.status = status;
  form_data.gender = gender;
  form_data.country_code = countryCode;
  form_data.presence = presence;
  form_data.competition_level = competitionLevel;

  const responseData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "promotions/search",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return responseData.data;
}

export async function SearchAction(term, searchType) {
  let res = null;
  if (searchType.includes("fighter")) {
    res = await fetch(DATA_SERVER_ADDRESS + `fighters/search/` + term);
  } else if (searchType.includes("user")) {
    res = await fetch(DATA_SERVER_ADDRESS + `user/search/` + term);
  } else if (searchType.includes("promo")) {
    res = await fetch(DATA_SERVER_ADDRESS + `promotions/search/` + term);
  } else if (searchType.includes("position")) {
    res = await fetch(DATA_SERVER_ADDRESS + `positions/search/` + term);
  } else if (searchType.includes("technique")) {
    res = await fetch(DATA_SERVER_ADDRESS + `techniques/search/` + term);
  } else if (searchType.includes("style")) {
    res = await fetch(DATA_SERVER_ADDRESS + `activity/search/` + term);
  }
  return await res.json();
}

export async function GetUserCreatedPromotions() {
  const responseData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/get-created-promotions",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return responseData;
}

export async function GetUserCreatedEvents() {
  const responseData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/get-created-events",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return responseData;
}

export async function MarkNotificationsAsRead(notificationIdList = []) {
  let form_data = new Object();
  form_data.notifications = { data: notificationIdList };

  const responseData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/notifications/read",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return responseData.data;
}

export async function GetAccountNotificationsAction(
  unread = null,
  limit = null
) {
  let form_data2 = new FormData();
  if (unread) form_data2.append("unread", true);
  if (limit) form_data2.append("limit", limit);
  const responseData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/notifications",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return responseData.data;
}

export async function CreatePromotionAction(
  name,
  bio,
  alias,
  countryCode,
  activityIdList
) {
  let form_data = new Object();
  if (!!name) form_data.name = name;
  if (!!bio) form_data.bio = bio;
  if (!!alias) form_data.alias = alias;
  if (!!countryCode) form_data.country = countryCode;
  if (!!activityIdList) form_data.activities = { data: activityIdList };

  const responseData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "promotions/create",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return responseData;
}

export async function GetEventsGenericAction(
  upcoming,
  recent,
  sortByDistance,
  lat,
  lon,
  limit,
  countryList,
  activityIdList,
  pageIndex = 0,
  gender = null,
  eventType = null,
  name = null,
  startDate = null,
  endDate = null
) {
  let form_data = new Object();
  if (!!upcoming) form_data.upcoming = upcoming;
  if (!!recent) form_data.recent = recent;
  if (!!sortByDistance) form_data.distance = sortByDistance;
  if (!!lat) form_data.lat = lat;
  if (!!lon) form_data.lon = lon;
  form_data.gender = gender;
  form_data.event_type = eventType;
  form_data.name = name;
  form_data.start_date = startDate;
  form_data.end_date = endDate;
  if (!!limit) form_data.limit = limit;
  if (!!countryList) form_data.countries = { data: countryList };
  if (!!activityIdList) form_data.activities = { data: activityIdList };
  if (!!pageIndex) form_data.page = pageIndex;

  let responseData = null;
  let t = await axios
    .post(DATA_SERVER_ADDRESS + "events/", form_data)
    .then(data => {
      responseData = data.data;
    });

  return responseData;
}

export async function GetRecordGenericAction(
  entityType,
  entityId,
  recordName,
  limit,
  year,
  nationality = null,
  gender = null
) {
  let form_data = new Object();
  if (!!year) form_data.year = year;
  if (!!limit) form_data.limit = limit;
  if (!!entityId) form_data.entity_id = entityId;
  if (!!entityType) form_data.entity_type = entityType;
  if (!!recordName) form_data.record_name = recordName;
  if (!!nationality) form_data.nationality = nationality;
  if (!!gender) form_data.gender = gender;
  let responseData = null;
  let t = await axios
    .post(DATA_SERVER_ADDRESS + "records", form_data)
    .then(data => {
      responseData = data.data;
    });

  return responseData;
}

// activityId = GetPostJsonInt("activity");
// nationality = GetPostJsonString("nationality");
// gender = GetPostJsonString("gender");
// gradeId = GetPostJsonInt("grade");

export async function GetGradesGenericAction(
  activityId,
  nationalityCode,
  gender,
  gradeId,
  promoCountry,
  promoId,
  gymId,
  year,
  divisionId,
  page
) {
  let form_data = new Object();
  if (!!activityId) form_data.activity = activityId;
  if (!!nationalityCode) form_data.nationality = nationalityCode;
  if (!!gender) form_data.gender = gender;
  if (!!gradeId) form_data.grade = gradeId;
  if (!!promoCountry) form_data.country = promoCountry;
  if (!!promoId) form_data.promotion = promoId;
  if (!!gymId) form_data.gym = gymId;
  if (!!year) form_data.year = year;
  if (!!page) form_data.page = page;
  if (!!divisionId) form_data.division = divisionId;
  let responseData = null;
  let t = await axios
    .post(DATA_SERVER_ADDRESS + "grades", form_data)
    .then(data => {
      responseData = data.data;
    });

  return responseData;
}

export async function GetRankingGenericAction(
  activityId,
  limit,
  activeOnly,
  countryCode,
  gender,
  divisionId,
  promoId,
  peakSnaphot
) {
  let form_data = new Object();
  if (!!activityId) form_data.activity = activityId;
  if (!!limit) form_data.limit = limit;
  if (!!activeOnly) form_data.active = activeOnly;
  if (!!countryCode) form_data.country = countryCode;
  if (!!gender) form_data.gender = gender;
  if (!!divisionId) form_data.division = divisionId;
  if (!!promoId) form_data.promo = promoId;
  if (!!peakSnaphot) form_data.peak = peakSnaphot;

  let responseData = null;
  let t = await axios
    .post(DATA_SERVER_ADDRESS + "ranking", form_data)
    .then(data => {
      responseData = data.data;
    });

  return responseData;
}

export async function GetPageCacheAction(subUrl) {
  let form_data = new Object();
  form_data.url = subUrl;

  let responseData = null;
  let t = await axios
    .post(DATA_SERVER_ADDRESS + "pagecache/get", form_data)
    .then(data => {
      if (data.data.cached) {
        responseData = data.data.data;
      }
    });

  return responseData;
}

export async function SetPageCacheAction(subUrl, jsonData) {
  let form_data = new Object();
  form_data.url = subUrl;
  form_data.data = jsonData;

  axios.post(DATA_SERVER_ADDRESS + "pagecache/set", form_data);
}

export async function EventCreationAction(
  eventName,
  countryCode,
  address,
  promoId,
  startDate,
  endDate,
  definitions
) {
  let form_data = new Object();

  if (!!eventName) form_data.name = eventName;
  if (!!promoId) form_data.promotion = promoId;

  if (!!startDate) form_data.startdate = startDate;
  if (!!endDate) form_data.enddate = endDate;
  if (!!countryCode) form_data.country = countryCode;
  if (!!address) form_data.address = address;

  if (!!definitions) form_data.definitions = { data: definitions };

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "events/create",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function AddBoutRoundDecisionVoteAction(
  boutId,
  winnerId,
  roundIndex
) {
  const form_data = new FormData();
  form_data.append("bout_id", boutId);
  form_data.append("winner_id", winnerId);
  form_data.append("round_index", roundIndex);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "bout/decision/voteround",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data.done;
}

//action = "add" | "remove"
export async function AddPopularityTrackingEntry(url) {
  let form_data2 = new FormData();
  form_data2.append("url", url);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/tracking/popularity",
    data: form_data2
  });
}

//action = "add" | "remove"
export async function CreateDestroyTechniquePlaylistAction(
  playlistName,
  create = true,
  playlistDescription = null,
  isPublic = null,
  entityType = null,
  playlistId = null
) {
  let form_data2 = new FormData();

  let actionName = "add";
  if (create == false) {
    actionName = "remove";
  }

  console.log("Requesting new playlist");
  console.log(playlistName);
  if (playlistId) {
    form_data2.append("playlist_id", playlistId);
  }

  form_data2.append("name", playlistName);
  form_data2.append("action", actionName);
  form_data2.append("is_public", isPublic);
  form_data2.append("entity_type", entityType);
  form_data2.append("description", playlistDescription);
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/account/playlists/create-delete",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function UpdatePlaylistEntryAction(
  playlistName,
  techniqueId,
  add = true,
  entityType
) {
  let form_data2 = new FormData();

  let status = "add";
  if (add == false) {
    status = "remove";
  }

  form_data2.append("playlist_name", playlistName);
  form_data2.append("technique_id", techniqueId);
  form_data2.append("entity_type", entityType);
  form_data2.append("status", status);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + `/account/playlists/update`,
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function DeleteFeedPostAction(postId) {
  let form_data2 = new FormData();
  form_data2.append("post_id", postId);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/feed/delete-post",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function GetAccountFollowingIdsByTypeAction(followType) {
  let form_data2 = new FormData();
  form_data2.append("follow_type", followType);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/following-id-by-type",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  return activitiyData.data;
}

export async function AddFeedbackAction(data) {
  var form_data = new FormData();

  for (var key in data) {
    form_data.append(key, data[key]);
  }

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/feedback/add",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function AddUserFeedPostAction(
  content,
  spoilers,
  parentId = null
) {
  let form_data2 = new FormData();
  form_data2.append("spoilers", spoilers);
  form_data2.append("content", content);
  if (parentId) form_data2.append("parent_id", parentId);
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/feed/create-post",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function IsUsernameAvailableAction(username) {
  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "/account/usernamecheck/" + username,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function IsEmailValidAction(email) {
  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "/account/emailcheck/" + email,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function IsPasswordValidAction(password) {
  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "/account/passwordcheck/" + password,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function CreateAccountAction(
  username,
  password,
  email,
  actvities,
  referral
) {
  let form_data = new Object();
  form_data.username = username;
  form_data.password = password;
  form_data.email = email;
  form_data.referral = referral;
  form_data.activities = { data: actvities };

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/account/create",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function FeedPostLikeAction(postId, isLiking) {
  let form_data2 = new FormData();
  form_data2.append("post_id", postId);
  form_data2.append("like_action", isLiking);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/feed/like-post",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function GetUserFeedLikesAction() {
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/user/feed/likes",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function GetPromotionDivisionsAction(promoId) {
  const activitiyData = await axios({
    method: "GET",
    url:
      DATA_SERVER_ADDRESS + "/promotions/" + promoId + "/all-divisions-small/"
  });
  return activitiyData.data;
}

export async function GetControDecisionsAction(
  limit,
  minVotes,
  gender,
  year,
  activityId,
  division,
  promotion
) {
  let form_data = new Object();
  form_data.limit = limit;
  form_data.minimum_votes = minVotes;
  form_data.gender = gender;
  form_data.year = year;
  form_data.activity = activityId;
  form_data.division = division;
  form_data.promoter = promotion;

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/decisions-controversial",
    data: form_data
  });
  return activitiyData.data;
}

export async function GetHighestBoutsAction(
  limit,
  gender,
  year,
  activityId,
  division,
  promotion
) {
  let form_data = new Object();
  form_data.limit = limit;
  form_data.gender = gender;
  form_data.year = year;
  form_data.activity = activityId;
  form_data.division = division;
  form_data.promoter = promotion;

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/rating/highest",
    data: form_data
  });
  return activitiyData.data;
}

export async function GetUserFeedAction() {
  let method = null;
  let token = localStorage.getItem("token");
  if (token) {
    method = "POST";
  } else {
    method = "GET";
  }

  let data = {
    method: method,
    url: DATA_SERVER_ADDRESS + "/user/feed/100"
  };

  if (token) {
    data["headers"] = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
  }

  const activitiyData = await axios(data);

  return activitiyData;
}

export async function GetPlaylistAction() {
  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "/account/playlists",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function ReportEntityAction(entityId, entityType, reportText) {
  const form_data = new FormData();
  form_data.append("entity_id", entityId);
  form_data.append("entity_type", entityType);
  form_data.append("report_text", reportText);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "entity/report",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  console.log(activitiyData);
  return activitiyData.data.done;
}

export async function UserDeleteEntityRatingAction(ratingId) {
  const form_data = new FormData();
  form_data.append("rating_id", ratingId);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "entity/rating/delete",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  console.log(activitiyData);
  return activitiyData.data.done;
}

export async function UserVoteForEntityAction(
  entityId,
  entityType,
  rating,
  reviewText = null,
  op = "a"
) {
  const form_data = new FormData();
  form_data.append("entity_id", entityId);
  form_data.append("entity_type", entityType);
  form_data.append("rating", rating);

  form_data.append("op", op);
  if (reviewText && reviewText.length > 0)
    form_data.append("review_text", reviewText);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "entity/rating",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  console.log(activitiyData);
  return activitiyData.data.done;
}

export async function GetUserFightRatingVoteSummary() {
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/history/bout/ratings/summary",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  return activitiyData.data;
}

export async function GetUserFightDecisionVoteSummary() {
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/history/bout/decision/summary",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  return activitiyData.data;
}

export async function GetUserVoteListForEntityAction(sortMode, ascending) {
  const form_data = new FormData();
  form_data.append("sort_mode", sortMode);
  form_data.append("ascending", ascending);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/history/bout/ratings",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  return activitiyData.data;
}

export async function GetUserVoteForEntityAction(entityId, entityType) {
  const form_data = new FormData();
  form_data.append("entity_id", entityId);
  form_data.append("entity_type", entityType);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/votes/entity",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  return activitiyData.data;
}

export async function GetCurrentUserBoutVotesForEventAction(eventId) {
  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "account/votes/event/" + eventId,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  console.log("userVotes result");
  console.log(activitiyData);
  return activitiyData.data;
}

export async function GetCurrentUserBoutVotesFighterPage(fighterId) {
  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "account/votes/person/" + fighterId,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  console.log("active userVotes result for fighter page");
  console.log(activitiyData);
  return activitiyData.data;
}

export async function searchBarBoutAction(
  tagList,
  startDate,
  endDate,
  promoId,
  divisionId,
  gender,
  activityId,
  ascending = true,
  countryCode = null
) {
  console.log("Requesting tag search");

  let form_data = new Object();
  form_data.start_date = startDate;
  form_data.end_date = endDate;
  form_data.promotion_id = promoId;
  form_data.activity_id = activityId;
  form_data.country_code = countryCode;
  form_data.ascending = ascending;

  let tempGender = gender;
  if (gender == "all") tempGender = null;
  form_data.gender = tempGender;
  form_data.tags = { data: tagList };
  if (divisionId != "all") {
    form_data.division_id = divisionId;
  }

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "bout/search",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function GetReviewCurrentUserVoteAction(commentId) {
  console.log("Requesting tag search");
  const form_data = new FormData();
  form_data.append("comment_id", commentId);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "review/getvote",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function AddReviewUpvoteAction(commentId, value) {
  console.log("Requesting tag search");
  const form_data = new FormData();
  form_data.append("comment_id", commentId);
  form_data.append("vote_value", value);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "review/vote",
    data: form_data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function accountGetFollowersAction() {
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/followers",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  return activitiyData.data;
}

export async function accountGetFollowingAction(type = null) {
  let extra = "";
  if (type) extra = "/" + type;

  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "account/following" + extra,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  return activitiyData;
}

export async function GetPlaylistIndividualAction(playlistId) {
  const activitiyData = await axios({
    method: "GET",

    url: DATA_SERVER_ADDRESS + "/account/playlists/" + playlistId,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData;
}

export async function LoginAction(username, password) {
  console.log("Login Request");
  const form_data = new FormData();
  form_data.append("username", username);
  form_data.append("password", password);

  form_data.append("screen_width", window.screen.width);
  form_data.append("screen_height", window.screen.height);
  form_data.append("mobile", 0);
  var region1 = new Intl.DateTimeFormat();
  var options1 = region1.resolvedOptions();

  form_data.append("locale", options1.locale);
  form_data.append("timezone", options1.timeZone);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "account/login",
    data: form_data
  });

  console.log(activitiyData);
  return activitiyData.data;
}

export async function GetUserCommentsAction() {
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/user/comments/all",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  console.log(activitiyData);
  return activitiyData.data;
}

export async function GetBoutVotingHistoryAction(sortMode) {
  const form_data = new FormData();
  form_data.append("sort_mode", sortMode);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/account/history/bout/decision",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    data: form_data
  });
  console.log(activitiyData);
  return activitiyData.data;
}

export async function GetUserRatingHistoryAction() {
  const activitiyData = await axios({
    method: "GET",
    url: DATA_SERVER_ADDRESS + "/account/bouts/rated",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  console.log(activitiyData);
  return activitiyData.data;
}

export async function GetEarnedPointsSummaryAction() {
  let form_data2 = new FormData();
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/progress/badges/earned-summary/",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function GetEarnedBadgesAction() {
  let form_data2 = new FormData();
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/progress/badges/earned",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function GetCompletedVideosAction() {
  let form_data2 = new FormData();
  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/course/video-progress/get-completed",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function GetVideoProgressTicksAction(videoId) {
  let form_data2 = new FormData();

  form_data2.append("video_id", videoId);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/course/video-progress/get-ticks",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function VideoProgressTickAction(
  videoId,
  progressId,
  videoDurationSeconds
) {
  let form_data2 = new FormData();

  form_data2.append("video_id", videoId);
  form_data2.append("progress_index", progressId);
  form_data2.append("duration", videoDurationSeconds);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/course/video-progress/tick",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function RenamePlaylistAction(
  playlistName,
  playlistDescription,
  playlistId
) {
  let form_data2 = new FormData();

  form_data2.append("playlist_name", playlistName);
  form_data2.append("playlist_description", playlistDescription);
  form_data2.append("playlist_id", playlistId);

  const activitiyData = await axios({
    method: "POST",
    url: DATA_SERVER_ADDRESS + "/account/playlists/rename",
    data: form_data2,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return activitiyData.data;
}

export async function RequestNewLibraryEntryAction(
  name,
  description,
  url,
  entityType
) {
  const form_data = new FormData();
  form_data.append("name", name);
  form_data.append("description", description);
  form_data.append("url", url);
  form_data.append("entity_type", entityType);

  let activitiyData = await axios.post(
    DATA_SERVER_ADDRESS + "/library/request-new",
    form_data
  );

  return activitiyData.data;
}

export async function UpdateActivityInterestAction(
  activityId,
  accountId,
  student,
  teacher,
  watcher
) {
  const form_data = new FormData();
  form_data.append("activity_id", activityId);
  form_data.append("account_id", accountId);
  form_data.append("student", student);
  form_data.append("teacher", teacher);
  form_data.append("student_level", "poopy");
  form_data.append("watcher", watcher);

  let url = DATA_SERVER_ADDRESS + "/account/activity/add";
  let activitiyData = await axios.post(url, form_data);

  return activitiyData.data;
}

export function ConverDateToDaysAgoString(input) {
  if (input) {
    let dateToConvert = new Date(Date.parse(input));
    const now = new Date();
    const timeDeltaTemp = now - dateToConvert; // time delta in milliseconds
    const timeDelta = Math.abs(now - dateToConvert); // time delta in milliseconds

    let isFuture = timeDeltaTemp < 0;

    const seconds = Math.round(timeDelta / 1000);
    const minutes = Math.round(timeDelta / (1000 * 60));
    const hours = Math.round(timeDelta / (1000 * 60 * 60));
    const days = Math.round(timeDelta / (1000 * 60 * 60 * 24));
    const months = Math.round(timeDelta / (1000 * 60 * 60 * 24 * 30));
    const years = Math.round(timeDelta / (1000 * 60 * 60 * 24 * 365));

    if (isFuture && days < 1) {
      return "Today";
    }

    if (seconds < 60) {
      return "just now";
    }

    let outputValue = 0;
    let outputUnit = "";

    if (minutes < 60) {
      outputValue = minutes;
      outputUnit = "minutes";
    } else if (hours < 24) {
      outputValue = hours;
      outputUnit = "hours";
    } else if (days < 30) {
      outputValue = days;
      outputUnit = "days";
    } else if (months < 12) {
      outputValue = months;
      outputUnit = "months";
    } else {
      outputValue = years;
      outputUnit = "years";
    }

    if (outputValue == 1)
      outputUnit = outputUnit.slice(0, outputUnit.length - 1);

    return (
      (isFuture ? "in " : "") +
      `${outputValue} ${outputUnit} ` +
      (isFuture ? "" : "ago")
    );
  }
  return null;
}

export function ConvertDateObjToSimple(input) {
  if (input) {
    let d = new Date(Date.parse(input));
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  return null;
}

export function ExtractSurname(input) {
  if (input && input.includes(" ")) {
    let elements = input.split(" ");
    return elements[elements.length - 1];
  } else {
    return input;
  }
}

export function FormatTimeSince(input) {
  let timeInMileSec = Date.parse(input);
  let sec = (timeInMileSec / 1000).toFixed(0);
  let min = (timeInMileSec / (1000 * 60)).toFixed(0);
  let hrs = (timeInMileSec / (1000 * 60 * 60)).toFixed(0);
  let days = (timeInMileSec / (1000 * 60 * 60 * 24)).toFixed(0);
  let weeks = (timeInMileSec / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
  let months = (timeInMileSec / (1000 * 60 * 60 * 24 * 31)).toFixed(0);
  let years = (timeInMileSec / (1000 * 60 * 60 * 24 * 12)).toFixed(0);

  if (sec < 60) {
    return "seconds";
  } else if (min < 60) {
    return min + " mins";
  } else if (hrs < 24) {
    return hrs + " hrs";
  } else if (days < 7) {
    return days + " days";
  } else if (weeks < 4) {
    return weeks + " weeks";
  } else if (months < 12) {
    return months + " months";
  } else {
    return years + " year";
  }
}
