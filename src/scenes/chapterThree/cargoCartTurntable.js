import { createBaseScene } from "../baseScene.js";

export function createCargoCartTurntableScene() {
  const scene = createBaseScene({
    id: "chapter-three/cargo-cart-turntable",
    title: "Cargo Cart Turntable",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 965, moonY: 142, cloudDrift: 1.0, hillOffset: 48, ridgeOffset: 72 };
  scene.cargoCartTurntable = { x: 1160, groundY: 654, fixed: false, cartMoved: false };
  scene.layers = {
    trees: [
      { x: 75, y: 280, scale: 1.54 },
      { x: 260, y: 314, scale: 1.36 },
      { x: 790, y: 292, scale: 1.48 },
      { x: 1510, y: 276, scale: 1.56 },
      { x: 1995, y: 310, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 350, y: 560, lit: true },
      { x: 830, y: 560, lit: false },
      { x: 1505, y: 560, lit: false },
      { x: 1980, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 940, y: 638, active: false },
      { x: 1390, y: 638, active: false },
      { x: 2050, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 760, groundY: 670, height: 126, alpha: 0.9 },
      { kind: "mosslineConduitCoils", x: 1040, groundY: 682, height: 118, alpha: 0.9 },
      { kind: "mosslinePuddleGround", x: 1220, groundY: 696, height: 122, alpha: 0.82 },
      { kind: "mosslineSwitchFoliage", x: 1540, groundY: 670, height: 128, alpha: 0.9 }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 920, y: 624, kind: "gear" },
      { x: 1405, y: 626, kind: "coil" }
    ],
    puddles: [
      { x: 250, y: 662, width: 160, height: 18 },
      { x: 1160, y: 668, width: 470, height: 30 },
      { x: 1840, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 170, y: 430, width: 320, speed: 8 },
      { x: 800, y: 398, width: 390, speed: 12 },
      { x: 1410, y: 470, width: 350, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "cargo-cart-turntable",
      kind: "path-puzzle",
      puzzleTheme: "rail-signal",
      x: 1160,
      y: 548,
      radius: 285,
      complete: false,
      progress: 0,
      scanText: "Robot scan: cargo cart turntable is misaligned and blocking the mossline.",
      puzzleText: "Route the rail signal so the turntable lines up with the clear track.",
      rewardText: "Cargo cart turntable restored. The cart rolls aside and the track points forward.",
      onwardText: "The cargo cart is clear.",
      nextText: "Signal Arm Row is next.",
      nextSceneId: "chapter-three/signal-arm-row",
      reactions: [
        { text: "Cart is clear!", x: 1160, y: 314 },
        { text: "Turntable aligned.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The cart is doing a very convincing impression of a wall." },
        puzzle: { speaker: "player", text: "Line up the turntable and roll it out of the way." },
        reward: { speaker: "robot", text: "Turntable aligned." },
        next: { speaker: "player", text: "Signal Arm Row is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
