import { createBaseScene } from "../baseScene.js";

export function createOldFootbridgeScene() {
  const scene = createBaseScene({
    id: "chapter-one/old-footbridge",
    title: "Old Footbridge",
    worldWidth: 2240,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 425;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 950, moonY: 146, cloudDrift: 0.88, hillOffset: 34, ridgeOffset: 66 };
  scene.oldFootbridge = {
    x: 1160,
    groundY: 648,
    fixed: false,
    width: 560
  };
  scene.paintedLandmark = {
    sprite: "oldFootbridge",
    state: scene.oldFootbridge,
    x: 1160,
    groundY: 672,
    height: 470,
    glow: { heightRatio: 0.38, radius: 150, fixedIntensity: 0.38, dimIntensity: 0.14 }
  };
  scene.layers = {
    trees: [
      { x: 120, y: 282, scale: 1.52 },
      { x: 530, y: 302, scale: 1.4 },
      { x: 1640, y: 280, scale: 1.54 },
      { x: 2080, y: 294, scale: 1.44 }
    ],
    cottages: [],
    foliage: [
      { kind: "rainyRocksReeds", x: 760, groundY: 662, height: 108, alpha: 0.82 },
      { kind: "glowfenBridgeReeds", x: 1015, groundY: 652, height: 124, alpha: 0.86 },
      { kind: "glowfenBridgeReeds", x: 1300, groundY: 652, height: 132, alpha: 0.86 },
      { kind: "rainyRocksReeds", x: 1585, groundY: 662, height: 104, alpha: 0.78 }
    ],
    lamps: [
      { x: 250, y: 560, lit: true },
      { x: 770, y: 560, lit: false },
      { x: 1580, y: 560, lit: false },
      { x: 2030, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2050, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 360, y: 664, width: 126, height: 20 },
      { x: 1885, y: 660, width: 138, height: 18 }
    ],
    mistBands: [
      { x: 130, y: 502, width: 250, speed: 10 },
      { x: 840, y: 450, width: 350, speed: 12 },
      { x: 1560, y: 514, width: 310, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "old-footbridge",
      kind: "path-puzzle",
      puzzleTheme: "glow-bridge",
      x: 1160,
      y: 545,
      radius: 275,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: old footbridge planks are loose.",
      puzzleText: "Rotate the brace paths to lock the bridge planks.",
      rewardText: "Old footbridge restored. The planks hold steady over the stream.",
      onwardText: "The crossing is safe enough for small boots.",
      nextText: "Rain Drain Corner is next.",
      nextSceneId: "chapter-one/rain-drain-corner",
      reactions: [
        { text: "The bridge is steady!", x: 1160, y: 322 },
        { text: "Plank wobble reduced.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Bridge confidence is below recommended wobble levels." },
        puzzle: { speaker: "player", text: "Brace the loose planks before we cross." },
        reward: { speaker: "robot", text: "Plank wobble reduced. Crossing approved." },
        next: { speaker: "player", text: "Now for that clogged rain drain." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
