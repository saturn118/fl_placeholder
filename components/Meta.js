//Meta defines the default html header attributes
//Any page can include this component will override the optional default paramters

import Head from "next/head";
import {
  COMPANY_NAME,
  WEBSITE_NAME,
  TWITTER_URL,
  TWITTER_USERNAME,
  WEBSITE_NAME_CANNONICAL,
  DATA_SERVER_IMAGE_ADDRESS
} from "../config/index";
import { useRouter } from "next/router";

const Meta = ({ title, keywords, description, imageUrl }) => {
  const router = useRouter();

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link
        rel="shortcut icon"
        href={DATA_SERVER_IMAGE_ADDRESS + "favicon.ico"}
      />
      <meta property="og:title" content={COMPANY_NAME + "-" + title} />
      <meta
        property="og:url"
        content={WEBSITE_NAME_CANNONICAL + router.pathname}
      />
      <meta property="og:site_name" content={COMPANY_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:site"
        content={WEBSITE_NAME_CANNONICAL + router.pathname}
      />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <meta name="twitter:creator" content={TWITTER_USERNAME} />

      <title>
        {COMPANY_NAME} - {title}
      </title>
    </Head>
  );
};

//These will be used in the event that the component isn't called
//or fallback values for missing parameters
Meta.defaultProps = {
  title: "The All In One Martial Art Community",
  keywords:
    "boxing mma bjj martial art  muay thai fight legacy records reviews predictions",
  description:
    "The All in one martial art community. Fight Ratings, Reviews, events, fight promoters and techniques",
  imageUrl: DATA_SERVER_IMAGE_ADDRESS + "share_banner.jpg"
};

export default Meta;
