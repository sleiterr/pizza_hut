import React from "react";
import { APP_SECTION_QUERY_RESULT } from "@/sanity/types";

const AppPromoContent = ({ data }: AppSectionProps) => {
  return (
    <div>
      <div className="">
        <h4>{data?.appSectionSubtitle}</h4>
        <h2>{data?.appSectionTitle}</h2>
      </div>
      <ul>
        {data?.appSection?.map((item) => (
          <li key={item._key} className="mt-4">
            <div className="flex flex-col gap-4">
              {(item.benefit ?? []).map((line, index) => (
                <p key={`${item._key}-${index}`}>{line}</p>
              ))}
            </div>
            <div className="">
              {item.googlePlayLink && (
                <a
                  href={item.googlePlayLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Play
                </a>
              )}
              {item.appStoreLink && (
                <a
                  href={item.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store
                </a>
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
