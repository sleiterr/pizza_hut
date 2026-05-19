"use client";
import { useState, useEffect } from "react";
import { getCartFromStorage, saveCartToStorage } from "../utils/localStorage";

export function useCart() {
  const [cart, setCart] = useState(getCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (product) => {
    console.log("ADDING TO CART:", product);

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // The product is already available - updating the quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // The product is not available yet — add it with quantity = 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const deleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  return {
    cart,
    cartCount,
    addToCart,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity,
  };
}
