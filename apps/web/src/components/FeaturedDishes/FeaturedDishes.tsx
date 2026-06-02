import React from "react";
import FeaturedCard from "./FeaturedCard";
import Booking from "../Booking/Booking";
import SectionPage from "../Section/SectionPage";
import FeaturedDishesPagination from "./FeaturedDishesPagination";
import type { FEATURED_DISHES_QUERY_RESULT } from "@/sanity/types";

type FeaturedDishesProps = {
  items: FEATURED_DISHES_QUERY_RESULT;
  currentPage: number;
  totalPage: number;
};

const FeaturedDishes = ({
  items,
  currentPage,
  totalPage,
}: FeaturedDishesProps) => {
  return (
    <SectionPage
      classSection="relative bg-primary-section"
      className="py-0! pb-24!"
    >
      <div className="absolute inset-x-0 top-0 z-20 -translate-y-1/2">
        <Booking />
      </div>
      <div className="pt-44 md:pt-72">
        <h2 className="font-semibold font-heading text-6xl text-black text-center">
          Featured Dishes
        </h2>
        <span className="block w-67.5 border-t-10 rounded-[30px] border-border-card mx-auto mt-4" />
      </div>

      <FeaturedCard items={items} />
      <div className="">
        <FeaturedDishesPagination
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </SectionPage>
  );
};

export default FeaturedDishes;
