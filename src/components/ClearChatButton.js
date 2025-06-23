import React from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function ClearChatButton({ setMessages }) {
  const handleClear = async () => {
    // Clear UI
    setMessages([{ role: "assistant", content: "Chat cleared. How can I help you?" }]);

    // Clear Firestore
    const querySnapshot = await getDocs(collection(db, "messages"));
    for (const messageDoc of querySnapshot.docs) {
      await deleteDoc(doc(db, "messages", messageDoc.id));
    }
  };

  return (
    <button onClick={handleClear} className="clear-chat-button">
       Clear Chat
    </button>
  );
}

export default ClearChatButton;
