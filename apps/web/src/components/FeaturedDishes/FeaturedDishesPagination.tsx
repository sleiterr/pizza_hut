"use client";

import PaginationDot from "../Pagination/PaginationDot";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FeaturedDishesPaginationProps = {
  currentPage: number;
  totalPage: number;
};

const FeaturedDishesPagination = ({
  currentPage,
  totalPage,
}: FeaturedDishesPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCurrentPage = (page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="mt-12 flex justify-center gap-2">
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

export default FeaturedDishesPagination;
