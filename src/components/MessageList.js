import React from "react";
import ChatBubble from "./ChatBubble";

function MessageList({ messages, loading }) {
  return (
    <div className="chat-container">
      {messages.map((msg, idx) => (
        <ChatBubble key={idx} role={msg.role} content={msg.content} />
      ))}

      {loading && (
        <ChatBubble
          role="assistant"
          content={
            <>
              Typing<span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </>
          }
        />
      )}
    </div>
  );
}

export default MessageList;
