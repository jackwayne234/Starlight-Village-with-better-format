import { createBaseScene } from "../baseScene.js";

export function createFrogsongLockScene() {
  const scene = createBaseScene({
    id: "chapter-two/frogsong-lock",
    title: "Frogsong Lock",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 930, moonY: 142, cloudDrift: 1.0, hillOffset: 60, ridgeOffset: 94 };
  scene.frogsongLock = {
    x: 1160,
    groundY: 652,
    fixed: false,
    gateOpen: false
  };
  scene.paintedLandmark = {
    sprite: "frogsongLock",
    state: scene.frogsongLock,
    x: 1160,
    groundY: 674,
    height: 500,
    glow: { heightRatio: 0.48, radius: 168, fixedIntensity: 0.42, dimIntensity: 0.16, pulse: 0.06 }
  };
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
      { kind: "glowfenBridgeReeds", x: 720, groundY: 654, height: 156, alpha: 0.92 },
      { kind: "glowfenGlowRocks", x: 960, groundY: 654, height: 124, alpha: 0.82 },
      { kind: "glowfenLeafLitter", x: 1360, groundY: 692, height: 110, alpha: 0.82 },
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
    repairParts: [],
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
      id: "frogsong-lock",
      kind: "path-puzzle",
      puzzleTheme: "root-pump",
      x: 1160,
      y: 552,
      radius: 275,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: frogsong lock is out of tune.",
      puzzleText: "Rotate the living paths to wake the call stones.",
      rewardText: "Frogsong lock restored. The reed gate opens with a low bright hum.",
      onwardText: "The reed gate is listening again.",
      nextText: "Sunken Signpost is next.",
      nextSceneId: "chapter-two/sunken-signpost",
      reactions: [
        { text: "The reed gate opened!", x: 1160, y: 318 },
        { text: "Call stones tuned.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The frogsong pattern is charmingly incorrect." },
        puzzle: { speaker: "player", text: "Tune the stones until the reeds answer." },
        reward: { speaker: "robot", text: "Call stones tuned. Gate response friendly." },
        next: { speaker: "player", text: "Sunken Signpost is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
