// Cozy title / start screen drawn over a live rainy backdrop of the first
// scene. `alpha` (0..1) lets the game fade it in at boot and out on start.

import { sprites, imageReady } from "../rendering/sprites.js";

export function drawTitleScreen(ctx, time, width, height, alpha = 1) {
  if (alpha <= 0) {
    return;
  }

  ctx.save();
  ctx.globalAlpha = alpha;

  drawHeroBackdrop(ctx, width, height);
  drawVeil(ctx, width, height);
  drawStarlight(ctx, time, width, height);

  const centerX = width / 2;
  const titleY = height * 0.42;

  drawTitle(ctx, centerX, titleY, time);
  drawSubtitle(ctx, centerX, titleY + 52);
  drawStartPrompt(ctx, centerX, height * 0.7, time);
  drawControlsHint(ctx, centerX, height - 46);

  ctx.restore();
}

function drawHeroBackdrop(ctx, width, height) {
  // Painted cover art, scaled to fill the screen (cover-fit), behind the veil.
  const hero = sprites.title.hero;
  if (!imageReady(hero)) {
    return;
  }
  const scale = Math.max(width / hero.naturalWidth, height / hero.naturalHeight);
  const w = hero.naturalWidth * scale;
  const h = hero.naturalHeight * scale;
  ctx.drawImage(hero, (width - w) / 2, (height - h) / 2, w, h);
}

function drawVeil(ctx, width, height) {
  // Soft darkening so text reads, but the rainy village stays visible behind.
  // Lighter veil now that the itch cover art is the star — just enough to keep
  // the title and prompt legible, darkening a little more at top and bottom.
  const veil = ctx.createLinearGradient(0, 0, 0, height);
  veil.addColorStop(0, "rgba(9, 16, 20, 0.42)");
  veil.addColorStop(0.5, "rgba(10, 18, 22, 0.16)");
  veil.addColorStop(1, "rgba(7, 12, 15, 0.58)");
  ctx.fillStyle = veil;
  ctx.fillRect(0, 0, width, height);

  // Warm glow pooled behind the title.
  const glow = ctx.createRadialGradient(width / 2, height * 0.42, 40, width / 2, height * 0.42, 460);
  glow.addColorStop(0, "rgba(255, 214, 140, 0.16)");
  glow.addColorStop(1, "rgba(255, 214, 140, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

function drawStarlight(ctx, time, width, height) {
  // A scatter of gentle twinkles up top to sell the "starlight" name.
  const stars = 26;
  for (let i = 0; i < stars; i += 1) {
    const x = ((i * 137.5) % width) + Math.sin(i * 1.7) * 12;
    const y = 40 + ((i * 53) % Math.floor(height * 0.46));
    const twinkle = 0.35 + Math.sin(time * 2 + i * 1.3) * 0.3;
    const size = 1.4 + (i % 3) * 0.8;

    ctx.fillStyle = `rgba(${i % 4 === 0 ? "180, 226, 245" : "255, 236, 196"}, ${Math.max(0, twinkle)})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawTitle(ctx, x, y, time) {
  const breathe = Math.sin(time * 1.6) * 2;

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Soft halo behind the words.
  ctx.save();
  ctx.shadowColor = "rgba(255, 214, 140, 0.55)";
  ctx.shadowBlur = 26 + breathe;
  ctx.fillStyle = "rgba(255, 241, 205, 0.98)";
  ctx.font = "800 68px system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.fillText("Starlight Village", x, y);
  ctx.restore();

  // Thin cool underline accent.
  ctx.strokeStyle = "rgba(143, 217, 240, 0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 150, y + 18);
  ctx.lineTo(x + 150, y + 18);
  ctx.stroke();
}

function drawSubtitle(ctx, x, y) {
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(190, 224, 232, 0.92)";
  ctx.font = "600 19px system-ui, sans-serif";
  ctx.fillText("Chapter One — a cozy rainy repair tale", x, y);
}

function drawStartPrompt(ctx, x, y, time) {
  const pulse = 0.55 + Math.sin(time * 3) * 0.4;

  ctx.save();
  ctx.globalAlpha *= Math.max(0.2, pulse);
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 234, 168, 0.98)";
  ctx.font = "700 24px system-ui, sans-serif";
  ctx.fillText("Press Space to Begin", x, y);
  ctx.restore();
}

function drawControlsHint(ctx, x, y) {
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(214, 228, 222, 0.66)";
  ctx.font = "600 14px system-ui, sans-serif";
  ctx.fillText("Move  Left / Right  or  A · D         Repair / Continue  Space · Enter · E", x, y);
}
