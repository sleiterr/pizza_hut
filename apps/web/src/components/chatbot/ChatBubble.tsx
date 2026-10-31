import { type ReactNode } from "react";
import clsx from "clsx";

export function Bubble({
  role,
  children,
  className,
}: {
  role: "user" | "assistant";
  children: ReactNode;
  className?: string;
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
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
