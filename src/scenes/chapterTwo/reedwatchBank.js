import { createBaseScene } from "../baseScene.js";

export function createReedwatchBankScene() {
  const scene = createBaseScene({
    id: "chapter-two/reedwatch-bank",
    title: "Reedwatch Bank",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 305;
  scene.robot.x = 414;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 990, moonY: 126, cloudDrift: 1.12, hillOffset: 72, ridgeOffset: 108 };
  scene.reedwatchBank = { x: 1160, groundY: 654, fixed: false, markersLit: false };
  scene.paintedLandmark = {
    sprite: "reedwatchBank",
    state: scene.reedwatchBank,
    x: 1160,
    groundY: 674,
    height: 430,
    glow: { heightRatio: 0.55, radius: 170, fixedIntensity: 0.42, dimIntensity: 0.12, pulse: 0.05 }
  };
  scene.layers = {
    trees: [
      { x: 70, y: 270, scale: 1.6 },
      { x: 310, y: 306, scale: 1.38 },
      { x: 640, y: 286, scale: 1.46 },
      { x: 1540, y: 294, scale: 1.48 },
      { x: 2080, y: 270, scale: 1.62 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenBridgeReeds", x: 790, groundY: 656, height: 162, alpha: 0.88 },
      { kind: "rainyRocksReeds", x: 950, groundY: 662, height: 132, alpha: 0.9 },
      { kind: "glowfenRootChannel", x: 1160, groundY: 676, height: 144, alpha: 0.86 },
      { kind: "rainyRocksReeds", x: 1375, groundY: 662, height: 134, alpha: 0.9 },
      { kind: "glowfenBridgeReeds", x: 1545, groundY: 656, height: 164, alpha: 0.88 }
    ],
    lamps: [
      { x: 260, y: 560, lit: true },
      { x: 760, y: 560, lit: false },
      { x: 1160, y: 550, lit: false },
      { x: 1570, y: 560, lit: false },
      { x: 2040, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 145, y: 640, active: true },
      { x: 865, y: 635, active: false },
      { x: 1235, y: 636, active: false },
      { x: 1635, y: 637, active: false },
      { x: 1985, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 375, y: 664, width: 132, height: 20 },
      { x: 1160, y: 668, width: 420, height: 30 },
      { x: 1885, y: 660, width: 144, height: 18 }
    ],
    mistBands: [
      { x: 170, y: 506, width: 260, speed: 8 },
      { x: 835, y: 528, width: 330, speed: 10 },
      { x: 1450, y: 502, width: 310, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "reedwatch-bank",
      kind: "path-puzzle",
      puzzleTheme: "market-lanterns",
      x: 1160,
      y: 550,
      radius: 282,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: reedwatch markers are dark and the safe bank path is hidden.",
      puzzleText: "Connect the guide lights so the reeds point toward the switchyard road.",
      rewardText: "Reedwatch Bank restored. The marker lights draw a clean path out of the fen.",
      onwardText: "The reed markers are lit.",
      nextText: "Mossline Switchyard is next.",
      nextSceneId: "chapter-three/mossline-switchyard",
      reactions: [
        { text: "The bank path is lit!", x: 1160, y: 318 },
        { text: "Wetland exit confirmed.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Without these markers, every reed looks smugly identical." },
        puzzle: { speaker: "player", text: "Light the guide line and find the road out." },
        reward: { speaker: "robot", text: "Wetland exit confirmed." },
        next: { speaker: "player", text: "Mossline Switchyard is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
