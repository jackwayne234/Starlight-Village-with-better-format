import { config } from "../core/config.js";
import { drawActors } from "./actorRenderer.js?v=robot-scan-restored";
import { drawBackdrop } from "./backdropRenderer.js?v=chapter-review-visual-fixes-3";
import { drawWeather } from "./weatherRenderer.js?v=no-bottom-ovals";
import { drawWorld } from "./worldRenderer.js?v=chapter-review-visual-fixes-3";
import { imageReady, sprites } from "./sprites.js?v=chapter-review-visual-fixes-3";
import { drawHud } from "../ui/hud.js?v=zero-painted-assets";

export function renderScene(ctx, scene, time, transition = null, options = {}) {
  const { hud = true } = options;
  const { width, height } = config.canvas;
  const cameraX = scene.camera.x;

  ctx.clearRect(0, 0, width, height);
  drawBackdrop(ctx, scene, time, width, height, cameraX);
  drawWorld(ctx, scene, time, width, height, cameraX);
  drawActors(ctx, scene, time, cameraX);
  drawWeather(ctx, scene, time, width, height);
  if (scene.flow.mode === "visual-transition" && drawVisualTransitionPage(ctx, scene, time, width, height)) {
    return;
  }
  if (hud) {
    drawHud(ctx, scene, width, height);
  }
  drawTransition(ctx, transition, width, height);
}

function drawVisualTransitionPage(ctx, scene, time, width, height) {
  const page = scene.visualTransition;
  if (!page) {
    return false;
  }

  const image = sprites.chapterThree?.transitions?.[page.sprite] ?? sprites.chapterFour?.transitions?.[page.sprite];
  if (!imageReady(image)) {
    return false;
  }

  drawImageCover(ctx, image, 0, 0, width, height);

  const pulse = 0.72 + Math.sin(time * 2.4) * 0.08;
  ctx.save();
  ctx.fillStyle = "rgba(5, 14, 16, 0.32)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(8, 15, 17, 0.66)";
  roundedRect(ctx, width / 2 - 250, height - 96, 500, 50, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 216, 135, 0.32)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = `rgba(255, 232, 166, ${pulse})`;
  ctx.font = "700 15px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(page.prompt ?? "Press Space, Enter, or E to continue", width / 2, height - 66);
  ctx.restore();
  return true;
}

function drawImageCover(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
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
