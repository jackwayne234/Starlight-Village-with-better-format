import { createBaseScene } from "../baseScene.js";

export function createCliffRopeLiftScene() {
  const scene = createBaseScene({
    id: "chapter-four/cliff-rope-lift",
    title: "Cliff Rope Lift",
    worldWidth: 2200,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1060, moonY: 130, cloudDrift: 1.48, hillOffset: 132, ridgeOffset: 176 };
  scene.cliffRopeLift = {
    x: 1120,
    groundY: 656,
    fixed: false,
    basketRaised: false
  };
  scene.layers = {
    trees: [
      { x: 70, y: 292, scale: 1.54 },
      { x: 345, y: 270, scale: 1.62 },
      { x: 715, y: 304, scale: 1.46 },
      { x: 1505, y: 292, scale: 1.52 },
      { x: 1815, y: 276, scale: 1.6 },
      { x: 2070, y: 306, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 330, y: 560, lit: true },
      { x: 805, y: 560, lit: false },
      { x: 1455, y: 560, lit: false },
      { x: 1985, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 132, y: 640, active: true },
      { x: 2050, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 612, groundY: 670, height: 126, alpha: 0.8 },
      { kind: "rainyRocksReeds", x: 1588, groundY: 670, height: 132, alpha: 0.76 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 270, y: 662, width: 166, height: 20 },
      { x: 1118, y: 666, width: 284, height: 24 },
      { x: 1890, y: 661, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 130, y: 424, width: 430, speed: 17 },
      { x: 760, y: 382, width: 500, speed: 20 },
      { x: 1410, y: 462, width: 390, speed: 18 }
    ]
  };

  scene.repairs = [
    {
      id: "cliff-rope-lift",
      kind: "path-puzzle",
      puzzleTheme: "storm-gauge",
      x: 1120,
      y: 512,
      radius: 252,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: cliff lift pulleys are pulling unevenly.",
      puzzleText: "Rotate the storm paths until the lift ropes share the load.",
      rewardText: "Cliff Rope Lift restored. The basket rises steady between the cliff posts.",
      onwardText: "The lift line is balanced.",
      nextText: "Wind Chime Pass is next.",
      nextSceneId: "chapter-four/wind-chime-pass",
      reactions: [
        { text: "The basket is level!", x: 1120, y: 300 },
        { text: "Pulley tension stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The rope tension is lopsided. Very rude physics." },
        puzzle: { speaker: "player", text: "Balance the pulleys before the basket climbs." },
        reward: { speaker: "robot", text: "Pulley tension stable." },
        next: { speaker: "player", text: "Wind Chime Pass is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
