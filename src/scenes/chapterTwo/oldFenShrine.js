import { createBaseScene } from "../baseScene.js";

export function createOldFenShrineScene() {
  const scene = createBaseScene({
    id: "chapter-two/old-fen-shrine",
    title: "Old Fen Shrine",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 410;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 920, moonY: 132, cloudDrift: 0.95, hillOffset: 70, ridgeOffset: 104 };
  scene.oldFenShrine = { x: 1160, groundY: 650, fixed: false, bowlsAligned: false };
  scene.paintedLandmark = {
    source: "chapterTwoLandmarks",
    sprite: "rainBowlMarker",
    state: scene.oldFenShrine,
    x: 1160,
    groundY: 744,
    height: 405,
    wetlandBlend: { yOffset: -50, widthRatio: 0.72, height: 120 },
    glow: { xOffset: 0, heightRatio: 0.56, radius: 185, fixedIntensity: 0.38, dimIntensity: 0.13, pulse: 0.05 }
  };
  scene.layers = {
    trees: [
      { x: 80, y: 272, scale: 1.58 },
      { x: 315, y: 312, scale: 1.36 },
      { x: 700, y: 284, scale: 1.5 },
      { x: 1580, y: 294, scale: 1.48 },
      { x: 2085, y: 272, scale: 1.6 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenBridgeReeds", x: 820, groundY: 657, height: 136, alpha: 0.84 },
      { kind: "rainyRocksReeds", x: 1010, groundY: 660, height: 124, alpha: 0.9 },
      { kind: "glowfenLeafLitter", x: 1170, groundY: 674, height: 118, alpha: 0.84 },
      { kind: "rainyRocksReeds", x: 1325, groundY: 660, height: 126, alpha: 0.9 },
      { kind: "glowfenBridgeReeds", x: 1515, groundY: 657, height: 138, alpha: 0.84 }
    ],
    lamps: [
      { x: 260, y: 560, lit: true },
      { x: 775, y: 560, lit: false },
      { x: 1548, y: 560, lit: false },
      { x: 2035, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 135, y: 640, active: true },
      { x: 935, y: 635, active: false },
      { x: 1395, y: 636, active: false },
      { x: 1990, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 415, y: 664, width: 132, height: 20 },
      { x: 1160, y: 668, width: 300, height: 26 },
      { x: 1870, y: 660, width: 148, height: 18 }
    ],
    mistBands: [
      { x: 175, y: 506, width: 265, speed: 8 },
      { x: 865, y: 528, width: 325, speed: 10 },
      { x: 1450, y: 506, width: 305, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "old-fen-shrine",
      kind: "path-puzzle",
      puzzleTheme: "beacon-signal",
      puzzleLayout: "ch2-old-fen-shrine",
      x: 1160,
      y: 548,
      radius: 270,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: fen shrine rain bowls are out of alignment.",
      puzzleText: "Rotate the signal paths to align the rain bowls.",
      rewardText: "Old fen shrine restored. Rain rings the stones in a clear bright pattern.",
      onwardText: "The rain bowls are aligned.",
      nextText: "Glowfen Ferry is next.",
      nextSceneId: "chapter-two/glowfen-ferry",
      reactions: [
        { text: "The shrine is ringing!", x: 1160, y: 316 },
        { text: "Rain tone stabilized.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The bowls should sing, but they are catching rain sideways." },
        puzzle: { speaker: "player", text: "Line the paths up so each drop reaches a stone." },
        reward: { speaker: "robot", text: "Rain tone stabilized." },
        next: { speaker: "player", text: "Glowfen Ferry is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
