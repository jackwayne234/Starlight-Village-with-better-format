import { createBaseScene } from "../baseScene.js";

export function createBogBridgeScene() {
  const scene = createBaseScene({
    id: "chapter-two/bog-bridge",
    title: "Bog Bridge",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1040, moonY: 140, cloudDrift: 1.08, hillOffset: 62, ridgeOffset: 98 };
  scene.bogBridge = {
    x: 1160,
    groundY: 652,
    fixed: false,
    stonesRaised: false
  };
  scene.layers = {
    trees: [
      { x: 55, y: 264, scale: 1.62 },
      { x: 265, y: 303, scale: 1.44 },
      { x: 650, y: 278, scale: 1.56 },
      { x: 1545, y: 292, scale: 1.5 },
      { x: 2075, y: 270, scale: 1.58 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenBridgeReeds", x: 730, groundY: 654, height: 150, alpha: 0.92 },
      { kind: "glowfenLeafLitter", x: 990, groundY: 692, height: 110, alpha: 0.82 },
      { kind: "glowfenGlowRocks", x: 1450, groundY: 654, height: 128, alpha: 0.86 },
      { kind: "glowfenBridgeReeds", x: 1660, groundY: 654, height: 146, alpha: 0.88 }
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
    brokenBranches: [
      { x: 1010, y: 636, scale: 0.68 }
    ],
    repairParts: [
      { x: 910, y: 624, kind: "seed" },
      { x: 1400, y: 626, kind: "gear" }
    ],
    puddles: [
      { x: 330, y: 664, width: 132, height: 20 },
      { x: 1900, y: 660, width: 146, height: 18 }
    ],
    mistBands: [
      { x: 160, y: 505, width: 270, speed: 8 },
      { x: 800, y: 526, width: 340, speed: 10 },
      { x: 1440, y: 496, width: 300, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "bog-bridge",
      kind: "path-puzzle",
      puzzleTheme: "glow-bridge",
      x: 1160,
      y: 552,
      radius: 275,
      complete: false,
      progress: 0,
      scanText: "Robot scan: bog bridge stones are sunk too low.",
      puzzleText: "Rotate the bridge paths to raise the stepping stones.",
      rewardText: "Bog bridge restored. The stones rise into a safe crossing.",
      onwardText: "The bog crossing is steady.",
      nextText: "Frogsong Lock is next.",
      nextSceneId: "chapter-two/frogsong-lock",
      reactions: [
        { text: "The stones came up!", x: 1160, y: 318 },
        { text: "Bog crossing stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "These stones are technically bridges, emotionally puddles." },
        puzzle: { speaker: "player", text: "Raise them one by one until the path holds." },
        reward: { speaker: "robot", text: "Bog crossing stable." },
        next: { speaker: "player", text: "Frogsong Lock is ahead." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
