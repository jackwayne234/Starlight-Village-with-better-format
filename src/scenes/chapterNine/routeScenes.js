import { createBaseScene } from "../baseScene.js";

const CHAPTER_NINE_SCENES = [
  {
    id: "chapter-nine/under-village",
    title: "Under-Village Door",
    type: "underVillage",
    puzzleTheme: "junction-line",
    scanText: "Robot scan: the hidden service door is sealed by old pipe locks.",
    puzzleText: "Rotate the junction paths until the under-village door unlocks.",
    rewardText: "Under-Village Door restored. The service passage opens beneath town.",
    onwardText: "The hidden door is open.",
    nextText: "Echo Door is next.",
    nextSceneId: "chapter-nine/echo-door",
    reaction: "It was under us!",
    robotReaction: "Service door open.",
    scanLine: "The door lock is waiting for pipe pressure.",
    puzzleLine: "Route pressure into the old lock.",
    rewardLine: "Service door open.",
    nextLine: "Echo Door is next."
  },
  {
    id: "chapter-nine/echo-door",
    title: "Echo Door",
    type: "echoDoor",
    puzzleTheme: "beacon-signal",
    scanText: "Robot scan: pipe tones are bouncing out of order around the echo door.",
    puzzleText: "Rotate the tone paths until the round door hears the right pattern.",
    rewardText: "Echo Door restored. The stone door hums open through the tunnel.",
    onwardText: "The echo pattern is clear.",
    nextText: "Old Pipe Crossing is next.",
    nextSceneId: "chapter-nine/old-pipe-crossing",
    reaction: "It sang back!",
    robotReaction: "Echo pattern matched.",
    scanLine: "The tones are arriving out of order.",
    puzzleLine: "Match the echo in one clean path.",
    rewardLine: "Echo pattern matched.",
    nextLine: "Old Pipe Crossing is next."
  },
  {
    id: "chapter-nine/old-pipe-crossing",
    title: "Old Pipe Crossing",
    type: "oldPipeCrossing",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: the old pipe bridge is spraying water into the walkway.",
    puzzleText: "Rotate the pipe paths until the crossing carries water safely below.",
    rewardText: "Old Pipe Crossing restored. The wet bridge steadies over the flow.",
    onwardText: "The pipe crossing is steady.",
    nextText: "Forgotten Machine is next.",
    nextSceneId: "chapter-nine/forgotten-machine",
    reaction: "Careful steps!",
    robotReaction: "Pipe crossing stable.",
    scanLine: "The pipe bridge is leaking into the path.",
    puzzleLine: "Move the water under the walkway.",
    rewardLine: "Pipe crossing stable.",
    nextLine: "Forgotten Machine is next."
  },
  {
    id: "chapter-nine/forgotten-machine",
    title: "Forgotten Machine",
    type: "forgottenMachine",
    puzzleTheme: "junction-line",
    scanText: "Robot scan: the forgotten machine is waking its circuits in the wrong order.",
    puzzleText: "Rotate the circuit paths until the machine starts one section at a time.",
    rewardText: "Forgotten Machine restored. Old lamps blink awake inside the stone case.",
    onwardText: "The old machine is awake.",
    nextText: "Drain Locks are next.",
    nextSceneId: "chapter-nine/drain-locks",
    reaction: "Still works!",
    robotReaction: "Machine sequence restored.",
    scanLine: "The machine is trying to wake all at once.",
    puzzleLine: "Start one circuit at a time.",
    rewardLine: "Machine sequence restored.",
    nextLine: "Drain Locks are next."
  },
  {
    id: "chapter-nine/drain-locks",
    title: "Drain Locks",
    type: "drainLocks",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: drain lock pressure is uneven behind the tunnel gates.",
    puzzleText: "Rotate the water paths until every lock gauge settles.",
    rewardText: "Drain Locks restored. The gates equalize without shaking the tunnel.",
    onwardText: "The drain pressure is safe.",
    nextText: "Buried Murals are next.",
    nextSceneId: "chapter-nine/buried-murals",
    reaction: "No shaking!",
    robotReaction: "Pressure equalized.",
    scanLine: "The lock gauges are fighting each other.",
    puzzleLine: "Balance the drain pressure.",
    rewardLine: "Pressure equalized.",
    nextLine: "Buried Murals are next."
  },
  {
    id: "chapter-nine/buried-murals",
    title: "Buried Murals",
    type: "buriedMurals",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: gentle wash channels are missing the mud-covered murals.",
    puzzleText: "Rotate the water paths until the murals rinse clean without flooding.",
    rewardText: "Buried Murals restored. Old village pictures glow through the washed stone.",
    onwardText: "The murals can be seen again.",
    nextText: "Gear Room is next.",
    nextSceneId: "chapter-nine/gear-room",
    reaction: "Those are old stories.",
    robotReaction: "Murals recovered.",
    scanLine: "Mud is hiding the wall pictures.",
    puzzleLine: "Wash the murals gently.",
    rewardLine: "Murals recovered.",
    nextLine: "Gear Room is next."
  },
  {
    id: "chapter-nine/gear-room",
    title: "Gear Room",
    type: "gearRoom",
    puzzleTheme: "junction-line",
    scanText: "Robot scan: the gear room's slow wheels are nearly jamming.",
    puzzleText: "Rotate the gear paths until the large wheels mesh without grinding.",
    rewardText: "Gear Room restored. The slow wheels turn together under the village.",
    onwardText: "The gear room is moving.",
    nextText: "Underground Stream is next.",
    nextSceneId: "chapter-nine/underground-stream",
    reaction: "Big wheels!",
    robotReaction: "Gear mesh stable.",
    scanLine: "The big gears are catching on each other.",
    puzzleLine: "Mesh the wheels without a jam.",
    rewardLine: "Gear mesh stable.",
    nextLine: "Underground Stream is next."
  },
  {
    id: "chapter-nine/underground-stream",
    title: "Underground Stream",
    type: "undergroundStream",
    puzzleTheme: "glow-bridge",
    scanText: "Robot scan: stepping stones are sunk below the current-lit stream.",
    puzzleText: "Rotate the glow paths until the stones rise into a safe crossing.",
    rewardText: "Underground Stream restored. Glowing stones lift above the moving water.",
    onwardText: "The stream crossing is safe.",
    nextText: "Sealed Workshop is next.",
    nextSceneId: "chapter-nine/sealed-workshop",
    reaction: "The stones lit up!",
    robotReaction: "Stream crossing restored.",
    scanLine: "The stepping stones are hidden by current.",
    puzzleLine: "Raise the stones through the glow path.",
    rewardLine: "Stream crossing restored.",
    nextLine: "Sealed Workshop is next."
  },
  {
    id: "chapter-nine/sealed-workshop",
    title: "Sealed Workshop",
    type: "sealedWorkshop",
    puzzleTheme: "archive-lens",
    scanText: "Robot scan: the old keeper workshop is sealed behind a memory lock.",
    puzzleText: "Rotate the archive paths until the workshop remembers its opening code.",
    rewardText: "Sealed Workshop restored. The keeper door opens with a warm old light.",
    onwardText: "The workshop is open.",
    nextText: "Heart Engine is next.",
    nextSceneId: "chapter-nine/heart-engine",
    reaction: "Someone worked here.",
    robotReaction: "Workshop seal released.",
    scanLine: "The door remembers the wrong code.",
    puzzleLine: "Line up the memory lock.",
    rewardLine: "Workshop seal released.",
    nextLine: "Heart Engine is next."
  },
  {
    id: "chapter-nine/heart-engine",
    title: "Ancient Heart Engine",
    type: "heartEngine",
    puzzleTheme: "water-routing",
    scanText: "Robot scan: the heart engine is moving rainwater in broken pulses.",
    puzzleText: "Rotate the oldest water paths until the engine beats evenly again.",
    rewardText: "Ancient Heart Engine restored. Deep water begins moving through the whole village.",
    onwardText: "The heart engine is steady.",
    nextText: "Festival Return is next.",
    nextSceneId: "chapter-ten/festival-return",
    reaction: "The whole village felt that.",
    robotReaction: "Heart engine restored.",
    scanLine: "The engine beat is uneven.",
    puzzleLine: "Make the oldest machine breathe water again.",
    rewardLine: "Heart engine restored.",
    nextLine: "Festival Return is next."
  }
];

const SCENES_BY_ID = new Map(CHAPTER_NINE_SCENES.map((scene) => [scene.id, scene]));

export function createUnderVillageScene() {
  return createChapterNineScene("chapter-nine/under-village");
}

export function createEchoDoorScene() {
  return createChapterNineScene("chapter-nine/echo-door");
}

export function createOldPipeCrossingScene() {
  return createChapterNineScene("chapter-nine/old-pipe-crossing");
}

export function createForgottenMachineScene() {
  return createChapterNineScene("chapter-nine/forgotten-machine");
}

export function createDrainLocksScene() {
  return createChapterNineScene("chapter-nine/drain-locks");
}

export function createBuriedMuralsScene() {
  return createChapterNineScene("chapter-nine/buried-murals");
}

export function createGearRoomScene() {
  return createChapterNineScene("chapter-nine/gear-room");
}

export function createUndergroundStreamScene() {
  return createChapterNineScene("chapter-nine/underground-stream");
}

export function createSealedWorkshopScene() {
  return createChapterNineScene("chapter-nine/sealed-workshop");
}

export function createHeartEngineScene() {
  return createChapterNineScene("chapter-nine/heart-engine");
}

function createChapterNineScene(sceneId) {
  const entry = SCENES_BY_ID.get(sceneId);
  if (!entry) {
    throw new Error(`Unknown Chapter 9 scene: ${sceneId}`);
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
  scene.backdrop = { moonX: 760, moonY: 156, cloudDrift: 0.55, hillOffset: 42, ridgeOffset: 74 };
  scene.chapterNineLandmark = {
    type: entry.type,
    x: 1120,
    groundY: 664,
    fixed: false
  };
  scene.layers = createUnderVillageLayers(entry.type);
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

function createUnderVillageLayers(type) {
  const engine = type === "heartEngine";
  return {
    trees: [
      { x: 106, y: 314, scale: 1.18 },
      { x: 2064, y: 318, scale: 1.24 }
    ],
    cottages: [],
    lamps: [
      { x: 340, y: 560, lit: true },
      { x: 762, y: 564, lit: false },
      { x: 1518, y: 564, lit: false },
      { x: 1988, y: 560, lit: engine }
    ],
    glowPlants: [],
    foliage: [
      { kind: "wetPathEdge", x: 548, groundY: 670, height: 84, alpha: 0.74 },
      { kind: "wetPathEdge", x: 1698, groundY: 670, height: 92, alpha: 0.68 }
    ],
    brokenBranches: [],
    repairParts: [],
    puddles: [
      { x: 274, y: 664, width: 156, height: 18 },
      { x: 1120, y: 671, width: 438, height: 25 },
      { x: 1934, y: 664, width: 168, height: 18 }
    ],
    mistBands: [
      { x: 130, y: 438, width: 470, speed: 11 },
      { x: 800, y: 390, width: 560, speed: 12 },
      { x: 1502, y: 452, width: 490, speed: 10 }
    ]
  };
}
