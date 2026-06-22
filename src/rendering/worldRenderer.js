import { config } from "../core/config.js";
import { sprites, imageReady } from "./sprites.js";

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
  if (activeRepair && !["water-wheel", "root-pump", "archive-lens-array"].includes(activeRepair.id)) {
    drawRepairMarker(ctx, activeRepair, time, powerLevel);
  }
  if (activeRepair) {
    drawCompletionPulse(ctx, activeRepair, scene.flow.celebrationTimer);
  }
  scene.layers.lamps.forEach((lamp) => drawLamp(ctx, lamp, time, powerLevel));
  scene.layers.brokenBranches.forEach((branch) => drawBrokenBranch(ctx, branch));
  scene.layers.glowPlants.forEach((plant) => drawGlowPlant(ctx, plant, time, powerLevel));
  scene.layers.repairParts.forEach((part) => drawRepairPart(ctx, part, time));
  scene.layers.foliage?.forEach((foliage) => drawFoliageSprite(ctx, foliage, time));
  drawSignpost(ctx, scene, time, powerLevel);
  ctx.restore();
}

// A wooden "this way out" signpost standing near the right edge of each scene.
function drawSignpost(ctx, scene, time, powerLevel) {
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
  switchyard.poles.forEach((pole) => {
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
  const shedImage = sprites.world.shed;
  if (beaconHill.shed && imageReady(shedImage)) {
    const shed = beaconHill.shed;
    const groundY = shed.y + 96;
    const height = 420;
    const { width } = drawWorldSprite(ctx, shedImage, shed.x, groundY, height);
    warmGlow(ctx, shed.x - width * 0.12, groundY - height * 0.45, 56, shed.lit ? 0.5 + Math.sin(time * 3.2) * 0.07 : 0.18);
  }

  const tower = beaconHill.tower;
  const towerImage = sprites.world.beaconTower;
  if (imageReady(towerImage)) {
    const groundY = tower.y + 84;
    const height = 620;
    drawWorldSprite(ctx, towerImage, tower.x, groundY, height);
    warmGlow(ctx, tower.x, groundY - height * 0.86, 70, tower.lit ? 0.7 + Math.sin(time * 4) * 0.08 : 0.26);
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
    // Wet-path reflection beneath the lamp (drawn first, under the post).
    drawWetReflection(ctx, lamp.x, groundY - 6, 150, glow * (lit ? 1 : 0.25));
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
