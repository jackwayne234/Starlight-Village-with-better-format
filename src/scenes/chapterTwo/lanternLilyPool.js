import { createBaseScene } from "../baseScene.js";

export function createLanternLilyPoolScene() {
  const scene = createBaseScene({
    id: "chapter-two/lantern-lily-pool",
    title: "Lantern Lily Pool",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 970, moonY: 138, cloudDrift: 1.02, hillOffset: 58, ridgeOffset: 92 };
  scene.lanternLilyPool = {
    x: 1160,
    groundY: 652,
    fixed: false,
    liliesLit: false
  };
  scene.paintedLandmark = {
    sprite: "lanternLilyPool",
    state: scene.lanternLilyPool,
    x: 1160,
    groundY: 672,
    height: 500,
    glow: { heightRatio: 0.48, radius: 165, fixedIntensity: 0.42, dimIntensity: 0.16, pulse: 0.06 }
  };
  scene.layers = {
    trees: [
      { x: 50, y: 264, scale: 1.62 },
      { x: 250, y: 302, scale: 1.44 },
      { x: 620, y: 278, scale: 1.56 },
      { x: 1540, y: 292, scale: 1.5 },
      { x: 2060, y: 270, scale: 1.58 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenBridgeReeds", x: 760, groundY: 654, height: 145, alpha: 0.9 },
      { kind: "glowfenLeafLitter", x: 970, groundY: 692, height: 110, alpha: 0.82 },
      { kind: "glowfenGlowRocks", x: 1450, groundY: 654, height: 128, alpha: 0.86 },
      { kind: "glowfenBridgeReeds", x: 1620, groundY: 654, height: 142, alpha: 0.88 }
    ],
    lamps: [
      { x: 300, y: 560, lit: true },
      { x: 760, y: 560, lit: false },
      { x: 1560, y: 560, lit: false },
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
      { x: 790, y: 526, width: 330, speed: 10 },
      { x: 1430, y: 496, width: 290, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "lantern-lily-pool",
      kind: "path-puzzle",
      puzzleTheme: "glow-bridge",
      x: 1160,
      y: 552,
      radius: 275,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: lantern lilies are not carrying light across the pool.",
      puzzleText: "Rotate the lily paths to carry glow across the water.",
      rewardText: "Lantern lily pool restored. Light steps across the dark water.",
      onwardText: "The pool crossing is glowing again.",
      nextText: "Bog Bridge is next.",
      nextSceneId: "chapter-two/bog-bridge",
      reactions: [
        { text: "The lilies are lit!", x: 1160, y: 318 },
        { text: "Glow crossing stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The lilies forgot how to pass the glow along." },
        puzzle: { speaker: "player", text: "One quiet light at a time across the pool." },
        reward: { speaker: "robot", text: "Glow crossing stable." },
        next: { speaker: "player", text: "Bog Bridge is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
