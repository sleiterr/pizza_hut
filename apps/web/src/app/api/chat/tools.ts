import { tool } from "ai";
import { z } from "zod";
import { getMenuData, getProductsData } from "@/sanity/fetchers";

export const chatTools = {
  // getMenu tool returns the menu categories with their items (name, description, price, isNew)
  getMenu: tool({
    description:
      "Returns the menu categories (Dessert, BBQ, Coffee, Burger and others) with their items (name, description, price, isNew). Call it for questions about burgers, coffee, desserts, BBQ or what is new.",
    // Schema for input validation (empty object since no input is required)
    inputSchema: z.object({}),
    // Async function to fetch and return menu categories with their items
    execute: async () => {
      console.log("TOOL getMenu called");
      const categories = await getMenuData();
      console.log("TOOL getMenu categories:", categories.length);

      // return the mapped categories with their items
      return categories.map((c) => ({
        title: c.title,
        subtitle: c.subtitle,
        items: c.items?.map(({ name, description, price, isNew }) => ({
          name,
          description,
          price,
          isNew,
        })),
      }));
    },
  }),

  // searchProducts tool searches the main product catalog by name/description, tag or max price
  searchProducts: tool({
    description:
      "Searches the main product catalog (pizzas and other dishes such as pasta) by name/description, tag or max price. Returns name, description, price, discountPrice, rating, tags. Call it for questions about pizzas and main dishes.",
    // Schema for input validation (query, tag, maxPrice)
    inputSchema: z.object({
      query: z
        .string()
        .optional()
        .describe("Word to search in name og description"),
      tag: z
        .enum([
          "featured",
          "popular",
          "trending",
          "flash-sale",
          "best-seller",
          "weekly-special",
          "top-offer",
          "new",
        ])
        .optional(),
      maxPrice: z.number().optional(),
    }),

    // Async function to search and return products based on query, tag, and maxPrice
    execute: async ({ query, tag, maxPrice }) => {
      console.log("TOOL searchProducts", { query, tag, maxPrice });
      const products = await getProductsData();

      // has function checks if a text contains a part (case-insensitive)
      const has = (text: string | null | undefined, part: string) =>
        (text ?? "").toLowerCase().includes(part.toLowerCase());

      // Filter and map the products based on the search criteria
      const result = products
        .filter(
          (p) => !query || has(p.name, query) || has(p.description, query),
        )
        .filter((p) => !tag || p.tags?.includes(tag))
        .filter(
          (p) =>
            maxPrice === undefined ||
            (p.discountPrice ?? p.price ?? 0) <= maxPrice,
        )
        .slice(0, 15)
        // map the filtered products to include only the required fields
        .map(({ name, description, price, discountPrice, rating, tags }) => ({
          name,
          description,
          price,
          discountPrice,
          rating,
          tags,
        }));

      // Log the number of products found after filtering and mapping
      console.log("TOOL searchProducts result:", result.length);
      // return the filtered and mapped products
      return result;
    },
  }),
};
