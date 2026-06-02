import React from "react";

const Pagination = ({
  currentPage,
  totalPage,
  setCurrentPage,
  setDirection,
  rightIcon,
  leftIcon,
  buttonClass = "",
  containerClass = "",
}: PaginationProps) => {
  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setDirection?.(-1);
    }
  };

  const next = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      setDirection?.(1);
    }
  };

  return (
    <div
      className={`flex items-center justify-center gap-6 mt-8 ${containerClass}`}
    >
      <button
        className={` ${buttonClass}`}
        onClick={prev}
        disabled={currentPage === 1}
      >
        {leftIcon || "Prev"}
      </button>
      <button
        className={` ${buttonClass}`}
        onClick={next}
        disabled={currentPage === totalPage}
      >
        {rightIcon || "Next"}
      </button>
    </div>
  );
};

export default Pagination;

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  setCurrentPage: (page: number) => void;
  setDirection?: (direction: number) => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  buttonClass?: string;
  containerClass?: string;
};
