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

// _createdAt for sorting, createdAt for display
