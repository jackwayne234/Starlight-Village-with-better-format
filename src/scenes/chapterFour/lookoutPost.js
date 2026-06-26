import { createBaseScene } from "../baseScene.js";

export function createLookoutPostScene() {
  const scene = createBaseScene({
    id: "chapter-four/lookout-post",
    title: "Lookout Post",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 990, moonY: 126, cloudDrift: 1.58, hillOffset: 142, ridgeOffset: 184 };
  scene.lookoutPost = {
    x: 1120,
    groundY: 660,
    fixed: false,
    scopeAligned: false
  };
  scene.spriteLandmark = {
    source: "chapterFourLandmarks",
    sprite: "lookoutPost",
    state: scene.lookoutPost,
    x: 1120,
    groundY: 668,
    height: 430,
    glow: { heightRatio: 0.4, radius: 220, fixedIntensity: 0.34, dimIntensity: 0.1, pulse: 0.05 },
    dimFilter: "brightness(0.72) saturate(0.88)",
    fixedFilter: "brightness(0.94) saturate(1.04)"
  };
  scene.layers = {
    trees: [
      { x: 80, y: 286, scale: 1.54 },
      { x: 350, y: 266, scale: 1.64 },
      { x: 700, y: 304, scale: 1.46 },
      { x: 1510, y: 292, scale: 1.52 },
      { x: 1840, y: 274, scale: 1.62 },
      { x: 2085, y: 306, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 335, y: 560, lit: true },
      { x: 795, y: 560, lit: false },
      { x: 1465, y: 560, lit: false },
      { x: 1995, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 142, y: 640, active: true },
      { x: 2052, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 640, groundY: 670, height: 120, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1568, groundY: 670, height: 128, alpha: 0.76 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 270, y: 662, width: 166, height: 20 },
      { x: 1120, y: 668, width: 340, height: 24 },
      { x: 1900, y: 661, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 130, y: 422, width: 430, speed: 18 },
      { x: 760, y: 382, width: 510, speed: 21 },
      { x: 1415, y: 462, width: 420, speed: 19 }
    ]
  };

  scene.repairs = [
    {
      id: "lookout-post",
      kind: "path-puzzle",
      puzzleTheme: "archive-lens",
      puzzleLayout: "ch4-lookout-post",
      x: 1120,
      y: 500,
      radius: 252,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the lookout scope is pointed into rain glare instead of the beacon line.",
      puzzleText: "Rotate the lens paths until the lookout scope catches the beacon tower.",
      rewardText: "Lookout Post restored. The beacon tower glimmers through the rain.",
      onwardText: "The scope is aligned.",
      nextText: "Cracked Stair is next.",
      nextSceneId: "chapter-four/cracked-stair",
      reactions: [
        { text: "I can see the beacon!", x: 1120, y: 286 },
        { text: "Scope alignment stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The scope is catching only rain glare." },
        puzzle: { speaker: "player", text: "Line up the lenses until the beacon shows through." },
        reward: { speaker: "robot", text: "Scope alignment stable." },
        next: { speaker: "player", text: "Cracked Stair is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
