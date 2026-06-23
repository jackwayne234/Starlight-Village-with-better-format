import { createBaseScene } from "../baseScene.js";

export function createRainSlickRailsScene() {
  const scene = createBaseScene({
    id: "chapter-three/rain-slick-rails",
    title: "Rain-Slick Rails",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 948, moonY: 142, cloudDrift: 1.02, hillOffset: 52, ridgeOffset: 78 };
  scene.rainSlickRails = { x: 1160, groundY: 654, fixed: false, railsSanded: false };
  scene.layers = {
    trees: [
      { x: 70, y: 282, scale: 1.54 },
      { x: 286, y: 314, scale: 1.36 },
      { x: 748, y: 292, scale: 1.48 },
      { x: 1538, y: 276, scale: 1.56 },
      { x: 2008, y: 310, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 345, y: 560, lit: true },
      { x: 780, y: 560, lit: false },
      { x: 1540, y: 560, lit: false },
      { x: 1985, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 875, y: 638, active: false },
      { x: 1450, y: 638, active: false },
      { x: 2045, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 710, groundY: 670, height: 124, alpha: 0.88 },
      { kind: "mosslineConduitCoils", x: 972, groundY: 682, height: 114, alpha: 0.9 },
      { kind: "mosslinePuddleGround", x: 1248, groundY: 696, height: 124, alpha: 0.82 },
      { kind: "mosslineSwitchFoliage", x: 1565, groundY: 670, height: 126, alpha: 0.88 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 255, y: 662, width: 160, height: 18 },
      { x: 1160, y: 668, width: 520, height: 32 },
      { x: 1845, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 170, y: 430, width: 315, speed: 8 },
      { x: 800, y: 398, width: 385, speed: 12 },
      { x: 1410, y: 470, width: 345, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "rain-slick-rails",
      kind: "path-puzzle",
      puzzleTheme: "water-routing",
      x: 1160,
      y: 540,
      radius: 292,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the rails are too slick for the next cart.",
      puzzleText: "Route sand through the valves until the wet rails grip again.",
      rewardText: "Rain-Slick Rails restored. Sand coats the shining track and the rail path is usable.",
      onwardText: "The rails have grip again.",
      nextText: "Tunnel Mouth is next.",
      nextSceneId: "chapter-three/tunnel-mouth",
      reactions: [
        { text: "Rails have grip!", x: 1160, y: 302 },
        { text: "Sand route confirmed.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Those rails are shiny in the bad way." },
        puzzle: { speaker: "player", text: "Open the sand valves and give the wheels grip." },
        reward: { speaker: "robot", text: "Sand route confirmed." },
        next: { speaker: "player", text: "Tunnel Mouth is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
