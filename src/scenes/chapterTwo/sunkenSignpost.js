import { createBaseScene } from "../baseScene.js";

export function createSunkenSignpostScene() {
  const scene = createBaseScene({
    id: "chapter-two/sunken-signpost",
    title: "Sunken Signpost",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 900, moonY: 144, cloudDrift: 0.96, hillOffset: 58, ridgeOffset: 92 };
  scene.sunkenSignpost = {
    x: 1160,
    groundY: 652,
    fixed: false,
    markerRaised: false
  };
  scene.layers = {
    trees: [
      { x: 55, y: 264, scale: 1.62 },
      { x: 245, y: 303, scale: 1.44 },
      { x: 630, y: 278, scale: 1.56 },
      { x: 1545, y: 292, scale: 1.5 },
      { x: 2055, y: 270, scale: 1.58 }
    ],
    cottages: [],
    foliage: [
      { kind: "glowfenBridgeReeds", x: 740, groundY: 654, height: 148, alpha: 0.92 },
      { kind: "glowfenGlowRocks", x: 950, groundY: 654, height: 124, alpha: 0.82 },
      { kind: "glowfenLeafLitter", x: 1370, groundY: 692, height: 110, alpha: 0.82 },
      { kind: "glowfenBridgeReeds", x: 1640, groundY: 654, height: 150, alpha: 0.9 }
    ],
    lamps: [
      { x: 300, y: 560, lit: true },
      { x: 760, y: 560, lit: false },
      { x: 1580, y: 560, lit: false },
      { x: 2040, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 140, y: 640, active: true },
      { x: 1980, y: 638, active: false }
    ],
    brokenBranches: [
      { x: 1020, y: 636, scale: 0.62 }
    ],
    repairParts: [
      { x: 920, y: 624, kind: "gear" },
      { x: 1390, y: 626, kind: "seed" }
    ],
    puddles: [
      { x: 330, y: 664, width: 132, height: 20 },
      { x: 1900, y: 660, width: 146, height: 18 }
    ],
    mistBands: [
      { x: 160, y: 505, width: 270, speed: 8 },
      { x: 805, y: 526, width: 340, speed: 10 },
      { x: 1445, y: 496, width: 300, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "sunken-signpost",
      kind: "path-puzzle",
      puzzleTheme: "junction-line",
      x: 1160,
      y: 552,
      radius: 275,
      complete: false,
      progress: 0,
      scanText: "Robot scan: path marker is sunk under the reeds.",
      puzzleText: "Rotate the marker paths to lift the carved post.",
      rewardText: "Sunken marker restored. The reed lights show the route without arrows.",
      onwardText: "The wetland marker is visible again.",
      nextText: "Mist Pool is next.",
      nextSceneId: "chapter-two/mist-pool",
      reactions: [
        { text: "The marker rose up!", x: 1160, y: 318 },
        { text: "Route marker restored.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "This marker is mostly being a mud secret." },
        puzzle: { speaker: "player", text: "Lift it by the glow lines, not by guessing." },
        reward: { speaker: "robot", text: "Route marker restored. No arrows required." },
        next: { speaker: "player", text: "Mist Pool is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
