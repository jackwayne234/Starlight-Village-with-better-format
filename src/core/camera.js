export function updateCamera(scene, canvas) {
  const targetX = scene.player.x - canvas.width * 0.42;
  const maxX = Math.max(0, scene.world.width - canvas.width);
  scene.camera.x += (clamp(targetX, 0, maxX) - scene.camera.x) * 0.12;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
