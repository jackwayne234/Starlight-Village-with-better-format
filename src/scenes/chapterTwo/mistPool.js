import { createBaseScene } from "../baseScene.js";

export function createMistPoolScene() {
  const scene = createBaseScene({
    id: "chapter-two/mist-pool",
    title: "Mist Pool",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 980, moonY: 140, cloudDrift: 1.12, hillOffset: 64, ridgeOffset: 100 };
  scene.mistPool = {
    x: 1160,
    groundY: 652,
    fixed: false,
    mistThin: false
  };
  scene.layers = {
    trees: [
      { x: 55, y: 264, scale: 1.62 },
      { x: 250, y: 303, scale: 1.44 },
      { x: 640, y: 278, scale: 1.56 },
      { x: 1545, y: 292, scale: 1.5 },
      { x: 2055, y: 270, scale: 1.58 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenBridgeReeds", x: 730, groundY: 654, height: 150, alpha: 0.9 },
      { kind: "glowfenGlowRocks", x: 940, groundY: 654, height: 124, alpha: 0.82 },
      { kind: "glowfenLeafLitter", x: 1380, groundY: 692, height: 110, alpha: 0.82 },
      { kind: "glowfenBridgeReeds", x: 1640, groundY: 654, height: 150, alpha: 0.9 }
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
      id: "mist-pool",
      kind: "path-puzzle",
      puzzleTheme: "storm-gauge",
      x: 1160,
      y: 552,
      radius: 275,
      complete: false,
      progress: 0,
      scanText: "Robot scan: mist vents are cold and clogged.",
      puzzleText: "Rotate the vent paths to warm the stones and thin the mist.",
      rewardText: "Mist pool restored. Warm stones thin the fog and reveal the path.",
      onwardText: "The mist is low enough to see the way.",
      nextText: "Moss Gate is next.",
      nextSceneId: "chapter-two/moss-gate",
      reactions: [
        { text: "The path is visible!", x: 1160, y: 318 },
        { text: "Mist density acceptable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The mist is confidently hiding everything." },
        puzzle: { speaker: "player", text: "Warm the vents and let the path breathe." },
        reward: { speaker: "robot", text: "Mist density acceptable." },
        next: { speaker: "player", text: "Moss Gate is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
