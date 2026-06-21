export function drawHud(ctx, scene, width, height) {
  if (scene.repairTarget && (scene.flow.mode === "puzzle" || scene.flow.mode === "puzzle-complete")) {
    drawRepairOverlay(ctx, scene.repairTarget, width, height);
    return;
  }

  drawTitle(ctx, scene);
  const occupiedBubbles = [{ x: 28, y: 28, width: 310, height: 50 }];
  drawDialogueBubble(ctx, scene, width, height, occupiedBubbles);
  drawReactionBubbles(ctx, scene, width, height, occupiedBubbles);
  drawMessage(ctx, scene.flow.message, width, height);
  drawContinuePrompt(ctx, scene, width, height);

  if (scene.chapterComplete) {
    drawChapterComplete(ctx, scene.chapterComplete, width, height);
    return;
  }

  if (scene.flow.mode === "reward" && scene.flow.celebrationTimer > 0) {
    drawCompletionBadge(ctx, scene.flow.celebrationTimer, width);
  }
}

function drawChapterComplete(ctx, chapterComplete, width, height) {
  const panelWidth = 520;
  const panelHeight = 390;
  const left = width / 2 - panelWidth / 2;
  const top = height / 2 - panelHeight / 2;

  ctx.save();
  ctx.fillStyle = "rgba(12, 22, 21, 0.72)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(26, 38, 34, 0.92)";
  roundedRect(ctx, left, top, panelWidth, panelHeight, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 232, 166, 0.6)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 239, 196, 0.98)";
  ctx.font = "800 30px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(chapterComplete.title, width / 2, top + 58);

  ctx.fillStyle = "rgba(210, 229, 217, 0.94)";
  ctx.font = "600 16px system-ui, sans-serif";
  wrapText(ctx, chapterComplete.subtitle, width / 2, top + 91, panelWidth - 96, 21);

  ctx.textAlign = "left";
  ctx.font = "600 16px system-ui, sans-serif";
  chapterComplete.checklist.forEach((item, index) => {
    const y = top + 142 + index * 33;
    drawCheckMark(ctx, left + 66, y - 7);
    ctx.fillStyle = "rgba(245, 235, 205, 0.94)";
    ctx.fillText(item, left + 94, y);
  });

  ctx.fillStyle = "rgba(143, 217, 240, 0.92)";
  ctx.font = "700 15px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(chapterComplete.prompt, width / 2, top + panelHeight - 35);
  ctx.restore();
}

function drawCheckMark(ctx, x, y) {
  ctx.save();
  ctx.strokeStyle = "rgba(143, 217, 240, 0.95)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x - 8, y);
  ctx.lineTo(x - 2, y + 7);
  ctx.lineTo(x + 10, y - 8);
  ctx.stroke();
  ctx.restore();
}

function drawReactionBubbles(ctx, scene, width, height, occupiedBubbles) {
  const activeBubble = scene.reactionBubbles.find((bubble) => (bubble.delay ?? 0) <= 0);

  if (!activeBubble) {
    return;
  }

  [activeBubble].forEach((bubble) => {
    const anchor = resolveBubbleAnchor(scene, bubble);
    const screenAnchor = {
      x: clamp(anchor.x - scene.camera.x, 44, width - 44),
      y: clamp(anchor.y, 80, height - 140)
    };
    const bubbleWidth = 260;
    const bubbleHeight = 50;
    const rect = placeSpeechBubble(
      {
        x: screenAnchor.x - bubbleWidth / 2,
        y: screenAnchor.y - bubbleHeight - 28,
        width: bubbleWidth,
        height: bubbleHeight
      },
      occupiedBubbles,
      width,
      height,
      screenAnchor
    );

    if (!rect) {
      return;
    }

    const alpha = Math.min(1, bubble.timer / 0.4);

    ctx.save();
    ctx.globalAlpha = alpha;
    drawSpeechBubble(ctx, rect, screenAnchor, {
      fill: "rgba(250, 240, 210, 0.95)",
      stroke: "rgba(71, 58, 43, 0.34)"
    });
    ctx.fillStyle = "rgba(38, 43, 35, 0.96)";
    ctx.font = "600 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    wrapText(ctx, bubble.text, rect.x + rect.width / 2, rect.y + 21, rect.width - 28, 17);
    ctx.restore();
    occupiedBubbles.push(rect);
  });
}

function resolveBubbleAnchor(scene, bubble) {
  if (bubble.x === "robot") {
    return { x: scene.robot.x, y: scene.robot.y - 48 };
  }

  return { x: bubble.x, y: bubble.y };
}

function drawDialogueBubble(ctx, scene, width, height, occupiedBubbles) {
  if (!scene.dialogue.text || scene.dialogue.timer <= 0) {
    return;
  }

  const anchor = scene.dialogue.speaker === "player"
    ? { x: scene.player.x, y: scene.player.y - 128 }
    : { x: scene.robot.x, y: scene.robot.y - 62 };
  const screenAnchor = {
    x: clamp(anchor.x - scene.camera.x, 54, width - 54),
    y: clamp(anchor.y, 88, height - 150)
  };
  const bubbleWidth = 360;
  const bubbleHeight = 68;
  const rect = placeSpeechBubble(
    {
      x: screenAnchor.x - bubbleWidth / 2,
      y: screenAnchor.y - bubbleHeight - 30,
      width: bubbleWidth,
      height: bubbleHeight
    },
    occupiedBubbles,
    width,
    height,
    screenAnchor
  );

  if (!rect) {
    return;
  }

  const alpha = Math.min(1, scene.dialogue.timer / 0.35);

  ctx.save();
  ctx.globalAlpha = alpha;
  drawSpeechBubble(ctx, rect, screenAnchor, {
    fill: "rgba(255, 247, 220, 0.97)",
    stroke: scene.dialogue.speaker === "player" ? "rgba(83, 127, 145, 0.5)" : "rgba(143, 217, 240, 0.48)"
  });
  ctx.fillStyle = "rgba(36, 42, 34, 0.96)";
  ctx.font = "600 15px system-ui, sans-serif";
  ctx.textAlign = "left";
  wrapText(ctx, scene.dialogue.text, rect.x + 20, rect.y + 27, rect.width - 40, 19);
  ctx.restore();
  occupiedBubbles.push(rect);
}

function placeSpeechBubble(rect, occupiedBubbles, width, height, anchor) {
  const margin = 20;
  const messageTop = height - 118;
  const positions = [
    { x: anchor.x - rect.width / 2, y: anchor.y - rect.height - 30 },
    { x: anchor.x - rect.width * 0.18, y: anchor.y - rect.height - 18 },
    { x: anchor.x - rect.width * 0.82, y: anchor.y - rect.height - 18 },
    { x: anchor.x - rect.width / 2, y: anchor.y + 22 }
  ];

  for (const position of positions) {
    const candidate = {
      ...rect,
      x: clamp(position.x, margin, width - rect.width - margin),
      y: clamp(position.y, 86, messageTop - rect.height - 14)
    };

    if (!occupiedBubbles.some((other) => rectsOverlap(candidate, other))) {
      return candidate;
    }
  }

  return null;
}

function drawSpeechBubble(ctx, rect, anchor, style) {
  const fill = style.fill ?? "rgba(255, 247, 220, 0.97)";
  const stroke = style.stroke ?? "rgba(71, 58, 43, 0.34)";
  const tailX = clamp(anchor.x, rect.x + 28, rect.x + rect.width - 28);
  const tailOnBottom = anchor.y >= rect.y + rect.height / 2;
  const tailY = tailOnBottom ? rect.y + rect.height - 2 : rect.y + 2;
  const tipY = tailOnBottom ? Math.min(anchor.y, rect.y + rect.height + 34) : Math.max(anchor.y, rect.y - 34);

  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;

  ctx.beginPath();
  if (tailOnBottom) {
    ctx.moveTo(tailX - 14, tailY);
    ctx.quadraticCurveTo(tailX - 8, tailY + 16, anchor.x, tipY);
    ctx.quadraticCurveTo(tailX + 8, tailY + 14, tailX + 14, tailY);
  } else {
    ctx.moveTo(tailX - 14, tailY);
    ctx.quadraticCurveTo(tailX - 8, tailY - 16, anchor.x, tipY);
    ctx.quadraticCurveTo(tailX + 8, tailY - 14, tailX + 14, tailY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  roundedRect(ctx, rect.x, rect.y, rect.width, rect.height, 22);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.stroke();
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
  if (!message) {
    return;
  }

  ctx.fillStyle = "rgba(20, 30, 28, 0.58)";
  roundedRect(ctx, 222, height - 104, width - 444, 68, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(245, 235, 205, 0.94)";
  ctx.font = "500 19px system-ui, sans-serif";
  ctx.textAlign = "center";
  wrapText(ctx, message, width / 2, height - 76, width - 500, 24);
  ctx.textAlign = "left";
}

function drawContinuePrompt(ctx, scene, width, height) {
  if (scene.flow.mode !== "reward" || !scene.flow.onwardPrompted) {
    return;
  }

  ctx.fillStyle = "rgba(8, 15, 17, 0.68)";
  roundedRect(ctx, width / 2 - 176, height - 30, 352, 24, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 232, 166, 0.96)";
  ctx.font = "700 13px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Press Space, Enter, or E to continue", width / 2, height - 13);
  ctx.textAlign = "left";
}

function drawRepairOverlay(ctx, target, width, height) {
  ctx.save();
  ctx.fillStyle = "rgba(8, 15, 17, 0.72)";
  ctx.fillRect(0, 0, width, height);

  if (target.kind === "path-puzzle" && target.puzzle) {
    drawPathRepairOverlay(ctx, target.puzzle, width, height);
  } else {
    drawPuzzleLoadingOverlay(ctx, width, height);
  }

  ctx.restore();
}

function drawPathRepairOverlay(ctx, puzzle, width, height) {
  const theme = puzzle.theme ?? {};
  const colors = theme.colors ?? {};
  const panelWidth = 940;
  const panelHeight = 580;
  const panelX = width / 2 - panelWidth / 2;
  const panelY = height / 2 - panelHeight / 2;
  const tileSize = 96;
  const gap = 12;
  const boardWidth = puzzle.cols * tileSize + (puzzle.cols - 1) * gap;
  const boardX = panelX + 356;
  const boardY = panelY + 152;

  roundedRect(ctx, panelX, panelY, panelWidth, panelHeight, 14);
  ctx.fillStyle = colors.panelDark ?? "rgba(31, 43, 40, 0.96)";
  ctx.fill();
  roundedRect(ctx, panelX + 22, panelY + 24, panelWidth - 44, panelHeight - 48, 12);
  ctx.fillStyle = colors.panel ?? "rgba(91, 72, 51, 0.94)";
  ctx.fill();

  ctx.fillStyle = "rgba(255, 239, 196, 0.98)";
  ctx.font = "800 30px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(theme.title ?? puzzle.title, panelX + 56, panelY + 62);

  ctx.fillStyle = "rgba(245, 235, 205, 0.82)";
  ctx.font = "600 16px system-ui, sans-serif";
  wrapText(ctx, theme.instructions ?? "Rotate the paths to complete the repair.", panelX + 56, panelY + 96, 650, 21);

  drawPuzzleSideStatus(ctx, puzzle, panelX + 66, panelY + 188, colors);
  drawPuzzleBoardFrame(ctx, boardX, boardY, boardWidth, tileSize * puzzle.rows + gap * (puzzle.rows - 1), colors);
  drawPathPuzzle(ctx, puzzle, boardX, boardY, tileSize, gap);

  if (puzzle.completed) {
    drawPuzzleSuccess(ctx, puzzle, boardX + boardWidth / 2, panelY + panelHeight - 78, colors);
  } else {
    ctx.fillStyle = "rgba(245, 235, 205, 0.86)";
    ctx.font = "700 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Arrow keys move    Space rotates", boardX + boardWidth / 2, panelY + panelHeight - 70);
  }
}

function drawPuzzleLoadingOverlay(ctx, width, height) {
  ctx.fillStyle = "rgba(20, 31, 30, 0.92)";
  roundedRect(ctx, width / 2 - 230, height / 2 - 94, 460, 188, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 232, 166, 0.54)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 239, 196, 0.98)";
  ctx.font = "800 26px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Repair Puzzle", width / 2, height / 2 - 42);
  ctx.fillStyle = "rgba(245, 235, 205, 0.86)";
  ctx.font = "600 16px system-ui, sans-serif";
  ctx.fillText("Preparing the puzzle panel...", width / 2, height / 2 - 10);
}

function drawPuzzleSideStatus(ctx, puzzle, x, y, colors) {
  const connectedCount = puzzle.connected.size;
  const totalCount = puzzle.rows * puzzle.cols;

  ctx.fillStyle = "rgba(19, 31, 31, 0.4)";
  roundedRect(ctx, x - 20, y - 34, 230, 260, 8);
  ctx.fill();

  ctx.fillStyle = colors.accent ?? "rgba(143, 217, 240, 0.9)";
  ctx.beginPath();
  ctx.arc(x + 72, y + 28, 42, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d8e2de";
  roundedRect(ctx, x + 26, y + 8, 92, 58, 18);
  ctx.fill();
  ctx.fillStyle = "#293b40";
  roundedRect(ctx, x + 43, y + 23, 58, 24, 8);
  ctx.fill();
  ctx.fillStyle = colors.accent ?? "#8fd9f0";
  ctx.beginPath();
  ctx.arc(x + 61, y + 35, 4, 0, Math.PI * 2);
  ctx.arc(x + 84, y + 35, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 239, 196, 0.98)";
  ctx.font = "800 18px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(puzzle.theme?.objective ?? "Route the glow.", x, y + 116);

  ctx.fillStyle = "rgba(245, 235, 205, 0.72)";
  ctx.font = "600 14px system-ui, sans-serif";
  if (puzzle.completed) {
    ctx.fillStyle = colors.glow ?? "rgba(255, 224, 138, 0.95)";
    ctx.fillText("Repair linked.", x, y + 146);
    ctx.fillText("Returning to the lane...", x, y + 172);
  } else {
    ctx.fillText(`${connectedCount}/${totalCount} tiles lit`, x, y + 146);
    ctx.fillText("Selected tile glows gold", x, y + 172);
    ctx.fillText("Locked ends stay fixed", x, y + 198);
  }
}

function drawPuzzleSuccess(ctx, puzzle, x, y, colors) {
  const message = puzzle.theme?.successMessage ?? "Repair complete.";

  ctx.fillStyle = colors.glow ?? "rgba(255, 224, 138, 0.92)";
  roundedRect(ctx, x - 220, y - 25, 440, 50, 10);
  ctx.fill();
  ctx.fillStyle = "rgba(35, 31, 24, 0.96)";
  ctx.font = "900 20px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(message, x, y + 7);
}

function drawPuzzleBoardFrame(ctx, x, y, width, height, colors) {
  roundedRect(ctx, x - 24, y - 24, width + 48, height + 48, 12);
  ctx.fillStyle = colors.boardInset ?? "rgba(55, 74, 68, 0.92)";
  ctx.fill();
  ctx.strokeStyle = colors.node ?? "rgba(216, 170, 87, 0.74)";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function drawPathPuzzle(ctx, puzzle, startX, startY, tileSize, gap) {
  const colors = puzzle.theme?.colors ?? {};

  ctx.save();
  puzzle.tiles.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const x = startX + colIndex * (tileSize + gap);
      const y = startY + rowIndex * (tileSize + gap);
      const key = `${rowIndex},${colIndex}`;
      const selected = puzzle.selected.row === rowIndex && puzzle.selected.col === colIndex;
      const lit = puzzle.connected.has(key);
      drawPuzzleTile(ctx, tile, x, y, tileSize, selected, lit, colors);
    });
  });
  ctx.restore();
}

function drawPuzzleTile(ctx, tile, x, y, size, selected, lit, colors) {
  ctx.fillStyle = lit ? colors.tileLit ?? "rgba(73, 103, 91, 0.95)" : colors.tile ?? "rgba(47, 62, 63, 0.95)";
  roundedRect(ctx, x, y, size, size, 10);
  ctx.fill();
  ctx.strokeStyle = selected ? colors.glow ?? "rgba(255, 232, 166, 0.95)" : "rgba(255, 232, 166, 0.18)";
  ctx.lineWidth = selected ? 5 : 2;
  ctx.stroke();

  if (selected) {
    ctx.fillStyle = "rgba(255, 232, 166, 0.14)";
    roundedRect(ctx, x + 6, y + 6, size - 12, size - 12, 8);
    ctx.fill();
  }

  if (tile.type === "blank") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  ctx.rotate(tile.rotation * Math.PI * 0.5);
  ctx.strokeStyle = lit ? colors.conduitLit ?? "rgba(255, 224, 138, 0.98)" : colors.conduit ?? "rgba(201, 121, 69, 0.9)";
  ctx.lineWidth = Math.max(10, size * 0.13);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  if (tile.type === "line" || tile.type === "start" || tile.type === "output") {
    ctx.moveTo(-size * 0.36, 0);
    ctx.lineTo(size * 0.36, 0);
  }
  if (tile.type === "turn") {
    ctx.moveTo(0, size * 0.34);
    ctx.quadraticCurveTo(0, 0, size * 0.28, 0);
  }
  if (tile.type === "tee") {
    ctx.moveTo(-size * 0.34, 0);
    ctx.lineTo(size * 0.34, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, size * 0.34);
  }
  ctx.stroke();

  ctx.fillStyle = lit ? colors.conduitLit ?? "rgba(255, 232, 166, 0.95)" : colors.node ?? "rgba(216, 170, 87, 0.82)";
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(31, 43, 40, 0.72)";
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.06, 0, Math.PI * 2);
  ctx.fill();

  if (tile.type === "start" || tile.type === "output") {
    ctx.fillStyle = lit ? colors.conduitLit ?? "rgba(255, 232, 166, 0.95)" : colors.accent ?? "rgba(143, 217, 240, 0.72)";
    ctx.beginPath();
    ctx.arc(tile.type === "start" ? -size * 0.34 : size * 0.34, 0, size * 0.09, 0, Math.PI * 2);
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

function rectsOverlap(first, second) {
  return first.x < second.x + second.width
    && first.x + first.width > second.x
    && first.y < second.y + second.height
    && first.y + first.height > second.y;
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
