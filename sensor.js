class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 3;
    this.rayLength = 100;
    //   the range of the sensors
    this.raySpread = Math.PI / 4;
    // the same as 45 degrees

    this.rays = [];
  }

  update() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(this.raySpread / 2, -this.raySpread / 2, i / (this.rayCount - 1)) +
        this.car.angle;
      // adding the car's angle to the ray angle makes the sensor turn with the car.

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
      // defining a segment. like how we did with the lanes
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.stroke();
    }
  }
}
