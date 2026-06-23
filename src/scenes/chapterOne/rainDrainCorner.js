import { createBaseScene } from "../baseScene.js";

export function createRainDrainCornerScene() {
  const scene = createBaseScene({
    id: "chapter-one/rain-drain-corner",
    title: "Rain Drain Corner",
    worldWidth: 2200,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 425;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 820, moonY: 152, cloudDrift: 0.82, hillOffset: 20, ridgeOffset: 48 };
  scene.rainDrainCorner = {
    x: 1160,
    groundY: 650,
    fixed: false,
    waterHigh: true
  };
  scene.paintedLandmark = {
    sprite: "rainDrainCorner",
    state: scene.rainDrainCorner,
    x: 1160,
    groundY: 674,
    height: 500,
    glow: { heightRatio: 0.42, radius: 145, fixedIntensity: 0.38, dimIntensity: 0.14 }
  };
  scene.layers = {
    trees: [
      { x: 120, y: 286, scale: 1.46 },
      { x: 560, y: 304, scale: 1.38 },
      { x: 1660, y: 284, scale: 1.5 },
      { x: 2070, y: 296, scale: 1.42 }
    ],
    cottages: [],
    foliage: [
      { kind: "rainyRocksReeds", x: 780, groundY: 662, height: 96, alpha: 0.72 },
      { kind: "glowfenLeafLitter", x: 1510, groundY: 682, height: 100, alpha: 0.78 }
    ],
    lamps: [
      { x: 250, y: 560, lit: true },
      { x: 760, y: 560, lit: false },
      { x: 1500, y: 560, lit: false },
      { x: 2000, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2050, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 360, y: 664, width: 126, height: 20 },
      { x: 1880, y: 660, width: 138, height: 18 }
    ],
    mistBands: [
      { x: 150, y: 502, width: 250, speed: 10 },
      { x: 820, y: 448, width: 330, speed: 11 },
      { x: 1540, y: 514, width: 300, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "rain-drain-corner",
      kind: "path-puzzle",
      puzzleTheme: "water-routing",
      x: 1160,
      y: 545,
      radius: 265,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: rain drain is clogged under the corner grate.",
      puzzleText: "Rotate the runoff channels to clear the drain.",
      rewardText: "Rain drain cleared. The corner water drops back into the grate.",
      onwardText: "The lane is draining again.",
      nextText: "Mayor's Porch is next.",
      nextSceneId: "chapter-one/mayor-porch",
      reactions: [
        { text: "The puddle is shrinking!", x: 1160, y: 320 },
        { text: "Drain flow restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The drain is trying to become a pond." },
        puzzle: { speaker: "player", text: "Clear the channels and give the water somewhere to go." },
        reward: { speaker: "robot", text: "Drain flow restored. Pond cancelled." },
        next: { speaker: "player", text: "Let's check the mayor's porch." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
