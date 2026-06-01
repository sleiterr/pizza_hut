import { Hero } from "@/components/Hero/Hero";
import FeaturedAbout from "@/components/FeaturedAbout/FeaturedAbout";
import MenuCategory from "@/components/MenuCategory/MenuCategory";
import DiscoverMenu from "@/components/DiscoverMenu/DiscoverMenu";
import Booking from "@/components/Booking/Booking";

import {
  getHomePageData,
  getWeeklySpecialData,
  getFeaturedAboutData,
  getMenuCategoryData,
  getMenuData,
  getDiscoverMenuData,
} from "@/sanity/fetchers";

export default async function HomePage() {
  const homePage = await getHomePageData();
  const weeklySpecial = await getWeeklySpecialData();
  const aboutPage = await getFeaturedAboutData();
  const menuCategory = await getMenuCategoryData();
  const menuData = await getMenuData();
  const discoverMenuData = await getDiscoverMenuData();

  return (
    <main>
      <Hero data={homePage} weeklySpecial={weeklySpecial} />
      <FeaturedAbout data={aboutPage} />
      <MenuCategory data={menuCategory} menuData={menuData} />
      <DiscoverMenu data={discoverMenuData} />
      <Booking />
    </main>
  );
}
