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
  FEEDBACK_QUERY,
  KITCHEN_TEAM_QUERY,
  APP_SECTION_QUERY,
  RECENT_NEWS_QUERY,
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
  FEEDBACK_QUERY_RESULT,
  KITCHEN_TEAM_QUERY_RESULT,
  APP_SECTION_QUERY_RESULT,
  RECENT_NEWS_QUERY_RESULT,
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

// Fetch feedback data for the feedback section
export async function getFeedbackData(start: number, end: number) {
  const { data: feedbackData } = await sanityFetch({
    query: FEEDBACK_QUERY,
    params: { start, end },
  });
  return feedbackData as FEEDBACK_QUERY_RESULT;
}

// Fetch kitchen team data for the home page section
export async function getKitchenTeamData() {
  const { data: kitchenTeamData } = await sanityFetch({
    query: KITCHEN_TEAM_QUERY,
  });

  return kitchenTeamData as KITCHEN_TEAM_QUERY_RESULT;
}

// Fetch app section data for the home page section
export async function getAppSectionData() {
  const { data: appSectionData } = await sanityFetch({
    query: APP_SECTION_QUERY,
  });

  return appSectionData as APP_SECTION_QUERY_RESULT;
}

// Fetch recent news data for the home page section
export async function getRecentNewsData() {
  const { data: recentNewsData } = await sanityFetch({
    query: RECENT_NEWS_QUERY,
  });

  return recentNewsData as RECENT_NEWS_QUERY_RESULT;
}
