import { createBaseScene } from "../baseScene.js";

export function createSummitPathScene() {
  const scene = createBaseScene({
    id: "chapter-four/summit-path",
    title: "Summit Path",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1045, moonY: 116, cloudDrift: 1.76, hillOffset: 160, ridgeOffset: 208 };
  scene.summitPath = {
    x: 1120,
    groundY: 666,
    fixed: false,
    markersLit: false
  };
  scene.layers = {
    trees: [
      { x: 70, y: 284, scale: 1.56 },
      { x: 338, y: 268, scale: 1.66 },
      { x: 694, y: 306, scale: 1.48 },
      { x: 1518, y: 294, scale: 1.54 },
      { x: 1852, y: 276, scale: 1.62 },
      { x: 2098, y: 308, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 336, y: 560, lit: true },
      { x: 790, y: 560, lit: false },
      { x: 1472, y: 560, lit: false },
      { x: 2002, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 142, y: 640, active: true },
      { x: 2052, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 630, groundY: 670, height: 120, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1580, groundY: 670, height: 126, alpha: 0.74 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 270, y: 662, width: 164, height: 20 },
      { x: 1120, y: 668, width: 400, height: 24 },
      { x: 1904, y: 661, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 120, y: 412, width: 470, speed: 22 },
      { x: 760, y: 364, width: 550, speed: 25 },
      { x: 1420, y: 452, width: 450, speed: 21 }
    ]
  };

  scene.repairs = [
    {
      id: "summit-path",
      kind: "path-puzzle",
      puzzleTheme: "storm-gauge",
      x: 1120,
      y: 508,
      radius: 260,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the summit path markers are dark inside the high mist.",
      puzzleText: "Rotate the marker paths until each lamp catches the route signal.",
      rewardText: "Summit Path restored. The high mist has a safe line of lights.",
      onwardText: "The summit markers are lit.",
      nextText: "Beacon Approach is next.",
      nextSceneId: "chapter-four/beacon-approach",
      reactions: [
        { text: "The summit path is marked!", x: 1120, y: 292 },
        { text: "Marker chain stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The marker lamps are losing each other in the mist." },
        puzzle: { speaker: "player", text: "Link the markers so the path can be seen." },
        reward: { speaker: "robot", text: "Marker chain stable." },
        next: { speaker: "player", text: "Beacon Approach is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
