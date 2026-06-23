import { createBaseScene } from "../baseScene.js";

const CHAPTER_SIX_SCENES = [
  {
    id: "chapter-six/rooftop-channels",
    title: "Rooftop Channels",
    type: "rooftopChannels",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: roof channels are spilling rain into the homes.",
    puzzleText: "Rotate the water paths until every roof channel drains safely.",
    rewardText: "Rooftop Channels restored. Rain runs into barrels instead of doorways.",
    onwardText: "The rooftops are draining safely.",
    nextText: "Flooded Cellar is next.",
    nextSceneId: "chapter-six/flooded-cellar",
    reaction: "Dry doorways!",
    robotReaction: "Roof runoff stable.",
    scanLine: "The roof gutters are crossing the wrong way.",
    puzzleLine: "Turn the channels until the rain finds the barrels.",
    rewardLine: "Roof runoff stable.",
    nextLine: "Flooded Cellar is next."
  },
  {
    id: "chapter-six/flooded-cellar",
    title: "Flooded Cellar",
    type: "floodedCellar",
    puzzleTheme: "root-pump",
    scanText: "Robot scan: cellar water is rising around the pump valves.",
    puzzleText: "Rotate the pump paths until the cellar drains.",
    rewardText: "Flooded Cellar restored. The pump pulls water away from the foundation.",
    onwardText: "The cellar pump is steady.",
    nextText: "Laundry Lines are next.",
    nextSceneId: "chapter-six/laundry-lines",
    reaction: "Floorboards safe!",
    robotReaction: "Cellar level falling.",
    scanLine: "The cellar pump is pushing against itself.",
    puzzleLine: "Order the pump paths before the water climbs.",
    rewardLine: "Cellar level falling.",
    nextLine: "Laundry Lines are next."
  },
  {
    id: "chapter-six/laundry-lines",
    title: "Laundry Lines",
    type: "laundryLines",
    puzzleTheme: "rail-signal",
    scanText: "Robot scan: laundry pulleys are sagging into the flooded lane.",
    puzzleText: "Rotate the pulley paths until the lines lift into a dry crossing.",
    rewardText: "Laundry Lines restored. The raised lines mark a safe path through the lane.",
    onwardText: "The dry crossing is raised.",
    nextText: "Pump Alley is next.",
    nextSceneId: "chapter-six/pump-alley",
    reaction: "Lines are up!",
    robotReaction: "Pulley tension stable.",
    scanLine: "The line pulleys are out of sequence.",
    puzzleLine: "Lift the lines into a safe crossing.",
    rewardLine: "Pulley tension stable.",
    nextLine: "Pump Alley is next."
  },
  {
    id: "chapter-six/pump-alley",
    title: "Pump Alley",
    type: "pumpAlley",
    puzzleTheme: "root-pump",
    scanText: "Robot scan: the alley pump is locked by crossed pipe pressure.",
    puzzleText: "Rotate the pump paths until the shared pipe starts moving.",
    rewardText: "Pump Alley restored. The shared hand pump coughs back to life.",
    onwardText: "The alley pump is working.",
    nextText: "Overflow Garden is next.",
    nextSceneId: "chapter-six/overflow-garden",
    reaction: "Pump is awake!",
    robotReaction: "Pipe pressure even.",
    scanLine: "The hand pump has pressure in the wrong pipes.",
    puzzleLine: "Route the pipe pressure back through the pump.",
    rewardLine: "Pipe pressure even.",
    nextLine: "Overflow Garden is next."
  },
  {
    id: "chapter-six/overflow-garden",
    title: "Overflow Garden",
    type: "overflowGarden",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: overflow is missing the garden beds.",
    puzzleText: "Rotate the water paths until extra rain feeds the beds.",
    rewardText: "Overflow Garden restored. Extra water soaks into the garden instead of the lane.",
    onwardText: "The garden is taking the overflow.",
    nextText: "Neighborhood Fountain is next.",
    nextSceneId: "chapter-six/neighborhood-fountain",
    reaction: "Beds are drinking!",
    robotReaction: "Overflow redirected.",
    scanLine: "The garden channels are not catching runoff.",
    puzzleLine: "Guide the extra water into the beds.",
    rewardLine: "Overflow redirected.",
    nextLine: "Neighborhood Fountain is next."
  },
  {
    id: "chapter-six/neighborhood-fountain",
    title: "Neighborhood Fountain",
    type: "neighborhoodFountain",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: fountain flow is stuck below the district marker.",
    puzzleText: "Rotate the water paths until the tiny fountain runs clear.",
    rewardText: "Neighborhood Fountain restored. The district center trickles with steady light.",
    onwardText: "The fountain marks the center again.",
    nextText: "Cistern House is next.",
    nextSceneId: "chapter-six/cistern-house",
    reaction: "Fountain's back!",
    robotReaction: "Fountain flow steady.",
    scanLine: "The fountain bowl is dry under all this rain.",
    puzzleLine: "Bring the flow back to the district marker.",
    rewardLine: "Fountain flow steady.",
    nextLine: "Cistern House is next."
  },
  {
    id: "chapter-six/cistern-house",
    title: "Cistern House",
    type: "cisternHouse",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: three cistern tanks are balancing unevenly.",
    puzzleText: "Rotate the cistern paths until all three tanks share the load.",
    rewardText: "Cistern House restored. The tanks settle into an even rainwater balance.",
    onwardText: "The cisterns are balanced.",
    nextText: "Gutter Bell is next.",
    nextSceneId: "chapter-six/gutter-bell",
    reaction: "Levels matched!",
    robotReaction: "Cistern balance stable.",
    scanLine: "One cistern is carrying too much pressure.",
    puzzleLine: "Balance the tanks before the overflow trips.",
    rewardLine: "Cistern balance stable.",
    nextLine: "Gutter Bell is next."
  },
  {
    id: "chapter-six/gutter-bell",
    title: "Gutter Bell",
    type: "gutterBell",
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: the overflow bell is not ringing when the gutter is safe.",
    puzzleText: "Rotate the signal paths until water rings the bell cleanly.",
    rewardText: "Gutter Bell restored. Overflow rings one clear note down the row.",
    onwardText: "The gutter bell can signal again.",
    nextText: "Stormwater Gate is next.",
    nextSceneId: "chapter-six/stormwater-gate",
    reaction: "Clear bell!",
    robotReaction: "Water signal audible.",
    scanLine: "The gutter bell is catching water but no signal.",
    puzzleLine: "Make the safe overflow ring the bell.",
    rewardLine: "Water signal audible.",
    nextLine: "Stormwater Gate is next."
  },
  {
    id: "chapter-six/stormwater-gate",
    title: "Stormwater Gate",
    type: "stormwaterGate",
    puzzleTheme: "junction-line",
    scanText: "Robot scan: the big drain gate is stuck between the row and the outer village.",
    puzzleText: "Rotate the gate paths until the stormwater gate opens safely.",
    rewardText: "Stormwater Gate restored. The big drain opens toward the outer village.",
    onwardText: "The stormwater gate is open.",
    nextText: "Old Orchard waits beyond the rain.",
    nextSceneId: "chapter-seven/old-orchard",
    reaction: "Gate is open!",
    robotReaction: "Drain route clear.",
    scanLine: "The big gate is holding back the whole row.",
    puzzleLine: "Open the drain route without flooding the path.",
    rewardLine: "Drain route clear.",
    nextLine: "Old Orchard waits beyond the rain."
  }
];

const SCENES_BY_ID = new Map(CHAPTER_SIX_SCENES.map((scene) => [scene.id, scene]));

export function createRooftopChannelsScene() {
  return createChapterSixScene("chapter-six/rooftop-channels");
}

export function createFloodedCellarScene() {
  return createChapterSixScene("chapter-six/flooded-cellar");
}

export function createLaundryLinesScene() {
  return createChapterSixScene("chapter-six/laundry-lines");
}

export function createPumpAlleyScene() {
  return createChapterSixScene("chapter-six/pump-alley");
}

export function createOverflowGardenScene() {
  return createChapterSixScene("chapter-six/overflow-garden");
}

export function createNeighborhoodFountainScene() {
  return createChapterSixScene("chapter-six/neighborhood-fountain");
}

export function createCisternHouseScene() {
  return createChapterSixScene("chapter-six/cistern-house");
}

export function createGutterBellScene() {
  return createChapterSixScene("chapter-six/gutter-bell");
}

export function createStormwaterGateScene() {
  return createChapterSixScene("chapter-six/stormwater-gate");
}

function createChapterSixScene(sceneId) {
  const entry = SCENES_BY_ID.get(sceneId);
  if (!entry) {
    throw new Error(`Unknown Chapter 6 scene: ${sceneId}`);
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
  scene.backdrop = { moonX: 710, moonY: 158, cloudDrift: 0.9, hillOffset: 18, ridgeOffset: 40 };
  scene.chapterSixLandmark = {
    type: entry.type,
    x: 1120,
    groundY: 662,
    fixed: false
  };
  scene.layers = createRainbarrelLayers(entry.type);
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

function createRainbarrelLayers(type) {
  const gate = type === "stormwaterGate";
  return {
    trees: [
      { x: 82, y: 292, scale: 1.48 },
      { x: 356, y: 274, scale: 1.56 },
      { x: 722, y: 306, scale: 1.38 },
      { x: 1538, y: 304, scale: 1.42 },
      { x: 1848, y: 284, scale: 1.54 },
      { x: 2120, y: 310, scale: 1.36 }
    ],
    cottages: [],
    lamps: [
      { x: 320, y: 560, lit: true },
      { x: 770, y: 560, lit: false },
      { x: 1475, y: 560, lit: false },
      { x: 2004, y: 560, lit: gate }
    ],
    glowPlants: [
      { x: 150, y: 640, active: true },
      { x: 2072, y: 638, active: true }
    ],
    foliage: [
      { kind: "rainyRocksReeds", x: 646, groundY: 670, height: 116, alpha: 0.8 },
      { kind: "rainyRocksReeds", x: 1585, groundY: 670, height: 126, alpha: 0.76 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 280, y: 663, width: 176, height: 20 },
      { x: 1120, y: 668, width: 410, height: 24 },
      { x: 1910, y: 661, width: 168, height: 18 }
    ],
    mistBands: [
      { x: 132, y: 418, width: 450, speed: 17 },
      { x: 782, y: 382, width: 520, speed: 19 },
      { x: 1430, y: 462, width: 430, speed: 17 }
    ]
  };
}
