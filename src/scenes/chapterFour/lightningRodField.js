import { createBaseScene } from "../baseScene.js";

export function createLightningRodFieldScene() {
  const scene = createBaseScene({
    id: "chapter-four/lightning-rod-field",
    title: "Lightning Rod Field",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 990, moonY: 122, cloudDrift: 1.65, hillOffset: 146, ridgeOffset: 190 };
  scene.lightningRodField = {
    x: 1120,
    groundY: 664,
    fixed: false,
    rodsGrounded: false
  };
  scene.paintedLandmark = {
    source: "chapterFourLandmarks",
    sprite: "lightningRodField",
    state: scene.lightningRodField,
    x: 1120,
    groundY: 672,
    height: 470,
    glow: { heightRatio: 0.42, radius: 230, fixedIntensity: 0.36, dimIntensity: 0.1, pulse: 0.06 }
  };
  scene.layers = {
    trees: [
      { x: 80, y: 286, scale: 1.54 },
      { x: 340, y: 266, scale: 1.64 },
      { x: 690, y: 306, scale: 1.46 },
      { x: 1520, y: 294, scale: 1.52 },
      { x: 1850, y: 274, scale: 1.62 },
      { x: 2100, y: 306, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 340, y: 560, lit: true },
      { x: 790, y: 560, lit: false },
      { x: 1475, y: 560, lit: false },
      { x: 1995, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 144, y: 640, active: true },
      { x: 2050, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 650, groundY: 670, height: 116, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1548, groundY: 668, height: 126, alpha: 0.74 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 275, y: 662, width: 164, height: 20 },
      { x: 1120, y: 668, width: 385, height: 24 },
      { x: 1900, y: 661, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 125, y: 420, width: 440, speed: 19 },
      { x: 760, y: 380, width: 520, speed: 23 },
      { x: 1415, y: 462, width: 420, speed: 20 }
    ]
  };

  scene.repairs = [
    {
      id: "lightning-rod-field",
      kind: "path-puzzle",
      puzzleTheme: "storm-gauge",
      puzzleLayout: "ch4-lightning-rod-field",
      x: 1120,
      y: 510,
      radius: 260,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the lightning rods are not sharing the charge safely.",
      puzzleText: "Rotate the storm paths until every rod grounds into the same safe route.",
      rewardText: "Lightning Rod Field restored. The next strike has a safe way into the earth.",
      onwardText: "The rods are grounded.",
      nextText: "Lookout Post is next.",
      nextSceneId: "chapter-four/lookout-post",
      reactions: [
        { text: "The rods are grounded!", x: 1120, y: 292 },
        { text: "Charge path stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The rods are holding charge in the wrong places." },
        puzzle: { speaker: "player", text: "Give the lightning one safe path down." },
        reward: { speaker: "robot", text: "Charge path stable." },
        next: { speaker: "player", text: "Lookout Post is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
