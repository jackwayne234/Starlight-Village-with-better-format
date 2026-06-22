import { createBaseScene } from "../baseScene.js";

export function createGlowfenGroveScene() {
  const scene = createBaseScene({
    id: "chapter-one/glowfen-grove",
    title: "Glowfen Grove",
    worldWidth: 1900,
    startMessage: ""
  });

  scene.player.x = 210;
  scene.robot.x = 325;
  scene.robot.y = 420;
  scene.backdrop = {
    moonX: 640,
    moonY: 150,
    cloudDrift: 0.55,
    hillOffset: -90,
    ridgeOffset: -60
  };
  scene.world.groveBloom = 0;
  scene.bridge = { x: 850, y: 604, width: 420, repaired: false };

  scene.layers = {
    // Tall pines, grounded near the walking line and spaced through the grove.
    trees: [
      { x: 40, y: 263, scale: 1.62 },
      { x: 190, y: 303, scale: 1.45 },
      { x: 460, y: 273, scale: 1.58 },
      { x: 720, y: 314, scale: 1.4 },
      { x: 1030, y: 280, scale: 1.55 },
      { x: 1320, y: 291, scale: 1.5 },
      { x: 1665, y: 268, scale: 1.6 }
    ],
    cottages: [],
    lamps: [
      { x: 340, y: 560, lit: true },
      { x: 1240, y: 560, lit: false }
    ],
    // Glow plants kept to the edges of the grove, off the walking path.
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 1560, y: 642, active: true },
      { x: 1760, y: 638, active: false }
    ],
    foliage: [
      { kind: "glowfenPumpOvergrowth", x: 1030, groundY: 668, height: 255 },
      { kind: "glowfenRootChannel", x: 800, groundY: 676, height: 190, alpha: 0.9 },
      { kind: "glowfenBridgeReeds", x: 640, groundY: 654, height: 150 },
      { kind: "glowfenBridgeReeds", x: 1040, groundY: 654, height: 140, alpha: 0.9 },
      { kind: "glowfenCobbleVines", x: 520, groundY: 692, height: 120, alpha: 0.82 },
      { kind: "glowfenLeafLitter", x: 1330, groundY: 694, height: 115, alpha: 0.86 },
      { kind: "glowfenGlowRocks", x: 1540, groundY: 654, height: 128 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 300, y: 662, width: 120, height: 22 },
      { x: 1480, y: 660, width: 126, height: 24 }
    ],
    mistBands: [
      { x: 180, y: 505, width: 250, speed: 7 },
      { x: 780, y: 526, width: 300, speed: 10 },
      { x: 1380, y: 496, width: 260, speed: 8 }
    ]
  };

  scene.repairs = [
    {
      id: "root-pump",
      kind: "path-puzzle",
      puzzleTheme: "root-pump",
      x: 1045,
      y: 596,
      radius: 210,
      complete: false,
      progress: 0,
      scanText: "Robot scan: grove root pump stalled.",
      puzzleText: "Rotate the root channels to wake the pump.",
      rewardText: "Root pump restored. Glowfen Grove breathes again.",
      onwardText: "The grove is stable.",
      nextText: "Heading toward Mossline Switchyard.",
      nextSceneId: "chapter-one/mossline-switchyard",
      reactions: [
        { text: "The path is glowing again!", x: 850, y: 492 },
        { text: "Bridge network restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "These roots are holding their breath." },
        puzzle: { speaker: "player", text: "Easy path, steady light. Wake the roots." },
        reward: { speaker: "robot", text: "Root pressure steady. The plants approve." },
        next: { speaker: "player", text: "The switchyard should be just past the glow plants." }
      }
    }
  ];
  scene.repairIndex = 0;
  scene.repairTarget = scene.repairs[scene.repairIndex];

  return scene;
}
