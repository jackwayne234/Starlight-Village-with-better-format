import { createBaseScene } from "../baseScene.js";

export function createCrackedStairScene() {
  const scene = createBaseScene({
    id: "chapter-four/cracked-stair",
    title: "Cracked Stair",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1015, moonY: 124, cloudDrift: 1.62, hillOffset: 148, ridgeOffset: 190 };
  scene.crackedStair = {
    x: 1120,
    groundY: 666,
    fixed: false,
    bracesLocked: false
  };
  scene.spriteLandmark = {
    source: "chapterFourLandmarks",
    sprite: "crackedStair",
    state: scene.crackedStair,
    x: 1120,
    groundY: 668,
    height: 430,
    glow: { heightRatio: 0.42, radius: 220, fixedIntensity: 0.34, dimIntensity: 0.1, pulse: 0.05 },
    dimFilter: "brightness(0.72) saturate(0.88)",
    fixedFilter: "brightness(0.94) saturate(1.04)"
  };
  scene.layers = {
    trees: [
      { x: 72, y: 286, scale: 1.56 },
      { x: 345, y: 268, scale: 1.64 },
      { x: 700, y: 306, scale: 1.46 },
      { x: 1516, y: 292, scale: 1.52 },
      { x: 1848, y: 274, scale: 1.62 },
      { x: 2090, y: 306, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 338, y: 560, lit: true },
      { x: 792, y: 560, lit: false },
      { x: 1468, y: 560, lit: false },
      { x: 1996, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 140, y: 640, active: true },
      { x: 2050, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 636, groundY: 670, height: 118, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1570, groundY: 670, height: 128, alpha: 0.74 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 270, y: 662, width: 166, height: 20 },
      { x: 1120, y: 668, width: 382, height: 24 },
      { x: 1902, y: 661, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 130, y: 420, width: 440, speed: 19 },
      { x: 760, y: 380, width: 520, speed: 22 },
      { x: 1415, y: 462, width: 420, speed: 20 }
    ]
  };

  scene.repairs = [
    {
      id: "cracked-stair",
      kind: "path-puzzle",
      puzzleTheme: "junction-line",
      puzzleLayout: "ch4-cracked-stair",
      x: 1120,
      y: 514,
      radius: 252,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the stair braces are slipping under the rainwater.",
      puzzleText: "Rotate the brace paths until the cracked stair locks into the ridge.",
      rewardText: "Cracked Stair restored. The stone steps hold steady under the storm.",
      onwardText: "The stair is braced.",
      nextText: "Cloud Harvester is next.",
      nextSceneId: "chapter-four/cloud-harvester",
      reactions: [
        { text: "The stairs are holding!", x: 1120, y: 292 },
        { text: "Brace lock stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "These steps are sliding apart under the rain." },
        puzzle: { speaker: "player", text: "Lock the braces so the ridge path can hold." },
        reward: { speaker: "robot", text: "Brace lock stable." },
        next: { speaker: "player", text: "Cloud Harvester is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
