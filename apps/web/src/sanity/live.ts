import { defineLive } from "next-sanity/live";

import { client } from "@/sanity/client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-09",
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken:
    process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN ||
    process.env.SANITY_API_READ_TOKEN,
});
