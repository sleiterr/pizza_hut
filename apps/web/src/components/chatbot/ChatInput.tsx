import { RefObject } from "react";
import { MAX_CHARS } from "../../hooks/chatUtils";
import { MdSend } from "react-icons/md";

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  inputRef,
}: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex items-center gap-2 border-t border-cart-border bg-cart-bg p-3"
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX_CHARS}
        placeholder="Type your question..."
        className="min-w-0 flex-1 rounded-xl border border-border-btn bg-bg-cart px-4 py-3 text-base text-quaternary placeholder:text-quinary focus:border-discount-price focus:outline-none sm:text-sm"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-cta-submit text-add-btn transition-all duration-300 hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MdSend size={20} />
      </button>
    </form>
  );
}

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
};
