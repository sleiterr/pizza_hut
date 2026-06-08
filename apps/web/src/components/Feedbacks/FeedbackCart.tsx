import React from "react";
import clsx from "clsx";
import CardFeedbacks from "./CardFeedbacks";
import type { FEEDBACK_QUERY_RESULT } from "@/sanity/types";

type FeedbackCartProps = {
  data: FEEDBACK_QUERY_RESULT;
};

export default function FeedbackCart({ data }: FeedbackCartProps) {
  // feedbacks is an array of feedback items, each containing feedbackText and reviewAuthor
  const feedbacks = data?.feedbacks ?? [];

  return (
    <div>
      <ul>
        {feedbacks.map((item) => (
          <li key={item._key}>
            <CardFeedbacks className="relative flex flex-col justify-between">
              <p className="font-normal text-2xl text-secondary leading-10">
                {item.feedbackText}
              </p>
              <p className="font-heading font-semibold text-3xl">
                {item.reviewAuthor}
              </p>
              <span
                className={clsx(
                  "absolute right-2 bottom-2 z-10 flex h-17.5 w-17.5 rounded-full bg-discount-price items-center justify-center",
                  "font-heading text-lg font-semibold uppercase leading-none text-black",
                )}
              />
            </CardFeedbacks>
          </li>
        ))}
      </ul>
    </div>
  );
}
