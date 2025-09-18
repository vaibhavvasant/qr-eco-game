// Character metadata (fixed info)
const CHARACTER_META = {
  "tree_common.jpg": {
    name: "Neem Healer",
    rarity: 1,
    type: "tree",
    lore: "Purifies air and heals surroundings."
  },
  "tree_uncommon.jpg": {
    name: "Banyan Protector",
    rarity: 3,
    type: "tree",
    lore: "Holds wisdom of centuries."
  },
  "tree_rare.png": {
    name: "Peepal Guardian",
    rarity: 5,
    type: "tree",
    lore: "An ancient tree spirit that releases oxygen even at night."
  },

  "water_common.jpg": {
    name: "Rain Dancer",
    rarity: 1,
    type: "water",
    lore: "Summons rainfall when needed."
  },
  "water_uncommon.jpg": {
    name: "River Sprite",
    rarity: 3,
    type: "water",
    lore: "Protects flowing waters."
  },
  "water_rare.jpg": {
    name: "Ocean Guardian",
    rarity: 5,
    type: "water",
    lore: "Keeps the seas alive."
  },

  "waste_common.jpg": {
    name: "Waste Warrior",
    rarity: 1,
    type: "waste",
    lore: "Turns trash into treasure."
  },
  "waste_uncommon.jpg": {
    name: "Recycler Golem",
    rarity: 3,
    type: "waste",
    lore: "Never lets waste pile up."
  },
  "waste_rare.png": {
    name: "Compost Sage",
    rarity: 5,
    type: "waste",
    lore: "Turns scraps into life."
  },

  "pollution_common.jpg": {
    name: "Ash Wraith",
    rarity: 1,
    type: "pollution",
    lore: "Clears smoky skies."
  },
  "pollution_uncommon.jpg": {
    name: "Smog Phantom",
    rarity: 3,
    type: "pollution",
    lore: "Feeds on pollutants."
  },
  "pollution_rare.jpg": {
    name: "Toxin Eater",
    rarity: 5,
    type: "pollution",
    lore: "Absorbs deadly toxins."
  }
};

// Grab elements
const grid = document.getElementById("collectionGrid");
const streakEl = document.querySelector(".streak");
const healthEl = document.querySelector(".health");
const profileBtn = document.querySelector(".icon-btn.profile");
const leaderboardBtn = document.querySelector("header .icon-btn:first-child");

// Render collection
function renderCollection() {
  grid.innerHTML = "";

  // Load progress from localStorage
  const progress = JSON.parse(localStorage.getItem("characterCollection") || "{}");

  Object.keys(CHARACTER_META).forEach(filename => {
    const meta = CHARACTER_META[filename];
    const acquired = progress[filename];

    const card = document.createElement("div");
    card.className = `char-card type-${meta.type}` + (acquired ? "" : " locked");



    card.innerHTML = `
      <div class="char-img-wrapper">
        <img class="char-img" src="../characters/${filename}" alt="${meta.name}" />
        <button class="lore-btn" ${acquired ? "" : "disabled"}>📖</button>
      </div>
      <div class="char-info">
        <div class="char-name">${meta.name}</div>
        <div class="char-rarity">${"★".repeat(meta.rarity)}</div>
        <div class="char-type type-${meta.type}">${meta.type}</div>
        <div class="char-level">${acquired ? "Lvl " + acquired.level : "Locked"}</div>
      </div>
    `;

    if (acquired) {
      const loreBtn = card.querySelector(".lore-btn");
      loreBtn.addEventListener("click", () => {
        openLoreModal({
          ...meta,
          level: acquired.level
        });
      });
    }

    // Tap feedback
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

