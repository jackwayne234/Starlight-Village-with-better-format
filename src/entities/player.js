import { config } from "../core/config.js";
import { clamp } from "../core/camera.js";

export function updatePlayer(scene, input, dt) {
  if (scene.flow.mode !== "walking" && scene.flow.mode !== "reward") {
    scene.player.walking = false;
    return;
  }

  const left = input.isDown("ArrowLeft") || input.isDown("KeyA");
  const right = input.isDown("ArrowRight") || input.isDown("KeyD");
  const axis = Number(right) - Number(left);

  scene.player.walking = axis !== 0;
  if (axis !== 0) {
    scene.player.facing = axis;
  }

  scene.player.x = clamp(scene.player.x + axis * config.player.speed * dt, 120, scene.world.width - 120);
}
