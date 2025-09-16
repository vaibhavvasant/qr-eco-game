// Full collection (12 characters: 3 of each type)
const CHARACTERS = [
  { name: "Peepal Guardian", img: "../characters/tree_rare.png", rarity: 5, type: "tree", level: 2, lore: "An ancient tree spirit that releases oxygen even at night.", unlocked: true },
  { name: "Banyan Protector", img: "https://placekitten.com/210/200", rarity: 4, type: "tree", level: 1, lore: "Holds wisdom of centuries.", unlocked: false },
  { name: "Neem Healer", img: "https://placekitten.com/220/200", rarity: 3, type: "tree", level: 1, lore: "Purifies air and heals surroundings.", unlocked: false },

  { name: "River Sprite", img: "https://placekitten.com/201/200", rarity: 4, type: "water", level: 1, lore: "Protects flowing waters.", unlocked: true },
  { name: "Rain Dancer", img: "https://placekitten.com/211/200", rarity: 3, type: "water", level: 1, lore: "Summons rainfall when needed.", unlocked: false },
  { name: "Ocean Guardian", img: "https://placekitten.com/221/200", rarity: 5, type: "water", level: 1, lore: "Keeps the seas alive.", unlocked: false },

  { name: "Waste Warrior", img: "https://placekitten.com/202/200", rarity: 3, type: "waste", level: 3, lore: "Turns trash into treasure.", unlocked: true },
  { name: "Recycler Golem", img: "https://placekitten.com/212/200", rarity: 4, type: "waste", level: 1, lore: "Never lets waste pile up.", unlocked: false },
  { name: "Compost Sage", img: "https://placekitten.com/222/200", rarity: 2, type: "waste", level: 1, lore: "Turns scraps into life.", unlocked: false },

  { name: "Smog Phantom", img: "https://placekitten.com/203/200", rarity: 4, type: "pollution", level: 1, lore: "Feeds on pollutants.", unlocked: true },
  { name: "Ash Wraith", img: "https://placekitten.com/213/200", rarity: 3, type: "pollution", level: 1, lore: "Clears smoky skies.", unlocked: false },
  { name: "Toxin Eater", img: "https://placekitten.com/223/200", rarity: 5, type: "pollution", level: 1, lore: "Absorbs deadly toxins.", unlocked: false }
];

// Grab elements
const grid = document.getElementById("collectionGrid");
const streakEl = document.querySelector(".streak");
const healthEl = document.querySelector(".health");
const profileBtn = document.querySelector(".icon-btn.profile");
const leaderboardBtn = document.querySelector("header .icon-btn:first-child");

// Render function
function renderCollection() {
  grid.innerHTML = "";
  CHARACTERS.forEach(char => {
    const card = document.createElement("div");
    card.className = "char-card" + (char.unlocked ? "" : " locked");

    card.innerHTML = `
      <img class="char-img" src="${char.img}" alt="${char.name}" />
      <div class="char-info">
        <div class="char-name">${char.name}</div>
        <div class="char-rarity">${"★".repeat(char.rarity)}</div>
        <div class="char-type type-${char.type}">${char.type}</div>
        <div class="char-level">Lvl ${char.level}</div>
      </div>
      <button class="lore-btn" title="Lore">📖</button>
      <div class="lore" style="display:none;">${char.lore}</div>
    `;

    // Lore toggle only if unlocked
    if (char.unlocked) {
      const loreBtn = card.querySelector(".lore-btn");
      const loreDiv = card.querySelector(".lore");
      loreBtn.addEventListener("click", () => {
        loreDiv.style.display = loreDiv.style.display === "block" ? "none" : "block";
      });
    }

    grid.appendChild(card);
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
