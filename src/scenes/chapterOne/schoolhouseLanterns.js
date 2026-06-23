import { createBaseScene } from "../baseScene.js";

export function createSchoolhouseLanternsScene() {
  const scene = createBaseScene({
    id: "chapter-one/schoolhouse-lanterns",
    title: "Schoolhouse Lanterns",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 425;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 760, moonY: 150, cloudDrift: 0.72, hillOffset: 12, ridgeOffset: 34 };
  scene.schoolhouseLanterns = {
    x: 1160,
    groundY: 630,
    fixed: false,
    posts: [
      { x: 870, lit: false },
      { x: 1160, lit: false },
      { x: 1450, lit: false }
    ]
  };
  scene.layers = {
    trees: [
      { x: 120, y: 286, scale: 1.46 },
      { x: 585, y: 304, scale: 1.36 },
      { x: 1660, y: 282, scale: 1.5 },
      { x: 2070, y: 296, scale: 1.42 }
    ],
    cottages: [
      { x: 420, y: 536, scale: 1.88, lit: true },
      { x: 1850, y: 534, scale: 2.0, lit: false }
    ],
    foliage: [
      { kind: "glowfenLeafLitter", x: 720, groundY: 682, height: 92, alpha: 0.76 },
      { kind: "rainyRocksReeds", x: 1530, groundY: 660, height: 102, alpha: 0.74 }
    ],
    lamps: [
      { x: 250, y: 560, lit: true },
      { x: 730, y: 560, lit: false },
      { x: 1590, y: 560, lit: false },
      { x: 2010, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2050, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [
      { x: 930, y: 624, kind: "seed" },
      { x: 1375, y: 626, kind: "coil" }
    ],
    puddles: [
      { x: 360, y: 664, width: 126, height: 20 },
      { x: 1160, y: 662, width: 202, height: 22 },
      { x: 1885, y: 660, width: 138, height: 18 }
    ],
    mistBands: [
      { x: 150, y: 502, width: 250, speed: 10 },
      { x: 840, y: 448, width: 330, speed: 11 },
      { x: 1560, y: 514, width: 300, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "schoolhouse-lanterns",
      kind: "path-puzzle",
      puzzleTheme: "market-lanterns",
      x: 1160,
      y: 545,
      radius: 260,
      complete: false,
      progress: 0,
      scanText: "Robot scan: schoolhouse lantern chain is dark.",
      puzzleText: "Rotate the lantern paths to connect all three posts.",
      rewardText: "Schoolhouse lanterns restored. Warm light gathers along the steps.",
      onwardText: "The schoolhouse path is bright again.",
      nextText: "Market Awnings are next.",
      nextSceneId: "chapter-one/market-awnings",
      reactions: [
        { text: "All three lanterns lit!", x: 1160, y: 320 },
        { text: "Classroom glow restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Three lanterns, zero glow. Suspiciously educational." },
        puzzle: { speaker: "player", text: "One path for all three lights." },
        reward: { speaker: "robot", text: "Classroom glow restored." },
        next: { speaker: "player", text: "Let's dry out the market awnings." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
