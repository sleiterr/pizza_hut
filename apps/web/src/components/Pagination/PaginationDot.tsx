"use client";

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
      className="transition-transform duration-200 hover:scale-110"
    >
      <GoDotFill
        className={`text-2xl md:text-3xl transition-all duration-200 ${
          isActive
            ? "scale-125 text-arrow-active drop-shadow-[0_0_10px_rgba(243,39,76,0.55)]"
            : "text-arrow-dot opacity-70 hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default PaginationDot;
