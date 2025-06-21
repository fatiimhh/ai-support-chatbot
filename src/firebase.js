import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBWKuqc0xqoIGPF4_luzAc5Y3YqxZ8Qs6c",
  authDomain: "ai-support-chatbot-cfa4f.firebaseapp.com",
  projectId: "ai-support-chatbot-cfa4f",
  storageBucket: "ai-support-chatbot-cfa4f.firebasestorage.app",
  messagingSenderId: "319699854195",
  appId: "1:319699854195:web:6139fcd9cd72aade309b06"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
