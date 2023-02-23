const canvas = document.getElementById("theCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
// we made the width a bit smaller to give the ends a little margin
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
// car.draw(ctx);
// commented because we will add it to the function.
// the function will call itself again and again.
// we made the car first, now we'll add it to the html

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  // moving this here makes it so that it updates with every drawing
  // also fixes the issue of the car being stretched on the screen
  ctx.save();
  ctx.translate(0, -car.y);
  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(animate);
}
// ran into the problem of the car stretching
