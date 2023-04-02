import LoginPopupComponent from "@components/account/LoginPopupComponent";
import BadgeEarnedPopupComponent from "@components/BadgeEarnedPopupComponent";
import Footer from "@components/Footer";
import Header from "@components/Header";
import RecentlyViewedComponent from "@components/RecentlyViewedComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  DATA_SERVER_ADDRESS,
  IsReferralNew,
  PushReferralId,
  dev
} from "../config";
import "../styles/globals.css";
import ShareFeedbackButtonComponent from "@components/ShareFeedbackButtonComponent";
import LatestUpdatePopupComponent from "@components/LatestUpdatePopupComponent";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    if ("serviceworker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  useEffect(() => {
    let query = router.query;
    if (Object.keys(query).length > 0) {
      if ("r" in query) {
        let refId = query.r;

        if (IsReferralNew(refId)) {
          fetch(DATA_SERVER_ADDRESS + `/referral/add/` + refId);
          PushReferralId(query.r);
        }
      }
    }
  }, [router]);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop } = document.documentElement;
      setIsScrollingDown(scrollTop > 0 && scrollTop > lastScrollTop);
      lastScrollTop = scrollTop;
    }

    let lastScrollTop = 0;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("hide-toolbar");
    document.body.classList.add("fixed-nav");
  }, []);

  return (
    <div className="w-full">
      <Header />
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@1,900&display=swap"
        rel="stylesheet"
      ></link>
      <LoginPopupComponent />
      <BadgeEarnedPopupComponent />
      <LatestUpdatePopupComponent />

      <div className="w-full min-screen-height bg-white">
        <Component {...pageProps} />
      </div>

      <div className={"hide_on_small"}>
        <ShareFeedbackButtonComponent />
      </div>

      {dev && (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default MyApp;
