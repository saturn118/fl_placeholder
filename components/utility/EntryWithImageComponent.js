import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { BACKGROUND_ATTR, DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import HeadingComponent from "./HeadingComponent";

export default function EntryWithItemComponent({
  targetLink = "/fdsfs",
  imageUrl,
  label1,
  label2,
  label3,
  round = false
}) {
  let variant = "rounded";
  if (round) {
    variant = "";
  }

  return (
    <div className={BACKGROUND_ATTR}>
      <Link href={targetLink}>
        <a>
          <motion.button
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.2 }
              // rotate: 5
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex">
              <Avatar
                className="customShadow"
                variant={variant}
                src={imageUrl}
                sx={{ width: 100, height: 100 }}
                // sx={{ width: 140, height: 120 }}
              />

              <div className="m-1 p-3" style={{ width: "150px" }}>
                {label1 && (
                  <li>
                    <HeadingComponent
                      size={6}
                      textColor={"text-black text-left"}
                    >
                      {label1}
                    </HeadingComponent>
                  </li>
                )}

                <p className="customAccentText text-left">{label2}</p>
                <p className="customAccentText text-left">{label3}</p>
              </div>
            </div>
          </motion.button>
        </a>
      </Link>
    </div>
  );
}

export function EntryWithCentralOverlayComponent({
  targetLink = "",
  width = 150,
  height = 150,
  imageUrl,
  label1,
  round = false
}) {
  let variant = "rounded";
  if (round) {
    variant = "";
  }

  function buttonContent() {
    return (
      <div>
        <a>
          <motion.button
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.2 }
              // rotate: 5
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="customShadow relative ">
              <Avatar
                className="hover:brightness-90 brightness-50 transition duration-500 ease-in-out"
                variant="rounded"
                sx={{ width: width, height: height }}
                src={imageUrl}
              />

              {label1 && (
                <div className=" pointer-events-none w-full technique-overlay-label-central inset-y-1/2 flex justify-center ">
                  <HeadingComponent
                    textColor="text-white  text-center"
                    size={6}
                  >
                    {label1.toUpperCase()}
                  </HeadingComponent>
                </div>
              )}
            </div>
          </motion.button>
        </a>
      </div>
    );
  }

  return (
    <div>
      <Link href={targetLink}>{buttonContent()}</Link>
    </div>
  );
}

export function EntryWithOverlayComponent({
  targetLink = "",
  width = 150,
  height = 150,
  imageUrl,
  label1,
  label2,
  label3,
  round = false
}) {
  let variant = "rounded";
  if (round) {
    variant = "";
  }

  function buttonContent() {
    return (
      <div>
        <a>
          {" "}
          <motion.button
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.2 }
              // rotate: 5
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative customShadow">
              <Avatar
                variant="rounded"
                sx={{ width: width, height: height }}
                // className=""
                src={imageUrl}
              />
              <div
                className="technique-overlay-label 
          customOverlayBackground customShadow rounded"
              >
                <p className="overflow-hidden"> {label2}</p>
              </div>
              {/* 
        <div
          className="technique-overlay-label2 
          customOverlayBackground customShadow"
        >
          <p> {label2}</p>
        </div> */}
              <div className="flex ">
                <div className="w-full trimBackground overflow-hidden">
                  {label1}
                </div>
              </div>
            </div>
          </motion.button>
        </a>
      </div>
    );
  }

  if (targetLink) {
    return (
      <div className="">
        <Link href={targetLink}>{buttonContent()}</Link>
      </div>
    );
  } else {
    return <div className="">{buttonContent()}</div>;
  }
}

export function EntryWithRankComponent({
  targetLink = "/fdsfs",
  imageUrl = "",
  label1 = "",
  label2 = "",
  label3 = "",
  round = false,
  rankIndex = ""
}) {
  let variant = "rounded";
  if (round) {
    variant = "";
  }

  return (
    <div className="m-3">
      <Link href={targetLink}>
        <a>
          <motion.button
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.2 }
              // rotate: 5
            }}
            whileTap={{ scale: 0.9 }}
            className={"flex w-10/12 " + BACKGROUND_ATTR}
          >
            <Avatar
              variant="rounded"
              sx={{ width: 100, height: 100 }}
              // className=""
              src={imageUrl}
            />
            <div className="pl-5 pt-4 text-left">
              <p className="text-xl font-bold">
                {label1 && label1.toUpperCase()}
              </p>
              <p>{label2}</p>
              <p className="text-2xl customAccentText font-bold">
                {" "}
                #{rankIndex} <ArrowDropUpIcon color={"error"} />{" "}
                <ArrowDropDownIcon color={"success"} />
              </p>
            </div>
            {/* {label2} views */}
          </motion.button>
        </a>
      </Link>
    </div>
  );
}

export function EntryWithTopFiveComponent({
  targetLink = "/fdsfs",
  title = "",
  orderedRecordData = [1, 1, 1, 1, 1]
}) {
  let mainElement = null;

  let i = 1;
  let subElements = orderedRecordData.map(entry => {
    i += 1;
    return (
      <div className={"flex"}>
        <div className="w-1/12">{i}</div>
        <div>SURNAME FORENAME</div>
      </div>
    );
  });

  return (
    <div>
      <p className="customAccentText">{title.toUpperCase()}</p>
      {mainElement}
      {subElements}

      <Link href={targetLink}>
        <a>
          <button className="btn"> View More</button>
        </a>
      </Link>
    </div>
  );
}
