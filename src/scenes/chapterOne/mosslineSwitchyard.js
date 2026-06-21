import { createBaseScene } from "../baseScene.js";

export function createMosslineSwitchyardScene() {
  const scene = createBaseScene({
    id: "chapter-one/mossline-switchyard",
    title: "Mossline Switchyard",
    worldWidth: 2050,
    startMessage: ""
  });

  scene.player.x = 300;
  scene.robot.x = 412;
  scene.backdrop = { moonX: 965, moonY: 150, cloudDrift: 1.05, hillOffset: 42, ridgeOffset: 66 };
  scene.switchyard = {
    poles: [
      { x: 520, y: 496, height: 210, lit: false },
      { x: 930, y: 488, height: 235, lit: true },
      { x: 1370, y: 508, height: 205, lit: false },
      { x: 1760, y: 490, height: 225, lit: false }
    ],
    boxes: [
      { x: 720, y: 606, lit: true },
      { x: 1165, y: 606, lit: false },
      { x: 1570, y: 606, lit: false }
    ],
    gate: { x: 1870, y: 532 }
  };
  scene.layers = {
    trees: [
      { x: 75, y: 280, scale: 1.55 },
      { x: 245, y: 314, scale: 1.4 },
      { x: 790, y: 291, scale: 1.5 },
      { x: 1190, y: 303, scale: 1.45 },
      { x: 1515, y: 273, scale: 1.58 },
      { x: 1940, y: 309, scale: 1.42 }
    ],
    cottages: [],
    lamps: [
      { x: 360, y: 560, lit: true },
      { x: 1080, y: 560, lit: false },
      { x: 1660, y: 560, lit: false }
    ],
    glowPlants: [
      { x: 120, y: 640, active: true },
      { x: 1980, y: 638, active: false }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 200, y: 662, width: 180, height: 19 },
      { x: 1840, y: 660, width: 150, height: 17 }
    ],
    mistBands: [
      { x: 180, y: 430, width: 320, speed: 8 },
      { x: 770, y: 395, width: 410, speed: 12 },
      { x: 1390, y: 470, width: 360, speed: 10 }
    ]
  };

  scene.repairs = [
    {
      id: "switchyard-junction",
      kind: "path-puzzle",
      puzzleTheme: "junction-line",
      x: 1165,
      y: 520,
      radius: 230,
      complete: false,
      progress: 0,
      scanText: "Robot scan: switchyard junction line is down.",
      puzzleText: "Rotate the paths to reconnect the mossline junction.",
      rewardText: "Switchyard line restored. Current steadies through the trees.",
      onwardText: "The storm road climbs toward the ridge.",
      nextText: "Heading toward Stormedge Rise.",
      nextSceneId: "chapter-one/stormedge-rise",
      reactions: [
        { text: "Junction current is steady!", x: 1165, y: 470 },
        { text: "Line readings look beautiful.", x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: "That junction is full of wet copper sighs." },
        puzzle: { speaker: "player", text: "Easy current. Straight through the mossline." },
        reward: { speaker: "robot", text: "Line readings look beautiful." },
        next: { speaker: "robot", text: "Stormedge Rise is calling louder now." }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}
