import { createBaseScene } from "../baseScene.js";

export function createGlowfenGroveScene() {
  const scene = createBaseScene({
    id: "chapter-two/glowfen-grove",
    title: "Glowfen Grove",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.robot.y = 430;
  scene.backdrop = {
    moonX: 640,
    moonY: 150,
    cloudDrift: 0.55,
    hillOffset: -90,
    ridgeOffset: -60
  };
  scene.world.groveBloom = 0;
  scene.glowfenGrove = { x: 1220, groundY: 664, fixed: false, pumpAwake: false };
  scene.paintedLandmark = {
    sprite: "glowfenGroveSide",
    state: scene.glowfenGrove,
    x: 1220,
    groundY: 812,
    height: 560,
    glow: { xOffset: 150, heightRatio: 0.52, radius: 260, fixedIntensity: 0.46, dimIntensity: 0.18, pulse: 0.06 }
  };

  scene.layers = {
    trees: [
      { x: 40, y: 263, scale: 1.62 },
      { x: 250, y: 303, scale: 1.45 },
      { x: 560, y: 278, scale: 1.55 },
      { x: 1710, y: 292, scale: 1.5 },
      { x: 2040, y: 268, scale: 1.58 }
    ],
    cottages: [],
    lamps: [
      { x: 330, y: 560, lit: true },
      { x: 1900, y: 560, lit: false }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 2040, y: 638, active: false }
    ],
    foliage: [
      { kind: "glowfenLeafLitter", x: 520, groundY: 694, height: 110, alpha: 0.72 },
      { kind: "glowfenGlowRocks", x: 1880, groundY: 654, height: 118, alpha: 0.8 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [],
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
      x: 1350,
      y: 610,
      radius: 300,
      showSprite: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: grove root pump stalled.",
      puzzleText: "Rotate the root channels to wake the pump.",
      rewardText: "Root pump restored. Glowfen Grove breathes again.",
      onwardText: "The grove is stable.",
      nextText: "Heading toward Lantern Lily Pool.",
      nextSceneId: "chapter-two/lantern-lily-pool",
      reactions: [
        { text: "The path is glowing again!", x: 850, y: 492 },
        { text: "Bridge network restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "These roots are holding their breath." },
        puzzle: { speaker: "player", text: "Easy path, steady light. Wake the roots." },
        reward: { speaker: "robot", text: "Root pressure steady. The plants approve." },
        next: { speaker: "player", text: "The lily pool should be just past the glow plants." }
      }
    }
  ];
  scene.repairIndex = 0;
  scene.repairTarget = scene.repairs[scene.repairIndex];

  return scene;
}
