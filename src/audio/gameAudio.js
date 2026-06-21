import { createAudioManager } from "./audioManager.js";

// One shared audio manager for the whole game.
const manager = createAudioManager();
let entranceThunderDone = false;

// Start (or resume) the looping rainy ambience. Safe to call as often as we
// like — the loop is only created once, and later calls just resume it.
// IMPORTANT: only unlock once. `unlock()` reloads every audio element, which
// would restart a thunder roll that is currently playing.
function ensureRain() {
  if (!manager.isUnlocked()) {
    manager.unlock();
  }
  manager.play("weather.rain.loop").catch(() => {});
}

// Best-effort attempt to have rain playing on the welcome screen before any
// interaction. Most browsers stay silent until the first gesture, but this
// primes the loop so it turns audible the instant the player clicks or types.
export function primeAudio() {
  ensureRain();
}

// Called on the first real user interaction of any kind (click, key, touch).
// That gesture unblocks audio, so the rain becomes audible and we roll an
// entrance thunder once.
export function unlockAudio() {
  ensureRain();

  if (!entranceThunderDone) {
    entranceThunderDone = true;
    manager.play("weather.thunder.roll", { fallbackId: "weather.thunder.fallback" }).catch(() => {});
  }
}

// Convenience cues used around the game.
export const sfx = {
  thunder() {
    manager.play("weather.thunder.roll", { fallbackId: "weather.thunder.fallback" }).catch(() => {});
  },
  transitionThunder() {
    manager.play("weather.thunder.roll", { fallbackId: "weather.thunder.fallback" }).catch(() => {});
  },
  rumble() {
    manager.play("weather.thunder.roll", { fallbackId: "weather.thunder.fallback" }).catch(() => {});
  },
  robotChirp() {
    manager.play("ui.scan.chirp").catch(() => {});
  },
  repairSuccess() {
    manager.play("ui.repair.success").catch(() => {});
  },
  tileRotate() {
    manager.play("ui.puzzle.rotate").catch(() => {});
  }
};

export { manager as audioManager };
