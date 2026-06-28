import { createBaseScene } from "../baseScene.js";

const CHAPTER_SEVEN_SCENES = [
  {
    id: "chapter-seven/old-orchard",
    title: "Old Orchard",
    type: "oldOrchard",
    sprite: "oldOrchard",
    spriteHeight: 430,
    puzzleTheme: "root-pump",
    scanText: "Robot scan: old roots are pinching the orchard irrigation line shut.",
    puzzleText: "Rotate the root paths until water reaches the old apple tree.",
    rewardText: "Old Orchard restored. Water wakes the irrigation line beneath the roots.",
    onwardText: "The orchard line is awake.",
    nextText: "Windfallen Fruit is next.",
    nextSceneId: "chapter-seven/windfallen-fruit",
    reaction: "The tree is drinking!",
    robotReaction: "Irrigation restored.",
    scanLine: "The roots are squeezing the water line.",
    puzzleLine: "Guide the water under the tree.",
    rewardLine: "Irrigation restored.",
    nextLine: "Windfallen Fruit is next."
  },
  {
    id: "chapter-seven/windfallen-fruit",
    title: "Windfallen Fruit",
    type: "windfallenFruit",
    sprite: "windfallenFruit",
    spriteHeight: 360,
    puzzleTheme: "water-routing",
    scanText: "Robot scan: fallen apples are blocking the channel drains.",
    puzzleText: "Rotate the channel paths until fruit and water separate safely.",
    rewardText: "Windfallen Fruit restored. The drains clear and apples settle in baskets.",
    onwardText: "The channel is sorted.",
    nextText: "Branch Bridge is next.",
    nextSceneId: "chapter-seven/branch-bridge",
    reaction: "Apples saved!",
    robotReaction: "Channel sorted.",
    scanLine: "Fruit is clogging the runoff channel.",
    puzzleLine: "Sort the apples away from the water.",
    rewardLine: "Channel sorted.",
    nextLine: "Branch Bridge is next."
  },
  {
    id: "chapter-seven/branch-bridge",
    title: "Branch Bridge",
    type: "branchBridge",
    sprite: "branchBridge",
    spriteHeight: 440,
    puzzleTheme: "glow-bridge",
    scanText: "Robot scan: branch braces are crossed over the walking path.",
    puzzleText: "Rotate the bridge paths until the branch braces make a safe crossing.",
    rewardText: "Branch Bridge restored. The old branches lock into a steady walkway.",
    onwardText: "The branch crossing is safe.",
    nextText: "Bee Box Row is next.",
    nextSceneId: "chapter-seven/bee-box-row",
    reaction: "Steady enough!",
    robotReaction: "Bridge brace stable.",
    scanLine: "The branch braces are not sharing weight.",
    puzzleLine: "Set the braces into a walking path.",
    rewardLine: "Bridge brace stable.",
    nextLine: "Bee Box Row is next."
  },
  {
    id: "chapter-seven/bee-box-row",
    title: "Bee Box Row",
    type: "beeBoxRow",
    sprite: "beeBoxRow",
    spriteHeight: 370,
    puzzleTheme: "market-lanterns",
    scanText: "Robot scan: the bee-box lanterns are flickering too close and too bright.",
    puzzleText: "Rotate the lantern paths until the boxes warm gently.",
    rewardText: "Bee Box Row restored. The bee boxes glow with calm, steady lantern light.",
    onwardText: "The bee boxes are calm.",
    nextText: "Cider Press is next.",
    nextSceneId: "chapter-seven/cider-press",
    reaction: "Soft lights!",
    robotReaction: "Hive warmth stable.",
    scanLine: "The lantern warmth is uneven.",
    puzzleLine: "Warm the boxes without startling them.",
    rewardLine: "Hive warmth stable.",
    nextLine: "Cider Press is next."
  },
  {
    id: "chapter-seven/cider-press",
    title: "Cider Press",
    type: "ciderPress",
    sprite: "ciderPress",
    spriteHeight: 400,
    puzzleTheme: "junction-line",
    scanText: "Robot scan: the little cider press gears are skipping teeth.",
    puzzleText: "Rotate the gear paths until the press turns evenly.",
    rewardText: "Cider Press restored. The press creaks back into a slow, steady turn.",
    onwardText: "The cider press is turning.",
    nextText: "Scarecrow Wires are next.",
    nextSceneId: "chapter-seven/scarecrow-wires",
    reaction: "It turns!",
    robotReaction: "Press gear aligned.",
    scanLine: "The press gears are biting out of order.",
    puzzleLine: "Mesh the paths into one slow turn.",
    rewardLine: "Press gear aligned.",
    nextLine: "Scarecrow Wires are next."
  },
  {
    id: "chapter-seven/scarecrow-wires",
    title: "Scarecrow Wires",
    type: "scarecrowWires",
    sprite: "scarecrowWires",
    spriteHeight: 430,
    puzzleTheme: "rail-signal",
    scanText: "Robot scan: signal wires are tangled around the scarecrow arms.",
    puzzleText: "Rotate the signal paths until the wet wires hang clear.",
    rewardText: "Scarecrow Wires restored. The scarecrow signal line stops sparking in the rain.",
    onwardText: "The scarecrow line is untangled.",
    nextText: "Root Cellar is next.",
    nextSceneId: "chapter-seven/root-cellar",
    reaction: "No more tangles!",
    robotReaction: "Signal wire clear.",
    scanLine: "The scarecrow is holding too many wires.",
    puzzleLine: "Untangle the signal line from its arms.",
    rewardLine: "Signal wire clear.",
    nextLine: "Root Cellar is next."
  },
  {
    id: "chapter-seven/root-cellar",
    title: "Root Cellar",
    type: "rootCellar",
    sprite: "rootCellar",
    spriteHeight: 430,
    puzzleTheme: "storm-gauge",
    scanText: "Robot scan: cellar vents are trapping damp air around the stored food.",
    puzzleText: "Rotate the vent paths until dry air moves through the root cellar.",
    rewardText: "Root Cellar restored. The vents open and the cellar dries out.",
    onwardText: "The cellar is breathing.",
    nextText: "Moon Apple Tree is next.",
    nextSceneId: "chapter-seven/moon-apple-tree",
    reaction: "Fresh air!",
    robotReaction: "Vent flow restored.",
    scanLine: "The cellar vents are closed against each other.",
    puzzleLine: "Open a dry path through the hill.",
    rewardLine: "Vent flow restored.",
    nextLine: "Moon Apple Tree is next."
  },
  {
    id: "chapter-seven/moon-apple-tree",
    title: "Moon Apple Tree",
    type: "moonAppleTree",
    sprite: "moonAppleTree",
    spriteHeight: 430,
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the moon reflector is missing the rare apple tree.",
    puzzleText: "Rotate the light paths until moonlight reaches the glowing fruit.",
    rewardText: "Moon Apple Tree restored. Pale light gathers in the orchard leaves.",
    onwardText: "Moonlight has found the tree.",
    nextText: "Birdhouse Lane is next.",
    nextSceneId: "chapter-seven/birdhouse-lane",
    reaction: "Moon apples!",
    robotReaction: "Moonlight aligned.",
    scanLine: "The reflector is aiming into the rain.",
    puzzleLine: "Catch the moonlight and share it with the tree.",
    rewardLine: "Moonlight aligned.",
    nextLine: "Birdhouse Lane is next."
  },
  {
    id: "chapter-seven/birdhouse-lane",
    title: "Birdhouse Lane",
    type: "birdhouseLane",
    sprite: "birdhouseLane",
    spriteHeight: 420,
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: birdhouse guide lamps are hanging at mixed heights.",
    puzzleText: "Rotate the signal paths until the birdhouses mark one clear route.",
    rewardText: "Birdhouse Lane restored. The little houses glow in a steady line.",
    onwardText: "The birdhouse route is lit.",
    nextText: "Hollow Tree Door is next.",
    nextSceneId: "chapter-seven/hollow-tree-door",
    reaction: "Little guide lights!",
    robotReaction: "Route markers aligned.",
    scanLine: "The birdhouses are pointing every way at once.",
    puzzleLine: "Line the guide lights toward the hollow tree.",
    rewardLine: "Route markers aligned.",
    nextLine: "Hollow Tree Door is next."
  },
  {
    id: "chapter-seven/hollow-tree-door",
    title: "Hollow Tree Door",
    type: "hollowTreeDoor",
    sprite: "hollowTreeDoor",
    spriteHeight: 430,
    puzzleTheme: "root-pump",
    scanText: "Robot scan: the hidden tree door is locked by old root latches.",
    puzzleText: "Rotate the root paths until the hollow tree door unlocks.",
    rewardText: "Hollow Tree Door restored. The hidden door opens toward the glassworks road.",
    onwardText: "The hollow tree is open.",
    nextText: "Glassworks Quarter waits beyond.",
    nextSceneId: "chapter-eight/glassworks-quarter",
    chapterComplete: {
      title: "Old Orchard Restored",
      subtitle: "The roots, bridges, bee boxes, and hidden tree door are steady enough to reach the glassworks road.",
      checklist: [
        "Orchard water line reopened",
        "Fruit paths and keeper devices restored",
        "Hollow tree opened the glassworks road"
      ],
      prompt: "Press Space, Enter, or E to continue"
    },
    reaction: "A door in the tree!",
    robotReaction: "Root latch released.",
    scanLine: "The old latches are woven through the roots.",
    puzzleLine: "Open the hidden door without snapping the roots.",
    rewardLine: "Root latch released.",
    nextLine: "Glassworks Quarter waits beyond."
  }
];

const SCENES_BY_ID = new Map(CHAPTER_SEVEN_SCENES.map((scene) => [scene.id, scene]));

export function createOldOrchardScene() {
  return createChapterSevenScene("chapter-seven/old-orchard");
}

export function createWindfallenFruitScene() {
  return createChapterSevenScene("chapter-seven/windfallen-fruit");
}

export function createBranchBridgeScene() {
  return createChapterSevenScene("chapter-seven/branch-bridge");
}

export function createBeeBoxRowScene() {
  return createChapterSevenScene("chapter-seven/bee-box-row");
}

export function createCiderPressScene() {
  return createChapterSevenScene("chapter-seven/cider-press");
}

export function createScarecrowWiresScene() {
  return createChapterSevenScene("chapter-seven/scarecrow-wires");
}

export function createRootCellarScene() {
  return createChapterSevenScene("chapter-seven/root-cellar");
}

export function createMoonAppleTreeScene() {
  return createChapterSevenScene("chapter-seven/moon-apple-tree");
}

export function createBirdhouseLaneScene() {
  return createChapterSevenScene("chapter-seven/birdhouse-lane");
}

export function createHollowTreeDoorScene() {
  return createChapterSevenScene("chapter-seven/hollow-tree-door");
}

function createChapterSevenScene(sceneId) {
  const entry = SCENES_BY_ID.get(sceneId);
  if (!entry) {
    throw new Error(`Unknown Chapter 7 scene: ${sceneId}`);
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
  scene.backdrop = { moonX: 890, moonY: 132, cloudDrift: 1.18, hillOffset: 42, ridgeOffset: 72 };
  const isBranchBridge = entry.type === "branchBridge";
  scene.chapterSevenLandmark = {
    type: entry.type,
    x: 1120,
    groundY: isBranchBridge ? 688 : 662,
    fixed: false
  };
  scene.spriteLandmark = {
    sprite: entry.sprite,
    state: scene.chapterSevenLandmark,
    x: 1120,
    groundY: isBranchBridge ? 692 : 666,
    height: entry.spriteHeight,
    dimFilter: "brightness(0.78) saturate(0.9)",
    fixedFilter: "brightness(1.04) saturate(1.08)",
    glow: {
      heightRatio: 0.55,
      radius: 220,
      dimIntensity: 0.1,
      fixedIntensity: 0.34,
      pulse: 0.05
    }
  };
  scene.layers = createOrchardLayers(entry.type);
  scene.repairs = [
    {
      id: entry.id.split("/").pop(),
      kind: "path-puzzle",
      puzzleTheme: entry.puzzleTheme,
      x: 1120,
      y: 516,
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

function createOrchardLayers(type) {
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
