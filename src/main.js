import { createGame } from "./core/game.js";
import { createInput } from "./core/input.js";
import { applyProgress, clearProgress, loadProgress, saveProgress } from "./core/progress.js";
import { createInitialScene } from "./scenes/sceneRegistry.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const input = createInput();
const firstScene = applyProgress(createInitialScene(), loadProgress());
const game = createGame({
  canvas,
  ctx,
  input,
  firstScene,
  persistProgress: saveProgress
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
