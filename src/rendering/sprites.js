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
    lamp: loadImage(`${WORLD}/lamp-trimmed.png`),
    glowPlant: loadImage(`${WORLD}/glow-plant-trimmed.png`),
    puddle: loadImage(`${WORLD}/puddle-trimmed.png`),
    brokenBranch: loadImage(`${WORLD}/broken-branch-trimmed.png`),
    gear: loadImage(`${WORLD}/repair-part-gear-trimmed.png`),
    signpost: loadImage(`${WORLD}/signpost-trimmed.png`)
  }
};

export function imageReady(image) {
  return Boolean(image && image.complete && image.naturalWidth > 0);
}
