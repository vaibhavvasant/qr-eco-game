// leaderboard.js
import { db } from "../firebase-config.js";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

async function loadLeaderboard() {
  try {
    // Query Firestore: top 10 users by points
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("leaderboardPoints", "desc"), limit(10));
    const querySnapshot = await getDocs(q);

    const tableBody = document.querySelector("#leaderboardTable tbody");
    tableBody.innerHTML = "";

    let rank = 1;
    querySnapshot.forEach(doc => {
      const data = doc.data();

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${rank}</td>
        <td>${data.displayName || "Player"}</td>
        <td>${data.leaderboardPoints || 0}</td>
      `;
      tableBody.appendChild(row);

      rank++;
    });
  } catch (err) {
    console.error("Error loading leaderboard:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);
