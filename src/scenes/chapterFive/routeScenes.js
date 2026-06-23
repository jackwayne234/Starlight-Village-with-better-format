import { createBaseScene } from "../baseScene.js";

const CHAPTER_FIVE_SCENES = [
  {
    id: "chapter-five/keeper-cottage",
    title: "Keeper's Cottage",
    type: "keeperCottage",
    puzzleTheme: "market-lanterns",
    scanText: "Robot scan: the keeper's chimney draft is pushing sparks the wrong way.",
    puzzleText: "Rotate the warm paths until the chimney draft and stove sparks settle.",
    rewardText: "Keeper's Cottage restored. Warm light steadies in the cottage window.",
    onwardText: "The cottage is warm again.",
    nextText: "Lens Room is next.",
    nextSceneId: "chapter-five/lens-room",
    reaction: "Warm window!",
    robotReaction: "Draft stabilized.",
    scanLine: "The chimney is fighting the stove draft.",
    puzzleLine: "Set the warm paths before the sparks scatter.",
    rewardLine: "Draft stabilized.",
    nextLine: "Lens Room is next."
  },
  {
    id: "chapter-five/lens-room",
    title: "Lens Room",
    type: "lensRoom",
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the beacon lens is catching rain-glare instead of focusing.",
    puzzleText: "Rotate the lens paths until the beacon beam gathers in the center.",
    rewardText: "Lens Room restored. The beacon beam focuses through the glass.",
    onwardText: "The lens is focused.",
    nextText: "Fuel Shed is next.",
    nextSceneId: "chapter-five/fuel-shed",
    reaction: "The beam is sharp!",
    robotReaction: "Lens focus restored.",
    scanLine: "The lens is scattering the beacon light.",
    puzzleLine: "Line up the glass until the beam gathers.",
    rewardLine: "Lens focus restored.",
    nextLine: "Fuel Shed is next."
  },
  {
    id: "chapter-five/fuel-shed",
    title: "Fuel Shed",
    type: "fuelShed",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: the fuel valves are feeding the beacon unevenly.",
    puzzleText: "Rotate the valve paths until the tower burns steady.",
    rewardText: "Fuel Shed restored. The beacon fuel line runs clean and even.",
    onwardText: "The fuel line is steady.",
    nextText: "Mirror Array is next.",
    nextSceneId: "chapter-five/mirror-array",
    reaction: "Steady flame!",
    robotReaction: "Fuel pressure stable.",
    scanLine: "The fuel shed valves are out of order.",
    puzzleLine: "Sort the valve paths into one steady feed.",
    rewardLine: "Fuel pressure stable.",
    nextLine: "Mirror Array is next."
  },
  {
    id: "chapter-five/mirror-array",
    title: "Mirror Array",
    type: "mirrorArray",
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the mirrors are bouncing light into the rain.",
    puzzleText: "Rotate the mirror paths until the light returns toward the village.",
    rewardText: "Mirror Array restored. Beacon light bounces cleanly down the route.",
    onwardText: "The mirrors are aimed.",
    nextText: "Bell Platform is next.",
    nextSceneId: "chapter-five/bell-platform",
    reaction: "Light is carrying!",
    robotReaction: "Mirror sweep aligned.",
    scanLine: "The mirrors are not sharing the same aim.",
    puzzleLine: "Turn the light paths back toward the village.",
    rewardLine: "Mirror sweep aligned.",
    nextLine: "Bell Platform is next."
  },
  {
    id: "chapter-five/bell-platform",
    title: "Bell Platform",
    type: "bellPlatform",
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: the lowland bell striker is hanging out of reach.",
    puzzleText: "Rotate the signal paths until the striker can ring cleanly.",
    rewardText: "Bell Platform restored. The lowland signal bell rings once through the rain.",
    onwardText: "The bell can signal again.",
    nextText: "Old Flag Room is next.",
    nextSceneId: "chapter-five/old-flag-room",
    reaction: "That bell carries!",
    robotReaction: "Signal audible.",
    scanLine: "The striker cannot reach the bell.",
    puzzleLine: "Set the signal path so the bell rings once.",
    rewardLine: "Signal audible.",
    nextLine: "Old Flag Room is next."
  },
  {
    id: "chapter-five/old-flag-room",
    title: "Old Flag Room",
    type: "oldFlagRoom",
    puzzleTheme: "junction-line",
    scanText: "Robot scan: old storm flags are folded in the wrong memory order.",
    puzzleText: "Rotate the memory paths until the folded flags settle in sequence.",
    rewardText: "Old Flag Room restored. The storm flags rest in their keeper order.",
    onwardText: "The flag memories are ordered.",
    nextText: "Storm Shutters are next.",
    nextSceneId: "chapter-five/storm-shutters",
    reaction: "Keeper colors!",
    robotReaction: "Memory order logged.",
    scanLine: "The flags are records, not decorations.",
    puzzleLine: "Put the folded flag memories back in order.",
    rewardLine: "Memory order logged.",
    nextLine: "Storm Shutters are next."
  },
  {
    id: "chapter-five/storm-shutters",
    title: "Storm Shutters",
    type: "stormShutters",
    puzzleTheme: "storm-gauge",
    scanText: "Robot scan: the tower shutters are catching wind in the wrong sequence.",
    puzzleText: "Rotate the storm paths until the shutters lock against the gusts.",
    rewardText: "Storm Shutters restored. The tower shutters latch tight in the storm.",
    onwardText: "The shutters are locked.",
    nextText: "Relay Balcony is next.",
    nextSceneId: "chapter-five/relay-balcony",
    reaction: "Latched tight!",
    robotReaction: "Gust seal stable.",
    scanLine: "The shutters are slapping in the wind.",
    puzzleLine: "Lock the storm paths one shutter at a time.",
    rewardLine: "Gust seal stable.",
    nextLine: "Relay Balcony is next."
  },
  {
    id: "chapter-five/relay-balcony",
    title: "Relay Balcony",
    type: "relayBalcony",
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: balcony relays are dropping the wider beacon sweep.",
    puzzleText: "Rotate the relay paths until the beacon sweep reaches outward.",
    rewardText: "Relay Balcony restored. The beacon sweep widens over the wet hills.",
    onwardText: "The relay sweep is connected.",
    nextText: "Hill Descent is next.",
    nextSceneId: "chapter-five/hill-descent",
    reaction: "Wide sweep!",
    robotReaction: "Relay arc connected.",
    scanLine: "The balcony relays are skipping half the sweep.",
    puzzleLine: "Connect the relay paths into one beacon arc.",
    rewardLine: "Relay arc connected.",
    nextLine: "Hill Descent is next."
  },
  {
    id: "chapter-five/hill-descent",
    title: "Hill Descent",
    type: "hillDescent",
    puzzleTheme: "market-lanterns",
    scanText: "Robot scan: the downward path lamps are dark between Beacon Hill and Rainbarrel Row.",
    puzzleText: "Rotate the lamp paths until the descent lights in order.",
    rewardText: "Hill Descent restored. The path down toward Rainbarrel Row glows safely.",
    onwardText: "The descent is lit.",
    nextText: "Rainbarrel Row waits below.",
    nextSceneId: "chapter-six/rainbarrel-row",
    reaction: "Path downhill!",
    robotReaction: "Descent route lit.",
    scanLine: "The downhill lamps are not carrying light.",
    puzzleLine: "Light the descent toward Rainbarrel Row.",
    rewardLine: "Descent route lit.",
    nextLine: "Rainbarrel Row waits below."
  }
];

const SCENES_BY_ID = new Map(CHAPTER_FIVE_SCENES.map((scene) => [scene.id, scene]));

export function createKeeperCottageScene() {
  return createChapterFiveScene("chapter-five/keeper-cottage");
}

export function createLensRoomScene() {
  return createChapterFiveScene("chapter-five/lens-room");
}

export function createFuelShedScene() {
  return createChapterFiveScene("chapter-five/fuel-shed");
}

export function createMirrorArrayScene() {
  return createChapterFiveScene("chapter-five/mirror-array");
}

export function createBellPlatformScene() {
  return createChapterFiveScene("chapter-five/bell-platform");
}

export function createOldFlagRoomScene() {
  return createChapterFiveScene("chapter-five/old-flag-room");
}

export function createStormShuttersScene() {
  return createChapterFiveScene("chapter-five/storm-shutters");
}

export function createRelayBalconyScene() {
  return createChapterFiveScene("chapter-five/relay-balcony");
}

export function createHillDescentScene() {
  return createChapterFiveScene("chapter-five/hill-descent");
}

function createChapterFiveScene(sceneId) {
  const entry = SCENES_BY_ID.get(sceneId);
  if (!entry) {
    throw new Error(`Unknown Chapter 5 scene: ${sceneId}`);
  }

  const scene = createBaseScene({
    id: entry.id,
    title: entry.title,
    worldWidth: 2220,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 1040, moonY: 122, cloudDrift: 1.58, hillOffset: 148, ridgeOffset: 194 };
  scene.chapterFiveLandmark = {
    type: entry.type,
    x: 1120,
    groundY: 662,
    fixed: false
  };
  scene.layers = createBeaconHillLayers(entry.type);
  scene.repairs = [
    {
      id: entry.id.split("/").pop(),
      kind: "path-puzzle",
      puzzleTheme: entry.puzzleTheme,
      x: 1120,
      y: 512,
      radius: 260,
      showMarker: false,
      complete: false,
      progress: 0,
      scanText: entry.scanText,
      puzzleText: entry.puzzleText,
      rewardText: entry.rewardText,
      onwardText: entry.onwardText,
      nextText: entry.nextText,
      nextSceneId: entry.nextSceneId,
      reactions: [
        { text: entry.reaction, x: 1120, y: 292 },
        { text: entry.robotReaction, x: "robot", y: "robotTop" }
      ],
      dialogue: {
        scan: { speaker: "robot", text: entry.scanLine },
        puzzle: { speaker: "player", text: entry.puzzleLine },
        reward: { speaker: "robot", text: entry.rewardLine },
        next: { speaker: "player", text: entry.nextLine }
      }
    }
  ];
  scene.repairTarget = scene.repairs[0];
  return scene;
}

function createBeaconHillLayers(type) {
  const descent = type === "hillDescent";
  return {
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
      { x: 1998, y: 560, lit: descent }
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
}
