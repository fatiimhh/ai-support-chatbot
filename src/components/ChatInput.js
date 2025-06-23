import React from "react";

function ChatInput({ userInput, setUserInput, handleSend, loading }) {
  return (
    <form onSubmit={handleSend} className="chat-input">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Send
      </button>
    </form>
  );
}

export default ChatInput;
