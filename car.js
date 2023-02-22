class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.4;
    this.maxSpeed = 5;
    // different values than the tutorial. i wanted a bit faster
    this.friction = 0.03;

    this.controls = new Controls();
  }

  update() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    // we limit the max speed on the forward direction.
    if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2;
    // we limit the max speed on the backward direction.
    // car going backwards will be slower than car going forwards.
    if (this.speed > 0) this.speed -= this.friction;
    // friction is applied to the car while it's moving forward
    this.y -= this.speed;
    if (this.speed < 0) this.speed += this.friction;
    // applies friction to the car while it's moving backwards
    if (this.controls.left) {
      // this.x -= 2;
    }
    if (this.controls.forward) {
      // this.x += 2;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      // the car will be a simple rectangle
      this.x - this.width / 2,
      // the x is going to be in the center of the car
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}
