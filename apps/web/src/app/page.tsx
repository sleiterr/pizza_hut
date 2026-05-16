import { sanityFetch } from "@/sanity/live";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types";

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
  const homePage = data as HOME_PAGE_QUERY_RESULT;

  return (
    <main>
      <HeroSection data={homePage} />
    </main>
  );
}
