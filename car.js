class Car {
  constructor(x, y, width, height, controlType, maxSpeed = 5) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.4;
    this.maxSpeed = maxSpeed;
    // cars by default will have a max speed of 5
    // but i can change the max speed of other cars in main.js
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;

    this.sensor = new Sensor(this);
    // passing the car to the sensor object. it will belong to the car.
    this.controls = new Controls(controlType);
  }

  update(roadBorders) {
    // i don't want the car moving if it's damaged
    if (!this.damaged) {
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDamage(roadBorders);
    }
    this.sensor.update(roadBorders);
    // updates the sensor along with the movement
  }

  #assessDamage(roadBorders) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    return false;
  }

  // because we don't know the corners of the car, to implement collision we need to figure that out first

  #createPolygon() {
    const points = [];
    // one point per corner of the car
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    // console.table(points);
    // works perfectly
    // changing the values above will give other shapes to our car.
    // experiment later
    return points;
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
    if (this.damaged) ctx.fillStyle = "gray";
    else ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    this.sensor.draw(ctx);
    // the car will now draw its own sensor.
  }
}
