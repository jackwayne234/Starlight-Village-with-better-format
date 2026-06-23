import { createBaseScene } from "../baseScene.js";

export function createMossGateScene() {
  const scene = createBaseScene({
    id: "chapter-two/moss-gate",
    title: "Moss Gate",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 940, moonY: 142, cloudDrift: 1.02, hillOffset: 62, ridgeOffset: 96 };
  scene.mossGate = { x: 1160, groundY: 652, fixed: false, gateOpen: false };
  scene.layers = {
    trees: [
      { x: 55, y: 264, scale: 1.62 },
      { x: 245, y: 303, scale: 1.44 },
      { x: 630, y: 278, scale: 1.56 },
      { x: 1545, y: 292, scale: 1.5 },
      { x: 2055, y: 270, scale: 1.58 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenPumpOvergrowth", x: 1120, groundY: 668, height: 230, alpha: 0.72 },
      { kind: "glowfenRootChannel", x: 900, groundY: 676, height: 150, alpha: 0.9 },
      { kind: "glowfenRootChannel", x: 1410, groundY: 676, height: 150, alpha: 0.9 },
      { kind: "glowfenBridgeReeds", x: 760, groundY: 654, height: 142, alpha: 0.88 },
      { kind: "glowfenBridgeReeds", x: 1640, groundY: 654, height: 142, alpha: 0.88 }
    ],
    lamps: [
      { x: 300, y: 560, lit: true },
      { x: 760, y: 560, lit: false },
      { x: 1580, y: 560, lit: false },
      { x: 2040, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 140, y: 640, active: true },
      { x: 1980, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 920, y: 624, kind: "seed" },
      { x: 1390, y: 626, kind: "coil" }
    ],
    puddles: [
      { x: 330, y: 664, width: 132, height: 20 },
      { x: 1900, y: 660, width: 146, height: 18 }
    ],
    mistBands: [
      { x: 160, y: 505, width: 270, speed: 8 },
      { x: 805, y: 526, width: 340, speed: 10 },
      { x: 1445, y: 496, width: 300, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "moss-gate",
      kind: "path-puzzle",
      puzzleTheme: "root-pump",
      x: 1160,
      y: 552,
      radius: 275,
      complete: false,
      progress: 0,
      scanText: "Robot scan: moss gate roots are dry and locked.",
      puzzleText: "Rotate the root paths to feed glow into the gate.",
      rewardText: "Moss gate restored. Root light pulls the gate open.",
      onwardText: "The moss gate is open.",
      nextText: "Old Fen Shrine is next.",
      nextSceneId: "chapter-two/old-fen-shrine",
      reactions: [
        { text: "The gate opened!", x: 1160, y: 318 },
        { text: "Root gate responsive.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The gate roots are thirsty and dramatic." },
        puzzle: { speaker: "player", text: "Feed the roots until they loosen their grip." },
        reward: { speaker: "robot", text: "Root gate responsive." },
        next: { speaker: "player", text: "Old Fen Shrine is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
