class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.controls = new Controls();
  }

  update() {
    if (this.controls.forward) {
      this.y -= 2;
    }
    if (this.controls.reverse) {
      this.y += 2;
    }
    if (this.controls.left) {
      this.x -= 2;
    }
    if (this.controls.forward) {
      this.x += 2;
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
