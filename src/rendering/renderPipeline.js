import { config } from "../core/config.js";
import { drawActors } from "./actorRenderer.js";
import { drawBackdrop } from "./backdropRenderer.js";
import { drawWeather } from "./weatherRenderer.js";
import { drawWorld } from "./worldRenderer.js";
import { drawHud } from "../ui/hud.js";

export function renderScene(ctx, scene, time) {
  const { width, height } = config.canvas;
  const cameraX = scene.camera.x;

  ctx.clearRect(0, 0, width, height);
  drawBackdrop(ctx, scene, time, width, height, cameraX);
  drawWorld(ctx, scene, time, width, height, cameraX);
  drawActors(ctx, scene, time, cameraX);
  drawWeather(ctx, scene, time, width, height);
  drawHud(ctx, scene, width, height);
}
