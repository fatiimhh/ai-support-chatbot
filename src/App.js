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
      //Firestore
      await addDoc(collection(db, "messages"), userMessage);

      
      const assistantMessage = {
        role: "assistant",
        content: fakeReply(trimmed),
        timestamp: new Date(),
      };

      // Save  reply to Firestore
      await addDoc(collection(db, "messages"), assistantMessage);
    } catch (error) {
      console.error("Firebase error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble assistant">
            Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="chat-input">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}

export default App;
