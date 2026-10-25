"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function ChatWidget() {
  // Use the useChat hook to manage chat messages and sending new messages
  const { messages, sendMessage } = useChat();
  // Current message input
  const [input, setInput] = useState("");

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      {/* Chat messages will be rendered here */}
      {messages.map((m) => (
        <div key={m.id} style={{ marginBottom: 12 }}>
          <b>{m.role === "user" ? "You" : "AI"}</b>
          {m.parts.map((part, i) =>
            part.type === "text" ? <span key={i}>{part.text}</span> : null,
          )}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%", padding: "8px", marginBottom: "8px" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
