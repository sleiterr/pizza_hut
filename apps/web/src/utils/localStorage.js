"use client";
//ProductCart

const PRODUCT_KEY = "CardProductsIds";

export function getCartFromStorage() {
  try {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(PRODUCT_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error("Could not fetch cart items from localStorage", e);
    return [];
  }
}

export function saveCartToStorage(cart) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Could not save cart items to localStorage", e);
  }
}
