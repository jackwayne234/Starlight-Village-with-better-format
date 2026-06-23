import { createBaseScene } from "../baseScene.js";

export function createMarketAwningsScene() {
  const scene = createBaseScene({
    id: "chapter-one/market-awnings",
    title: "Market Awnings",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 425;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 875, moonY: 150, cloudDrift: 0.76, hillOffset: 18, ridgeOffset: 42 };
  scene.marketAwnings = {
    x: 1160,
    groundY: 630,
    fixed: false,
    stalls: [
      { x: 870, color: "#7b4f50", barrelX: 760 },
      { x: 1160, color: "#6f5b43", barrelX: 1288 },
      { x: 1450, color: "#4f6570", barrelX: 1546 }
    ]
  };
  scene.layers = {
    trees: [
      { x: 120, y: 286, scale: 1.46 },
      { x: 580, y: 304, scale: 1.36 },
      { x: 1690, y: 284, scale: 1.48 },
      { x: 2090, y: 296, scale: 1.4 }
    ],
    cottages: [
      { x: 420, y: 536, scale: 1.88, lit: true },
      { x: 1880, y: 534, scale: 1.98, lit: false }
    ],
    foliage: [
      { kind: "glowfenLeafLitter", x: 700, groundY: 682, height: 88, alpha: 0.7 },
      { kind: "rainyRocksReeds", x: 1600, groundY: 660, height: 102, alpha: 0.72 }
    ],
    lamps: [
      { x: 250, y: 560, lit: true },
      { x: 720, y: 560, lit: false },
      { x: 1600, y: 560, lit: false },
      { x: 2030, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2070, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 930, y: 624, kind: "coil" },
      { x: 1380, y: 626, kind: "seed" }
    ],
    puddles: [
      { x: 360, y: 664, width: 126, height: 20 },
      { x: 1140, y: 662, width: 226, height: 22 },
      { x: 1905, y: 660, width: 140, height: 18 }
    ],
    mistBands: [
      { x: 150, y: 502, width: 250, speed: 10 },
      { x: 850, y: 448, width: 330, speed: 11 },
      { x: 1580, y: 514, width: 300, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "market-awnings",
      kind: "path-puzzle",
      puzzleTheme: "water-routing",
      x: 1160,
      y: 545,
      radius: 270,
      complete: false,
      progress: 0,
      scanText: "Robot scan: market awnings are dumping rain into the stalls.",
      puzzleText: "Rotate the runoff paths to drain the awnings into barrels.",
      rewardText: "Market awnings restored. Rain slides neatly away from the stalls.",
      onwardText: "The market can open without soggy baskets.",
      nextText: "Old Footbridge is next.",
      nextSceneId: "chapter-one/old-footbridge",
      reactions: [
        { text: "The stalls are dry!", x: 1160, y: 318 },
        { text: "Runoff behaving politely.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Current forecast: wet apples, wetter bread." },
        puzzle: { speaker: "player", text: "Tilt the cloth toward the barrels." },
        reward: { speaker: "robot", text: "Runoff behaving politely." },
        next: { speaker: "player", text: "Let's check the old footbridge." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
