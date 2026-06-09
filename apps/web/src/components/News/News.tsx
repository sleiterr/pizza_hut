import React from "react";
import type { RECENT_NEWS_QUERY_RESULT } from "@/sanity/types";
import SectionPage from "../Section/SectionPage";
import NewsList from "./NewsList";

const News = ({ data }: NewsProps) => {
  return (
    <SectionPage>
      <div className="mb-10">
        <h2 className="font-heading font-semibold text-6xl text-primary text-center">
          {data?.recentNewsTitle}
        </h2>
        <span className="block w-67.5 border-t-10 rounded-[30px] border-border-card mx-auto mt-4" />
      </div>
      <div className="w-full">
        <NewsList data={data} />
      </div>
    </SectionPage>
  );
};

export default News;

type NewsProps = {
  data: RECENT_NEWS_QUERY_RESULT;
};
