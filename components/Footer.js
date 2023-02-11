import Link from "next/link";
import {
  FACEBOOK_URL,
  GetLogoElement,
  INSTAGRAM_URL,
  REDDIT_URL,
  TIKTOK_URL,
  TWITTER_URL,
  YOUTUBE_URL,
  DATA_SERVER_IMAGE_ADDRESS
} from "../config";
import LanguageSelectorComponent from "./LanguageSelectorComponent";
import SocialMediaLinksComponent from "./utility/SocialMediaLinksComponent";

INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL, TWITTER_URL, YOUTUBE_URL, REDDIT_URL;

const Footer = () => {
  return (
    <div className="bg-gray-900 pb-10">
      <div className="container">
        <div className=" flex justify-center pt-10 pb-10 ">
          <div className="border-solid border-t-2 border-blue-600 w-5/12 ..."></div>
        </div>
      </div>
      <footer className="container footer pl-10 pr-10 pt-5 text-neutral-content">
        <div>
          {GetLogoElement()}
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
          <Link href="/terms">
            <a className="link">Terms and conditions</a>
          </Link>
          <Link href="/faq">
            <a className="link">Frequently Asked Questions</a>
          </Link>
          <li>
            <LanguageSelectorComponent />
          </li>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <SocialMediaLinksComponent />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
