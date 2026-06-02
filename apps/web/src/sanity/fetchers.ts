// src/sanity/fetchers.ts
import { sanityFetch } from "@/sanity/live";
import {
  HOME_PAGE_QUERY,
  WEEKLY_SPECIAL_QUERY,
  FEATURED_ABOUT_QUERY,
  MENU_CATEGORY_QUERY,
  MENU_QUERY,
  DISCOVER_MENU_QUERY,
  FEATURED_DISHES_QUERY,
  FEATURED_DISHES_COUNT_QUERY,
} from "@/sanity/queries";
import type {
  HOME_PAGE_QUERY_RESULT,
  WEEKLY_SPECIAL_QUERY_RESULT,
  FEATURED_ABOUT_QUERY_RESULT,
  MENU_CATEGORY_QUERY_RESULT,
  MENU_QUERY_RESULT,
  DISCOVER_MENU_QUERY_RESULT,
  FEATURED_DISHES_QUERY_RESULT,
  FEATURED_DISHES_COUNT_QUERY_RESULT,
} from "@/sanity/types";

export async function getHomePageData() {
  const { data: homePageData } = await sanityFetch({ query: HOME_PAGE_QUERY });
  return homePageData as HOME_PAGE_QUERY_RESULT;
}

export async function getWeeklySpecialData() {
  const { data: weeklySpecialData } = await sanityFetch({
    query: WEEKLY_SPECIAL_QUERY,
  });
  return weeklySpecialData as WEEKLY_SPECIAL_QUERY_RESULT;
}

export async function getFeaturedAboutData() {
  const { data: aboutPageData } = await sanityFetch({
    query: FEATURED_ABOUT_QUERY,
  });
  return aboutPageData as FEATURED_ABOUT_QUERY_RESULT;
}

export async function getMenuCategoryData() {
  const { data: menuCategoryData } = await sanityFetch({
    query: MENU_CATEGORY_QUERY,
  });
  return menuCategoryData as MENU_CATEGORY_QUERY_RESULT;
}

export async function getMenuData() {
  const { data: menuData } = await sanityFetch({
    query: MENU_QUERY,
  });
  return menuData as MENU_QUERY_RESULT;
}

export async function getDiscoverMenuData() {
  const { data: discoverMenuData } = await sanityFetch({
    query: DISCOVER_MENU_QUERY,
  });
  console.log("discoverMenuData", discoverMenuData);
  return discoverMenuData as DISCOVER_MENU_QUERY_RESULT;
}

//! Fetch featured dishes with pagination
export async function getFeaturedDishesData(start: number, end: number) {
  const { data: featuredDishesData } = await sanityFetch({
    query: FEATURED_DISHES_QUERY,
    params: { start, end },
  });
  return featuredDishesData as FEATURED_DISHES_QUERY_RESULT;
}
//! Fetch total count of featured dishes for pagination
export async function getFeaturedDishesCount() {
  const { data: featuredDishesCount } = await sanityFetch({
    query: FEATURED_DISHES_COUNT_QUERY,
  });
  return featuredDishesCount as FEATURED_DISHES_COUNT_QUERY_RESULT;
}
