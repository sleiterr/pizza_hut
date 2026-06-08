import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { KITCHEN_TEAM_QUERY_RESULT } from "@/sanity/types";

const TeamCardContent = ({ item }: TeamCardContentProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center ",
        "bg-white w-90 h-90 rounded-full border-[5px] border-border-chip",
        "absolute bottom-74 translate-y-1/2",
      )}
    >
      <div className="flex flex-col items-center justify-center mb-6">
        <p className="font-heading font-semibold text-lg text-tertiary">
          {item.role}
        </p>
        <h2 className="font-heading font-semibold text-4xl text-primary">
          {item.fullName}
        </h2>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-12.5 h-12.5 bg-circles rounded-full" />
        <span className="w-12.5 h-12.5 bg-circles rounded-full" />
        <span className="w-12.5 h-12.5 bg-circles rounded-full" />
      </div>
      {item.signatureImage?.asset?.url && (
        <>
          <Image
            src={item.signatureImage.asset.url}
            alt={item.fullName || "Featured dish"}
            width={130}
            height={25}
            className="relative h-6.75 w-34.75 object-contain"
          />
        </>
      )}
    </div>
  );
};

export default TeamCardContent;

// Define a type for the team member based on the KITCHEN_TEAM_QUERY_RESULT
type TeamMember = NonNullable<
  NonNullable<KITCHEN_TEAM_QUERY_RESULT>["ourTeamMembers"]
>[number];

// Define the props for the TeamCardContent component
type TeamCardContentProps = {
  item: TeamMember;
};
