import { createBakeryGutterScene } from "./chapterOne/bakeryGutter.js";
import { createBellRopeCornerScene } from "./chapterOne/bellRopeCorner.js";
import { createBeaconHillScene } from "./chapterOne/beaconHill.js?v=beacon-remove-flags-wire";
import { createWorkshopLiftScene } from "./chapterOne/workshopLift.js";
import { createGlowfenGroveScene } from "./chapterOne/glowfenGrove.js";
import { createMosslineSwitchyardScene } from "./chapterOne/mosslineSwitchyard.js";
import { createRainbarrelRowScene } from "./chapterOne/rainbarrelRow.js";
import { createSchoolhouseLanternsScene } from "./chapterOne/schoolhouseLanterns.js";
import { createMarketAwningsScene } from "./chapterOne/marketAwnings.js";
import { createMayorPorchScene } from "./chapterOne/mayorPorch.js";
import { createFestivalSquareScene } from "./chapterOne/festivalSquare.js";
import { createOldFootbridgeScene } from "./chapterOne/oldFootbridge.js";
import { createRainDrainCornerScene } from "./chapterOne/rainDrainCorner.js";
import { createStarlightVillageScene } from "./chapterOne/starlightVillage.js";
import { createStormedgeRiseScene } from "./chapterOne/stormedgeRise.js";
import { createWeatherVaneRoofScene } from "./chapterFour/weatherVaneRoof.js";
import { createCargoCartTurntableScene } from "./chapterThree/cargoCartTurntable.js";
import { createConductorBoothScene } from "./chapterThree/conductorBooth.js";
import { createCraneHookYardScene } from "./chapterThree/craneHookYard.js";
import { createClockSignalScene } from "./chapterThree/clockSignal.js";
import { createRainSlickRailsScene } from "./chapterThree/rainSlickRails.js";
import { createLastPlatformScene } from "./chapterThree/lastPlatform.js";
import { createSignalArmRowScene } from "./chapterThree/signalArmRow.js";
import { createSparkingRelayShedScene } from "./chapterThree/sparkingRelayShed.js";
import { createTunnelMouthScene } from "./chapterThree/tunnelMouth.js";
import { createGlassrailCrossingScene } from "./chapterTwo/glassrailCrossing.js";
import { createLanternMarketScene } from "./chapterTwo/lanternMarket.js";
import { createLanternLilyPoolScene } from "./chapterTwo/lanternLilyPool.js";
import { createOldObservatoryScene } from "./chapterTwo/oldObservatory.js";
import { createBogBridgeScene } from "./chapterTwo/bogBridge.js";
import { createFrogsongLockScene } from "./chapterTwo/frogsongLock.js";
import { createGlowfenFerryScene } from "./chapterTwo/glowfenFerry.js";
import { createReedwatchBankScene } from "./chapterTwo/reedwatchBank.js";
import { createSunkenSignpostScene } from "./chapterTwo/sunkenSignpost.js";
import { createMistPoolScene } from "./chapterTwo/mistPool.js";
import { createMossGateScene } from "./chapterTwo/mossGate.js";
import { createOldFenShrineScene } from "./chapterTwo/oldFenShrine.js";
import { fullGameSceneById, fullGameSceneIds } from "./fullGameCatalog.js";
import { createPlannedScene } from "./plannedSceneFactory.js";
import { addTreeDensity } from "./treeDensity.js";

export const sceneIds = {
  beaconHill: "chapter-five/beacon-hill",
  bakeryGutter: "chapter-one/bakery-gutter",
  bellRopeCorner: "chapter-one/bell-rope-corner",
  bogBridge: "chapter-two/bog-bridge",
  cargoCartTurntable: "chapter-three/cargo-cart-turntable",
  clockSignal: "chapter-three/clock-signal",
  conductorBooth: "chapter-three/conductor-booth",
  craneHookYard: "chapter-three/crane-hook-yard",
  rainSlickRails: "chapter-three/rain-slick-rails",
  sparkingRelayShed: "chapter-three/sparking-relay-shed",
  tunnelMouth: "chapter-three/tunnel-mouth",
  workshopLift: "chapter-one/workshop-lift",
  glassrailCrossing: "chapter-two/glassrail-crossing",
  festivalSquare: "chapter-one/festival-square",
  frogsongLock: "chapter-two/frogsong-lock",
  glowfenFerry: "chapter-two/glowfen-ferry",
  glowfenGrove: "chapter-two/glowfen-grove",
  lanternMarket: "chapter-two/lantern-market",
  lanternLilyPool: "chapter-two/lantern-lily-pool",
  lastPlatform: "chapter-three/last-platform",
  marketAwnings: "chapter-one/market-awnings",
  mayorPorch: "chapter-one/mayor-porch",
  mistPool: "chapter-two/mist-pool",
  mossGate: "chapter-two/moss-gate",
  oldFenShrine: "chapter-two/old-fen-shrine",
  mosslineSwitchyard: "chapter-three/mossline-switchyard",
  oldObservatory: "chapter-two/old-observatory",
  oldFootbridge: "chapter-one/old-footbridge",
  rainbarrelRow: "chapter-six/rainbarrel-row",
  rainDrainCorner: "chapter-one/rain-drain-corner",
  reedwatchBank: "chapter-two/reedwatch-bank",
  schoolhouseLanterns: "chapter-one/schoolhouse-lanterns",
  signalArmRow: "chapter-three/signal-arm-row",
  stormedgeRise: "chapter-four/stormedge-rise",
  sunkenSignpost: "chapter-two/sunken-signpost",
  starlightVillage: "chapter-one/starlight-village",
  weatherVaneRoof: "chapter-four/weather-vane-roof"
};

const handBuiltSceneFactories = {
  [sceneIds.bakeryGutter]: createBakeryGutterScene,
  [sceneIds.bellRopeCorner]: createBellRopeCornerScene,
  [sceneIds.beaconHill]: createBeaconHillScene,
  [sceneIds.bogBridge]: createBogBridgeScene,
  [sceneIds.cargoCartTurntable]: createCargoCartTurntableScene,
  [sceneIds.clockSignal]: createClockSignalScene,
  [sceneIds.conductorBooth]: createConductorBoothScene,
  [sceneIds.craneHookYard]: createCraneHookYardScene,
  [sceneIds.rainSlickRails]: createRainSlickRailsScene,
  [sceneIds.sparkingRelayShed]: createSparkingRelayShedScene,
  [sceneIds.tunnelMouth]: createTunnelMouthScene,
  [sceneIds.workshopLift]: createWorkshopLiftScene,
  [sceneIds.glowfenGrove]: createGlowfenGroveScene,
  [sceneIds.mosslineSwitchyard]: createMosslineSwitchyardScene,
  [sceneIds.rainbarrelRow]: createRainbarrelRowScene,
  [sceneIds.schoolhouseLanterns]: createSchoolhouseLanternsScene,
  [sceneIds.marketAwnings]: createMarketAwningsScene,
  [sceneIds.mayorPorch]: createMayorPorchScene,
  [sceneIds.festivalSquare]: createFestivalSquareScene,
  [sceneIds.frogsongLock]: createFrogsongLockScene,
  [sceneIds.glowfenFerry]: createGlowfenFerryScene,
  [sceneIds.lanternLilyPool]: createLanternLilyPoolScene,
  [sceneIds.lastPlatform]: createLastPlatformScene,
  [sceneIds.mistPool]: createMistPoolScene,
  [sceneIds.mossGate]: createMossGateScene,
  [sceneIds.oldFenShrine]: createOldFenShrineScene,
  [sceneIds.reedwatchBank]: createReedwatchBankScene,
  [sceneIds.sunkenSignpost]: createSunkenSignpostScene,
  [sceneIds.oldFootbridge]: createOldFootbridgeScene,
  [sceneIds.rainDrainCorner]: createRainDrainCornerScene,
  [sceneIds.signalArmRow]: createSignalArmRowScene,
  [sceneIds.stormedgeRise]: createStormedgeRiseScene,
  [sceneIds.starlightVillage]: createStarlightVillageScene,
  [sceneIds.weatherVaneRoof]: createWeatherVaneRoofScene,
  "chapter-one/beacon-hill": createBeaconHillScene,
  "chapter-one/glowfen-grove": createGlowfenGroveScene,
  "chapter-one/mossline-switchyard": createMosslineSwitchyardScene,
  "chapter-one/stormedge-rise": createStormedgeRiseScene,
  "chapter-one/rainbarrel-row": createRainbarrelRowScene,
  "chapter-two/lantern-market": createLanternMarketScene,
  "chapter-two/glassrail-crossing": createGlassrailCrossingScene,
  "chapter-two/old-observatory": createOldObservatoryScene,
  "legacy/chapter-one/glowfen-grove": createGlowfenGroveScene,
  "legacy/chapter-one/mossline-switchyard": createMosslineSwitchyardScene,
  "legacy/chapter-one/stormedge-rise": createStormedgeRiseScene,
  "legacy/chapter-one/rainbarrel-row": createRainbarrelRowScene,
  "legacy/chapter-two/lantern-market": createLanternMarketScene,
  "legacy/chapter-two/glassrail-crossing": createGlassrailCrossingScene,
  "legacy/chapter-two/old-observatory": createOldObservatoryScene
};

export function createScene(sceneId) {
  const factory = handBuiltSceneFactories[sceneId];
  if (factory) {
    return addTreeDensity(factory());
  }

  if (fullGameSceneById.has(sceneId)) {
    return addTreeDensity(createPlannedScene(sceneId));
  }

  if (!factory) {
    throw new Error(`Unknown scene: ${sceneId}`);
  }
}

export function createInitialScene() {
  return createScene(sceneIds.starlightVillage);
}

export function getFullGameSceneIds() {
  return [...fullGameSceneIds];
}
