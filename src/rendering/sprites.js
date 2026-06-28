// Loads character and world art once and exposes ready-to-draw images.
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
const CHAPTER_FOUR = "assets/sprites/chapter-four";
const CHAPTER_FOUR_BACKGROUNDS = `${CHAPTER_FOUR}/backgrounds`;
const CHAPTER_FOUR_PATHS = `${CHAPTER_FOUR}/paths`;
const CHAPTER_FOUR_TRANSITIONS = `${CHAPTER_FOUR}/transitions`;
const CHAPTER_FOUR_LANDMARKS = `${CHAPTER_FOUR}/landmarks`;
const CHAPTER_FOUR_ENVIRONMENT = `${CHAPTER_FOUR}/environment`;
const CHAPTER_FOUR_PUZZLES = `${CHAPTER_FOUR}/puzzles`;
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
    bakery: loadImage(`${WORLD}/bakery.png?v=zero-painted-assets`),
    bellRopeCorner: loadImage(`${WORLD}/bell-rope-corner.png?v=zero-painted-assets`),
    workshopLift: loadImage(`${WORLD}/workshop-lift.png?v=zero-painted-assets`),
    schoolhouseLanterns: loadImage(`${WORLD}/schoolhouse-lanterns.png?v=zero-painted-assets`),
    marketAwnings: loadImage(`${WORLD}/market-awnings.png?v=zero-painted-assets`),
    oldFootbridge: loadImage(`${WORLD}/old-footbridge.png?v=zero-painted-assets`),
    rainDrainCorner: loadImage(`${WORLD}/rain-drain-corner.png?v=zero-painted-assets`),
    mayorPorch: loadImage(`${WORLD}/mayor-porch.png?v=zero-painted-assets`),
    festivalSquare: loadImage(`${WORLD}/festival-square.png?v=zero-painted-assets`),
    glowfenGroveSide: loadImage(`${WORLD}/glowfen-grove-side-scene.png?v=side-scroller-glowfen-grove`),
    lanternLilyPool: loadImage(`${WORLD}/lantern-lily-pool.png?v=zero-painted-assets`),
    lanternLilyPoolBottomWater: loadImage(`${WORLD}/lantern-lily-pool-bottom-water.png?v=bottom-water-lily-pool`),
    lanternLilyPoolSide: loadImage(`${WORLD}/lantern-lily-pool-side-sprite.png?v=side-scroller-lily-pool`),
    bogBridge: loadImage(`${WORLD}/bog-bridge.png?v=zero-painted-assets`),
    frogsongLock: loadImage(`${WORLD}/frogsong-lock.png?v=zero-painted-assets`),
    sunkenSignpost: loadImage(`${WORLD}/sunken-signpost.png?v=zero-painted-assets`),
    mistPool: loadImage(`${WORLD}/mist-pool.png?v=zero-painted-assets`),
    mossGate: loadImage(`${WORLD}/moss-gate.png?v=zero-painted-assets`),
    oldFenShrine: loadImage(`${WORLD}/old-fen-shrine.png?v=zero-painted-assets`),
    glowfenFerry: loadImage(`${WORLD}/glowfen-ferry.png?v=zero-painted-assets`),
    reedwatchBank: loadImage(`${WORLD}/reedwatch-bank.png?v=zero-painted-assets`),
    mosslineSwitchyard: loadImage(`${WORLD}/mossline-switchyard.png?v=zero-painted-assets`),
    cargoCartTurntable: loadImage(`${WORLD}/cargo-cart-turntable.png?v=zero-painted-assets`),
    signalArmRow: loadImage(`${WORLD}/signal-arm-row.png?v=zero-painted-assets`),
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
    keeperCottage: loadImage(`${WORLD}/keeper-cottage.png?v=chapter-five-clean-sprites`),
    lensRoom: loadImage(`${WORLD}/lens-room.png?v=chapter-five-clean-sprites`),
    fuelShed: loadImage(`${WORLD}/fuel-shed.png?v=chapter-five-clean-sprites`),
    mirrorArray: loadImage(`${WORLD}/mirror-array.png?v=chapter-five-clean-sprites`),
    bellPlatform: loadImage(`${WORLD}/bell-platform.png?v=chapter-five-clean-sprites`),
    oldFlagRoom: loadImage(`${WORLD}/old-flag-room.png?v=chapter-five-clean-sprites`),
    stormShutters: loadImage(`${WORLD}/storm-shutters.png?v=chapter-five-clean-sprites`),
    relayBalcony: loadImage(`${WORLD}/relay-balcony.png?v=chapter-five-clean-sprites`),
    hillDescent: loadImage(`${WORLD}/hill-descent.png?v=chapter-five-clean-sprites`),
    rooftopChannels: loadImage(`${WORLD}/rooftop-channels.png?v=chapter-six-clean-sprites`),
    floodedCellar: loadImage(`${WORLD}/flooded-cellar.png?v=chapter-six-clean-sprites`),
    laundryLines: loadImage(`${WORLD}/laundry-lines.png?v=chapter-six-clean-sprites`),
    pumpAlley: loadImage(`${WORLD}/pump-alley.png?v=chapter-six-clean-sprites`),
    overflowGarden: loadImage(`${WORLD}/overflow-garden.png?v=chapter-six-clean-sprites`),
    neighborhoodFountain: loadImage(`${WORLD}/neighborhood-fountain.png?v=chapter-six-clean-sprites`),
    cisternHouse: loadImage(`${WORLD}/cistern-house.png?v=chapter-six-clean-sprites`),
    gutterBell: loadImage(`${WORLD}/gutter-bell.png?v=chapter-six-clean-sprites`),
    stormwaterGate: loadImage(`${WORLD}/stormwater-gate.png?v=chapter-six-clean-sprites`),
    oldOrchard: loadImage(`${WORLD}/old-orchard.png?v=chapter-seven-clean-sprites`),
    windfallenFruit: loadImage(`${WORLD}/windfallen-fruit.png?v=chapter-seven-clean-sprites`),
    branchBridge: loadImage(`${WORLD}/branch-bridge.png?v=chapter-seven-clean-sprites`),
    beeBoxRow: loadImage(`${WORLD}/bee-box-row.png?v=chapter-seven-clean-sprites`),
    ciderPress: loadImage(`${WORLD}/cider-press.png?v=chapter-seven-clean-sprites`),
    scarecrowWires: loadImage(`${WORLD}/scarecrow-wires.png?v=chapter-seven-clean-sprites`),
    rootCellar: loadImage(`${WORLD}/root-cellar.png?v=chapter-seven-clean-sprites`),
    moonAppleTree: loadImage(`${WORLD}/moon-apple-tree.png?v=chapter-seven-clean-sprites`),
    birdhouseLane: loadImage(`${WORLD}/birdhouse-lane.png?v=chapter-seven-clean-sprites`),
    hollowTreeDoor: loadImage(`${WORLD}/hollow-tree-door.png?v=chapter-seven-clean-sprites`),
    glassworksQuarter: loadImage(`${WORLD}/glassworks-quarter.png?v=chapter-eight-clean-sprites`),
    prismLampRow: loadImage(`${WORLD}/prism-lamp-row.png?v=chapter-eight-clean-sprites`),
    crackedSkylights: loadImage(`${WORLD}/cracked-skylights.png?v=chapter-eight-clean-sprites`),
    furnaceBellows: loadImage(`${WORLD}/furnace-bellows.png?v=chapter-eight-clean-sprites`),
    colorFilterHall: loadImage(`${WORLD}/color-filter-hall.png?v=chapter-eight-clean-sprites`),
    mirrorMaze: loadImage(`${WORLD}/mirror-maze.png?v=chapter-eight-clean-sprites`),
    stainedGlassPath: loadImage(`${WORLD}/stained-glass-path.png?v=chapter-eight-clean-sprites`),
    coolingPipes: loadImage(`${WORLD}/cooling-pipes.png?v=chapter-eight-clean-sprites`),
    lensGrinder: loadImage(`${WORLD}/lens-grinder.png?v=chapter-eight-clean-sprites`),
    rainbowTower: loadImage(`${WORLD}/rainbow-tower.png?v=chapter-eight-clean-sprites`),
    underVillage: loadImage(`${WORLD}/under-village.png?v=chapter-nine-clean-sprites`),
    echoDoor: loadImage(`${WORLD}/echo-door.png?v=chapter-nine-clean-sprites`),
    oldPipeCrossing: loadImage(`${WORLD}/old-pipe-crossing.png?v=chapter-nine-clean-sprites`),
    forgottenMachine: loadImage(`${WORLD}/forgotten-machine.png?v=chapter-nine-clean-sprites`),
    drainLocks: loadImage(`${WORLD}/drain-locks.png?v=chapter-nine-clean-sprites`),
    buriedMurals: loadImage(`${WORLD}/buried-murals.png?v=chapter-nine-clean-sprites`),
    gearRoom: loadImage(`${WORLD}/gear-room.png?v=chapter-nine-clean-sprites`),
    undergroundStream: loadImage(`${WORLD}/underground-stream.png?v=chapter-nine-clean-sprites`),
    sealedWorkshop: loadImage(`${WORLD}/sealed-workshop.png?v=chapter-nine-clean-sprites`),
    heartEngine: loadImage(`${WORLD}/heart-engine.png?v=chapter-nine-clean-sprites`),
    festivalReturn: loadImage(`${WORLD}/festival-return.png?v=chapter-ten-clean-sprites`),
    lanternParade: loadImage(`${WORLD}/lantern-parade.png?v=chapter-ten-clean-sprites`),
    musicStage: loadImage(`${WORLD}/music-stage.png?v=chapter-ten-clean-sprites`),
    foodStalls: loadImage(`${WORLD}/food-stalls.png?v=chapter-ten-clean-sprites`),
    memoryWall: loadImage(`${WORLD}/memory-wall.png?v=chapter-ten-clean-sprites`),
    kiteRigging: loadImage(`${WORLD}/kite-rigging.png?v=chapter-ten-clean-sprites`),
    fireworksSafety: loadImage(`${WORLD}/fireworks-safety.png?v=chapter-ten-clean-sprites`),
    starMap: loadImage(`${WORLD}/star-map.png?v=chapter-ten-clean-sprites`),
    townClock: loadImage(`${WORLD}/town-clock.png?v=chapter-ten-clean-sprites`),
    celebrationSquare: loadImage(`${WORLD}/celebration-square.png?v=chapter-ten-clean-sprites`),
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
    sparkingRelayShed: loadImage(`${WORLD}/sparking-relay-shed.png?v=zero-painted-assets`),
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
  chapterFour: {
    backgrounds: {
      stormedgeBackground: loadImage(`${CHAPTER_FOUR_BACKGROUNDS}/stormedge-background-rocky-v1.png?v=stormedge-background-rocky-v1`)
    },
    paths: {
      ridgeStonePath: loadImage(`${CHAPTER_FOUR_PATHS}/ridge-stone-path.png?v=stormedge-ridge-path`),
      rockyWalkPath: loadImage(`${CHAPTER_FOUR_PATHS}/rocky-walk-path.png?v=stormedge-rocky-walk-path-v2`)
    },
    environment: {
      ridgeForeground: loadImage(`${CHAPTER_FOUR_ENVIRONMENT}/stormedge-ridge-foreground.png?v=stormedge-environment-sprites-v2`),
      mistBand: loadImage(`${CHAPTER_FOUR_ENVIRONMENT}/stormedge-mist-band.png?v=stormedge-environment-sprites-v2`),
      pine: loadImage(`${CHAPTER_FOUR_ENVIRONMENT}/stormedge-pine-reference-still.png?v=stormedge-pine-reference-still-v1`),
      puddle: loadImage(`${CHAPTER_FOUR_ENVIRONMENT}/stormedge-puddle-sprite.png?v=zero-painted-assets`)
    },
    landmarks: {
      stormGauge: loadImage(`${CHAPTER_FOUR_LANDMARKS}/storm-gauge.png?v=stormedge-landmark-sprites-v2`),
      weatherVaneRoof: loadImage(`${CHAPTER_FOUR_LANDMARKS}/weather-vane-roof.png?v=stormedge-landmark-sprites-v2`),
      cliffRopeLift: loadImage(`${CHAPTER_FOUR_LANDMARKS}/cliff-rope-lift.png?v=stormedge-landmark-sprites-v2`),
      windChimePass: loadImage(`${CHAPTER_FOUR_LANDMARKS}/wind-chime-pass.png?v=stormedge-landmark-sprites-v2`),
      lightningRodField: loadImage(`${CHAPTER_FOUR_LANDMARKS}/lightning-rod-field.png?v=stormedge-landmark-sprites-v2`),
      lookoutPost: loadImage(`${CHAPTER_FOUR_LANDMARKS}/lookout-post.png?v=stormedge-landmark-sprites-v2`),
      crackedStair: loadImage(`${CHAPTER_FOUR_LANDMARKS}/cracked-stair.png?v=stormedge-landmark-sprites-v2`),
      crackedStairGenerated: loadImage(`${CHAPTER_FOUR_LANDMARKS}/cracked-stair-generated.png?v=repair-7-generated-stair`),
      firewatchTowerGenerated: loadImage(`${CHAPTER_FOUR_LANDMARKS}/firewatch-tower-generated.png?v=repair-7-firewatch-tower-2x`),
      cloudHarvester: loadImage(`${CHAPTER_FOUR_LANDMARKS}/cloud-harvester.png?v=stormedge-landmark-sprites-v2`),
      summitPath: loadImage(`${CHAPTER_FOUR_LANDMARKS}/summit-path.png?v=stormedge-landmark-sprites-v2`),
      summitPathSideGenerated: loadImage(`${CHAPTER_FOUR_LANDMARKS}/summit-path-side-generated.png?v=repair-9-side-summit-path`),
      beaconApproach: loadImage(`${CHAPTER_FOUR_LANDMARKS}/beacon-approach.png?v=stormedge-landmark-sprites-v2`)
    },
    transitions: {
      mosslineToStormedge: loadImage(`${CHAPTER_FOUR_TRANSITIONS}/mossline-to-stormedge.png?v=mossline-to-stormedge-transition`)
    },
    puzzles: {
      stormedgeTileBase: loadImage(`${CHAPTER_FOUR_PUZZLES}/stormedge-tile-base.png?v=stormedge-puzzle-sprites`),
      stormedgeTileLit: loadImage(`${CHAPTER_FOUR_PUZZLES}/stormedge-tile-lit.png?v=stormedge-puzzle-sprites`),
      brassWindChannel: loadImage(`${CHAPTER_FOUR_PUZZLES}/brass-wind-channel.png?v=stormedge-puzzle-sprites`),
      stormedgeStartNode: loadImage(`${CHAPTER_FOUR_PUZZLES}/stormedge-start-node.png?v=stormedge-puzzle-sprites`),
      stormedgeOutputNode: loadImage(`${CHAPTER_FOUR_PUZZLES}/stormedge-output-node.png?v=stormedge-puzzle-sprites`),
      stormedgeSelectionFrame: loadImage(`${CHAPTER_FOUR_PUZZLES}/stormedge-selection-frame.png?v=stormedge-puzzle-sprites`),
      stormedgeCompletionSpark: loadImage(`${CHAPTER_FOUR_PUZZLES}/stormedge-completion-spark.png?v=stormedge-puzzle-sprites`)
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
