import { createBaseScene } from "../baseScene.js";

export function createLanternMarketScene() {
  const scene = createBaseScene({
    id: "chapter-two/lantern-market",
    title: "Lantern Market",
    worldWidth: 2260,
    startMessage: ""
  });

  scene.player.x = 320;
  scene.robot.x = 436;
  scene.backdrop = { moonX: 720, moonY: 150, cloudDrift: 0.72, hillOffset: 36, ridgeOffset: -20 };
  scene.layers = {
    trees: [
      { x: 110, y: 282, scale: 1.45 },
      { x: 680, y: 300, scale: 1.32 },
      { x: 1340, y: 280, scale: 1.46 },
      { x: 2140, y: 296, scale: 1.4 }
    ],
    cottages: [
      { x: 430, y: 532, scale: 1.9, lit: true },
      { x: 930, y: 528, scale: 2.05, lit: false },
      { x: 1460, y: 534, scale: 2.0, lit: false },
      { x: 1900, y: 530, scale: 1.92, lit: true }
    ],
    lamps: [
      { x: 260, y: 560, lit: true },
      { x: 720, y: 560, lit: false },
      { x: 1180, y: 560, lit: false },
      { x: 1650, y: 560, lit: false },
      { x: 2050, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 520, y: 640, active: true },
      { x: 1725, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 840, y: 620, kind: "coil" },
      { x: 1260, y: 626, kind: "seed" }
    ],
    puddles: [
      { x: 320, y: 664, width: 132, height: 20 },
      { x: 1210, y: 662, width: 190, height: 22 },
      { x: 1990, y: 662, width: 145, height: 18 }
    ],
    mistBands: [
      { x: 160, y: 496, width: 260, speed: 11 },
      { x: 900, y: 446, width: 340, speed: 10 },
      { x: 1600, y: 508, width: 310, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "market-lantern-grid",
      kind: "path-puzzle",
      puzzleTheme: "market-lanterns",
      x: 1120,
      y: 560,
      radius: 245,
      complete: false,
      progress: 0,
      scanText: "Robot scan: market lantern grid is dark.",
      puzzleText: "Rotate the brass paths to relight the stalls.",
      rewardText: "Lantern grid restored. The market opens under the rain.",
      onwardText: "",
      nextText: "The supply rail beyond the market needs a signal.",
      nextSceneId: "chapter-two/glassrail-crossing",
      reactions: [
        { text: "The stalls can open!", x: 760, y: 332 },
        { text: "Warm light again.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Market lights are out from stall to stall." },
        puzzle: { speaker: "player", text: "Then we route one glow line to all of them." },
        reward: { speaker: "robot", text: "Lantern grid linked. Cozy commerce restored." },
        next: { speaker: "player", text: "Let's check the crossing before supplies roll in." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
