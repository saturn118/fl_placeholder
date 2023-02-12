//Meta defines the default html header attributes
//Any page can include this component will override the optional default paramters

import Head from "next/head";
import { COMPANY_NAME, WEBSITE_NAME } from "../config/index";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />

      <title>
        {title} | {COMPANY_NAME}
      </title>
    </Head>
  );
};

//These will be used in the event that the component isn't called
//or fallback values for missing parameters
Meta.defaultProps = {
  title: COMPANY_NAME + " - The All In One Martial Art Community",
  keywords:
    "boxing mma bjj martial art  muay thai fight legacy records reviews predictions",
  description:
    "The All in one martial art community. Fight Ratings, Reviews, events, fight promoters and techniques"
};

export default Meta;
