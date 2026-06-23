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
    workshopLift: loadImage(`${WORLD}/workshop-lift-painted.png?v=painted-route-ch1`),
    schoolhouseLanterns: loadImage(`${WORLD}/schoolhouse-lanterns-painted.png?v=painted-route-ch1`),
    marketAwnings: loadImage(`${WORLD}/market-awnings-painted.png?v=painted-route-ch1`),
    oldFootbridge: loadImage(`${WORLD}/old-footbridge-painted.png?v=painted-route-ch1`),
    rainDrainCorner: loadImage(`${WORLD}/rain-drain-corner-painted.png?v=painted-route-ch1`),
    mayorPorch: loadImage(`${WORLD}/mayor-porch-painted.png?v=painted-route-ch1`),
    festivalSquare: loadImage(`${WORLD}/festival-square-painted.png?v=painted-route-ch1`),
    lanternLilyPool: loadImage(`${WORLD}/lantern-lily-pool-painted.png?v=painted-route-ch2`),
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
    // Seamless, horizontally-tiling textures for the path band, the stream, and
    // the grass behind the path. Fill existing shapes; no cutout (full-bleed).
    pathTile: loadImage(`${WORLD}/path-tile.png`),
    waterTile: loadImage(`${WORLD}/water-tile.png`),
    grassTile: loadImage(`${WORLD}/grass-tile.png`)
  },
  title: {
    hero: loadImage(`${TITLE}/itch-cover.png`),
    background: loadImage(`${TITLE}/background-hills.png`)
  }
};

export function imageReady(image) {
  return Boolean(image && image.complete && image.naturalWidth > 0);
}
