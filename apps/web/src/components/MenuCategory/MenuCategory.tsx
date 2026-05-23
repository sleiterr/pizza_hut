"use client";
import React, { useState, useEffect } from "react";
import SectionPage from "@/components/Section/SectionPage";
import {
  MENU_CATEGORY_QUERY_RESULT,
  Category,
  MENU_QUERY_RESULT,
} from "@/sanity/types";
import FilterBtn from "@/components/MenuCategory/FilterBtn";
import MenuCard from "@/components/MenuCategory/MenuCard";

type MenuCategoryProps = {
  data?: MENU_CATEGORY_QUERY_RESULT;
  menuData: MENU_QUERY_RESULT;
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
      <div className="">
        <FilterBtn
          categories={(data?.menuCategories ?? []).map((c) => ({
            ...c,
            title: c.title ?? "",
            slug: c.slug ?? "",
          }))}
          onSelect={handleCategoryClick}
        />
      </div>
      <div className="">
        <MenuCard menuData={filteredMenu} />
      </div>
    </SectionPage>
  );
};

export default MenuCategory;
