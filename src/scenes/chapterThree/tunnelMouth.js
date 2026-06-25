import { createBaseScene } from "../baseScene.js";

export function createTunnelMouthScene() {
  const scene = createBaseScene({
    id: "chapter-three/tunnel-mouth",
    title: "Tunnel Mouth",
    worldWidth: 2260,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 760, moonY: 136, cloudDrift: 0.74, hillOffset: 44, ridgeOffset: 72 };
  scene.tunnelMouth = {
    x: 1165,
    groundY: 646,
    fixed: false,
    warningLampsSafe: false
  };
  scene.paintedLandmark = {
    source: "chapterThreeLandmarks",
    sprite: "tunnelMouthSide",
    state: scene.tunnelMouth,
    x: 1165,
    groundY: 704,
    height: 500,
    dimFilter: "brightness(0.74) saturate(0.9)",
    fixedFilter: "brightness(0.94) saturate(1.04)",
    glow: {
      xOffset: 0,
      heightRatio: 0.54,
      radius: 230,
      dimIntensity: 0.08,
      fixedIntensity: 0.32,
      pulse: 0.04
    }
  };
  scene.layers = {
    trees: [
      { x: 62, y: 282, scale: 1.58 },
      { x: 258, y: 306, scale: 1.42 },
      { x: 646, y: 286, scale: 1.52 },
      { x: 1605, y: 278, scale: 1.56 },
      { x: 1935, y: 302, scale: 1.44 },
      { x: 2150, y: 292, scale: 1.5 }
    ],
    cottages: [],
    lamps: [
      { x: 330, y: 560, lit: true },
      { x: 790, y: 560, lit: false },
      { x: 1535, y: 560, lit: false },
      { x: 2005, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 150, y: 640, active: true },
      { x: 895, y: 638, active: false },
      { x: 1470, y: 638, active: false },
      { x: 2100, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 655, groundY: 672, height: 128, alpha: 0.9 },
      { kind: "mosslinePuddleGround", x: 985, groundY: 696, height: 126, alpha: 0.78 },
      { kind: "mosslineSwitchFoliage", x: 1595, groundY: 672, height: 132, alpha: 0.9 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 260, y: 662, width: 146, height: 17 },
      { x: 1135, y: 668, width: 420, height: 28 },
      { x: 1865, y: 660, width: 148, height: 17 }
    ],
    mistBands: [
      { x: 160, y: 426, width: 320, speed: 8 },
      { x: 780, y: 388, width: 430, speed: 11 },
      { x: 1430, y: 458, width: 360, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "tunnel-mouth",
      kind: "path-puzzle",
      puzzleTheme: "archive-lens",
      puzzleLayout: "ch3-tunnel-mouth",
      x: 1165,
      y: 528,
      radius: 292,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: tunnel warning lamps are blinking out of order.",
      puzzleText: "Rotate the lamp paths until the tunnel signal runs green from left to right.",
      rewardText: "Tunnel Mouth restored. The warning lamps settle into a safe green sequence.",
      onwardText: "The tunnel mouth is safe to enter.",
      nextText: "Clock Signal is next.",
      nextSceneId: "chapter-three/clock-signal",
      reactions: [
        { text: "Green lamps all the way in!", x: 1165, y: 286 },
        { text: "Tunnel signal safe.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The tunnel is open, but its warning lamps disagree about whether it is safe." },
        puzzle: { speaker: "player", text: "Line up the lamp signal before we step inside." },
        reward: { speaker: "robot", text: "Lamp sequence stable. Tunnel entry approved." },
        next: { speaker: "player", text: "Clock Signal is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
