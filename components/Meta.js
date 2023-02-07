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
  title: WEBSITE_NAME + " - The Home of Martial Arts Data",
  keywords: "bjj fight legacy mma boxing fight legacy record martial art",
  description:
    "Fight record keeping, teaching materials, events and fighter profiles."
};

export default Meta;
