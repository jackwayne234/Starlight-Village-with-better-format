import { createRepairPuzzle, movePuzzleSelection, rotateSelectedTile } from "./repairPuzzle.js";
import { sfx } from "../audio/gameAudio.js";

export function updateRepairFlow(scene, input, dt) {
  const flow = scene.flow;
  const target = scene.repairTarget;

  updateReactionTimers(scene, dt);
  updateDialogue(scene, dt);
  updateReactionBubbles(scene, dt);

  if (!target) {
    return;
  }

  if (flow.mode === "chapter-complete") {
    return;
  }

  const distance = Math.abs(scene.player.x - target.x);

  if (flow.mode === "walking" && distance < target.radius && !target.complete) {
    flow.mode = "scanning";
    flow.timer = 1.2;
    flow.message = target.scanText;
    showDialogue(scene, target.dialogue?.scan);
    sfx.robotChirp();
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
    updatePathPuzzleRepair(scene, input, target);
  }

  if (flow.mode === "puzzle-complete") {
    flow.timer -= dt;
    scene.robot.pose = "celebrate";
    if (flow.timer <= 0) {
      completeRepair(scene, target);
    }
  }

  if (flow.mode === "reward") {
    flow.timer -= dt;
    flow.celebrationTimer = Math.max(0, flow.celebrationTimer - dt);

    if (!flow.onwardPrompted && flow.timer <= 2.6) {
      flow.onwardPrompted = true;
      if (target.onwardText) {
        showDialogue(scene, { speaker: "robot", text: target.onwardText });
      }
    }

    if (flow.timer <= 0 && consumeRepairInput(input)) {
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
    if (rotateSelectedTile(target.puzzle)) {
      sfx.tileRotate();
    }
  }

  target.progress = target.puzzle.completed ? 1 : target.puzzle.connected.size / (target.puzzle.rows * target.puzzle.cols);
  scene.world.powerLevel = Math.max(scene.world.powerLevel, target.progress);

  if (target.puzzle.completed) {
    applyRepairEffect(scene, target);
    scene.flow.mode = "puzzle-complete";
    scene.flow.timer = 1.15;
    scene.flow.message = target.puzzle.successMessage ?? target.rewardText;
    target.progress = 1;
    sfx.repairSuccess();
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
      scene.flow.message = scene.repairTarget.nextText;
      scene.progressDirty = true;
      showDialogue(scene, scene.repairTarget.dialogue?.next);
      return;
    }

    if (scene.repairTarget.chapterComplete) {
      scene.chapterComplete = scene.repairTarget.chapterComplete;
      scene.flow.mode = "chapter-complete";
      scene.flow.message = scene.repairTarget.nextText;
      scene.progressDirty = true;
      showDialogue(scene, scene.repairTarget.dialogue?.next, 3.2);
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
    delay: 2.05 + index * 1.55,
    timer: 2.55
  }));
}

function updateReactionBubbles(scene, dt) {
  if (!scene.reactionBubbles.length) {
    return;
  }

  scene.reactionBubbles = scene.reactionBubbles
    .map((bubble) => {
      if (bubble.delay > 0) {
        return { ...bubble, delay: Math.max(0, bubble.delay - dt) };
      }

      return { ...bubble, timer: bubble.timer - dt };
    })
    .filter((bubble) => bubble.delay > 0 || bubble.timer > 0);
}
