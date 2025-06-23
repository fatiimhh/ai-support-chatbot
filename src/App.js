import React, { useState } from "react";
import "./App.css";
import ClearChatButton from "./components/ClearChatButton";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import useChat from "./hooks/useChat";

function App() {
  const { messages, loading, sendMessage } = useChat();
  const [userInput, setUserInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(userInput);
    setUserInput("");
  };

  return (
    <div className="app">
      <ClearChatButton setMessages={() => {}} /> 
      <MessageList messages={messages} loading={loading} />
      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSend={handleSend}
        loading={loading}
      />
    </div>
  );
}

export default App;
