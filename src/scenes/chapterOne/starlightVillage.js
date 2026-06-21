import { createBaseScene } from "../baseScene.js";

export function createStarlightVillageScene() {
  const scene = createBaseScene({
    id: "chapter-one/starlight-village",
    title: "Starlight Village",
    startMessage: "Walk right through the rain. The robot will call out the broken wheel."
  });

  scene.layers = {
    trees: [
      { x: 80, y: 292, scale: 1.14 },
      { x: 230, y: 270, scale: 0.96 },
      { x: 1000, y: 266, scale: 1.05 },
      { x: 1135, y: 315, scale: 0.82 },
      { x: 1430, y: 286, scale: 1.08 },
      { x: 1685, y: 326, scale: 0.82 },
      { x: 1960, y: 276, scale: 1.02 }
    ],
    cottages: [
      { x: 735, y: 404, scale: 0.86, lit: false },
      { x: 1015, y: 428, scale: 0.7, lit: true },
      { x: 1565, y: 418, scale: 0.76, lit: false },
      { x: 1905, y: 430, scale: 0.68, lit: false }
    ],
    lamps: [
      { x: 394, y: 504, lit: false },
      { x: 958, y: 512, lit: true },
      { x: 1152, y: 535, lit: false },
      { x: 1488, y: 526, lit: false },
      { x: 1815, y: 532, lit: false },
      { x: 2075, y: 518, lit: false }
    ],
    glowPlants: [
      { x: 524, y: 604, active: true },
      { x: 617, y: 625, active: false },
      { x: 861, y: 604, active: true },
      { x: 1390, y: 608, active: true },
      { x: 1760, y: 620, active: false }
    ],
    brokenBranches: [
      { x: 325, y: 619, rotation: -0.25 },
      { x: 1084, y: 633, rotation: 0.18 },
      { x: 1518, y: 638, rotation: -0.1 },
      { x: 1865, y: 622, rotation: 0.22 }
    ],
    repairParts: [
      { x: 676, y: 590, type: "gear" },
      { x: 1008, y: 584, type: "coil" },
      { x: 1118, y: 573, type: "seed" },
      { x: 1640, y: 590, type: "gear" }
    ],
    puddles: [
      { x: 250, y: 650, width: 118, height: 24 },
      { x: 610, y: 646, width: 92, height: 18 },
      { x: 1375, y: 616, width: 126, height: 24 },
      { x: 1990, y: 606, width: 96, height: 18 }
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
      kind: "hold-charge",
      x: 840,
      y: 456,
      radius: 220,
      complete: false,
      progress: 0,
      chargeRate: 0.5,
      decayRate: 0.14,
      scanText: "Robot scan: water wheel generator offline.",
      puzzleText: "Hold Space to route power through the water wheel.",
      rewardText: "Water wheel restored. The village lights breathe back on.",
      onwardText: "The lane glows ahead. Walk right when you are ready.",
      nextText: "The robot hums beside you. A lamp relay flickers down the lane.",
      dialogue: {
        scan: { speaker: "robot", text: "Main wheel is asleep. I found the sleepy part." },
        puzzle: { speaker: "player", text: "Okay. Lantern steady, hands steady." },
        reward: { speaker: "robot", text: "Village current is back. Nicely routed." },
        next: { speaker: "robot", text: "That lamp relay is still wobbling." }
      }
    },
    {
      id: "lamp-relay",
      kind: "timed-tap",
      x: 1488,
      y: 526,
      radius: 170,
      complete: false,
      hits: 0,
      requiredHits: 3,
      sparkPhase: 0,
      sparkSpeed: 0.72,
      successMin: 0.42,
      successMax: 0.58,
      feedbackTimer: 0,
      feedback: "",
      scanText: "Robot scan: lamp relay out of tune.",
      puzzleText: "Tap Space as the spark crosses the gold notch.",
      rewardText: "Lamp relay tuned. The right side of the village steadies.",
      onwardText: "Both repairs are holding. The village path feels safer now.",
      nextText: "All repairs in this slice are complete.",
      dialogue: {
        scan: { speaker: "robot", text: "Tiny timing problem. My favorite kind." },
        puzzle: { speaker: "player", text: "Catch the spark on the bright mark." },
        reward: { speaker: "player", text: "There. The light sounds calmer now." },
        next: { speaker: "robot", text: "Two repairs stable. Rain still dramatic." }
      }
    }
  ];
  scene.repairIndex = 0;
  scene.repairTarget = scene.repairs[scene.repairIndex];

  return scene;
}
