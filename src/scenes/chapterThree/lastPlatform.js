import { createBaseScene } from "../baseScene.js";

export function createLastPlatformScene() {
  const scene = createBaseScene({
    id: "chapter-three/last-platform",
    title: "Last Platform",
    worldWidth: 2260,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 930, moonY: 132, cloudDrift: 0.86, hillOffset: 68, ridgeOffset: 104 };
  scene.lastPlatform = {
    x: 1160,
    groundY: 642,
    fixed: false,
    platformLit: false
  };
  scene.paintedLandmark = {
    source: "chapterThreeLandmarks",
    sprite: "lastPlatformSide",
    state: scene.lastPlatform,
    x: 1160,
    groundY: 674,
    height: 478,
    dimFilter: "brightness(0.76) saturate(0.9)",
    fixedFilter: "brightness(1.04) saturate(1.08)",
    glow: {
      xOffset: 190,
      yOffset: -282,
      radius: 210,
      dimIntensity: 0.08,
      fixedIntensity: 0.3,
      pulse: 0.04
    }
  };
  scene.layers = {
    trees: [
      { x: 70, y: 286, scale: 1.5 },
      { x: 300, y: 314, scale: 1.36 },
      { x: 686, y: 292, scale: 1.44 },
      { x: 1540, y: 284, scale: 1.5 },
      { x: 1905, y: 306, scale: 1.38 },
      { x: 2140, y: 294, scale: 1.46 }
    ],
    cottages: [],
    lamps: [
      { x: 330, y: 560, lit: true },
      { x: 815, y: 560, lit: false },
      { x: 1500, y: 560, lit: false },
      { x: 2010, y: 560, lit: true }
    ],
    glowPlants: [
      { x: 150, y: 640, active: true },
      { x: 900, y: 638, active: false },
      { x: 1460, y: 638, active: false },
      { x: 2090, y: 638, active: false }
    ],
    foliage: [
      { kind: "mosslineSwitchFoliage", x: 635, groundY: 672, height: 126, alpha: 0.88 },
      { kind: "mosslinePuddleGround", x: 1010, groundY: 696, height: 128, alpha: 0.78 },
      { kind: "mosslineSwitchFoliage", x: 1615, groundY: 672, height: 124, alpha: 0.88 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 265, y: 662, width: 148, height: 18 },
      { x: 1160, y: 668, width: 440, height: 28 },
      { x: 1860, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 150, y: 426, width: 310, speed: 8 },
      { x: 810, y: 396, width: 400, speed: 11 },
      { x: 1460, y: 466, width: 350, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "last-platform",
      kind: "path-puzzle",
      puzzleTheme: "market-lanterns",
      puzzleLayout: "ch3-last-platform",
      x: 1160,
      y: 528,
      radius: 286,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: "Robot scan: the final platform lamp is dark and the hill road is not marked.",
      puzzleText: "Rotate the lantern paths until the platform lamp points toward the hill road.",
      rewardText: "Last Platform restored. The end-of-line lamp opens the road to Stormedge Rise.",
      onwardText: "The hill road is lit.",
      nextText: "Stormedge Rise waits beyond the rain.",
      nextSceneId: "chapter-four/stormedge-rise",
      transitionPage: {
        sprite: "mosslineToStormedge",
        nextSceneId: "chapter-four/stormedge-rise",
        nextText: "Climbing into Stormedge Rise.",
        prompt: "Press Space, Enter, or E to step onto the storm ridge"
      },
      chapterComplete: {
        title: "Mossline Restored",
        subtitle: "All Mossline signals are restored, and the road toward the storm ridge is open.",
        checklist: [
          "Junction current steadied",
          "Rail signals and relays restored",
          "Last Platform lamp opened the hill road"
        ],
        prompt: "Press Space, Enter, or E to continue"
      },
      reactions: [
        { text: "Road lamp is open!", x: 1160, y: 292 },
        { text: "Mossline route complete.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "This is the last Mossline platform, but the lamp has lost the hill road." },
        puzzle: { speaker: "player", text: "Aim the platform light and we can leave the rails behind." },
        reward: { speaker: "robot", text: "Platform lamp restored. Stormedge road visible." },
        next: { speaker: "player", text: "Stormedge Rise is next." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
