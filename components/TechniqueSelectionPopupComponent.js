import { DialogContent, Slide } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";
import HeadingComponent from "./utility/HeadingComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function TechniqueSelectionPopupComponent({
  openData,
  onClose,
  positionData = null
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openData);
  }, [openData]);

  const router = useRouter();

  if (open == false) {
    return <></>;
  }

  if (positionData == null) {
    return <></>;
  }

  function redirect() {
    router.push("/position/" + positionData.id);
  }

  if (positionData.balanced == true) {
    redirect();
    return <></>;
  }

  let poseAStats = [];
  let poseBStats = [];
  if (positionData.poseNameA in positionData.summaryrole) {
    for (const [label, val] of Object.entries(
      positionData.summaryrole[positionData.poseNameA]
    )) {
      poseAStats.push(
        // <RecordBreakdownComponent label={label} maxValue={20} value={val} />

        <p>
          {label}s : {val}
        </p>
      );
    }
  }

  if (positionData.poseNameB in positionData.summaryrole) {
    for (const [label, val] of Object.entries(
      positionData.summaryrole[positionData.poseNameB]
    )) {
      poseBStats.push(
        <p>
          {label}s : {val}
        </p>
      );
    }
  }

  function SelectionElement(poseName, poseImage, poseStats) {
    return (
      <div className="grid w-5/12  place-items-center p-10">
        <Link href={"/position/" + positionData.id + "?role=" + poseName}>
          <a>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
                rotate: 0.5
              }}
            >
              <Avatar
                variant="rounded"
                sx={{ width: 300, height: 300 }}
                src={DATA_SERVER_IMAGE_ADDRESS + poseImage}
              />

              <HeadingComponent
                size={4}
                textColor={" text-center text-white bg-blue-500  w-full"}
              >
                {poseName.toUpperCase()}
              </HeadingComponent>
            </motion.div>
          </a>
        </Link>
        {/* {poseStats} */}
      </div>
    );
  }

  return (
    <Dialog
      onClose={() => {
        setOpen(false);
        onClose();
      }}
      open={open}
      // className="w-full"
      //fullWidth={true} // sets the dialog to take up the full width of the screen
      maxWidth="lg" // sets the maximum width of the dialog to "small"
      fullScreen={false} // enables full screen mode when the prop is true
      PaperProps={{ style: { minHeight: "70vh", minWidth: "60vw" } }}
    >
      <DialogContent
        className="text-center justify-center w-full border-8 border-blue-600"
        style={{ alignItems: "center" }}
      >
        <HeadingComponent textColor={"w-full text-center item-center"} size={3}>
          {positionData.name.toUpperCase()}
        </HeadingComponent>
        <HeadingComponent textColor={"w-full text-center item-center"} size={4}>
          Select a Position
        </HeadingComponent>

        <div className="w-full ">
          <div className="flex w-full justify-center ">
            {SelectionElement(
              positionData.poseNameA,
              positionData.imagePoseA,
              poseAStats
            )}
            <div className="divider lg:divider-horizontal">OR</div>
            {SelectionElement(
              positionData.poseNameB,
              positionData.imagePoseB,
              poseBStats
            )}
          </div>
          <div className="w-12/12">
            {/* <DoubleBreakdownComponent
              leftValue={5}
              rightValue={2}
              maxValue={10}
            /> */}
            {/* <DoubleBreakdownComponent
              leftValue={5}
              rightValue={2}
              maxValue={10}
            />
            <DoubleBreakdownComponent
              leftValue={5}
              rightValue={2}
              maxValue={10}
            />

            <DoubleBreakdownComponent
              leftValue={5}
              rightValue={2}
              maxValue={10}
            /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
