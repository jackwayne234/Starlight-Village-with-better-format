import { createBaseScene } from "../baseScene.js";

const CHAPTER_TEN_SCENES = [
  {
    id: "chapter-ten/festival-return",
    title: "Festival Return",
    type: "festivalReturn",
    sprite: "festivalReturn",
    spriteHeight: 420,
    puzzleTheme: "market-lanterns",
    scanText: "Robot scan: the return arch is dark, but every repaired district is sending a little light.",
    puzzleText: "Rotate the lantern paths until the festival return arch gathers the village lights.",
    rewardText: "Festival Return restored. Warm lights gather at the road back into town.",
    onwardText: "The town path is glowing.",
    nextText: "Lantern Parade is next.",
    nextSceneId: "chapter-ten/lantern-parade",
    reaction: "We're back!",
    robotReaction: "Return lights gathered.",
    scanLine: "The arch is waiting for every district light.",
    puzzleLine: "Bring the lights home through one path.",
    rewardLine: "Return lights gathered.",
    nextLine: "Lantern Parade is next."
  },
  {
    id: "chapter-ten/lantern-parade",
    title: "Lantern Parade",
    type: "lanternParade",
    sprite: "lanternParade",
    spriteHeight: 400,
    puzzleTheme: "market-lanterns",
    scanText: "Robot scan: the lantern cart route is crossing itself in the rain.",
    puzzleText: "Rotate the lantern paths until the parade carts have one safe route.",
    rewardText: "Lantern Parade restored. The cart lanterns roll into a steady glowing line.",
    onwardText: "The parade route is safe.",
    nextText: "Music Stage is next.",
    nextSceneId: "chapter-ten/music-stage",
    reaction: "They can parade!",
    robotReaction: "Lantern route safe.",
    scanLine: "The parade carts need a clean path.",
    puzzleLine: "Untangle the lantern route.",
    rewardLine: "Lantern route safe.",
    nextLine: "Music Stage is next."
  },
  {
    id: "chapter-ten/music-stage",
    title: "Music Stage",
    type: "musicStage",
    sprite: "musicStage",
    spriteHeight: 430,
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: stage lights and music-box timing are out of sync.",
    puzzleText: "Rotate the signal paths until the stage lights pulse with the music box.",
    rewardText: "Music Stage restored. The stage lights blink in time with the repaired melody.",
    onwardText: "The music is steady.",
    nextText: "Food Stalls are next.",
    nextSceneId: "chapter-ten/food-stalls",
    reaction: "I hear it!",
    robotReaction: "Stage timing restored.",
    scanLine: "The music and lamps are not listening to each other.",
    puzzleLine: "Sync the stage pulse.",
    rewardLine: "Stage timing restored.",
    nextLine: "Food Stalls are next."
  },
  {
    id: "chapter-ten/food-stalls",
    title: "Food Stalls",
    type: "foodStalls",
    sprite: "foodStalls",
    spriteHeight: 400,
    puzzleTheme: "water-routing",
    scanText: "Robot scan: stall heat and rain runoff are sharing the wrong channels.",
    puzzleText: "Rotate the water paths until warmth stays in and rain drains away.",
    rewardText: "Food Stalls restored. Steam rises safely under the striped festival awnings.",
    onwardText: "The food stalls can reopen.",
    nextText: "Memory Wall is next.",
    nextSceneId: "chapter-ten/memory-wall",
    reaction: "Smells warm!",
    robotReaction: "Stall channels stable.",
    scanLine: "The warm pipes are fighting the rain drains.",
    puzzleLine: "Keep warmth in and water out.",
    rewardLine: "Stall channels stable.",
    nextLine: "Memory Wall is next."
  },
  {
    id: "chapter-ten/memory-wall",
    title: "Memory Wall",
    type: "memoryWall",
    sprite: "memoryWall",
    spriteHeight: 380,
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the memory tiles are lit out of order across the village wall.",
    puzzleText: "Rotate the archive paths until each journey tile lights in sequence.",
    rewardText: "Memory Wall restored. Tiles from every repaired place glow together.",
    onwardText: "The village memories are lit.",
    nextText: "Kite Rigging is next.",
    nextSceneId: "chapter-ten/kite-rigging",
    reaction: "We went everywhere.",
    robotReaction: "Memory sequence restored.",
    scanLine: "The wall remembers the route out of order.",
    puzzleLine: "Light the journey in sequence.",
    rewardLine: "Memory sequence restored.",
    nextLine: "Kite Rigging is next."
  },
  {
    id: "chapter-ten/kite-rigging",
    title: "Kite Rigging",
    type: "kiteRigging",
    sprite: "kiteRigging",
    spriteHeight: 430,
    puzzleTheme: "storm-gauge",
    scanText: "Robot scan: festival kite lines are catching the storm wind unevenly.",
    puzzleText: "Rotate the storm paths until every ribbon line has a safe tension.",
    rewardText: "Kite Rigging restored. Storm ribbons lift without pulling the rig loose.",
    onwardText: "The kite lines are safe.",
    nextText: "Fireworks Safety is next.",
    nextSceneId: "chapter-ten/fireworks-safety",
    reaction: "They caught the wind!",
    robotReaction: "Kite tension safe.",
    scanLine: "The ribbons are pulling against each other.",
    puzzleLine: "Balance the kite lines.",
    rewardLine: "Kite tension safe.",
    nextLine: "Fireworks Safety is next."
  },
  {
    id: "chapter-ten/fireworks-safety",
    title: "Fireworks Safety",
    type: "fireworksSafety",
    sprite: "fireworksSafety",
    spriteHeight: 410,
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: the signal launch checks are pointed at unsafe paths.",
    puzzleText: "Rotate the signal paths until every launch check points up and clear.",
    rewardText: "Fireworks Safety restored. The signal tubes glow green without firing.",
    onwardText: "The launch checks are safe.",
    nextText: "Star Map is next.",
    nextSceneId: "chapter-ten/star-map",
    reaction: "Green means safe.",
    robotReaction: "Launch checks clear.",
    scanLine: "The safety signals are crossing the crowd path.",
    puzzleLine: "Point every check safely upward.",
    rewardLine: "Launch checks clear.",
    nextLine: "Star Map is next."
  },
  {
    id: "chapter-ten/star-map",
    title: "Star Map",
    type: "starMap",
    sprite: "starMap",
    spriteHeight: 400,
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the region constellations are missing their final links.",
    puzzleText: "Rotate the archive paths until every restored district connects on the star map.",
    rewardText: "Star Map restored. The whole village route shines as one constellation.",
    onwardText: "The village map is complete.",
    nextText: "Town Clock is next.",
    nextSceneId: "chapter-ten/town-clock",
    reaction: "That's our route.",
    robotReaction: "Constellation complete.",
    scanLine: "The map is missing the last route links.",
    puzzleLine: "Connect every district star.",
    rewardLine: "Constellation complete.",
    nextLine: "Town Clock is next."
  },
  {
    id: "chapter-ten/town-clock",
    title: "Town Clock",
    type: "townClock",
    sprite: "townClock",
    spriteHeight: 430,
    puzzleTheme: "rail-signal",
    scanText: "Robot scan: the town clock is ticking between every restored signal.",
    puzzleText: "Rotate the timing paths until the clock syncs with the village lights.",
    rewardText: "Town Clock restored. The final chime lines up with every district signal.",
    onwardText: "The town clock is synced.",
    nextText: "Celebration Square is next.",
    nextSceneId: "chapter-ten/celebration-square",
    reaction: "It chimed!",
    robotReaction: "Clock sync restored.",
    scanLine: "The clock is hearing every signal late.",
    puzzleLine: "Sync the final chime.",
    rewardLine: "Clock sync restored.",
    nextLine: "Celebration Square is next."
  },
  {
    id: "chapter-ten/celebration-square",
    title: "Celebration Square",
    type: "celebrationSquare",
    sprite: "celebrationSquare",
    spriteHeight: 430,
    puzzleTheme: "market-lanterns",
    scanText: "Robot scan: the square's final lantern circuit is waiting for one complete path.",
    puzzleText: "Rotate the lantern paths until the whole celebration square lights together.",
    rewardText: "Celebration Square restored. The village lights hold steady through the rain.",
    onwardText: "The village is whole.",
    nextText: "The route is complete.",
    nextSceneId: null,
    reaction: "We did it.",
    robotReaction: "Village route complete.",
    scanLine: "The last lantern circuit is open.",
    puzzleLine: "Light the square together.",
    rewardLine: "Village route complete.",
    nextLine: "The whole village is glowing."
  }
];

const SCENES_BY_ID = new Map(CHAPTER_TEN_SCENES.map((scene) => [scene.id, scene]));

export function createFestivalReturnScene() {
  return createChapterTenScene("chapter-ten/festival-return");
}

export function createLanternParadeScene() {
  return createChapterTenScene("chapter-ten/lantern-parade");
}

export function createMusicStageScene() {
  return createChapterTenScene("chapter-ten/music-stage");
}

export function createFoodStallsScene() {
  return createChapterTenScene("chapter-ten/food-stalls");
}

export function createMemoryWallScene() {
  return createChapterTenScene("chapter-ten/memory-wall");
}

export function createKiteRiggingScene() {
  return createChapterTenScene("chapter-ten/kite-rigging");
}

export function createFireworksSafetyScene() {
  return createChapterTenScene("chapter-ten/fireworks-safety");
}

export function createStarMapScene() {
  return createChapterTenScene("chapter-ten/star-map");
}

export function createTownClockScene() {
  return createChapterTenScene("chapter-ten/town-clock");
}

export function createCelebrationSquareScene() {
  return createChapterTenScene("chapter-ten/celebration-square");
}

function createChapterTenScene(sceneId) {
  const entry = SCENES_BY_ID.get(sceneId);
  if (!entry) {
    throw new Error(`Unknown Chapter 10 scene: ${sceneId}`);
  }

  const scene = createBaseScene({
    id: entry.id,
    title: entry.title,
    worldWidth: 2260,
    startMessage: ""
  });

  scene.player.x = 315;
  scene.robot.x = 427;
  scene.showSignpost = false;
  scene.backdrop = { moonX: 930, moonY: 126, cloudDrift: 0.38, hillOffset: 18, ridgeOffset: 44 };
  scene.chapterTenLandmark = {
    type: entry.type,
    x: 1120,
    groundY: 662,
    fixed: false
  };
  scene.spriteLandmark = {
    sprite: entry.sprite,
    state: scene.chapterTenLandmark,
    x: 1120,
    groundY: 666,
    height: entry.spriteHeight,
    dimFilter: "brightness(0.82) saturate(0.92)",
    fixedFilter: "brightness(1.08) saturate(1.16)",
    glow: {
      heightRatio: 0.55,
      radius: 230,
      dimIntensity: 0.12,
      fixedIntensity: 0.38,
      pulse: 0.06
    }
  };
  scene.layers = createFestivalLayers(entry.type);
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

function createFestivalLayers(type) {
  const finalSquare = type === "celebrationSquare";
  const clock = type === "townClock";
  return {
    trees: [
      { x: 106, y: 300, scale: 1.26 },
      { x: 356, y: 318, scale: 1.1 },
      { x: 1858, y: 314, scale: 1.12 },
      { x: 2088, y: 298, scale: 1.28 }
    ],
    cottages: [],
    lamps: [
      { x: 304, y: 560, lit: true },
      { x: 690, y: 558, lit: finalSquare },
      { x: 1538, y: 558, lit: clock || finalSquare },
      { x: 1998, y: 560, lit: finalSquare }
    ],
    glowPlants: [],
    foliage: [
      { kind: "wetPathEdge", x: 548, groundY: 670, height: 84, alpha: 0.66 },
      { kind: "wetPathEdge", x: 1714, groundY: 670, height: 88, alpha: 0.62 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 280, y: 662, width: 162, height: 18 },
      { x: 1120, y: 669, width: 430, height: 24 },
      { x: 1938, y: 662, width: 172, height: 18 }
    ],
    mistBands: [
      { x: 170, y: 414, width: 420, speed: 9 },
      { x: 780, y: 384, width: 510, speed: 10 },
      { x: 1458, y: 432, width: 460, speed: 9 }
    ]
  };
}
