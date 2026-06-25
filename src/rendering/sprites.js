// Loads the painted character art once and exposes ready-to-draw images.
// Until an image finishes loading, `ready` is false and the renderer falls
// back to the original canvas-drawn character.

function loadImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

const APPRENTICE = "assets/sprites/characters/apprentice";
const ROBOT = "assets/sprites/characters/robot";
const WORLD = "assets/sprites/world";
const CHAPTER_TWO = "assets/sprites/chapter-two";
const CHAPTER_TWO_BACKGROUNDS = `${CHAPTER_TWO}/backgrounds`;
const CHAPTER_TWO_PATHS = `${CHAPTER_TWO}/paths`;
const CHAPTER_TWO_LANDMARKS = `${CHAPTER_TWO}/landmarks`;
const CHAPTER_TWO_PUZZLES = `${CHAPTER_TWO}/puzzles`;
const CHAPTER_THREE = "assets/sprites/chapter-three";
const CHAPTER_THREE_BACKGROUNDS = `${CHAPTER_THREE}/backgrounds`;
const CHAPTER_THREE_TRANSITIONS = `${CHAPTER_THREE}/transitions`;
const CHAPTER_THREE_LANDMARKS = `${CHAPTER_THREE}/landmarks`;
const TITLE = "assets/title";

export const sprites = {
  apprentice: {
    idle: loadImage(`${APPRENTICE}/apprentice-rain-ready-trimmed.png`),
    walk1: loadImage(`${APPRENTICE}/apprentice-walk-1-trimmed.png`),
    walk2: loadImage(`${APPRENTICE}/apprentice-walk-2-trimmed.png`)
  },
  robot: {
    idle: loadImage(`${ROBOT}/robot-cover-idle-trimmed.png`),
    idleLeft: loadImage(`${ROBOT}/robot-cover-idle-left-trimmed.png`),
    scanLeft: loadImage(`${ROBOT}/robot-scan-left-trimmed.png`),
    scan: loadImage(`${ROBOT}/robot-scan-trimmed.png`)
  },
  world: {
    waterWheel: loadImage(`${WORLD}/water-wheel-trimmed.png`),
    cottage: loadImage(`${WORLD}/cottage-trimmed.png`),
    bakery: loadImage(`${WORLD}/bakery-painted.png?v=painted-bakery`),
    bellRopeCorner: loadImage(`${WORLD}/bell-rope-corner-painted.png?v=painted-bell-rope-corner`),
    workshopLift: loadImage(`${WORLD}/workshop-lift-painted.png?v=front-facing-route-ch1`),
    schoolhouseLanterns: loadImage(`${WORLD}/schoolhouse-lanterns-painted.png?v=painted-route-ch1`),
    marketAwnings: loadImage(`${WORLD}/market-awnings-painted.png?v=woodland-awnings-route-ch1`),
    oldFootbridge: loadImage(`${WORLD}/old-footbridge-painted.png?v=front-facing-stream-route-ch1-positioned`),
    rainDrainCorner: loadImage(`${WORLD}/rain-drain-corner-painted.png?v=side-drain-small-route-ch1`),
    mayorPorch: loadImage(`${WORLD}/mayor-porch-painted.png?v=woodland-signal-route-ch1`),
    festivalSquare: loadImage(`${WORLD}/festival-square-painted.png?v=village-square-route-ch1`),
    glowfenGroveSide: loadImage(`${WORLD}/glowfen-grove-side-scene.png?v=side-scroller-glowfen-grove`),
    lanternLilyPool: loadImage(`${WORLD}/lantern-lily-pool-painted.png?v=painted-route-ch2`),
    lanternLilyPoolBottomWater: loadImage(`${WORLD}/lantern-lily-pool-bottom-water.png?v=bottom-water-lily-pool`),
    lanternLilyPoolSide: loadImage(`${WORLD}/lantern-lily-pool-side-sprite.png?v=side-scroller-lily-pool`),
    bogBridge: loadImage(`${WORLD}/bog-bridge-painted.png?v=painted-route-ch2`),
    frogsongLock: loadImage(`${WORLD}/frogsong-lock-painted.png?v=painted-route-ch2`),
    sunkenSignpost: loadImage(`${WORLD}/sunken-signpost-painted.png?v=painted-route-ch2`),
    mistPool: loadImage(`${WORLD}/mist-pool-painted.png?v=painted-route-ch2`),
    mossGate: loadImage(`${WORLD}/moss-gate-painted.png?v=painted-route-ch2`),
    oldFenShrine: loadImage(`${WORLD}/old-fen-shrine-painted.png?v=painted-route-ch2`),
    glowfenFerry: loadImage(`${WORLD}/glowfen-ferry-painted.png?v=painted-route-ch2`),
    reedwatchBank: loadImage(`${WORLD}/reedwatch-bank-painted.png?v=painted-route-ch2`),
    mosslineSwitchyard: loadImage(`${WORLD}/mossline-switchyard-painted.png?v=painted-route-ch3`),
    cargoCartTurntable: loadImage(`${WORLD}/cargo-cart-turntable-painted.png?v=painted-route-ch3`),
    signalArmRow: loadImage(`${WORLD}/signal-arm-row-painted.png?v=painted-route-ch3`),
    windChimePass: loadImage(`${WORLD}/wind-chime-pass-painted.png?v=painted-route-ch4`),
    lightningRodField: loadImage(`${WORLD}/lightning-rod-field-painted.png?v=painted-route-ch4`),
    beaconApproach: loadImage(`${WORLD}/beacon-approach-painted.png?v=painted-route-ch4-final`),
    tree: loadImage(`${WORLD}/tree-trimmed.png`),
    pine: loadImage(`${WORLD}/pine-tree-trimmed.png`),
    lamp: loadImage(`${WORLD}/lamp-trimmed.png`),
    glowPlant: loadImage(`${WORLD}/glow-plant-trimmed.png`),
    puddle: loadImage(`${WORLD}/puddle-trimmed.png`),
    brokenBranch: loadImage(`${WORLD}/broken-branch-trimmed.png`),
    gear: loadImage(`${WORLD}/repair-part-gear-trimmed.png`),
    coil: loadImage(`${WORLD}/repair-part-coil-trimmed.png`),
    seed: loadImage(`${WORLD}/repair-part-seed-trimmed.png`),
    signpost: loadImage(`${WORLD}/signpost-trimmed.png`),
    rootPump: loadImage(`${WORLD}/root-pump-trimmed.png`),
    switchyardBox: loadImage(`${WORLD}/switchyard-box-trimmed.png`),
    stormGauge: loadImage(`${WORLD}/storm-gauge-trimmed.png`),
    beaconTower: loadImage(`${WORLD}/beacon-tower-trimmed.png?v=beacon-matte-cleanup`),
    beaconTowerLargeDoor: loadImage(`${WORLD}/beacon-tower-large-door.png?v=large-door-beacon-opaque`),
    rainBarrel: loadImage(`${WORLD}/rain-barrel-trimmed.png`),
    footbridge: loadImage(`${WORLD}/footbridge-trimmed.png`),
    shed: loadImage(`${WORLD}/shed-trimmed.png?v=shed-handle-matte-cleanup`),
    oldObservatory: loadImage(`${WORLD}/old-observatory-trimmed.png`),
    archiveLensArray: loadImage(`${WORLD}/archive-lens-array-trimmed.png`),
    observatoryHut: loadImage(`${WORLD}/observatory-hut-trimmed.png`),
    mossyStoneFoundation: loadImage(`${WORLD}/mossy-stone-foundation-trimmed.png`),
    wetPathEdge: loadImage(`${WORLD}/wet-path-edge-trimmed.png`),
    rainyRocksReeds: loadImage(`${WORLD}/rainy-rocks-reeds-trimmed.png`),
    glowfenPumpOvergrowth: loadImage(`${WORLD}/glowfen-pump-overgrowth-trimmed.png`),
    glowfenCobbleVines: loadImage(`${WORLD}/glowfen-cobble-vines-trimmed.png`),
    glowfenBridgeReeds: loadImage(`${WORLD}/glowfen-bridge-reeds-trimmed.png`),
    glowfenGlowRocks: loadImage(`${WORLD}/glowfen-glow-rocks-trimmed.png`),
    glowfenRootChannel: loadImage(`${WORLD}/glowfen-root-channel-trimmed.png`),
    glowfenLeafLitter: loadImage(`${WORLD}/glowfen-leaf-litter-trimmed.png`),
    mosslineUtilityPole: loadImage(`${WORLD}/mossline-utility-pole-trimmed.png`),
    mosslinePowerLineSpan: loadImage(`${WORLD}/mossline-power-line-span-trimmed.png`),
    mosslineSwitchFoliage: loadImage(`${WORLD}/mossline-switch-foliage-trimmed.png`),
    mosslineOvergrownSwitchBox: loadImage(`${WORLD}/mossline-overgrown-switch-box-trimmed.png`),
    mosslineConduitCoils: loadImage(`${WORLD}/mossline-conduit-coils-trimmed.png`),
    mosslinePuddleGround: loadImage(`${WORLD}/mossline-puddle-ground-trimmed.png`),
    sparkingRelayShed: loadImage(`${WORLD}/sparking-relay-shed-painted.png?v=painted-relay-shed`),
    rainSlickRails: loadImage(`${WORLD}/rain-slick-rails-side-sprite.png?v=rain-slick-side-sprite`),
    rainSlickPuddle: loadImage(`${WORLD}/rain-slick-puddle-sprite.png?v=rain-slick-sprites`),
    rainSlickSandValve: loadImage(`${WORLD}/rain-slick-sand-valve-sprite.png?v=rain-slick-valve-sprite`),
    streamWaterSide: loadImage(`${WORLD}/stream-water-side.png?v=side-stream-water-trimmed`),
    // Seamless, horizontally-tiling textures for the path band, the stream, and
    // the grass behind the path. Fill existing shapes; no cutout (full-bleed).
    pathTile: loadImage(`${WORLD}/path-tile.png`),
    waterTile: loadImage(`${WORLD}/water-tile.png`),
    grassTile: loadImage(`${WORLD}/grass-tile.png`)
  },
  chapterTwo: {
    backgrounds: {
      wetlandBackground: loadImage(`${CHAPTER_TWO_BACKGROUNDS}/wetland-background.png`)
    },
    paths: {
      boardwalkSteppingPath: loadImage(`${CHAPTER_TWO_PATHS}/boardwalk-stepping-path.png`)
    },
    landmarks: {
      rootPump: loadImage(`${CHAPTER_TWO_LANDMARKS}/root-pump.png`),
      lanternLilyCrossing: loadImage(`${CHAPTER_TWO_LANDMARKS}/lantern-lily-crossing.png`),
      bogBridge: loadImage(`${CHAPTER_TWO_LANDMARKS}/bog-bridge.png`),
      frogsongLock: loadImage(`${CHAPTER_TWO_LANDMARKS}/frogsong-lock.png`),
      sunkenRouteMarker: loadImage(`${CHAPTER_TWO_LANDMARKS}/sunken-route-marker.png`),
      mistVentStones: loadImage(`${CHAPTER_TWO_LANDMARKS}/mist-vent-stones.png`),
      mossGate: loadImage(`${CHAPTER_TWO_LANDMARKS}/moss-gate.png`),
      rainBowlMarker: loadImage(`${CHAPTER_TWO_LANDMARKS}/rain-bowl-marker.png`),
      glowfenFerry: loadImage(`${CHAPTER_TWO_LANDMARKS}/glowfen-ferry.png`),
      reedwatchMarkers: loadImage(`${CHAPTER_TWO_LANDMARKS}/reedwatch-markers.png`)
    },
    puzzles: {
      wetlandTileBase: loadImage(`${CHAPTER_TWO_PUZZLES}/wetland-tile-base.png`),
      wetlandTileLit: loadImage(`${CHAPTER_TWO_PUZZLES}/wetland-tile-lit.png`),
      boardwalkConduit: loadImage(`${CHAPTER_TWO_PUZZLES}/boardwalk-conduit.png`),
      reedChannelConduit: loadImage(`${CHAPTER_TWO_PUZZLES}/reed-channel-conduit.png`),
      shallowWaterConduit: loadImage(`${CHAPTER_TWO_PUZZLES}/shallow-water-conduit.png`),
      wetlandStartNode: loadImage(`${CHAPTER_TWO_PUZZLES}/wetland-start-node.png`),
      wetlandOutputNode: loadImage(`${CHAPTER_TWO_PUZZLES}/wetland-output-node.png`),
      wetlandSelectionFrame: loadImage(`${CHAPTER_TWO_PUZZLES}/wetland-selection-frame.png`),
      wetlandCompletionSpark: loadImage(`${CHAPTER_TWO_PUZZLES}/wetland-completion-spark.png`)
    }
  },
  chapterThree: {
    backgrounds: {
      mosslineBackground: loadImage(`${CHAPTER_THREE_BACKGROUNDS}/mossline-background.png?v=mossline-shared-background`)
    },
    landmarks: {
      cargoCartTurntableSide: loadImage(`${CHAPTER_THREE_LANDMARKS}/cargo-cart-turntable-side.png?v=side-turntable-sprite`),
      conductorBoothSide: loadImage(`${CHAPTER_THREE_LANDMARKS}/conductor-booth-side.png?v=conductor-booth-sprite`),
      craneHookYardSide: loadImage(`${CHAPTER_THREE_LANDMARKS}/crane-hook-yard-side.png?v=crane-hook-yard-sprite`),
      rainSlickRailsSide: loadImage(`${CHAPTER_THREE_LANDMARKS}/rain-slick-rails-side.png?v=rain-slick-rails-sprite`),
      tunnelMouthSide: loadImage(`${CHAPTER_THREE_LANDMARKS}/tunnel-mouth-side.png?v=tunnel-mouth-sprite`),
      clockSignalSide: loadImage(`${CHAPTER_THREE_LANDMARKS}/clock-signal-side.png?v=clock-signal-sprite`),
      lastPlatformSide: loadImage(`${CHAPTER_THREE_LANDMARKS}/last-platform-side.png?v=last-platform-sprite`)
    },
    transitions: {
      glowfenToMossline: loadImage(`${CHAPTER_THREE_TRANSITIONS}/glowfen-to-mossline.png?v=glowfen-to-mossline-transition`)
    }
  },
  title: {
    hero: loadImage(`${TITLE}/itch-cover.png`),
    background: loadImage(`${TITLE}/background-hills.png`)
  }
};

export function imageReady(image) {
  return Boolean(image && image.complete && image.naturalWidth > 0);
}
