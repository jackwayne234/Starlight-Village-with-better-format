import { createBaseScene } from "../baseScene.js";

export function createBeaconHillScene() {
  const scene = createBaseScene({
    id: "chapter-five/beacon-hill",
    title: "Beacon Hill Signal Tower",
    worldWidth: 2100,
    startMessage: ""
  });

  scene.player.x = 310;
  scene.robot.x = 422;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1025, moonY: 132, cloudDrift: 1.25, hillOffset: 140, ridgeOffset: 176 };
  scene.beaconHill = {
    tower: { x: 1240, groundY: 610, height: 800, sprite: "beaconTowerLargeDoor", lit: false },
    shed: { x: 1640, y: 540, lit: true },
    flags: [],
    cables: []
  };
  scene.layers = {
    trees: [
      { x: 90, y: 291, scale: 1.5 },
      { x: 295, y: 268, scale: 1.6 },
      { x: 650, y: 309, scale: 1.42 },
      { x: 1010, y: 286, scale: 1.52 },
      { x: 1510, y: 300, scale: 1.46 },
      { x: 1940, y: 280, scale: 1.55 }
    ],
    cottages: [],
    foliage: [
      { kind: "rainyRocksReeds", x: 1000, groundY: 653, height: 142, alpha: 0.92 },
      { kind: "glowfenLeafLitter", x: 1075, groundY: 669, height: 118, alpha: 0.86 },
      { kind: "rainyRocksReeds", x: 1145, groundY: 659, height: 110, alpha: 0.84 }
    ],
    lamps: [
      { x: 430, y: 560, lit: true },
      { x: 915, y: 560, lit: true },
      { x: 1810, y: 560, lit: false }
    ],
    glowPlants: [
      { x: 140, y: 640, active: true },
      { x: 2010, y: 638, active: true }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 220, y: 662, width: 180, height: 18 },
      { x: 1900, y: 660, width: 190, height: 18 }
    ],
    mistBands: [
      { x: 160, y: 410, width: 360, speed: 14 },
      { x: 760, y: 382, width: 430, speed: 16 },
      { x: 1380, y: 462, width: 400, speed: 15 }
    ]
  };

  scene.repairs = [
    {
      id: "beacon-tower",
      kind: "path-puzzle",
      puzzleTheme: "beacon-signal",
      x: 1240,
      y: 500,
      radius: 280,
      complete: false,
      progress: 0,
      scanText: "Robot scan: beacon signal weak.",
      puzzleText: "Rotate the signal paths to tune the beacon.",
      rewardText: "Beacon restored. Warm light crosses the hill.",
      onwardText: "One stormwater call remains.",
      nextText: "Heading to the keeper's cottage.",
      nextSceneId: "chapter-five/keeper-cottage",
      reactions: [
        { text: "The beacon is shining!", x: 1240, y: 350 },
        { text: "Signal restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Beacon signal is whisper-thin." },
        puzzle: { speaker: "player", text: "Let's give the village something bright to follow." },
        reward: { speaker: "robot", text: "Signal restored. Rainbarrel Row is next." },
        next: { speaker: "robot", text: "The keeper's cottage is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
