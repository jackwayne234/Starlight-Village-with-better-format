export function updateRobot(scene, dt) {
  const targetX = scene.player.x + 112;
  const targetY = scene.player.y - 142;

  scene.robot.x += (targetX - scene.robot.x) * Math.min(1, dt * 5.5);
  scene.robot.y += (targetY - scene.robot.y) * Math.min(1, dt * 4.5);
}
