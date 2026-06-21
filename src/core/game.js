import { updateCamera } from "./camera.js";
import { updatePlayer } from "../entities/player.js";
import { updateRobot } from "../entities/robot.js";
import { updateRepairFlow } from "../interaction/repairFlow.js";
import { renderScene } from "../rendering/renderPipeline.js";

export function createGame({ canvas, ctx, input, firstScene, persistProgress, createScene }) {
  let scene = firstScene;
  let lastTime = 0;
  let running = false;

  function frame(now) {
    if (!running) {
      return;
    }

    const time = now / 1000;
    const dt = Math.min(0.033, lastTime ? time - lastTime : 0);
    lastTime = time;

    updatePlayer(scene, input, dt);
    updateRobot(scene, dt, time);
    updateRepairFlow(scene, input, dt);
    if (scene.nextSceneId && createScene) {
      scene = createScene(scene.nextSceneId);
      if (persistProgress) {
        persistProgress(scene);
      }
    }
    if (scene.progressDirty && persistProgress) {
      persistProgress(scene);
      scene.progressDirty = false;
    }
    updateCamera(scene, canvas);
    renderScene(ctx, scene, time);
    input.afterFrame();

    requestAnimationFrame(frame);
  }

  return {
    start() {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(frame);
    },
    getScene() {
      return scene;
    },
    setScene(nextScene) {
      scene = nextScene;
    }
  };
}
