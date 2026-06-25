import { createBaseScene } from "../baseScene.js";

export function createMosslineSwitchyardScene() {
  const scene = createBaseScene({
    id: "chapter-three/mossline-switchyard",
    title: "Mossline Switchyard",
    worldWidth: 2050,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 965, moonY: 150, cloudDrift: 1.05, hillOffset: 42, ridgeOffset: 66 };
  scene.switchyard = {
    poles: [
      { x: 520, y: 496, height: 210, spriteHeight: 335, lit: false },
      { x: 930, y: 488, height: 235, spriteHeight: 355, lit: true },
      { x: 1370, y: 508, height: 205, spriteHeight: 330, lit: false },
      { x: 1760, y: 490, height: 225, spriteHeight: 350, lit: false }
    ],
    boxes: [
      { x: 720, y: 606, lit: true },
      { x: 1165, y: 606, lit: false },
      { x: 1570, y: 606, lit: false }
    ],
    gate: { x: 1870, y: 532 }
  };
  scene.paintedLandmark = {
    sprite: "mosslineSwitchyard",
    state: scene.switchyard,
    x: 1165,
    groundY: 666,
    height: 468,
    glow: { heightRatio: 0.47, radius: 160, fixedIntensity: 0.4, dimIntensity: 0.12, pulse: 0.05 }
  };
  scene.layers = {
    trees: [
      { x: 75, y: 280, scale: 1.55 },
      { x: 245, y: 314, scale: 1.4 },
      { x: 790, y: 291, scale: 1.5 },
      { x: 1190, y: 303, scale: 1.45 },
      { x: 1515, y: 273, scale: 1.58 },
      { x: 1940, y: 309, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 360, y: 560, lit: true },
      { x: 980, y: 560, lit: false },
      { x: 1660, y: 560, lit: false }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 1980, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 720, groundY: 670, height: 130, alpha: 0.94 },
      { kind: "mosslineSwitchFoliage", x: 1165, groundY: 670, height: 122, alpha: 0.92 },
      { kind: "mosslineSwitchFoliage", x: 1570, groundY: 670, height: 126, alpha: 0.92 },
      { kind: "mosslineConduitCoils", x: 945, groundY: 682, height: 120, alpha: 0.9 },
      { kind: "mosslinePuddleGround", x: 1340, groundY: 696, height: 118, alpha: 0.8 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 200, y: 662, width: 180, height: 19 },
      { x: 1840, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 180, y: 430, width: 320, speed: 8 },
      { x: 770, y: 395, width: 410, speed: 12 },
      { x: 1390, y: 470, width: 360, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "switchyard-junction",
      kind: "path-puzzle",
      puzzleTheme: "junction-line",
      puzzleLayout: "ch3-mossline-switchyard",
      x: 1165,
      y: 520,
      radius: 230,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: switchyard junction line is down.",
      puzzleText: "Rotate the paths to reconnect the mossline junction.",
      rewardText: "Switchyard line restored. Current steadies through the trees.",
      onwardText: "The storm road climbs toward the ridge.",
      nextText: "Heading toward Cargo Cart Turntable.",
      nextSceneId: "chapter-three/cargo-cart-turntable",
      reactions: [
        { text: "Junction current is steady!", x: 1165, y: 470 },
        { text: "Line readings look beautiful.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "That junction is full of wet copper sighs." },
        puzzle: { speaker: "player", text: "Easy current. Straight through the mossline." },
        reward: { speaker: "robot", text: "Line readings look beautiful." },
        next: { speaker: "robot", text: "The cargo cart turntable is calling louder now." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
