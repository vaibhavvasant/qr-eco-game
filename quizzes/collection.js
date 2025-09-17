// Full collection (12 characters: 3 of each type)
const CHARACTERS = [
  { name: "Peepal Guardian", img: "../characters/tree_rare.png", rarity: 5, type: "tree", level: 2, lore: "An ancient tree spirit that releases oxygen even at night.", unlocked: true },
  { name: "Banyan Protector", img: "../characters/tree_uncommon.jpg", rarity: 3, type: "tree", level: 1, lore: "Holds wisdom of centuries.", unlocked: false },
  { name: "Neem Healer", img: "../characters/tree_common.jpg", rarity: 1, type: "tree", level: 1, lore: "Purifies air and heals surroundings.", unlocked: false },

  { name: "River Sprite", img: "../characters/water_uncommon.jpg", rarity: 3, type: "water", level: 1, lore: "Protects flowing waters.", unlocked: true },
  { name: "Rain Dancer", img: "../characters/water_common.jpg", rarity: 1, type: "water", level: 1, lore: "Summons rainfall when needed.", unlocked: false },
  { name: "Ocean Guardian", img: "../characters/water_rare.jpg", rarity: 5, type: "water", level: 1, lore: "Keeps the seas alive.", unlocked: false },

  { name: "Waste Warrior", img: "../characters/waste_common.png", rarity: 1, type: "waste", level: 3, lore: "Turns trash into treasure.", unlocked: true },
  { name: "Recycler Golem", img: "../characters/waste_uncommon.png", rarity: 3, type: "waste", level: 1, lore: "Never lets waste pile up.", unlocked: false },
  { name: "Compost Sage", img: "../characters/waste_rare.jpg", rarity: 5, type: "waste", level: 1, lore: "Turns scraps into life.", unlocked: false },

  { name: "Smog Phantom", img: "../characters/pollution_uncommon.jpg", rarity: 3, type: "pollution", level: 1, lore: "Feeds on pollutants.", unlocked: true },
  { name: "Ash Wraith", img: "../characters/pollution_common.jpg", rarity: 1, type: "pollution", level: 1, lore: "Clears smoky skies.", unlocked: false },
  { name: "Toxin Eater", img: "../characters/pollution_rare.jpg", rarity: 5, type: "pollution", level: 1, lore: "Absorbs deadly toxins.", unlocked: false }
];

// Grab elements
const grid = document.getElementById("collectionGrid");
const streakEl = document.querySelector(".streak");
const healthEl = document.querySelector(".health");
const profileBtn = document.querySelector(".icon-btn.profile");
const leaderboardBtn = document.querySelector("header .icon-btn:first-child");

// Render collection
function renderCollection() {
  grid.innerHTML = "";
  CHARACTERS.forEach(char => {
    const card = document.createElement("div");
    card.className = `char-card type-${char.type}` + (char.unlocked ? "" : " locked");

    card.innerHTML = `
      <div class="char-img-wrapper">
        <img class="char-img" src="${char.img}" alt="${char.name}" />
        <button class="lore-btn">📖</button>
      </div>
      <div class="char-info">
        <div class="char-name">${char.name}</div>
        <div class="char-rarity">${"★".repeat(char.rarity)}</div>
        <div class="char-type type-${char.type}">${char.type}</div>
        <div class="char-level">Lvl ${char.level}</div>
      </div>
    `;

    if (char.unlocked) {
      const loreBtn = card.querySelector(".lore-btn");
      loreBtn.addEventListener("click", () => {
        openLoreModal(char);
      });
    }

    // Add tap feedback (for mobile) **inside the loop**
    card.addEventListener("touchstart", () => {
      card.classList.add("active-glow");
      setTimeout(() => card.classList.remove("active-glow"), 1200);
    });

    grid.appendChild(card);
  });
}

// Lore modal
function openLoreModal(char) {
  const modal = document.createElement("div");
  modal.className = "lore-modal";

  modal.innerHTML = `
    <div class="lore-content">
      <button class="lore-close">✖</button>
      <h2>${char.name}</h2>
      <p><strong>Rarity:</strong> ${"★".repeat(char.rarity)}</p>
      <p><strong>Type:</strong> ${char.type}</p>
      <p><strong>Level:</strong> ${char.level}</p>
      <hr/>
      <p>${char.lore}</p>
    </div>
  `;

   document.body.appendChild(modal);

  modal.querySelector(".lore-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Init
renderCollection();

// Load streak/health
let streak = parseInt(localStorage.getItem("streak")) || 0;
let health = parseInt(localStorage.getItem("health")) || 3;

streakEl.textContent = `🔥 ${streak}`;
healthEl.textContent = `❤️ ${health}`;

// Reset health function
function resetHealth() {
  health = 3;
  localStorage.setItem("health", health);
  healthEl.textContent = `❤️ ${health}`;
}

// Hook buttons
leaderboardBtn.addEventListener("click", () => {
  window.location.href = "leaderboard.html";
});

profileBtn.addEventListener("click", () => {
  window.location.href = "profile.html";
});
