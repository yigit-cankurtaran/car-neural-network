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
    this.friction = 0.05;
    this.angle = 0;

    this.sensor = new Sensor(this);
    // passing the car to the sensor object. it will belong to the car.
    this.controls = new Controls();
  }

  update() {
    this.#move();
    this.sensor.update();
    // updates the sensor along with the movement
  }

  #move() {
    if (this.controls.forward) this.speed += this.acceleration;
    if (this.controls.reverse) this.speed -= this.acceleration;
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    // we limit the max speed on the forward direction.
    if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2;
    // we limit the max speed on the backward direction.
    // car going backwards will be slower than car going forwards.
    if (this.speed > 0) this.speed -= this.friction;
    // friction is applied to the car while it's moving forward
    if (this.speed < 0) this.speed += this.friction;
    // applies friction to the car while it's moving backwards
    // but it means the car's always moving because the speed is never exactly 0.
    if (Math.abs(this.speed) < this.friction) this.speed = 0;
    // this makes it so that if the car's speed is less than the friction,
    // the car's speed will be 0.
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      // this makes it so that if the car's speed is positive,
      // the car's angle will be positive.
      // meaning backwards is flipped
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
    // this makes the car turn left and right.
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    // the above code rotates the car to the left or right.
    ctx.beginPath();
    ctx.rect(
      // the car will be a simple rectangle
      -this.width / 2,
      // the x is going to be in the center of the car
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
    ctx.restore();
    this.sensor.draw(ctx);
    // the car will now draw its own sensor.
  }
}
