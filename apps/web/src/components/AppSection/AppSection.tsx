import React from "react";
import SectionPage from "../Section/SectionPage";
import AppPromoContent from "./AppPromoContent";
import AppVisualBox from "./AppVisualBox";

import { APP_SECTION_QUERY_RESULT } from "@/sanity/types";

const AppSection = ({ data }: AppSectionProps) => {
  return (
    <SectionPage
      classSection="relative bg-primary-section"
      className="grid grid-cols-2 items-center"
    >
      <AppPromoContent data={data} />
      <AppVisualBox />
    </SectionPage>
  );
};

export default AppSection;

type AppSectionProps = {
  data: APP_SECTION_QUERY_RESULT;
};
