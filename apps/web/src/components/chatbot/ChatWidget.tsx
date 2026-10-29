"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { UIMessage } from "ai";
import clsx from "clsx";
import { MdClose, MdLocalPizza, MdSend } from "react-icons/md";
import ChatMessageText from "./ChatMessageText";

// Keep track of the maximum number of characters allowed in the input
const MAX_CHARS = 500;

// Predefined suggestions for the user to quickly ask common questions
const SUGGESTIONS = [
  "What pizzas do you have?",
  "Any discounts?",
  "What's new on the menu?",
];

// Extracts the text content from a chat message
const getText = (m: UIMessage) =>
  m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

// Function to get a user-friendly error message based on the error type
function getErrorText(error: Error) {
  const msg = error.message.toLocaleLowerCase();
  if (msg.includes("to many"))
    return "Too many requests. Please wait a minute and try again.";
  if (msg.includes("too long"))
    return "Something went wrong. Please try again.";
}

// function to render a chat bubble for user or assistant messages
function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: ReactNode;
}) {
  const isUser = role === "user";

  return (
    <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[85%] wrap-break-word rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-cta-primary text-quaternary"
            : "rounded-bl-md border border-cart-border bg-cart-bg text-quaternary",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const { messages, sendMessage, status, error } = useChat();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const busy = status === "submitted" || status === "streaming";
  const last = messages[messages.length - 1];

  // "thinking" = request sent, or the model is calling a tool and has no text yet
  const isThinking =
    status === "submitted" ||
    (status === "streaming" && last?.role === "assistant" && !getText(last));

  // auto-scroll to the newest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status, error, open]);

  // focus the input on open, close on Escape
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // send a message if not busy and input is valid
  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <>
      {open && (
        <section
          aria-label="Pizza asistant chat"
          className={clsx(
            "fixed z-60 flex flex-col overflow-hidden bg-bg-cart text-quaternary",
            // mobile: full screen, desktop: floating window
            "inset-0 sm:inset-auto sm:bottom-24 sm:right-6",
            "sm:h-140 sm:max-h-[calc(100dvh-8rem)] sm:w-95",
            "sm:rounded-2xl sm:border sm:border-cart-border sm:shadow-2xl",
          )}
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-cart-border bg-cart-bg px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cta-primary text-quaternary">
              <MdLocalPizza size={22} />
            </span>
            <div className="flex-1">
              <h2 className="font-heading text-lg font font-semibold leading-tight">
                Pizza Assistant
              </h2>
              <p className="text-xs text-quinary">Ask me about our menu</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-close text-close-icon transition-colors duration-300 hover:text-quaternary"
            >
              <MdClose size={29} />
            </button>
          </header>

          {/* Messages */}
          <div className="cart-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant">
              Hi! I can help you with our menu, price and discounts.
            </Bubble>

            {messages.map((m) => {
              if (m.role === "system") return null;
              const text = getText(m);
              if (!text) return null;
              return (
                <Bubble key={m.id} role={m.role}>
                  {m.role === "user" ? text : <ChatMessageText text={text} />}
                </Bubble>
              );
            })}

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="cursor-pointer rounded-full border border-border-btn px-3 py-1.5 text-xs text-quinary transition-colors duration-300 hover:border-discount-price hover:text-quaternary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {isThinking && (
              <Bubble role="assistant">
                <span
                  role="status"
                  aria-label="Assistant is thinking"
                  className="flex items-center gap-1.5 py-1"
                >
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-2 w-2 animate-bounce rounded-fill bg-discount-price"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              </Bubble>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border-cta-primary/40 bg-cta-primary/10 px-3 py-2 text-xs text-quaternary"
              >
                {getErrorText(error)}
              </p>
            )}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-cart-border bg-cart-bg p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_CHARS}
              placeholder="Type your question..."
              className="min-w-0 flex-1 rounded-xl border border-border-btn bg-bg-cart px-4 py-3 text-base text-quaternary placeholder:text-quinary focus:border-discount-price focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-cta-submit text-add-btn transition-all duration-300 hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MdSend size={20} />
            </button>
          </form>
        </section>
      )}
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className={clsx(
          "fixed bottom-6 right-6 z-60 h-14 w-14 cursor-pointer items-center justify-center rounded-full",
          "bg-cta-primary text-quaternary shadow-lg",
          "transition-all duration-300 hover:bg-cta-primary-hover active:scale-95",
          // on mobile the open window covers the screen and has its own close button
          open ? "hidden sm:flex" : "flex",
        )}
      >
        {open ? <MdClose size={20} /> : <MdLocalPizza size={28} />}
      </button>
    </>
  );
}
