import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

const PromotionSubPageHeaderComponent = ({ promoData = null }) => {
  const router = useRouter();

  let promoId = promoData.id;
  if (!(typeof promoId === "number")) {
    promoId = promoId;
  }

  return (
    <div>
      <Link href={"/promotion/" + promoId}>
        <a>
          <div className="flex">
            <a>
              <img
                className="blackWhite"
                width={60}
                src={DATA_SERVER_IMAGE_ADDRESS + promoData.imageUrl}
              ></img>
            </a>
            <div className="pl-4">
              <a>
                <HeadingComponent showArrow={true} size={4}>
                  {promoData.name}
                </HeadingComponent>
              </a>
              {/* <a>
                <HeadingComponent size={1}>PAGE_TITLE</HeadingComponent>
              </a> */}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PromotionSubPageHeaderComponent;
