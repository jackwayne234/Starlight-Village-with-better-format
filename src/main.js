import { createGame } from "./core/game.js?v=stormedge-real-sprite-pass";
import { createInput } from "./core/input.js";
import { clearProgress, saveProgress } from "./core/progress.js";
import { createInitialScene, createScene } from "./scenes/sceneRegistry.js?v=stormedge-real-sprite-pass";
import { primeAudio, unlockAudio } from "./audio/gameAudio.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const input = createInput();
clearProgress();
const playtestParams = new URLSearchParams(window.location.search);
const playtestSceneId = playtestParams.get("scene");
const previewMode = playtestParams.get("preview") === "1";
const transitionPreview = playtestParams.get("transition");
const completionPreview = playtestParams.get("complete");
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
if (transitionPreview === "glowfen-to-mossline") {
  firstScene.visualTransition = {
    sprite: "glowfenToMossline",
    nextSceneId: "chapter-three/mossline-switchyard",
    nextText: "Mossline Switchyard is next.",
    prompt: "Press Space, Enter, or E to enter Mossline"
  };
  firstScene.flow.mode = "visual-transition";
  firstScene.flow.message = "Mossline Switchyard is next.";
}
if (transitionPreview === "mossline-to-stormedge") {
  firstScene.visualTransition = {
    sprite: "mosslineToStormedge",
    nextSceneId: "chapter-four/stormedge-rise",
    nextText: "Climbing into Stormedge Rise.",
    prompt: "Press Space, Enter, or E to step onto the storm ridge"
  };
  firstScene.flow.mode = "visual-transition";
  firstScene.flow.message = "Stormedge Rise waits beyond the rain.";
}
if (completionPreview === "chapter-three" && firstScene.repairTarget) {
  firstScene.chapterComplete = {
    title: "Mossline Restored",
    subtitle: "All Mossline signals are restored, and the road toward the storm ridge is open.",
    checklist: [
      "Junction current steadied",
      "Rail signals and relays restored",
      "Last Platform lamp opened the hill road"
    ],
    prompt: "Press Space, Enter, or E to continue"
  };
  firstScene.repairTarget.nextSceneId = "chapter-four/stormedge-rise";
  firstScene.flow.mode = "chapter-complete";
  firstScene.flow.message = "Stormedge Rise waits beyond the rain.";
}
if (completionPreview === "chapter-four" && firstScene.repairTarget) {
  firstScene.chapterComplete = {
    title: "Stormedge Rise Restored",
    subtitle: "The storm-ridge path is safe, the weather systems are restored, and Beacon Hill is reachable.",
    checklist: [
      "Ridge safety systems steadied",
      "Weather machinery restored",
      "Final beacon gate opened"
    ],
    prompt: "Press Space, Enter, or E to continue"
  };
  firstScene.repairTarget.nextSceneId = "chapter-five/beacon-hill";
  firstScene.flow.mode = "chapter-complete";
  firstScene.flow.message = "Beacon Hill waits beyond the gate.";
}
const game = createGame({
  canvas,
  ctx,
  input,
  firstScene,
  autoStart: previewMode || Boolean(transitionPreview) || Boolean(completionPreview),
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
