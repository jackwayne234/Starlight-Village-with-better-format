import { createBaseScene } from "../baseScene.js";

const CHAPTER_EIGHT_SCENES = [
  {
    id: "chapter-eight/glassworks-quarter",
    title: "Glassworks Quarter",
    type: "glassworksQuarter",
    sprite: "glassworksQuarter",
    spriteHeight: 430,
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: rain-dark glass is scattering the quarter's color signal.",
    puzzleText: "Rotate the lens paths until color returns to the glassworks window.",
    rewardText: "Glassworks Quarter restored. Color glows through the rainy district again.",
    onwardText: "The quarter has color again.",
    nextText: "Prism Lamp Row is next.",
    nextSceneId: "chapter-eight/prism-lamp-row",
    reaction: "Color in the rain!",
    robotReaction: "Glass signal restored.",
    scanLine: "The glass signal is bouncing apart.",
    puzzleLine: "Bring the colors back through one window.",
    rewardLine: "Glass signal restored.",
    nextLine: "Prism Lamp Row is next."
  },
  {
    id: "chapter-eight/prism-lamp-row",
    title: "Prism Lamp Row",
    type: "prismLampRow",
    sprite: "prismLampRow",
    spriteHeight: 390,
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the prism lamps are splitting light into the wrong stones.",
    puzzleText: "Rotate the prism paths until the lamps mark one clear route.",
    rewardText: "Prism Lamp Row restored. Colored light lands along the wet path.",
    onwardText: "The prism route is marked.",
    nextText: "Cracked Skylights are next.",
    nextSceneId: "chapter-eight/cracked-skylights",
    reaction: "Tiny rainbows!",
    robotReaction: "Prism route aligned.",
    scanLine: "The prisms are sending light sideways.",
    puzzleLine: "Split the light into the path markers.",
    rewardLine: "Prism route aligned.",
    nextLine: "Cracked Skylights are next."
  },
  {
    id: "chapter-eight/cracked-skylights",
    title: "Cracked Skylights",
    type: "crackedSkylights",
    sprite: "crackedSkylights",
    spriteHeight: 400,
    puzzleTheme: "storm-gauge",
    scanText: "Robot scan: skylight panes are leaking above the furnace room.",
    puzzleText: "Rotate the storm paths until the cracked panes seal in order.",
    rewardText: "Cracked Skylights restored. Rain slides off the patched glass.",
    onwardText: "The skylights are sealed.",
    nextText: "Furnace Bellows are next.",
    nextSceneId: "chapter-eight/furnace-bellows",
    reaction: "No drips!",
    robotReaction: "Pane seal stable.",
    scanLine: "Rain is reaching the furnace roof.",
    puzzleLine: "Patch the panes before the water drops.",
    rewardLine: "Pane seal stable.",
    nextLine: "Furnace Bellows are next."
  },
  {
    id: "chapter-eight/furnace-bellows",
    title: "Furnace Bellows",
    type: "furnaceBellows",
    sprite: "furnaceBellows",
    spriteHeight: 400,
    puzzleTheme: "water-routing",
    scanText: "Robot scan: bellows valves are cooling the furnace instead of feeding it.",
    puzzleText: "Rotate the valve paths until the bellows breathe in rhythm.",
    rewardText: "Furnace Bellows restored. Warm furnace light steadies behind the rain.",
    onwardText: "The furnace is breathing.",
    nextText: "Color Filter Hall is next.",
    nextSceneId: "chapter-eight/color-filter-hall",
    reaction: "Warm again!",
    robotReaction: "Bellows rhythm restored.",
    scanLine: "The bellows are pushing against the furnace.",
    puzzleLine: "Set the valves to breathe together.",
    rewardLine: "Bellows rhythm restored.",
    nextLine: "Color Filter Hall is next."
  },
  {
    id: "chapter-eight/color-filter-hall",
    title: "Color Filter Hall",
    type: "colorFilterHall",
    sprite: "colorFilterHall",
    spriteHeight: 390,
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: color filters are stacked in the wrong signal order.",
    puzzleText: "Rotate the lens paths until the filters line up red to violet.",
    rewardText: "Color Filter Hall restored. The filters shine in a clean signal row.",
    onwardText: "The color order is clean.",
    nextText: "Mirror Maze is next.",
    nextSceneId: "chapter-eight/mirror-maze",
    reaction: "All the colors!",
    robotReaction: "Filter order restored.",
    scanLine: "The filters are crossing each other's light.",
    puzzleLine: "Line the color order into one signal.",
    rewardLine: "Filter order restored.",
    nextLine: "Mirror Maze is next."
  },
  {
    id: "chapter-eight/mirror-maze",
    title: "Mirror Maze",
    type: "mirrorMaze",
    sprite: "mirrorMaze",
    spriteHeight: 400,
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the mirror stands are reflecting light into the rain.",
    puzzleText: "Rotate the mirror paths until the beam reaches the center prism.",
    rewardText: "Mirror Maze restored. Reflected light gathers in the center prism.",
    onwardText: "The mirror beam is steady.",
    nextText: "Stained Glass Path is next.",
    nextSceneId: "chapter-eight/stained-glass-path",
    reaction: "Beam caught!",
    robotReaction: "Mirror aim stable.",
    scanLine: "Every mirror is telling the light a different story.",
    puzzleLine: "Aim the reflections into one path.",
    rewardLine: "Mirror aim stable.",
    nextLine: "Stained Glass Path is next."
  },
  {
    id: "chapter-eight/stained-glass-path",
    title: "Stained Glass Path",
    type: "stainedGlassPath",
    sprite: "stainedGlassPath",
    spriteHeight: 390,
    puzzleTheme: "market-lanterns",
    scanText: "Robot scan: stained-glass path panes are dark under the puddles.",
    puzzleText: "Rotate the lamp paths until the glass panes light underfoot.",
    rewardText: "Stained Glass Path restored. The walkway glows safely through the rain.",
    onwardText: "The glass path is lit.",
    nextText: "Cooling Pipes are next.",
    nextSceneId: "chapter-eight/cooling-pipes",
    reaction: "Path is glowing!",
    robotReaction: "Walkway light restored.",
    scanLine: "The path glass is too dark to trust.",
    puzzleLine: "Light the panes under the rain.",
    rewardLine: "Walkway light restored.",
    nextLine: "Cooling Pipes are next."
  },
  {
    id: "chapter-eight/cooling-pipes",
    title: "Cooling Pipes",
    type: "coolingPipes",
    sprite: "coolingPipes",
    spriteHeight: 390,
    puzzleTheme: "water-routing",
    scanText: "Robot scan: cooling water is missing the fragile glass molds.",
    puzzleText: "Rotate the pipe paths until water reaches every cooling tube.",
    rewardText: "Cooling Pipes restored. Blue water hums through the glassworks pipes.",
    onwardText: "The pipes are cooling evenly.",
    nextText: "Lens Grinder is next.",
    nextSceneId: "chapter-eight/lens-grinder",
    reaction: "Pipes are humming!",
    robotReaction: "Cooling flow stable.",
    scanLine: "The cooling pipes are dry where they matter.",
    puzzleLine: "Route water around the glass molds.",
    rewardLine: "Cooling flow stable.",
    nextLine: "Lens Grinder is next."
  },
  {
    id: "chapter-eight/lens-grinder",
    title: "Lens Grinder",
    type: "lensGrinder",
    sprite: "lensGrinder",
    spriteHeight: 400,
    puzzleTheme: "junction-line",
    scanText: "Robot scan: the grinder wheel is turning before the lens is aligned.",
    puzzleText: "Rotate the gear paths until the lens grinder turns smoothly.",
    rewardText: "Lens Grinder restored. The polishing wheel hums beside a clear lens.",
    onwardText: "The lens grinder is steady.",
    nextText: "Rainbow Tower is next.",
    nextSceneId: "chapter-eight/rainbow-tower",
    reaction: "Smooth wheel!",
    robotReaction: "Grinder aligned.",
    scanLine: "The grinder gear is skipping the lens plate.",
    puzzleLine: "Align the gears before the wheel spins.",
    rewardLine: "Grinder aligned.",
    nextLine: "Rainbow Tower is next."
  },
  {
    id: "chapter-eight/rainbow-tower",
    title: "Rainbow Tower",
    type: "rainbowTower",
    sprite: "rainbowTower",
    spriteHeight: 440,
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: the tall color signal is dark below the tower cap.",
    puzzleText: "Rotate the signal paths until every color chamber lights in order.",
    rewardText: "Rainbow Tower restored. A tall color signal shines toward the under-village road.",
    onwardText: "The rainbow signal is awake.",
    nextText: "Under-Village waits below.",
    nextSceneId: "chapter-nine/under-village",
    chapterComplete: {
      title: "Glassworks Quarter Restored",
      subtitle: "The glassworks lamps, pipes, mirrors, and rainbow tower are shining cleanly toward the under-village road.",
      checklist: [
        "Glass signal focused",
        "Furnace and cooling systems steadied",
        "Rainbow tower opened the under-village road"
      ],
      prompt: "Press Space, Enter, or E to continue"
    },
    reaction: "It reaches the clouds!",
    robotReaction: "Color beacon restored.",
    scanLine: "The tower colors are out of sequence.",
    puzzleLine: "Light every chamber from red to violet.",
    rewardLine: "Color beacon restored.",
    nextLine: "Under-Village waits below."
  }
];

const SCENES_BY_ID = new Map(CHAPTER_EIGHT_SCENES.map((scene) => [scene.id, scene]));

export function createGlassworksQuarterScene() {
  return createChapterEightScene("chapter-eight/glassworks-quarter");
}

export function createPrismLampRowScene() {
  return createChapterEightScene("chapter-eight/prism-lamp-row");
}

export function createCrackedSkylightsScene() {
  return createChapterEightScene("chapter-eight/cracked-skylights");
}

export function createFurnaceBellowsScene() {
  return createChapterEightScene("chapter-eight/furnace-bellows");
}

export function createColorFilterHallScene() {
  return createChapterEightScene("chapter-eight/color-filter-hall");
}

export function createMirrorMazeScene() {
  return createChapterEightScene("chapter-eight/mirror-maze");
}

export function createStainedGlassPathScene() {
  return createChapterEightScene("chapter-eight/stained-glass-path");
}

export function createCoolingPipesScene() {
  return createChapterEightScene("chapter-eight/cooling-pipes");
}

export function createLensGrinderScene() {
  return createChapterEightScene("chapter-eight/lens-grinder");
}

export function createRainbowTowerScene() {
  return createChapterEightScene("chapter-eight/rainbow-tower");
}

function createChapterEightScene(sceneId) {
  const entry = SCENES_BY_ID.get(sceneId);
  if (!entry) {
    throw new Error(`Unknown Chapter 8 scene: ${sceneId}`);
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
  scene.backdrop = { moonX: 820, moonY: 136, cloudDrift: 0.72, hillOffset: 10, ridgeOffset: 36 };
  scene.chapterEightLandmark = {
    type: entry.type,
    x: 1120,
    groundY: 662,
    fixed: false
  };
  scene.spriteLandmark = {
    sprite: entry.sprite,
    state: scene.chapterEightLandmark,
    x: 1120,
    groundY: 666,
    height: entry.spriteHeight,
    dimFilter: "brightness(0.78) saturate(0.9)",
    fixedFilter: "brightness(1.06) saturate(1.14)",
    glow: {
      heightRatio: 0.55,
      radius: 220,
      dimIntensity: 0.1,
      fixedIntensity: 0.36,
      pulse: 0.05
    }
  };
  scene.layers = createGlassworksLayers(entry.type);
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
      chapterComplete: entry.chapterComplete,
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

function createGlassworksLayers(type) {
  return {
    trees: [],
    cottages: [],
    lamps: [],
    glowPlants: [],
    foliage: [],
    brokenBranches: [],
    repairParts: [],
    puddles: [],
    mistBands: []
  };
}
