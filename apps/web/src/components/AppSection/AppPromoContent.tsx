import React from "react";
import clsx from "clsx";
import { FaCircleDot, FaGooglePlay, FaApple } from "react-icons/fa6";

import { APP_SECTION_QUERY_RESULT } from "@/sanity/types";
import CtaLinkButton from "../Button/CtaLinkButton";

const AppPromoContent = ({ data }: AppSectionProps) => {
  return (
    <div>
      <div className="mb-4">
        <h4 className="font-heading font-semibold text-lg text-tertiary uppercase mb-2">
          {data?.appSectionSubtitle}
        </h4>
        <h2 className="font-heading font-semibold text-5xl text-primary">
          {data?.appSectionTitle}
        </h2>
      </div>
      <ul>
        {data?.appSection?.map((item) => (
          <li key={item._key} className="mt-4">
            <div className="flex flex-col gap-2">
              {(item.benefit ?? []).map((line, index) => (
                <div
                  className="flex items-center gap-3"
                  key={`${item._key}-${index}`}
                >
                  <FaCircleDot className="text-border-card text-lg" />
                  <p
                    key={`${item._key}-${index}`}
                    className="font-normal text-lg text-secondary"
                  >
                    {line}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5 mt-10">
              {item.googlePlayLink && (
                <CtaLinkButton
                  href={item.googlePlayLink}
                  className={clsx(
                    "flex items-center gap-2",
                    "bg-cta-primary hover:bg-cta-primary-hover",
                  )}
                >
                  <FaGooglePlay className="text-quaternary text-lg" />
                  Google Play
                </CtaLinkButton>
              )}
              {item.appStoreLink && (
                <CtaLinkButton
                  href={item.appStoreLink}
                  className={clsx(
                    "flex items-center gap-2", 
                    "bg-cta-tertiary hover:bg-cta-tertiary-hover",
                  )}
                >
                  <FaApple className="text-quaternary text-xl" />
                  App Store
                </CtaLinkButton>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppPromoContent;

type AppSectionProps = {
  data: APP_SECTION_QUERY_RESULT;
};

// key={`${item._key}-${index}`} is used to create a unique key for each line of the benefit array, combining the item's _key and the index of the line. This ensures that each element in the list has a unique identifier, which is important for React's rendering performance and to avoid warnings about missing keys.
