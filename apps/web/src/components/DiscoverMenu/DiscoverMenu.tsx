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
    <Section>
      <DiscoverMenuCard data={data} />
    </Section>
  );
};

export default DiscoverMenu;
