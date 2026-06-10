import React from "react";
import clsx from "clsx";
import { FaRegCopyright } from "react-icons/fa";
import LinkWrapper from "./LinkWrapper";

const CopyrightFooter = () => {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-between pt-8 pb-3 w-full",
        "before:content-[''] before:absolute before:top-1 before:w-[90%] md:before:w-full before:h-2.5 before:bg-border-footer before:-translate-y-1/2",
      )}
    >
      <div className="">
        <p className="flex items-center gap-2 font-logo font-normal text-base text-tertiary">
          <FaRegCopyright />
          2024 pizza hut{" "}
          <span className="font-semibold font-heading text-primary">
            | All shawonetc3 Themes
          </span>
        </p>
      </div>
      <div className="w-full max-w-78">
        <LinkWrapper />
      </div>
    </div>
  );
};

export default CopyrightFooter;
