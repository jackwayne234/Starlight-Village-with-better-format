import { createBaseScene } from "../baseScene.js";

export function createCraneHookYardScene() {
  const scene = createBaseScene({
    id: "chapter-three/crane-hook-yard",
    title: "Crane Hook Yard",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 960, moonY: 138, cloudDrift: 1.06, hillOffset: 52, ridgeOffset: 78 };
  scene.craneHookYard = { x: 1160, groundY: 654, fixed: false, beamLifted: false };
  scene.layers = {
    trees: [
      { x: 65, y: 282, scale: 1.54 },
      { x: 280, y: 314, scale: 1.36 },
      { x: 760, y: 292, scale: 1.48 },
      { x: 1535, y: 276, scale: 1.56 },
      { x: 2010, y: 310, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 345, y: 560, lit: true },
      { x: 780, y: 560, lit: false },
      { x: 1540, y: 560, lit: false },
      { x: 1980, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 875, y: 638, active: false },
      { x: 1455, y: 638, active: false },
      { x: 2040, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 735, groundY: 670, height: 124, alpha: 0.88 },
      { kind: "mosslinePuddleGround", x: 1300, groundY: 696, height: 116, alpha: 0.8 },
      { kind: "mosslineSwitchFoliage", x: 1540, groundY: 670, height: 126, alpha: 0.88 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 255, y: 662, width: 160, height: 18 },
      { x: 1160, y: 668, width: 460, height: 30 },
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
      id: "crane-hook-yard",
      kind: "path-puzzle",
      puzzleTheme: "rail-signal",
      x: 1160,
      y: 532,
      radius: 292,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: crane hook controls are offline and a beam is blocking the rail.",
      puzzleText: "Route the crane signal to lift the beam clear.",
      rewardText: "Crane Hook Yard restored. The hook lifts the beam and the rail opens.",
      onwardText: "The crane beam is clear.",
      nextText: "Sparking Relay Shed is next.",
      nextSceneId: "chapter-three/sparking-relay-shed",
      reactions: [
        { text: "Beam is up!", x: 1160, y: 300 },
        { text: "Crane signal stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "That beam is less fallen than committed to the bit." },
        puzzle: { speaker: "player", text: "Power the crane and lift it clean." },
        reward: { speaker: "robot", text: "Crane signal stable." },
        next: { speaker: "player", text: "Sparking Relay Shed is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
