import { config } from "../core/config.js";
import { sprites, imageReady } from "./sprites.js";

const { colors } = config;

export function drawBackdrop(ctx, scene, time, width, height, cameraX) {
  drawSky(ctx, scene.backdrop, width, height);
  if (drawChapterThreeMosslineScenery(ctx, scene, width, height, cameraX)) {
    return;
  }
  if (drawChapterFourStormedgeScenery(ctx, scene, width, height, cameraX)) {
    return;
  }
  if (drawChapterTwoWetlandScenery(ctx, scene, width, height, cameraX)) {
    drawClouds(ctx, scene.backdrop, time, width, cameraX);
    return;
  }
  if (drawPaintedScenery(ctx, width, height, cameraX)) {
    drawClouds(ctx, scene.backdrop, time, width, cameraX);
    return;
  }
  drawClouds(ctx, scene.backdrop, time, width, cameraX);
  drawHills(ctx, scene.backdrop, scene.world.width, width, height, cameraX);
}

function drawChapterThreeMosslineScenery(ctx, scene, width, height, cameraX) {
  if (!scene.id?.startsWith("chapter-three/")) {
    return false;
  }

  const scenery = sprites.chapterThree?.backgrounds?.mosslineBackground;
  if (!imageReady(scenery)) {
    return false;
  }

  const scale = Math.max(height / scenery.naturalHeight, (width + 520) / scenery.naturalWidth);
  const drawWidth = scenery.naturalWidth * scale;
  const drawHeight = scenery.naturalHeight * scale;
  const y = height - drawHeight;
  const panRange = Math.max(0, drawWidth - width);
  const cameraRange = Math.max(1, (scene.world?.width ?? width) - width);
  const x = -Math.min(panRange, (cameraX / cameraRange) * panRange);

  ctx.save();
  ctx.globalAlpha = 0.98;
  ctx.filter = "brightness(0.82) saturate(0.92) contrast(1.08)";
  ctx.drawImage(scenery, x, y, drawWidth, drawHeight);
  ctx.restore();
  return true;
}

function drawChapterFourStormedgeScenery(ctx, scene, width, height, cameraX) {
  if (!scene.id?.startsWith("chapter-four/")) {
    return false;
  }

  const scenery = sprites.chapterFour?.backgrounds?.stormedgeBackground;
  if (!imageReady(scenery)) {
    return false;
  }

  const scale = Math.max(height / scenery.naturalHeight, (width + 420) / scenery.naturalWidth);
  const drawWidth = scenery.naturalWidth * scale;
  const drawHeight = scenery.naturalHeight * scale;
  const y = height - drawHeight;
  const panRange = Math.max(0, drawWidth - width);
  const cameraRange = Math.max(1, (scene.world?.width ?? width) - width);
  const x = -Math.min(panRange, (cameraX / cameraRange) * panRange);

  ctx.save();
  ctx.globalAlpha = 0.98;
  ctx.filter = "brightness(0.86) saturate(0.94) contrast(1.06)";
  ctx.drawImage(scenery, x, y, drawWidth, drawHeight);
  ctx.restore();
  return true;
}

// Shared Chapter 2 wetland backdrop. It is intentionally selected from the
// scene id so individual scene data can stay focused on local repair objects.
function drawChapterTwoWetlandScenery(ctx, scene, width, height, cameraX) {
  if (!scene.id?.startsWith("chapter-two/")) {
    return false;
  }

  const scenery = sprites.chapterTwo?.backgrounds?.wetlandBackground;
  if (!imageReady(scenery)) {
    return false;
  }

  const scale = Math.max(height / scenery.naturalHeight, width / scenery.naturalWidth);
  const drawWidth = scenery.naturalWidth * scale;
  const drawHeight = scenery.naturalHeight * scale;
  const y = height - drawHeight;
  const parallax = 0.2;
  const x = -((cameraX * parallax) % drawWidth);

  ctx.save();
  ctx.globalAlpha = 0.98;
  ctx.filter = "brightness(0.9) saturate(0.95) contrast(1.05)";
  for (let drawX = x - drawWidth; drawX < width + drawWidth; drawX += drawWidth - 1) {
    ctx.drawImage(scenery, drawX, y, drawWidth, drawHeight);
  }
  ctx.restore();
  return true;
}

// Painted misty hills/forest, drifting slowly behind the world (parallax).
// Returns true when it drew, so the code-drawn hills are skipped.
function drawPaintedScenery(ctx, width, height, cameraX) {
  const scenery = sprites.title.background;
  if (!imageReady(scenery)) {
    return false;
  }
  const scale = height / scenery.naturalHeight;
  const w = scenery.naturalWidth * scale;
  const x = -cameraX * 0.3;
  ctx.save();
  ctx.globalAlpha = 0.98;
  // The painted forest is a dark night scene; lift its brightness/contrast a
  // touch so it reads behind the village instead of blending into the sky.
  ctx.filter = "brightness(1.5) saturate(1.12) contrast(1.05)";
  ctx.drawImage(scenery, x, 0, w, height);
  // Cover any sliver past the right edge if the camera runs far.
  if (x + w < width) {
    ctx.drawImage(scenery, x + w - 1, 0, w, height);
  }
  ctx.restore();
  return true;
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
