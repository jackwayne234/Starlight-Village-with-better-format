import { createGame } from "./core/game.js?v=route-100-spine";
import { createInput } from "./core/input.js";
import { clearProgress, saveProgress } from "./core/progress.js";
import { createInitialScene, createScene } from "./scenes/sceneRegistry.js?v=route-100-spine";
import { primeAudio, unlockAudio } from "./audio/gameAudio.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const input = createInput();
clearProgress();
const playtestParams = new URLSearchParams(window.location.search);
const playtestSceneId = playtestParams.get("scene");
const previewMode = playtestParams.get("preview") === "1";
const firstScene = playtestSceneId ? createScene(playtestSceneId) : createInitialScene();
const playtestX = Number(playtestParams.get("x"));
if (playtestSceneId && Number.isFinite(playtestX)) {
  firstScene.player.x = playtestX;
  firstScene.robot.x = playtestX + 96;
}
if (previewMode) {
  firstScene.repairs = [];
  firstScene.repairTarget = null;
  firstScene.flow.message = "";
}
const game = createGame({
  canvas,
  ctx,
  input,
  firstScene,
  autoStart: previewMode,
  persistProgress: saveProgress,
  createScene
});

// Try to start the rainy ambience right away on the welcome screen. Browsers
// usually keep it silent until the player interacts, so we also start it on the
// very first interaction of any kind — clicking or touching the welcome screen
// turns the sound on while the title is still up, and it stays on after that.
primeAudio();
["keydown", "pointerdown", "touchstart", "click"].forEach((eventName) => {
  window.addEventListener(eventName, unlockAudio);
});

window.addEventListener("keydown", (event) => {
  if (event.code !== "KeyR" || event.repeat) {
    return;
  }

  event.preventDefault();
  clearProgress();
  game.setScene(createInitialScene());
});

game.start();
