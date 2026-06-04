"use client";

import { FaCircleDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

type PaginationDotProps = {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
};

const PaginationDot = ({ page, isActive, onClick }: PaginationDotProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? "page" : undefined}
      className="cursor-pointer transition-transform duration-200 hover:scale-110"
    >
      {isActive ? (
        <FaCircleDot className="text-2xl md:text-base scale-125 text-dot-active transition-all duration-200" />
      ) : (
        <GoDotFill className="text-xl md:text-xl text-dot-inactive opacity-70 transition-all duration-200 hover:opacity-100" />
      )}
    </button>
  );
};

export default PaginationDot;
