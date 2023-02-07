import LoginPopupComponent from "@components/account/LoginPopupComponent";
import BadgeEarnedPopupComponent from "@components/BadgeEarnedPopupComponent";
import Footer from "@components/Footer";
import Header from "@components/Header";
import RecentlyViewedComponent from "@components/RecentlyViewedComponent";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DATA_SERVER_ADDRESS, IsReferralNew, PushReferralId } from "../config";
import "../styles/globals.css";
import ShareFeedbackButtonComponent from "@components/ShareFeedbackButtonComponent";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

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

  return (
    <>
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
      <div className="pt-8"></div>
      <div className="min-body-container">
        <Component {...pageProps} />
      </div>
      {/* <ShareFeedbackButtonComponent /> */}
      {/* <TornBorderComponent /> */}
      {/* <RecentlyViewedComponent /> */}
      <Footer />
    </>
  );
}

export default MyApp;
