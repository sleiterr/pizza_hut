import { Fragment, type ReactNode } from "react";

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

// Renders **bold** inside one line
function renderInline(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

// Splits the text into paragraphs and bullet lists
function parse(text: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const bullet = line.match(/^[*-]\s+(.*)$/);
    if (bullet) {
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(bullet[1]);
      else blocks.push({ type: "ul", items: [bullet[1]] });
    } else {
      blocks.push({ type: "p", text: line.replace(/^#{1,6}\s+/, "") });
    }
  }
  return blocks;
}

export default function ChatMessageText({ text }: { text: string }) {
  return (
    <div className="space-y-2">
      {parse(text).map((block, i) =>
        block.type === "ul" ? (
          <ul
            key={i}
            className="list-disc space-y-1 pl-5 marker:text-discount-price"
          >
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{renderInline(block.text)}</p>
        ),
      )}
    </div>
  );
}

// Fragment used for the text content of chat messages
// ReactNode used for typing the children prop of chat message components
