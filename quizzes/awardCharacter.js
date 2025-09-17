// Award character on quiz completion
function awardCharacter(type) {
  // Roll rarity probability
  const roll = Math.random() * 100;
  let rarity;
  if (roll < 60) rarity = "common";
  else if (roll < 90) rarity = "uncommon";
  else rarity = "rare";

  // Character pool
  const characters = {
    tree: {
      common: ["tree_common.jpg"],
      uncommon: ["tree_uncommon.jpg"],
      rare: ["tree_rare.png"]
    },
    water: {
      common: ["water_common.jpg"],
      uncommon: ["water_uncommon.jpg"],
      rare: ["water_rare.jpg"]
    },
    waste: {
      common: ["waste_common.jpg", "waste_common.png"],
      uncommon: ["waste_uncommon.jpg", "waste_uncommon.png"],
      rare: ["waste_rare.jpg"]
    },
    pollution: {
      common: ["pollution_common.jpg"],
      uncommon: ["pollution_uncommon.jpg"],
      rare: ["pollution_rare.jpg"]
    }
  };

  const pool = characters[type][rarity];
  const selected = pool[Math.floor(Math.random() * pool.length)];

  // Progress in localStorage
  const collection = JSON.parse(localStorage.getItem("characterCollection") || "{}");

  if (!collection[selected]) {
    collection[selected] = { type, rarity, level: 0 }; // new unlock
  } else {
    collection[selected].level += 1; // level up
  }

  localStorage.setItem("characterCollection", JSON.stringify(collection));

  return { character: selected, rarity, level: collection[selected].level };
}
