import Link from "next/link";

//Dynamically find out whether we're working in development mode or it's deployed
//useful for code that requires absolute addresses
export const dev = process.env.NODE_ENV !== "production";
export const LOCAL_SERVER_ADDRESS = dev
  ? "http://localhost:3000"
  : "https//fightlegacy.com";

export const BACKGROUND_ATTR =
  " bg-gray-50 rounded  border-solid border-2 border-gray-300 drop-shadow-md hover:drop-shadow-xl ";

export const DATA_SERVER_ADDRESS = "http://127.0.0.1:5000/";
export const DATA_SERVER_IMAGE_ADDRESS = DATA_SERVER_ADDRESS + "media/";
export const TECHNIQUE_LIBRARY_NAME = "Fight Library";
export const TECHNIQUE_LIBRARY_URL_PREFIX = "learn/";
export const COMPANY_NAME = "Fight Legacy";
export const WEBSITE_NAME = COMPANY_NAME + ".com";
export const VIDEO_PROGRESS_INTERVAL = 5;
export const NOTIFICATION_FREQUENCY = 30000;
export const ADVERT_URL =
  "https://66.media.tumblr.com/92777f119396c450403b18fa9428f8f6/tumblr_phs1ppdlzc1tblauy_1280.jpg";

export const LOGIN_DIRECTORY = "/account/login";

//Temp, a global dictionary to store strings, will eventually need for localization
export const STRINGS = {
  CONTROVERSIAL_TITLE: "test 1"
};

export function LoginRedirectCheck(router) {
  if (!IsLoggedIn()) {
    //Cache the current url
    CacheCurrentUrl(router);

    router.push(LOGIN_DIRECTORY);
    return true;
  } else {
    return false;
  }
}

export function SetGlobalHideSpoilers(state) {
  if (state == true) {
    localStorage.setItem("hide_spoilers", "1");
  } else {
    localStorage.setItem("hide_spoilers", "0");
  }
}

export function GetGlobalHideSpoilers() {
  let value = localStorage.getItem("hide_spoilers");
  return value == "1";
}

export function GetLinkedFighterId() {
  return localStorage.getItem("linked_fighter_id");
}

export function GetRecentlyViewed() {
  return JSON.parse(localStorage.recent ? localStorage.recent : "{}");
}

export function CacheCurrentUrl(router) {
  const currentUrl = router.asPath;
  localStorage.setItem("last_url", currentUrl);
}

export function RestoreCachedUrl() {
  return localStorage.getItem("last_url");
}

export function GetLogoElement() {
  return (
    <a>
      <Link href="/">
        <a>
          <div className="pt-1 ">
            <span className="font-bold text-3xl customAccentText logoFont ">
              FIGHT{" "}
            </span>
            <span className="font-bold text-3xl text-white 	logoFont">
              LEGACY{" "}
            </span>
          </div>
        </a>
      </Link>
    </a>
  );
}

export function IsLoggedInByUser(username) {
  return IsLoggedIn() && GetUsername() == username;
}

export function GetNotificationCount() {
  return localStorage.getItem("notifications");
}

export function GetLoggedInAccountId() {
  return localStorage.getItem("account_id");
}

export function FinishedLibraryOnboarding() {
  localStorage.setItem("libary_onboarded", true);
}

const REFERRAL_STORAGE_ID = "referral";
export function PushReferralId(id) {
  localStorage.setItem(REFERRAL_STORAGE_ID, id);
}

export function GetReferral() {
  return localStorage.getItem(REFERRAL_STORAGE_ID);
}

export function IsReferralNew(id) {
  let token = localStorage.getItem(REFERRAL_STORAGE_ID);
  return token != id;
}

export function TriggerLibraryOnboarding() {
  let token = localStorage.getItem("libary_onboarded");
  let onboarded = !!token && token !== "" && token !== "null";

  if (!onboarded) {
    const event = new Event("onboarding_library");
    event.data = {};
    window.dispatchEvent(event);
  }
}

export function TriggerBadgeEarned(name, description, points, imageUrl) {
  const event = new Event("badge_earned");
  event.data = {
    name: name,
    description: description,
    points: points,
    imageUrl: imageUrl
  };
  window.dispatchEvent(event);
}

export function TriggerLoginPrompt(messageValue = null) {
  const event = new Event("login_prompt");
  event.data = { message: messageValue };
  window.dispatchEvent(event);
}

export function IsLoggedInLoginPrompt(messageValue = null) {
  let loggedIn = IsLoggedIn();

  if (!loggedIn) {
    TriggerLoginPrompt(messageValue);
  }

  return loggedIn;
}

export function IsLoggedIn() {
  let token = localStorage.getItem("token");
  return !!token && token !== "" && token !== "null";
}

export function GetUsername() {
  return localStorage.getItem("account_username");
}

export function GetCurrentYear() {
  return "" + new Date().getFullYear();
}

//Social Media Links
export const INSTAGRAM_URL = "http://www.instagram.com/opponent.app";
export const FACEBOOK_URL = "http://www.facebook.com/FightLegacy";
export const TIKTOK_URL = "http://www.tiktok.com/opponentapp";
export const TWITTER_URL = "http://www.twitter.com/opponentapp";
export const YOUTUBE_URL = "http://www.youtube.com/@FightLegacy";
export const REDDIT_URL = "http://www.reddit.com/r/FightLegacy";
