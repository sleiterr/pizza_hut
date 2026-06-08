import React from "react";
import SectionPage from "../Section/SectionPage";
import CartContent from "./CartContent";
import { KITCHEN_TEAM_QUERY_RESULT } from "@/sanity/types";

type OurTeamProps = {
  data: KITCHEN_TEAM_QUERY_RESULT;
};

const OurTeam = ({ data }: OurTeamProps) => {
  return (
    <SectionPage>
      <div>
        <h2 className="font-heading font-semibold text-6xl text-center">
          {data?.ourTeam}
        </h2>
        <span className="block w-67.5 border-t-10 rounded-[30px] border-border-card mx-auto mt-4" />
      </div>
      <div>
        <CartContent data={data} />
      </div>
    </SectionPage>
  );
};

export default OurTeam;
