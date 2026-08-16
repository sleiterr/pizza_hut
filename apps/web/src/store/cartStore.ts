import { create } from "zustand";
import { persist } from "zustand/middleware";

// form one array of cart items to an object with productId as key and quantity as value
export type CartItem = {
  id: string; // unique identifier for the cart item
  productId: string; // _id of the product from sanity
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
};

// form all cart items to an object with productId as key and quantity as value
// items: [] - data of the cart items
type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
};

export const useCartStore = create<CartState>()(
  // persist middleware to store the cart items in local storage
  persist(
    // set: function for updating the state, get function for accessing the current state
    // get: tools of zustand to access the current state of the store
    (set, get) => ({
      items: [],

      addItem: (item) => {
        // check if the item already exists in the cart
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId);

        if (existing) {
          // product already exists in the cart, increment the quantity
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({
            // product does not exist in the cart, add it with quantity 1
            items: [...items, { ...item, id: item.productId, quantity: 1 }],
          });
        }
      },
    }),
    {
      name: "cart-storage", // key for local storage
    },
  ),
);
