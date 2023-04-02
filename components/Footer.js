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
    <div className="bg-white footerBackground">
      <div className="min-h-[210px]"></div>
      <div className=" pb-10 w-full text-white customAccentBackground pt-5">
        <footer className="  justify-center w-full">
          <div className="text-center centerdat space-y-1">
            {GetLogoElement(false, "text-white")}
            <div className="w-3/12">
              <SocialMediaLinksComponent colorAttribute="text-white" />
            </div>
            <div className="customAccentText">
              <Link href="/faq">
                <a className="text-white link">Frequently Asked Questions</a>
              </Link>
            </div>{" "}
            <div className="customAccentText">
              <Link href="/terms">
                <a className="text-white link">Terms and conditions</a>
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
    </div>
  );
};

export default Footer;
