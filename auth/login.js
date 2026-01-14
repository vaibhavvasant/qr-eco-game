// login.js
import { auth, db } from "../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Sign Up with email/password
document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create Firestore profile if new
    await setDoc(doc(db, "users", user.uid), {
      displayName: email.split("@")[0],
      streak: 0,
      characters: {},
      leaderboardPoints: 0,
      createdAt: serverTimestamp()
    });

    alert(`Signup successful! Logged in as ${user.email}`);
    console.log("User signed up:", user.uid);
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});

// Login with email/password
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert(`Welcome back, ${user.email}`);
    console.log("User logged in:", user.uid);
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});

// Login with Google
document.getElementById("googleBtn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Ensure Firestore profile exists
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName || "Player",
        streak: 0,
        characters: {},
        leaderboardPoints: 0,
        createdAt: serverTimestamp()
      });
    }

    alert(`Google login successful! ${user.email}`);
    console.log("User logged in with Google:", user.uid);
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});
