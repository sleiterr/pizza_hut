import React from "react";
import Image from "next/image";
import clsx from "clsx";
import NewsCard from "./NewsCard";
import type { RECENT_NEWS_QUERY_RESULT } from "@/sanity/types";

const NewsList = ({ data }: NewsListProps) => {
  return (
    <>
      <ul className="grid grid-cols-2 gap-8">
        {data?.recentNewsItems.map((item) => (
          <li key={item._key}>
            <NewsCard>
              {item.image?.asset?.url && (
                <Image
                  src={item.image.asset.url}
                  alt={item.authorName || "News item"}
                  width={260}
                  height={275}
                  className="object-cover rounded-[30px]"
                />
              )}
              <div className="">
                {item.publishedAt && (
                  <time
                    dateTime={item.publishedAt}
                    className={clsx(
                      "font-heading font-semibold text-sm text-primary bg-discount-price px-3 py-1 rounded-lg",
                    )}
                  >
                    {new Date(item.publishedAt).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                )}
                <div className="flex flex-col items-start gap-5 mt-5">
                  <h4 className="font-heading font-semibold text-3xl text-primary">
                    {item.authorTitle}
                  </h4>
                  <div className="flex items-center gap-3">
                    {item.authorAvatar?.asset?.url && (
                      <Image
                        src={item.authorAvatar.asset.url}
                        alt={item.authorName || "avatar"}
                        width={55}
                        height={55}
                        className="object-cover rounded-full"
                      />
                    )}
                    <p className="font-heading font-semibold text-base text-primary">
                      {item.authorName}
                    </p>
                  </div>
                </div>
              </div>
            </NewsCard>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewsList;

type NewsListProps = {
  data: RECENT_NEWS_QUERY_RESULT;
};
