import React from "react";
import "../App.css";

function ChatBubble({ role, content }) {
  return <div className={`chat-bubble ${role}`}>{content}</div>;
}

export default ChatBubble;
