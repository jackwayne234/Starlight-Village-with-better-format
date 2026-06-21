import { createBaseScene } from "../baseScene.js";

export function createStarlightVillageScene() {
  const scene = createBaseScene({
    id: "chapter-one/starlight-village",
    title: "Starlight Village",
    startMessage: ""
  });

  scene.layers = {
    // Tall trees (placeholder leafy art until the pine sprite is added), sized
    // against the ~232px boy so they read like real trees and tucked behind the
    // cottages. Bases land near the walking line (~y640).
    trees: [
      { x: 120, y: 270, scale: 1.6 },
      { x: 1150, y: 247, scale: 1.7 },
      { x: 1760, y: 291, scale: 1.5 },
      { x: 2150, y: 269, scale: 1.62 }
    ],
    // Cottages scaled up to be clearly taller than the boy (realistic houses),
    // resting on the ground line and spaced so none overlaps a tree trunk.
    cottages: [
      { x: 400, y: 529, scale: 2.15, lit: false },
      { x: 1500, y: 524, scale: 2.3, lit: true },
      { x: 1990, y: 540, scale: 2.0, lit: false }
    ],
    // Lamps line the walking path between the landmarks.
    lamps: [
      { x: 250, y: 560, lit: false },
      { x: 680, y: 562, lit: true },
      { x: 1180, y: 560, lit: false },
      { x: 1720, y: 562, lit: false }
    ],
    // A couple of glowing plants tucked at the far edges, off the path.
    glowPlants: [
      { x: 90, y: 638, active: true },
      { x: 2120, y: 636, active: false }
    ],
    // Walking path kept clear: no loose parts or fallen branches.
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 300, y: 664, width: 118, height: 24 },
      { x: 1900, y: 660, width: 110, height: 22 }
    ],
    mistBands: [
      { x: 80, y: 516, width: 180, speed: 9 },
      { x: 720, y: 535, width: 240, speed: 13 },
      { x: 1450, y: 508, width: 210, speed: 11 }
    ]
  };

  scene.repairs = [
    {
      id: "water-wheel",
      kind: "path-puzzle",
      puzzleTheme: "water-wheel",
      x: 800,
      y: 568,
      displayHeight: 440,
      radius: 220,
      complete: false,
      progress: 0,
      scanText: "Robot scan: water wheel generator offline.",
      puzzleText: "Rotate the channels to wake the water wheel.",
      rewardText: "Water wheel restored. The village lights breathe back on.",
      onwardText: "",
      nextText: "The lane opens toward Glowfen Grove.",
      nextSceneId: "chapter-one/glowfen-grove",
      reactions: [
        { text: "The lights are back!", x: 560, y: 330 }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Main wheel is asleep. I found the sleepy part." },
        puzzle: { speaker: "player", text: "Okay. Turn the channels until the wheel catches." },
        reward: { speaker: "robot", text: "Village current is back. Nicely routed." },
        next: { speaker: "robot", text: "Power is stable. Glowfen Grove is waiting." }
      }
    }
  ];
  scene.repairIndex = 0;
  scene.repairTarget = scene.repairs[scene.repairIndex];

  return scene;
}
