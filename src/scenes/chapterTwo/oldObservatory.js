import { createBaseScene } from "../baseScene.js";

export function createOldObservatoryScene() {
  const scene = createBaseScene({
    id: "chapter-two/old-observatory",
    title: "Old Observatory",
    worldWidth: 2180,
    startMessage: ""
  });

  scene.player.x = 310;
  scene.robot.x = 430;
  scene.backdrop = { moonX: 620, moonY: 126, cloudDrift: 0.62, hillOffset: -10, ridgeOffset: -58 };
  scene.observatory = {
    tower: { x: 1460, groundY: 638, height: 540, lit: false },
    lens: { x: 1110, groundY: 640, height: 350, lit: false },
    hut: { x: 650, groundY: 642, height: 310, lit: true },
    foundations: [
      { x: 1430, groundY: 656, height: 165 },
      { x: 1100, groundY: 662, height: 140 }
    ],
    pathEdges: [
      { x: 775, groundY: 696, height: 150 },
      { x: 1265, groundY: 692, height: 146 }
    ],
    rocks: [
      { x: 380, groundY: 656, height: 165 },
      { x: 1840, groundY: 658, height: 175 }
    ]
  };
  scene.layers = {
    trees: [
      { x: 80, y: 286, scale: 1.58 },
      { x: 420, y: 306, scale: 1.35 },
      { x: 1840, y: 292, scale: 1.5 },
      { x: 2080, y: 278, scale: 1.45 }
    ],
    cottages: [],
    lamps: [
      { x: 280, y: 560, lit: true },
      { x: 760, y: 560, lit: true },
      { x: 1180, y: 560, lit: false },
      { x: 1660, y: 560, lit: false }
    ],
    glowPlants: [
      { x: 620, y: 638, active: true },
      { x: 1540, y: 640, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 250, y: 664, width: 135, height: 20 },
      { x: 1080, y: 662, width: 220, height: 22 },
      { x: 1870, y: 660, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 140, y: 454, width: 300, speed: 9 },
      { x: 790, y: 402, width: 440, speed: 10 },
      { x: 1490, y: 476, width: 360, speed: 11 }
    ]
  };

  scene.repairs = [
    {
      id: "archive-lens-array",
      kind: "path-puzzle",
      puzzleTheme: "archive-lens",
      x: 1110,
      y: 560,
      radius: 265,
      complete: false,
      progress: 0,
      scanText: "Robot scan: archive lens array out of focus.",
      puzzleText: "Rotate the lens paths to focus starlight through the prisms.",
      rewardText: "Archive lens focused. The map to the northern springs appears.",
      onwardText: "The next road is visible now.",
      nextText: "Chapter 2 complete.",
      chapterComplete: {
        title: "Chapter 2 Complete",
        subtitle: "The village can trade, travel, and read the old storm maps again.",
        checklist: [
          "Market lantern grid restored",
          "Glassrail crossing signal aligned",
          "Archive lens array focused"
        ],
        prompt: "Press R to replay from the village."
      },
      reactions: [
        { text: "The maps are glowing!", x: 990, y: 316 },
        { text: "Northern springs located.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The old lens is scattering the storm map." },
        puzzle: { speaker: "player", text: "Then we focus the light until the map tells the truth." },
        reward: { speaker: "robot", text: "Archive lens focused. New route discovered." },
        next: { speaker: "player", text: "Tomorrow we follow the springs." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
