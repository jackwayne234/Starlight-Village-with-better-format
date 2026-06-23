import { createBaseScene } from "../baseScene.js";

export function createBakeryGutterScene() {
  const scene = createBaseScene({
    id: "chapter-one/bakery-gutter",
    title: "Bakery Gutter",
    worldWidth: 2180,
    startMessage: ""
  });

  scene.player.x = 310;
  scene.robot.x = 420;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 780, moonY: 150, cloudDrift: 0.78, hillOffset: 8, ridgeOffset: 30 };
  scene.bakeryGutter = {
    x: 1120,
    groundY: 620,
    fixed: false,
    awningWidth: 560,
    barrelX: 1390
  };
  scene.layers = {
    trees: [
      { x: 105, y: 282, scale: 1.46 },
      { x: 675, y: 296, scale: 1.36 },
      { x: 1660, y: 280, scale: 1.5 },
      { x: 2065, y: 300, scale: 1.38 }
    ],
    cottages: [],
    foliage: [
      { kind: "rainyRocksReeds", x: 720, groundY: 658, height: 96, alpha: 0.72 },
      { kind: "glowfenLeafLitter", x: 1515, groundY: 680, height: 98, alpha: 0.78 }
    ],
    lamps: [
      { x: 260, y: 560, lit: true },
      { x: 780, y: 560, lit: false },
      { x: 1500, y: 560, lit: false },
      { x: 1980, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2060, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 640, y: 664, width: 132, height: 20 },
      { x: 1190, y: 662, width: 220, height: 23 },
      { x: 1840, y: 660, width: 135, height: 18 }
    ],
    mistBands: [
      { x: 140, y: 496, width: 240, speed: 11 },
      { x: 820, y: 446, width: 330, speed: 10 },
      { x: 1580, y: 508, width: 300, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "bakery-gutter",
      kind: "path-puzzle",
      puzzleTheme: "water-routing",
      x: 1180,
      y: 548,
      radius: 250,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: bakery gutter is spilling into the awning.",
      puzzleText: "Rotate the gutter channels to send rain into the barrel.",
      rewardText: "Bakery gutter restored. Rain slides neatly into the barrel.",
      onwardText: "The bakery is dry enough to bake again.",
      nextText: "The bell rope corner is next.",
      nextSceneId: "chapter-one/bell-rope-corner",
      reactions: [
        { text: "The awning stopped leaking!", x: 1120, y: 350 },
        { text: "Dry pastry probability rising.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The bakery roof is making soup where bread should be." },
        puzzle: { speaker: "player", text: "Gutters first. Pastries later." },
        reward: { speaker: "robot", text: "Rain captured. Bakery morale restored." },
        next: { speaker: "player", text: "Let's check the bell rope." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
