import { createBaseScene } from "../baseScene.js";

export function createGlowfenFerryScene() {
  const scene = createBaseScene({
    id: "chapter-two/glowfen-ferry",
    title: "Glowfen Ferry",
    worldWidth: 2260,
    startMessage: ""
  });

  scene.player.x = 305;
  scene.robot.x = 415;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 970, moonY: 138, cloudDrift: 1.08, hillOffset: 66, ridgeOffset: 100 };
  scene.glowfenFerry = { x: 1180, groundY: 652, fixed: false, ferryDocked: false };
  scene.layers = {
    trees: [
      { x: 65, y: 272, scale: 1.58 },
      { x: 285, y: 306, scale: 1.36 },
      { x: 655, y: 284, scale: 1.48 },
      { x: 1605, y: 296, scale: 1.46 },
      { x: 2115, y: 270, scale: 1.62 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenBridgeReeds", x: 790, groundY: 655, height: 144, alpha: 0.86 },
      { kind: "rainyRocksReeds", x: 935, groundY: 660, height: 118, alpha: 0.88 },
      { kind: "glowfenLeafLitter", x: 1115, groundY: 673, height: 114, alpha: 0.82 },
      { kind: "rainyRocksReeds", x: 1450, groundY: 661, height: 120, alpha: 0.88 },
      { kind: "glowfenBridgeReeds", x: 1605, groundY: 656, height: 146, alpha: 0.86 }
    ],
    lamps: [
      { x: 270, y: 560, lit: true },
      { x: 820, y: 560, lit: false },
      { x: 1545, y: 560, lit: false },
      { x: 2040, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 145, y: 640, active: true },
      { x: 760, y: 636, active: false },
      { x: 1645, y: 637, active: false },
      { x: 1985, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 900, y: 624, kind: "coil" },
      { x: 1465, y: 626, kind: "gear" }
    ],
    puddles: [
      { x: 380, y: 664, width: 132, height: 20 },
      { x: 1180, y: 666, width: 540, height: 32 },
      { x: 1875, y: 660, width: 144, height: 18 }
    ],
    mistBands: [
      { x: 155, y: 506, width: 260, speed: 8 },
      { x: 845, y: 528, width: 320, speed: 10 },
      { x: 1475, y: 502, width: 320, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "glowfen-ferry",
      kind: "path-puzzle",
      puzzleTheme: "rail-signal",
      x: 1180,
      y: 548,
      radius: 282,
      complete: false,
      progress: 0,
      scanText: "Robot scan: ferry pulley line is slack and the platform has drifted out.",
      puzzleText: "Route power through the pulley posts to pull the ferry home.",
      rewardText: "Glowfen Ferry restored. The rope tightens and the crossing lanterns wake.",
      onwardText: "The ferry is docked.",
      nextText: "Reedwatch Bank is next.",
      nextSceneId: "chapter-two/reedwatch-bank",
      reactions: [
        { text: "Ferry's back!", x: 1180, y: 314 },
        { text: "Pulley tension stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The ferry is technically present, just emotionally distant." },
        puzzle: { speaker: "player", text: "Pull power through the posts and bring it back." },
        reward: { speaker: "robot", text: "Pulley tension stable." },
        next: { speaker: "player", text: "Reedwatch Bank is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
