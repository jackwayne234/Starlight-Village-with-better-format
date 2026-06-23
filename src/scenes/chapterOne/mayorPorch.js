import { createBaseScene } from "../baseScene.js";

export function createMayorPorchScene() {
  const scene = createBaseScene({
    id: "chapter-one/mayor-porch",
    title: "Mayor's Porch",
    worldWidth: 2200,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 425;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 880, moonY: 146, cloudDrift: 0.74, hillOffset: 10, ridgeOffset: 36 };
  scene.mayorPorch = {
    x: 1160,
    groundY: 630,
    fixed: false,
    chimeLit: false
  };
  scene.paintedLandmark = {
    sprite: "mayorPorch",
    state: scene.mayorPorch,
    x: 1160,
    groundY: 666,
    height: 540,
    glow: { heightRatio: 0.52, radius: 150, fixedIntensity: 0.42, dimIntensity: 0.15 }
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
      { kind: "glowfenLeafLitter", x: 760, groundY: 682, height: 96, alpha: 0.74 },
      { kind: "rainyRocksReeds", x: 1530, groundY: 662, height: 100, alpha: 0.76 }
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
      { x: 1160, y: 662, width: 190, height: 22 },
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
      id: "mayor-porch",
      kind: "path-puzzle",
      puzzleTheme: "beacon-signal",
      x: 1160,
      y: 545,
      radius: 260,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: mayor's porch signal chime is silent.",
      puzzleText: "Rotate the signal paths to wake the porch chime.",
      rewardText: "Mayor's porch restored. The safe-route chime rings down the lane.",
      onwardText: "Neighbors can hear the all-clear again.",
      nextText: "Festival Square is next.",
      nextSceneId: "chapter-one/festival-square",
      reactions: [
        { text: "The porch chime rang!", x: 1160, y: 318 },
        { text: "Safe-route signal restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "This porch chime is doing a very quiet impression of a porch chime." },
        puzzle: { speaker: "player", text: "Give it a bright path to ring through." },
        reward: { speaker: "robot", text: "Safe-route signal restored." },
        next: { speaker: "player", text: "Festival Square is just ahead." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
