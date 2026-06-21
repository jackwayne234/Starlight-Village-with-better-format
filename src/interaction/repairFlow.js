import { createRepairPuzzle, movePuzzleSelection, rotateSelectedTile } from "./repairPuzzle.js";

export function updateRepairFlow(scene, input, dt) {
  const flow = scene.flow;
  const target = scene.repairTarget;

  updateReactionTimers(scene, dt);
  updateDialogue(scene, dt);
  updateReactionBubbles(scene, dt);

  if (!target) {
    return;
  }

  const distance = Math.abs(scene.player.x - target.x);

  if (flow.mode === "walking" && distance < target.radius && !target.complete) {
    flow.mode = "scanning";
    flow.timer = 1.2;
    flow.message = target.scanText;
    showDialogue(scene, target.dialogue?.scan);
  }

  if (flow.mode === "scanning") {
    flow.timer -= dt;
    scene.robot.pose = "scan";
    if (flow.timer <= 0) {
      flow.mode = "puzzle";
      flow.message = target.puzzleText;
      showDialogue(scene, target.dialogue?.puzzle);
    }
  }

  if (flow.mode === "puzzle") {
    scene.robot.pose = "route";

    if (target.kind === "path-puzzle") {
      updatePathPuzzleRepair(scene, input, target);
    } else if (target.kind === "timed-tap") {
      updateTimedTapRepair(scene, input, dt, target);
    } else {
      updateHoldChargeRepair(scene, input, dt, target);
    }
  }

  if (flow.mode === "reward") {
    flow.timer -= dt;
    flow.celebrationTimer = Math.max(0, flow.celebrationTimer - dt);

    if (!flow.onwardPrompted && flow.timer <= 2.6) {
      flow.onwardPrompted = true;
      flow.message = target.onwardText;
    }

    if (flow.timer <= 0 && (input.isDown("ArrowRight") || input.isDown("KeyD"))) {
      advanceRepairTarget(scene);
    }
  }
}

function updatePathPuzzleRepair(scene, input, target) {
  if (!target.puzzle) {
    target.puzzle = createRepairPuzzle(target.puzzleTheme);
  }

  if (input.consume("ArrowUp") || input.consume("KeyW")) {
    movePuzzleSelection(target.puzzle, -1, 0);
  }
  if (input.consume("ArrowDown") || input.consume("KeyS")) {
    movePuzzleSelection(target.puzzle, 1, 0);
  }
  if (input.consume("ArrowLeft") || input.consume("KeyA")) {
    movePuzzleSelection(target.puzzle, 0, -1);
  }
  if (input.consume("ArrowRight") || input.consume("KeyD")) {
    movePuzzleSelection(target.puzzle, 0, 1);
  }
  if (consumeRepairInput(input)) {
    rotateSelectedTile(target.puzzle);
  }

  target.progress = target.puzzle.completed ? 1 : target.puzzle.connected.size / (target.puzzle.rows * target.puzzle.cols);
  scene.world.powerLevel = Math.max(scene.world.powerLevel, target.progress);

  if (target.puzzle.completed) {
    applyRepairEffect(scene, target);
    completeRepair(scene, target);
  }
}

function updateHoldChargeRepair(scene, input, dt, target) {
  const routingPower = input.isDown("Space") || input.isDown("Enter") || input.isDown("KeyE");
  const delta = routingPower ? target.chargeRate : -target.decayRate;
  target.progress = clamp01(target.progress + delta * dt);
  scene.world.powerLevel = target.progress;

  if (target.progress >= 1) {
    applyRepairEffect(scene, target);
    completeRepair(scene, target);
  }
}

function updateTimedTapRepair(scene, input, dt, target) {
  target.sparkPhase = (target.sparkPhase + target.sparkSpeed * dt) % 1;
  target.feedbackTimer = Math.max(0, target.feedbackTimer - dt);

  if (target.feedbackTimer <= 0) {
    target.feedback = "";
  }

  if (!consumeRepairInput(input)) {
    return;
  }

  if (target.sparkPhase >= target.successMin && target.sparkPhase <= target.successMax) {
    target.hits += 1;
    target.progress = target.hits / target.requiredHits;
    target.feedback = target.hits >= target.requiredHits ? "Relay tuned." : `Good. ${target.requiredHits - target.hits} more.`;
    target.feedbackTimer = 0.9;
  } else {
    target.feedback = "Almost. Wait for the spark to cross the gold notch.";
    target.feedbackTimer = 1.1;
  }

  if (target.hits >= target.requiredHits) {
    scene.world.relayAligned = true;
    completeRepair(scene, target);
  } else {
    scene.flow.message = target.feedback;
  }
}

function completeRepair(scene, target) {
  target.complete = true;
  target.progress = 1;
  scene.player.reaction = "cheer";
  scene.player.reactionTimer = 1.45;
  scene.robot.pose = "celebrate";
  scene.robot.reactionTimer = 1.8;
  scene.flow.mode = "reward";
  scene.flow.timer = 5.2;
  scene.flow.celebrationTimer = 1.6;
  scene.flow.onwardPrompted = false;
  scene.flow.message = target.rewardText;
  scene.progressDirty = true;
  showDialogue(scene, target.dialogue?.reward);
  showReactionBubbles(scene, target.reactions);
}

function applyRepairEffect(scene, target) {
  scene.world.repaired = true;
  scene.world.powerLevel = 1;

  if (target.id === "root-pump") {
    scene.world.groveBloom = 1;
    if (scene.bridge) scene.bridge.repaired = true;
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "switchyard-junction") {
    scene.switchyard?.poles.forEach((pole) => {
      pole.lit = true;
    });
    scene.switchyard?.boxes.forEach((box) => {
      box.lit = true;
    });
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "storm-gauge") {
    if (scene.ridge?.gauge) scene.ridge.gauge.lit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "beacon-tower") {
    if (scene.beaconHill?.tower) scene.beaconHill.tower.lit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "rainbarrel-drain") {
    if (scene.rainbarrelRow?.drain) scene.rainbarrelRow.drain.cleared = true;
    scene.rainbarrelRow?.channels.forEach((channel) => {
      channel.flow = true;
    });
    scene.rainbarrelRow?.barrels.forEach((barrel) => {
      barrel.overflow = false;
    });
    scene.layers.cottages.forEach((cottage) => {
      cottage.lit = true;
    });
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }
}

function advanceRepairTarget(scene) {
  const nextIndex = scene.repairIndex + 1;

  if (nextIndex >= scene.repairs.length) {
    if (scene.repairTarget.nextSceneId) {
      scene.nextSceneId = scene.repairTarget.nextSceneId;
      scene.progressDirty = true;
      return;
    }

    scene.flow.message = scene.repairTarget.nextText;
    showDialogue(scene, scene.repairTarget.dialogue?.next);
    return;
  }

  scene.repairIndex = nextIndex;
  scene.repairTarget = scene.repairs[scene.repairIndex];
  scene.progressDirty = true;
  scene.flow.mode = "walking";
  scene.flow.timer = 0;
  scene.flow.celebrationTimer = 0;
  scene.flow.onwardPrompted = false;
  scene.flow.message = scene.repairs[nextIndex - 1].nextText;
  showDialogue(scene, scene.repairs[nextIndex - 1].dialogue?.next);
}

function consumeRepairInput(input) {
  return input.consume("Space") || input.consume("Enter") || input.consume("KeyE");
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function updateReactionTimers(scene, dt) {
  if (scene.player.reactionTimer > 0) {
    scene.player.reactionTimer = Math.max(0, scene.player.reactionTimer - dt);
    if (scene.player.reactionTimer === 0) {
      scene.player.reaction = "idle";
    }
  }

  if (scene.robot.reactionTimer > 0) {
    scene.robot.reactionTimer = Math.max(0, scene.robot.reactionTimer - dt);
    if (scene.robot.reactionTimer === 0) {
      scene.robot.pose = "idle";
    }
  }
}

function showDialogue(scene, line, duration = 2.4) {
  if (!line) {
    return;
  }

  scene.dialogue.speaker = line.speaker;
  scene.dialogue.text = line.text;
  scene.dialogue.timer = duration;
}

function updateDialogue(scene, dt) {
  if (scene.dialogue.timer <= 0) {
    return;
  }

  scene.dialogue.timer = Math.max(0, scene.dialogue.timer - dt);
  if (scene.dialogue.timer === 0) {
    scene.dialogue.speaker = null;
    scene.dialogue.text = "";
  }
}

function showReactionBubbles(scene, reactions = []) {
  scene.reactionBubbles = reactions.map((reaction, index) => ({
    ...reaction,
    timer: 3.2 + index * 0.35
  }));
}

function updateReactionBubbles(scene, dt) {
  if (!scene.reactionBubbles.length) {
    return;
  }

  scene.reactionBubbles = scene.reactionBubbles
    .map((bubble) => ({ ...bubble, timer: bubble.timer - dt }))
    .filter((bubble) => bubble.timer > 0);
}
