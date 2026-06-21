import { createBaseScene } from "../baseScene.js";

export function createGlowfenGroveScene() {
  const scene = createBaseScene({
    id: "chapter-one/glowfen-grove",
    title: "Glowfen Grove",
    worldWidth: 1900,
    startMessage: "Glowfen Grove hums softly. Follow the blue fireflies to the root pump."
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
    trees: [
      { x: 40, y: 250, scale: 1.28 },
      { x: 190, y: 285, scale: 0.92 },
      { x: 460, y: 242, scale: 1.22 },
      { x: 720, y: 310, scale: 0.9 },
      { x: 1030, y: 252, scale: 1.18 },
      { x: 1320, y: 294, scale: 1.02 },
      { x: 1665, y: 250, scale: 1.25 }
    ],
    cottages: [],
    lamps: [
      { x: 340, y: 535, lit: true },
      { x: 1240, y: 522, lit: false }
    ],
    glowPlants: [
      { x: 280, y: 622, active: true },
      { x: 408, y: 610, active: false },
      { x: 650, y: 606, active: true },
      { x: 890, y: 632, active: true },
      { x: 1120, y: 604, active: false },
      { x: 1390, y: 618, active: true },
      { x: 1620, y: 600, active: false }
    ],
    brokenBranches: [
      { x: 525, y: 626, rotation: 0.18 },
      { x: 1510, y: 635, rotation: -0.2 }
    ],
    repairParts: [
      { x: 740, y: 590, type: "seed" },
      { x: 980, y: 584, type: "coil" },
      { x: 1184, y: 592, type: "seed" }
    ],
    puddles: [
      { x: 310, y: 650, width: 120, height: 22 },
      { x: 860, y: 636, width: 154, height: 28 },
      { x: 1480, y: 622, width: 126, height: 24 }
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
      y: 510,
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
