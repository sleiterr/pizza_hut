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

export const FEATURED_ABOUT_QUERY = defineQuery(`*[_type == "homePage"][0]{
  aboutTitle,
  aboutSubtitle,
  aboutText,
  testimonialAvatar { asset->{ url } },
  authorName,
  position,
  testimonialText,
  aboutImages[] {
    image { asset->{ url } },
    title
  }
}`);

export const MENU_CATEGORY_QUERY = defineQuery(`*[_type == "homePage"][0]{
  menuCategories[]->{
    _id,
    title,
    description,
    "slug": slug.current,
    image { asset->{ url } },
    products[]->{
      _id,
      name,
      price,
      rating,
      productImage { asset->{ url } },
      tags
    }
  }
}`);

export const MENU_QUERY = defineQuery(`*[_type == "menuCategories"]{
  _id,
  title,
  subtitle,
  "slug": slug.current,
  image { asset->{url} },
  items[]{
  _key,
    name,
    description,
    price,
    isNew
  }
}`);

export const DISCOVER_MENU_QUERY = defineQuery(`*[_type == "homePage"][0]{
  discoverMenu[]{
    _key,
    title,
    description,
    price,
    image { asset->{url} }
  }
}`);

export const RESERVATIONS_QUERY =
  defineQuery(`*[_type == "reservations"] | order(_createdAt desc){
  _id,
  guestCount,
  name,
  date,
  time,
  phone,
  status,
  createdAt,
  _createdAt
}`);

// use for fetching featured dishes with pagination
// $start- $end use for pagination, for example $start = 0, $end = 4 to fetch first 4 featured dishes
export const FEATURED_DISHES_QUERY =
  defineQuery(`*[_type == "product" && "featured" in tags] | order(_createdAt desc, _id desc)[$start...$end]{
    _id,
  "slug": slug.current,
  name,
  description,
  discountPrice,
  price,
  rating,
  productImage { asset->{ url } },
  tags,
}`);

// use for counting total number of featured dishes for pagination
export const FEATURED_DISHES_COUNT_QUERY = defineQuery(
  `count(*[_type == "product" && "featured" in tags])`,
);

// _createdAt for sorting, createdAt for display
// coalesce is means if feedbacks is null or undefined, it will return empty array to avoid error when counting and fetching feedbacks
export const FEEDBACK_QUERY = defineQuery(`*[_type == "homePage"][0]{
  feedbacksTitle,
  feedbacksSubtitle,
  "feedbacksCount": count(coalesce(feedbacks, [])),
  "feedbacks":coalesce(feedbacks, [])[$start...$end]{
    _key,
    feedbackText,
    reviewAuthor,
  }
}`);

export const KITCHEN_TEAM_QUERY = defineQuery(`*[_type == "homePage"][0]{
  ourTeamTitle,
  ourTeamMembers [] {
    _key,
   image { asset->{url} },
   role,
   fullName,
   signatureImage { asset->{url} },
  }
}`);

export const APP_SECTION_QUERY = defineQuery(`*[_type == "homePage"][0]{
  appSectionSubtitle,
  appSectionTitle,
  appSection[] {
    _key,
    benefit,
    googlePlayLink,
    appStoreLink
  }
}`);

export const RECENT_NEWS_QUERY = defineQuery(`*[_type == "homePage"][0]{
  recentNewsTitle,
  "recentNewsItems": coalesce(recentNewsItems, []) | order(publishedAt desc){
    _key,
    publishedAt,
    image { asset->{url} },
    authorTitle,
    authorName,
    authorAvatar { asset->{url} }
  }
}`);
