import clsx from "clsx";
import { categoryIcons } from "./IconsFilter";

type MenuCategoryItem = {
  _id: string;
  title?: string | null;
  slug?: string;
  // додайте інші потрібні поля за потреби
};

type FilterBtnProps = {
  categories?: MenuCategoryItem[] | null;
  onSelect: (categoryId: string) => void;
};

const FilterBtn = ({ categories, onSelect }: FilterBtnProps) => {
  return (
    <>
      <ul className="flex items-center justify-center gap-5">
        {categories?.map((category, idx) => {
          const slug = category.slug || "";
          return (
            <li
              key={category._id || idx}
              className={clsx(
                "px-14 py-8",
                "border-5 border-border-chip rounded-[20px]",
                "hover:border-transparent hover:cta-primary transition-colors duration-300",
                "hover-cta-primary",
              )}
            >
              <button
                onClick={() => onSelect(category.slug || "")}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                {categoryIcons[slug] && (
                  <span className="w-17.5 h-17.5 cta-primary icon">
                    {categoryIcons[slug]}
                  </span>
                )}
                <p className="font-heading font-semibold text-primary text-xl pt-3 hover-cta-text">
                  {category.title}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FilterBtn;
