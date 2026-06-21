import { createBaseScene } from "../baseScene.js";

export function createStormedgeRiseScene() {
  const scene = createBaseScene({
    id: "chapter-one/stormedge-rise",
    title: "Stormedge Rise",
    worldWidth: 2050,
    startMessage: "Wind pushes over Stormedge Rise. Reach the storm gauge."
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.backdrop = { moonX: 1080, moonY: 140, cloudDrift: 1.55, hillOffset: 86, ridgeOffset: 120 };
  scene.ridge = {
    gauge: { x: 1115, y: 508, lit: false },
    posts: [
      { x: 560, y: 522, lean: -0.16 },
      { x: 1440, y: 530, lean: 0.14 }
    ]
  };
  scene.layers = {
    trees: [
      { x: 95, y: 315, scale: 0.9 },
      { x: 345, y: 286, scale: 1.04 },
      { x: 720, y: 330, scale: 0.78 },
      { x: 1035, y: 292, scale: 1 },
      { x: 1360, y: 318, scale: 0.86 },
      { x: 1740, y: 280, scale: 1.08 }
    ],
    cottages: [{ x: 1680, y: 438, scale: 0.62, lit: true }],
    lamps: [
      { x: 410, y: 538, lit: true },
      { x: 925, y: 536, lit: false },
      { x: 1535, y: 532, lit: true }
    ],
    glowPlants: [
      { x: 420, y: 610, active: true },
      { x: 760, y: 626, active: false },
      { x: 1185, y: 610, active: true },
      { x: 1510, y: 628, active: true }
    ],
    brokenBranches: [
      { x: 505, y: 622, rotation: -0.38 },
      { x: 810, y: 638, rotation: 0.2 },
      { x: 1320, y: 626, rotation: -0.28 },
      { x: 1700, y: 618, rotation: 0.18 }
    ],
    repairParts: [
      { x: 1115, y: 572, type: "coil" },
      { x: 1565, y: 585, type: "gear" }
    ],
    puddles: [
      { x: 180, y: 660, width: 220, height: 21 },
      { x: 590, y: 674, width: 190, height: 18 },
      { x: 970, y: 650, width: 260, height: 20 },
      { x: 1420, y: 668, width: 240, height: 19 },
      { x: 1805, y: 654, width: 180, height: 18 }
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
      chargeRate: 0.4,
      decayRate: 0.12,
      scanText: "Robot scan: storm gauge unstable.",
      puzzleText: "Rotate the signal paths to steady the storm gauge.",
      rewardText: "Storm gauge stabilized. The wind readings settle.",
      onwardText: "The beacon hill path is open. Walk right when ready.",
      nextText: "Climbing to Beacon Hill.",
      nextSceneId: "chapter-one/beacon-hill",
      reactions: [
        { text: "The gauge is holding!", x: 1115, y: 408 },
        { text: "Storm data stabilized.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Wind numbers are doing cartwheels." },
        puzzle: { speaker: "player", text: "Hold steady. Let the gauge breathe." },
        reward: { speaker: "robot", text: "Storm data stabilized." },
        next: { speaker: "robot", text: "Beacon Hill is above the tree line." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
