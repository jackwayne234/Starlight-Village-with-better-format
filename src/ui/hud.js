import { fullGameScenes } from "../scenes/fullGameCatalog.js";
import { imageReady, sprites } from "../rendering/sprites.js";

export function drawHud(ctx, scene, width, height) {
  if (scene.repairTarget && (scene.flow.mode === "puzzle" || scene.flow.mode === "puzzle-complete")) {
    drawRepairOverlay(ctx, scene.repairTarget, width, height);
    return;
  }

  drawTitle(ctx, scene);
  const occupiedBubbles = [
    { x: 28, y: 28, width: 430, height: 72 },
    ...getCharacterFaceAvoidanceRects(scene, width)
  ];
  drawDialogueBubble(ctx, scene, width, height, occupiedBubbles);
  drawReactionBubbles(ctx, scene, width, height, occupiedBubbles);
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
      fill: "rgba(250, 240, 210, 0.58)",
      stroke: "rgba(71, 58, 43, 0.22)"
    });
    ctx.fillStyle = "rgba(31, 37, 31, 0.82)";
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
    fill: "rgba(255, 247, 220, 0.64)",
    stroke: scene.dialogue.speaker === "player" ? "rgba(83, 127, 145, 0.28)" : "rgba(143, 217, 240, 0.26)"
  });
  ctx.fillStyle = "rgba(31, 38, 32, 0.84)";
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
    { x: anchor.x - rect.width * 0.12, y: anchor.y - rect.height - 34 },
    { x: anchor.x - rect.width * 0.88, y: anchor.y - rect.height - 34 },
    { x: anchor.x - rect.width / 2, y: anchor.y - rect.height - 86 },
    { x: anchor.x - rect.width / 2, y: anchor.y + 46 },
    { x: anchor.x - rect.width / 2, y: anchor.y - rect.height - 30 }
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

function getCharacterFaceAvoidanceRects(scene, width) {
  const playerX = clamp(scene.player.x - scene.camera.x, 0, width);
  const robotX = clamp(scene.robot.x - scene.camera.x, 0, width);
  const playerScale = scene.player.scale ?? 1;
  const robotScale = scene.robot.scale ?? 1;

  return [
    { x: playerX - 54 * playerScale, y: scene.player.y - 224 * playerScale, width: 108 * playerScale, height: 118 * playerScale },
    { x: robotX - 58 * robotScale, y: scene.robot.y - 100 * robotScale, width: 116 * robotScale, height: 104 * robotScale }
  ];
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
  const left = 28;
  const top = 28;
  const width = 430;
  const height = 72;
  const progress = getSceneProgressLabel(scene);

  ctx.save();
  ctx.shadowColor = "rgba(9, 12, 11, 0.58)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "rgba(35, 32, 24, 0.38)";
  roundedRect(ctx, left, top, width, height, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(255, 216, 135, 0.2)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const glow = ctx.createLinearGradient(left, top, left + width, top);
  glow.addColorStop(0, "rgba(255, 216, 135, 0.13)");
  glow.addColorStop(0.44, "rgba(255, 216, 135, 0.04)");
  glow.addColorStop(1, "rgba(143, 217, 240, 0.03)");
  ctx.fillStyle = glow;
  roundedRect(ctx, left + 1, top + 1, width - 2, height - 2, 7);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 239, 196, 0.97)";
  ctx.shadowColor = "rgba(8, 12, 13, 0.74)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillText(progress.chapter, 48, 52);

  ctx.fillStyle = "rgba(232, 221, 190, 0.88)";
  ctx.shadowBlur = 6;
  ctx.font = "600 15px system-ui, sans-serif";
  ctx.fillText(progress.repair, 48, 73);
  ctx.restore();
}

function getSceneProgressLabel(scene) {
  const entry = fullGameScenes.find((candidate) => candidate.id === scene.id);
  if (!entry) {
    return {
      chapter: scene.title,
      repair: ""
    };
  }

  const chapterId = entry.id.split("/")[0];
  const chapterIds = [...new Set(fullGameScenes.map((candidate) => candidate.id.split("/")[0]))];
  const chapterScenes = fullGameScenes.filter((candidate) => candidate.id.startsWith(`${chapterId}/`));
  const chapterNumber = chapterIds.indexOf(chapterId) + 1;
  const repairNumber = chapterScenes.findIndex((candidate) => candidate.id === entry.id) + 1;
  const chapterName = getShortChapterName(entry.region);

  return {
    chapter: `Chapter ${chapterNumber}: ${chapterName}`,
    repair: `${scene.title} - Repair ${repairNumber} of ${chapterScenes.length}`
  };
}

function getShortChapterName(region) {
  const names = {
    "Starlight Village Core": "Starlight",
    "Glowfen Wetlands": "Glowfen",
    "Mossline Switchyard": "Mossline",
    "Stormedge Rise": "Stormedge",
    "Beacon Hill": "Beacon Hill",
    "Rainbarrel Row": "Rainbarrel",
    "Old Orchard": "Old Orchard",
    "Glassworks Quarter": "Glassworks",
    "Under-Village": "Under-Village",
    "Festival Night": "Festival"
  };

  return names[region] ?? region;
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
  const wetlandSprites = getWetlandPuzzleSprites(puzzle);
  const mosslinePuzzle = isMosslinePuzzle(puzzle);

  ctx.fillStyle = colors.glow ?? "rgba(255, 224, 138, 0.92)";
  roundedRect(ctx, x - 220, y - 25, 440, 50, 10);
  ctx.fill();
  if (wetlandSprites?.completionSpark) {
    drawImageCover(ctx, wetlandSprites.completionSpark, x - 214, y - 33, 66, 66);
    drawImageCover(ctx, wetlandSprites.completionSpark, x + 148, y - 33, 66, 66);
  } else if (mosslinePuzzle) {
    drawMosslineSignalSpark(ctx, x - 184, y, colors);
    drawMosslineSignalSpark(ctx, x + 184, y, colors);
  }
  ctx.fillStyle = "rgba(35, 31, 24, 0.96)";
  ctx.font = "900 20px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(message, x, y + 7);
}

function drawMosslineSignalSpark(ctx, x, y, colors) {
  ctx.save();
  ctx.strokeStyle = colors.glow ?? "rgba(201, 240, 240, 0.98)";
  ctx.fillStyle = colors.accent ?? "rgba(240, 197, 107, 0.94)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.shadowColor = colors.glow ?? "rgba(201, 240, 240, 0.98)";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(x - 18, y + 10);
  ctx.lineTo(x - 4, y - 8);
  ctx.lineTo(x + 8, y + 2);
  ctx.lineTo(x + 18, y - 12);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y + 11, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
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
      drawPuzzleTile(ctx, puzzle, tile, x, y, tileSize, selected, lit, colors);
    });
  });
  ctx.restore();
}

function drawPuzzleTile(ctx, puzzle, tile, x, y, size, selected, lit, colors) {
  const wetlandSprites = getWetlandPuzzleSprites(puzzle);
  if (wetlandSprites) {
    drawWetlandPuzzleTile(ctx, tile, x, y, size, selected, lit, colors, wetlandSprites);
    return;
  }
  if (isMosslinePuzzle(puzzle)) {
    drawMosslinePuzzleTile(ctx, puzzle, tile, x, y, size, selected, lit, colors);
    return;
  }

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

function drawMosslinePuzzleTile(ctx, puzzle, tile, x, y, size, selected, lit, colors) {
  const accent = getMosslineAccent(puzzle.layoutId);
  const baseGradient = ctx.createLinearGradient(x, y, x, y + size);
  baseGradient.addColorStop(0, lit ? "rgba(73, 91, 90, 0.98)" : "rgba(43, 54, 55, 0.98)");
  baseGradient.addColorStop(1, lit ? "rgba(42, 67, 66, 0.98)" : "rgba(25, 35, 38, 0.98)");
  ctx.fillStyle = baseGradient;
  roundedRect(ctx, x, y, size, size, 8);
  ctx.fill();

  ctx.strokeStyle = selected ? accent.glow : "rgba(184, 209, 204, 0.18)";
  ctx.lineWidth = selected ? 5 : 2;
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = lit ? 0.3 : 0.14;
  ctx.strokeStyle = "rgba(230, 241, 230, 0.45)";
  ctx.lineWidth = 2;
  for (let offset = size * 0.22; offset < size; offset += size * 0.28) {
    ctx.beginPath();
    ctx.moveTo(x + 10, y + offset);
    ctx.lineTo(x + size - 10, y + offset - size * 0.08);
    ctx.stroke();
  }
  ctx.restore();

  if (selected) {
    ctx.save();
    ctx.shadowColor = accent.glow;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = accent.glow;
    ctx.lineWidth = 3;
    roundedRect(ctx, x + 8, y + 8, size - 16, size - 16, 6);
    ctx.stroke();
    ctx.restore();
  }

  if (tile.type === "blank") {
    ctx.fillStyle = "rgba(154, 181, 176, 0.16)";
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const exits = getTileVisualExits(tile);
  exits.forEach((direction) => {
    drawMosslineRailSegment(ctx, centerX, centerY, size, direction, lit, accent);
  });

  const nodeRadius = tile.type === "start" || tile.type === "output" ? size * 0.17 : size * 0.13;
  ctx.save();
  ctx.shadowColor = lit ? accent.glow : "transparent";
  ctx.shadowBlur = lit ? 14 : 0;
  ctx.fillStyle = lit ? accent.litNode : colors.node ?? "rgba(169, 202, 201, 0.86)";
  ctx.beginPath();
  ctx.arc(centerX, centerY, nodeRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(21, 31, 32, 0.74)";
  ctx.beginPath();
  ctx.arc(centerX, centerY, nodeRadius * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (tile.type === "start" || tile.type === "output") {
    const terminalX = centerX + (tile.type === "start" ? -size * 0.34 : size * 0.34);
    ctx.save();
    ctx.fillStyle = lit ? accent.glow : accent.signal;
    ctx.shadowColor = lit ? accent.glow : "transparent";
    ctx.shadowBlur = lit ? 16 : 0;
    roundedRect(ctx, terminalX - size * 0.11, centerY - size * 0.11, size * 0.22, size * 0.22, 5);
    ctx.fill();
    ctx.restore();
  }
}

function drawMosslineRailSegment(ctx, centerX, centerY, size, direction, lit, accent) {
  const angle = {
    right: 0,
    down: Math.PI / 2,
    left: Math.PI,
    up: -Math.PI / 2
  }[direction] ?? 0;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);
  ctx.lineCap = "round";
  ctx.strokeStyle = lit ? accent.glow : accent.rail;
  ctx.lineWidth = Math.max(9, size * 0.12);
  ctx.shadowColor = lit ? accent.glow : "transparent";
  ctx.shadowBlur = lit ? 12 : 0;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size * 0.42, 0);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = lit ? "rgba(255, 246, 190, 0.62)" : "rgba(222, 238, 229, 0.28)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(size * 0.06, -size * 0.07);
  ctx.lineTo(size * 0.36, -size * 0.07);
  ctx.moveTo(size * 0.06, size * 0.07);
  ctx.lineTo(size * 0.36, size * 0.07);
  ctx.stroke();
  ctx.restore();
}

function drawWetlandPuzzleTile(ctx, tile, x, y, size, selected, lit, colors, wetlandSprites) {
  drawImageCover(ctx, lit ? wetlandSprites.tileLit : wetlandSprites.tileBase, x, y, size, size);

  if (selected) {
    ctx.save();
    ctx.globalAlpha = 0.38;
    drawImageCover(ctx, wetlandSprites.selectionFrame, x - 5, y - 5, size + 10, size + 10);
    ctx.restore();
  } else {
    ctx.strokeStyle = "rgba(207, 239, 224, 0.18)";
    ctx.lineWidth = 2;
    roundedRect(ctx, x + 2, y + 2, size - 4, size - 4, 10);
    ctx.stroke();
  }

  if (tile.type === "blank") {
    ctx.save();
    ctx.globalAlpha = 0.36;
    ctx.fillStyle = "rgba(198, 235, 217, 0.12)";
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const exits = getTileVisualExits(tile);
  exits.forEach((direction) => {
    drawWetlandConduitSegment(ctx, wetlandSprites.conduit, centerX, centerY, size, direction, lit);
  });

  const nodeImage = tile.type === "start"
    ? wetlandSprites.startNode
    : tile.type === "output"
      ? wetlandSprites.outputNode
      : null;
  if (nodeImage) {
    const nodeX = centerX + (tile.type === "start" ? -size * 0.34 : size * 0.34);
    drawImageCover(ctx, nodeImage, nodeX - size * 0.18, centerY - size * 0.18, size * 0.36, size * 0.36);
  } else {
    ctx.save();
    ctx.fillStyle = lit ? colors.conduitLit ?? "rgba(255, 232, 166, 0.95)" : colors.node ?? "rgba(216, 170, 87, 0.82)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, size * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(24, 39, 34, 0.64)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, size * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function getWetlandPuzzleSprites(puzzle) {
  if (!puzzle.layoutId?.startsWith("ch2-")) {
    return null;
  }

  const puzzleSprites = sprites.chapterTwo?.puzzles;
  if (!puzzleSprites) {
    return null;
  }

  const conduit = getWetlandConduitSprite(puzzle.layoutId, puzzleSprites);
  const required = [
    puzzleSprites.wetlandTileBase,
    puzzleSprites.wetlandTileLit,
    puzzleSprites.wetlandSelectionFrame,
    puzzleSprites.wetlandStartNode,
    puzzleSprites.wetlandOutputNode,
    puzzleSprites.wetlandCompletionSpark,
    conduit
  ];
  if (!required.every(imageReady)) {
    return null;
  }

  return {
    tileBase: puzzleSprites.wetlandTileBase,
    tileLit: puzzleSprites.wetlandTileLit,
    selectionFrame: puzzleSprites.wetlandSelectionFrame,
    startNode: puzzleSprites.wetlandStartNode,
    outputNode: puzzleSprites.wetlandOutputNode,
    completionSpark: puzzleSprites.wetlandCompletionSpark,
    conduit
  };
}

function getWetlandConduitSprite(layoutId, puzzleSprites) {
  if (["ch2-lantern-lily-pool", "ch2-bog-bridge", "ch2-mist-pool", "ch2-old-fen-shrine"].includes(layoutId)) {
    return puzzleSprites.shallowWaterConduit;
  }
  if (["ch2-glowfen-grove", "ch2-frogsong-lock", "ch2-moss-gate"].includes(layoutId)) {
    return puzzleSprites.reedChannelConduit;
  }
  return puzzleSprites.boardwalkConduit;
}

function isMosslinePuzzle(puzzle) {
  return puzzle.layoutId?.startsWith("ch3-");
}

function getMosslineAccent(layoutId) {
  if (["ch3-rain-slick-rails", "ch3-tunnel-mouth"].includes(layoutId)) {
    return {
      rail: "rgba(108, 154, 157, 0.9)",
      signal: "rgba(128, 213, 194, 0.86)",
      glow: "rgba(169, 244, 218, 0.98)",
      litNode: "rgba(192, 249, 218, 0.98)"
    };
  }
  if (["ch3-sparking-relay-shed", "ch3-clock-signal", "ch3-last-platform"].includes(layoutId)) {
    return {
      rail: "rgba(177, 150, 93, 0.9)",
      signal: "rgba(235, 192, 98, 0.9)",
      glow: "rgba(255, 222, 134, 0.98)",
      litNode: "rgba(255, 232, 155, 0.98)"
    };
  }
  return {
    rail: "rgba(128, 167, 177, 0.9)",
    signal: "rgba(158, 205, 207, 0.88)",
    glow: "rgba(201, 240, 240, 0.98)",
    litNode: "rgba(211, 245, 241, 0.98)"
  };
}

function drawWetlandConduitSegment(ctx, image, centerX, centerY, size, direction, lit) {
  const angle = {
    right: 0,
    down: Math.PI / 2,
    left: Math.PI,
    up: -Math.PI / 2
  }[direction] ?? 0;
  const length = size * 0.52;
  const thickness = size * 0.32;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);
  ctx.globalAlpha = lit ? 1 : 0.72;
  drawImageCover(ctx, image, -size * 0.05, -thickness / 2, length, thickness);
  ctx.restore();
}

function getTileVisualExits(tile) {
  const exits = {
    start: ["right"],
    output: ["left"],
    blank: [],
    line: ["left", "right"],
    turn: ["right", "down"],
    tee: ["left", "right", "down"]
  }[tile.type] ?? [];
  return exits.map((direction) => rotateDirection(direction, tile.rotation));
}

function rotateDirection(direction, rotation) {
  const order = ["up", "right", "down", "left"];
  return order[(order.indexOf(direction) + rotation) % order.length];
}

function drawImageCover(ctx, image, x, y, width, height) {
  ctx.drawImage(image, x, y, width, height);
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
