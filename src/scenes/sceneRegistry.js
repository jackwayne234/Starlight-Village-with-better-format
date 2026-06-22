import { createBeaconHillScene } from "./chapterOne/beaconHill.js";
import { createGlowfenGroveScene } from "./chapterOne/glowfenGrove.js";
import { createMosslineSwitchyardScene } from "./chapterOne/mosslineSwitchyard.js";
import { createRainbarrelRowScene } from "./chapterOne/rainbarrelRow.js";
import { createStarlightVillageScene } from "./chapterOne/starlightVillage.js";
import { createStormedgeRiseScene } from "./chapterOne/stormedgeRise.js";
import { createGlassrailCrossingScene } from "./chapterTwo/glassrailCrossing.js";
import { createLanternMarketScene } from "./chapterTwo/lanternMarket.js";
import { createOldObservatoryScene } from "./chapterTwo/oldObservatory.js";

export const sceneIds = {
  beaconHill: "chapter-one/beacon-hill",
  glassrailCrossing: "chapter-two/glassrail-crossing",
  glowfenGrove: "chapter-one/glowfen-grove",
  lanternMarket: "chapter-two/lantern-market",
  mosslineSwitchyard: "chapter-one/mossline-switchyard",
  oldObservatory: "chapter-two/old-observatory",
  rainbarrelRow: "chapter-one/rainbarrel-row",
  stormedgeRise: "chapter-one/stormedge-rise",
  starlightVillage: "chapter-one/starlight-village"
};

const sceneFactories = {
  [sceneIds.beaconHill]: createBeaconHillScene,
  [sceneIds.glassrailCrossing]: createGlassrailCrossingScene,
  [sceneIds.glowfenGrove]: createGlowfenGroveScene,
  [sceneIds.lanternMarket]: createLanternMarketScene,
  [sceneIds.mosslineSwitchyard]: createMosslineSwitchyardScene,
  [sceneIds.oldObservatory]: createOldObservatoryScene,
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
