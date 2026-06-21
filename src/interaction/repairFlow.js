export function updateRepairFlow(scene, input, dt) {
  const flow = scene.flow;
  const target = scene.repairTarget;

  updateReactionTimers(scene, dt);
  updateDialogue(scene, dt);

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

    if (target.kind === "timed-tap") {
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

function updateHoldChargeRepair(scene, input, dt, target) {
  const routingPower = input.isDown("Space") || input.isDown("Enter") || input.isDown("KeyE");
  const delta = routingPower ? target.chargeRate : -target.decayRate;
  target.progress = clamp01(target.progress + delta * dt);
  scene.world.powerLevel = target.progress;

  if (target.progress >= 1) {
    scene.world.repaired = true;
    scene.world.powerLevel = 1;
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
}

function advanceRepairTarget(scene) {
  const nextIndex = scene.repairIndex + 1;

  if (nextIndex >= scene.repairs.length) {
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
