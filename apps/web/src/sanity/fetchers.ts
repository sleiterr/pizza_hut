// src/sanity/fetchers.ts
import { sanityFetch } from "@/sanity/live";
import {
  HOME_PAGE_QUERY,
  WEEKLY_SPECIAL_QUERY,
  FEATURED_ABOUT_QUERY,
} from "@/sanity/queries";
import type {
  HOME_PAGE_QUERY_RESULT,
  WEEKLY_SPECIAL_QUERY_RESULT,
  FEATURED_ABOUT_QUERY_RESULT,
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
