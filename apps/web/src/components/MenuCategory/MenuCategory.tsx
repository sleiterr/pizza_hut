"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import SectionPage from "@/components/Section/SectionPage";
import {
  MENU_CATEGORY_QUERY_RESULT,
  Category,
  MENU_QUERY_RESULT,
} from "@/sanity/types";
import FilterBtn from "@/components/MenuCategory/FilterBtn";
import MenuCard from "@/components/MenuCategory/MenuCard";
import MenuImage from "@/components/MenuCategory/MenuImage";

type MenuCategoryProps = {
  data?: MENU_CATEGORY_QUERY_RESULT;
  menuData: MENU_QUERY_RESULT;
  image?: {
    asset?: {
      url?: string | null;
    } | null;
  } | null;
};

const MenuCategory = ({ data, menuData }: MenuCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (!selectedCategory && data?.menuCategories?.[0]?.slug) {
      setSelectedCategory(data.menuCategories[0].slug);
    }
  }, [data, selectedCategory]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
  };

  const filteredMenu = menuData.filter((cat) => cat.slug === selectedCategory);
  console.log("selectedCategory", selectedCategory);
  console.log("filteredMenu", filteredMenu);
  console.log(
    "menuData",
    menuData.map((cat) => cat.slug),
  );

  return (
    <SectionPage>
      <div className="flex items-center">
        <FilterBtn
          categories={(data?.menuCategories ?? []).map((c) => ({
            ...c,
            title: c.title ?? "",
            slug: c.slug ?? "",
          }))}
          onSelect={handleCategoryClick}
        />
      </div>
      <div
        className={clsx(
          "grid grid-cols-2",
          "mt-14 bg-primary-section",
          "pb-15 pt-25 pr-25 w-240.5 h-147.5 rounded-4xl",
        )}
      >
        <div className="relative w-[850px] h-[538px]">
          <MenuImage image={filteredMenu[0]?.image} />
        </div>
        <MenuCard menuData={filteredMenu} />
      </div>
    </SectionPage>
  );
};

export default MenuCategory;

// MenuCard w-926px h-590px
