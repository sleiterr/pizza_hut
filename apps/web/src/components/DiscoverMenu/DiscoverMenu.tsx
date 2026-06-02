import React from "react";
import Section from "../Section/SectionPage";
import DiscoverMenuCard from "./DiscoverMenuCard";

import type { DISCOVER_MENU_QUERY_RESULT } from "@/sanity/types";

type DiscoverMenuProps = {
  data: DISCOVER_MENU_QUERY_RESULT;
};

const DiscoverMenu = ({ data }: DiscoverMenuProps) => {
  console.log(data);
  return (
    <Section className="py-0! pt-24! pb-72!">
      <div className=" mb-32">
        <h2 className="font-semibold font-heading text-6xl text-black text-center">
          Discover Menu
        </h2>
        <span className="block w-67.5 border-t-10 rounded-[30px] border-border-card mx-auto mt-4" />
      </div>
      <DiscoverMenuCard data={data} />
    </Section>
  );
};

export default DiscoverMenu;
