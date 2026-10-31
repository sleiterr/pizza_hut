export function TypingIndicator() {
  return (
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
  );
}
