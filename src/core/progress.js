const SAVE_KEY = "starlight-village-v2-progress";
const SAVE_VERSION = 1;

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
    completedRepairIds: scene.repairs.filter((repair) => repair.complete).map((repair) => repair.id)
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
  if (!progress || progress.version !== SAVE_VERSION || progress.sceneId !== scene.id) {
    return scene;
  }

  const completed = new Set(progress.completedRepairIds);
  scene.repairs.forEach((repair) => {
    if (!completed.has(repair.id)) {
      return;
    }

    repair.complete = true;
    repair.progress = 1;
    if (repair.kind === "timed-tap") {
      repair.hits = repair.requiredHits;
    }
  });

  const firstIncomplete = scene.repairs.findIndex((repair) => !repair.complete);
  scene.repairIndex = firstIncomplete === -1 ? scene.repairs.length - 1 : firstIncomplete;
  scene.repairTarget = scene.repairs[scene.repairIndex] ?? null;
  restoreWorldFlags(scene);
  restoreFlowMessage(scene);
  return scene;
}

function restoreWorldFlags(scene) {
  const waterWheel = scene.repairs.find((repair) => repair.id === "water-wheel");
  const lampRelay = scene.repairs.find((repair) => repair.id === "lamp-relay");

  scene.world.repaired = Boolean(waterWheel?.complete);
  scene.world.powerLevel = waterWheel?.complete ? 1 : waterWheel?.progress ?? 0;
  scene.world.relayAligned = Boolean(lampRelay?.complete);
}

function restoreFlowMessage(scene) {
  const allComplete = scene.repairs.length > 0 && scene.repairs.every((repair) => repair.complete);
  if (allComplete) {
    scene.flow.message = "All repairs in this slice are stable.";
    return;
  }

  if (scene.repairTarget?.complete) {
    scene.flow.message = scene.repairTarget.nextText;
    return;
  }

  scene.flow.message = "Progress restored. Follow the lane to the next repair.";
}
