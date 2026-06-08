import React from "react";
import type { FEEDBACK_QUERY_RESULT } from "@/sanity/types";
import FeedbacksPaginations from "./FeedbacksPaginations";
import FeedbackCart from "./FeedbackCart";

type FeedbacksContentProps = {
  data: FEEDBACK_QUERY_RESULT;
  currentPage: number;
  totalPage: number;
};

const FeedbacksContent = ({
  data,
  currentPage,
  totalPage,
}: FeedbacksContentProps) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <div className="mb-9">
        <h4 className="font-heading font-semibold text-3xl text-tertiary uppercase mb-4">
          {data?.feedbacksSubtitle}
        </h4>
        <h2 className="font-heading font-semibold text-6xl text-primary">
          {data?.feedbacksTitle}
        </h2>
      </div>
      <FeedbackCart data={data} />
      <div className="">
        <FeedbacksPaginations currentPage={currentPage} totalPage={totalPage} />
      </div>
    </div>
  );
};

export default FeedbacksContent;
