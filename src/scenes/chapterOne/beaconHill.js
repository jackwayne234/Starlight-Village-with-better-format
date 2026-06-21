import { createBaseScene } from "../baseScene.js";

export function createBeaconHillScene() {
  const scene = createBaseScene({
    id: "chapter-one/beacon-hill",
    title: "Beacon Hill Signal Tower",
    worldWidth: 2100,
    startMessage: "Beacon Hill rises through the rain. Find the signal tower."
  });

  scene.player.x = 310;
  scene.robot.x = 422;
  scene.backdrop = { moonX: 1025, moonY: 132, cloudDrift: 1.25, hillOffset: 140, ridgeOffset: 176 };
  scene.beaconHill = {
    tower: { x: 1240, y: 522, lit: false },
    shed: { x: 1640, y: 444, lit: true },
    flags: [
      { x: 870, y: 382, color: "#d8aa57" },
      { x: 1330, y: 268, color: "#c97945" },
      { x: 1815, y: 386, color: "#8fd9f0" }
    ],
    cables: [
      { fromX: 560, fromY: 388, toX: 1240, toY: 250 },
      { fromX: 1240, fromY: 250, toX: 1760, toY: 405 }
    ]
  };
  scene.layers = {
    trees: [
      { x: 90, y: 304, scale: 0.94 },
      { x: 295, y: 284, scale: 1.1 },
      { x: 650, y: 324, scale: 0.78 },
      { x: 1010, y: 306, scale: 0.9 },
      { x: 1510, y: 318, scale: 0.82 },
      { x: 1940, y: 292, scale: 1 }
    ],
    cottages: [],
    lamps: [
      { x: 430, y: 534, lit: true },
      { x: 965, y: 526, lit: true },
      { x: 1810, y: 532, lit: false }
    ],
    glowPlants: [
      { x: 420, y: 610, active: true },
      { x: 750, y: 626, active: true },
      { x: 1085, y: 610, active: false },
      { x: 1540, y: 628, active: true }
    ],
    brokenBranches: [
      { x: 530, y: 622, rotation: -0.26 },
      { x: 920, y: 638, rotation: 0.18 },
      { x: 1710, y: 624, rotation: -0.18 }
    ],
    repairParts: [
      { x: 1030, y: 578, type: "gear" },
      { x: 1710, y: 584, type: "coil" }
    ],
    puddles: [
      { x: 140, y: 660, width: 180, height: 18 },
      { x: 620, y: 672, width: 210, height: 18 },
      { x: 990, y: 652, width: 240, height: 19 },
      { x: 1480, y: 675, width: 210, height: 18 },
      { x: 1885, y: 650, width: 190, height: 18 }
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
      radius: 250,
      complete: false,
      progress: 0,
      scanText: "Robot scan: beacon signal weak.",
      puzzleText: "Rotate the signal paths to tune the beacon.",
      rewardText: "Beacon restored. Warm light crosses the hill.",
      onwardText: "One stormwater call remains.",
      nextText: "Heading to Rainbarrel Row.",
      nextSceneId: "chapter-one/rainbarrel-row",
      reactions: [
        { text: "The beacon is shining!", x: 1240, y: 352 },
        { text: "Signal restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Beacon signal is whisper-thin." },
        puzzle: { speaker: "player", text: "Let's give the village something bright to follow." },
        reward: { speaker: "robot", text: "Signal restored. Rainbarrel Row is next." },
        next: { speaker: "robot", text: "Last call: stormwater." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
