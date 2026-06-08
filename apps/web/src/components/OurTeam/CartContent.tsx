import React from "react";
import TeamCart from "./TeamCart";
import Image from "next/image";
import TeamCardContent from "./TeamCardContent";
import { KITCHEN_TEAM_QUERY_RESULT } from "@/sanity/types";

type CartContentProps = {
  data: KITCHEN_TEAM_QUERY_RESULT;
};

const CartContent = ({ data }: CartContentProps) => {
  return (
    <ul className="flex items-center justify-center gap-7">
      {data?.ourTeamMembers?.map((item) => (
        <li key={item._key}>
          <TeamCart>
            {item.image?.asset?.url && (
              <>
                <Image
                  src={item.image.asset.url}
                  alt={item.fullName || "Featured dish"}
                  width={330}
                  height={290}
                  className="relative h-136 w-103.25 object-contain"
                />
                <TeamCardContent item={item} />
              </>
            )}
          </TeamCart>
        </li>
      ))}
    </ul>
  );
};

export default CartContent;
