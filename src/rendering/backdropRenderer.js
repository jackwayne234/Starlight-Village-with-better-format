import { config } from "../core/config.js";

const { colors } = config;

export function drawBackdrop(ctx, scene, time, width, height, cameraX) {
  drawSky(ctx, scene.backdrop, width, height);
  drawClouds(ctx, scene.backdrop, time, width, cameraX);
  drawHills(ctx, scene.backdrop, scene.world.width, width, height, cameraX);
}

function drawSky(ctx, backdrop, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, colors.skyTop);
  gradient.addColorStop(0.5, colors.skyMid);
  gradient.addColorStop(0.86, colors.skyLow);
  gradient.addColorStop(1, "#465244");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 232, 166, 0.24)";
  ctx.beginPath();
  ctx.ellipse(backdrop.moonX, backdrop.moonY, 116, 48, -0.18, 0, Math.PI * 2);
  ctx.fill();
}

function drawClouds(ctx, backdrop, time, width, cameraX) {
  drawCloudLayer(ctx, backdrop, time, width, cameraX, 0.08, 150, 0.16);
  drawCloudLayer(ctx, backdrop, time, width, cameraX, 0.16, 245, 0.11);
}

function drawCloudLayer(ctx, backdrop, time, width, cameraX, parallax, baseY, alpha) {
  const spacing = 520;
  const drift = backdrop.cloudDrift ?? 1;
  const firstX = -spacing + ((time * 9 * drift - cameraX * parallax) % spacing);

  ctx.fillStyle = `rgba(226, 235, 221, ${alpha})`;
  for (let i = 0; i < 5; i += 1) {
    const x = firstX + i * spacing;
    const y = baseY + Math.sin(time * 0.32 + i) * 5;
    ctx.beginPath();
    ctx.ellipse(x + 80, y, 135, 24, -0.08, 0, Math.PI * 2);
    ctx.ellipse(x + 190, y + 16, 172, 28, 0.06, 0, Math.PI * 2);
    ctx.ellipse(x + 325, y - 4, 118, 21, -0.12, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHills(ctx, backdrop, worldWidth, width, height, cameraX) {
  const farX = -cameraX * 0.18 + backdrop.hillOffset;
  const nearX = -cameraX * 0.38 + backdrop.ridgeOffset;
  const farWidth = Math.max(worldWidth * 0.72, width + 900);
  const nearWidth = Math.max(worldWidth * 0.9, width + 900);

  ctx.fillStyle = colors.hillFar;
  ctx.beginPath();
  ctx.moveTo(farX - 220, 430);
  ctx.bezierCurveTo(farX - 55, 308, farX + 100, 362, farX + 250, 302);
  ctx.bezierCurveTo(farX + 430, 232, farX + 570, 342, farX + 715, 292);
  ctx.bezierCurveTo(farX + 860, 242, farX + 970, 330, farX + farWidth, 285);
  ctx.lineTo(farX + farWidth, height);
  ctx.lineTo(farX - 220, height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = colors.hillNear;
  ctx.beginPath();
  ctx.moveTo(nearX - 260, 512);
  ctx.bezierCurveTo(nearX - 90, 388, nearX + 70, 474, nearX + 232, 394);
  ctx.bezierCurveTo(nearX + 430, 298, nearX + 588, 438, nearX + 758, 368);
  ctx.bezierCurveTo(nearX + 870, 322, nearX + 955, 386, nearX + nearWidth, 352);
  ctx.lineTo(nearX + nearWidth, height);
  ctx.lineTo(nearX - 260, height);
  ctx.closePath();
  ctx.fill();
}
