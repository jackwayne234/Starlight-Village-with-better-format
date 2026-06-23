import { createBaseScene } from "./baseScene.js";
import { fullGameScenes } from "./fullGameCatalog.js";

const catalogById = new Map(fullGameScenes.map((entry) => [entry.id, entry]));

const regionStyles = {
  "Starlight Village Core": {
    worldWidth: 2200,
    backdrop: { moonX: 840, moonY: 154, cloudDrift: 0.82, hillOffset: -6, ridgeOffset: 24 },
    cottages: 3,
    trees: 4,
    foliage: "village",
    repairX: 1220
  },
  "Glowfen Wetlands": {
    worldWidth: 2320,
    backdrop: { moonX: 990, moonY: 138, cloudDrift: 1.05, hillOffset: 54, ridgeOffset: 88 },
    cottages: 0,
    trees: 5,
    foliage: "fen",
    repairX: 1180
  },
  "Mossline Switchyard": {
    worldWidth: 2340,
    backdrop: { moonX: 760, moonY: 150, cloudDrift: 0.68, hillOffset: 28, ridgeOffset: 52 },
    cottages: 1,
    trees: 3,
    foliage: "rail",
    repairX: 1240
  },
  "Stormedge Rise": {
    worldWidth: 2260,
    backdrop: { moonX: 1040, moonY: 128, cloudDrift: 1.32, hillOffset: 126, ridgeOffset: 170 },
    cottages: 0,
    trees: 4,
    foliage: "ridge",
    repairX: 1160
  },
  "Beacon Hill": {
    worldWidth: 2200,
    backdrop: { moonX: 1025, moonY: 132, cloudDrift: 1.25, hillOffset: 140, ridgeOffset: 176 },
    cottages: 1,
    trees: 4,
    foliage: "ridge",
    repairX: 1240
  },
  "Rainbarrel Row": {
    worldWidth: 2260,
    backdrop: { moonX: 700, moonY: 158, cloudDrift: 0.86, hillOffset: 18, ridgeOffset: 40 },
    cottages: 4,
    trees: 3,
    foliage: "water",
    repairX: 1160
  },
  "Old Orchard": {
    worldWidth: 2340,
    backdrop: { moonX: 920, moonY: 144, cloudDrift: 0.76, hillOffset: 42, ridgeOffset: 66 },
    cottages: 1,
    trees: 6,
    foliage: "orchard",
    repairX: 1200
  },
  "Glassworks Quarter": {
    worldWidth: 2260,
    backdrop: { moonX: 820, moonY: 136, cloudDrift: 0.7, hillOffset: 10, ridgeOffset: 36 },
    cottages: 3,
    trees: 2,
    foliage: "glass",
    repairX: 1210
  },
  "Under-Village": {
    worldWidth: 2180,
    backdrop: { moonX: 1090, moonY: 176, cloudDrift: 0.44, hillOffset: 90, ridgeOffset: 130 },
    cottages: 0,
    trees: 2,
    foliage: "under",
    repairX: 1120
  },
  "Festival Night": {
    worldWidth: 2320,
    backdrop: { moonX: 900, moonY: 118, cloudDrift: 0.72, hillOffset: -18, ridgeOffset: 20 },
    cottages: 4,
    trees: 4,
    foliage: "festival",
    repairX: 1220
  }
};

export function createPlannedScene(sceneId) {
  const entry = catalogById.get(sceneId);
  if (!entry) {
    throw new Error(`Unknown planned scene: ${sceneId}`);
  }

  const style = regionStyles[entry.region] ?? regionStyles["Starlight Village Core"];
  const scene = createBaseScene({
    id: entry.id,
    title: entry.title,
    worldWidth: style.worldWidth,
    startMessage: ""
  });

  scene.player.x = 320;
  scene.robot.x = 430;
  scene.showSignpost = false;
  scene.backdrop = style.backdrop;
  scene.layers = createLayers(entry, style);

  const repair = createRepair(entry, style);
  scene.repairs = [repair];
  scene.repairIndex = 0;
  scene.repairTarget = repair;

  return scene;
}

function createLayers(entry, style) {
  return {
    trees: makeTrees(style.trees, entry.number),
    cottages: makeCottages(style.cottages, entry.number),
    foliage: makeFoliage(style.foliage, entry.number),
    lamps: makeLamps(entry.number),
    glowPlants: makeGlowPlants(style.foliage, entry.number),
    brokenBranches: makeBrokenBranches(style.foliage, entry.number),
    repairParts: makeRepairParts(entry.number),
    puddles: makePuddles(entry.number),
    mistBands: makeMistBands(entry.number)
  };
}

function createRepair(entry, style) {
  const finalScene = entry.number === fullGameScenes.length;
  const repairId = `${entry.id.split("/").pop()}-repair`;
  const nextRegion = fullGameScenes[entry.number]?.region;
  const crossesRegion = nextRegion && nextRegion !== entry.region;

  return {
    id: repairId,
    kind: "path-puzzle",
    puzzleTheme: entry.puzzleTheme,
    x: style.repairX + ((entry.number % 3) - 1) * 90,
    y: 560,
    radius: 245,
    complete: false,
    progress: 0,
    scanText: `Robot scan: ${entry.title.toLowerCase()} needs attention.`,
    puzzleText: puzzlePrompt(entry),
    rewardText: rewardText(entry),
    onwardText: finalScene ? "" : "The next repair is calling.",
    nextText: finalScene ? "Starlight Village is whole again." : nextText(entry, crossesRegion),
    nextSceneId: entry.nextSceneId,
    chapterComplete: finalScene ? {
      title: "Starlight Village Restored",
      text: "Every light, drain, bridge, signal, and quiet corner is steady under the rain."
    } : null,
    reactions: [
      { text: shortReaction(entry), x: style.repairX, y: 350 },
      { text: "Stable.", x: "robot", y: "robotTop" }
    ],
    dialogue: {
      scan: { speaker: "robot", text: scanLine(entry) },
      puzzle: { speaker: "player", text: "Let's fix this before the rain gets ideas." },
      reward: { speaker: "robot", text: rewardLine(entry) },
      next: { speaker: finalScene ? "player" : "robot", text: finalScene ? "The whole village feels awake." : "Next stop is marked." }
    }
  };
}

function puzzlePrompt(entry) {
  if (entry.puzzleTheme === "water-routing") return "Rotate the channels to guide the rainwater safely.";
  if (entry.puzzleTheme === "root-pump") return "Rotate the living paths to wake the roots.";
  if (entry.puzzleTheme === "rail-signal") return "Rotate the signal paths until the route is safe.";
  if (entry.puzzleTheme === "archive-lens") return "Rotate the lens paths until every prism catches light.";
  if (entry.puzzleTheme === "storm-gauge") return "Rotate the storm paths until the gauge steadies.";
  if (entry.puzzleTheme === "beacon-signal") return "Rotate the signal paths until the light carries.";
  return "Rotate the paths until the repair links from start to output.";
}

function rewardText(entry) {
  return `${entry.title} restored. ${entry.premise.replace(/\.$/, "").replace(/^Restore /, "").replace(/^Rotate /, "").replace(/^Repair /, "")}.`;
}

function nextText(entry, crossesRegion) {
  const next = fullGameScenes[entry.number];
  if (!next) return "The village is steady.";
  return crossesRegion ? `${next.region} waits beyond the rain.` : `${next.title} is next.`;
}

function scanLine(entry) {
  const subjects = {
    "Starlight Village Core": "Village system is damp but reachable.",
    "Glowfen Wetlands": "Wetland readings are glowing in odd places.",
    "Mossline Switchyard": "Rail current is scattered across the yard.",
    "Stormedge Rise": "Wind pressure is pushing everything out of tune.",
    "Beacon Hill": "Beacon hardware is asking for a careful hand.",
    "Rainbarrel Row": "Water pressure is gathering in the wrong place.",
    "Old Orchard": "Old roots are carrying signals under the path.",
    "Glassworks Quarter": "Light is bouncing, but not where it should.",
    "Under-Village": "Deep systems are awake enough to complain.",
    "Festival Night": "Festival circuits are waiting for one more repair."
  };
  return subjects[entry.region] ?? "This scene has one repair ready.";
}

function rewardLine(entry) {
  if (entry.number === fullGameScenes.length) return "All one hundred repairs are logged as stable.";
  return `${entry.title} is stable. That makes ${entry.number} repairs.`;
}

function shortReaction(entry) {
  if (entry.region === "Festival Night") return "Festival light!";
  if (entry.region === "Under-Village") return "Deep system steady.";
  if (entry.region === "Glassworks Quarter") return "Color is back.";
  if (entry.region === "Old Orchard") return "Roots are happy.";
  if (entry.region === "Rainbarrel Row") return "Water is moving.";
  if (entry.region === "Beacon Hill") return "Signal is clear.";
  if (entry.region === "Stormedge Rise") return "Wind is calmer.";
  if (entry.region === "Mossline Switchyard") return "Line is linked.";
  if (entry.region === "Glowfen Wetlands") return "The fen glows.";
  return "Village light!";
}

function makeTrees(count, seed) {
  return Array.from({ length: count }, (_, index) => ({
    x: 130 + index * 430 + ((seed + index * 37) % 95),
    y: 270 + ((seed * 13 + index * 29) % 44),
    scale: 1.32 + ((seed + index) % 5) * 0.07
  }));
}

function makeCottages(count, seed) {
  return Array.from({ length: count }, (_, index) => ({
    x: 420 + index * 440 + ((seed * 19 + index * 31) % 74),
    y: 528 + ((seed + index * 11) % 16),
    scale: 1.82 + ((seed + index) % 4) * 0.08,
    lit: index === 0 || seed % 3 === index % 3
  }));
}

function makeFoliage(kind, seed) {
  const baseKind = kind === "fen" || kind === "orchard" ? "glowfenLeafLitter" : "rainyRocksReeds";
  return [
    { kind: baseKind, x: 720 + (seed % 5) * 45, groundY: 662, height: 96 + (seed % 4) * 12, alpha: 0.78 },
    { kind: "rainyRocksReeds", x: 1460 + (seed % 6) * 36, groundY: 658, height: 104, alpha: 0.72 }
  ];
}

function makeLamps(seed) {
  return [260, 760, 1260, 1760, 2100].map((x, index) => ({
    x: x + ((seed + index * 9) % 34),
    y: 560,
    lit: index === 0 || index === 4 || seed % 4 === index
  }));
}

function makeGlowPlants(kind, seed) {
  if (kind === "under") {
    return [];
  }
  return [
    { x: 210 + (seed % 7) * 26, y: 640, active: kind === "fen" || kind === "festival" },
    { x: 1900 + (seed % 5) * 31, y: 638, active: kind === "glass" || kind === "orchard" }
  ];
}

function makeBrokenBranches(kind, seed) {
  if (kind !== "orchard" && kind !== "ridge") {
    return [];
  }
  return [
    { x: 560 + (seed % 4) * 90, y: 634, scale: 0.85 },
    { x: 1680 + (seed % 3) * 70, y: 636, scale: 0.76 }
  ];
}

function makeRepairParts(seed) {
  const kinds = ["gear", "coil", "seed"];
  return [
    { x: 960 + (seed % 6) * 36, y: 624, kind: kinds[seed % kinds.length] },
    { x: 1510 + (seed % 4) * 38, y: 626, kind: kinds[(seed + 1) % kinds.length] }
  ];
}

function makePuddles(seed) {
  return [
    { x: 280 + (seed % 5) * 22, y: 664, width: 118 + (seed % 4) * 18, height: 20 },
    { x: 1180 + (seed % 7) * 24, y: 662, width: 156, height: 22 },
    { x: 1920 + (seed % 6) * 18, y: 660, width: 138, height: 18 }
  ];
}

function makeMistBands(seed) {
  return [
    { x: 120 + (seed % 8) * 18, y: 496, width: 250, speed: 10 + (seed % 4) },
    { x: 820 + (seed % 6) * 21, y: 438, width: 340, speed: 12 + (seed % 3) },
    { x: 1520 + (seed % 5) * 24, y: 512, width: 300, speed: 11 + (seed % 5) }
  ];
}
