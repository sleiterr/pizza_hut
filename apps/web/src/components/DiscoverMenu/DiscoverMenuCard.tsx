import React from "react";
import clsx from "clsx";
import MenuCartContent from "./MenuCartContent";
import type { DISCOVER_MENU_QUERY_RESULT } from "@/sanity/types";

type DiscoverMenuCardProps = {
  data: DISCOVER_MENU_QUERY_RESULT;
};

const DiscoverMenuCard = ({ data }: DiscoverMenuCardProps) => {
  return (
    // _key
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-9">
      {data?.discoverMenu?.map((item, i) => (
        <li key={item._key || i}>
          <div className="relative">
            {item.image?.asset?.url && (
              <img src={item.image.asset.url} alt={item.title || ""} />
            )}
            <MenuCartContent item={item} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DiscoverMenuCard;
