import { Hero } from "@/components/Hero/Hero";
import FeaturedAbout from "@/components/FeaturedAbout/FeaturedAbout";
import MenuCategory from "@/components/MenuCategory/MenuCategory";
import DiscoverMenu from "@/components/DiscoverMenu/DiscoverMenu";
import FeaturedDishes from "../components/FeaturedDishes/FeaturedDishes";
import FeedbacksSection from "../components/Feedbacks/FeedbacksSection";

import {
  getHomePageData,
  getWeeklySpecialData,
  getFeaturedAboutData,
  getMenuCategoryData,
  getMenuData,
  getDiscoverMenuData,
  getFeaturedDishesData,
  getFeaturedDishesCount,
  getFeedbackData,
} from "@/sanity/fetchers";

type HomePageProps = {
  searchParams?: Promise<{
    page?: string;
    dishesPage?: string;
    feedbackPage?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const toValidPage = (pageValue?: string) => {
    const parsedPage = Number(pageValue ?? 1);
    return Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  };

  const getPagination = (
    requestedPage: number,
    totalItems: number,
    pageSize: number,
  ) => {
    const totalPage = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(requestedPage, totalPage);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    return { currentPage, totalPage, start, end };
  };

  const resolvedSearchParams = await searchParams;
  const requestedFeaturedPage = toValidPage(
    resolvedSearchParams?.dishesPage ?? resolvedSearchParams?.page,
  );
  const requestedFeedbackPage = toValidPage(
    resolvedSearchParams?.feedbackPage ?? resolvedSearchParams?.page,
  );

  // Shared page sizes for independent paginations.
  const PAGE_SIZE = {
    featured: 3,
    feedbacks: 1,
  } as const;

  const [
    homePage,
    weeklySpecial,
    aboutPage,
    menuCategory,
    menuData,
    discoverMenuData,
    featuredDishesCount,
    feedbackMeta,
  ] = await Promise.all([
    getHomePageData(),
    getWeeklySpecialData(),
    getFeaturedAboutData(),
    getMenuCategoryData(),
    getMenuData(),
    getDiscoverMenuData(),
    getFeaturedDishesCount(),
    getFeedbackData(0, 0),
  ]);

  // Calculate pagination for both featured dishes and feedbacks independently
  const featuredPagination = getPagination(
    requestedFeaturedPage,
    featuredDishesCount,
    PAGE_SIZE.featured,
  );

  // feedbackMeta?.feedbacksCount can be undefined if the query fails, so we default to 0 to avoid errors in pagination calculation
  const feedbackPagination = getPagination(
    requestedFeedbackPage,
    feedbackMeta?.feedbacksCount ?? 0,
    PAGE_SIZE.feedbacks,
  );

  // Fetch paginated data for both featured dishes and feedbacks in parallel
  const [featuredDishes, feedbackData] = await Promise.all([
    getFeaturedDishesData(featuredPagination.start, featuredPagination.end),
    getFeedbackData(feedbackPagination.start, feedbackPagination.end),
  ]);

  return (
    <main>
      <Hero data={homePage} weeklySpecial={weeklySpecial} />
      <FeaturedAbout data={aboutPage} />
      <MenuCategory data={menuCategory} menuData={menuData} />
      <DiscoverMenu data={discoverMenuData} />
      <FeaturedDishes
        items={featuredDishes}
        currentPage={featuredPagination.currentPage}
        totalPage={featuredPagination.totalPage}
      />
      <FeedbacksSection
        data={feedbackData}
        currentPage={feedbackPagination.currentPage}
        totalPage={feedbackPagination.totalPage}
      />
    </main>
  );
}
