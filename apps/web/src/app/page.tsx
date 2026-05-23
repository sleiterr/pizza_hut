import { Hero } from "@/components/Hero/Hero";
import FeaturedAbout from "@/components/FeaturedAbout/FeaturedAbout";
import MenuCategory from "@/components/MenuCategory/MenuCategory";
import {
  getHomePageData,
  getWeeklySpecialData,
  getFeaturedAboutData,
  getMenuCategoryData,
  getMenuData,
} from "@/sanity/fetchers";

export default async function HomePage() {
  const homePage = await getHomePageData();
  const weeklySpecial = await getWeeklySpecialData();
  const aboutPage = await getFeaturedAboutData();
  const menuCategory = await getMenuCategoryData();
  const menuData = await getMenuData();

  return (
    <main>
      <Hero data={homePage} weeklySpecial={weeklySpecial} />
      <FeaturedAbout data={aboutPage} />
      <MenuCategory data={menuCategory} menuData={menuData} />
    </main>
  );
}
