// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 你的專屬 Firebase 配置（從 Firebase 控制台複製的）
const firebaseConfig = {
  apiKey: "AIzaSyDXV2ztL9vtuux2evkOCRQck-fwEBhO7W8",
  authDomain: "ghostguide-web.firebaseapp.com",
  projectId: "ghostguide-web",
  storageBucket: "ghostguide-web.firebasestorage.app",
  messagingSenderId: "494195093352",
  appId: "1:494195093352:web:1e9d7ad5d3098cad28b0dd",
  measurementId: "G-K089S1Q19K"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 匯出 auth 和 db，讓其他檔案可以用
export const auth = getAuth(app);
export const db = getFirestore(app);