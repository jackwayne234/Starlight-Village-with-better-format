import { createBaseScene } from "../baseScene.js";

export function createFestivalSquareScene() {
  const scene = createBaseScene({
    id: "chapter-one/festival-square",
    title: "Festival Square",
    worldWidth: 2260,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 425;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 900, moonY: 132, cloudDrift: 0.72, hillOffset: -4, ridgeOffset: 24 };
  scene.festivalSquare = {
    x: 1160,
    groundY: 630,
    fixed: false,
    starLit: false
  };
  scene.groundStyle = "festival-square";
  scene.foliageLayer = "behind-landmark";
  scene.paintedLandmark = {
    sprite: "festivalSquare",
    state: scene.festivalSquare,
    x: 1160,
    groundY: 724,
    height: 700,
    glow: { heightRatio: 0.56, radius: 180, fixedIntensity: 0.5, dimIntensity: 0.18, pulse: 0.07 }
  };
  scene.layers = {
    trees: [
      { x: 120, y: 286, scale: 1.46 },
      { x: 560, y: 304, scale: 1.38 },
      { x: 1690, y: 284, scale: 1.48 },
      { x: 2100, y: 296, scale: 1.42 }
    ],
    cottages: [],
    foliage: [
      { kind: "rainyRocksReeds", x: 140, groundY: 616, height: 112, alpha: 0.86 },
      { kind: "glowfenLeafLitter", x: 360, groundY: 618, height: 104, alpha: 0.8 },
      { kind: "rainyRocksReeds", x: 590, groundY: 608, height: 116, alpha: 0.86 },
      { kind: "glowfenLeafLitter", x: 820, groundY: 596, height: 108, alpha: 0.82 },
      { kind: "rainyRocksReeds", x: 1060, groundY: 586, height: 120, alpha: 0.88 },
      { kind: "glowfenLeafLitter", x: 1300, groundY: 586, height: 108, alpha: 0.82 },
      { kind: "rainyRocksReeds", x: 1540, groundY: 594, height: 118, alpha: 0.86 },
      { kind: "glowfenLeafLitter", x: 1770, groundY: 604, height: 108, alpha: 0.82 },
      { kind: "rainyRocksReeds", x: 2010, groundY: 598, height: 116, alpha: 0.86 },
      { kind: "glowfenLeafLitter", x: 2220, groundY: 592, height: 100, alpha: 0.78 }
    ],
    lamps: [
      { x: 250, y: 560, lit: true },
      { x: 720, y: 560, lit: false },
      { x: 1600, y: 560, lit: false },
      { x: 2030, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2050, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 360, y: 664, width: 126, height: 20 },
      { x: 1160, y: 662, width: 220, height: 22 },
      { x: 1900, y: 660, width: 138, height: 18 }
    ],
    mistBands: [
      { x: 150, y: 502, width: 250, speed: 10 },
      { x: 820, y: 448, width: 330, speed: 11 },
      { x: 1540, y: 514, width: 300, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "festival-square",
      kind: "path-puzzle",
      puzzleTheme: "market-lanterns",
      x: 1160,
      y: 460,
      radius: 275,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: festival square star lantern is dark.",
      puzzleText: "Rotate the lantern paths to power the square.",
      rewardText: "Festival square restored. The star lantern points toward Glowfen.",
      onwardText: "The village core is shining through the rain.",
      nextText: "Wetland Approach is next.",
      nextSceneId: "chapter-two/wetland-approach",
      chapterComplete: {
        title: "Chapter 1 Complete",
        subtitle: "Starlight's first lights are awake, and the first waymark toward Glowfen is lit.",
        checklist: [
          "Water wheel and workshop lift restored",
          "Rural paths, awnings, bridge, and drain secured",
          "Festival Square star lantern lit toward Glowfen"
        ],
        prompt: "Press Space to continue to Wetland Approach"
      },
      reactions: [
        { text: "The star lantern is bright!", x: 1160, y: 310 },
        { text: "Village core complete.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The square has one very important unlit star." },
        puzzle: { speaker: "player", text: "Then let's give the village a center again." },
        reward: { speaker: "robot", text: "Village core complete. The wetland approach is open." },
        next: { speaker: "player", text: "Into the wetlands, then." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
