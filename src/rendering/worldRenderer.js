import { config } from "../core/config.js";
import { sprites, imageReady } from "./sprites.js?v=painted-relay-shed";

const { colors } = config;

// Draws a world image centered on x, with its base resting on groundY.
function drawWorldSprite(ctx, image, x, groundY, height) {
  const scale = height / image.naturalHeight;
  const width = image.naturalWidth * scale;
  ctx.drawImage(image, x - width / 2, groundY - height, width, height);
  return { width, scale };
}

// Builds a repeating pattern from a tile image, scaled so the tile reads at
// `targetTileWidth` pixels on screen. Returns null if the image isn't ready.
function texturePattern(ctx, image, targetTileWidth) {
  if (!imageReady(image)) {
    return null;
  }
  const pattern = ctx.createPattern(image, "repeat");
  if (pattern && pattern.setTransform && typeof DOMMatrix !== "undefined") {
    const s = targetTileWidth / image.naturalWidth;
    pattern.setTransform(new DOMMatrix([s, 0, 0, s, 0, 0]));
  }
  return pattern;
}

// A warm vertical smear of light reflecting off the wet path below a lamp.
function drawWetReflection(ctx, x, topY, length, intensity) {
  if (intensity <= 0.04) {
    return;
  }
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const halo = ctx.createLinearGradient(x, topY, x, topY + length);
  halo.addColorStop(0, `rgba(255, 214, 140, ${0.46 * intensity})`);
  halo.addColorStop(0.5, `rgba(255, 198, 120, ${0.2 * intensity})`);
  halo.addColorStop(1, "rgba(255, 198, 120, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.ellipse(x, topY + length * 0.5, 14, length * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  // A thin bright core, like the streak of light on a puddle.
  const core = ctx.createLinearGradient(x, topY, x, topY + length * 0.82);
  core.addColorStop(0, `rgba(255, 238, 196, ${0.5 * intensity})`);
  core.addColorStop(1, "rgba(255, 238, 196, 0)");
  ctx.fillStyle = core;
  ctx.fillRect(x - 3, topY, 6, length * 0.82);
  ctx.restore();
}

// Additive warm halo used to bloom lights back on as power is restored.
function warmGlow(ctx, cx, cy, radius, intensity) {
  if (intensity <= 0.02) {
    return;
  }
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const gradient = ctx.createRadialGradient(cx, cy, radius * 0.12, cx, cy, radius);
  gradient.addColorStop(0, `rgba(255, 216, 135, ${0.5 * intensity})`);
  gradient.addColorStop(0.5, `rgba(255, 188, 96, ${0.2 * intensity})`);
  gradient.addColorStop(1, "rgba(255, 188, 96, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawWorld(ctx, scene, time, width, height, cameraX) {
  const powerLevel = scene.world.powerLevel;
  const waterWheel = scene.repairs?.find((repair) => repair.id === "water-wheel");
  const activeRepair = scene.repairTarget;

  ctx.save();
  ctx.translate(-cameraX, 0);
  scene.layers.trees.forEach((tree) => drawTree(ctx, tree, time));
  scene.layers.cottages.forEach((cottage) => drawCottage(ctx, cottage, time, powerLevel));
  drawGround(ctx, scene.world.width, height);
  drawPath(ctx, scene.world.width, time);
  if (waterWheel) {
    drawStream(ctx, time);
  }
  drawMist(ctx, scene.layers.mistBands, time, scene.world.width);
  drawSceneLandmarks(ctx, scene, time);
  drawOnwardGlow(ctx, scene, time);
  if (waterWheel) {
    drawWaterWheel(ctx, waterWheel, time, powerLevel);
  }
  if (activeRepair?.id === "root-pump") {
    drawRootPump(ctx, activeRepair, time, powerLevel);
  }
  if (activeRepair && activeRepair.showMarker !== false && !["water-wheel", "root-pump", "archive-lens-array"].includes(activeRepair.id)) {
    drawRepairMarker(ctx, activeRepair, time, powerLevel);
  }
  if (activeRepair) {
    drawCompletionPulse(ctx, activeRepair, scene.flow.celebrationTimer);
  }
  scene.layers.lamps.forEach((lamp) => drawLamp(ctx, lamp, time, powerLevel));
  scene.layers.brokenBranches.forEach((branch) => drawBrokenBranch(ctx, branch));
  // Temporarily hidden until the mushroom/glow-plant art is replaced.
  // The current sprite has internal white cutout fills that fight the night scene.
  scene.layers.repairParts.forEach((part) => drawRepairPart(ctx, part, time));
  scene.layers.foliage?.forEach((foliage) => drawFoliageSprite(ctx, foliage, time));
  ctx.restore();
}

// A wooden "this way out" signpost standing near the right edge of each scene.
function drawSignpost(ctx, scene, time, powerLevel) {
  if (scene.showSignpost === false) {
    return;
  }

  const signImage = sprites.world.signpost;
  if (!imageReady(signImage)) {
    return;
  }

  const x = scene.world.width - 168;
  const groundY = 632;
  const height = 188;
  const { width } = drawWorldSprite(ctx, signImage, x, groundY, height);
  // The hanging lantern sits on the right side, a little above center.
  const intensity = 0.45 + powerLevel * 0.4 + Math.sin(time * 3.2) * 0.05;
  warmGlow(ctx, x + width * 0.22, groundY - height * 0.46, 58, intensity);
}

function drawTree(ctx, tree, time) {
  // Pine/evergreen to match the conifer background; falls back to the leafy
  // sprite, then to the code-drawn tree, if an image hasn't loaded yet.
  const pineImage = sprites.world.pine;
  if (imageReady(pineImage)) {
    // Darken the pines so they settle into the rainy night instead of looking
    // lamp-lit / too bright against the dark scene.
    ctx.save();
    ctx.filter = "brightness(0.66) saturate(1.05)";
    drawWorldSprite(ctx, pineImage, tree.x, tree.y + 230 * tree.scale, 360 * tree.scale);
    ctx.restore();
    return;
  }
  const treeImage = sprites.world.tree;
  if (imageReady(treeImage)) {
    drawWorldSprite(ctx, treeImage, tree.x, tree.y + 230 * tree.scale, 360 * tree.scale);
    return;
  }

  ctx.save();
  ctx.translate(tree.x, tree.y);
  ctx.scale(tree.scale, tree.scale);
  ctx.fillStyle = colors.bark;
  ctx.beginPath();
  ctx.moveTo(-18, 230);
  ctx.bezierCurveTo(-8, 135, -4, 70, 6, 0);
  ctx.bezierCurveTo(24, 74, 28, 142, 20, 230);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#2d2724";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(4, 92);
  ctx.lineTo(-46, 48);
  ctx.moveTo(8, 116);
  ctx.lineTo(58, 68);
  ctx.stroke();

  drawLeafMass(ctx, -38, 16, 76, time);
  drawLeafMass(ctx, 38, 22, 70, time + 1);
  drawLeafMass(ctx, 0, -42, 82, time + 2);
  ctx.restore();
}

function drawLeafMass(ctx, x, y, radius, time) {
  ctx.fillStyle = colors.leafDark;
  ctx.beginPath();
  ctx.ellipse(x, y, radius, radius * 0.76, Math.sin(time) * 0.04, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.leaf;
  ctx.beginPath();
  ctx.ellipse(x + 14, y - 8, radius * 0.7, radius * 0.5, Math.cos(time) * 0.05, 0, Math.PI * 2);
  ctx.fill();
}

function drawCottage(ctx, cottage, time, powerLevel) {
  const lit = cottage.lit || powerLevel > 0.95;
  const glow = 0.5 + Math.sin(time * 4 + cottage.x) * 0.07;
  const restoringGlow = Math.max(0, powerLevel - 0.2) * 0.5;

  const cottageImage = sprites.world.cottage;
  if (imageReady(cottageImage)) {
    const groundY = cottage.y + 54 * cottage.scale;
    const height = 188 * cottage.scale;
    const { width } = drawWorldSprite(ctx, cottageImage, cottage.x, groundY, height);
    const windowGlow = (lit ? 0.55 : 0.14) + restoringGlow;
    warmGlow(ctx, cottage.x, groundY - height * 0.52, width * 0.46, Math.min(0.85, windowGlow * (0.92 + Math.sin(time * 3 + cottage.x) * 0.08)));
    return;
  }

  ctx.save();
  ctx.translate(cottage.x, cottage.y);
  ctx.scale(cottage.scale, cottage.scale);
  ctx.fillStyle = "#6c543b";
  roundedRect(ctx, -82, -58, 164, 112, 12);
  ctx.fill();
  ctx.fillStyle = "#46352b";
  ctx.beginPath();
  ctx.moveTo(-96, -58);
  ctx.lineTo(0, -124);
  ctx.lineTo(96, -58);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(40, 31, 25, 0.5)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-74, -58);
  ctx.lineTo(0, -108);
  ctx.lineTo(74, -58);
  ctx.stroke();
  ctx.fillStyle = lit ? `rgba(255, 216, 135, ${glow})` : `rgba(255, 216, 135, ${0.22 + restoringGlow})`;
  roundedRect(ctx, -48, -28, 34, 30, 5);
  ctx.fill();
  roundedRect(ctx, 18, -28, 34, 30, 5);
  ctx.fill();
  ctx.fillStyle = "#3f2e25";
  roundedRect(ctx, -13, 2, 30, 52, 5);
  ctx.fill();
  ctx.restore();
}

function drawGround(ctx, width, height) {
  // Dark base fill behind everything (also shows through if no grass texture).
  ctx.fillStyle = colors.groundDark;
  ctx.fillRect(0, 586, width, height - 586);

  // The grass band shape (kept whether filled with texture or flat colour).
  ctx.beginPath();
  ctx.moveTo(0, 580);
  ctx.bezierCurveTo(180, 552, 255, 602, 415, 578);
  ctx.bezierCurveTo(610, 548, 730, 612, 918, 572);
  ctx.bezierCurveTo(1078, 538, 1180, 580, 1280, 548);
  ctx.bezierCurveTo(1455, 520, 1620, 590, 1800, 555);
  ctx.bezierCurveTo(1970, 522, 2105, 565, width, 542);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();

  const pattern = texturePattern(ctx, sprites.world.grassTile, 320);
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fill();
    // The grass art is already dark/wet, so only a light foreground deepening.
    const shade = ctx.createLinearGradient(0, 560, 0, height);
    shade.addColorStop(0, "rgba(12, 20, 18, 0)");
    shade.addColorStop(1, "rgba(8, 14, 14, 0.26)");
    ctx.fillStyle = shade;
    ctx.fill();
  } else {
    ctx.fillStyle = colors.ground;
    ctx.fill();
  }
}

function drawPath(ctx, width, time) {
  // The path band shape (kept whether we fill it with texture or a gradient).
  ctx.beginPath();
  ctx.moveTo(0, 676);
  ctx.bezierCurveTo(220, 626, 380, 650, 565, 632);
  ctx.bezierCurveTo(745, 614, 885, 638, 1045, 604);
  ctx.bezierCurveTo(1155, 582, 1230, 578, 1280, 560);
  ctx.bezierCurveTo(1510, 534, 1710, 642, 1940, 598);
  ctx.bezierCurveTo(2060, 576, 2140, 586, width, 562);
  ctx.lineTo(width, 720);
  ctx.lineTo(0, 720);
  ctx.closePath();

  const pattern = texturePattern(ctx, sprites.world.pathTile, 256);
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fill();
    // The path art is already dark wet cobble, so only a light foreground
    // deepening for depth.
    const wet = ctx.createLinearGradient(0, 560, 0, 720);
    wet.addColorStop(0, "rgba(10, 16, 20, 0)");
    wet.addColorStop(1, "rgba(6, 10, 14, 0.3)");
    ctx.fillStyle = wet;
    ctx.fill();
  } else {
    const gradient = ctx.createLinearGradient(0, 560, 0, 720);
    gradient.addColorStop(0, colors.path);
    gradient.addColorStop(0.58, "#6c6654");
    gradient.addColorStop(1, "#3f4539");
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  ctx.strokeStyle = `rgba(236, 229, 190, ${0.14 + Math.sin(time * 2) * 0.03})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(130, 668);
  ctx.bezierCurveTo(340, 638, 505, 658, 716, 632);
  ctx.bezierCurveTo(970, 602, 1190, 620, 1440, 584);
  ctx.bezierCurveTo(1640, 558, 1840, 626, 2075, 584);
  ctx.stroke();

  drawWetStoneSegments(ctx, width, time);
}

function drawWetStoneSegments(ctx, width, time) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let x = 120; x < width; x += 165) {
    const y = 654 - Math.sin(x * 0.012) * 18;
    const shimmer = 0.07 + Math.sin(time * 2.2 + x) * 0.02;
    ctx.strokeStyle = `rgba(214, 232, 240, ${shimmer})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y, 58, 12, -0.1 + Math.sin(x) * 0.04, 0.1, Math.PI - 0.1);
    ctx.stroke();
  }
  ctx.restore();
}

// A soft millrace pool at the base of the water wheel, feathered into the wet
// stone so it reads as water collecting there — not a sliced sprite pasted on.
function drawStream(ctx, time) {
  const cx = 820; // just under the wheel hub (wheel sits at x800)
  const cy = 702;
  const R = 196;
  const squash = 0.34; // foreshorten so the pool lies flat on the ground

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, squash); // work in a circle of radius R, drawn as a flat ellipse

  ctx.beginPath();
  ctx.arc(0, 0, R, 0, Math.PI * 2);
  ctx.clip();

  // Dark night-water base (semi-transparent so the wet stone reads through it).
  const water = ctx.createRadialGradient(0, 0, R * 0.1, 0, 0, R);
  water.addColorStop(0, "rgba(20, 42, 50, 0.82)");
  water.addColorStop(0.65, "rgba(12, 28, 34, 0.7)");
  water.addColorStop(1, "rgba(8, 20, 26, 0.42)");
  ctx.fillStyle = water;
  ctx.fillRect(-R, -R, R * 2, R * 2);

  // Faint texture on top for ripple/reflection detail, kept low so the gold
  // glints read as soft reflections rather than a glowing puddle.
  const pattern = texturePattern(ctx, sprites.world.waterTile, 200);
  if (pattern) {
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = pattern;
    ctx.fillRect(-R, -R, R * 2, R * 2);
    ctx.globalAlpha = 1;
  }

  // Feather the whole rim so the pool melts into the wet stone.
  ctx.globalCompositeOperation = "destination-out";
  const fade = ctx.createRadialGradient(0, 0, R * 0.2, 0, 0, R);
  fade.addColorStop(0, "rgba(0, 0, 0, 0)");
  fade.addColorStop(1, "rgba(0, 0, 0, 1)");
  ctx.fillStyle = fade;
  ctx.fillRect(-R, -R, R * 2, R * 2);

  ctx.restore();
}

function drawMist(ctx, bands, time, width) {
  ctx.fillStyle = "rgba(222, 235, 221, 0.14)";
  bands.forEach((band, index) => {
    const drift = (band.x + time * band.speed) % (width + band.width) - band.width;
    ctx.beginPath();
    ctx.ellipse(drift, band.y + Math.sin(time + index) * 3, band.width, 22, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPuddle(ctx, puddle, time) {
  const puddleImage = sprites.world.puddle;
  if (imageReady(puddleImage)) {
    const width = puddle.width * 2.2;
    const height = width * (puddleImage.naturalHeight / puddleImage.naturalWidth);
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.drawImage(puddleImage, puddle.x - width / 2, puddle.y - height / 2, width, height);
    ctx.restore();
    return;
  }

  ctx.fillStyle = "rgba(127, 173, 173, 0.38)";
  ctx.beginPath();
  ctx.ellipse(puddle.x, puddle.y, puddle.width / 2, puddle.height / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(240, 236, 205, 0.22)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(puddle.x + Math.sin(time) * 4, puddle.y, puddle.width / 3, puddle.height / 3, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function drawSceneLandmarks(ctx, scene, time) {
  if (scene.bakeryGutter) {
    drawBakeryGutter(ctx, scene.bakeryGutter, time, scene.world.powerLevel);
  }
  if (scene.bellRopeCorner) {
    drawBellRopeCorner(ctx, scene.bellRopeCorner, time, scene.world.powerLevel);
  }
  if (scene.workshopLift) {
    drawWorkshopLift(ctx, scene.workshopLift, time, scene.world.powerLevel);
  }
  if (scene.schoolhouseLanterns) {
    drawSchoolhouseLanterns(ctx, scene.schoolhouseLanterns, time, scene.world.powerLevel);
  }
  if (scene.marketAwnings) {
    drawMarketAwnings(ctx, scene.marketAwnings, time, scene.world.powerLevel);
  }
  if (scene.oldFootbridge) {
    drawOldFootbridge(ctx, scene.oldFootbridge, time, scene.world.powerLevel);
  }
  if (scene.rainDrainCorner) {
    drawRainDrainCorner(ctx, scene.rainDrainCorner, time, scene.world.powerLevel);
  }
  if (scene.mayorPorch) {
    drawMayorPorch(ctx, scene.mayorPorch, time, scene.world.powerLevel);
  }
  if (scene.festivalSquare) {
    drawFestivalSquare(ctx, scene.festivalSquare, time, scene.world.powerLevel);
  }
  if (scene.lanternLilyPool) {
    drawLanternLilyPool(ctx, scene.lanternLilyPool, time, scene.world.powerLevel);
  }
  if (scene.bogBridge) {
    drawBogBridge(ctx, scene.bogBridge, time, scene.world.powerLevel);
  }
  if (scene.frogsongLock) {
    drawFrogsongLock(ctx, scene.frogsongLock, time, scene.world.powerLevel);
  }
  if (scene.sunkenSignpost) {
    drawSunkenSignpost(ctx, scene.sunkenSignpost, time, scene.world.powerLevel);
  }
  if (scene.mistPool) {
    drawMistPool(ctx, scene.mistPool, time, scene.world.powerLevel);
  }
  if (scene.mossGate) {
    drawMossGate(ctx, scene.mossGate, time, scene.world.powerLevel);
  }
  if (scene.oldFenShrine) {
    drawOldFenShrine(ctx, scene.oldFenShrine, time, scene.world.powerLevel);
  }
  if (scene.glowfenFerry) {
    drawGlowfenFerry(ctx, scene.glowfenFerry, time, scene.world.powerLevel);
  }
  if (scene.reedwatchBank) {
    drawReedwatchBank(ctx, scene.reedwatchBank, time, scene.world.powerLevel);
  }
  if (scene.cargoCartTurntable) {
    drawCargoCartTurntable(ctx, scene.cargoCartTurntable, time, scene.world.powerLevel);
  }
  if (scene.signalArmRow) {
    drawSignalArmRow(ctx, scene.signalArmRow, time, scene.world.powerLevel);
  }
  if (scene.conductorBooth) {
    drawConductorBooth(ctx, scene.conductorBooth, time, scene.world.powerLevel);
  }
  if (scene.craneHookYard) {
    drawCraneHookYard(ctx, scene.craneHookYard, time, scene.world.powerLevel);
  }
  if (scene.sparkingRelayShed) {
    drawSparkingRelayShed(ctx, scene.sparkingRelayShed, time, scene.world.powerLevel);
  }
  if (scene.rainSlickRails) {
    drawRainSlickRails(ctx, scene.rainSlickRails, time, scene.world.powerLevel);
  }
  if (scene.tunnelMouth) {
    drawTunnelMouth(ctx, scene.tunnelMouth, time, scene.world.powerLevel);
  }
  if (scene.clockSignal) {
    drawClockSignal(ctx, scene.clockSignal, time, scene.world.powerLevel);
  }
  if (scene.lastPlatform) {
    drawLastPlatform(ctx, scene.lastPlatform, time, scene.world.powerLevel);
  }
  if (scene.bridge) {
    drawFootbridge(ctx, scene.bridge, time);
  }
  if (scene.switchyard) {
    drawSwitchyard(ctx, scene.switchyard, time);
  }
  if (scene.ridge) {
    drawStormRidge(ctx, scene.ridge, time);
  }
  if (scene.beaconHill) {
    drawBeaconHill(ctx, scene.beaconHill, time);
  }
  if (scene.rainbarrelRow) {
    drawRainbarrelRow(ctx, scene.rainbarrelRow, time);
  }
  if (scene.observatory) {
    drawObservatory(ctx, scene.observatory, time, scene.world.powerLevel);
  }
}

function drawMossGate(ctx, gate, time, powerLevel) {
  const fixed = gate.fixed || powerLevel > 0.95;
  const x = gate.x;
  const groundY = gate.groundY;
  const opening = fixed ? 82 : 0;

  ctx.save();
  ctx.fillStyle = "rgba(17, 44, 36, 0.62)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 24, 410, 74, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawRootChannelLine(ctx, x - 310, groundY - 22, x - 84 - opening, groundY - 90, fixed, time);
  drawRootChannelLine(ctx, x + 310, groundY - 22, x + 84 + opening, groundY - 90, fixed, time + 1);
  drawMossGateHalf(ctx, x - 78 - opening, groundY, -1, fixed, time);
  drawMossGateHalf(ctx, x + 78 + opening, groundY, 1, fixed, time + 0.7);

  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.68)" : "rgba(143, 217, 240, 0.16)";
  ctx.beginPath();
  ctx.arc(x - 132 - opening, groundY - 148, 9, 0, Math.PI * 2);
  ctx.arc(x + 132 + opening, groundY - 148, 9, 0, Math.PI * 2);
  ctx.fill();

  if (fixed) {
    warmGlow(ctx, x, groundY - 120, 220, 0.34 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawOldFenShrine(ctx, shrine, time, powerLevel) {
  const fixed = shrine.fixed || shrine.bowlsAligned || powerLevel > 0.95;
  const x = shrine.x;
  const groundY = shrine.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(12, 35, 32, 0.58)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 20, 360, 66, -0.02, 0, Math.PI * 2);
  ctx.fill();

  const stones = [-180, -90, 0, 90, 180];
  stones.forEach((offset, index) => {
    drawShrineToneStone(ctx, x + offset, groundY - 42 + Math.sin(index * 1.2) * 8, fixed, time + index * 0.6);
  });

  drawShrineArch(ctx, x, groundY, fixed, time);
  drawRainBowl(ctx, x - 134, groundY - 188, fixed, -1, time);
  drawRainBowl(ctx, x, groundY - 212, fixed, 0, time + 0.35);
  drawRainBowl(ctx, x + 134, groundY - 188, fixed, 1, time + 0.7);

  if (fixed) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(216, 244, 157, 0.34)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - 168, groundY - 176);
    ctx.quadraticCurveTo(x - 70, groundY - 116, x - 34, groundY - 58);
    ctx.moveTo(x, groundY - 202);
    ctx.lineTo(x, groundY - 58);
    ctx.moveTo(x + 168, groundY - 176);
    ctx.quadraticCurveTo(x + 70, groundY - 116, x + 34, groundY - 58);
    ctx.stroke();
    ctx.restore();
    warmGlow(ctx, x, groundY - 126, 230, 0.27 + Math.sin(time * 3.2) * 0.04);
  }

  ctx.restore();
}

function drawGlowfenFerry(ctx, ferry, time, powerLevel) {
  const fixed = ferry.fixed || ferry.ferryDocked || powerLevel > 0.95;
  const x = ferry.x;
  const groundY = ferry.groundY;
  const boatOffset = fixed ? 0 : 152;

  ctx.save();
  const water = ctx.createRadialGradient(x, groundY - 22, 80, x, groundY - 22, 430);
  water.addColorStop(0, "rgba(25, 68, 70, 0.74)");
  water.addColorStop(0.72, "rgba(12, 42, 46, 0.58)");
  water.addColorStop(1, "rgba(7, 20, 22, 0.08)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 430, 90, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawFerryPost(ctx, x - 270, groundY, fixed, time);
  drawFerryPost(ctx, x + 270, groundY, fixed, time + 0.7);
  drawFerryRope(ctx, x - 270, groundY - 182, x + 270, groundY - 176, fixed, time);
  drawFerryDock(ctx, x - 282, groundY - 26, fixed);
  drawFerryDock(ctx, x + 282, groundY - 26, fixed);
  drawFerryBoat(ctx, x + boatOffset, groundY - 58, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, groundY - 98, 260, 0.28 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawReedwatchBank(ctx, bank, time, powerLevel) {
  const fixed = bank.fixed || bank.markersLit || powerLevel > 0.95;
  const x = bank.x;
  const groundY = bank.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(16, 43, 34, 0.62)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 20, 410, 72, -0.02, 0, Math.PI * 2);
  ctx.fill();

  const markerOffsets = [-250, -132, 0, 132, 250];
  markerOffsets.forEach((offset, index) => {
    drawReedwatchMarker(ctx, x + offset, groundY - 36 + Math.sin(index * 1.1) * 8, fixed, time + index * 0.5);
  });

  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.42)" : "rgba(85, 111, 83, 0.36)";
  ctx.lineWidth = fixed ? 5 : 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 285, groundY - 42);
  ctx.bezierCurveTo(x - 120, groundY - 94, x + 116, groundY - 94, x + 285, groundY - 42);
  ctx.stroke();

  if (fixed) {
    warmGlow(ctx, x, groundY - 112, 260, 0.26 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawCargoCartTurntable(ctx, turntable, time, powerLevel) {
  const fixed = turntable.fixed || turntable.cartMoved || powerLevel > 0.95;
  const x = turntable.x;
  const groundY = turntable.groundY;
  const cartShift = fixed ? 168 : 0;

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.66)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 20, 440, 72, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawSwitchyardRail(ctx, x - 390, groundY - 42, x + 390, groundY - 42, fixed);
  drawSwitchyardRail(ctx, x - 260, groundY - 116, x + 260, groundY + 24, fixed);

  ctx.fillStyle = fixed ? "#5f6858" : "#3e4f49";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 48, 142, 52, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.42)" : "rgba(143, 217, 240, 0.12)";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(x, groundY - 48, 116, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.translate(x, groundY - 48);
  ctx.rotate(fixed ? 0 : -0.42);
  ctx.strokeStyle = fixed ? "rgba(226, 242, 181, 0.5)" : "rgba(71, 88, 82, 0.72)";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(-116, 0);
  ctx.lineTo(116, 0);
  ctx.stroke();
  ctx.restore();

  drawCargoCart(ctx, x + cartShift, groundY - 118, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, groundY - 82, 230, 0.26 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawSignalArmRow(ctx, row, time, powerLevel) {
  const fixed = row.fixed || row.armsAligned || powerLevel > 0.95;
  const x = row.x;
  const groundY = row.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.66)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 20, 420, 70, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawSwitchyardRail(ctx, x - 390, groundY - 42, x + 390, groundY - 42, fixed);
  [-240, -80, 80, 240].forEach((offset, index) => {
    drawSemaphoreSignal(ctx, x + offset, groundY, fixed, time + index * 0.45, index);
  });

  if (fixed) {
    warmGlow(ctx, x, groundY - 150, 280, 0.24 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawConductorBooth(ctx, booth, time, powerLevel) {
  const fixed = booth.fixed || booth.boardLit || powerLevel > 0.95;
  const x = booth.x;
  const groundY = booth.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.66)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 20, 430, 70, -0.02, 0, Math.PI * 2);
  ctx.fill();
  drawSwitchyardRail(ctx, x - 390, groundY - 42, x + 390, groundY - 42, fixed);

  ctx.fillStyle = fixed ? "#596653" : "#354b45";
  roundedRect(ctx, x - 155, groundY - 242, 310, 210, 10);
  ctx.fill();
  ctx.fillStyle = fixed ? "#6f785f" : "#3e554e";
  ctx.beginPath();
  ctx.moveTo(x - 178, groundY - 242);
  ctx.lineTo(x, groundY - 310);
  ctx.lineTo(x + 178, groundY - 242);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.24)" : "rgba(143, 217, 240, 0.08)";
  roundedRect(ctx, x - 112, groundY - 210, 224, 74, 8);
  ctx.fill();
  drawBoothRouteBoard(ctx, x, groundY - 170, fixed, time);

  ctx.fillStyle = "rgba(25, 37, 35, 0.68)";
  roundedRect(ctx, x - 42, groundY - 116, 84, 84, 8);
  ctx.fill();

  if (fixed) {
    warmGlow(ctx, x, groundY - 170, 230, 0.25 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawCraneHookYard(ctx, yard, time, powerLevel) {
  const fixed = yard.fixed || yard.beamLifted || powerLevel > 0.95;
  const x = yard.x;
  const groundY = yard.groundY;
  const beamY = fixed ? groundY - 178 : groundY - 58;

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.66)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 20, 440, 72, -0.02, 0, Math.PI * 2);
  ctx.fill();
  drawSwitchyardRail(ctx, x - 390, groundY - 42, x + 390, groundY - 42, fixed);

  ctx.strokeStyle = fixed ? "#6d765f" : "#40534c";
  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 230, groundY - 28);
  ctx.lineTo(x - 230, groundY - 285);
  ctx.lineTo(x + 230, groundY - 285);
  ctx.lineTo(x + 230, groundY - 28);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.48)" : "rgba(84, 101, 91, 0.65)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, groundY - 285);
  ctx.lineTo(x, beamY - 28);
  ctx.stroke();

  drawCraneHook(ctx, x, beamY - 22, fixed, time);
  drawLiftedBeam(ctx, x, beamY, fixed);
  drawCraneControlBox(ctx, x + 270, groundY - 76, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, groundY - 176, 250, 0.26 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawCraneHook(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.5) * (fixed ? 2 : 1));
  ctx.strokeStyle = fixed ? "#d0a76d" : "#6f654f";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0.15, Math.PI * 1.45);
  ctx.stroke();
  ctx.restore();
}

function drawLiftedBeam(ctx, x, y, fixed) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(fixed ? -0.04 : -0.22);
  ctx.fillStyle = fixed ? "#727760" : "#4a554a";
  roundedRect(ctx, -160, -16, 320, 32, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(24, 35, 31, 0.55)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = -120; i <= 120; i += 60) {
    ctx.moveTo(i, -13);
    ctx.lineTo(i + 12, 13);
  }
  ctx.stroke();
  ctx.restore();
}

function drawCraneControlBox(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.fillStyle = fixed ? "#63705b" : "#3d5048";
  roundedRect(ctx, x - 42, y - 42, 84, 84, 10);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.58)" : "rgba(143, 217, 240, 0.12)";
  ctx.beginPath();
  ctx.arc(x - 16, y - 8, 9 + Math.sin(time * 4) * (fixed ? 1 : 0), 0, Math.PI * 2);
  ctx.arc(x + 16, y - 8, 9 + Math.sin(time * 4 + 1) * (fixed ? 1 : 0), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSparkingRelayShed(ctx, shed, time, powerLevel) {
  const fixed = shed.fixed || shed.sparksCalmed || powerLevel > 0.95;
  const x = shed.x;
  const groundY = shed.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.68)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 456, 76, -0.02, 0, Math.PI * 2);
  ctx.fill();
  drawSwitchyardRail(ctx, x - 390, groundY - 42, x + 390, groundY - 42, fixed);
  drawRelayPuddle(ctx, x, groundY - 14, fixed, time);

  if (imageReady(sprites.world.sparkingRelayShed)) {
    drawWorldSprite(ctx, sprites.world.sparkingRelayShed, x, groundY + 48, 636);
  } else {
    drawRelayShedShell(ctx, x, groundY, fixed);
  }

  drawRelayBoard(ctx, x, groundY - 164, fixed, time);
  drawWetPowerCable(ctx, x - 246, groundY - 96, x - 112, groundY - 132, fixed, time);
  drawWetPowerCable(ctx, x + 246, groundY - 96, x + 112, groundY - 132, fixed, time + 0.8);

  if (!fixed) {
    drawRelaySpark(ctx, x - 96, groundY - 184, time);
    drawRelaySpark(ctx, x + 86, groundY - 142, time + 1.4);
    drawRelaySpark(ctx, x + 22, groundY - 210, time + 2.1);
  } else {
    warmGlow(ctx, x, groundY - 162, 260, 0.28 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawRainSlickRails(ctx, rails, time, powerLevel) {
  const fixed = rails.fixed || rails.railsSanded || powerLevel > 0.95;
  const x = rails.x;
  const groundY = rails.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.68)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 470, 76, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawRailCrossingBackdrop(ctx, x, groundY, fixed, time);
  drawWetRailBed(ctx, x, groundY, fixed, time);
  if (!imageReady(sprites.world.rainSlickRails)) {
    drawCrossingPlanks(ctx, x, groundY, fixed, time);
  }
  drawSandValve(ctx, x - 238, groundY - 88, fixed, time, -1);
  drawSandValve(ctx, x + 238, groundY - 88, fixed, time + 0.7, 1);
  drawSandPipe(ctx, x - 238, groundY - 88, x - 86, groundY - 48, fixed, time);
  drawSandPipe(ctx, x + 238, groundY - 88, x + 86, groundY - 48, fixed, time + 0.8);
  drawRailPathCheck(ctx, x, groundY - 68, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, groundY - 76, 250, 0.24 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawTunnelMouth(ctx, tunnel, time, powerLevel) {
  const fixed = tunnel.fixed || tunnel.warningLampsSafe || powerLevel > 0.95;
  const x = tunnel.x;
  const groundY = tunnel.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(12, 28, 28, 0.72)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 16, 500, 80, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawTunnelForestWalls(ctx, x, groundY, fixed, time);
  drawTunnelPortal(ctx, x, groundY, fixed, time);
  drawTunnelTrack(ctx, x, groundY, fixed, time);
  drawTunnelLamp(ctx, x - 270, groundY - 166, fixed, time, 0);
  drawTunnelLamp(ctx, x - 118, groundY - 224, fixed, time, 1);
  drawTunnelLamp(ctx, x + 118, groundY - 224, fixed, time, 2);
  drawTunnelLamp(ctx, x + 270, groundY - 166, fixed, time, 3);
  drawTunnelThreshold(ctx, x, groundY, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, groundY - 190, 320, 0.24 + Math.sin(time * 3) * 0.035);
  }

  ctx.restore();
}

function drawTunnelForestWalls(ctx, x, groundY, fixed, time) {
  const trees = [
    { dx: -560, h: 300, lift: 74, sway: 0 },
    { dx: -470, h: 260, lift: 48, sway: 0.7 },
    { dx: -386, h: 222, lift: 28, sway: 1.4 },
    { dx: 560, h: 306, lift: 76, sway: 0.4 },
    { dx: 470, h: 264, lift: 50, sway: 1.1 },
    { dx: 386, h: 226, lift: 28, sway: 1.8 }
  ];

  trees.forEach((tree) => {
    drawRailEdgePine(ctx, x + tree.dx, groundY - tree.lift, tree.h, fixed, time + tree.sway);
  });
  drawRailEdgeBrush(ctx, x - 420, groundY - 30, 300, fixed, time);
  drawRailEdgeBrush(ctx, x + 420, groundY - 30, 300, fixed, time + 0.9);
}

function drawTunnelPortal(ctx, x, groundY, fixed, time) {
  ctx.save();
  const stone = fixed ? "#566257" : "#334a46";
  const stoneDark = fixed ? "#334239" : "#1d312f";

  ctx.fillStyle = "rgba(6, 14, 16, 0.76)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 120, 262, 260, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = stoneDark;
  ctx.beginPath();
  ctx.moveTo(x - 314, groundY - 18);
  ctx.bezierCurveTo(x - 310, groundY - 280, x - 164, groundY - 394, x, groundY - 398);
  ctx.bezierCurveTo(x + 164, groundY - 394, x + 310, groundY - 280, x + 314, groundY - 18);
  ctx.lineTo(x + 240, groundY - 18);
  ctx.bezierCurveTo(x + 222, groundY - 226, x + 120, groundY - 302, x, groundY - 306);
  ctx.bezierCurveTo(x - 120, groundY - 302, x - 222, groundY - 226, x - 240, groundY - 18);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = stone;
  ctx.lineWidth = 30;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 260, groundY - 28);
  ctx.bezierCurveTo(x - 240, groundY - 274, x - 128, groundY - 360, x, groundY - 362);
  ctx.bezierCurveTo(x + 128, groundY - 360, x + 240, groundY - 274, x + 260, groundY - 28);
  ctx.stroke();

  drawTunnelStoneBlocks(ctx, x, groundY, fixed, time);

  const innerGlow = ctx.createRadialGradient(x, groundY - 154, 50, x, groundY - 154, 230);
  innerGlow.addColorStop(0, fixed ? "rgba(194, 231, 156, 0.18)" : "rgba(94, 136, 140, 0.08)");
  innerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = innerGlow;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 142, 220, 218, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(215, 238, 170, 0.2)" : `rgba(172, 218, 222, ${0.09 + Math.sin(time * 2.2) * 0.02})`;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x - 236, groundY - 30);
  ctx.bezierCurveTo(x - 212, groundY - 236, x - 108, groundY - 324, x, groundY - 330);
  ctx.bezierCurveTo(x + 108, groundY - 324, x + 212, groundY - 236, x + 236, groundY - 30);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawTunnelStoneBlocks(ctx, x, groundY, fixed, time) {
  const blocks = [
    { dx: -214, dy: -72, w: 64, h: 34 },
    { dx: -250, dy: -145, w: 58, h: 32 },
    { dx: -214, dy: -228, w: 62, h: 30 },
    { dx: -132, dy: -306, w: 70, h: 32 },
    { dx: -36, dy: -350, w: 72, h: 30 },
    { dx: 86, dy: -318, w: 68, h: 32 },
    { dx: 180, dy: -242, w: 62, h: 30 },
    { dx: 238, dy: -158, w: 58, h: 32 },
    { dx: 210, dy: -76, w: 64, h: 34 }
  ];

  ctx.save();
  blocks.forEach((block, index) => {
    ctx.fillStyle = fixed ? "rgba(110, 124, 98, 0.5)" : "rgba(53, 73, 68, 0.62)";
    roundedRect(ctx, x + block.dx - block.w / 2, groundY + block.dy - block.h / 2, block.w, block.h, 8);
    ctx.fill();
    ctx.strokeStyle = fixed ? "rgba(214, 206, 153, 0.12)" : "rgba(169, 218, 220, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + block.dx - block.w * 0.3, groundY + block.dy - block.h * 0.12);
    ctx.lineTo(x + block.dx + block.w * 0.28, groundY + block.dy - block.h * 0.18 + Math.sin(time + index) * 0.8);
    ctx.stroke();
  });
  ctx.restore();
}

function drawTunnelTrack(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(144, 139, 100, 0.62)" : "rgba(62, 82, 78, 0.68)";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 170, groundY - 20);
  ctx.bezierCurveTo(x - 110, groundY - 98, x - 72, groundY - 156, x - 36, groundY - 228);
  ctx.moveTo(x + 170, groundY - 20);
  ctx.bezierCurveTo(x + 110, groundY - 98, x + 72, groundY - 156, x + 36, groundY - 228);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(86, 78, 52, 0.55)" : "rgba(21, 34, 32, 0.58)";
  ctx.lineWidth = 6;
  for (let i = 0; i < 6; i += 1) {
    const t = i / 5;
    const y = groundY - 32 - t * 160;
    const half = 150 - t * 105;
    ctx.beginPath();
    ctx.moveTo(x - half, y);
    ctx.lineTo(x + half, y);
    ctx.stroke();
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(218, 214, 153, 0.28)" : `rgba(172, 218, 222, ${0.12 + Math.sin(time * 2.6) * 0.03})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 158, groundY - 28);
  ctx.bezierCurveTo(x - 104, groundY - 100, x - 68, groundY - 156, x - 34, groundY - 226);
  ctx.moveTo(x + 158, groundY - 28);
  ctx.bezierCurveTo(x + 104, groundY - 100, x + 68, groundY - 156, x + 34, groundY - 226);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawTunnelLamp(ctx, x, y, fixed, time, index) {
  const unsettled = Math.sin(time * 3.4 + index * 1.3) > 0.12;
  const lit = fixed || unsettled;

  ctx.save();
  ctx.strokeStyle = fixed ? "#50614f" : "#273d38";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 62);
  ctx.lineTo(x, y - 10);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#617057" : "#344c46";
  roundedRect(ctx, x - 30, y - 24, 60, 34, 8);
  ctx.fill();

  ctx.fillStyle = fixed ? "rgba(184, 244, 150, 0.78)" : lit ? "rgba(255, 196, 100, 0.62)" : "rgba(143, 217, 240, 0.13)";
  ctx.beginPath();
  ctx.arc(x - 12, y - 7, 9, 0, Math.PI * 2);
  ctx.arc(x + 12, y - 7, 9, 0, Math.PI * 2);
  ctx.fill();

  if (lit) {
    warmGlow(ctx, x, y - 7, fixed ? 74 : 44, fixed ? 0.24 : 0.12);
  }
  ctx.restore();
}

function drawTunnelThreshold(ctx, x, groundY, fixed, time) {
  ctx.save();
  const gradient = ctx.createRadialGradient(x, groundY - 24, 70, x, groundY - 24, 340);
  gradient.addColorStop(0, fixed ? "rgba(56, 76, 56, 0.62)" : "rgba(19, 49, 51, 0.56)");
  gradient.addColorStop(0.7, "rgba(8, 20, 21, 0.26)");
  gradient.addColorStop(1, "rgba(8, 20, 21, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 340, 60, -0.02, 0, Math.PI * 2);
  ctx.fill();

  if (fixed) {
    ctx.strokeStyle = "rgba(184, 244, 150, 0.34)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x - 220, groundY - 48);
    ctx.bezierCurveTo(x - 90, groundY - 82, x + 90, groundY - 82, x + 220, groundY - 48);
    ctx.stroke();
  } else {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = `rgba(172, 218, 222, ${0.12 + Math.sin(time * 2.8) * 0.03})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(x, groundY - 18, 226, 20, 0.02, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

function drawClockSignal(ctx, clock, time, powerLevel) {
  const fixed = clock.fixed || clock.clockSynced || powerLevel > 0.95;
  const x = clock.x;
  const groundY = clock.groundY;
  const pulse = fixed ? 0.5 + Math.sin(time * 4) * 0.5 : Math.max(0, Math.sin(time * 3.1));

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.68)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 470, 76, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawClockSignalWoods(ctx, x, groundY, fixed, time);
  drawSwitchyardRail(ctx, x - 380, groundY - 42, x + 380, groundY - 42, fixed);
  drawClockSignalMast(ctx, x, groundY, fixed, time, pulse);
  drawClockPulseWire(ctx, x - 260, groundY - 164, x - 72, groundY - 216, fixed, pulse);
  drawClockPulseWire(ctx, x + 260, groundY - 164, x + 72, groundY - 216, fixed, pulse);
  drawClockSignalLamp(ctx, x - 310, groundY - 112, fixed, time, 0);
  drawClockSignalLamp(ctx, x + 310, groundY - 112, fixed, time, 1);
  drawClockPlatform(ctx, x, groundY, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, groundY - 230, 280, 0.26 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawClockSignalWoods(ctx, x, groundY, fixed, time) {
  [
    { dx: -540, h: 286, lift: 62, sway: 0.2 },
    { dx: -450, h: 236, lift: 34, sway: 0.9 },
    { dx: -356, h: 194, lift: 12, sway: 1.6 },
    { dx: 540, h: 292, lift: 64, sway: 0.5 },
    { dx: 450, h: 240, lift: 36, sway: 1.2 },
    { dx: 356, h: 198, lift: 12, sway: 1.9 }
  ].forEach((tree) => {
    drawRailEdgePine(ctx, x + tree.dx, groundY - tree.lift, tree.h, fixed, time + tree.sway);
  });
  drawRailEdgeBrush(ctx, x - 390, groundY - 30, 310, fixed, time);
  drawRailEdgeBrush(ctx, x + 390, groundY - 30, 310, fixed, time + 0.8);
}

function drawClockSignalMast(ctx, x, groundY, fixed, time, pulse) {
  ctx.save();
  ctx.fillStyle = fixed ? "#5f6b59" : "#344d46";
  roundedRect(ctx, x - 38, groundY - 326, 76, 288, 12);
  ctx.fill();

  ctx.fillStyle = fixed ? "#71785f" : "#40564e";
  roundedRect(ctx, x - 132, groundY - 404, 264, 122, 14);
  ctx.fill();
  ctx.fillStyle = "rgba(10, 20, 21, 0.66)";
  roundedRect(ctx, x - 106, groundY - 382, 212, 82, 12);
  ctx.fill();

  const faceGlow = fixed ? 0.38 + pulse * 0.2 : 0.1 + Math.max(0, Math.sin(time * 2.5)) * 0.12;
  ctx.fillStyle = fixed ? "rgba(226, 229, 172, 0.9)" : "rgba(143, 217, 240, 0.22)";
  ctx.beginPath();
  ctx.arc(x, groundY - 341, 36, 0, Math.PI * 2);
  ctx.fill();
  warmGlow(ctx, x, groundY - 341, 86, faceGlow);

  ctx.strokeStyle = fixed ? "#4f523f" : "#263b38";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, groundY - 341, 36, 0, Math.PI * 2);
  ctx.moveTo(x, groundY - 341);
  ctx.lineTo(x + Math.cos(time * (fixed ? 1.6 : 2.8)) * 22, groundY - 341 + Math.sin(time * (fixed ? 1.6 : 2.8)) * 22);
  ctx.moveTo(x, groundY - 341);
  ctx.lineTo(x + Math.cos(time * (fixed ? 0.45 : 1.25) - 1.2) * 16, groundY - 341 + Math.sin(time * (fixed ? 0.45 : 1.25) - 1.2) * 16);
  ctx.stroke();

  ctx.fillStyle = fixed ? "rgba(184, 244, 150, 0.72)" : "rgba(255, 196, 100, 0.3)";
  [-72, 72].forEach((offset, index) => {
    const active = fixed || Math.sin(time * 3.4 + index) > 0.1;
    ctx.fillStyle = active ? (fixed ? "rgba(184, 244, 150, 0.72)" : "rgba(255, 196, 100, 0.44)") : "rgba(143, 217, 240, 0.12)";
    ctx.beginPath();
    ctx.arc(x + offset, groundY - 338, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = fixed ? "#626d57" : "#334a44";
  roundedRect(ctx, x - 86, groundY - 92, 172, 54, 8);
  ctx.fill();
  ctx.restore();
}

function drawClockPulseWire(ctx, x1, y1, x2, y2, fixed, pulse) {
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.42)" : "rgba(92, 126, 123, 0.34)";
  ctx.lineWidth = fixed ? 5 : 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 46, x2, y2);
  ctx.stroke();

  if (fixed) {
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = `rgba(216, 244, 157, ${0.14 + pulse * 0.22})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 46, x2, y2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawClockSignalLamp(ctx, x, y, fixed, time, index) {
  const lit = fixed || Math.sin(time * 3.2 + index * 1.7) > 0.2;
  ctx.save();
  ctx.strokeStyle = fixed ? "#50614f" : "#273d38";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 70);
  ctx.lineTo(x, y - 76);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#617057" : "#344c46";
  roundedRect(ctx, x - 34, y - 84, 68, 38, 8);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(184, 244, 150, 0.78)" : lit ? "rgba(255, 196, 100, 0.58)" : "rgba(143, 217, 240, 0.13)";
  ctx.beginPath();
  ctx.arc(x - 14, y - 64, 10, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 64, 10, 0, Math.PI * 2);
  ctx.fill();
  if (lit) {
    warmGlow(ctx, x, y - 64, fixed ? 74 : 46, fixed ? 0.24 : 0.12);
  }
  ctx.restore();
}

function drawClockPlatform(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.fillStyle = fixed ? "rgba(72, 82, 58, 0.72)" : "rgba(34, 54, 49, 0.76)";
  roundedRect(ctx, x - 235, groundY - 64, 470, 42, 12);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(226, 218, 159, 0.18)" : `rgba(172, 218, 222, ${0.11 + Math.sin(time * 2.6) * 0.02})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 210, groundY - 58);
  ctx.bezierCurveTo(x - 80, groundY - 76, x + 80, groundY - 76, x + 210, groundY - 58);
  ctx.stroke();
  ctx.restore();
}

function drawLastPlatform(ctx, platform, time, powerLevel) {
  const fixed = platform.fixed || platform.platformLit || powerLevel > 0.95;
  const x = platform.x;
  const groundY = platform.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(18, 35, 34, 0.68)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 480, 76, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawLastPlatformWoods(ctx, x, groundY, fixed, time);
  drawSwitchyardRail(ctx, x - 390, groundY - 44, x + 186, groundY - 44, fixed);
  drawLastPlatformShelter(ctx, x - 70, groundY, fixed, time);
  drawEndOfLineStop(ctx, x + 260, groundY - 44, fixed);
  drawHillRoadMarker(ctx, x + 345, groundY - 112, fixed, time);
  drawLastPlatformLamp(ctx, x + 105, groundY - 194, fixed, time);
  drawHillRoadGlow(ctx, x + 420, groundY - 80, fixed, time);

  if (fixed) {
    warmGlow(ctx, x + 105, groundY - 220, 260, 0.28 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawLastPlatformWoods(ctx, x, groundY, fixed, time) {
  [
    { dx: -548, h: 288, lift: 64, sway: 0.1 },
    { dx: -452, h: 238, lift: 36, sway: 0.8 },
    { dx: -354, h: 196, lift: 14, sway: 1.5 },
    { dx: 570, h: 302, lift: 70, sway: 0.4 },
    { dx: 478, h: 248, lift: 42, sway: 1.1 },
    { dx: 384, h: 204, lift: 18, sway: 1.8 }
  ].forEach((tree) => {
    drawRailEdgePine(ctx, x + tree.dx, groundY - tree.lift, tree.h, fixed, time + tree.sway);
  });
  drawRailEdgeBrush(ctx, x - 390, groundY - 30, 310, fixed, time);
  drawRailEdgeBrush(ctx, x + 410, groundY - 30, 330, fixed, time + 0.8);
}

function drawLastPlatformShelter(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.fillStyle = fixed ? "#5f6b59" : "#344d46";
  roundedRect(ctx, x - 210, groundY - 172, 420, 116, 12);
  ctx.fill();

  ctx.fillStyle = fixed ? "#72785f" : "#40564e";
  ctx.beginPath();
  ctx.moveTo(x - 238, groundY - 172);
  ctx.lineTo(x - 160, groundY - 238);
  ctx.lineTo(x + 178, groundY - 238);
  ctx.lineTo(x + 238, groundY - 172);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(16, 28, 28, 0.7)";
  roundedRect(ctx, x - 172, groundY - 142, 118, 58, 8);
  roundedRect(ctx, x + 42, groundY - 142, 118, 58, 8);
  ctx.fill();

  ctx.fillStyle = fixed ? "rgba(226, 229, 172, 0.42)" : "rgba(143, 217, 240, 0.1)";
  roundedRect(ctx, x - 44, groundY - 128, 78, 72, 8);
  ctx.fill();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(226, 218, 159, 0.18)" : `rgba(172, 218, 222, ${0.1 + Math.sin(time * 2.6) * 0.02})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 222, groundY - 170);
  ctx.lineTo(x + 218, groundY - 172);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = fixed ? "rgba(72, 82, 58, 0.74)" : "rgba(34, 54, 49, 0.78)";
  roundedRect(ctx, x - 260, groundY - 64, 520, 42, 12);
  ctx.fill();
  ctx.restore();
}

function drawEndOfLineStop(ctx, x, y, fixed) {
  ctx.save();
  ctx.strokeStyle = fixed ? "#6a674f" : "#394f49";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 34, y - 42);
  ctx.lineTo(x + 34, y + 42);
  ctx.moveTo(x + 34, y - 42);
  ctx.lineTo(x - 34, y + 42);
  ctx.stroke();
  ctx.fillStyle = fixed ? "rgba(216, 194, 126, 0.26)" : "rgba(143, 217, 240, 0.1)";
  ctx.beginPath();
  ctx.ellipse(x, y + 54, 76, 16, 0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHillRoadMarker(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "#586654" : "#2d443f";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 88);
  ctx.lineTo(x, y - 60);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#6f765d" : "#3a514a";
  roundedRect(ctx, x - 46, y - 70, 92, 46, 8);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(184, 244, 150, 0.72)" : "rgba(143, 217, 240, 0.12)";
  ctx.beginPath();
  ctx.arc(x, y - 48, 15, 0, Math.PI * 2);
  ctx.fill();
  if (fixed) {
    warmGlow(ctx, x, y - 48, 82, 0.24 + Math.sin(time * 3) * 0.04);
  }
  ctx.restore();
}

function drawLastPlatformLamp(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "#5b674f" : "#2f463f";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 138);
  ctx.lineTo(x, y - 22);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#67725a" : "#374f48";
  roundedRect(ctx, x - 38, y - 36, 76, 44, 10);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(184, 244, 150, 0.78)" : "rgba(143, 217, 240, 0.14)";
  ctx.beginPath();
  ctx.arc(x - 14, y - 14, 11, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 14, 11, 0, Math.PI * 2);
  ctx.fill();
  if (fixed) {
    warmGlow(ctx, x, y - 14, 98, 0.32 + Math.sin(time * 3) * 0.04);
  }
  ctx.restore();
}

function drawHillRoadGlow(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(184, 244, 150, 0.34)" : `rgba(172, 218, 222, ${0.1 + Math.sin(time * 2.6) * 0.02})`;
  ctx.lineWidth = fixed ? 6 : 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 190, groundY + 28);
  ctx.bezierCurveTo(x - 70, groundY - 20, x + 58, groundY - 80, x + 190, groundY - 134);
  ctx.stroke();
  if (fixed) {
    ctx.fillStyle = "rgba(184, 244, 150, 0.16)";
    ctx.beginPath();
    ctx.ellipse(x + 110, groundY - 92, 150, 22, -0.32, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawRailCrossingBackdrop(ctx, x, groundY, fixed, time) {
  ctx.save();
  drawWoodedRailEdges(ctx, x, groundY, fixed, time);
  drawLowRailFence(ctx, x - 380, groundY - 126, 260, -0.08, fixed);
  drawLowRailFence(ctx, x + 136, groundY - 122, 286, 0.08, fixed);
  drawCrossingWarningLamp(ctx, x - 390, groundY - 78, fixed, time);
  drawCrossingWarningLamp(ctx, x + 384, groundY - 82, fixed, time + 0.7);
  drawMosslineUtilitySilhouette(ctx, x - 508, groundY - 104, fixed, time);
  drawMosslineUtilitySilhouette(ctx, x + 512, groundY - 112, fixed, time + 0.6);
  ctx.restore();
}

function drawWoodedRailEdges(ctx, x, groundY, fixed, time) {
  const leftTrees = [
    { dx: -650, h: 292, lift: 56, sway: 0.2 },
    { dx: -580, h: 250, lift: 36, sway: 0 },
    { dx: -506, h: 220, lift: 22, sway: 0.8 },
    { dx: -430, h: 198, lift: 12, sway: 1.2 },
    { dx: -342, h: 172, lift: 2, sway: 1.8 },
    { dx: -254, h: 138, lift: -8, sway: 2.4 }
  ];
  const rightTrees = [
    { dx: 660, h: 300, lift: 58, sway: 0.5 },
    { dx: 584, h: 258, lift: 40, sway: 0.4 },
    { dx: 504, h: 230, lift: 24, sway: 1.1 },
    { dx: 420, h: 202, lift: 12, sway: 1.7 },
    { dx: 334, h: 176, lift: 2, sway: 2.2 },
    { dx: 246, h: 142, lift: -8, sway: 2.8 }
  ];

  ctx.save();
  [...leftTrees, ...rightTrees].forEach((tree) => {
    drawRailEdgePine(ctx, x + tree.dx, groundY - tree.lift, tree.h, fixed, time + tree.sway);
  });
  drawRailEdgeBrush(ctx, x - 390, groundY - 28, 310, fixed, time);
  drawRailEdgeBrush(ctx, x + 390, groundY - 28, 330, fixed, time + 0.9);
  ctx.restore();
}

function drawRailEdgePine(ctx, x, groundY, height, fixed, time) {
  const pineImage = sprites.world.pine;
  if (imageReady(pineImage)) {
    ctx.save();
    ctx.globalAlpha = 0.74;
    ctx.filter = fixed ? "brightness(0.6) saturate(0.85)" : "brightness(0.52) saturate(0.78)";
    drawWorldSprite(ctx, pineImage, x + Math.sin(time * 0.7) * 1.5, groundY, height);
    ctx.filter = "none";
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.translate(x, groundY);
  ctx.fillStyle = "rgba(23, 45, 39, 0.82)";
  ctx.beginPath();
  ctx.moveTo(0, -height);
  ctx.lineTo(-height * 0.22, -height * 0.2);
  ctx.lineTo(height * 0.22, -height * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawRailEdgeBrush(ctx, x, y, width, fixed, time) {
  ctx.save();
  for (let i = 0; i < 9; i += 1) {
    const px = x - width / 2 + i * (width / 8);
    const py = y + Math.sin(time + i) * 4;
    ctx.fillStyle = fixed ? "rgba(54, 82, 54, 0.76)" : "rgba(26, 63, 52, 0.8)";
    ctx.beginPath();
    ctx.ellipse(px, py, 42 + (i % 3) * 8, 18 + (i % 2) * 5, -0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(10, 26, 25, 0.28)";
    ctx.beginPath();
    ctx.ellipse(px + 8, py + 10, 38, 10, 0.04, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawLowRailFence(ctx, x, y, width, tilt, fixed) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  ctx.strokeStyle = fixed ? "rgba(111, 122, 94, 0.62)" : "rgba(49, 68, 62, 0.7)";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, -12);
  ctx.moveTo(8, 26);
  ctx.lineTo(width - 8, 14);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(177, 161, 106, 0.26)" : "rgba(143, 217, 240, 0.12)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(18, -2);
  ctx.lineTo(width - 16, -13);
  ctx.stroke();

  for (let post = 20; post < width; post += 70) {
    ctx.fillStyle = fixed ? "#57634f" : "#2f463f";
    roundedRect(ctx, post - 7, -18, 14, 62, 5);
    ctx.fill();
  }
  ctx.restore();
}

function drawCrossingWarningLamp(ctx, x, y, fixed, time) {
  const lit = fixed || Math.sin(time * 3.6) > 0.2;
  ctx.save();
  ctx.strokeStyle = "#263831";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 50);
  ctx.lineTo(x, y - 70);
  ctx.stroke();

  ctx.fillStyle = "#384f45";
  roundedRect(ctx, x - 34, y - 78, 68, 36, 8);
  ctx.fill();
  ctx.fillStyle = lit ? "rgba(255, 209, 118, 0.76)" : "rgba(143, 217, 240, 0.18)";
  ctx.beginPath();
  ctx.arc(x - 14, y - 60, 10, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 60, 10, 0, Math.PI * 2);
  ctx.fill();
  if (lit) {
    warmGlow(ctx, x, y - 60, 60, fixed ? 0.2 : 0.12);
  }
  ctx.restore();
}

function drawMosslineUtilitySilhouette(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.strokeStyle = "rgba(25, 38, 34, 0.72)";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 88);
  ctx.lineTo(x, y - 84);
  ctx.moveTo(x - 52, y - 38);
  ctx.lineTo(x + 52, y - 52);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(216, 194, 126, 0.22)" : "rgba(120, 156, 158, 0.18)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 52, y - 38);
  ctx.quadraticCurveTo(x, y - 18 + Math.sin(time) * 2, x + 52, y - 52);
  ctx.stroke();
  ctx.restore();
}

function drawCrossingPlanks(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.translate(x - 12, groundY - 42);
  ctx.rotate(-0.06);
  const plankColor = fixed ? "#6a6048" : "#3f5048";
  for (let i = -2; i <= 2; i += 1) {
    const y = i * 19;
    ctx.fillStyle = plankColor;
    roundedRect(ctx, -142, y - 8, 284, 14, 4);
    ctx.fill();
    ctx.strokeStyle = "rgba(20, 31, 29, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-126, y - 2);
    ctx.lineTo(126, y - 7 + Math.sin(time + i) * 0.8);
    ctx.stroke();
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(238, 215, 151, 0.22)" : "rgba(189, 238, 230, 0.16)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-128, -32);
  ctx.quadraticCurveTo(-8, -50, 118, -28);
  ctx.stroke();
  ctx.restore();

  if (fixed) {
    ctx.fillStyle = "rgba(216, 194, 126, 0.32)";
    ctx.beginPath();
    ctx.ellipse(0, 46, 154, 16, 0.02, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawWetRailBed(ctx, x, groundY, fixed, time) {
  if (imageReady(sprites.world.rainSlickPuddle)) {
    drawPaintedRailCrossing(ctx, x, groundY, fixed, time);
    return;
  }

  ctx.save();
  const water = ctx.createRadialGradient(x, groundY - 22, 80, x, groundY - 22, 440);
  water.addColorStop(0, fixed ? "rgba(52, 72, 60, 0.52)" : "rgba(35, 83, 91, 0.68)");
  water.addColorStop(0.72, fixed ? "rgba(26, 45, 38, 0.5)" : "rgba(13, 47, 54, 0.58)");
  water.addColorStop(1, "rgba(7, 20, 22, 0.08)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 430, 78, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawCurvedTrack(ctx, x - 360, groundY - 42, x + 360, groundY - 42, fixed, time);

  ctx.strokeStyle = fixed ? "rgba(216, 194, 126, 0.5)" : "rgba(143, 217, 240, 0.2)";
  ctx.lineWidth = fixed ? 10 : 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 312, groundY - 28);
  ctx.bezierCurveTo(x - 138, groundY - 80, x + 138, groundY - 78, x + 312, groundY - 28);
  ctx.stroke();

  if (!fixed) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = `rgba(189, 238, 230, ${0.24 + Math.sin(time * 2.8) * 0.05})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(x - 70 + Math.sin(time) * 4, groundY - 18, 226, 24, 0.02, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

function drawPaintedRailCrossing(ctx, x, groundY, fixed, time) {
  ctx.save();

  const shadow = ctx.createRadialGradient(x, groundY - 18, 80, x, groundY - 18, 520);
  shadow.addColorStop(0, "rgba(8, 18, 18, 0.54)");
  shadow.addColorStop(0.72, "rgba(8, 18, 18, 0.28)");
  shadow.addColorStop(1, "rgba(8, 18, 18, 0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 12, 500, 72, -0.02, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = fixed ? 0.24 : 0.34;
  drawWorldSprite(ctx, sprites.world.rainSlickPuddle, x - 6, groundY + 32, 160);
  ctx.globalAlpha = 1;

  drawPaintedTrackLine(ctx, x, groundY - 46, fixed, time, -1);
  drawPaintedTrackLine(ctx, x, groundY - 12, fixed, time + 0.4, 1);
  drawPaintedCrossingBoards(ctx, x, groundY, fixed, time);
  drawRailSpriteGrounding(ctx, x, groundY, fixed, time);

  if (!fixed) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = `rgba(189, 238, 230, ${0.22 + Math.sin(time * 2.8) * 0.05})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(x - 42 + Math.sin(time) * 4, groundY - 18, 230, 24, 0.02, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else {
    ctx.strokeStyle = "rgba(216, 194, 126, 0.48)";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x - 238, groundY - 36);
    ctx.bezierCurveTo(x - 112, groundY - 72, x + 112, groundY - 72, x + 238, groundY - 36);
    ctx.stroke();
  }

  ctx.restore();
}

function drawRailSpriteGrounding(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";

  const mud = ctx.createLinearGradient(0, groundY - 72, 0, groundY + 36);
  mud.addColorStop(0, "rgba(16, 34, 32, 0)");
  mud.addColorStop(0.52, "rgba(16, 34, 32, 0.36)");
  mud.addColorStop(1, "rgba(9, 20, 20, 0.64)");
  ctx.fillStyle = mud;
  ctx.beginPath();
  ctx.ellipse(x - 20, groundY - 2, 430, 58, -0.02, 0, Math.PI * 2);
  ctx.fill();

  const mossColor = fixed ? "rgba(62, 82, 54, 0.78)" : "rgba(34, 64, 54, 0.78)";
  ctx.fillStyle = mossColor;
  for (let i = 0; i < 9; i += 1) {
    const offset = -360 + i * 90;
    const y = groundY - 38 + Math.sin(time * 0.7 + i) * 2;
    ctx.beginPath();
    ctx.ellipse(x + offset, y + (i % 2) * 16, 58 - (i % 3) * 8, 14 + (i % 2) * 3, -0.08, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(238, 215, 151, 0.16)" : "rgba(189, 238, 230, 0.12)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 370, groundY - 64);
  ctx.bezierCurveTo(x - 180, groundY - 36, x + 152, groundY - 86, x + 360, groundY - 52);
  ctx.stroke();
  ctx.restore();

  if (fixed) {
    ctx.fillStyle = "rgba(216, 194, 126, 0.22)";
    ctx.beginPath();
    ctx.ellipse(x, groundY - 24, 260, 15, 0.02, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPaintedTrackLine(ctx, x, y, fixed, time, side) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(21, 31, 31, 0.72)";
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.moveTo(x - 420, y + side * 4);
  ctx.bezierCurveTo(x - 230, y - 16, x + 230, y - 16, x + 420, y + side * 3);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(131, 133, 106, 0.58)" : "rgba(70, 87, 84, 0.58)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x - 410, y + side * 3);
  ctx.bezierCurveTo(x - 220, y - 12, x + 220, y - 12, x + 410, y + side * 2);
  ctx.stroke();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(210, 194, 139, 0.18)" : `rgba(172, 218, 222, ${0.14 + Math.sin(time * 2.4) * 0.03})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 392, y - 3);
  ctx.bezierCurveTo(x - 180, y - 17, x + 184, y - 17, x + 392, y - 2);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawPaintedCrossingBoards(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.translate(x - 8, groundY - 34);
  ctx.rotate(-0.015);

  const boards = [-118, -78, -38, 2, 42, 82, 122];
  boards.forEach((offset, index) => {
    const width = 34 + (index % 2) * 5;
    const height = 128 - Math.abs(index - 3) * 5;
    ctx.fillStyle = fixed ? "rgba(88, 83, 62, 0.74)" : "rgba(48, 62, 56, 0.78)";
    roundedRect(ctx, offset - width / 2, -height / 2, width, height, 5);
    ctx.fill();
    ctx.strokeStyle = "rgba(13, 24, 23, 0.38)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(offset - width * 0.25, -height * 0.38);
    ctx.lineTo(offset - width * 0.1, height * 0.38 + Math.sin(time + index) * 1);
    ctx.stroke();
  });

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(230, 204, 141, 0.18)" : "rgba(175, 220, 222, 0.12)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-130, -52);
  ctx.quadraticCurveTo(0, -68, 130, -48);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawCurvedTrack(ctx, startX, startY, endX, endY, fixed, time) {
  ctx.save();
  const railColor = fixed ? "rgba(165, 151, 107, 0.78)" : "rgba(88, 104, 98, 0.72)";
  const shineColor = fixed ? "rgba(238, 215, 151, 0.32)" : `rgba(189, 238, 230, ${0.3 + Math.sin(time * 3) * 0.05})`;

  ctx.strokeStyle = railColor;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(startX, startY - 9);
  ctx.bezierCurveTo(startX + 190, startY - 56, endX - 190, endY - 56, endX, endY - 9);
  ctx.moveTo(startX, startY + 15);
  ctx.bezierCurveTo(startX + 190, startY - 30, endX - 190, endY - 30, endX, endY + 15);
  ctx.stroke();

  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = shineColor;
  ctx.lineWidth = fixed ? 2 : 3;
  ctx.beginPath();
  ctx.moveTo(startX + 28, startY - 13);
  ctx.bezierCurveTo(startX + 210, startY - 48, endX - 210, endY - 48, endX - 28, endY - 13);
  ctx.stroke();

  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = fixed ? "rgba(77, 65, 44, 0.5)" : "rgba(22, 35, 32, 0.62)";
  ctx.lineWidth = 5;
  for (let i = 0; i < 9; i += 1) {
    const t = i / 8;
    const px = startX + (endX - startX) * t;
    const py = startY + 8 - Math.sin(t * Math.PI) * 42;
    ctx.beginPath();
    ctx.moveTo(px - 18, py - 18);
    ctx.lineTo(px + 18, py + 18);
    ctx.stroke();
  }

  ctx.restore();
}

function drawSandValve(ctx, x, y, fixed, time, side) {
  if (imageReady(sprites.world.rainSlickSandValve)) {
    ctx.save();
    const bob = Math.sin(time * 1.2) * (fixed ? 0.5 : 1);
    ctx.globalAlpha = fixed ? 0.96 : 0.82;
    drawWorldSprite(ctx, sprites.world.rainSlickSandValve, x, y + 112 + bob, 156);
    if (fixed) {
      ctx.fillStyle = "rgba(216, 194, 126, 0.42)";
      ctx.beginPath();
      ctx.ellipse(x + side * 18, y + 94, 48, 11, side * -0.08, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.translate(x, y);

  ctx.strokeStyle = fixed ? "#7b8467" : "#42564d";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 46);
  ctx.lineTo(0, -34);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#68735d" : "#354b44";
  roundedRect(ctx, -34, 30, 68, 28, 9);
  ctx.fill();
  ctx.fillStyle = fixed ? "#758066" : "#40564d";
  ctx.beginPath();
  ctx.moveTo(-28, 28);
  ctx.lineTo(0, -6);
  ctx.lineTo(28, 28);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = fixed ? "rgba(226, 198, 121, 0.82)" : "rgba(110, 126, 108, 0.8)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, -48, 31, 0, Math.PI * 2);
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI * 2 * i) / 6 + (fixed ? 0.18 : Math.sin(time * 0.8) * 0.04);
    ctx.moveTo(Math.cos(angle) * 9, -48 + Math.sin(angle) * 9);
    ctx.lineTo(Math.cos(angle) * 28, -48 + Math.sin(angle) * 28);
  }
  ctx.stroke();

  ctx.fillStyle = fixed ? "rgba(225, 199, 122, 0.56)" : "rgba(143, 217, 240, 0.12)";
  ctx.beginPath();
  ctx.arc(0, -48, 9 + Math.sin(time * 4) * (fixed ? 1 : 0), 0, Math.PI * 2);
  ctx.fill();

  if (fixed) {
    ctx.fillStyle = "rgba(216, 194, 126, 0.5)";
    ctx.beginPath();
    ctx.ellipse(side * 32, 38, 52, 13, side * -0.08, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawSandPipe(ctx, fromX, fromY, toX, toY, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(185, 154, 91, 0.64)" : "rgba(84, 101, 91, 0.62)";
  ctx.lineWidth = fixed ? 7 : 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(fromX, fromY + 36);
  ctx.quadraticCurveTo((fromX + toX) / 2, fromY + 68 + Math.sin(time * 2) * 2, toX, toY);
  ctx.stroke();
  ctx.restore();
}

function drawRailPathCheck(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.58)" : "rgba(143, 217, 240, 0.12)";
  ctx.beginPath();
  ctx.arc(x, y, 13 + Math.sin(time * 4) * (fixed ? 1.2 : 0), 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.5)" : "rgba(70, 91, 84, 0.48)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 212, y + 18);
  ctx.bezierCurveTo(x - 96, y - 22, x + 96, y - 22, x + 212, y + 18);
  ctx.stroke();
  ctx.restore();
}

function drawRelayShedShell(ctx, x, groundY, fixed) {
  ctx.save();
  ctx.fillStyle = fixed ? "#53644f" : "#344b45";
  roundedRect(ctx, x - 170, groundY - 248, 340, 216, 10);
  ctx.fill();
  ctx.fillStyle = fixed ? "#65735b" : "#3e554e";
  ctx.beginPath();
  ctx.moveTo(x - 194, groundY - 248);
  ctx.lineTo(x, groundY - 318);
  ctx.lineTo(x + 194, groundY - 248);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(25, 38, 35, 0.76)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x - 132, groundY - 240);
  ctx.lineTo(x - 132, groundY - 42);
  ctx.moveTo(x + 132, groundY - 240);
  ctx.lineTo(x + 132, groundY - 42);
  ctx.stroke();
  ctx.restore();
}

function drawRelayPuddle(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.fillStyle = fixed ? "rgba(69, 112, 111, 0.22)" : "rgba(53, 111, 124, 0.48)";
  ctx.beginPath();
  ctx.ellipse(x - 70, y, fixed ? 170 : 230, fixed ? 22 : 34, 0.02, 0, Math.PI * 2);
  ctx.ellipse(x + 154, y + 4, fixed ? 92 : 126, fixed ? 15 : 22, -0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(189, 238, 230, 0.22)" : "rgba(143, 217, 240, 0.42)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(x - 72 + Math.sin(time) * 4, y - 2, fixed ? 126 : 186, fixed ? 13 : 23, 0.02, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawRelayBoard(ctx, x, y, fixed, time) {
  const nodes = [
    { x: -82, y: -38 },
    { x: -22, y: -8 },
    { x: 46, y: -36 },
    { x: 92, y: 20 },
    { x: -78, y: 38 },
    { x: 18, y: 42 }
  ];

  ctx.save();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.22)" : "rgba(143, 217, 240, 0.08)";
  roundedRect(ctx, x - 122, y - 72, 244, 132, 8);
  ctx.fill();

  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.62)" : "rgba(72, 93, 86, 0.66)";
  ctx.lineWidth = fixed ? 5 : 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x + nodes[0].x, y + nodes[0].y);
  ctx.lineTo(x + nodes[1].x, y + nodes[1].y);
  ctx.lineTo(x + nodes[2].x, y + nodes[2].y);
  ctx.moveTo(x + nodes[1].x, y + nodes[1].y);
  ctx.lineTo(x + nodes[5].x, y + nodes[5].y);
  ctx.lineTo(x + nodes[3].x, y + nodes[3].y);
  ctx.moveTo(x + nodes[4].x, y + nodes[4].y);
  ctx.lineTo(x + nodes[5].x, y + nodes[5].y);
  ctx.stroke();

  nodes.forEach((node, index) => {
    ctx.fillStyle = fixed ? "rgba(255, 223, 156, 0.72)" : "rgba(143, 217, 240, 0.14)";
    ctx.beginPath();
    ctx.arc(x + node.x, y + node.y, 9 + Math.sin(time * 4 + index) * (fixed ? 1 : 0), 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawWetPowerCable(ctx, fromX, fromY, toX, toY, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.52)" : "rgba(92, 107, 96, 0.68)";
  ctx.lineWidth = fixed ? 5 : 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.quadraticCurveTo((fromX + toX) / 2, fromY + (fixed ? 4 : 32 + Math.sin(time * 2) * 3), toX, toY);
  ctx.stroke();
  ctx.restore();
}

function drawRelaySpark(ctx, x, y, time) {
  const jitter = Math.sin(time * 15) * 6;

  ctx.save();
  ctx.strokeStyle = "rgba(255, 223, 156, 0.86)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 16 + jitter, y - 18);
  ctx.lineTo(x + 4, y - 5);
  ctx.lineTo(x + 24 - jitter, y + 8);
  ctx.stroke();
  warmGlow(ctx, x + 8, y - 4, 64, 0.22 + Math.sin(time * 12) * 0.06);
  ctx.restore();
}

function drawBoothRouteBoard(ctx, x, y, fixed, time) {
  const nodes = [
    { x: -78, y: -18 },
    { x: -24, y: 12 },
    { x: 34, y: -14 },
    { x: 84, y: 18 }
  ];
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.62)" : "rgba(70, 91, 84, 0.58)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x + nodes[0].x, y + nodes[0].y);
  nodes.slice(1).forEach((node) => ctx.lineTo(x + node.x, y + node.y));
  ctx.stroke();
  nodes.forEach((node, index) => {
    ctx.fillStyle = fixed ? "rgba(255, 223, 156, 0.72)" : "rgba(143, 217, 240, 0.14)";
    ctx.beginPath();
    ctx.arc(x + node.x, y + node.y, 9 + Math.sin(time * 4 + index) * (fixed ? 1 : 0), 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawSemaphoreSignal(ctx, x, groundY, fixed, time, index) {
  ctx.save();
  ctx.translate(x, groundY);
  ctx.fillStyle = fixed ? "#69735d" : "#40534c";
  roundedRect(ctx, -13, -230, 26, 216, 8);
  ctx.fill();

  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.54)" : "rgba(143, 217, 240, 0.13)";
  ctx.beginPath();
  ctx.arc(0, -190, 15, 0, Math.PI * 2);
  ctx.arc(0, -134, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(0, -176);
  ctx.rotate(fixed ? (index % 2 === 0 ? -0.36 : 0.36) : -0.95 + index * 0.3 + Math.sin(time) * 0.04);
  ctx.fillStyle = fixed ? "#b9c676" : "#6d765f";
  roundedRect(ctx, 0, -8, 112, 16, 8);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(0, -122);
  ctx.rotate(fixed ? (index % 2 === 0 ? 0.36 : -0.36) : 0.82 - index * 0.18 + Math.sin(time + 1) * 0.04);
  ctx.fillStyle = fixed ? "#d0a76d" : "#716450";
  roundedRect(ctx, 0, -7, 88, 14, 7);
  ctx.fill();
  ctx.restore();

  if (fixed) {
    warmGlow(ctx, 0, -190, 62, 0.18 + Math.sin(time * 4) * 0.03);
  }
  ctx.restore();
}

function drawSwitchyardRail(ctx, startX, startY, endX, endY, fixed) {
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(150, 159, 134, 0.72)" : "rgba(78, 91, 84, 0.68)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(startX, startY - 7);
  ctx.lineTo(endX, endY - 7);
  ctx.moveTo(startX, startY + 7);
  ctx.lineTo(endX, endY + 7);
  ctx.stroke();
  ctx.restore();
}

function drawCargoCart(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.1) * (fixed ? 1 : 2));
  ctx.fillStyle = fixed ? "#68715d" : "#44534b";
  roundedRect(ctx, -76, -42, 152, 74, 10);
  ctx.fill();
  ctx.fillStyle = "rgba(25, 38, 34, 0.7)";
  ctx.beginPath();
  ctx.arc(-46, 38, 14, 0, Math.PI * 2);
  ctx.arc(46, 38, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.28)" : "rgba(143, 217, 240, 0.08)";
  roundedRect(ctx, -46, -70, 92, 25, 6);
  ctx.fill();
  ctx.restore();
}

function drawReedwatchMarker(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = fixed ? "#7b8465" : "#45594c";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 34);
  ctx.quadraticCurveTo(Math.sin(time) * 8, -38, Math.sin(time * 0.8) * 12, -104);
  ctx.stroke();

  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.65)" : "rgba(143, 217, 240, 0.14)";
  ctx.beginPath();
  ctx.ellipse(Math.sin(time * 0.8) * 12, -112, 18, 28, 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = fixed ? "rgba(255, 223, 156, 0.45)" : "rgba(37, 54, 49, 0.58)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(Math.sin(time * 0.8) * 12, -112, 25 + Math.sin(time * 4) * (fixed ? 2 : 0), 0, Math.PI * 2);
  ctx.stroke();
  if (fixed) {
    warmGlow(ctx, Math.sin(time * 0.8) * 12, -112, 70, 0.18 + Math.sin(time * 4) * 0.03);
  }
  ctx.restore();
}

function drawFerryPost(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.fillStyle = fixed ? "#69725d" : "#3e514b";
  roundedRect(ctx, x - 16, groundY - 218, 32, 204, 10);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.55)" : "rgba(143, 217, 240, 0.14)";
  ctx.beginPath();
  ctx.arc(x, groundY - 176, 16 + Math.sin(time * 3) * (fixed ? 1.5 : 0), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFerryRope(ctx, startX, startY, endX, endY, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "rgba(226, 242, 181, 0.58)" : "rgba(86, 103, 92, 0.58)";
  ctx.lineWidth = fixed ? 5 : 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  const sag = fixed ? 12 : 46 + Math.sin(time * 1.4) * 5;
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo((startX + endX) / 2, (startY + endY) / 2 + sag, endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawFerryDock(ctx, x, y, fixed) {
  ctx.save();
  ctx.fillStyle = fixed ? "#5f654f" : "#3f4d46";
  roundedRect(ctx, x - 78, y - 18, 156, 28, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(22, 35, 31, 0.62)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = -58; i <= 58; i += 32) {
    ctx.moveTo(x + i, y - 16);
    ctx.lineTo(x + i + 6, y + 8);
  }
  ctx.stroke();
  ctx.restore();
}

function drawFerryBoat(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.3) * 3);
  ctx.fillStyle = fixed ? "#66705d" : "#3f554f";
  ctx.beginPath();
  ctx.moveTo(-112, -16);
  ctx.lineTo(112, -16);
  ctx.lineTo(74, 28);
  ctx.lineTo(-74, 28);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.34)" : "rgba(143, 217, 240, 0.08)";
  roundedRect(ctx, -52, -58, 104, 34, 8);
  ctx.fill();
  if (fixed) {
    warmGlow(ctx, 0, -36, 88, 0.24 + Math.sin(time * 4) * 0.04);
  }
  ctx.restore();
}

function drawShrineArch(ctx, x, groundY, fixed, time) {
  ctx.save();
  ctx.strokeStyle = fixed ? "#6f7960" : "#4c5a52";
  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 205, groundY - 40);
  ctx.quadraticCurveTo(x, groundY - 302, x + 205, groundY - 40);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.36)" : "rgba(143, 217, 240, 0.13)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 175, groundY - 72);
  ctx.quadraticCurveTo(x, groundY - 252 + Math.sin(time) * 3, x + 175, groundY - 72);
  ctx.stroke();
  ctx.restore();
}

function drawRainBowl(ctx, x, y, fixed, side, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(fixed ? side * 0.02 : side * 0.22);
  ctx.fillStyle = fixed ? "#73806a" : "#46564f";
  ctx.beginPath();
  ctx.ellipse(0, 0, 56, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(189, 238, 230, 0.46)" : "rgba(103, 156, 164, 0.2)";
  ctx.beginPath();
  ctx.ellipse(0, -4, 45, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(226, 242, 181, 0.45)" : "rgba(37, 54, 52, 0.65)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-38, 8);
  ctx.quadraticCurveTo(0, 28 + Math.sin(time * 2) * 2, 38, 8);
  ctx.stroke();
  ctx.restore();
}

function drawShrineToneStone(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = fixed ? "#737863" : "#40534d";
  ctx.beginPath();
  ctx.ellipse(0, 0, 42, 24, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(255, 223, 156, 0.62)" : "rgba(143, 217, 240, 0.12)";
  ctx.lineWidth = fixed ? 4 : 3;
  ctx.beginPath();
  ctx.arc(0, -4, 18 + Math.sin(time * 4) * (fixed ? 2 : 0), 0.12, Math.PI - 0.12);
  ctx.stroke();
  if (fixed) {
    warmGlow(ctx, 0, -7, 58, 0.2 + Math.sin(time * 4) * 0.04);
  }
  ctx.restore();
}

function drawRootChannelLine(ctx, fromX, fromY, toX, toY, fixed, time) {
  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.56)" : "rgba(74, 103, 74, 0.48)";
  ctx.lineWidth = fixed ? 6 : 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.quadraticCurveTo((fromX + toX) / 2, fromY - 54 + Math.sin(time * 2) * 4, toX, toY);
  ctx.stroke();
}

function drawMossGateHalf(ctx, x, groundY, side, fixed, time) {
  ctx.save();
  ctx.translate(x, groundY);
  ctx.rotate(side * (fixed ? 0.16 : 0.02));
  ctx.fillStyle = fixed ? "#4d6a4a" : "#36513f";
  roundedRect(ctx, side < 0 ? -112 : 0, -230, 112, 230, 22);
  ctx.fill();
  ctx.strokeStyle = "#26382e";
  ctx.lineWidth = 7;
  ctx.beginPath();
  for (let y = -200; y <= -44; y += 44) {
    ctx.moveTo(side < 0 ? -100 : 12, y);
    ctx.lineTo(side < 0 ? -12 : 100, y + Math.sin(time + y) * 3);
  }
  ctx.stroke();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.28)" : "rgba(143, 217, 240, 0.08)";
  ctx.beginPath();
  ctx.arc(side < 0 ? -44 : 44, -126, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMistPool(ctx, pool, time, powerLevel) {
  const fixed = pool.fixed || powerLevel > 0.95;
  const x = pool.x;
  const groundY = pool.groundY;

  ctx.save();
  const water = ctx.createRadialGradient(x, groundY - 18, 80, x, groundY - 18, 390);
  water.addColorStop(0, "rgba(28, 70, 70, 0.72)");
  water.addColorStop(0.74, "rgba(12, 42, 44, 0.58)");
  water.addColorStop(1, "rgba(7, 20, 22, 0.08)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 14, 390, 86, -0.02, 0, Math.PI * 2);
  ctx.fill();

  const vents = [-210, -108, 0, 112, 215];
  vents.forEach((offset, index) => {
    drawWarmVentStone(ctx, x + offset, groundY - 42 + Math.sin(index * 1.3) * 10, fixed, time + index);
  });

  drawMistVeil(ctx, x, groundY - 100, fixed, time);

  if (fixed) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(189, 238, 230, 0.28)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - 285, groundY - 54);
    ctx.quadraticCurveTo(x, groundY - 96, x + 285, groundY - 54);
    ctx.stroke();
    ctx.restore();
    warmGlow(ctx, x, groundY - 64, 220, 0.28 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawWarmVentStone(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = fixed ? "#6b735c" : "#3d5048";
  ctx.beginPath();
  ctx.ellipse(0, 0, 48, 26, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.62)" : "rgba(143, 217, 240, 0.16)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-24, -3);
  ctx.quadraticCurveTo(0, -13, 24, -3);
  ctx.stroke();
  if (fixed) {
    warmGlow(ctx, 0, -8, 54, 0.22 + Math.sin(time * 4) * 0.04);
  }
  ctx.restore();
}

function drawMistVeil(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.fillStyle = fixed ? "rgba(222, 235, 221, 0.08)" : "rgba(222, 235, 221, 0.24)";
  const bands = fixed ? 3 : 7;
  for (let i = 0; i < bands; i += 1) {
    const drift = Math.sin(time * 0.7 + i) * 18;
    ctx.beginPath();
    ctx.ellipse(x - 260 + i * 86 + drift, y + Math.sin(time + i) * 8, fixed ? 74 : 126, fixed ? 16 : 28, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawSunkenSignpost(ctx, marker, time, powerLevel) {
  const fixed = marker.fixed || powerLevel > 0.95;
  const x = marker.x;
  const groundY = marker.groundY;
  const raisedY = fixed ? groundY - 188 : groundY - 82;

  ctx.save();
  const water = ctx.createRadialGradient(x, groundY - 18, 80, x, groundY - 18, 380);
  water.addColorStop(0, "rgba(26, 69, 58, 0.7)");
  water.addColorStop(0.74, "rgba(12, 42, 38, 0.58)");
  water.addColorStop(1, "rgba(7, 20, 18, 0.08)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 14, 380, 82, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawGlowReedMarker(ctx, x - 150, groundY - 48, fixed, time);
  drawGlowReedMarker(ctx, x + 156, groundY - 50, fixed, time + 1.1);

  ctx.strokeStyle = "#4b382c";
  ctx.lineWidth = 16;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, groundY + 18);
  ctx.lineTo(x, raisedY);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#7a5a3e" : "#4f3a2d";
  roundedRect(ctx, x - 92, raisedY - 50, 184, 72, 12);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.58)" : "rgba(126, 190, 191, 0.2)";
  ctx.lineWidth = 4;
  ctx.strokeRect(x - 76, raisedY - 34, 152, 40);

  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.72)" : "rgba(143, 217, 240, 0.18)";
  ctx.beginPath();
  ctx.arc(x - 48, raisedY - 14, 8, 0, Math.PI * 2);
  ctx.arc(x, raisedY - 14, 8, 0, Math.PI * 2);
  ctx.arc(x + 48, raisedY - 14, 8, 0, Math.PI * 2);
  ctx.fill();

  if (!fixed) {
    ctx.fillStyle = "rgba(10, 34, 42, 0.55)";
    ctx.beginPath();
    ctx.ellipse(x, groundY - 42, 132, 28, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    warmGlow(ctx, x, raisedY - 12, 118, 0.34 + Math.sin(time * 4) * 0.04);
  }

  ctx.restore();
}

function drawGlowReedMarker(ctx, x, y, fixed, time) {
  ctx.strokeStyle = "#314536";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i += 1) {
    const lean = (i - 2) * 8;
    ctx.beginPath();
    ctx.moveTo(x + lean, y + 72);
    ctx.quadraticCurveTo(x + lean + Math.sin(time + i) * 8, y + 12, x + lean * 0.5, y - 44);
    ctx.stroke();
  }
  if (fixed) {
    warmGlow(ctx, x, y - 20, 58, 0.22 + Math.sin(time * 4) * 0.04);
  }
}

function drawFrogsongLock(ctx, lock, time, powerLevel) {
  const fixed = lock.fixed || powerLevel > 0.95;
  const x = lock.x;
  const groundY = lock.groundY;

  ctx.save();
  const water = ctx.createRadialGradient(x, groundY - 18, 80, x, groundY - 18, 380);
  water.addColorStop(0, "rgba(26, 69, 58, 0.72)");
  water.addColorStop(0.74, "rgba(12, 42, 38, 0.58)");
  water.addColorStop(1, "rgba(7, 20, 18, 0.08)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 14, 380, 82, -0.02, 0, Math.PI * 2);
  ctx.fill();

  drawReedGate(ctx, x, groundY, fixed, time);

  const stoneOffsets = [-180, -88, 0, 88, 180];
  stoneOffsets.forEach((offset, index) => {
    drawCallStone(ctx, x + offset, groundY - 48 + Math.sin(index) * 8, fixed, time + index);
  });

  if (fixed) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(216, 244, 157, 0.3)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i += 1) {
      const radius = 90 + i * 44 + Math.sin(time * 2 + i) * 4;
      ctx.beginPath();
      ctx.arc(x, groundY - 64, radius, Math.PI * 1.04, Math.PI * 1.96);
      ctx.stroke();
    }
    ctx.restore();
    warmGlow(ctx, x, groundY - 92, 220, 0.3 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawReedGate(ctx, x, groundY, fixed, time) {
  const opening = fixed ? 54 : 0;
  ctx.strokeStyle = "#314536";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  [-1, 1].forEach((side) => {
    const baseX = x + side * (62 + opening);
    ctx.beginPath();
    ctx.moveTo(baseX, groundY - 10);
    ctx.quadraticCurveTo(baseX + side * 12, groundY - 118, baseX + side * 8, groundY - 210);
    ctx.stroke();
    ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.42)" : "#314536";
  });

  ctx.strokeStyle = fixed ? "rgba(216, 244, 157, 0.5)" : "rgba(49, 69, 54, 0.9)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x - 132 - opening, groundY - 116);
  ctx.quadraticCurveTo(x, groundY - 160 + Math.sin(time) * 3, x + 132 + opening, groundY - 116);
  ctx.stroke();
}

function drawCallStone(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = fixed ? "#617457" : "#3d5047";
  ctx.beginPath();
  ctx.ellipse(0, 0, 38, 24, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(216, 244, 157, ${fixed ? 0.64 + Math.sin(time * 4) * 0.08 : 0.16})`;
  ctx.beginPath();
  ctx.arc(0, -6, 8, 0, Math.PI * 2);
  ctx.fill();
  if (fixed) {
    warmGlow(ctx, 0, -6, 42, 0.22 + Math.sin(time * 4) * 0.04);
  }
  ctx.restore();
}

function drawBogBridge(ctx, bridge, time, powerLevel) {
  const fixed = bridge.fixed || powerLevel > 0.95;
  const x = bridge.x;
  const groundY = bridge.groundY;
  const offsets = [-270, -170, -72, 36, 142, 248];

  ctx.save();
  const bog = ctx.createRadialGradient(x, groundY - 20, 90, x, groundY - 20, 430);
  bog.addColorStop(0, "rgba(26, 69, 58, 0.76)");
  bog.addColorStop(0.74, "rgba(12, 42, 38, 0.62)");
  bog.addColorStop(1, "rgba(7, 20, 18, 0.08)");
  ctx.fillStyle = bog;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 430, 90, -0.02, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(189, 238, 230, 0.13)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 7; i += 1) {
    const rippleX = x - 340 + ((time * 34 + i * 104) % 680);
    ctx.beginPath();
    ctx.ellipse(rippleX, groundY - 30 + Math.sin(time + i) * 11, 52, 8, 0.02, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  offsets.forEach((offset, index) => {
    const raised = fixed ? 1 : index % 2 ? 0.45 : 0.1;
    const stoneY = groundY - 30 - raised * 42 + Math.sin(index * 1.2) * 12;
    drawBogStone(ctx, x + offset, stoneY, fixed, time + index);
  });

  if (fixed) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(216, 244, 157, 0.38)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    offsets.forEach((offset, index) => {
      const px = x + offset;
      const py = groundY - 72 + Math.sin(index * 1.2) * 12;
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.restore();
    warmGlow(ctx, x, groundY - 72, 230, 0.3 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawBogStone(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 1.1) * 0.03);
  ctx.fillStyle = fixed ? "#6a7255" : "#3f5348";
  ctx.beginPath();
  ctx.ellipse(0, 0, 58, 28, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(216, 244, 157, 0.28)" : "rgba(143, 217, 240, 0.1)";
  ctx.beginPath();
  ctx.ellipse(10, -8, 28, 9, -0.1, 0, Math.PI * 2);
  ctx.fill();
  if (fixed) {
    warmGlow(ctx, 0, -4, 54, 0.18 + Math.sin(time * 4) * 0.03);
  }
  ctx.restore();
}

function drawLanternLilyPool(ctx, pool, time, powerLevel) {
  const fixed = pool.fixed || powerLevel > 0.95;
  const x = pool.x;
  const groundY = pool.groundY;

  ctx.save();
  const water = ctx.createRadialGradient(x, groundY - 28, 80, x, groundY - 28, 430);
  water.addColorStop(0, "rgba(25, 68, 72, 0.78)");
  water.addColorStop(0.72, "rgba(10, 34, 42, 0.62)");
  water.addColorStop(1, "rgba(7, 20, 28, 0.1)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 22, 430, 88, -0.02, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(189, 238, 230, 0.16)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 8; i += 1) {
    const rippleX = x - 340 + ((time * 42 + i * 96) % 680);
    ctx.beginPath();
    ctx.ellipse(rippleX, groundY - 36 + Math.sin(time + i) * 10, 58, 9, 0.02, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  const lilyOffsets = [-250, -150, -52, 55, 160, 260];
  lilyOffsets.forEach((offset, index) => {
    const y = groundY - 34 + Math.sin(index * 1.7) * 18;
    drawLanternLily(ctx, x + offset, y, fixed, time + index);
  });

  if (fixed) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(216, 244, 157, 0.42)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    lilyOffsets.forEach((offset, index) => {
      const px = x + offset;
      const py = groundY - 34 + Math.sin(index * 1.7) * 18;
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.restore();
    warmGlow(ctx, x, groundY - 44, 240, 0.32 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawLanternLily(ctx, x, y, fixed, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 1.4) * 0.04);
  ctx.fillStyle = fixed ? "#587a55" : "#334f45";
  ctx.beginPath();
  ctx.ellipse(0, 0, 44, 24, -0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fixed ? `rgba(216, 244, 157, ${0.7 + Math.sin(time * 4) * 0.08})` : "rgba(143, 217, 240, 0.18)";
  ctx.beginPath();
  ctx.arc(8, -8, 10, 0, Math.PI * 2);
  ctx.fill();
  if (fixed) {
    warmGlow(ctx, 8, -8, 46, 0.3 + Math.sin(time * 4) * 0.04);
  }
  ctx.restore();
}

function drawFestivalSquare(ctx, square, time, powerLevel) {
  const fixed = square.fixed || powerLevel > 0.95;
  const x = square.x;
  const groundY = square.groundY;

  ctx.save();
  ctx.fillStyle = "rgba(54, 42, 34, 0.9)";
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 360, 86, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(219, 196, 138, 0.22)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 18, 300, 58, 0, 0, Math.PI * 2);
  ctx.stroke();

  drawFestivalStall(ctx, x - 330, groundY, "#704f5a", fixed, time);
  drawFestivalStall(ctx, x + 330, groundY, "#4f6570", fixed, time + 1);

  ctx.strokeStyle = "#493529";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, groundY - 22);
  ctx.lineTo(x, groundY - 302);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.68)" : "rgba(99, 73, 52, 0.65)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x - 260, groundY - 210);
  ctx.quadraticCurveTo(x, groundY - 270, x + 260, groundY - 210);
  ctx.stroke();

  for (let i = -4; i <= 4; i += 1) {
    const lanternX = x + i * 64;
    const lanternY = groundY - 232 - Math.cos(i * 0.8) * 20;
    drawTinyFestivalLantern(ctx, lanternX, lanternY, fixed, time + i);
  }

  drawStarLantern(ctx, x, groundY - 326, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, groundY - 320, 190, 0.5 + Math.sin(time * 3) * 0.06);
    warmGlow(ctx, x, groundY - 82, 260, 0.28);
  }

  ctx.restore();
}

function drawFestivalStall(ctx, x, groundY, color, fixed, time) {
  ctx.fillStyle = "#5d4433";
  roundedRect(ctx, x - 92, groundY - 132, 184, 132, 12);
  ctx.fill();
  ctx.fillStyle = color;
  roundedRect(ctx, x - 110, groundY - 178, 220, 54, 12);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 216, 135, ${fixed ? 0.5 : 0.2})`;
  roundedRect(ctx, x - 46, groundY - 86, 92, 34, 6);
  ctx.fill();
  if (fixed) {
    warmGlow(ctx, x, groundY - 100, 80, 0.18 + Math.sin(time * 4) * 0.03);
  }
}

function drawTinyFestivalLantern(ctx, x, y, fixed, time) {
  ctx.fillStyle = "#3a2b25";
  roundedRect(ctx, x - 9, y - 12, 18, 24, 5);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 216, 135, ${fixed ? 0.72 + Math.sin(time * 4) * 0.06 : 0.22})`;
  roundedRect(ctx, x - 5, y - 8, 10, 16, 3);
  ctx.fill();
}

function drawStarLantern(ctx, x, y, fixed, time) {
  const outer = fixed ? 56 + Math.sin(time * 3) * 3 : 48;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 0.8) * 0.04);
  ctx.fillStyle = fixed ? "rgba(255, 221, 152, 0.95)" : "rgba(142, 111, 72, 0.82)";
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outer : outer * 0.44;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#3a2b25";
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMayorPorch(ctx, porch, time, powerLevel) {
  const fixed = porch.fixed || powerLevel > 0.95;
  const x = porch.x;
  const groundY = porch.groundY;
  const width = 460;

  ctx.save();
  ctx.fillStyle = "#6b4c39";
  roundedRect(ctx, x - width / 2, groundY - 230, width, 230, 16);
  ctx.fill();

  ctx.fillStyle = "#3d2d28";
  ctx.beginPath();
  ctx.moveTo(x - width / 2 - 34, groundY - 230);
  ctx.lineTo(x, groundY - 330);
  ctx.lineTo(x + width / 2 + 34, groundY - 230);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#513a2f";
  roundedRect(ctx, x - 196, groundY - 54, 392, 54, 10);
  ctx.fill();
  ctx.strokeStyle = "#3a2b25";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  [-150, 150].forEach((postX) => {
    ctx.beginPath();
    ctx.moveTo(x + postX, groundY - 54);
    ctx.lineTo(x + postX, groundY - 210);
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.moveTo(x - 184, groundY - 210);
  ctx.lineTo(x + 184, groundY - 210);
  ctx.stroke();

  ctx.fillStyle = `rgba(255, 216, 135, ${fixed ? 0.62 : 0.24})`;
  roundedRect(ctx, x - 150, groundY - 168, 62, 50, 7);
  ctx.fill();
  roundedRect(ctx, x + 88, groundY - 168, 62, 50, 7);
  ctx.fill();
  ctx.fillStyle = "#3b2c25";
  roundedRect(ctx, x - 42, groundY - 116, 84, 116, 9);
  ctx.fill();

  drawPorchChime(ctx, x, groundY - 218, fixed, time);

  ctx.fillStyle = "rgba(219, 196, 138, 0.76)";
  roundedRect(ctx, x - 94, groundY - 262, 188, 30, 7);
  ctx.fill();
  ctx.fillStyle = "#3a2b25";
  ctx.font = "700 15px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MAYOR", x, groundY - 241);

  if (fixed) {
    warmGlow(ctx, x, groundY - 198, 126, 0.34 + Math.sin(time * 4) * 0.04);
    warmGlow(ctx, x, groundY - 95, 180, 0.26);
  }

  ctx.restore();
}

function drawPorchChime(ctx, x, y, fixed, time) {
  ctx.strokeStyle = "#493529";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, y - 28);
  ctx.lineTo(x, y + 6);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#c99a55" : "#8d744e";
  ctx.beginPath();
  ctx.moveTo(x - 34, y + 6);
  ctx.quadraticCurveTo(x - 22, y - 34, x, y - 36);
  ctx.quadraticCurveTo(x + 22, y - 34, x + 34, y + 6);
  ctx.quadraticCurveTo(x + 12, y + 22, x - 34, y + 6);
  ctx.fill();

  ctx.fillStyle = "#5a3827";
  ctx.beginPath();
  ctx.arc(x, y + 10, 7, 0, Math.PI * 2);
  ctx.fill();

  if (!fixed) {
    ctx.strokeStyle = "rgba(126, 190, 191, 0.32)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 24, y + 10);
    ctx.quadraticCurveTo(x + 48, y + 34, x + 18, y + 54);
    ctx.stroke();
    return;
  }

  ctx.strokeStyle = `rgba(255, 221, 152, ${0.22 + Math.sin(time * 5) * 0.04})`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i += 1) {
    const radius = 54 + i * 22 + Math.sin(time * 3 + i) * 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, -0.72, 0.72);
    ctx.stroke();
  }
}

function drawRainDrainCorner(ctx, drain, time, powerLevel) {
  const fixed = drain.fixed || powerLevel > 0.95;
  const x = drain.x;
  const groundY = drain.groundY;
  const waterScale = fixed ? 0.48 : 1;

  ctx.save();
  ctx.fillStyle = "#4f3a2d";
  roundedRect(ctx, x - 260, groundY - 170, 520, 170, 18);
  ctx.fill();

  ctx.fillStyle = "#3e312a";
  ctx.beginPath();
  ctx.moveTo(x - 300, groundY - 170);
  ctx.lineTo(x - 210, groundY - 248);
  ctx.lineTo(x + 280, groundY - 178);
  ctx.lineTo(x + 260, groundY - 170);
  ctx.closePath();
  ctx.fill();

  drawDrainPool(ctx, x, groundY - 8, 360 * waterScale, fixed, time);
  drawRunoffChannel(ctx, x - 250, groundY - 64, x - 72, groundY - 18, fixed, time);
  drawRunoffChannel(ctx, x + 250, groundY - 72, x + 70, groundY - 18, fixed, time + 1);

  ctx.fillStyle = "#2f2925";
  roundedRect(ctx, x - 82, groundY - 54, 164, 72, 12);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(189, 238, 230, 0.74)" : "rgba(126, 190, 191, 0.3)";
  ctx.lineWidth = 5;
  for (let gx = -56; gx <= 56; gx += 28) {
    ctx.beginPath();
    ctx.moveTo(x + gx, groundY - 48);
    ctx.lineTo(x + gx, groundY + 12);
    ctx.stroke();
  }
  for (let gy = -36; gy <= 0; gy += 18) {
    ctx.beginPath();
    ctx.moveTo(x - 70, groundY + gy);
    ctx.lineTo(x + 70, groundY + gy);
    ctx.stroke();
  }

  if (!fixed) {
    drawDrainDebris(ctx, x - 45, groundY - 60, time);
    drawDrainDebris(ctx, x + 50, groundY - 52, time + 1.7);
  } else {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(189, 238, 230, 0.5)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - 64, groundY - 18);
    ctx.quadraticCurveTo(x, groundY + 12, x + 64, groundY - 18);
    ctx.stroke();
    ctx.restore();
    warmGlow(ctx, x, groundY - 54, 86, 0.24 + Math.sin(time * 4) * 0.04);
  }

  ctx.restore();
}

function drawDrainPool(ctx, x, y, width, fixed, time) {
  ctx.save();
  ctx.globalAlpha = fixed ? 0.42 : 0.82;
  const water = ctx.createRadialGradient(x, y, 20, x, y, width / 2);
  water.addColorStop(0, "rgba(38, 86, 98, 0.78)");
  water.addColorStop(1, "rgba(13, 32, 40, 0.1)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, y, width / 2, fixed ? 24 : 52, 0.02, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(189, 238, 230, 0.18)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(x - width / 3 + ((time * 45 + i * 82) % Math.max(1, width * 0.7)), y + Math.sin(time + i) * 5, 46, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRunoffChannel(ctx, fromX, fromY, toX, toY, fixed, time) {
  ctx.strokeStyle = "#352a25";
  ctx.lineWidth = 13;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.quadraticCurveTo((fromX + toX) / 2, fromY + 28, toX, toY);
  ctx.stroke();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = fixed ? "rgba(189, 238, 230, 0.58)" : "rgba(126, 190, 191, 0.24)";
  ctx.lineWidth = fixed ? 5 : 3;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.quadraticCurveTo((fromX + toX) / 2, fromY + 28 + Math.sin(time * 3) * 2, toX, toY);
  ctx.stroke();
  ctx.restore();
}

function drawDrainDebris(ctx, x, y, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 2) * 0.06);
  ctx.fillStyle = "#46352b";
  roundedRect(ctx, -28, -8, 56, 16, 6);
  ctx.fill();
  ctx.fillStyle = "#6f5137";
  ctx.beginPath();
  ctx.arc(-18, -10, 8, 0, Math.PI * 2);
  ctx.arc(14, 10, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawOldFootbridge(ctx, bridge, time, powerLevel) {
  const fixed = bridge.fixed || powerLevel > 0.95;
  const x = bridge.x;
  const groundY = bridge.groundY;
  const width = bridge.width;

  ctx.save();
  drawBridgeStream(ctx, x, groundY + 38, width + 260, time);

  ctx.strokeStyle = "#4d382b";
  ctx.lineWidth = 13;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - width / 2, groundY - 68);
  ctx.quadraticCurveTo(x, groundY - 116, x + width / 2, groundY - 68);
  ctx.stroke();

  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.58)" : "rgba(82, 58, 41, 0.74)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(x - width / 2 + 8, groundY - 102);
  ctx.quadraticCurveTo(x, groundY - 164, x + width / 2 - 8, groundY - 102);
  ctx.stroke();

  const plankCount = 11;
  for (let i = 0; i < plankCount; i += 1) {
    const t = i / (plankCount - 1);
    const plankX = x - width / 2 + t * width;
    const archY = groundY - 70 - Math.sin(t * Math.PI) * 42;
    const angle = fixed ? Math.sin(time * 1.4 + i) * 0.012 : (i % 3 - 1) * 0.12;
    drawBridgePlank(ctx, plankX, archY, angle, fixed, i);
  }

  if (!fixed) {
    ctx.strokeStyle = "rgba(126, 190, 191, 0.42)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 80, groundY - 86);
    ctx.lineTo(x - 44, groundY - 50);
    ctx.moveTo(x + 104, groundY - 96);
    ctx.lineTo(x + 136, groundY - 58);
    ctx.stroke();
  } else {
    warmGlow(ctx, x, groundY - 100, 150, 0.28 + Math.sin(time * 4) * 0.04);
  }

  ctx.restore();
}

function drawBridgeStream(ctx, x, y, width, time) {
  ctx.save();
  ctx.globalAlpha = 0.84;
  const water = ctx.createLinearGradient(0, y - 50, 0, y + 60);
  water.addColorStop(0, "rgba(18, 43, 52, 0.2)");
  water.addColorStop(0.5, "rgba(20, 54, 66, 0.66)");
  water.addColorStop(1, "rgba(10, 25, 32, 0.28)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.ellipse(x, y, width / 2, 58, -0.04, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(189, 238, 230, 0.18)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 7; i += 1) {
    const rippleX = x - width / 2 + ((time * 56 + i * 120) % width);
    ctx.beginPath();
    ctx.ellipse(rippleX, y - 10 + Math.sin(time * 2 + i) * 10, 70, 12, 0.04, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBridgePlank(ctx, x, y, angle, fixed, index) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = fixed ? "#735139" : index % 2 ? "#5d4332" : "#4e382d";
  roundedRect(ctx, -19, -8, 38, 72, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(35, 25, 20, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-12, 4);
  ctx.lineTo(12, 4);
  ctx.moveTo(-10, 46);
  ctx.lineTo(10, 46);
  ctx.stroke();
  ctx.restore();
}

function drawMarketAwnings(ctx, market, time, powerLevel) {
  const fixed = market.fixed || powerLevel > 0.95;
  const groundY = market.groundY;

  ctx.save();
  market.stalls.forEach((stall, index) => {
    drawMarketStall(ctx, stall, groundY, fixed, time + index * 0.6);
  });

  ctx.strokeStyle = fixed ? "rgba(189, 238, 230, 0.7)" : "rgba(126, 190, 191, 0.35)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  market.stalls.forEach((stall) => {
    const awningY = groundY - 205;
    const lowSide = fixed ? stall.barrelX : stall.x + 86;
    ctx.beginPath();
    ctx.moveTo(stall.x - 92, awningY + 10);
    ctx.quadraticCurveTo(stall.x, awningY + (fixed ? 12 : 36), lowSide, fixed ? groundY - 56 : awningY + 48);
    ctx.stroke();

    if (!fixed) {
      drawAwningDrips(ctx, stall.x + 42, awningY + 54, time + stall.x * 0.01);
    } else {
      drawBarrelRunoff(ctx, stall.barrelX, groundY, time);
    }
  });

  if (fixed) {
    warmGlow(ctx, market.x, groundY - 155, 210, 0.3 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawMarketStall(ctx, stall, groundY, fixed, time) {
  const x = stall.x;
  ctx.fillStyle = "#5d4433";
  roundedRect(ctx, x - 98, groundY - 142, 196, 142, 12);
  ctx.fill();

  ctx.fillStyle = `rgba(255, 216, 135, ${fixed ? 0.5 : 0.22})`;
  roundedRect(ctx, x - 62, groundY - 90, 44, 34, 5);
  ctx.fill();
  roundedRect(ctx, x + 22, groundY - 90, 44, 34, 5);
  ctx.fill();

  const awningY = groundY - 202;
  ctx.save();
  ctx.translate(x, awningY);
  ctx.rotate(fixed ? -0.05 : 0.08);
  ctx.fillStyle = stall.color;
  roundedRect(ctx, -116, -4, 232, 62, 14);
  ctx.fill();
  for (let stripe = -88; stripe <= 88; stripe += 44) {
    ctx.fillStyle = "rgba(255, 221, 160, 0.26)";
    ctx.fillRect(stripe, 0, 22, 58);
  }
  ctx.restore();

  drawSmallMarketBarrel(ctx, stall.barrelX, groundY, fixed, time);
}

function drawSmallMarketBarrel(ctx, x, groundY, fixed, time) {
  ctx.fillStyle = "#553b2d";
  roundedRect(ctx, x - 26, groundY - 64, 52, 64, 8);
  ctx.fill();
  ctx.strokeStyle = "#2f241e";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x - 24, groundY - 46);
  ctx.lineTo(x + 24, groundY - 46);
  ctx.moveTo(x - 24, groundY - 18);
  ctx.lineTo(x + 24, groundY - 18);
  ctx.stroke();
  if (fixed) {
    warmGlow(ctx, x, groundY - 46, 42, 0.18 + Math.sin(time * 4) * 0.03);
  }
}

function drawAwningDrips(ctx, x, y, time) {
  ctx.strokeStyle = "rgba(169, 218, 220, 0.56)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i += 1) {
    const fall = (time * 62 + i * 18) % 64;
    ctx.beginPath();
    ctx.moveTo(x + i * 16, y + fall * 0.18);
    ctx.lineTo(x + i * 16 + Math.sin(time * 3 + i) * 3, y + fall);
    ctx.stroke();
  }
}

function drawBarrelRunoff(ctx, x, groundY, time) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(189, 238, 230, 0.44)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 8, groundY - 86);
  ctx.lineTo(x - 2 + Math.sin(time * 5) * 2, groundY - 58);
  ctx.stroke();
  ctx.restore();
}

function drawSchoolhouseLanterns(ctx, schoolhouse, time, powerLevel) {
  const fixed = schoolhouse.fixed || powerLevel > 0.95;
  const x = schoolhouse.x;
  const groundY = schoolhouse.groundY;
  const width = 430;

  ctx.save();
  ctx.fillStyle = "#664c39";
  roundedRect(ctx, x - width / 2, groundY - 228, width, 228, 16);
  ctx.fill();
  ctx.fillStyle = "#3d2e29";
  ctx.beginPath();
  ctx.moveTo(x - width / 2 - 28, groundY - 228);
  ctx.lineTo(x, groundY - 322);
  ctx.lineTo(x + width / 2 + 28, groundY - 228);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#4c382f";
  roundedRect(ctx, x - 52, groundY - 122, 104, 122, 9);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 216, 135, ${fixed ? 0.58 : 0.22})`;
  roundedRect(ctx, x - 164, groundY - 170, 64, 52, 7);
  ctx.fill();
  roundedRect(ctx, x + 100, groundY - 170, 64, 52, 7);
  ctx.fill();
  roundedRect(ctx, x - 30, groundY - 202, 60, 38, 7);
  ctx.fill();

  ctx.fillStyle = "rgba(219, 196, 138, 0.74)";
  roundedRect(ctx, x - 82, groundY - 258, 164, 28, 6);
  ctx.fill();
  ctx.fillStyle = "#3a2b25";
  ctx.font = "700 16px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("SCHOOL", x, groundY - 238);

  schoolhouse.posts.forEach((post, index) => {
    const lit = fixed || post.lit;
    drawSchoolLanternPost(ctx, post.x, groundY, lit, time + index);
  });

  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.68)" : "rgba(99, 73, 52, 0.58)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(schoolhouse.posts[0].x, groundY - 184);
  ctx.quadraticCurveTo(x, groundY - 218 + Math.sin(time * 2) * 3, schoolhouse.posts[2].x, groundY - 184);
  ctx.stroke();

  if (fixed) {
    warmGlow(ctx, x, groundY - 145, 190, 0.32 + Math.sin(time * 3) * 0.04);
  }

  ctx.restore();
}

function drawSchoolLanternPost(ctx, x, groundY, lit, time) {
  ctx.strokeStyle = "#433126";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, groundY);
  ctx.lineTo(x, groundY - 184);
  ctx.moveTo(x - 28, groundY - 158);
  ctx.lineTo(x + 28, groundY - 158);
  ctx.stroke();

  ctx.fillStyle = "#30251f";
  roundedRect(ctx, x - 18, groundY - 198, 36, 44, 6);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 216, 135, ${lit ? 0.72 + Math.sin(time * 4) * 0.08 : 0.2})`;
  roundedRect(ctx, x - 11, groundY - 190, 22, 28, 4);
  ctx.fill();
  if (lit) {
    warmGlow(ctx, x, groundY - 176, 62, 0.42 + Math.sin(time * 4) * 0.05);
  }
}

function drawWorkshopLift(ctx, lift, time, powerLevel) {
  const fixed = lift.fixed || powerLevel > 0.95;
  const x = lift.x;
  const groundY = lift.groundY;
  const platformY = fixed ? groundY - 214 : groundY - 122;
  const leftRail = x - 140;
  const rightRail = x + 140;

  ctx.save();
  ctx.fillStyle = "#5f4635";
  roundedRect(ctx, x - 250, groundY - 210, 220, 210, 14);
  ctx.fill();
  ctx.fillStyle = "#3e2e27";
  ctx.beginPath();
  ctx.moveTo(x - 270, groundY - 210);
  ctx.lineTo(x - 140, groundY - 302);
  ctx.lineTo(x - 10, groundY - 210);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = `rgba(255, 216, 135, ${fixed ? 0.58 : 0.26})`;
  roundedRect(ctx, x - 205, groundY - 150, 58, 44, 6);
  ctx.fill();

  ctx.strokeStyle = "#4a352a";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(leftRail, groundY);
  ctx.lineTo(leftRail, groundY - 300);
  ctx.moveTo(rightRail, groundY);
  ctx.lineTo(rightRail, groundY - 300);
  ctx.moveTo(leftRail - 28, groundY - 302);
  ctx.lineTo(rightRail + 28, groundY - 302);
  ctx.stroke();

  ctx.strokeStyle = "rgba(87, 65, 48, 0.82)";
  ctx.lineWidth = 4;
  for (let y = groundY - 270; y < groundY - 20; y += 46) {
    ctx.beginPath();
    ctx.moveTo(leftRail, y);
    ctx.lineTo(rightRail, y + 18);
    ctx.moveTo(rightRail, y);
    ctx.lineTo(leftRail, y + 18);
    ctx.stroke();
  }

  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.78)" : "rgba(143, 217, 240, 0.32)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, groundY - 302);
  ctx.lineTo(x, platformY - 20);
  ctx.stroke();

  ctx.fillStyle = fixed ? "#6f5137" : "#5a4233";
  roundedRect(ctx, x - 96, platformY - 24, 192, 48, 8);
  ctx.fill();
  ctx.strokeStyle = "#2f241e";
  ctx.lineWidth = 5;
  ctx.strokeRect(x - 86, platformY - 16, 172, 32);

  ctx.fillStyle = "#7d5a3e";
  roundedRect(ctx, x - 40, platformY - 66, 80, 42, 8);
  ctx.fill();
  ctx.fillStyle = fixed ? "rgba(255, 221, 152, 0.72)" : "rgba(255, 221, 152, 0.24)";
  ctx.beginPath();
  ctx.arc(x, platformY - 45, 8, 0, Math.PI * 2);
  ctx.fill();

  drawWorkshopCrank(ctx, x + 186, groundY - 92, fixed, time);
  drawRoofShelf(ctx, x + 74, groundY - 292, fixed, time);

  if (fixed) {
    warmGlow(ctx, x, platformY - 32, 86, 0.34 + Math.sin(time * 4) * 0.04);
    warmGlow(ctx, x - 175, groundY - 130, 94, 0.28);
  }

  ctx.restore();
}

function drawWorkshopCrank(ctx, x, y, fixed, time) {
  const angle = fixed ? time * 0.8 : -0.7;
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.82)" : "rgba(111, 81, 55, 0.9)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(42, 0);
  ctx.stroke();
  ctx.fillStyle = "#3a2b25";
  ctx.beginPath();
  ctx.arc(48, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRoofShelf(ctx, x, y, fixed, time) {
  ctx.fillStyle = "#513b2e";
  roundedRect(ctx, x - 106, y - 14, 212, 28, 7);
  ctx.fill();
  ["gear", "coil", "seed"].forEach((kind, index) => {
    const partX = x - 68 + index * 68;
    const part = { x: partX, y: y - 30 + Math.sin(time * 2 + index) * 2, kind };
    ctx.save();
    ctx.globalAlpha = fixed ? 0.95 : 0.5;
    drawRepairPart(ctx, part, time);
    ctx.restore();
  });
}

function drawBellRopeCorner(ctx, corner, time, powerLevel) {
  const fixed = corner.fixed || powerLevel > 0.95;
  const x = corner.x;
  const groundY = corner.groundY;
  const bellY = groundY - 270;
  const postLeft = x - 120;
  const postRight = x + 118;

  ctx.save();
  if (imageReady(sprites.world.bellRopeCorner)) {
    ctx.save();
    ctx.filter = fixed ? "brightness(0.9) saturate(1.02)" : "brightness(0.72) saturate(0.9)";
    drawWorldSprite(ctx, sprites.world.bellRopeCorner, x, groundY + 42, 548);
    ctx.restore();

    if (fixed) {
      warmGlow(ctx, x, groundY - 268, 108, 0.36 + Math.sin(time * 4) * 0.05);
      drawBellRing(ctx, x, groundY - 250, time);
    }

    ctx.restore();
    return;
  }

  ctx.strokeStyle = "#4a352a";
  ctx.lineWidth = 13;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(postLeft, groundY);
  ctx.lineTo(postLeft, groundY - 255);
  ctx.moveTo(postRight, groundY);
  ctx.lineTo(postRight, groundY - 240);
  ctx.moveTo(postLeft - 12, groundY - 242);
  ctx.quadraticCurveTo(x, groundY - 300, postRight + 14, groundY - 228);
  ctx.stroke();

  ctx.fillStyle = "#5d4332";
  roundedRect(ctx, x - 82, groundY - 128, 164, 128, 12);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 216, 135, ${fixed ? 0.52 : 0.2})`;
  roundedRect(ctx, x - 52, groundY - 92, 38, 32, 5);
  ctx.fill();
  roundedRect(ctx, x + 15, groundY - 92, 38, 32, 5);
  ctx.fill();

  ctx.fillStyle = fixed ? "#c7974f" : "#8d744e";
  ctx.beginPath();
  ctx.moveTo(x - 46, bellY + 32);
  ctx.quadraticCurveTo(x - 34, bellY - 18, x, bellY - 22);
  ctx.quadraticCurveTo(x + 34, bellY - 18, x + 46, bellY + 32);
  ctx.quadraticCurveTo(x + 18, bellY + 54, x - 46, bellY + 32);
  ctx.fill();
  ctx.fillStyle = "#5a3827";
  ctx.beginPath();
  ctx.arc(x, bellY + 38, 8, 0, Math.PI * 2);
  ctx.fill();

  drawPulley(ctx, x - 82, bellY + 8, fixed, time);
  drawPulley(ctx, x + 78, bellY + 22, fixed, time + 1.4);

  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.86)" : "rgba(120, 88, 61, 0.65)";
  ctx.lineWidth = fixed ? 5 : 4;
  ctx.beginPath();
  ctx.moveTo(postLeft + 18, groundY - 222);
  ctx.quadraticCurveTo(x - 78, bellY + 4, x - 82, bellY + 8);
  ctx.quadraticCurveTo(x, bellY + (fixed ? 42 : 84), x + 78, bellY + 22);
  ctx.lineTo(postRight - 20, fixed ? groundY - 56 : groundY - 116);
  ctx.stroke();

  if (!fixed) {
    ctx.strokeStyle = "rgba(120, 88, 61, 0.52)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(postRight - 20, groundY - 116);
    ctx.quadraticCurveTo(postRight + 24, groundY - 72, postRight - 8, groundY - 36);
    ctx.stroke();
  } else {
    warmGlow(ctx, x, bellY + 18, 86, 0.38 + Math.sin(time * 4) * 0.05);
    drawBellRing(ctx, x, bellY + 20, time);
  }

  ctx.restore();
}

function drawPulley(ctx, x, y, fixed, time) {
  ctx.fillStyle = "#3a2b25";
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fixed ? "rgba(255, 221, 152, 0.72)" : "rgba(143, 217, 240, 0.24)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, 14, time % Math.PI, Math.PI * 1.7 + (time % Math.PI));
  ctx.stroke();
}

function drawBellRing(ctx, x, y, time) {
  ctx.strokeStyle = `rgba(255, 221, 152, ${0.22 + Math.sin(time * 5) * 0.04})`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i += 1) {
    const radius = 58 + i * 24 + Math.sin(time * 3 + i) * 4;
    ctx.beginPath();
    ctx.arc(x, y, radius, -0.65, 0.65);
    ctx.stroke();
  }
}

function drawBakeryGutter(ctx, bakery, time, powerLevel) {
  const fixed = bakery.fixed || powerLevel > 0.95;
  const x = bakery.x;
  const groundY = bakery.groundY;
  const width = bakery.awningWidth;
  const left = x - width / 2;
  const right = x + width / 2;
  const awningY = groundY - 210;

  if (imageReady(sprites.world.bakery)) {
    drawPaintedBakeryGutter(ctx, bakery, time, powerLevel, fixed, x, groundY, left, right, awningY);
    return;
  }

  ctx.save();
  ctx.fillStyle = "#634936";
  roundedRect(ctx, left + 44, groundY - 230, width - 88, 230, 16);
  ctx.fill();

  ctx.fillStyle = "#3d2d28";
  ctx.beginPath();
  ctx.moveTo(left + 8, groundY - 230);
  ctx.lineTo(x, groundY - 322);
  ctx.lineTo(right - 8, groundY - 230);
  ctx.closePath();
  ctx.fill();

  const windowGlow = fixed ? 0.66 + Math.sin(time * 3) * 0.06 : 0.34;
  ctx.fillStyle = `rgba(255, 215, 142, ${windowGlow})`;
  roundedRect(ctx, x - 145, groundY - 172, 70, 58, 8);
  ctx.fill();
  roundedRect(ctx, x + 76, groundY - 172, 70, 58, 8);
  ctx.fill();

  ctx.fillStyle = "#322720";
  roundedRect(ctx, x - 34, groundY - 112, 68, 112, 8);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 222, 150, ${fixed ? 0.62 : 0.28})`;
  ctx.beginPath();
  ctx.arc(x + 22, groundY - 56, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#805548";
  roundedRect(ctx, left, awningY, width, 62, 16);
  ctx.fill();
  for (let stripe = 0; stripe < 7; stripe += 1) {
    ctx.fillStyle = stripe % 2 ? "rgba(255, 212, 148, 0.42)" : "rgba(83, 48, 45, 0.45)";
    ctx.fillRect(left + 28 + stripe * 72, awningY + 4, 38, 54);
  }

  ctx.strokeStyle = fixed ? "rgba(189, 238, 230, 0.78)" : "rgba(126, 190, 191, 0.42)";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(left + 34, awningY - 8);
  ctx.quadraticCurveTo(x - 50, awningY + (fixed ? 8 : 22), right - 100, awningY - 4);
  ctx.lineTo(bakery.barrelX, groundY - 28);
  ctx.stroke();

  if (!fixed) {
    drawGutterDrip(ctx, x - 120, awningY + 50, time, 0);
    drawGutterDrip(ctx, x + 40, awningY + 52, time, 1.3);
    drawGutterDrip(ctx, x + 180, awningY + 48, time, 2.1);
  } else {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(189, 238, 230, 0.5)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(right - 98, awningY - 2);
    ctx.lineTo(bakery.barrelX, groundY - 36);
    ctx.stroke();
    ctx.restore();
  }

  drawRainBarrelShape(ctx, bakery.barrelX, groundY, fixed, time);
  warmGlow(ctx, x, groundY - 164, 170, fixed ? 0.42 : 0.2);
  ctx.restore();
}

function drawPaintedBakeryGutter(ctx, bakery, time, powerLevel, fixed, x, groundY, left, right, awningY) {
  ctx.save();

  const height = bakery.spriteHeight ?? 500;
  ctx.filter = "brightness(0.78) saturate(0.92)";
  drawWorldSprite(ctx, sprites.world.bakery, x - 26, groundY + 42, height);
  ctx.filter = "none";

  const windowGlow = fixed ? 0.5 + Math.sin(time * 3) * 0.05 : 0.26 + powerLevel * 0.12;
  warmGlow(ctx, x + 70, groundY - 182, 210, windowGlow);
  warmGlow(ctx, x - 178, groundY - 235, 110, windowGlow * 0.72);
  ctx.restore();
}

function drawGutterDrip(ctx, x, y, time, offset) {
  const fall = (time * 64 + offset * 30) % 70;
  ctx.strokeStyle = "rgba(169, 218, 220, 0.58)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + fall * 0.2);
  ctx.lineTo(x + Math.sin(time * 3 + offset) * 3, y + fall);
  ctx.stroke();
}

function drawRainBarrelShape(ctx, x, groundY, fixed, time) {
  const barrelImage = sprites.world.rainBarrel;
  if (imageReady(barrelImage)) {
    drawWorldSprite(ctx, barrelImage, x, groundY + 8, 120);
  } else {
    ctx.fillStyle = "#5a3d30";
    roundedRect(ctx, x - 36, groundY - 92, 72, 92, 10);
    ctx.fill();
    ctx.strokeStyle = "#2f2420";
    ctx.lineWidth = 5;
    ctx.strokeRect(x - 34, groundY - 72, 68, 24);
  }
  if (fixed) {
    warmGlow(ctx, x, groundY - 72, 58, 0.26 + Math.sin(time * 4) * 0.04);
  }
}

function drawFootbridge(ctx, bridge, time) {
  const glow = bridge.repaired ? 0.34 + Math.sin(time * 3) * 0.08 : 0.1;

  const bridgeImage = sprites.world.footbridge;
  if (imageReady(bridgeImage)) {
    const width = bridge.width * 1.08;
    const height = width * (bridgeImage.naturalHeight / bridgeImage.naturalWidth);
    ctx.drawImage(bridgeImage, bridge.x - width / 2, bridge.y + 64 - height, width, height);
    if (bridge.repaired) {
      warmGlow(ctx, bridge.x, bridge.y - height * 0.32, width * 0.42, 0.4 + Math.sin(time * 3) * 0.08);
    }
    return;
  }

  ctx.save();
  ctx.translate(bridge.x, bridge.y);
  ctx.strokeStyle = "#4f382b";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-bridge.width / 2, 0);
  ctx.quadraticCurveTo(0, -42, bridge.width / 2, 0);
  ctx.stroke();
  ctx.strokeStyle = `rgba(255, 229, 141, ${glow})`;
  ctx.lineWidth = 5;
  for (let x = -bridge.width / 2 + 30; x < bridge.width / 2; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, -2);
    ctx.lineTo(x + 24, -12 - Math.sin(time + x) * 4);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSwitchyard(ctx, switchyard, time) {
  const poleImage = sprites.world.mosslineUtilityPole;
  const lineImage = sprites.world.mosslinePowerLineSpan;

  if (imageReady(lineImage)) {
    switchyard.poles.slice(0, -1).forEach((pole, index) => {
      drawPowerLineSpan(ctx, lineImage, pole, switchyard.poles[index + 1]);
    });
  }

  switchyard.poles.forEach((pole) => {
    if (imageReady(poleImage)) {
      const groundY = pole.y + 100;
      const height = pole.spriteHeight ?? 330;
      drawWorldSprite(ctx, poleImage, pole.x, groundY, height);
      warmGlow(ctx, pole.x + 18, groundY - height * 0.62, 44, pole.lit ? 0.42 + Math.sin(time * 4) * 0.06 : 0.16);
      return;
    }

    ctx.save();
    ctx.translate(pole.x, pole.y);
    ctx.strokeStyle = "#46352b";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 90);
    ctx.lineTo(0, -pole.height + 90);
    ctx.moveTo(-42, -pole.height + 128);
    ctx.lineTo(42, -pole.height + 128);
    ctx.stroke();
    ctx.fillStyle = `rgba(255, 216, 135, ${pole.lit ? 0.62 + Math.sin(time * 4) * 0.08 : 0.2})`;
    ctx.beginPath();
    ctx.arc(0, -pole.height + 118, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  if (!imageReady(lineImage)) {
    ctx.strokeStyle = "rgba(201, 121, 69, 0.42)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    switchyard.poles.forEach((pole, index) => {
      if (index === 0) {
        ctx.moveTo(pole.x, pole.y - pole.height + 120);
      } else {
        ctx.lineTo(pole.x, pole.y - pole.height + 120);
      }
    });
    ctx.stroke();
  }

  const boxImage = sprites.world.switchyardBox;
  switchyard.boxes.forEach((box) => {
    if (imageReady(boxImage)) {
      const groundY = box.y + 30;
      const height = 224;
      drawWorldSprite(ctx, boxImage, box.x, groundY, height);
      warmGlow(ctx, box.x, groundY - height * 0.52, 52, box.lit ? 0.6 + Math.sin(time * 4) * 0.08 : 0.16);
      return;
    }
    ctx.fillStyle = "#5f4832";
    roundedRect(ctx, box.x - 34, box.y - 30, 68, 58, 8);
    ctx.fill();
    ctx.fillStyle = `rgba(143, 217, 240, ${box.lit ? 0.72 : 0.24})`;
    ctx.beginPath();
    ctx.arc(box.x, box.y - 2, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPowerLineSpan(ctx, image, fromPole, toPole) {
  const width = Math.abs(toPole.x - fromPole.x) + 112;
  const height = width * (image.naturalHeight / image.naturalWidth);
  const x = (fromPole.x + toPole.x) / 2;
  const y = ((fromPole.y - fromPole.height + 122) + (toPole.y - toPole.height + 122)) / 2;
  ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
}

function drawStormRidge(ctx, ridge, time) {
  ridge.posts.forEach((post) => {
    ctx.save();
    ctx.translate(post.x, post.y);
    ctx.rotate(post.lean);
    ctx.strokeStyle = "#4f382b";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 90);
    ctx.lineTo(0, -80);
    ctx.stroke();
    ctx.restore();
  });
  const gauge = ridge.gauge;
  const gaugeImage = sprites.world.stormGauge;
  if (imageReady(gaugeImage)) {
    const groundY = gauge.y + 60;
    const height = 292;
    drawWorldSprite(ctx, gaugeImage, gauge.x, groundY, height);
    warmGlow(ctx, gauge.x, groundY - height * 0.62, 46, gauge.lit ? 0.55 + Math.sin(time * 3.4) * 0.06 : 0.18);
    return;
  }
  ctx.fillStyle = "#5f4832";
  roundedRect(ctx, gauge.x - 46, gauge.y - 48, 92, 96, 18);
  ctx.fill();
  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(gauge.x, gauge.y - 8, 30, Math.PI, 0);
  ctx.stroke();
  ctx.strokeStyle = gauge.lit ? "rgba(255, 229, 141, 0.9)" : "rgba(143, 217, 240, 0.55)";
  ctx.beginPath();
  ctx.moveTo(gauge.x, gauge.y - 8);
  ctx.lineTo(gauge.x + Math.cos(time * 0.8) * 25, gauge.y - 8 - Math.abs(Math.sin(time * 0.8)) * 25);
  ctx.stroke();
}

function drawBeaconHill(ctx, beaconHill, time) {
  const tower = beaconHill.tower;
  const towerImage = sprites.world[tower.sprite] ?? sprites.world.beaconTower;
  if (imageReady(towerImage)) {
    const groundY = tower.groundY ?? tower.y + 84;
    const height = tower.height ?? 620;
    drawWorldSprite(ctx, towerImage, tower.x, groundY, height);
    warmGlow(ctx, tower.x, groundY - height * 0.86, 54, tower.lit ? 0.64 + Math.sin(time * 4) * 0.08 : 0.2);
  } else {
    ctx.strokeStyle = "#4f382b";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(tower.x - 52, tower.y + 80);
    ctx.lineTo(tower.x, tower.y - 220);
    ctx.lineTo(tower.x + 52, tower.y + 80);
    ctx.moveTo(tower.x - 36, tower.y - 50);
    ctx.lineTo(tower.x + 36, tower.y - 110);
    ctx.moveTo(tower.x + 36, tower.y - 50);
    ctx.lineTo(tower.x - 36, tower.y - 110);
    ctx.stroke();
    ctx.fillStyle = `rgba(255, 229, 141, ${tower.lit ? 0.76 + Math.sin(time * 4) * 0.08 : 0.28})`;
    ctx.beginPath();
    ctx.arc(tower.x, tower.y - 230, 20, 0, Math.PI * 2);
    ctx.fill();
  }
  const shedImage = sprites.world.shed;
  if (beaconHill.shed && imageReady(shedImage)) {
    const shed = beaconHill.shed;
    const groundY = shed.y + 96;
    const height = 420;
    const { width } = drawWorldSprite(ctx, shedImage, shed.x, groundY, height);
    warmGlow(ctx, shed.x - width * 0.12, groundY - height * 0.45, 56, shed.lit ? 0.5 + Math.sin(time * 3.2) * 0.07 : 0.18);
  }
  beaconHill.cables.forEach((cable) => {
    ctx.strokeStyle = "rgba(201, 121, 69, 0.42)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cable.fromX, cable.fromY);
    ctx.quadraticCurveTo((cable.fromX + cable.toX) / 2, Math.max(cable.fromY, cable.toY) + 40, cable.toX, cable.toY);
    ctx.stroke();
  });
  beaconHill.flags.forEach((flag) => {
    ctx.fillStyle = flag.color;
    ctx.beginPath();
    ctx.moveTo(flag.x, flag.y);
    ctx.lineTo(flag.x + 48, flag.y + Math.sin(time * 3 + flag.x) * 5);
    ctx.lineTo(flag.x, flag.y + 28);
    ctx.closePath();
    ctx.fill();
  });
}

function drawObservatory(ctx, observatory, time, powerLevel) {
  const repairedGlow = observatory.lens?.lit || powerLevel > 0.95;

  observatory.pathEdges?.forEach((pathEdge) => {
    drawPlacedSprite(ctx, sprites.world.wetPathEdge, pathEdge, time, 0.88);
  });
  observatory.foundations?.forEach((foundation) => {
    drawPlacedSprite(ctx, sprites.world.mossyStoneFoundation, foundation, time, 0.96);
  });
  observatory.rocks?.forEach((rocks) => {
    drawPlacedSprite(ctx, sprites.world.rainyRocksReeds, rocks, time, 0.94);
  });

  if (observatory.hut) {
    drawPlacedSprite(ctx, sprites.world.observatoryHut, observatory.hut, time, 0.95);
    warmGlow(ctx, observatory.hut.x + 35, observatory.hut.groundY - observatory.hut.height * 0.43, 62, 0.38 + powerLevel * 0.22);
  }

  if (observatory.tower) {
    drawPlacedSprite(ctx, sprites.world.oldObservatory, observatory.tower, time, 0.98);
    warmGlow(ctx, observatory.tower.x - 52, observatory.tower.groundY - observatory.tower.height * 0.43, 76, 0.32 + powerLevel * 0.3);
  }

  if (observatory.lens) {
    drawPlacedSprite(ctx, sprites.world.archiveLensArray, observatory.lens, time, 0.98);
    warmGlow(ctx, observatory.lens.x, observatory.lens.groundY - observatory.lens.height * 0.54, 112, repairedGlow ? 0.68 + Math.sin(time * 3.5) * 0.08 : 0.24 + powerLevel * 0.34);
  }
}

function drawPlacedSprite(ctx, image, item, time, alpha = 1) {
  if (!imageReady(image) || !item) {
    return;
  }

  ctx.save();
  ctx.globalAlpha = alpha;
  const bob = item.float ? Math.sin(time * 1.6 + item.x * 0.01) * item.float : 0;
  drawWorldSprite(ctx, image, item.x, item.groundY + bob, item.height);
  ctx.restore();
}

function drawRainbarrelRow(ctx, row, time) {
  row.channels.forEach((channel) => {
    ctx.strokeStyle = channel.flow ? "rgba(126, 190, 191, 0.68)" : "rgba(60, 81, 75, 0.62)";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(channel.x - channel.width / 2, channel.y);
    ctx.bezierCurveTo(channel.x - 80, channel.y + 22, channel.x + 80, channel.y - 18, channel.x + channel.width / 2, channel.y);
    ctx.stroke();
  });
  const barrelImage = sprites.world.rainBarrel;
  row.barrels.forEach((barrel) => {
    if (imageReady(barrelImage)) {
      const groundY = barrel.y + 34;
      const height = 160;
      drawWorldSprite(ctx, barrelImage, barrel.x, groundY, height);
      warmGlow(ctx, barrel.x, groundY - height * 0.4, 40, barrel.overflow ? 0.16 : 0.4);
      return;
    }
    ctx.fillStyle = "#6c543b";
    roundedRect(ctx, barrel.x - 28, barrel.y - 44, 56, 76, 12);
    ctx.fill();
    ctx.strokeStyle = colors.copper;
    ctx.lineWidth = 4;
    ctx.stroke();
    if (barrel.overflow) {
      ctx.strokeStyle = "rgba(126, 190, 191, 0.7)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(barrel.x + 24, barrel.y - 16);
      ctx.quadraticCurveTo(barrel.x + 42, barrel.y + 20, barrel.x + 18, barrel.y + 48 + Math.sin(time * 4) * 4);
      ctx.stroke();
    }
  });
  const drain = row.drain;
  ctx.fillStyle = drain.cleared ? "rgba(126, 190, 191, 0.72)" : "#2f3f3b";
  ctx.beginPath();
  ctx.ellipse(drain.x, drain.y, 52, 16, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawOnwardGlow(ctx, scene, time) {
  if (!scene.repairTarget || scene.flow.mode !== "reward" || !scene.flow.onwardPrompted) {
    return;
  }

  const alpha = 0.16 + Math.sin(time * 3) * 0.04;
  const gradient = ctx.createLinearGradient(scene.repairTarget.x + 40, 620, scene.repairTarget.x + 780, 590);
  gradient.addColorStop(0, `rgba(255, 224, 138, ${alpha})`);
  gradient.addColorStop(1, "rgba(255, 224, 138, 0)");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 16;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(scene.repairTarget.x + 120, 620);
  ctx.bezierCurveTo(scene.repairTarget.x + 290, 590, scene.repairTarget.x + 480, 620, scene.repairTarget.x + 700, 584);
  ctx.stroke();
}

function drawWaterWheelImage(ctx, image, target, time, powerLevel) {
  const displayHeight = target.displayHeight || 264;
  const pondScale = displayHeight / 264;
  const scale = displayHeight / image.naturalHeight;
  const displayWidth = image.naturalWidth * scale;
  const baseY = 96; // bottom of the wheel rests near the old base line

  ctx.save();
  ctx.translate(target.x, target.y);
  drawRepairHalo(ctx, target, time, powerLevel);

  // Warm glow behind the hub runes, swelling as power comes back.
  const glow = 0.25 + powerLevel * 0.55 + Math.sin(time * 2) * 0.05 * powerLevel;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const halo = ctx.createRadialGradient(0, baseY - displayHeight * 0.5, 8, 0, baseY - displayHeight * 0.5, displayHeight * 0.42);
  halo.addColorStop(0, `rgba(255, 221, 120, ${0.34 * glow})`);
  halo.addColorStop(1, "rgba(255, 221, 120, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, baseY - displayHeight * 0.5, displayHeight * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Slightly dim the whole wheel until power is restored.
  ctx.globalAlpha = 0.78 + powerLevel * 0.22;
  ctx.drawImage(image, -displayWidth / 2, baseY - displayHeight, displayWidth, displayHeight);
  ctx.globalAlpha = 1;
  ctx.restore();
}

// The mill pond under the wheel — same water texture as the stream, with a
// soft radial fade so its rim melts into the bank.
function drawMillPond(ctx, baseY, time, scale = 1) {
  const pondY = baseY + 12 * scale;
  const rx = 196 * scale;
  const ry0 = 42 * scale;
  ctx.save();

  const pattern = texturePattern(ctx, sprites.world.waterTile, 200);
  if (pattern) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(4, pondY, rx, ry0, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = pattern;
    ctx.fillRect(4 - rx, pondY - ry0, rx * 2, ry0 * 2);
    // Feather the long edges so the pond blends into the ground.
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "destination-out";
    const fade = ctx.createRadialGradient(4, pondY, rx * 0.5, 4, pondY, rx);
    fade.addColorStop(0, "rgba(0, 0, 0, 0)");
    fade.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = fade;
    ctx.fillRect(4 - rx, pondY - ry0, rx * 2, ry0 * 2);
    ctx.restore();
  } else {
    const pond = ctx.createRadialGradient(4, pondY, 14 * scale, 4, pondY, rx);
    pond.addColorStop(0, "rgba(70, 122, 132, 0.92)");
    pond.addColorStop(0.7, "rgba(52, 102, 114, 0.82)");
    pond.addColorStop(1, "rgba(52, 102, 114, 0)");
    ctx.fillStyle = pond;
    ctx.beginPath();
    ctx.ellipse(4, pondY, rx, ry0, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(206, 238, 229, 0.3)";
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 4; i += 1) {
    const ry = pondY - 12 * scale + i * 12 * scale + Math.sin(time * 1.6 + i) * 2.5;
    ctx.beginPath();
    ctx.moveTo(-150 * scale, ry);
    ctx.bezierCurveTo(-50 * scale, ry - 7, 72 * scale, ry + 6, 172 * scale, ry - 5);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWaterWheel(ctx, target, time, powerLevel) {
  const wheelImage = sprites.world.waterWheel;
  if (imageReady(wheelImage)) {
    drawWaterWheelImage(ctx, wheelImage, target, time, powerLevel);
    return;
  }

  const spin = powerLevel >= 1 ? time * 1.8 : Math.sin(time * 1.6) * (0.08 + powerLevel * 0.16);

  ctx.save();
  ctx.translate(target.x, target.y);
  drawRepairHalo(ctx, target, time, powerLevel);
  ctx.fillStyle = colors.wood;
  roundedRect(ctx, 44, -70, 178, 142, 12);
  ctx.fill();
  ctx.fillStyle = "#4a3629";
  ctx.beginPath();
  ctx.moveTo(34, -70);
  ctx.lineTo(132, -128);
  ctx.lineTo(232, -70);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = colors.copper;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(164, -12);
  ctx.bezierCurveTo(205, -2, 224, 30, 246, 66);
  ctx.stroke();
  ctx.save();
  ctx.rotate(spin);
  ctx.strokeStyle = "#4b3326";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(0, 0, 92, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, 74, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 12; i += 1) {
    ctx.rotate(Math.PI / 6);
    ctx.strokeStyle = i === 3 && powerLevel < 1 ? "#2d2521" : "#5a3b2b";
    ctx.lineWidth = i === 3 && powerLevel < 1 ? 5 : 7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(82, 0);
    ctx.stroke();
    ctx.fillStyle = "#6f5137";
    ctx.fillRect(74, -10, 28, 20);
  }
  ctx.fillStyle = colors.copper;
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  if (powerLevel < 1) {
    drawWheelDamage(ctx);
  }
  drawWheelWater(ctx, time);
  ctx.fillStyle = `rgba(255, 221, 120, ${0.28 + powerLevel * 0.5})`;
  ctx.beginPath();
  ctx.arc(78, 62, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWheelDamage(ctx) {
  ctx.strokeStyle = "#21201d";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-55, -52);
  ctx.lineTo(-28, -22);
  ctx.moveTo(-64, -18);
  ctx.lineTo(-30, -42);
  ctx.stroke();
}

function drawWheelWater(ctx, time) {
  ctx.strokeStyle = "rgba(202, 232, 229, 0.64)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(-74 + i * 28, 96 + Math.sin(time * 2 + i) * 4);
    ctx.bezierCurveTo(-62 + i * 28, 108, -38 + i * 28, 84, -22 + i * 28, 98);
    ctx.stroke();
  }
}

function drawRootPump(ctx, target, time, powerLevel) {
  const pulse = 0.7 + Math.sin(time * 3.2) * 0.12;

  const pumpImage = sprites.world.rootPump;
  if (imageReady(pumpImage)) {
    const groundY = target.y + 40;
    const height = 300;
    const { width } = drawWorldSprite(ctx, pumpImage, target.x, groundY, height);
    drawRootPumpGroundBlend(ctx, target.x, groundY, width, time);
    warmGlow(ctx, target.x, groundY - height * 0.5, width * 0.55, (0.3 + powerLevel * 0.55) * pulse);
    return;
  }

  ctx.save();
  ctx.translate(target.x, target.y);
  ctx.fillStyle = "#47634a";
  roundedRect(ctx, -58, -36, 116, 72, 18);
  ctx.fill();
  ctx.strokeStyle = colors.copper;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 229, 141, ${0.3 + powerLevel * 0.48})`;
  ctx.lineWidth = 4 + powerLevel * 5;
  for (let i = 0; i < 5; i += 1) {
    const angle = (Math.PI * 2 * i) / 5 + time * 0.12;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 28, Math.sin(angle) * 18);
    ctx.quadraticCurveTo(Math.cos(angle) * 86, Math.sin(angle) * 46, Math.cos(angle) * 150, Math.sin(angle) * 64);
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(0, 0, 12, 0, 0, 150 + powerLevel * 80);
  glow.addColorStop(0, `rgba(255, 229, 141, ${powerLevel * 0.28 * pulse})`);
  glow.addColorStop(1, "rgba(255, 229, 141, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, 150 + powerLevel * 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `rgba(255, 229, 141, ${0.36 + powerLevel * 0.54})`;
  ctx.beginPath();
  ctx.arc(0, 0, 13 + powerLevel * 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRootPumpGroundBlend(ctx, x, groundY, width, time) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";

  const shadow = ctx.createRadialGradient(x, groundY - 8, 8, x, groundY - 8, width * 0.48);
  shadow.addColorStop(0, "rgba(12, 20, 17, 0.58)");
  shadow.addColorStop(0.68, "rgba(12, 20, 17, 0.42)");
  shadow.addColorStop(1, "rgba(12, 20, 17, 0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(x, groundY - 4, width * 0.48, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(58, 82, 35, ${0.42 + Math.sin(time * 2.1) * 0.04})`;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i += 1) {
    const offset = -width * 0.34 + i * width * 0.17;
    ctx.beginPath();
    ctx.moveTo(x + offset, groundY - 12 + Math.sin(time + i) * 2);
    ctx.quadraticCurveTo(x + offset + width * 0.08, groundY - 20, x + offset + width * 0.18, groundY - 11);
    ctx.stroke();
  }

  ctx.restore();
}

function drawFoliageSprite(ctx, foliage, time) {
  const image = sprites.world[foliage.kind];
  if (!imageReady(image)) {
    return;
  }

  drawPlacedSprite(ctx, image, {
    x: foliage.x,
    groundY: foliage.groundY,
    height: foliage.height,
    float: foliage.float ?? 0
  }, time, foliage.alpha ?? 0.96);
}

function drawRepairMarker(ctx, target, time, powerLevel) {
  const pulse = 0.65 + Math.sin(time * 3.4) * 0.12;

  ctx.save();
  ctx.translate(target.x, target.y);
  const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
  glow.addColorStop(0, `rgba(255, 229, 141, ${(0.16 + powerLevel * 0.32) * pulse})`);
  glow.addColorStop(1, "rgba(255, 229, 141, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, 120, 0, Math.PI * 2);
  ctx.fill();

  // The real landmark art now stands here, so the marker is just a soft
  // "look here" highlight — only fall back to a drawn node if no art loaded.
  if (!imageReady(sprites.world.switchyardBox) && !imageReady(sprites.world.stormGauge) && !imageReady(sprites.world.beaconTower)) {
    ctx.fillStyle = "#5f4832";
    roundedRect(ctx, -34, -32, 68, 64, 12);
    ctx.fill();
    ctx.strokeStyle = colors.copper;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = `rgba(255, 229, 141, ${0.32 + powerLevel * 0.58})`;
    ctx.beginPath();
    ctx.arc(0, -2, 15 + powerLevel * 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawRepairHalo(ctx, target, time, powerLevel) {
  if (powerLevel <= 0 || target.complete) {
    return;
  }

  const radius = 126 + Math.sin(time * 6) * 8;
  const halo = ctx.createRadialGradient(0, 0, 40, 0, 0, radius);
  halo.addColorStop(0, `rgba(255, 221, 120, ${powerLevel * 0.22})`);
  halo.addColorStop(1, "rgba(255, 221, 120, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawCompletionPulse(ctx, target, celebrationTimer) {
  if (celebrationTimer <= 0) {
    return;
  }

  const progress = 1 - celebrationTimer / 1.6;
  const radius = 110 + progress * 310;
  ctx.save();
  ctx.translate(target.x, target.y);
  ctx.strokeStyle = `rgba(255, 232, 166, ${(1 - progress) * 0.58})`;
  ctx.lineWidth = 10 - progress * 7;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawLamp(ctx, lamp, time, powerLevel) {
  const lit = lamp.lit || powerLevel > 0.95;
  const glow = lit ? 0.72 + Math.sin(time * 4 + lamp.x) * 0.08 : 0.22 + powerLevel * 0.34;

  const lampImage = sprites.world.lamp;
  if (imageReady(lampImage)) {
    const groundY = lamp.y + 92;
    const height = 172;
    drawWorldSprite(ctx, lampImage, lamp.x, groundY, height);
    warmGlow(ctx, lamp.x, groundY - height * 0.8, 76, glow * (0.92 + Math.sin(time * 4.4 + lamp.x * 0.01) * 0.08));
    return;
  }

  ctx.save();
  ctx.translate(lamp.x, lamp.y);
  ctx.strokeStyle = "#3f342b";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 90);
  ctx.lineTo(0, 10);
  ctx.quadraticCurveTo(0, -18, 28, -18);
  ctx.stroke();
  ctx.fillStyle = "#5f4832";
  ctx.beginPath();
  ctx.arc(30, -17, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 216, 135, ${glow})`;
  ctx.beginPath();
  ctx.arc(30, -17, 10, 0, Math.PI * 2);
  ctx.fill();
  if (lit) {
    const glowPulse = 0.9 + Math.sin(time * 4.4 + lamp.x * 0.01) * 0.1;
    const gradient = ctx.createRadialGradient(30, -17, 6, 30, -17, 96);
    gradient.addColorStop(0, `rgba(255, 223, 145, ${0.42 * glowPulse})`);
    gradient.addColorStop(0.36, `rgba(255, 181, 82, ${0.18 * glowPulse})`);
    gradient.addColorStop(1, "rgba(255, 181, 82, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(30, -17, 96, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawBrokenBranch(ctx, branch) {
  const branchImage = sprites.world.brokenBranch;
  if (imageReady(branchImage)) {
    const width = 178;
    const height = width * (branchImage.naturalHeight / branchImage.naturalWidth);
    ctx.save();
    ctx.translate(branch.x, branch.y);
    ctx.rotate(branch.rotation);
    ctx.drawImage(branchImage, -width / 2, -height * 0.62, width, height);
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.translate(branch.x, branch.y);
  ctx.rotate(branch.rotation);
  ctx.strokeStyle = "#473426";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-42, 0);
  ctx.lineTo(44, 0);
  ctx.moveTo(2, -2);
  ctx.lineTo(24, -28);
  ctx.moveTo(-14, 1);
  ctx.lineTo(-34, -20);
  ctx.stroke();
  ctx.restore();
}

function drawGlowPlant(ctx, plant, time, powerLevel) {
  const glow = plant.active ? 0.65 + Math.sin(time * 3 + plant.x) * 0.1 : 0.24 + powerLevel * 0.3;

  const plantImage = sprites.world.glowPlant;
  if (imageReady(plantImage)) {
    const groundY = plant.y + 28;
    const height = 96;
    drawWorldSprite(ctx, plantImage, plant.x, groundY, height);
    warmGlow(ctx, plant.x, groundY - height * 0.5, 50, glow);
    return;
  }

  ctx.save();
  ctx.translate(plant.x, plant.y);
  ctx.strokeStyle = "#345b42";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 28);
  ctx.quadraticCurveTo(-10, 0, -24, -18);
  ctx.moveTo(0, 28);
  ctx.quadraticCurveTo(8, 2, 28, -12);
  ctx.stroke();
  ctx.fillStyle = colors.leaf;
  ctx.beginPath();
  ctx.ellipse(-27, -21, 16, 8, -0.4, 0, Math.PI * 2);
  ctx.ellipse(31, -14, 16, 8, 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 229, 141, ${glow})`;
  ctx.beginPath();
  ctx.arc(0, -22, plant.active ? 11 : 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRepairPart(ctx, part, time) {
  const partImage = sprites.world[part.type] || sprites.world.gear;
  if (imageReady(partImage)) {
    const size = 52;
    const height = size * (partImage.naturalHeight / partImage.naturalWidth);
    // Parts rest on the ground (no float, no spin) now that they are real props.
    ctx.drawImage(partImage, part.x - size / 2, part.y - height / 2, size, height);
    return;
  }

  ctx.save();
  ctx.translate(part.x, part.y + Math.sin(time * 2 + part.x) * 3);
  if (part.type === "gear") {
    drawGear(ctx);
  } else if (part.type === "coil") {
    drawCoil(ctx);
  } else {
    drawSeedBattery(ctx, time);
  }
  ctx.restore();
}

function drawGear(ctx) {
  ctx.fillStyle = colors.brass;
  ctx.beginPath();
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? 20 : 15;
    const angle = (Math.PI * 2 * i) / 16;
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#55402f";
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.fill();
}

function drawCoil(ctx) {
  ctx.strokeStyle = colors.copper;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i < 5; i += 1) {
    ctx.moveTo(-22 + i * 11, -14);
    ctx.quadraticCurveTo(-17 + i * 11, 0, -22 + i * 11, 14);
  }
  ctx.stroke();
}

function drawSeedBattery(ctx, time) {
  ctx.fillStyle = "#426d4d";
  roundedRect(ctx, -16, -24, 32, 48, 14);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 230, 140, ${0.76 + Math.sin(time * 3) * 0.1})`;
  ctx.beginPath();
  ctx.ellipse(0, -2, 11, 20, 0, 0, Math.PI * 2);
  ctx.fill();
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
