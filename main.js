const canvas = document.getElementById("theCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
// we made the width a bit smaller to give the ends a little margin
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
// car.draw(ctx);
// commented because we will add it to the function.
// the function will call itself again and again.
// we made the car first, now we'll add it to the html

// traffic is going to be an array of cars.
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];

animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders);
  }
  // above code updates the other chars as well
  car.update(road.borders);
  canvas.height = window.innerHeight;
  // moving this here makes it so that it updates with every drawing
  // also fixes the issue of the car being stretched on the screen
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  // above code will draw each car on the canvas
  car.draw(ctx);
  // centers the camera on the car, puts the car on the lower part of the screen
  ctx.restore();
  requestAnimationFrame(animate);
}
// ran into the problem of the car stretching
