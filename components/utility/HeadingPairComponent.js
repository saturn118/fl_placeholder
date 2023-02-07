import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import HeadingComponent from "./HeadingComponent";
export default function HeadingPairComponent({
  label1,
  label2,
  targetLink = null
}) {
  return (
    <div className="flex">
      <div className="border-solid border-l-4 border-blue-600 pl-3 pt-0 ...">
        <HeadingComponent size={2} textColor={"text-white  font-bold"}>
          {label1}
        </HeadingComponent>

        <motion.button
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
        >
          <Link href={targetLink}>
            <a>
              <HeadingComponent
                size={4}
                // showArrow={true}
                textColor={"customAccentText font-bold"}
              >
                {label2}
              </HeadingComponent>
            </a>
          </Link>
        </motion.button>
      </div>
    </div>
  );
}

export function HeadingPairCustomComponent({ label1, children }) {
  return (
    <div className="flex">
      <div className="border-solid border-l-4 border-blue-600 pl-5 pt-0 ...">
        <HeadingComponent size={2} textColor={"text-white  font-bold"}>
          {label1}
        </HeadingComponent>
        {children}
      </div>
    </div>
  );
}
