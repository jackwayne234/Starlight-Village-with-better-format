import { createBaseScene } from "../baseScene.js";

export function createSignalArmRowScene() {
  const scene = createBaseScene({
    id: "chapter-three/signal-arm-row",
    title: "Signal Arm Row",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 955, moonY: 140, cloudDrift: 1.03, hillOffset: 48, ridgeOffset: 70 };
  scene.signalArmRow = { x: 1160, groundY: 654, fixed: false, armsAligned: false };
  scene.layers = {
    trees: [
      { x: 75, y: 280, scale: 1.54 },
      { x: 280, y: 314, scale: 1.36 },
      { x: 790, y: 292, scale: 1.48 },
      { x: 1510, y: 276, scale: 1.56 },
      { x: 1990, y: 310, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 350, y: 560, lit: true },
      { x: 760, y: 560, lit: false },
      { x: 1160, y: 560, lit: false },
      { x: 1560, y: 560, lit: false },
      { x: 1970, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 875, y: 638, active: false },
      { x: 1435, y: 638, active: false },
      { x: 2040, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 735, groundY: 670, height: 124, alpha: 0.9 },
      { kind: "mosslineConduitCoils", x: 1030, groundY: 682, height: 112, alpha: 0.88 },
      { kind: "mosslinePuddleGround", x: 1260, groundY: 696, height: 116, alpha: 0.8 },
      { kind: "mosslineSwitchFoliage", x: 1540, groundY: 670, height: 126, alpha: 0.9 }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 905, y: 624, kind: "gear" },
      { x: 1165, y: 626, kind: "coil" },
      { x: 1430, y: 624, kind: "seed" }
    ],
    puddles: [
      { x: 255, y: 662, width: 160, height: 18 },
      { x: 1160, y: 668, width: 470, height: 30 },
      { x: 1835, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 170, y: 430, width: 315, speed: 8 },
      { x: 800, y: 398, width: 385, speed: 12 },
      { x: 1410, y: 470, width: 345, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "signal-arm-row",
      kind: "path-puzzle",
      puzzleTheme: "beacon-signal",
      x: 1160,
      y: 536,
      radius: 286,
      complete: false,
      progress: 0,
      scanText: "Robot scan: signal arms are pointing in unsafe storm patterns.",
      puzzleText: "Rotate the signal paths until the row shows the clear pattern.",
      rewardText: "Signal Arm Row restored. The arms swing into a bright safe signal.",
      onwardText: "The safe signal is set.",
      nextText: "Conductor Booth is next.",
      nextSceneId: "chapter-three/conductor-booth",
      reactions: [
        { text: "Safe signal set!", x: 1160, y: 304 },
        { text: "Semaphore pattern clean.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "These signal arms are arguing with the weather." },
        puzzle: { speaker: "player", text: "Set them all to the clear pattern." },
        reward: { speaker: "robot", text: "Semaphore pattern clean." },
        next: { speaker: "player", text: "Conductor Booth is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
