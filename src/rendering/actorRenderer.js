import { config } from "../core/config.js";

const { colors } = config;

export function drawActors(ctx, scene, time, cameraX) {
  ctx.save();
  ctx.translate(-cameraX, 0);
  drawRepairBeam(ctx, scene, time);
  drawPlayer(ctx, scene.player, time);
  drawRobot(ctx, scene.robot, time);
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

function drawPlayer(ctx, player, time) {
  const step = player.walking ? Math.sin(time * 10) * 8 : 0;
  const celebrating = player.reaction === "cheer";
  const cheerLift = celebrating ? Math.sin(player.reactionTimer * Math.PI * 5) * 5 - 7 : 0;
  const bob = Math.sin(time * 2.2) * 2 + cheerLift;

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

function drawRobot(ctx, robot, time) {
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
