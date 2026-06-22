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
    scan: loadImage(`${ROBOT}/robot-scan-trimmed.png`)
  },
  world: {
    waterWheel: loadImage(`${WORLD}/water-wheel-trimmed.png`),
    cottage: loadImage(`${WORLD}/cottage-trimmed.png`),
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
    beaconTower: loadImage(`${WORLD}/beacon-tower-trimmed.png`),
    rainBarrel: loadImage(`${WORLD}/rain-barrel-trimmed.png`),
    footbridge: loadImage(`${WORLD}/footbridge-trimmed.png`),
    shed: loadImage(`${WORLD}/shed-trimmed.png`),
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
