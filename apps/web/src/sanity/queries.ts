import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroImage { asset->{ url } },
  heroButtonText,
  heroButtonLink
}`);
