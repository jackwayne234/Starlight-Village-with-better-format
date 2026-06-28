import { createGame } from "./core/game.js?v=chapter-grounding-fixes-1";
import { createInput } from "./core/input.js";
import { clearProgress, saveProgress } from "./core/progress.js";
import { createInitialScene, createScene } from "./scenes/sceneRegistry.js?v=chapter-grounding-fixes-1";
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
if (completionPreview === "chapter-five" && firstScene.repairTarget) {
  firstScene.chapterComplete = {
    title: "Beacon Hill Restored",
    subtitle: "The beacon is bright, the keeper systems are steady, and the path down toward Rainbarrel Row is lit.",
    checklist: [
      "Beacon signal focused",
      "Keeper rooms and relays restored",
      "Hill descent lamps opened the rainwater road"
    ],
    prompt: "Press Space, Enter, or E to continue"
  };
  firstScene.repairTarget.nextSceneId = "chapter-six/rainbarrel-row";
  firstScene.flow.mode = "chapter-complete";
  firstScene.flow.message = "Rainbarrel Row waits below.";
}
if (completionPreview === "chapter-six" && firstScene.repairTarget) {
  firstScene.chapterComplete = {
    title: "Rainbarrel Row Restored",
    subtitle: "The gutters, pumps, cisterns, and stormwater gate are carrying the rain safely again.",
    checklist: [
      "Runoff channels reopened",
      "Neighborhood water systems steadied",
      "Stormwater gate opened the road to Old Orchard"
    ],
    prompt: "Press Space, Enter, or E to continue"
  };
  firstScene.repairTarget.nextSceneId = "chapter-seven/old-orchard";
  firstScene.flow.mode = "chapter-complete";
  firstScene.flow.message = "Old Orchard waits beyond the rain.";
}
if (completionPreview === "chapter-seven" && firstScene.repairTarget) {
  firstScene.chapterComplete = {
    title: "Old Orchard Restored",
    subtitle: "The roots, bridges, bee boxes, and hidden tree door are steady enough to reach the glassworks road.",
    checklist: [
      "Orchard water line reopened",
      "Fruit paths and keeper devices restored",
      "Hollow tree opened the glassworks road"
    ],
    prompt: "Press Space, Enter, or E to continue"
  };
  firstScene.repairTarget.nextSceneId = "chapter-eight/glassworks-quarter";
  firstScene.flow.mode = "chapter-complete";
  firstScene.flow.message = "Glassworks Quarter waits beyond.";
}
if (completionPreview === "chapter-eight" && firstScene.repairTarget) {
  firstScene.chapterComplete = {
    title: "Glassworks Quarter Restored",
    subtitle: "The glassworks lamps, pipes, mirrors, and rainbow tower are shining cleanly toward the under-village road.",
    checklist: [
      "Glass signal focused",
      "Furnace and cooling systems steadied",
      "Rainbow tower opened the under-village road"
    ],
    prompt: "Press Space, Enter, or E to continue"
  };
  firstScene.repairTarget.nextSceneId = "chapter-nine/under-village";
  firstScene.flow.mode = "chapter-complete";
  firstScene.flow.message = "Under-Village waits below.";
}
if (completionPreview === "chapter-nine" && firstScene.repairTarget) {
  firstScene.chapterComplete = {
    title: "Under-Village Restored",
    subtitle: "The old doors, pipes, murals, gears, and heart engine are steady enough to return to the festival road.",
    checklist: [
      "Service doors opened",
      "Pipe locks and gears steadied",
      "Heart engine opened the festival road"
    ],
    prompt: "Press Space, Enter, or E to continue"
  };
  firstScene.repairTarget.nextSceneId = "chapter-ten/festival-return";
  firstScene.flow.mode = "chapter-complete";
  firstScene.flow.message = "Festival Return waits above.";
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
