export function drawHud(ctx, scene, width, height) {
  drawTitle(ctx, scene);
  drawDialogueBubble(ctx, scene, width);
  drawReactionBubbles(ctx, scene, width);
  drawMessage(ctx, scene.flow.message, width, height);

  if (scene.repairTarget && scene.flow.mode === "puzzle") {
    drawPuzzlePrompt(ctx, scene.repairTarget, width, height);
    if (scene.repairTarget.kind === "path-puzzle" && scene.repairTarget.puzzle) {
      drawPathPuzzle(ctx, scene.repairTarget.puzzle, width, height);
    }
  }

  if (scene.flow.mode === "reward" && scene.flow.celebrationTimer > 0) {
    drawCompletionBadge(ctx, scene.flow.celebrationTimer, width);
  }
}

function drawReactionBubbles(ctx, scene, width) {
  scene.reactionBubbles.forEach((bubble) => {
    const anchor = resolveBubbleAnchor(scene, bubble);
    const screenX = clamp(anchor.x - scene.camera.x, 130, width - 130);
    const screenY = Math.max(96, anchor.y - 56);
    const alpha = Math.min(1, bubble.timer / 0.4);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(22, 31, 30, 0.66)";
    roundedRect(ctx, screenX - 120, screenY - 34, 240, 42, 8);
    ctx.fill();
    ctx.fillStyle = "rgba(250, 240, 210, 0.94)";
    ctx.font = "600 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    wrapText(ctx, bubble.text, screenX, screenY - 12, 210, 17);
    ctx.restore();
  });
}

function resolveBubbleAnchor(scene, bubble) {
  if (bubble.x === "robot") {
    return { x: scene.robot.x, y: scene.robot.y - 48 };
  }

  return { x: bubble.x, y: bubble.y };
}

function drawDialogueBubble(ctx, scene, width) {
  if (!scene.dialogue.text || scene.dialogue.timer <= 0) {
    return;
  }

  const anchor = scene.dialogue.speaker === "player" ? scene.player : scene.robot;
  const screenX = clamp(anchor.x - scene.camera.x, 160, width - 160);
  const screenY = scene.dialogue.speaker === "player" ? anchor.y - 170 : anchor.y - 90;
  const bubbleWidth = 300;
  const bubbleHeight = 58;
  const left = screenX - bubbleWidth / 2;
  const top = Math.max(88, screenY - bubbleHeight);
  const alpha = Math.min(1, scene.dialogue.timer / 0.35);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(22, 31, 30, 0.72)";
  roundedRect(ctx, left, top, bubbleWidth, bubbleHeight, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 232, 166, 0.38)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(250, 240, 210, 0.96)";
  ctx.font = "600 15px system-ui, sans-serif";
  ctx.textAlign = "left";
  wrapText(ctx, scene.dialogue.text, left + 18, top + 24, bubbleWidth - 36, 19);
  ctx.restore();
}

function drawTitle(ctx, scene) {
  ctx.fillStyle = "rgba(20, 30, 28, 0.42)";
  roundedRect(ctx, 28, 28, 310, 50, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(242, 229, 186, 0.92)";
  ctx.font = "600 22px system-ui, sans-serif";
  ctx.fillText(scene.title, 48, 60);
}

function drawMessage(ctx, message, width, height) {
  ctx.fillStyle = "rgba(20, 30, 28, 0.58)";
  roundedRect(ctx, 222, height - 104, width - 444, 68, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(245, 235, 205, 0.94)";
  ctx.font = "500 19px system-ui, sans-serif";
  ctx.textAlign = "center";
  wrapText(ctx, message, width / 2, height - 76, width - 500, 24);
  ctx.textAlign = "left";
}

function drawPuzzlePrompt(ctx, target, width, height) {
  ctx.fillStyle = "rgba(255, 224, 138, 0.18)";
  roundedRect(ctx, width / 2 - 190, height / 2 - 64, 380, 128, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 224, 138, 0.72)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 239, 196, 0.96)";
  ctx.font = "700 22px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(getPuzzleTitle(target), width / 2, height / 2 - 28);
  ctx.font = "500 16px system-ui, sans-serif";
  ctx.fillText(getPuzzleHint(target), width / 2, height / 2 - 2);
  if (target.kind === "path-puzzle") {
    ctx.font = "500 14px system-ui, sans-serif";
    ctx.fillText("Arrows choose tile, Space rotates", width / 2, height / 2 + 28);
  } else if (target.kind === "timed-tap") {
    drawTimingMeter(ctx, target, width, height);
  } else {
    drawChargeMeter(ctx, target.progress, width, height);
  }
  ctx.textAlign = "left";
}

function getPuzzleHint(target) {
  if (target.kind === "path-puzzle") {
    return "route light through the board";
  }
  return target.kind === "timed-tap" ? "when the spark hits gold" : "to route power";
}

function getPuzzleTitle(target) {
  if (target.kind === "path-puzzle") {
    return "Rotate Paths";
  }
  return target.kind === "timed-tap" ? "Tap Space" : "Hold Space";
}

function drawChargeMeter(ctx, progress, width, height) {
  ctx.fillStyle = "rgba(32, 42, 36, 0.7)";
  roundedRect(ctx, width / 2 - 118, height / 2 + 28, 236, 15, 7);
  ctx.fill();
  ctx.fillStyle = "rgba(143, 217, 240, 0.9)";
  roundedRect(ctx, width / 2 - 116, height / 2 + 30, 232 * progress, 11, 6);
  ctx.fill();
}

function drawTimingMeter(ctx, target, width, height) {
  const meterX = width / 2 - 130;
  const meterY = height / 2 + 24;
  const meterWidth = 260;
  const zoneX = meterX + meterWidth * target.successMin;
  const zoneWidth = meterWidth * (target.successMax - target.successMin);
  const sparkX = meterX + meterWidth * target.sparkPhase;

  ctx.fillStyle = "rgba(32, 42, 36, 0.72)";
  roundedRect(ctx, meterX, meterY, meterWidth, 16, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 224, 138, 0.82)";
  roundedRect(ctx, zoneX, meterY - 3, zoneWidth, 22, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(143, 217, 240, 0.95)";
  ctx.beginPath();
  ctx.arc(sparkX, meterY + 8, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(245, 235, 205, 0.9)";
  ctx.font = "600 14px system-ui, sans-serif";
  ctx.fillText(`${target.hits}/${target.requiredHits} tuned`, width / 2, height / 2 + 60);
}

function drawPathPuzzle(ctx, puzzle, width, height) {
  const tileSize = 48;
  const gap = 7;
  const boardWidth = puzzle.cols * tileSize + (puzzle.cols - 1) * gap;
  const startX = width / 2 - boardWidth / 2;
  const startY = height / 2 + 86;

  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(20, 30, 28, 0.62)";
  roundedRect(ctx, width / 2 - 150, startY - 42, 300, 214, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 239, 196, 0.94)";
  ctx.font = "700 15px system-ui, sans-serif";
  ctx.fillText(puzzle.title, width / 2, startY - 16);

  puzzle.tiles.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const x = startX + colIndex * (tileSize + gap);
      const y = startY + rowIndex * (tileSize + gap);
      const key = `${rowIndex},${colIndex}`;
      const selected = puzzle.selected.row === rowIndex && puzzle.selected.col === colIndex;
      const lit = puzzle.connected.has(key);
      drawPuzzleTile(ctx, tile, x, y, tileSize, selected, lit);
    });
  });
  ctx.restore();
}

function drawPuzzleTile(ctx, tile, x, y, size, selected, lit) {
  ctx.fillStyle = lit ? "rgba(73, 103, 91, 0.95)" : "rgba(79, 56, 43, 0.95)";
  roundedRect(ctx, x, y, size, size, 7);
  ctx.fill();
  ctx.strokeStyle = selected ? "rgba(255, 232, 166, 0.95)" : "rgba(255, 232, 166, 0.18)";
  ctx.lineWidth = selected ? 3 : 1.5;
  ctx.stroke();

  if (tile.type === "blank") {
    return;
  }

  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  ctx.rotate(tile.rotation * Math.PI * 0.5);
  ctx.strokeStyle = lit ? "rgba(255, 224, 138, 0.98)" : "rgba(201, 121, 69, 0.9)";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  if (tile.type === "line" || tile.type === "start" || tile.type === "output") {
    ctx.moveTo(-size * 0.32, 0);
    ctx.lineTo(size * 0.32, 0);
  }
  if (tile.type === "turn") {
    ctx.moveTo(0, size * 0.28);
    ctx.quadraticCurveTo(0, 0, size * 0.28, 0);
  }
  if (tile.type === "tee") {
    ctx.moveTo(-size * 0.3, 0);
    ctx.lineTo(size * 0.3, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, size * 0.3);
  }
  ctx.stroke();
  if (tile.type === "start" || tile.type === "output") {
    ctx.fillStyle = lit ? "rgba(255, 232, 166, 0.95)" : "rgba(143, 217, 240, 0.72)";
    ctx.beginPath();
    ctx.arc(tile.type === "start" ? -size * 0.28 : size * 0.28, 0, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCompletionBadge(ctx, celebrationTimer, width) {
  const alpha = Math.min(1, celebrationTimer / 0.5);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(20, 30, 28, 0.52)";
  roundedRect(ctx, width / 2 - 132, 112, 264, 48, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 232, 166, 0.62)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 239, 196, 0.96)";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Repair Complete", width / 2, 143);
  ctx.textAlign = "left";
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lineY = y;

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, lineY);
      line = word;
      lineY += lineHeight;
      return;
    }

    line = testLine;
  });

  ctx.fillText(line, x, lineY);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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
