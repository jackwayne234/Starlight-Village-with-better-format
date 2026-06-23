import { createBaseScene } from "../baseScene.js";

export function createWindChimePassScene() {
  const scene = createBaseScene({
    id: "chapter-four/wind-chime-pass",
    title: "Wind Chime Pass",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1015, moonY: 128, cloudDrift: 1.5, hillOffset: 136, ridgeOffset: 178 };
  scene.windChimePass = {
    x: 1120,
    groundY: 654,
    fixed: false,
    chimesCalm: false
  };
  scene.paintedLandmark = {
    sprite: "windChimePass",
    state: scene.windChimePass,
    x: 1120,
    groundY: 666,
    height: 438,
    glow: { heightRatio: 0.46, radius: 215, fixedIntensity: 0.34, dimIntensity: 0.1, pulse: 0.05 }
  };
  scene.layers = {
    trees: [
      { x: 75, y: 286, scale: 1.56 },
      { x: 340, y: 270, scale: 1.64 },
      { x: 690, y: 304, scale: 1.46 },
      { x: 1515, y: 292, scale: 1.54 },
      { x: 1825, y: 274, scale: 1.62 },
      { x: 2080, y: 306, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 340, y: 560, lit: true },
      { x: 800, y: 560, lit: false },
      { x: 1450, y: 560, lit: false },
      { x: 1990, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 138, y: 640, active: true },
      { x: 2050, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 650, groundY: 670, height: 112, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1548, groundY: 668, height: 122, alpha: 0.74 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 275, y: 662, width: 164, height: 20 },
      { x: 1120, y: 668, width: 360, height: 24 },
      { x: 1900, y: 661, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 125, y: 420, width: 440, speed: 18 },
      { x: 760, y: 380, width: 510, speed: 21 },
      { x: 1415, y: 462, width: 410, speed: 19 }
    ]
  };

  scene.repairs = [
    {
      id: "wind-chime-pass",
      kind: "path-puzzle",
      puzzleTheme: "beacon-signal",
      x: 1120,
      y: 520,
      radius: 252,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: pass chimes are catching every gust at once.",
      puzzleText: "Rotate the signal paths until the chimes answer in order.",
      rewardText: "Wind Chime Pass restored. The gusts soften into a clear route tone.",
      onwardText: "The chimes are calm.",
      nextText: "Lightning Rod Field is next.",
      nextSceneId: "chapter-four/lightning-rod-field",
      reactions: [
        { text: "The chimes sound steady!", x: 1120, y: 300 },
        { text: "Gust pattern stabilized.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The chimes are all ringing over each other." },
        puzzle: { speaker: "player", text: "Set the route so the wind can pass through cleanly." },
        reward: { speaker: "robot", text: "Gust pattern stabilized." },
        next: { speaker: "player", text: "Lightning Rod Field is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
