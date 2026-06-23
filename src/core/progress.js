const SAVE_KEY = "starlight-village-v2-progress";
const SAVE_VERSION = 2;

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProgress(scene) {
  const progress = {
    version: SAVE_VERSION,
    sceneId: scene.id,
    repairIndex: scene.repairIndex,
    completedRepairIds: scene.repairs.filter((repair) => repair.complete).map((repair) => repair.id),
    chapterComplete: Boolean(scene.chapterComplete)
  };

  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
  } catch {
    // Saving is a convenience; the game should continue if storage is unavailable.
  }
}

export function clearProgress() {
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // Ignore storage failures.
  }
}

export function applyProgress(scene, progress) {
  if (!progress || ![1, SAVE_VERSION].includes(progress.version) || progress.sceneId !== scene.id) {
    return scene;
  }

  const completed = new Set(progress.completedRepairIds);
  scene.repairs.forEach((repair) => {
    if (!completed.has(repair.id)) {
      return;
    }

    repair.complete = true;
    repair.progress = 1;
  });

  const firstIncomplete = scene.repairs.findIndex((repair) => !repair.complete);
  scene.repairIndex = firstIncomplete === -1 ? scene.repairs.length - 1 : firstIncomplete;
  scene.repairTarget = scene.repairs[scene.repairIndex] ?? null;
  restoreWorldFlags(scene);
  restoreFlowMessage(scene, progress);
  return scene;
}

function restoreWorldFlags(scene) {
  const waterWheel = scene.repairs.find((repair) => repair.id === "water-wheel");

  scene.world.repaired = Boolean(waterWheel?.complete);
  scene.world.powerLevel = waterWheel?.complete ? 1 : 0;
  scene.world.groveBloom = scene.repairs.find((repair) => repair.id === "root-pump")?.complete ? 1 : 0;
  scene.repairs.filter((repair) => repair.complete).forEach((repair) => restoreRepairEffect(scene, repair));
}

function restoreRepairEffect(scene, repair) {
  if (repair.id === "root-pump") {
    if (scene.bridge) scene.bridge.repaired = true;
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "switchyard-junction") {
    scene.switchyard?.poles.forEach((pole) => {
      pole.lit = true;
    });
    scene.switchyard?.boxes.forEach((box) => {
      box.lit = true;
    });
  }

  if (repair.id === "storm-gauge" && scene.ridge?.gauge) {
    scene.ridge.gauge.lit = true;
  }

  if (repair.id === "beacon-tower" && scene.beaconHill?.tower) {
    scene.beaconHill.tower.lit = true;
  }

  if (repair.id === "rainbarrel-drain") {
    if (scene.rainbarrelRow?.drain) scene.rainbarrelRow.drain.cleared = true;
    scene.rainbarrelRow?.channels.forEach((channel) => {
      channel.flow = true;
    });
    scene.rainbarrelRow?.barrels.forEach((barrel) => {
      barrel.overflow = false;
    });
  }

  if (repair.id === "bakery-gutter" && scene.bakeryGutter) {
    scene.bakeryGutter.fixed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "bell-rope-corner" && scene.bellRopeCorner) {
    scene.bellRopeCorner.fixed = true;
    scene.bellRopeCorner.bellLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "workshop-lift" && scene.workshopLift) {
    scene.workshopLift.fixed = true;
    scene.workshopLift.platformRaised = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "schoolhouse-lanterns" && scene.schoolhouseLanterns) {
    scene.schoolhouseLanterns.fixed = true;
    scene.schoolhouseLanterns.posts.forEach((post) => {
      post.lit = true;
    });
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "market-awnings" && scene.marketAwnings) {
    scene.marketAwnings.fixed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "old-footbridge" && scene.oldFootbridge) {
    scene.oldFootbridge.fixed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "rain-drain-corner" && scene.rainDrainCorner) {
    scene.rainDrainCorner.fixed = true;
    scene.rainDrainCorner.waterHigh = false;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "mayor-porch" && scene.mayorPorch) {
    scene.mayorPorch.fixed = true;
    scene.mayorPorch.chimeLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (repair.id === "festival-square" && scene.festivalSquare) {
    scene.festivalSquare.fixed = true;
    scene.festivalSquare.starLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "lantern-lily-pool" && scene.lanternLilyPool) {
    scene.lanternLilyPool.fixed = true;
    scene.lanternLilyPool.liliesLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "bog-bridge" && scene.bogBridge) {
    scene.bogBridge.fixed = true;
    scene.bogBridge.stonesRaised = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "frogsong-lock" && scene.frogsongLock) {
    scene.frogsongLock.fixed = true;
    scene.frogsongLock.gateOpen = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "sunken-signpost" && scene.sunkenSignpost) {
    scene.sunkenSignpost.fixed = true;
    scene.sunkenSignpost.markerRaised = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "mist-pool" && scene.mistPool) {
    scene.mistPool.fixed = true;
    scene.mistPool.mistThin = true;
    scene.layers.mistBands = scene.layers.mistBands.map((band) => ({
      ...band,
      width: Math.max(160, band.width * 0.55)
    }));
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "moss-gate" && scene.mossGate) {
    scene.mossGate.fixed = true;
    scene.mossGate.gateOpen = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "old-fen-shrine" && scene.oldFenShrine) {
    scene.oldFenShrine.fixed = true;
    scene.oldFenShrine.bowlsAligned = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "glowfen-ferry" && scene.glowfenFerry) {
    scene.glowfenFerry.fixed = true;
    scene.glowfenFerry.ferryDocked = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "reedwatch-bank" && scene.reedwatchBank) {
    scene.reedwatchBank.fixed = true;
    scene.reedwatchBank.markersLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "cargo-cart-turntable" && scene.cargoCartTurntable) {
    scene.cargoCartTurntable.fixed = true;
    scene.cargoCartTurntable.cartMoved = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "signal-arm-row" && scene.signalArmRow) {
    scene.signalArmRow.fixed = true;
    scene.signalArmRow.armsAligned = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "conductor-booth" && scene.conductorBooth) {
    scene.conductorBooth.fixed = true;
    scene.conductorBooth.boardLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "crane-hook-yard" && scene.craneHookYard) {
    scene.craneHookYard.fixed = true;
    scene.craneHookYard.beamLifted = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "sparking-relay-shed" && scene.sparkingRelayShed) {
    scene.sparkingRelayShed.fixed = true;
    scene.sparkingRelayShed.sparksCalmed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "rain-slick-rails" && scene.rainSlickRails) {
    scene.rainSlickRails.fixed = true;
    scene.rainSlickRails.railsSanded = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "tunnel-mouth" && scene.tunnelMouth) {
    scene.tunnelMouth.fixed = true;
    scene.tunnelMouth.warningLampsSafe = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "clock-signal" && scene.clockSignal) {
    scene.clockSignal.fixed = true;
    scene.clockSignal.clockSynced = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "last-platform" && scene.lastPlatform) {
    scene.lastPlatform.fixed = true;
    scene.lastPlatform.platformLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (repair.id === "archive-lens-array") {
    if (scene.observatory?.lens) scene.observatory.lens.lit = true;
    if (scene.observatory?.tower) scene.observatory.tower.lit = true;
  }
}

function restoreFlowMessage(scene, progress) {
  const allComplete = scene.repairs.length > 0 && scene.repairs.every((repair) => repair.complete);
  if (allComplete) {
    if (scene.repairTarget?.nextSceneId) {
      scene.nextSceneId = scene.repairTarget.nextSceneId;
    }

    if (progress.chapterComplete || scene.repairTarget?.chapterComplete) {
      scene.chapterComplete = scene.repairTarget.chapterComplete;
      scene.flow.mode = "chapter-complete";
      scene.flow.message = scene.repairTarget.nextText;
      return;
    }

    scene.flow.message = "All repairs in this slice are stable.";
    return;
  }

  if (scene.repairTarget?.complete) {
    scene.flow.message = scene.repairTarget.nextText;
    return;
  }

  scene.flow.message = "Progress restored. Follow the lane to the next repair.";
}
