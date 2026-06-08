"use client";
import React from "react";
import PaginationDot from "../Pagination/PaginationDot";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FeedbacksPaginationsProps = {
  currentPage: number;
  totalPage: number;
};

const FeedbacksPaginations = ({
  currentPage,
  totalPage,
}: FeedbacksPaginationsProps) => {
  const pageParam = "feedbackPage";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCurrentPage = (page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete(pageParam);
    } else {
      params.set(pageParam, String(page));
    }

    // Cleanup legacy shared pagination param
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="mt-16 flex justify-start gap-5">
      {Array.from({ length: totalPage }).map((_, index) => {
        const page = index + 1;
        const isActive = currentPage === page;

        return (
          <PaginationDot
            key={page}
            page={page}
            isActive={isActive}
            onClick={setCurrentPage}
          />
        );
      })}
    </div>
  );
};

export default FeedbacksPaginations;
