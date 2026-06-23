export function drawWeather(ctx, scene, time, width, height) {
  drawRain(ctx, scene.weather.rain, time, width, height);
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
