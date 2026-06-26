import { createRepairPuzzle, movePuzzleSelection, rotateSelectedTile } from "./repairPuzzle.js?v=zero-painted-assets";
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

  if (flow.mode === "visual-transition") {
    if (consumeRepairInput(input) && scene.visualTransition?.nextSceneId) {
      scene.nextSceneId = scene.visualTransition.nextSceneId;
      scene.flow.message = scene.visualTransition.nextText ?? "";
      scene.visualTransition = null;
      scene.progressDirty = true;
      showDialogue(scene, target.dialogue?.next);
    }
    return;
  }

  if (flow.mode === "chapter-complete") {
    if (consumeRepairInput(input) && scene.repairTarget?.nextSceneId) {
      if (scene.repairTarget.transitionPage) {
        scene.visualTransition = scene.repairTarget.transitionPage;
        scene.chapterComplete = null;
        scene.flow.mode = "visual-transition";
        scene.flow.message = scene.repairTarget.nextText;
        scene.progressDirty = true;
        return;
      }
      scene.chapterComplete = null;
      scene.nextSceneId = scene.repairTarget.nextSceneId;
      scene.flow.message = scene.repairTarget.nextText;
      scene.progressDirty = true;
      showDialogue(scene, scene.repairTarget.dialogue?.next);
    }
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

    if (!flow.onwardPrompted && flow.timer <= 1.5) {
      flow.onwardPrompted = true;
      if (target.onwardText) {
        showDialogue(scene, { speaker: "robot", text: target.onwardText }, 1.25);
      }
    }

    if (flow.timer <= 0 && consumeRepairInput(input)) {
      advanceRepairTarget(scene);
    }
  }
}

function updatePathPuzzleRepair(scene, input, target) {
  if (!target.puzzle) {
    target.puzzle = createRepairPuzzle(target.puzzleTheme, target.puzzleLayout);
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
  scene.flow.timer = 2.8;
  scene.flow.celebrationTimer = 1.2;
  scene.flow.onwardPrompted = false;
  scene.flow.message = target.rewardText;
  scene.progressDirty = true;
  showDialogue(scene, target.dialogue?.reward, 1.35);
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

  if (target.id === "bakery-gutter" && scene.bakeryGutter) {
    scene.bakeryGutter.fixed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "bell-rope-corner" && scene.bellRopeCorner) {
    scene.bellRopeCorner.fixed = true;
    scene.bellRopeCorner.bellLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "workshop-lift" && scene.workshopLift) {
    scene.workshopLift.fixed = true;
    scene.workshopLift.platformRaised = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "schoolhouse-lanterns" && scene.schoolhouseLanterns) {
    scene.schoolhouseLanterns.fixed = true;
    scene.schoolhouseLanterns.posts.forEach((post) => {
      post.lit = true;
    });
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "market-awnings" && scene.marketAwnings) {
    scene.marketAwnings.fixed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "old-footbridge" && scene.oldFootbridge) {
    scene.oldFootbridge.fixed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "rain-drain-corner" && scene.rainDrainCorner) {
    scene.rainDrainCorner.fixed = true;
    scene.rainDrainCorner.waterHigh = false;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "mayor-porch" && scene.mayorPorch) {
    scene.mayorPorch.fixed = true;
    scene.mayorPorch.chimeLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "festival-square" && scene.festivalSquare) {
    scene.festivalSquare.fixed = true;
    scene.festivalSquare.starLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "lantern-lily-pool" && scene.lanternLilyPool) {
    scene.lanternLilyPool.fixed = true;
    scene.lanternLilyPool.liliesLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "bog-bridge" && scene.bogBridge) {
    scene.bogBridge.fixed = true;
    scene.bogBridge.stonesRaised = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "frogsong-lock" && scene.frogsongLock) {
    scene.frogsongLock.fixed = true;
    scene.frogsongLock.gateOpen = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "sunken-signpost" && scene.sunkenSignpost) {
    scene.sunkenSignpost.fixed = true;
    scene.sunkenSignpost.markerRaised = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "mist-pool" && scene.mistPool) {
    scene.mistPool.fixed = true;
    scene.mistPool.mistThin = true;
    scene.layers.mistBands = scene.layers.mistBands.map((band) => ({
      ...band,
      width: Math.max(160, band.width * 0.55)
    }));
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "moss-gate" && scene.mossGate) {
    scene.mossGate.fixed = true;
    scene.mossGate.gateOpen = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "old-fen-shrine" && scene.oldFenShrine) {
    scene.oldFenShrine.fixed = true;
    scene.oldFenShrine.bowlsAligned = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "glowfen-ferry" && scene.glowfenFerry) {
    scene.glowfenFerry.fixed = true;
    scene.glowfenFerry.ferryDocked = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "reedwatch-bank" && scene.reedwatchBank) {
    scene.reedwatchBank.fixed = true;
    scene.reedwatchBank.markersLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "cargo-cart-turntable" && scene.cargoCartTurntable) {
    scene.cargoCartTurntable.fixed = true;
    scene.cargoCartTurntable.cartMoved = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "signal-arm-row" && scene.signalArmRow) {
    scene.signalArmRow.fixed = true;
    scene.signalArmRow.armsAligned = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "conductor-booth" && scene.conductorBooth) {
    scene.conductorBooth.fixed = true;
    scene.conductorBooth.boardLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "crane-hook-yard" && scene.craneHookYard) {
    scene.craneHookYard.fixed = true;
    scene.craneHookYard.beamLifted = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "sparking-relay-shed" && scene.sparkingRelayShed) {
    scene.sparkingRelayShed.fixed = true;
    scene.sparkingRelayShed.sparksCalmed = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "rain-slick-rails" && scene.rainSlickRails) {
    scene.rainSlickRails.fixed = true;
    scene.rainSlickRails.railsSanded = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "tunnel-mouth" && scene.tunnelMouth) {
    scene.tunnelMouth.fixed = true;
    scene.tunnelMouth.warningLampsSafe = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "clock-signal" && scene.clockSignal) {
    scene.clockSignal.fixed = true;
    scene.clockSignal.clockSynced = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "last-platform" && scene.lastPlatform) {
    scene.lastPlatform.fixed = true;
    scene.lastPlatform.platformLit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }

  if (target.id === "weather-vane-roof" && scene.weatherVaneRoof) {
    scene.weatherVaneRoof.fixed = true;
    scene.weatherVaneRoof.vaneAligned = true;
  }

  if (target.id === "cliff-rope-lift" && scene.cliffRopeLift) {
    scene.cliffRopeLift.fixed = true;
    scene.cliffRopeLift.basketRaised = true;
  }

  if (target.id === "wind-chime-pass" && scene.windChimePass) {
    scene.windChimePass.fixed = true;
    scene.windChimePass.chimesCalm = true;
  }

  if (target.id === "lightning-rod-field" && scene.lightningRodField) {
    scene.lightningRodField.fixed = true;
    scene.lightningRodField.rodsGrounded = true;
  }

  if (target.id === "lookout-post" && scene.lookoutPost) {
    scene.lookoutPost.fixed = true;
    scene.lookoutPost.scopeAligned = true;
  }

  if (target.id === "cracked-stair" && scene.crackedStair) {
    scene.crackedStair.fixed = true;
    scene.crackedStair.bracesLocked = true;
  }

  if (target.id === "cloud-harvester" && scene.cloudHarvester) {
    scene.cloudHarvester.fixed = true;
    scene.cloudHarvester.condenserTuned = true;
  }

  if (target.id === "summit-path" && scene.summitPath) {
    scene.summitPath.fixed = true;
    scene.summitPath.markersLit = true;
  }

  if (target.id === "beacon-approach" && scene.beaconApproach) {
    scene.beaconApproach.fixed = true;
    scene.beaconApproach.gateOpen = true;
  }

  if (target.id === "archive-lens-array") {
    if (scene.observatory?.lens) scene.observatory.lens.lit = true;
    if (scene.observatory?.tower) scene.observatory.tower.lit = true;
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (target.id === "wetland-waymark") {
    if (scene.wetlandApproach) {
      scene.wetlandApproach.fixed = true;
      scene.wetlandApproach.waymarkLit = true;
    }
    scene.layers.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    scene.layers.glowPlants.forEach((plant) => {
      plant.active = true;
    });
  }
}

function advanceRepairTarget(scene) {
  const nextIndex = scene.repairIndex + 1;

  if (nextIndex >= scene.repairs.length) {
    if (scene.repairTarget.transitionPage) {
      scene.visualTransition = scene.repairTarget.transitionPage;
      scene.flow.mode = "visual-transition";
      scene.flow.message = scene.repairTarget.nextText;
      scene.progressDirty = true;
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

    if (scene.repairTarget.nextSceneId) {
      scene.nextSceneId = scene.repairTarget.nextSceneId;
      scene.flow.message = scene.repairTarget.nextText;
      scene.progressDirty = true;
      showDialogue(scene, scene.repairTarget.dialogue?.next);
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
  scene.reactionBubbles = reactions.slice(0, 2).map((reaction, index) => ({
    ...reaction,
    delay: 0.55 + index * 0.85,
    timer: 1.25
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
