import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import ClearChatButton from "./components/ClearChatButton";
import MessageList from "./components/MessageList";


const fakeReply = (input) => {
  return `🤖 (Mock reply) You said: "${input}"`;
};

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = userInput.trim();
    if (!trimmed) return;

    setUserInput("");
    setLoading(true);

    const userMessage = {
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "messages"), userMessage);

      const assistantMessage = {
        role: "assistant",
        content: fakeReply(trimmed),
        timestamp: new Date(),
      };

      await addDoc(collection(db, "messages"), assistantMessage);
    } catch (error) {
      console.error("Firebase error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <ClearChatButton setMessages={setMessages} />
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
