import { createBaseScene } from "../baseScene.js";

export function createWeatherVaneRoofScene() {
  const scene = createBaseScene({
    id: "chapter-four/weather-vane-roof",
    title: "Weather Vane Roof",
    worldWidth: 2180,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1040, moonY: 126, cloudDrift: 1.4, hillOffset: 118, ridgeOffset: 160 };
  scene.weatherVaneRoof = {
    x: 1120,
    groundY: 650,
    fixed: false,
    vaneAligned: false
  };
  scene.layers = {
    trees: [
      { x: 80, y: 286, scale: 1.52 },
      { x: 330, y: 268, scale: 1.62 },
      { x: 720, y: 302, scale: 1.44 },
      { x: 1510, y: 292, scale: 1.5 },
      { x: 1860, y: 276, scale: 1.56 }
    ],
    cottages: [],
    lamps: [
      { x: 360, y: 560, lit: true },
      { x: 820, y: 560, lit: false },
      { x: 1470, y: 560, lit: false },
      { x: 1980, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 140, y: 640, active: true },
      { x: 2020, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 700, groundY: 668, height: 112, alpha: 0.78 },
      { kind: "rainyRocksReeds", x: 1530, groundY: 666, height: 118, alpha: 0.74 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 250, y: 662, width: 160, height: 20 },
      { x: 1120, y: 666, width: 330, height: 26 },
      { x: 1870, y: 660, width: 154, height: 18 }
    ],
    mistBands: [
      { x: 120, y: 422, width: 420, speed: 16 },
      { x: 760, y: 384, width: 480, speed: 19 },
      { x: 1410, y: 464, width: 380, speed: 17 }
    ]
  };

  scene.repairs = [
    {
      id: "weather-vane-roof",
      kind: "path-puzzle",
      puzzleTheme: "storm-gauge",
      x: 1120,
      y: 520,
      radius: 250,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: roof vanes are fighting the wind channels.",
      puzzleText: "Rotate the storm paths until the vane points wind through the safe channel.",
      rewardText: "Weather Vane Roof restored. Wind moves cleanly over the ridge.",
      onwardText: "The roofline is steady.",
      nextText: "Cliff Rope Lift is next.",
      nextSceneId: "chapter-four/cliff-rope-lift",
      reactions: [
        { text: "Wind is flowing right!", x: 1120, y: 304 },
        { text: "Vane alignment stable.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The roof vanes are arguing with every gust." },
        puzzle: { speaker: "player", text: "Turn the channels so the wind has somewhere safe to go." },
        reward: { speaker: "robot", text: "Vane alignment stable." },
        next: { speaker: "player", text: "Cliff Rope Lift is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
