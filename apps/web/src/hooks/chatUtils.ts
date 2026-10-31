import type { UIMessage } from "ai";

// Keep track of the maximum number of characters allowed in the input
export const MAX_CHARS = 500;

// Predefined suggestions for the user to quickly ask common questions
export const SUGGESTIONS = [
  "What pizzas do you have?",
  "Any discounts?",
  "What's new on the menu?",
];

// Extracts the text content from a chat message
export const getText = (m: UIMessage) =>
  m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

// Function to get a user-friendly error message based on the error type
export function getErrorText(error: Error) {
  const msg = error.message.toLocaleLowerCase();
  if (msg.includes("to many"))
    return "Too many requests. Please wait a minute and try again.";
  if (msg.includes("too long"))
    return "Something went wrong. Please try again.";
}
