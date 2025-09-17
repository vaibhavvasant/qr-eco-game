// ===============================
// GeoBorro Single Script with Tree Quiz Trigger
// ===============================

// ======= UI =======
const streakEl = document.querySelector(".streak");
const healthEl = document.querySelector(".health");
const leaderboardBtn = document.querySelector(".leaderboard");
const profileBtn = document.querySelector(".profile");
const overlay = document.getElementById("game-overlay");
const overlayMsg = document.getElementById("game-message");

let streak = parseInt(localStorage.getItem("streak")) || 0;
let health = parseInt(localStorage.getItem("health")) || 3;

streakEl.textContent = `🔥 ${streak}`;
healthEl.textContent = `❤️ ${health}`;

function resetHealth() {
  health = 3;
  localStorage.setItem("health", health);
  healthEl.textContent = `❤️ ${health}`;
}

leaderboardBtn.addEventListener("click", () => {
  window.location.href = "leaderboard.html";
});

profileBtn.addEventListener("click", () => {
  window.location.href = "profile.html";
});

function showMessage(msg) {
  overlay.style.display = "block";
  overlayMsg.textContent = msg;
  setTimeout(() => overlay.style.display = "none", 1500);
}

// ======= Map =======
const map = L.map("map", { zoomControl: false }).setView([28.4595, 77.0266], 18);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Zoom controls bottom-right
L.control.zoom({ position: "bottomright" }).addTo(map);

// My Location button bottom-left
const myLocationBtn = L.control({ position: "bottomleft" });
myLocationBtn.onAdd = function () {
  const btn = L.DomUtil.create("button", "my-location-btn");
  btn.innerHTML = "📍";
  btn.onclick = () => {
    if (marker) map.panTo(marker.getLatLng());
  };
  return btn;
};
myLocationBtn.addTo(map);

// ======= Key Locations (hardcoded) =======
const KEY_LOCATIONS = [
  { id: "tree-quiz1", name: "Tree Quiz 1", lat: 28.43767, lng: 77.05558, radius: 5, type: "tree" },
  { id: "water-quiz", name: "Water Quiz", lat: 28.43841667, lng: 77.05563889, radius: 5, type: "water" },
  { id: "pollution-quiz", name: "Pollution Quiz", lat: 28.4600, lng: 77.0300, radius: 5, type: "pollution" }
];

function getCircleColor(type) {
  switch(type) {
    case "tree": return "green";
    case "water": return "blue";
    case "pollution": return "red";
    default: return "gray";
  }
}

const locationCircles = KEY_LOCATIONS.map(loc => {
  const circle = L.circle([loc.lat, loc.lng], {
    radius: loc.radius,
    color: getCircleColor(loc.type),
    weight: 2,
    opacity: 0.7,
    fillOpacity: 0.1
  }).addTo(map);
  circle.bindPopup(`${loc.name}`);
  return { loc, circle };
});

// ======= User Marker =======
let marker = null;
let accuracyCircle = null;

// Haversine distance helper
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // meters
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ======= Geolocation =======
function onLocationFound(lat, lng, acc) {
  if (!marker) {
    marker = L.marker([lat, lng]).addTo(map);
    accuracyCircle = L.circle([lat, lng], {
      radius: 10,
      weight: 1,
      opacity: 0.6,
      fillOpacity: 0.15,
      color: "gray"
    }).addTo(map);
    map.setView([lat, lng], 18);
  } else {
    marker.setLatLng([lat, lng]);
    accuracyCircle.setLatLng([lat, lng]);
    map.panTo([lat, lng], { animate: true, duration: 0.5 });
  }

  // Check proximity to tree quiz locations only
  locationCircles.forEach(({ loc }) => {
    const dist = getDistance(lat, lng, loc.lat, loc.lng);
    if (loc.type === "tree" && dist <= loc.radius) {
      showMessage(`🎉 You reached ${loc.name}! Loading quiz...`);
      setTimeout(() => window.location.href = `../quizzes/tree-quiz1.html`, 500);
    }
  });
}

function onLocationError(e) {
  alert("Location unavailable: " + e.message);
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    pos => onLocationFound(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy),
    onLocationError,
    { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
  );
} else {
  alert("Geolocation not supported by this browser.");
}
