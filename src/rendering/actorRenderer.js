import { config } from "../core/config.js";
import { sprites, imageReady } from "./sprites.js";

const { colors } = config;

// On-screen sizes for the painted art.
const PLAYER_HEIGHT = 232;
const ROBOT_WIDTH = 56;

export function drawActors(ctx, scene, time, cameraX) {
  ctx.save();
  ctx.translate(-cameraX, 0);
  drawRepairBeam(ctx, scene, time);
  drawPlayer(ctx, scene.player, time);
  drawRobot(ctx, scene.robot, time);
  ctx.restore();
}

function drawPlayer(ctx, player, time) {
  const frame = pickPlayerFrame(player, time);
  if (!imageReady(frame.image)) {
    drawPlayerVector(ctx, player, time);
    return;
  }

  const celebrating = player.reaction === "cheer";
  const cheerLift = celebrating ? Math.sin(player.reactionTimer * Math.PI * 5) * 5 - 7 : 0;
  const bob = cheerLift; // no idle float; only the celebration hop lifts the boy
  const footY = player.y + 88;
  const actorScale = player.scale ?? 1;
  const playerHeight = PLAYER_HEIGHT * actorScale;

  // Soft contact shadow, unaffected by the sprite flip.
  ctx.save();
  ctx.fillStyle = "rgba(22, 27, 24, 0.28)";
  ctx.beginPath();
  ctx.ellipse(player.x, player.y + 86, 50 * actorScale, 12 * actorScale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const scale = playerHeight / frame.image.naturalHeight;
  const drawW = frame.image.naturalWidth * scale;
  const drawH = playerHeight;
  const flip = player.facing * frame.facing;

  ctx.save();
  ctx.translate(player.x, footY + bob);
  ctx.scale(flip, 1);
  ctx.drawImage(frame.image, -drawW / 2, -drawH, drawW, drawH);
  ctx.restore();
}

// Walk cycle is just two frames: a walking pose and the standing pose,
// alternating (step, stand, step, stand). Both the idle and walk-2 art face
// right (+1), so they never flip direction mid-walk.
function pickPlayerFrame(player, time) {
  if (!player.walking) {
    return { image: sprites.apprentice.idle, facing: 1 };
  }

  const stepFrame = Math.floor(time * 6) % 2 === 0;
  return stepFrame
    ? { image: sprites.apprentice.walk2, facing: 1 }
    : { image: sprites.apprentice.idle, facing: 1 };
}

function drawRobot(ctx, robot, time) {
  const celebrating = robot.pose === "celebrate";
  const active = robot.pose === "scan" || robot.pose === "route" || celebrating;
  const hover = Math.sin(time * (celebrating ? 5.4 : 2.6)) * (celebrating ? 12 : 8);
  const image = active ? sprites.robot.scan : sprites.robot.idle;
  const robotWidth = ROBOT_WIDTH * (robot.scale ?? 1);

  if (!imageReady(image)) {
    drawRobotVector(ctx, robot, time);
    return;
  }

  ctx.save();
  ctx.translate(robot.x, robot.y + hover);

  // Glow halo behind the robot, brighter when it is working. Sized off the
  // robot so the halo stays tight as the sprite scales.
  const pulse = celebrating ? 0.42 : active ? 0.34 : 0.22;
  const reach = robotWidth * (active ? 1.05 : 0.72);
  const glow = ctx.createRadialGradient(0, 0, 12, 0, 0, reach);
  glow.addColorStop(0, `rgba(143, 217, 240, ${pulse})`);
  glow.addColorStop(1, "rgba(143, 217, 240, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, reach, 0, Math.PI * 2);
  ctx.fill();

  const scale = robotWidth / image.naturalWidth;
  const drawW = robotWidth;
  const drawH = image.naturalHeight * scale;
  // Anchor each pose by where the robot's BODY sits in the image, so the body
  // stays centered on robot.y while the scan beam hangs below it.
  const bodyAnchor = active ? 0.34 : 0.46;
  ctx.drawImage(image, -drawW / 2, -drawH * bodyAnchor, drawW, drawH);

  if (celebrating) {
    drawRobotSparkles(ctx, time);
  }
  ctx.restore();
}

function drawRepairBeam(ctx, scene, time) {
  if (!scene.repairTarget || scene.flow.mode !== "puzzle" || scene.repairTarget.complete) {
    return;
  }

  const pulse = 0.45 + Math.sin(time * 12) * 0.12;
  const progress = scene.repairTarget.progress;
  ctx.strokeStyle = `rgba(143, 217, 240, ${0.2 + progress * pulse})`;
  ctx.lineWidth = 3 + progress * 8;
  ctx.lineCap = "round";
  ctx.setLineDash([14, 12]);
  ctx.lineDashOffset = -time * 70;
  ctx.beginPath();
  ctx.moveTo(scene.robot.x - 8, scene.robot.y + 6);
  ctx.quadraticCurveTo(scene.robot.x + 90, scene.robot.y - 55, scene.repairTarget.x, scene.repairTarget.y);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPlayerVector(ctx, player, time) {
  const step = player.walking ? Math.sin(time * 10) * 8 : 0;
  const celebrating = player.reaction === "cheer";
  const cheerLift = celebrating ? Math.sin(player.reactionTimer * Math.PI * 5) * 5 - 7 : 0;
  const bob = cheerLift; // no idle float; only the celebration hop lifts the boy

  ctx.save();
  ctx.translate(player.x, player.y + bob);
  ctx.scale(player.facing, 1);
  ctx.fillStyle = "rgba(22, 27, 24, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 86, 52, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#273138";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-16, 36);
  ctx.lineTo(-24 - step, 72);
  ctx.moveTo(15, 36);
  ctx.lineTo(24 + step, 72);
  ctx.stroke();
  ctx.strokeStyle = "#273138";
  ctx.lineWidth = 10;
  ctx.beginPath();
  if (celebrating) {
    ctx.moveTo(-28, -4);
    ctx.lineTo(-52, -38);
    ctx.moveTo(28, -4);
    ctx.lineTo(52, -38);
  } else {
    ctx.moveTo(-28, -4);
    ctx.lineTo(-42, 28);
    ctx.moveTo(28, -4);
    ctx.lineTo(42, 28);
  }
  ctx.stroke();
  ctx.fillStyle = colors.characterBlue;
  roundedRect(ctx, -32, -34, 64, 82, 18);
  ctx.fill();
  ctx.fillStyle = "#d9b16b";
  roundedRect(ctx, -25, -24, 50, 66, 12);
  ctx.fill();
  ctx.strokeStyle = "#38505c";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-26, -20);
  ctx.lineTo(24, 38);
  ctx.moveTo(26, -20);
  ctx.lineTo(-24, 38);
  ctx.stroke();
  drawToolKit(ctx);
  drawLantern(ctx, time);
  ctx.fillStyle = "#dca56f";
  ctx.beginPath();
  ctx.ellipse(0, -68, 28, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = colors.characterCap;
  ctx.fillRect(-27, -94, 54, 18);
  ctx.beginPath();
  ctx.ellipse(0, -94, 31, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#334750";
  ctx.beginPath();
  ctx.ellipse(27, -88, 24, 8, 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#243035";
  ctx.beginPath();
  ctx.arc(-9, -68, 3, 0, Math.PI * 2);
  ctx.arc(10, -68, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#7b4d39";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(2, -58, 9, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.restore();
}

function drawToolKit(ctx) {
  ctx.fillStyle = "#62412c";
  roundedRect(ctx, -52, 24, 28, 24, 6);
  ctx.fill();
  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 3;
  ctx.strokeRect(-47, 29, 18, 12);
}

function drawLantern(ctx, time) {
  const glow = 0.72 + Math.sin(time * 3) * 0.1;
  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(55, 8);
  ctx.lineTo(74, 34);
  ctx.stroke();
  ctx.fillStyle = colors.brass;
  roundedRect(ctx, 60, 28, 32, 42, 8);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 231, 150, ${glow})`;
  roundedRect(ctx, 67, 36, 18, 24, 5);
  ctx.fill();
}

function drawRobotVector(ctx, robot, time) {
  const celebrating = robot.pose === "celebrate";
  const hover = Math.sin(time * (celebrating ? 5.4 : 2.6)) * (celebrating ? 12 : 8);
  const active = robot.pose === "scan" || robot.pose === "route" || celebrating;
  const pulse = celebrating ? 0.42 : active ? 0.34 : 0.22;

  ctx.save();
  ctx.translate(robot.x, robot.y + hover);
  const glow = ctx.createRadialGradient(0, 0, 12, 0, 0, active ? 110 : 70);
  glow.addColorStop(0, `rgba(143, 217, 240, ${pulse})`);
  glow.addColorStop(1, "rgba(143, 217, 240, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, active ? 110 : 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = colors.robotBody;
  roundedRect(ctx, -38, -28, 76, 58, 22);
  ctx.fill();
  ctx.strokeStyle = "#7b9696";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "#eef8f3";
  roundedRect(ctx, -25, -17, 50, 30, 10);
  ctx.fill();
  ctx.fillStyle = "#293b40";
  roundedRect(ctx, -20, -12, 40, 21, 8);
  ctx.fill();
  ctx.fillStyle = colors.robotBlue;
  ctx.beginPath();
  ctx.arc(-10, -2, 4, 0, Math.PI * 2);
  ctx.arc(10, -2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = colors.robotBlue;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 5, 8, 0.2, Math.PI - 0.2);
  ctx.stroke();
  drawRobotAntenna(ctx, time);
  drawRobotArms(ctx, time, celebrating);
  if (celebrating) {
    drawRobotSparkles(ctx, time);
  }
  ctx.restore();
}

function drawRobotAntenna(ctx, time) {
  const tipX = Math.sin(time * 2) * 5;
  ctx.strokeStyle = "#7b9696";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, -30);
  ctx.lineTo(tipX, -51);
  ctx.stroke();
  ctx.fillStyle = colors.robotBlue;
  ctx.beginPath();
  ctx.arc(tipX, -55, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawRobotArms(ctx, time, celebrating) {
  ctx.strokeStyle = "#9ab0ad";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-38, -2);
  ctx.lineTo(-54, celebrating ? -16 : 8 + Math.sin(time * 3) * 4);
  ctx.moveTo(38, -2);
  ctx.lineTo(54, celebrating ? -24 : -12 + Math.sin(time * 3 + 1) * 4);
  ctx.stroke();
}

function drawRobotSparkles(ctx, time) {
  ctx.strokeStyle = "rgba(255, 232, 166, 0.86)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i += 1) {
    const angle = time * 2.8 + i * Math.PI * 0.5;
    const x = Math.cos(angle) * 58;
    const y = Math.sin(angle) * 34 - 6;
    ctx.beginPath();
    ctx.moveTo(x - 5, y);
    ctx.lineTo(x + 5, y);
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x, y + 5);
    ctx.stroke();
  }
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
