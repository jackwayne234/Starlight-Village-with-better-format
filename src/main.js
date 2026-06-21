import { createGame } from "./core/game.js";
import { createInput } from "./core/input.js";
import { applyProgress, clearProgress, loadProgress, saveProgress } from "./core/progress.js";
import { createInitialScene, createScene } from "./scenes/sceneRegistry.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const input = createInput();
const progress = loadProgress();
const firstScene = applyProgress(progress?.sceneId ? createScene(progress.sceneId) : createInitialScene(), progress);
const game = createGame({
  canvas,
  ctx,
  input,
  firstScene,
  persistProgress: saveProgress,
  createScene
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
