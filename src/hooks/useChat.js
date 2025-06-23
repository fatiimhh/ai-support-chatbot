import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { fakeReply } from "../utils/fakeReply";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded = snapshot.docs.map((doc) => doc.data());
      setMessages(loaded);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

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
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
}
