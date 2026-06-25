import { createBaseScene } from "../baseScene.js";

export function createSparkingRelayShedScene() {
  const scene = createBaseScene({
    id: "chapter-three/sparking-relay-shed",
    title: "Sparking Relay Shed",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 952, moonY: 136, cloudDrift: 1.08, hillOffset: 54, ridgeOffset: 76 };
  scene.sparkingRelayShed = { x: 1160, groundY: 654, fixed: false, sparksCalmed: false };
  scene.layers = {
    trees: [
      { x: 68, y: 282, scale: 1.54 },
      { x: 285, y: 314, scale: 1.36 },
      { x: 755, y: 292, scale: 1.48 },
      { x: 1530, y: 276, scale: 1.56 },
      { x: 2010, y: 310, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 345, y: 560, lit: true },
      { x: 780, y: 560, lit: false },
      { x: 1535, y: 560, lit: false },
      { x: 1985, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 870, y: 638, active: false },
      { x: 1448, y: 638, active: false },
      { x: 2045, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 720, groundY: 670, height: 124, alpha: 0.88 },
      { kind: "mosslinePuddleGround", x: 1265, groundY: 696, height: 122, alpha: 0.82 },
      { kind: "mosslineSwitchFoliage", x: 1555, groundY: 670, height: 126, alpha: 0.88 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 255, y: 662, width: 160, height: 18 },
      { x: 1160, y: 670, width: 500, height: 32 },
      { x: 1845, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 170, y: 430, width: 315, speed: 8 },
      { x: 800, y: 398, width: 385, speed: 12 },
      { x: 1410, y: 470, width: 345, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "sparking-relay-shed",
      kind: "path-puzzle",
      puzzleTheme: "storm-gauge",
      puzzleLayout: "ch3-sparking-relay-shed",
      x: 1160,
      y: 536,
      radius: 292,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: relay sparks are jumping toward the puddles.",
      puzzleText: "Route power through the dry relays before the circuit closes.",
      rewardText: "Sparking Relay Shed restored. The relay board settles and power avoids the water.",
      onwardText: "The relay shed is calm.",
      nextText: "Rain-Slick Rails are next.",
      nextSceneId: "chapter-three/rain-slick-rails",
      reactions: [
        { text: "Sparks are calm!", x: 1160, y: 302 },
        { text: "Dry route confirmed.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "That board is sharing electricity with the puddles. Rude and unsafe." },
        puzzle: { speaker: "player", text: "Send the power through the dry relays." },
        reward: { speaker: "robot", text: "Dry route confirmed." },
        next: { speaker: "player", text: "Rain-Slick Rails are next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
