import { config } from "../core/config.js";
import { drawActors } from "./actorRenderer.js?v=robot-scan-restored";
import { drawBackdrop } from "./backdropRenderer.js";
import { drawWeather } from "./weatherRenderer.js?v=no-bottom-ovals";
import { drawWorld } from "./worldRenderer.js?v=large-painted-relay-shed";
import { drawHud } from "../ui/hud.js?v=chapter-repair-label";

export function renderScene(ctx, scene, time, transition = null, options = {}) {
  const { hud = true } = options;
  const { width, height } = config.canvas;
  const cameraX = scene.camera.x;

  ctx.clearRect(0, 0, width, height);
  drawBackdrop(ctx, scene, time, width, height, cameraX);
  drawWorld(ctx, scene, time, width, height, cameraX);
  drawActors(ctx, scene, time, cameraX);
  drawWeather(ctx, scene, time, width, height);
  if (hud) {
    drawHud(ctx, scene, width, height);
  }
  drawTransition(ctx, transition, width, height);
}

function drawTransition(ctx, transition, width, height) {
  if (!transition || transition.veilAlpha <= 0) {
    return;
  }

  const veilAlpha = Math.min(1, transition.veilAlpha);
  const cardAlpha = Math.min(1, transition.cardAlpha);

  ctx.save();
  ctx.fillStyle = `rgba(8, 15, 17, ${veilAlpha})`;
  ctx.fillRect(0, 0, width, height);

  if (cardAlpha > 0.02) {
    ctx.globalAlpha = cardAlpha;
    ctx.fillStyle = "rgba(20, 31, 30, 0.88)";
    roundedRect(ctx, width / 2 - 250, height / 2 - 84, 500, 168, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 232, 166, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "rgba(143, 217, 240, 0.88)";
    ctx.font = "700 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Traveling", width / 2, height / 2 - 42);

    ctx.fillStyle = "rgba(255, 239, 196, 0.98)";
    ctx.font = "800 28px system-ui, sans-serif";
    ctx.fillText(transition.toTitle, width / 2, height / 2 - 6);

    ctx.fillStyle = "rgba(210, 229, 217, 0.86)";
    ctx.font = "600 15px system-ui, sans-serif";
    ctx.fillText(transition.message, width / 2, height / 2 + 32);

    drawTravelDots(ctx, width / 2, height / 2 + 58);
  }

  ctx.restore();
}

function drawTravelDots(ctx, x, y) {
  ctx.fillStyle = "rgba(255, 232, 166, 0.76)";
  [-18, 0, 18].forEach((offset, index) => {
    ctx.globalAlpha = 0.35 + index * 0.22;
    ctx.beginPath();
    ctx.arc(x + offset, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
