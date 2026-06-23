import { createBaseScene } from "../baseScene.js";

export function createStormedgeRiseScene() {
  const scene = createBaseScene({
    id: "chapter-four/stormedge-rise",
    title: "Stormedge Rise",
    worldWidth: 2050,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.backdrop = { moonX: 1080, moonY: 140, cloudDrift: 1.55, hillOffset: 86, ridgeOffset: 120 };
  scene.ridge = {
    gauge: { x: 1115, y: 576, lit: false },
    posts: [
      { x: 560, y: 522, lean: -0.16 },
      { x: 1440, y: 530, lean: 0.14 }
    ]
  };
  scene.layers = {
    trees: [
      { x: 95, y: 291, scale: 1.5 },
      { x: 345, y: 268, scale: 1.6 },
      { x: 720, y: 309, scale: 1.42 },
      { x: 1035, y: 286, scale: 1.52 },
      { x: 1360, y: 300, scale: 1.46 },
      { x: 1740, y: 280, scale: 1.55 }
    ],
    cottages: [{ x: 1680, y: 537, scale: 2.0, lit: true }],
    lamps: [
      { x: 410, y: 560, lit: true },
      { x: 925, y: 560, lit: false },
      { x: 1535, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 130, y: 640, active: true },
      { x: 1960, y: 638, active: true }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 230, y: 662, width: 220, height: 21 },
      { x: 1870, y: 660, width: 180, height: 18 }
    ],
    mistBands: [
      { x: 140, y: 416, width: 420, speed: 16 },
      { x: 690, y: 374, width: 460, speed: 18 },
      { x: 1300, y: 455, width: 390, speed: 17 }
    ]
  };

  scene.repairs = [
    {
      id: "storm-gauge",
      kind: "path-puzzle",
      puzzleTheme: "storm-gauge",
      x: 1115,
      y: 508,
      radius: 230,
      complete: false,
      progress: 0,
      scanText: "Robot scan: storm gauge unstable.",
      puzzleText: "Rotate the signal paths to steady the storm gauge.",
      rewardText: "Storm gauge stabilized. The wind readings settle.",
      onwardText: "The weather vane path is open.",
      nextText: "Climbing to Weather Vane Roof.",
      nextSceneId: "chapter-four/weather-vane-roof",
      reactions: [
        { text: "The gauge is holding!", x: 1115, y: 408 },
        { text: "Storm data stabilized.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Wind numbers are doing cartwheels." },
        puzzle: { speaker: "player", text: "Hold steady. Let the gauge breathe." },
        reward: { speaker: "robot", text: "Storm data stabilized." },
        next: { speaker: "robot", text: "The weather vane roof is above the tree line." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
