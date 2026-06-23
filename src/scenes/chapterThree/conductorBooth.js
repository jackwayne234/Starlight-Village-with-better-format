import { createBaseScene } from "../baseScene.js";

export function createConductorBoothScene() {
  const scene = createBaseScene({
    id: "chapter-three/conductor-booth",
    title: "Conductor Booth",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 948, moonY: 140, cloudDrift: 1.04, hillOffset: 50, ridgeOffset: 74 };
  scene.conductorBooth = { x: 1160, groundY: 654, fixed: false, boardLit: false };
  scene.layers = {
    trees: [
      { x: 70, y: 280, scale: 1.54 },
      { x: 280, y: 314, scale: 1.36 },
      { x: 780, y: 292, scale: 1.48 },
      { x: 1515, y: 276, scale: 1.56 },
      { x: 1990, y: 310, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 345, y: 560, lit: true },
      { x: 770, y: 560, lit: false },
      { x: 1540, y: 560, lit: false },
      { x: 1970, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 870, y: 638, active: false },
      { x: 1450, y: 638, active: false },
      { x: 2040, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 735, groundY: 670, height: 124, alpha: 0.9 },
      { kind: "mosslinePuddleGround", x: 1290, groundY: 696, height: 116, alpha: 0.8 },
      { kind: "mosslineSwitchFoliage", x: 1540, groundY: 670, height: 126, alpha: 0.9 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 255, y: 662, width: 160, height: 18 },
      { x: 1160, y: 668, width: 440, height: 30 },
      { x: 1835, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 170, y: 430, width: 315, speed: 8 },
      { x: 800, y: 398, width: 385, speed: 12 },
      { x: 1410, y: 470, width: 345, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "conductor-booth",
      kind: "path-puzzle",
      puzzleTheme: "junction-line",
      x: 1160,
      y: 544,
      radius: 284,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: conductor booth route board is disconnected.",
      puzzleText: "Reconnect the board paths so the switch lamps agree.",
      rewardText: "Conductor Booth restored. The route board lights a steady path across the yard.",
      onwardText: "The route board is lit.",
      nextText: "Crane Hook Yard is next.",
      nextSceneId: "chapter-three/crane-hook-yard",
      reactions: [
        { text: "Route board is alive!", x: 1160, y: 308 },
        { text: "Switch lamps synchronized.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The booth remembers the route, but none of its lights do." },
        puzzle: { speaker: "player", text: "Reconnect the board and wake up the switches." },
        reward: { speaker: "robot", text: "Switch lamps synchronized." },
        next: { speaker: "player", text: "Crane Hook Yard is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
