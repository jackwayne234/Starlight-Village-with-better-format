import { createBaseScene } from "../baseScene.js";

export function createCloudHarvesterScene() {
  const scene = createBaseScene({
    id: "chapter-four/cloud-harvester",
    title: "Cloud Harvester",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1030, moonY: 118, cloudDrift: 1.7, hillOffset: 152, ridgeOffset: 196 };
  scene.cloudHarvester = {
    x: 1120,
    groundY: 662,
    fixed: false,
    condenserTuned: false
  };
  scene.spriteLandmark = {
    source: "chapterFourLandmarks",
    sprite: "cloudHarvester",
    state: scene.cloudHarvester,
    x: 1120,
    groundY: 668,
    height: 432,
    glow: { heightRatio: 0.42, radius: 230, fixedIntensity: 0.34, dimIntensity: 0.1, pulse: 0.05 },
    dimFilter: "brightness(0.72) saturate(0.88)",
    fixedFilter: "brightness(0.94) saturate(1.04)"
  };
  scene.layers = {
    trees: [
      { x: 76, y: 286, scale: 1.56 },
      { x: 348, y: 268, scale: 1.64 },
      { x: 704, y: 306, scale: 1.46 },
      { x: 1518, y: 292, scale: 1.52 },
      { x: 1846, y: 274, scale: 1.62 },
      { x: 2092, y: 306, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 338, y: 560, lit: true },
      { x: 792, y: 560, lit: false },
      { x: 1470, y: 560, lit: false },
      { x: 1998, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 142, y: 640, active: true },
      { x: 2052, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 638, groundY: 670, height: 118, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1572, groundY: 670, height: 128, alpha: 0.74 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 270, y: 662, width: 166, height: 20 },
      { x: 1120, y: 668, width: 390, height: 24 },
      { x: 1904, y: 661, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 125, y: 418, width: 450, speed: 20 },
      { x: 765, y: 378, width: 530, speed: 23 },
      { x: 1415, y: 462, width: 430, speed: 20 }
    ]
  };

  scene.repairs = [
    {
      id: "cloud-harvester",
      kind: "path-puzzle",
      puzzleTheme: "water-routing",
      puzzleLayout: "ch4-cloud-harvester",
      x: 1120,
      y: 508,
      radius: 260,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the cloud harvester is catching rain but sending it nowhere useful.",
      puzzleText: "Rotate the condenser channels until clean water runs into the ridge basins.",
      rewardText: "Cloud Harvester restored. Clean rainwater gathers safely on the ridge.",
      onwardText: "The harvester is tuned.",
      nextText: "Summit Path is next.",
      nextSceneId: "chapter-four/summit-path",
      reactions: [
        { text: "Clean water is flowing!", x: 1120, y: 292 },
        { text: "Condenser tuned.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The condenser is catching rain but wasting the flow." },
        puzzle: { speaker: "player", text: "Tune the channels into the clean-water basins." },
        reward: { speaker: "robot", text: "Condenser tuned." },
        next: { speaker: "player", text: "Summit Path is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
