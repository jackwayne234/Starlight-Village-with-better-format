import { createBaseScene } from "../baseScene.js";

export function createWorkshopLiftScene() {
  const scene = createBaseScene({
    id: "chapter-one/workshop-lift",
    title: "Workshop Lift",
    worldWidth: 2200,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 425;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 830, moonY: 146, cloudDrift: 0.8, hillOffset: 20, ridgeOffset: 48 };
  scene.workshopLift = {
    x: 1160,
    groundY: 628,
    fixed: false,
    platformRaised: false
  };
  scene.paintedLandmark = {
    sprite: "workshopLift",
    state: scene.workshopLift,
    x: 1160,
    groundY: 664,
    height: 540,
    glow: { xOffset: 20, heightRatio: 0.5, radius: 132, fixedIntensity: 0.38, dimIntensity: 0.14 }
  };
  scene.layers = {
    trees: [
      { x: 115, y: 286, scale: 1.44 },
      { x: 560, y: 304, scale: 1.36 },
      { x: 1630, y: 282, scale: 1.5 },
      { x: 2070, y: 294, scale: 1.42 }
    ],
    cottages: [],
    foliage: [
      { kind: "rainyRocksReeds", x: 760, groundY: 660, height: 96, alpha: 0.72 },
      { kind: "glowfenLeafLitter", x: 1520, groundY: 682, height: 104, alpha: 0.78 }
    ],
    lamps: [
      { x: 260, y: 560, lit: true },
      { x: 770, y: 560, lit: false },
      { x: 1485, y: 560, lit: false },
      { x: 1990, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 2040, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 360, y: 664, width: 126, height: 20 },
      { x: 1160, y: 662, width: 190, height: 22 },
      { x: 1870, y: 660, width: 138, height: 18 }
    ],
    mistBands: [
      { x: 150, y: 502, width: 250, speed: 10 },
      { x: 820, y: 448, width: 330, speed: 11 },
      { x: 1540, y: 514, width: 300, speed: 13 }
    ]
  };

  scene.repairs = [
    {
      id: "workshop-lift",
      kind: "path-puzzle",
      puzzleTheme: "rail-signal",
      x: 1160,
      y: 548,
      radius: 250,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: workshop lift crank is slipping.",
      puzzleText: "Rotate the lift paths to balance the platform.",
      rewardText: "Workshop lift restored. Parts can reach the roof shelf again.",
      onwardText: "The workshop can move repairs upward.",
      nextText: "Schoolhouse Lanterns are next.",
      nextSceneId: "chapter-one/schoolhouse-lanterns",
      reactions: [
        { text: "The platform is steady!", x: 1160, y: 330 },
        { text: "Lift balance nominal.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "The lift wants to go up and down at the same time." },
        puzzle: { speaker: "player", text: "Balance the crank, then raise it gently." },
        reward: { speaker: "robot", text: "Lift balance nominal. Roof shelf reachable." },
        next: { speaker: "robot", text: "Schoolhouse Lanterns are next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
