import { updateCamera } from "./camera.js";
import { updatePlayer } from "../entities/player.js";
import { updateRobot } from "../entities/robot.js";
import { updateRepairFlow } from "../interaction/repairFlow.js?v=zero-painted-assets";
import { renderScene } from "../rendering/renderPipeline.js?v=chapter-grounding-fixes-1";
import { drawTitleScreen } from "../ui/titleScreen.js?v=browser-route-smoke-2";
import { sfx } from "../audio/gameAudio.js";

export function createGame({ canvas, ctx, input, firstScene, autoStart = false, persistProgress, createScene }) {
  let scene = firstScene;
  let lastTime = 0;
  let running = false;
  let transition = null;
  let started = autoStart;
  let titleAlpha = 0;
  let thunderTimer = 7;

  function frame(now) {
    if (!running) {
      return;
    }

    const time = now / 1000;
    const dt = Math.min(0.033, lastTime ? time - lastTime : 0);
    lastTime = time;

    // Title / start screen: live rainy backdrop, player frozen until Space.
    if (!started) {
      updateRobot(scene, dt);
      titleAlpha = Math.min(1, titleAlpha + dt * 2.4);
      if (consumeStartInput(input)) {
        started = true;
      }
      updateCamera(scene, canvas);
      renderScene(ctx, scene, time, null, { hud: false });
      drawTitleScreen(ctx, time, canvas.width, canvas.height, titleAlpha);
      input.afterFrame();
      requestAnimationFrame(frame);
      return;
    }

    if (titleAlpha > 0) {
      titleAlpha = Math.max(0, titleAlpha - dt * 2.6);
    }

    // Occasional rolling thunder through the rain, so the storm stays present.
    thunderTimer -= dt;
    if (thunderTimer <= 0) {
      sfx.rumble();
      thunderTimer = 13 + Math.random() * 12;
    }

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
      if (!isBlockingOverlay(scene)) {
        updatePlayer(scene, input, dt);
        updateRobot(scene, dt);
      }
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
        sfx.transitionThunder();
      }
    }
    if (scene.progressDirty && persistProgress) {
      persistProgress(scene);
      scene.progressDirty = false;
    }
    updateCamera(scene, canvas);
    renderScene(ctx, scene, time, getTransitionState(transition));
    if (titleAlpha > 0) {
      drawTitleScreen(ctx, time, canvas.width, canvas.height, titleAlpha);
    }
    input.afterFrame();

    requestAnimationFrame(frame);
  }

  function consumeStartInput(input) {
    return input.consume("Space") || input.consume("Enter") || input.consume("KeyE");
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

function isBlockingOverlay(scene) {
  return scene.flow.mode === "visual-transition" || scene.flow.mode === "chapter-complete";
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
