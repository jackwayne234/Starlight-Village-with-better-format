export function createBaseScene({ id, title, worldWidth = 2200, startMessage }) {
  return {
    id,
    title,
    world: {
      width: worldWidth,
      height: 720,
      repaired: false,
      powerLevel: 0
    },
    camera: {
      x: 0
    },
    backdrop: {
      moonX: 900,
      moonY: 166,
      cloudDrift: 0.9,
      hillOffset: -20,
      ridgeOffset: 12
    },
    weather: {
      rain: createRain()
    },
    layers: {
      trees: [],
      cottages: [],
      lamps: [],
      glowPlants: [],
      foliage: [],
      brokenBranches: [],
      repairParts: [],
      puddles: [],
      mistBands: []
    },
    player: {
      x: 365,
      y: 562,
      facing: 1,
      walking: false,
      reaction: "idle",
      reactionTimer: 0
    },
    robot: {
      x: 484,
      y: 420,
      pose: "idle",
      reactionTimer: 0
    },
    repairs: [],
    repairIndex: 0,
    repairTarget: null,
    nextSceneId: null,
    chapterComplete: null,
    progressDirty: false,
    dialogue: {
      speaker: null,
      text: "",
      timer: 0
    },
    reactionBubbles: [],
    flow: {
      mode: "walking",
      timer: 0,
      celebrationTimer: 0,
      onwardPrompted: false,
      message: startMessage
    }
  };
}

function createRain() {
  return Array.from({ length: 58 }, (_, index) => ({
    x: (index * 97) % 1280,
    y: 40 + ((index * 53) % 480),
    speed: 360 + (index % 7) * 28,
    length: 14 + (index % 5) * 3
  }));
}
