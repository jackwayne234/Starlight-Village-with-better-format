const SKIP_TREE_DENSITY_SCENES = new Set([
  "chapter-one/starlight-village"
]);

export function addTreeDensity(scene) {
  if (!scene?.layers) {
    return scene;
  }

  if (SKIP_TREE_DENSITY_SCENES.has(scene.id)) {
    return scene;
  }

  const existingTrees = Array.isArray(scene.layers.trees) ? scene.layers.trees : [];
  const worldWidth = scene.world?.width ?? 2200;
  const targetTreeCount = Math.max(existingTrees.length, Math.ceil(worldWidth / 230));
  if (existingTrees.length >= targetTreeCount) {
    return scene;
  }

  const extraTrees = makeExtraTrees(scene.id, worldWidth, targetTreeCount, existingTrees);
  scene.layers = {
    ...scene.layers,
    trees: [...existingTrees, ...extraTrees].sort((a, b) => a.x - b.x)
  };

  return scene;
}

function makeExtraTrees(sceneId, worldWidth, targetTreeCount, existingTrees) {
  const seed = hashSceneId(sceneId);
  const extras = [];
  const usableWidth = Math.max(900, worldWidth - 140);
  const countNeeded = targetTreeCount - existingTrees.length;
  const occupied = [...existingTrees];

  for (let index = 0; extras.length < countNeeded && index < targetTreeCount * 3; index += 1) {
    const slot = index % targetTreeCount;
    const pass = Math.floor(index / targetTreeCount);
    const jitter = seededJitter(seed, index, 86);
    const x = clamp(70 + (slot + 0.5) * (usableWidth / targetTreeCount) + jitter + pass * 34, 40, worldWidth - 40);
    const closeToExisting = occupied.some((tree) => Math.abs(tree.x - x) < 115);

    if (closeToExisting && pass < 2) {
      continue;
    }

    const scaleStep = (seed + slot * 3 + pass) % 6;
    const yStep = (seed * 5 + slot * 17 + pass * 23) % 52;
    const tree = {
      x: Math.round(x),
      y: 260 + yStep,
      scale: Number((1.34 + scaleStep * 0.055).toFixed(2))
    };

    extras.push(tree);
    occupied.push(tree);
  }

  return extras;
}

function hashSceneId(sceneId) {
  return [...sceneId].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 9973, 17);
}

function seededJitter(seed, index, range) {
  const value = Math.sin((seed + 1) * (index + 3) * 12.9898) * 43758.5453;
  return (value - Math.floor(value) - 0.5) * range;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
