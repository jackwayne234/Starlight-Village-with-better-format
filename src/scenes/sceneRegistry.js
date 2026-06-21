import { createBeaconHillScene } from "./chapterOne/beaconHill.js";
import { createGlowfenGroveScene } from "./chapterOne/glowfenGrove.js";
import { createMosslineSwitchyardScene } from "./chapterOne/mosslineSwitchyard.js";
import { createRainbarrelRowScene } from "./chapterOne/rainbarrelRow.js";
import { createStarlightVillageScene } from "./chapterOne/starlightVillage.js";
import { createStormedgeRiseScene } from "./chapterOne/stormedgeRise.js";

export const sceneIds = {
  beaconHill: "chapter-one/beacon-hill",
  glowfenGrove: "chapter-one/glowfen-grove",
  mosslineSwitchyard: "chapter-one/mossline-switchyard",
  rainbarrelRow: "chapter-one/rainbarrel-row",
  stormedgeRise: "chapter-one/stormedge-rise",
  starlightVillage: "chapter-one/starlight-village"
};

const sceneFactories = {
  [sceneIds.beaconHill]: createBeaconHillScene,
  [sceneIds.glowfenGrove]: createGlowfenGroveScene,
  [sceneIds.mosslineSwitchyard]: createMosslineSwitchyardScene,
  [sceneIds.rainbarrelRow]: createRainbarrelRowScene,
  [sceneIds.stormedgeRise]: createStormedgeRiseScene,
  [sceneIds.starlightVillage]: createStarlightVillageScene
};

export function createScene(sceneId) {
  const factory = sceneFactories[sceneId];
  if (!factory) {
    throw new Error(`Unknown scene: ${sceneId}`);
  }

  return factory();
}

export function createInitialScene() {
  return createScene(sceneIds.starlightVillage);
}
