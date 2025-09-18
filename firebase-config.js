// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "####",
  authDomain: "qr-eco-game.firebaseapp.com",
  projectId: "qr-eco-game",
  storageBucket: "qr-eco-game.firebasestorage.app",
  messagingSenderId: "604872327731",
  appId: "1:604872327731:web:fd2d6bd0f1d615b78e9946",
  measurementId: "G-6BWRGQME0B"
};

// ✅ Initialize Firebase once
const app = initializeApp(firebaseConfig);

// ✅ Export services so other files can import them
export const auth = getAuth(app);
export const db = getFirestore(app);
