import React from "react";
import SectionPage from "../Section/SectionPage";
import FeedbacksContent from "./FeedbacksContent";
import FeedbacImages from "./FeedbacImages";
import type { FEEDBACK_QUERY_RESULT } from "@/sanity/types";

type FeedbacksSectionProps = {
  data: FEEDBACK_QUERY_RESULT;
  currentPage: number;
  totalPage: number;
};

const FeedbacksSection = ({
  data,
  currentPage,
  totalPage,
}: FeedbacksSectionProps) => {
  return (
    <SectionPage>
      <div className="grid grid-cols-2 gap-14">
        <FeedbacksContent
          data={data}
          currentPage={currentPage}
          totalPage={totalPage}
        />
        <FeedbacImages />
      </div>
    </SectionPage>
  );
};

export default FeedbacksSection;
