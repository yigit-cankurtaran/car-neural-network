const canvas = document.getElementById("theCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);
// we made the car first, now we'll add it to the html

animate();

function animate() {
  car.update();
  car.draw(ctx);
  requestAnimationFrame(animate);
}
