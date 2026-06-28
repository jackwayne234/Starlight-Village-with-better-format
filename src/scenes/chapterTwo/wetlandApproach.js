import { createBaseScene } from "../baseScene.js";

export function createWetlandApproachScene() {
  const scene = createBaseScene({
    id: "chapter-two/wetland-approach",
    title: "Wetland Approach",
    worldWidth: 2180,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 880, moonY: 136, cloudDrift: 0.92, hillOffset: 28, ridgeOffset: 68 };
  scene.wetlandApproach = {
    x: 1160,
    groundY: 650,
    fixed: false,
    waymarkLit: false
  };
  scene.spriteLandmark = {
    source: "chapterTwoLandmarks",
    sprite: "sunkenRouteMarker",
    state: scene.wetlandApproach,
    x: 1160,
    groundY: 746,
    height: 380,
    wetlandBlend: { yOffset: -48, widthRatio: 0.92, height: 128 },
    glow: { xOffset: -24, heightRatio: 0.58, radius: 175, fixedIntensity: 0.36, dimIntensity: 0.12, pulse: 0.05 }
  };
  scene.layers = {
    trees: [
      { x: 70, y: 270, scale: 1.5 },
      { x: 310, y: 300, scale: 1.36 },
      { x: 650, y: 282, scale: 1.48 },
      { x: 1580, y: 292, scale: 1.5 },
      { x: 2030, y: 274, scale: 1.54 }
    ],
    cottages: [],
    foliage: [
      { kind: "rainyRocksReeds", x: 360, groundY: 650, height: 124, alpha: 0.82 },
      { kind: "glowfenBridgeReeds", x: 785, groundY: 654, height: 148, alpha: 0.88 },
      { kind: "glowfenLeafLitter", x: 1040, groundY: 692, height: 104, alpha: 0.78 },
      { kind: "glowfenGlowRocks", x: 1440, groundY: 654, height: 116, alpha: 0.72 },
      { kind: "glowfenBridgeReeds", x: 1710, groundY: 654, height: 152, alpha: 0.9 }
    ],
    lamps: [
      { x: 300, y: 560, lit: true },
      { x: 930, y: 560, lit: false },
      { x: 1900, y: 560, lit: false }
    ],
    glowPlants: [
      { x: 1580, y: 638, active: false },
      { x: 2020, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 410, y: 664, width: 132, height: 20 },
      { x: 1840, y: 660, width: 148, height: 18 }
    ],
    mistBands: [
      { x: 170, y: 508, width: 260, speed: 8 },
      { x: 820, y: 526, width: 320, speed: 10 },
      { x: 1440, y: 500, width: 290, speed: 9 }
    ]
  };

  scene.repairs = [
    {
      id: "wetland-waymark",
      kind: "path-puzzle",
      puzzleTheme: "beacon-signal",
      puzzleLayout: "ch2-wetland-approach",
      x: 1160,
      y: 552,
      radius: 275,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: first wetland waymark is dim.",
      puzzleText: "Rotate the signal paths to lift the wetland waymark.",
      rewardText: "Wetland approach restored. The village path opens into the reeds.",
      onwardText: "The wetland path is visible now.",
      nextText: "Glowfen Grove is next.",
      nextSceneId: "chapter-two/glowfen-grove",
      reactions: [
        { text: "The reeds are opening!", x: 1160, y: 318 },
        { text: "Wetland route marked.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The path is here. It just needs one polite signal." },
        puzzle: { speaker: "player", text: "Light the marker, then we step into the reeds." },
        reward: { speaker: "robot", text: "Wetland route marked." },
        next: { speaker: "player", text: "Glowfen Grove is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
