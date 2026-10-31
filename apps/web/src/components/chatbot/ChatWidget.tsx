"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { MdClose, MdLocalPizza } from "react-icons/md";
import ChatMessageText from "./ChatMessageText";
import { TypingIndicator } from "./TypingIndicator";
import { Bubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { SUGGESTIONS, getText, getErrorText } from "../../hooks/chatUtils";

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

            {/* Typing indicator for assistant */}
            {isThinking && (
              <Bubble role="assistant">
                <TypingIndicator />
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

          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={() => send(input)}
            disabled={busy}
            inputRef={inputRef}
          />
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
