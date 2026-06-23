import { createBaseScene } from "../baseScene.js";

export function createBellRopeCornerScene() {
  const scene = createBaseScene({
    id: "chapter-one/bell-rope-corner",
    title: "Bell Rope Corner",
    worldWidth: 2160,
    startMessage: ""
  });

  scene.player.x = 310;
  scene.robot.x = 420;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 910, moonY: 148, cloudDrift: 0.82, hillOffset: 18, ridgeOffset: 44 };
  scene.bellRopeCorner = {
    x: 1160,
    groundY: 626,
    fixed: false,
    bellLit: false
  };
  scene.layers = {
    trees: [
      { x: 120, y: 286, scale: 1.46 },
      { x: 615, y: 306, scale: 1.34 },
      { x: 1560, y: 278, scale: 1.5 },
      { x: 2050, y: 296, scale: 1.42 }
    ],
    cottages: [
      { x: 420, y: 536, scale: 1.9, lit: true },
      { x: 1765, y: 532, scale: 2.02, lit: false }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 780, groundY: 660, height: 92, alpha: 0.72 },
      { kind: "rainyRocksReeds", x: 1470, groundY: 662, height: 100, alpha: 0.76 }
    ],
    lamps: [
      { x: 250, y: 560, lit: true },
      { x: 760, y: 560, lit: false },
      { x: 1460, y: 560, lit: false },
      { x: 1980, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2050, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 900, y: 624, kind: "gear" },
      { x: 1290, y: 626, kind: "coil" }
    ],
    puddles: [
      { x: 380, y: 664, width: 128, height: 20 },
      { x: 1160, y: 662, width: 182, height: 22 },
      { x: 1850, y: 660, width: 138, height: 18 }
    ],
    mistBands: [
      { x: 130, y: 502, width: 240, speed: 10 },
      { x: 840, y: 450, width: 320, speed: 11 },
      { x: 1540, y: 512, width: 300, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "bell-rope-corner",
      kind: "path-puzzle",
      puzzleTheme: "junction-line",
      x: 1160,
      y: 540,
      radius: 245,
      complete: false,
      progress: 0,
      scanText: "Robot scan: bell rope snapped off the pulley.",
      puzzleText: "Rotate the pulley paths to re-thread the bell rope.",
      rewardText: "Bell rope restored. The safe-clear bell rings through the lane.",
      onwardText: "The corner can signal again.",
      nextText: "Workshop Lift is next.",
      nextSceneId: "chapter-one/workshop-lift",
      reactions: [
        { text: "The bell can ring again!", x: 1160, y: 332 },
        { text: "Signal rope tension good.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Rope tension reads as deeply nope." },
        puzzle: { speaker: "player", text: "Thread it back through the pulley. Slow and steady." },
        reward: { speaker: "robot", text: "Bell rope restored. Ring responsibly." },
        next: { speaker: "robot", text: "Workshop Lift is waiting." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
