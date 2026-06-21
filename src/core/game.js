import { updateCamera } from "./camera.js";
import { updatePlayer } from "../entities/player.js";
import { updateRobot } from "../entities/robot.js";
import { updateRepairFlow } from "../interaction/repairFlow.js";
import { renderScene } from "../rendering/renderPipeline.js";

export function createGame({ canvas, ctx, input, firstScene, persistProgress, createScene }) {
  let scene = firstScene;
  let lastTime = 0;
  let running = false;
  let transition = null;

  function frame(now) {
    if (!running) {
      return;
    }

    const time = now / 1000;
    const dt = Math.min(0.033, lastTime ? time - lastTime : 0);
    lastTime = time;

    if (transition) {
      transition.elapsed += dt;
      if (!transition.switched && transition.elapsed >= transition.duration / 2) {
        scene = transition.nextScene;
        transition.switched = true;
        if (persistProgress) {
          persistProgress(scene);
        }
      }
      if (transition.elapsed >= transition.duration) {
        transition = null;
      }
    } else {
      updatePlayer(scene, input, dt);
      updateRobot(scene, dt);
      updateRepairFlow(scene, input, dt);
      if (scene.nextSceneId && createScene) {
        const nextScene = createScene(scene.nextSceneId);
        transition = {
          nextSceneId: scene.nextSceneId,
          nextScene,
          fromTitle: scene.title,
          toTitle: nextScene.title,
          message: scene.flow.message,
          elapsed: 0,
          duration: 1.8,
          switched: false
        };
        scene.nextSceneId = null;
      }
    }
    if (scene.progressDirty && persistProgress) {
      persistProgress(scene);
      scene.progressDirty = false;
    }
    updateCamera(scene, canvas);
    renderScene(ctx, scene, time, getTransitionState(transition));
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
      transition = null;
    }
  };
}

function getTransitionState(transition) {
  if (!transition) {
    return null;
  }

  const progress = Math.min(1, transition.elapsed / transition.duration);
  const fadeIn = smoothstep(clamp01(progress / 0.28));
  const fadeOut = 1 - smoothstep(clamp01((progress - 0.72) / 0.28));

  return {
    fromTitle: transition.fromTitle,
    toTitle: transition.toTitle,
    message: transition.message,
    cardAlpha: Math.min(fadeIn, fadeOut),
    veilAlpha: Math.max(fadeIn, fadeOut)
  };
}

function smoothstep(value) {
  return value * value * (3 - 2 * value);
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}
