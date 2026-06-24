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
import { createBeaconApproachScene } from "./chapterFour/beaconApproach.js";
import { createCloudHarvesterScene } from "./chapterFour/cloudHarvester.js";
import { createCliffRopeLiftScene } from "./chapterFour/cliffRopeLift.js";
import { createCrackedStairScene } from "./chapterFour/crackedStair.js";
import { createLightningRodFieldScene } from "./chapterFour/lightningRodField.js";
import { createLookoutPostScene } from "./chapterFour/lookoutPost.js";
import { createSummitPathScene } from "./chapterFour/summitPath.js";
import { createWeatherVaneRoofScene } from "./chapterFour/weatherVaneRoof.js";
import { createWindChimePassScene } from "./chapterFour/windChimePass.js";
import {
  createBellPlatformScene,
  createFuelShedScene,
  createHillDescentScene,
  createKeeperCottageScene,
  createLensRoomScene,
  createMirrorArrayScene,
  createOldFlagRoomScene,
  createRelayBalconyScene,
  createStormShuttersScene
} from "./chapterFive/routeScenes.js";
import {
  createCisternHouseScene,
  createFloodedCellarScene,
  createGutterBellScene,
  createLaundryLinesScene,
  createNeighborhoodFountainScene,
  createOverflowGardenScene,
  createPumpAlleyScene,
  createRooftopChannelsScene,
  createStormwaterGateScene
} from "./chapterSix/routeScenes.js";
import {
  createBeeBoxRowScene,
  createBirdhouseLaneScene,
  createBranchBridgeScene,
  createCiderPressScene,
  createHollowTreeDoorScene,
  createMoonAppleTreeScene,
  createOldOrchardScene,
  createRootCellarScene,
  createScarecrowWiresScene,
  createWindfallenFruitScene
} from "./chapterSeven/routeScenes.js";
import {
  createColorFilterHallScene,
  createCoolingPipesScene,
  createCrackedSkylightsScene,
  createFurnaceBellowsScene,
  createGlassworksQuarterScene,
  createLensGrinderScene,
  createMirrorMazeScene,
  createPrismLampRowScene,
  createRainbowTowerScene,
  createStainedGlassPathScene
} from "./chapterEight/routeScenes.js";
import {
  createBuriedMuralsScene,
  createDrainLocksScene,
  createEchoDoorScene,
  createForgottenMachineScene,
  createGearRoomScene,
  createHeartEngineScene,
  createOldPipeCrossingScene,
  createSealedWorkshopScene,
  createUndergroundStreamScene,
  createUnderVillageScene
} from "./chapterNine/routeScenes.js";
import {
  createCelebrationSquareScene,
  createFestivalReturnScene,
  createFireworksSafetyScene,
  createFoodStallsScene,
  createKiteRiggingScene,
  createLanternParadeScene,
  createMemoryWallScene,
  createMusicStageScene,
  createStarMapScene,
  createTownClockScene
} from "./chapterTen/routeScenes.js";
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
import { createWetlandApproachScene } from "./chapterTwo/wetlandApproach.js";
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
  beaconApproach: "chapter-four/beacon-approach",
  beeBoxRow: "chapter-seven/bee-box-row",
  bakeryGutter: "chapter-one/bakery-gutter",
  bellRopeCorner: "chapter-one/bell-rope-corner",
  bellPlatform: "chapter-five/bell-platform",
  birdhouseLane: "chapter-seven/birdhouse-lane",
  bogBridge: "chapter-two/bog-bridge",
  branchBridge: "chapter-seven/branch-bridge",
  cargoCartTurntable: "chapter-three/cargo-cart-turntable",
  cisternHouse: "chapter-six/cistern-house",
  ciderPress: "chapter-seven/cider-press",
  clockSignal: "chapter-three/clock-signal",
  cliffRopeLift: "chapter-four/cliff-rope-lift",
  cloudHarvester: "chapter-four/cloud-harvester",
  colorFilterHall: "chapter-eight/color-filter-hall",
  coolingPipes: "chapter-eight/cooling-pipes",
  crackedStair: "chapter-four/cracked-stair",
  crackedSkylights: "chapter-eight/cracked-skylights",
  conductorBooth: "chapter-three/conductor-booth",
  craneHookYard: "chapter-three/crane-hook-yard",
  furnaceBellows: "chapter-eight/furnace-bellows",
  rainSlickRails: "chapter-three/rain-slick-rails",
  sparkingRelayShed: "chapter-three/sparking-relay-shed",
  tunnelMouth: "chapter-three/tunnel-mouth",
  workshopLift: "chapter-one/workshop-lift",
  glassworksQuarter: "chapter-eight/glassworks-quarter",
  glassrailCrossing: "chapter-two/glassrail-crossing",
  festivalSquare: "chapter-one/festival-square",
  fuelShed: "chapter-five/fuel-shed",
  frogsongLock: "chapter-two/frogsong-lock",
  glowfenFerry: "chapter-two/glowfen-ferry",
  glowfenGrove: "chapter-two/glowfen-grove",
  floodedCellar: "chapter-six/flooded-cellar",
  gutterBell: "chapter-six/gutter-bell",
  hillDescent: "chapter-five/hill-descent",
  hollowTreeDoor: "chapter-seven/hollow-tree-door",
  lanternMarket: "chapter-two/lantern-market",
  lanternLilyPool: "chapter-two/lantern-lily-pool",
  lastPlatform: "chapter-three/last-platform",
  laundryLines: "chapter-six/laundry-lines",
  keeperCottage: "chapter-five/keeper-cottage",
  lensGrinder: "chapter-eight/lens-grinder",
  lensRoom: "chapter-five/lens-room",
  lightningRodField: "chapter-four/lightning-rod-field",
  lookoutPost: "chapter-four/lookout-post",
  marketAwnings: "chapter-one/market-awnings",
  mayorPorch: "chapter-one/mayor-porch",
  mistPool: "chapter-two/mist-pool",
  mirrorArray: "chapter-five/mirror-array",
  mirrorMaze: "chapter-eight/mirror-maze",
  moonAppleTree: "chapter-seven/moon-apple-tree",
  mossGate: "chapter-two/moss-gate",
  neighborhoodFountain: "chapter-six/neighborhood-fountain",
  oldFenShrine: "chapter-two/old-fen-shrine",
  oldFlagRoom: "chapter-five/old-flag-room",
  oldOrchard: "chapter-seven/old-orchard",
  oldPipeCrossing: "chapter-nine/old-pipe-crossing",
  mosslineSwitchyard: "chapter-three/mossline-switchyard",
  oldObservatory: "chapter-two/old-observatory",
  oldFootbridge: "chapter-one/old-footbridge",
  overflowGarden: "chapter-six/overflow-garden",
  pumpAlley: "chapter-six/pump-alley",
  prismLampRow: "chapter-eight/prism-lamp-row",
  rainbarrelRow: "chapter-six/rainbarrel-row",
  rainbowTower: "chapter-eight/rainbow-tower",
  rainDrainCorner: "chapter-one/rain-drain-corner",
  reedwatchBank: "chapter-two/reedwatch-bank",
  relayBalcony: "chapter-five/relay-balcony",
  rootCellar: "chapter-seven/root-cellar",
  rooftopChannels: "chapter-six/rooftop-channels",
  schoolhouseLanterns: "chapter-one/schoolhouse-lanterns",
  scarecrowWires: "chapter-seven/scarecrow-wires",
  signalArmRow: "chapter-three/signal-arm-row",
  stormwaterGate: "chapter-six/stormwater-gate",
  stormShutters: "chapter-five/storm-shutters",
  stormedgeRise: "chapter-four/stormedge-rise",
  stainedGlassPath: "chapter-eight/stained-glass-path",
  summitPath: "chapter-four/summit-path",
  sunkenSignpost: "chapter-two/sunken-signpost",
  starlightVillage: "chapter-one/starlight-village",
  sealedWorkshop: "chapter-nine/sealed-workshop",
  underVillage: "chapter-nine/under-village",
  undergroundStream: "chapter-nine/underground-stream",
  weatherVaneRoof: "chapter-four/weather-vane-roof",
  wetlandApproach: "chapter-two/wetland-approach",
  windChimePass: "chapter-four/wind-chime-pass",
  windfallenFruit: "chapter-seven/windfallen-fruit",
  buriedMurals: "chapter-nine/buried-murals",
  drainLocks: "chapter-nine/drain-locks",
  echoDoor: "chapter-nine/echo-door",
  forgottenMachine: "chapter-nine/forgotten-machine",
  gearRoom: "chapter-nine/gear-room",
  heartEngine: "chapter-nine/heart-engine",
  festivalReturn: "chapter-ten/festival-return",
  lanternParade: "chapter-ten/lantern-parade",
  musicStage: "chapter-ten/music-stage",
  foodStalls: "chapter-ten/food-stalls",
  memoryWall: "chapter-ten/memory-wall",
  kiteRigging: "chapter-ten/kite-rigging",
  fireworksSafety: "chapter-ten/fireworks-safety",
  starMap: "chapter-ten/star-map",
  townClock: "chapter-ten/town-clock",
  celebrationSquare: "chapter-ten/celebration-square"
};

const handBuiltSceneFactories = {
  [sceneIds.bakeryGutter]: createBakeryGutterScene,
  [sceneIds.beeBoxRow]: createBeeBoxRowScene,
  [sceneIds.beaconApproach]: createBeaconApproachScene,
  [sceneIds.bellRopeCorner]: createBellRopeCornerScene,
  [sceneIds.bellPlatform]: createBellPlatformScene,
  [sceneIds.beaconHill]: createBeaconHillScene,
  [sceneIds.birdhouseLane]: createBirdhouseLaneScene,
  [sceneIds.bogBridge]: createBogBridgeScene,
  [sceneIds.branchBridge]: createBranchBridgeScene,
  [sceneIds.cargoCartTurntable]: createCargoCartTurntableScene,
  [sceneIds.clockSignal]: createClockSignalScene,
  [sceneIds.cliffRopeLift]: createCliffRopeLiftScene,
  [sceneIds.cloudHarvester]: createCloudHarvesterScene,
  [sceneIds.colorFilterHall]: createColorFilterHallScene,
  [sceneIds.coolingPipes]: createCoolingPipesScene,
  [sceneIds.crackedStair]: createCrackedStairScene,
  [sceneIds.crackedSkylights]: createCrackedSkylightsScene,
  [sceneIds.ciderPress]: createCiderPressScene,
  [sceneIds.conductorBooth]: createConductorBoothScene,
  [sceneIds.craneHookYard]: createCraneHookYardScene,
  [sceneIds.furnaceBellows]: createFurnaceBellowsScene,
  [sceneIds.buriedMurals]: createBuriedMuralsScene,
  [sceneIds.drainLocks]: createDrainLocksScene,
  [sceneIds.echoDoor]: createEchoDoorScene,
  [sceneIds.forgottenMachine]: createForgottenMachineScene,
  [sceneIds.gearRoom]: createGearRoomScene,
  [sceneIds.heartEngine]: createHeartEngineScene,
  [sceneIds.festivalReturn]: createFestivalReturnScene,
  [sceneIds.lanternParade]: createLanternParadeScene,
  [sceneIds.musicStage]: createMusicStageScene,
  [sceneIds.foodStalls]: createFoodStallsScene,
  [sceneIds.memoryWall]: createMemoryWallScene,
  [sceneIds.kiteRigging]: createKiteRiggingScene,
  [sceneIds.fireworksSafety]: createFireworksSafetyScene,
  [sceneIds.starMap]: createStarMapScene,
  [sceneIds.townClock]: createTownClockScene,
  [sceneIds.celebrationSquare]: createCelebrationSquareScene,
  [sceneIds.rainSlickRails]: createRainSlickRailsScene,
  [sceneIds.sparkingRelayShed]: createSparkingRelayShedScene,
  [sceneIds.tunnelMouth]: createTunnelMouthScene,
  [sceneIds.workshopLift]: createWorkshopLiftScene,
  [sceneIds.glassworksQuarter]: createGlassworksQuarterScene,
  [sceneIds.glowfenGrove]: createGlowfenGroveScene,
  [sceneIds.mosslineSwitchyard]: createMosslineSwitchyardScene,
  [sceneIds.rainbarrelRow]: createRainbarrelRowScene,
  [sceneIds.schoolhouseLanterns]: createSchoolhouseLanternsScene,
  [sceneIds.marketAwnings]: createMarketAwningsScene,
  [sceneIds.mayorPorch]: createMayorPorchScene,
  [sceneIds.festivalSquare]: createFestivalSquareScene,
  [sceneIds.fuelShed]: createFuelShedScene,
  [sceneIds.frogsongLock]: createFrogsongLockScene,
  [sceneIds.glowfenFerry]: createGlowfenFerryScene,
  [sceneIds.hillDescent]: createHillDescentScene,
  [sceneIds.hollowTreeDoor]: createHollowTreeDoorScene,
  [sceneIds.floodedCellar]: createFloodedCellarScene,
  [sceneIds.gutterBell]: createGutterBellScene,
  [sceneIds.lanternLilyPool]: createLanternLilyPoolScene,
  [sceneIds.lastPlatform]: createLastPlatformScene,
  [sceneIds.laundryLines]: createLaundryLinesScene,
  [sceneIds.keeperCottage]: createKeeperCottageScene,
  [sceneIds.lensGrinder]: createLensGrinderScene,
  [sceneIds.lensRoom]: createLensRoomScene,
  [sceneIds.lightningRodField]: createLightningRodFieldScene,
  [sceneIds.lookoutPost]: createLookoutPostScene,
  [sceneIds.mistPool]: createMistPoolScene,
  [sceneIds.mirrorArray]: createMirrorArrayScene,
  [sceneIds.mirrorMaze]: createMirrorMazeScene,
  [sceneIds.moonAppleTree]: createMoonAppleTreeScene,
  [sceneIds.mossGate]: createMossGateScene,
  [sceneIds.neighborhoodFountain]: createNeighborhoodFountainScene,
  [sceneIds.cisternHouse]: createCisternHouseScene,
  [sceneIds.oldFenShrine]: createOldFenShrineScene,
  [sceneIds.oldFlagRoom]: createOldFlagRoomScene,
  [sceneIds.oldOrchard]: createOldOrchardScene,
  [sceneIds.oldPipeCrossing]: createOldPipeCrossingScene,
  [sceneIds.overflowGarden]: createOverflowGardenScene,
  [sceneIds.pumpAlley]: createPumpAlleyScene,
  [sceneIds.prismLampRow]: createPrismLampRowScene,
  [sceneIds.rainbowTower]: createRainbowTowerScene,
  [sceneIds.reedwatchBank]: createReedwatchBankScene,
  [sceneIds.relayBalcony]: createRelayBalconyScene,
  [sceneIds.rootCellar]: createRootCellarScene,
  [sceneIds.rooftopChannels]: createRooftopChannelsScene,
  [sceneIds.sunkenSignpost]: createSunkenSignpostScene,
  [sceneIds.oldFootbridge]: createOldFootbridgeScene,
  [sceneIds.rainDrainCorner]: createRainDrainCornerScene,
  [sceneIds.signalArmRow]: createSignalArmRowScene,
  [sceneIds.scarecrowWires]: createScarecrowWiresScene,
  [sceneIds.stormwaterGate]: createStormwaterGateScene,
  [sceneIds.stormShutters]: createStormShuttersScene,
  [sceneIds.stormedgeRise]: createStormedgeRiseScene,
  [sceneIds.stainedGlassPath]: createStainedGlassPathScene,
  [sceneIds.summitPath]: createSummitPathScene,
  [sceneIds.starlightVillage]: createStarlightVillageScene,
  [sceneIds.sealedWorkshop]: createSealedWorkshopScene,
  [sceneIds.underVillage]: createUnderVillageScene,
  [sceneIds.undergroundStream]: createUndergroundStreamScene,
  [sceneIds.weatherVaneRoof]: createWeatherVaneRoofScene,
  [sceneIds.wetlandApproach]: createWetlandApproachScene,
  [sceneIds.windChimePass]: createWindChimePassScene,
  [sceneIds.windfallenFruit]: createWindfallenFruitScene,
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
