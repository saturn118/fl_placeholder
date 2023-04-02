import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import React, { useState } from "react";
export default function HeadingComponent({
  size = 1,
  showBar = false,
  useFont = true,
  showArrow = false,
  showArrowText = true,
  arrowCount = 0,
  textColor = "text-black",
  children
}) {
  const [hovering, setHovering] = useState(false);
  const styled = { color: "#1976D2", fontweight: "bold" };
  let bar = null;
  if (showBar) bar = <span style={styled}>| </span>;

  let viewAllElement = (
    <span className="pl-5 link font-bold centerdat" style={styled}>
      View All
    </span>
  );

  if (showArrow == false || showArrowText == false) viewAllElement = null;

  let sizeId = " logoFont ";
  if (size == 1) sizeId = "text-2xl  lg:text-5xl md:text-4xl sm:text-3xl";
  else if (size == 2) sizeId = "text-xl  lg:text-4xl md:text-3xl sm:text-2xl";
  else if (size == 3) sizeId = "text-base  lg:text-3xl md:text-2xl sm:text-xl";
  else if (size == 4) sizeId = "lg:text-2xl md:text-xl sm:base";
  else if (size == 5) sizeId = "lg:text-xl text-base";
  else if (size == 6) sizeId = "lg:text-base";

  if (useFont) sizeId += " logoFont ";
  let arrowElement = null;
  if (showArrow)
    arrowElement = (
      <span className="centerdat">
        <motion.button
          whileHover={{
            scale: 1.6,
            translateX: 25,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowForwardIosIcon style={styled} className="ml-5" />
        </motion.button>
      </span>
    );

  return (
    <span
      className="flex"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <p
        className={
          "font-medium leading-tight mt-0 mb-2 " + textColor + " " + sizeId
        }
      >
        {bar} {children}
      </p>
      {viewAllElement} {arrowElement}
    </span>
  );
}
