import { Hero } from "@/components/Hero/Hero";
import FeaturedAbout from "@/components/FeaturedAbout/FeaturedAbout";
import {
  getHomePageData,
  getWeeklySpecialData,
  getFeaturedAboutData,
} from "@/sanity/fetchers";

export default async function HomePage() {
  const homePage = await getHomePageData();
  const weeklySpecial = await getWeeklySpecialData();
  const aboutPage = await getFeaturedAboutData();

  return (
    <main>
      <Hero data={homePage} weeklySpecial={weeklySpecial} />
      <FeaturedAbout data={aboutPage} />
    </main>
  );
}
