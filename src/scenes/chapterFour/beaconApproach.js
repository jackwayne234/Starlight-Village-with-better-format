import { createBaseScene } from "../baseScene.js";

export function createBeaconApproachScene() {
  const scene = createBaseScene({
    id: "chapter-four/beacon-approach",
    title: "Beacon Approach",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1060, moonY: 112, cloudDrift: 1.84, hillOffset: 166, ridgeOffset: 216 };
  scene.beaconApproach = {
    x: 1120,
    groundY: 666,
    fixed: false,
    gateOpen: false
  };
  scene.paintedLandmark = {
    sprite: "beaconApproach",
    state: scene.beaconApproach,
    x: 1120,
    groundY: 670,
    height: 462,
    glow: { heightRatio: 0.54, radius: 235, fixedIntensity: 0.38, dimIntensity: 0.12, pulse: 0.06 }
  };
  scene.layers = {
    trees: [
      { x: 72, y: 284, scale: 1.58 },
      { x: 344, y: 268, scale: 1.66 },
      { x: 700, y: 304, scale: 1.48 },
      { x: 1518, y: 292, scale: 1.56 },
      { x: 1854, y: 274, scale: 1.64 },
      { x: 2102, y: 306, scale: 1.44 }
    ],
    cottages: [],
    lamps: [
      { x: 336, y: 560, lit: true },
      { x: 792, y: 560, lit: false },
      { x: 1474, y: 560, lit: false },
      { x: 2004, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 144, y: 640, active: true },
      { x: 2054, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 626, groundY: 670, height: 122, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1584, groundY: 670, height: 128, alpha: 0.74 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 270, y: 662, width: 166, height: 20 },
      { x: 1120, y: 668, width: 408, height: 24 },
      { x: 1906, y: 661, width: 162, height: 18 }
    ],
    mistBands: [
      { x: 118, y: 408, width: 480, speed: 23 },
      { x: 760, y: 360, width: 560, speed: 26 },
      { x: 1424, y: 450, width: 460, speed: 22 }
    ]
  };

  scene.repairs = [
    {
      id: "beacon-approach",
      kind: "path-puzzle",
      puzzleTheme: "beacon-signal",
      x: 1120,
      y: 512,
      radius: 264,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the beacon gate is barred until the signal paths line up.",
      puzzleText: "Rotate the beacon paths until the final ridge gate opens.",
      rewardText: "Beacon Approach restored. The gate to Beacon Hill opens through the rain.",
      onwardText: "The beacon gate is open.",
      nextText: "Beacon Hill waits beyond the gate.",
      nextSceneId: "chapter-five/beacon-hill",
      reactions: [
        { text: "The gate is open!", x: 1120, y: 292 },
        { text: "Beacon route confirmed.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The last gate is holding until the beacon signal lines up." },
        puzzle: { speaker: "player", text: "Open the final gate to Beacon Hill." },
        reward: { speaker: "robot", text: "Beacon route confirmed." },
        next: { speaker: "player", text: "Beacon Hill is just beyond it." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
