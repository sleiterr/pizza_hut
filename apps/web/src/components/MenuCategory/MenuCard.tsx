import { MenuCategories } from "@/sanity/types";
import { MENU_QUERY_RESULT } from "@/sanity/types";
import clsx from "clsx";

type MenuCardProps = {
  menuData: MENU_QUERY_RESULT;
};

const MenuCard = ({ menuData }: MenuCardProps) => {
  return (
    <>
      {menuData?.map((category, idx) => (
        <div key={category._id || idx} className="pb-24 pt-25 pr-25">
          <h3 className="font-semibold font-heading text-4xl pb-7">
            {category.title}
          </h3>
          <ul>
            {category.items?.map((item, itemIdx) => (
              <li key={item._key || itemIdx} className="flex flex-col">
                <div
                  className={clsx(
                    "border-dashed border-b-2 border-border-menu mb-4",
                    "flex flex-col items-start",
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <h4 className="font-semibold font-heading text-2xl text-primary">
                      {item.name}
                    </h4>
                    <p className="font-bold text-2xl text-tertiary">
                      {item.price}
                    </p>
                  </div>
                  <p className="font-normal text-base text-secondary pb-5 leading-[26.4px]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default MenuCard;
