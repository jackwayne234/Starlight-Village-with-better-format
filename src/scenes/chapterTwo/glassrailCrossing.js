import { createBaseScene } from "../baseScene.js";

export function createGlassrailCrossingScene() {
  const scene = createBaseScene({
    id: "chapter-two/glassrail-crossing",
    title: "Glassrail Crossing",
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 290;
  scene.robot.x = 404;
  scene.backdrop = { moonX: 1040, moonY: 146, cloudDrift: 1.05, hillOffset: -34, ridgeOffset: 28 };
  scene.layers = {
    trees: [
      { x: 120, y: 272, scale: 1.55 },
      { x: 560, y: 312, scale: 1.36 },
      { x: 1510, y: 288, scale: 1.52 },
      { x: 2050, y: 282, scale: 1.5 }
    ],
    cottages: [
      { x: 360, y: 536, scale: 1.78, lit: false },
      { x: 1780, y: 532, scale: 1.96, lit: false }
    ],
    lamps: [
      { x: 250, y: 560, lit: false },
      { x: 700, y: 560, lit: false },
      { x: 1220, y: 560, lit: false },
      { x: 1880, y: 560, lit: false }
    ],
    glowPlants: [
      { x: 960, y: 638, active: false },
      { x: 1370, y: 640, active: true }
    ],
    brokenBranches: [
      { x: 830, y: 630, rotation: -0.2 },
      { x: 1440, y: 634, rotation: 0.14 }
    ],
    repairParts: [
      { x: 1160, y: 626, kind: "gear" }
    ],
    puddles: [
      { x: 410, y: 664, width: 120, height: 20 },
      { x: 1010, y: 662, width: 260, height: 22 },
      { x: 1690, y: 660, width: 160, height: 18 }
    ],
    mistBands: [
      { x: 90, y: 506, width: 310, speed: 12 },
      { x: 770, y: 462, width: 420, speed: 16 },
      { x: 1490, y: 514, width: 360, speed: 11 }
    ]
  };

  scene.repairs = [
    {
      id: "glassrail-signal",
      kind: "path-puzzle",
      puzzleTheme: "rail-signal",
      x: 1180,
      y: 560,
      radius: 250,
      complete: false,
      progress: 0,
      scanText: "Robot scan: crossing signal disconnected.",
      puzzleText: "Rotate the signal paths before the supply cart reaches the crossing.",
      rewardText: "Crossing signal restored. The supply rail is safe.",
      onwardText: "",
      nextText: "The old observatory is catching a strange pulse.",
      nextSceneId: "chapter-two/old-observatory",
      reactions: [
        { text: "Signal lamps are back!", x: 720, y: 328 },
        { text: "Cart path is safe.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "Supply rail signal is blinking in nonsense." },
        puzzle: { speaker: "player", text: "We align the crossing lights, then nobody guesses in the rain." },
        reward: { speaker: "robot", text: "Crossing signal linked. Cart drivers may unclench." },
        next: { speaker: "robot", text: "A pulse is bouncing from the old observatory." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
