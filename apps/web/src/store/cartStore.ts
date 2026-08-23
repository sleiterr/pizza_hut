import { create } from "zustand";
import { persist } from "zustand/middleware";

// form one array of cart items to an object with productId as key and quantity as value
export type CartItem = {
  productId: string; // _id of the product from sanity
  slug: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  rating?: number;
  quantity: number;
};

// form all cart items to an object with productId as key and quantity as value
// items: [] - data of the cart items
type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
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
                ? {
                    ...i,
                    ...item,
                    description: item.description ?? i.description,
                    rating: item.rating ?? i.rating,
                    quantity: i.quantity + 1,
                  }
                : i,
            ),
          });
        } else {
          set({
            // product does not exist in the cart, add it with quantity 1
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },

      // remove an item from the cart by productId
      removeItem: (productId) => {
        set({
          items: get().items.filter((i) => i.productId !== productId),
        });
      },

      // update the quantity of an item in the cart by productId
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({
            items: get().items.filter((i) => i.productId !== productId),
          });
          return;
        }

        // update the quantity of the item in the cart
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
        });
      },

      // clear the cart by setting items to an empty array
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage", // key for local storage
    },
  ),
);

//! selectors for accessing the cart state

// selectTotalItems: returns the total number of items in the cart
export const selectTotalItems = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

// selectTotalPrice: returns the total price of items in the cart, considering discountPrice if available
export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);
