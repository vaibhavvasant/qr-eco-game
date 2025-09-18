// Award character on quiz completion
function awardCharacter(type) {
  const roll = Math.random() * 100;
  let rarity;
  if (roll < 60) rarity = "common";
  else if (roll < 90) rarity = "uncommon";
  else rarity = "rare";

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
      common: ["waste_common.jpg"],
      uncommon: ["waste_uncommon.png"],
      rare: ["waste_rare.png"]
    },
    pollution: {
      common: ["pollution_common.jpg"],
      uncommon: ["pollution_uncommon.jpg"],
      rare: ["pollution_rare.jpg"]
    }
  };

  // Pick a character filename
  const pool = characters[type][rarity];
  const filename = pool[Math.floor(Math.random() * pool.length)];

  // Load & update collection
  const collection = JSON.parse(localStorage.getItem("characterCollection") || "{}");

  if (!collection[filename]) {
    collection[filename] = { type, rarity, level: 1 }; // new unlock
  } else {
    collection[filename].level += 1; // level up
  }

  localStorage.setItem("characterCollection", JSON.stringify(collection));

  // Return with proper path for modal display
  return {
    character: `../characters/${filename}`, // for modal img src
    rarity,
    level: collection[filename].level
  };
}
