export function updateRobot(scene, dt) {
  const desiredSide = scene.player.facing || scene.robot.followSide || scene.robot.facing || 1;
  const currentSide = scene.robot.followSide || desiredSide;
  if (desiredSide !== currentSide) {
    scene.robot.previousFollowSide = currentSide;
    scene.robot.followSide = desiredSide;
    scene.robot.sideSwapDuration = scene.robot.sideSwapDuration || 0.52;
    scene.robot.sideSwapTimer = scene.robot.sideSwapDuration;
  }

  const swapDuration = scene.robot.sideSwapDuration || 0.52;
  scene.robot.sideSwapTimer = Math.max(0, (scene.robot.sideSwapTimer || 0) - dt);
  const swapProgress = scene.robot.sideSwapTimer > 0
    ? 1 - scene.robot.sideSwapTimer / swapDuration
    : 1;
  const swapLift = scene.robot.sideSwapTimer > 0 ? Math.sin(swapProgress * Math.PI) * 46 : 0;

  const targetX = scene.player.x + scene.robot.followSide * 96;
  // Float low beside the boy, but lift slightly while swapping sides so it
  // reads as a deliberate pass behind him instead of a flat slide through him.
  const targetY = scene.player.y - 8 - swapLift;
  const previousX = scene.robot.x;
  const speed = scene.robot.sideSwapTimer > 0 ? 7.2 : 5.5;

  scene.robot.x += (targetX - scene.robot.x) * Math.min(1, dt * speed);
  scene.robot.y += (targetY - scene.robot.y) * Math.min(1, dt * 4.5);

  const travel = scene.robot.x - previousX;
  if (Math.abs(travel) > 0.02) {
    scene.robot.facing = travel > 0 ? 1 : -1;
  } else {
    scene.robot.facing = scene.robot.followSide;
  }
}
