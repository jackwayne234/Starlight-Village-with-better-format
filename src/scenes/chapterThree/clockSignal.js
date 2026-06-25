import { createBaseScene } from "../baseScene.js";

export function createClockSignalScene() {
  const scene = createBaseScene({
    id: "chapter-three/clock-signal",
    title: "Clock Signal",
    worldWidth: 2260,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 840, moonY: 138, cloudDrift: 0.78, hillOffset: 50, ridgeOffset: 78 };
  scene.clockSignal = {
    x: 1160,
    groundY: 642,
    fixed: false,
    clockSynced: false
  };
  scene.paintedLandmark = {
    source: "chapterThreeLandmarks",
    sprite: "clockSignalSide",
    state: scene.clockSignal,
    x: 1160,
    groundY: 704,
    height: 470,
    dimFilter: "brightness(0.76) saturate(0.9)",
    fixedFilter: "brightness(0.96) saturate(1.05)",
    glow: {
      xOffset: 0,
      heightRatio: 0.56,
      radius: 190,
      dimIntensity: 0.08,
      fixedIntensity: 0.32,
      pulse: 0.04
    }
  };
  scene.layers = {
    trees: [
      { x: 78, y: 286, scale: 1.52 },
      { x: 310, y: 314, scale: 1.36 },
      { x: 690, y: 292, scale: 1.46 },
      { x: 1530, y: 284, scale: 1.5 },
      { x: 1900, y: 308, scale: 1.38 },
      { x: 2140, y: 292, scale: 1.48 }
    ],
    cottages: [],
    lamps: [
      { x: 330, y: 560, lit: true },
      { x: 815, y: 560, lit: false },
      { x: 1500, y: 560, lit: false },
      { x: 2010, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 150, y: 640, active: true },
      { x: 900, y: 638, active: false },
      { x: 1460, y: 638, active: false },
      { x: 2090, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 650, groundY: 672, height: 126, alpha: 0.88 },
      { kind: "mosslinePuddleGround", x: 1305, groundY: 696, height: 126, alpha: 0.78 },
      { kind: "mosslineSwitchFoliage", x: 1605, groundY: 672, height: 124, alpha: 0.88 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 270, y: 662, width: 150, height: 18 },
      { x: 1160, y: 668, width: 430, height: 28 },
      { x: 1855, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 150, y: 426, width: 310, speed: 8 },
      { x: 805, y: 396, width: 400, speed: 11 },
      { x: 1450, y: 466, width: 350, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "clock-signal",
      kind: "path-puzzle",
      puzzleTheme: "rail-signal",
      puzzleLayout: "ch3-clock-signal",
      x: 1160,
      y: 528,
      radius: 286,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the station clock is pulsing out of time with the rail signal.",
      puzzleText: "Rotate the signal paths until the clock pulse reaches every lamp in rhythm.",
      rewardText: "Clock Signal restored. The wet station clock and rail lamps pulse together.",
      onwardText: "The clock is keeping safe time again.",
      nextText: "Last Platform is next.",
      nextSceneId: "chapter-three/last-platform",
      reactions: [
        { text: "The clock found the beat!", x: 1160, y: 292 },
        { text: "Signal rhythm stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The clock is ticking, but the rails are listening half a beat late." },
        puzzle: { speaker: "player", text: "Match the pulse before the next signal changes." },
        reward: { speaker: "robot", text: "Clock pulse synced with the rail lamps." },
        next: { speaker: "player", text: "Last Platform is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
