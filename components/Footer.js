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
      <footer className="container flex justify-center w-full">
        <div className="text-center space-y-1">
          {GetLogoElement()}
          {/* <SocialMediaLinksComponent /> */}
          <div className="customAccentText">
            <Link href="/faq">
              <a className="link">Frequently Asked Questions</a>
            </Link>
          </div>{" "}
          <div className="customAccentText">
            <Link href="/terms">
              <a className="link">Terms and conditions</a>
            </Link>
          </div>
          <LanguageSelectorComponent />
        </div>
      </footer>
      {/* <div>
          {GetLogoElement()}

   
          <li>
          
          </li>
        </div>
        <div>
          <span className="footer-title">Social</span>
        
        </div> */}
    </div>
  );
};

export default Footer;
