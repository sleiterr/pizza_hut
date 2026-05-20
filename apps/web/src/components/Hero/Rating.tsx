import clsx from "clsx";
import type { Product } from "@/sanity/types";
import { FaStar } from "react-icons/fa6";

const Rating = ({ rating }: { rating?: Product["rating"] }) => {
  if (rating == null) return null;

  const stars = Array(5).fill(0);
  const colors = { yellow: "#FACC15", grey: "#a9a9a9" };

  return (
    <>
      <div className="flex items-start mb-4 gap-2">
        {stars.map((_, index) =>
          index < Math.round(rating) ? (
            <FaStar key={index} size={24} color={colors.yellow} />
          ) : (
            <FaStar key={index} size={24} color={colors.grey} />
          ),
        )}
      </div>
    </>
  );
};

export default Rating;
