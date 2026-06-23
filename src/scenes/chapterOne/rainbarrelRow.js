import { createBaseScene } from "../baseScene.js";

export function createRainbarrelRowScene() {
  const scene = createBaseScene({
    id: "chapter-six/rainbarrel-row",
    title: "Rainbarrel Row",
    worldWidth: 2050,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.backdrop = { moonX: 780, moonY: 162, cloudDrift: 0.85, hillOffset: 18, ridgeOffset: -44 };
  scene.rainbarrelRow = {
    drain: { x: 1110, y: 622, cleared: false },
    channels: [
      { x: 550, y: 644, width: 410, flow: false },
      { x: 1030, y: 632, width: 500, flow: false },
      { x: 1540, y: 650, width: 360, flow: false }
    ],
    barrels: [
      { x: 520, y: 602, overflow: true },
      { x: 825, y: 602, overflow: true },
      { x: 1395, y: 602, overflow: true },
      { x: 1710, y: 602, overflow: true }
    ],
    gutters: [
      { x: 430, y: 363, width: 260, drip: true },
      { x: 760, y: 385, width: 230, drip: true },
      { x: 1345, y: 378, width: 260, drip: true },
      { x: 1645, y: 392, width: 230, drip: true }
    ]
  };
  scene.layers = {
    trees: [
      { x: 80, y: 291, scale: 1.5 },
      { x: 250, y: 268, scale: 1.6 },
      { x: 635, y: 309, scale: 1.42 },
      { x: 1110, y: 296, scale: 1.48 },
      { x: 1485, y: 300, scale: 1.46 },
      { x: 1930, y: 280, scale: 1.55 }
    ],
    cottages: [
      { x: 380, y: 534, scale: 2.05, lit: false },
      { x: 850, y: 526, scale: 2.2, lit: true },
      { x: 1340, y: 532, scale: 2.1, lit: false },
      { x: 1760, y: 537, scale: 2.0, lit: false }
    ],
    lamps: [
      { x: 305, y: 560, lit: true },
      { x: 1010, y: 560, lit: false },
      { x: 1265, y: 560, lit: false },
      { x: 1870, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 1980, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 200, y: 664, width: 220, height: 19 },
      { x: 1120, y: 662, width: 280, height: 21 },
      { x: 1900, y: 660, width: 170, height: 17 }
    ],
    mistBands: [
      { x: 130, y: 426, width: 360, speed: 12 },
      { x: 720, y: 392, width: 420, speed: 13 },
      { x: 1360, y: 462, width: 360, speed: 12 }
    ]
  };

  scene.repairs = [
    {
      id: "rainbarrel-drain",
      kind: "path-puzzle",
      puzzleTheme: "water-routing",
      x: 1110,
      y: 560,
      radius: 240,
      complete: false,
      progress: 0,
      scanText: "Robot scan: storm drain clogged.",
      puzzleText: "Rotate the channels to redirect the runoff.",
      rewardText: "Stormwater redirected. The village repairs are holding.",
      onwardText: "The village repairs are holding through the rain.",
      nextText: "The repaired lane opens toward Rooftop Channels.",
      nextSceneId: "chapter-six/rooftop-channels",
      reactions: [
        { text: "No more water at the door!", x: 740, y: 318 },
        { text: "The barrels are behaving again!", x: 1540, y: 326 },
        { text: "Runoff channel restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Runoff is pooling near the doors." },
        puzzle: { speaker: "player", text: "Let's give all this rain somewhere safe to go." },
        reward: { speaker: "robot", text: "Runoff channel restored." },
        next: { speaker: "player", text: "The rooftops need us next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
