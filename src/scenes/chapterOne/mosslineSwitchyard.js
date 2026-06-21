import { createBaseScene } from "../baseScene.js";

export function createMosslineSwitchyardScene() {
  const scene = createBaseScene({
    id: "chapter-one/mossline-switchyard",
    title: "Mossline Switchyard",
    worldWidth: 2050,
    startMessage: "Mossline Switchyard crackles ahead. Find the broken junction box."
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
      { x: 720, y: 575, lit: true },
      { x: 1165, y: 578, lit: false },
      { x: 1570, y: 586, lit: false }
    ],
    gate: { x: 1870, y: 532 }
  };
  scene.layers = {
    trees: [
      { x: 75, y: 292, scale: 1.08 },
      { x: 245, y: 324, scale: 0.82 },
      { x: 790, y: 282, scale: 1.02 },
      { x: 1190, y: 318, scale: 0.9 },
      { x: 1515, y: 276, scale: 1.1 },
      { x: 1940, y: 310, scale: 0.88 }
    ],
    cottages: [],
    lamps: [
      { x: 360, y: 530, lit: true },
      { x: 1080, y: 535, lit: false },
      { x: 1660, y: 528, lit: false }
    ],
    glowPlants: [
      { x: 430, y: 608, active: true },
      { x: 610, y: 628, active: false },
      { x: 995, y: 612, active: true },
      { x: 1290, y: 624, active: false },
      { x: 1605, y: 607, active: true }
    ],
    brokenBranches: [
      { x: 620, y: 615, rotation: -0.12 },
      { x: 1030, y: 628, rotation: 0.24 },
      { x: 1725, y: 624, rotation: -0.2 }
    ],
    repairParts: [
      { x: 720, y: 548, type: "coil" },
      { x: 1165, y: 550, type: "gear" },
      { x: 1570, y: 558, type: "seed" }
    ],
    puddles: [
      { x: 135, y: 658, width: 180, height: 19 },
      { x: 650, y: 675, width: 250, height: 18 },
      { x: 1055, y: 650, width: 190, height: 16 },
      { x: 1460, y: 670, width: 220, height: 18 },
      { x: 1840, y: 654, width: 150, height: 17 }
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
      chargeRate: 0.44,
      decayRate: 0.1,
      scanText: "Robot scan: switchyard junction line is down.",
      puzzleText: "Rotate the paths to reconnect the mossline junction.",
      rewardText: "Switchyard line restored. Current steadies through the trees.",
      onwardText: "The storm road climbs toward the ridge. Walk right when ready.",
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
