import { createBaseScene } from "../baseScene.js";

export function createRainbarrelRowScene() {
  const scene = createBaseScene({
    id: "chapter-one/rainbarrel-row",
    title: "Rainbarrel Row",
    worldWidth: 2050,
    startMessage: "Rainbarrel Row is overflowing. Follow the runoff to the clogged drain."
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
      { x: 520, y: 542, overflow: true },
      { x: 825, y: 548, overflow: true },
      { x: 1395, y: 546, overflow: true },
      { x: 1710, y: 552, overflow: true }
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
      { x: 80, y: 306, scale: 0.95 },
      { x: 250, y: 286, scale: 1.08 },
      { x: 635, y: 324, scale: 0.82 },
      { x: 1110, y: 296, scale: 0.98 },
      { x: 1485, y: 318, scale: 0.86 },
      { x: 1930, y: 292, scale: 1.02 }
    ],
    cottages: [
      { x: 445, y: 430, scale: 0.78, lit: false },
      { x: 770, y: 452, scale: 0.68, lit: true },
      { x: 1370, y: 444, scale: 0.76, lit: false },
      { x: 1665, y: 462, scale: 0.66, lit: false }
    ],
    lamps: [
      { x: 305, y: 534, lit: true },
      { x: 1010, y: 536, lit: false },
      { x: 1265, y: 528, lit: false },
      { x: 1870, y: 532, lit: true }
    ],
    glowPlants: [
      { x: 365, y: 610, active: true },
      { x: 710, y: 628, active: false },
      { x: 1175, y: 612, active: true },
      { x: 1610, y: 628, active: false }
    ],
    brokenBranches: [
      { x: 610, y: 620, rotation: -0.18 },
      { x: 995, y: 636, rotation: 0.22 },
      { x: 1510, y: 626, rotation: -0.2 }
    ],
    repairParts: [
      { x: 1110, y: 584, type: "coil" },
      { x: 1430, y: 586, type: "gear" }
    ],
    puddles: [
      { x: 190, y: 664, width: 220, height: 19 },
      { x: 690, y: 675, width: 260, height: 19 },
      { x: 1120, y: 650, width: 280, height: 21 },
      { x: 1540, y: 672, width: 230, height: 18 },
      { x: 1890, y: 654, width: 170, height: 17 }
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
      chargeRate: 0.42,
      decayRate: 0.08,
      scanText: "Robot scan: storm drain clogged.",
      puzzleText: "Rotate the channels to redirect the runoff.",
      rewardText: "Stormwater redirected. Chapter repairs complete.",
      onwardText: "The village repairs are holding through the rain.",
      nextText: "Chapter 1 route complete.",
      reactions: [
        { text: "No more water at the door!", x: 740, y: 318 },
        { text: "The barrels are behaving again!", x: 1540, y: 326 },
        { text: "Runoff channel restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Runoff is pooling near the doors." },
        puzzle: { speaker: "player", text: "Let's give all this rain somewhere safe to go." },
        reward: { speaker: "robot", text: "Runoff channel restored." },
        next: { speaker: "player", text: "The village can breathe again." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
