// Award character on quiz completion
function awardCharacter(type) {
  const roll = Math.random() * 100;
  let rarity;
  if (roll < 60) rarity = "common";
  else if (roll < 90) rarity = "uncommon";
  else rarity = "rare";

  const characters = {
    tree: {
      common: ["../characters/tree_common.jpg"],
      uncommon: ["../characters/tree_uncommon.jpg"],
      rare: ["../characters/tree_rare.png"]
    },
    water: {
      common: ["../characters/water_common.jpg"],
      uncommon: ["../characters/water_uncommon.jpg"],
      rare: ["../characters/water_rare.jpg"]
    },
    waste: {
      common: ["../characters/waste_common.jpg"],
      uncommon: ["../characters/waste_uncommon.jpg"],
      rare: ["../characters/waste_rare.jpg"]
    },
    pollution: {
      common: ["../characters/pollution_common.jpg"],
      uncommon: ["../characters/pollution_uncommon.jpg"],
      rare: ["../characters/pollution_rare.jpg"]
    }
  };

  const pool = characters[type][rarity];
  const selected = pool[Math.floor(Math.random() * pool.length)];

  const collection = JSON.parse(localStorage.getItem("characterCollection") || "{}");

  if (!collection[selected]) {
    collection[selected] = { type, rarity, level: 1 }; // new unlock starts at level 1
  } else {
    collection[selected].level += 1; // level up
  }

  localStorage.setItem("characterCollection", JSON.stringify(collection));

  return {
    character: selected, // filename
    rarity,
    level: collection[selected].level
  };
}
