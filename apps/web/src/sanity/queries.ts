import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroImage { asset->{ url } },
  heroButtonText,
  heroButtonLink
}`);

export const WEEKLY_SPECIAL_QUERY =
  defineQuery(`*[_type == "product" && "weekly-special" in tags][0]{
  name,
  rating,
  price,
  productImage { asset->{ url } },
  tags,
}`);

