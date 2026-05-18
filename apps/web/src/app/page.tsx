import { sanityFetch } from "@/sanity/live";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { HOME_PAGE_QUERY, WEEKLY_SPECIAL_QUERY } from "@/sanity/queries";
import type { HOME_PAGE_QUERY_RESULT, ProductType } from "@/sanity/types";

export default async function HomePage() {
  const { data: homePageData } = await sanityFetch({ query: HOME_PAGE_QUERY });
  const { data: weeklySpecialData } = await sanityFetch({
    query: WEEKLY_SPECIAL_QUERY,
  });
  const homePage = homePageData as HOME_PAGE_QUERY_RESULT;

  return (
    <main>
      <HeroSection
        data={homePage}
        weeklySpecial={weeklySpecialData as ProductType | null}
      />
    </main>
  );
}
