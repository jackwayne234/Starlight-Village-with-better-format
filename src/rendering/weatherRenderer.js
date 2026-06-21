export function drawWeather(ctx, scene, time, width, height) {
  drawRain(ctx, scene.weather.rain, time, width, height);
  drawForegroundLeaves(ctx, time, width, height);
}

function drawRain(ctx, drops, time, width, height) {
  ctx.strokeStyle = "rgba(206, 229, 226, 0.2)";
  ctx.lineWidth = 2;
  drops.forEach((drop) => {
    const y = (drop.y + time * drop.speed) % height;
    const x = (drop.x + time * 28) % width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 10, y + drop.length);
    ctx.stroke();
  });
}

function drawForegroundLeaves(ctx, time, width, height) {
  ctx.fillStyle = "rgba(28, 51, 39, 0.5)";
  for (let i = 0; i < 12; i += 1) {
    const x = (i * 132 + Math.sin(time * 0.7 + i) * 7) % width;
    const y = height - 62 + Math.sin(i) * 18;
    ctx.beginPath();
    ctx.ellipse(x, y, 34, 9, Math.sin(i) * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
}
