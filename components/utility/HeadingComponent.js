import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import React, { useState } from "react";
export default function HeadingComponent({
  size = 1,
  showBar = false,
  showArrow = false,
  arrowCount = 0,
  textColor = "text-black",
  children
}) {
  const [hovering, setHovering] = useState(false);
  const styled = { color: "#1976D2", fontweight: "bold" };
  let bar = null;
  if (showBar) bar = <span style={styled}>| </span>;

  let viewAllElement = (
    <span className="font-bold" style={styled}>
      View All
    </span>
  );

  if (showArrow == false) viewAllElement = null;

  let sizeId = " logoFont ";
  if (size == 1) sizeId = "text-5xl";
  else if (size == 2) sizeId = "text-4xl";
  else if (size == 3) sizeId = "text-3xl";
  else if (size == 4) sizeId = "text-2xl";
  else if (size == 5) sizeId = "text-xl";
  else if (size == 6) sizeId = "text-base";

  sizeId += " logoFont ";
  let arrowElement = null;
  if (showArrow)
    arrowElement = (
      <span>
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
      <h1
        className={
          "font-medium leading-tight mt-0 mb-2 " + textColor + " " + sizeId
        }
      >
        {bar} {children}
      </h1>
      {viewAllElement} {arrowElement}
    </span>
  );
}
