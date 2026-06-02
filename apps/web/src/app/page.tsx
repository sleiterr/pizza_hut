import { Hero } from "@/components/Hero/Hero";
import FeaturedAbout from "@/components/FeaturedAbout/FeaturedAbout";
import MenuCategory from "@/components/MenuCategory/MenuCategory";
import DiscoverMenu from "@/components/DiscoverMenu/DiscoverMenu";
import FeaturedDishes from "../components/FeaturedDishes/FeaturedDishes";

import {
  getHomePageData,
  getWeeklySpecialData,
  getFeaturedAboutData,
  getMenuCategoryData,
  getMenuData,
  getDiscoverMenuData,
  getFeaturedDishesData,
  getFeaturedDishesCount,
} from "@/sanity/fetchers";

type HomePageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number(resolvedSearchParams?.page ?? 1);
  const currentPage =
    Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;
  const pageSize = 3; // Number of items per page for featured dishes

  const [
    homePage,
    weeklySpecial,
    aboutPage,
    menuCategory,
    menuData,
    discoverMenuData,
    featuredDishesCount,
  ] = await Promise.all([
    getHomePageData(),
    getWeeklySpecialData(),
    getFeaturedAboutData(),
    getMenuCategoryData(),
    getMenuData(),
    getDiscoverMenuData(),
    getFeaturedDishesCount(),
  ]);

  // Calculate pagination details for featured dishes
  const totalPage = Math.max(1, Math.ceil(featuredDishesCount / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPage);
  const start = (safeCurrentPage - 1) * pageSize;
  const end = start + pageSize;
  const featuredDishes = await getFeaturedDishesData(start, end);

  return (
    <main>
      <Hero data={homePage} weeklySpecial={weeklySpecial} />
      <FeaturedAbout data={aboutPage} />
      <MenuCategory data={menuCategory} menuData={menuData} />
      <DiscoverMenu data={discoverMenuData} />
      <FeaturedDishes
        items={featuredDishes}
        currentPage={safeCurrentPage}
        totalPage={totalPage}
      />
    </main>
  );
}
