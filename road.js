class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 200000;
    //   when drawing things with infinite size, weird things might happen
    //   might be subject to change
    //   was subject to change. changed from Infinity to 200000

    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
    // we want borders for a collision system
    // we use borders because our lines are straight
    // but that will make it more scalable for other forms or shapes.
    // this.lanes = [];
    // this.cars = []
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
    // we need the lane index so we don't trip up when he have a value outside of the lane number
    // this makes it so that the car, no matter what happens, will go to the rightmost lane
    // but we'll keep the car in the center for the tutorial
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 1; i <= this.laneCount - 1; i++) {
      // we're gonna change this function around
      // to make it more scalable if we change the shapes, like creating turns and such
      const x = lerp(this.left, this.right, i / this.laneCount);
      ctx.setLineDash([20, 20]);
      // 20 pixel break every 20 pixels
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
      //   drawing lines on the left
      // i is the lane count the end is gonna be 1, the rest is gonna be percentages
      // lerp is a function that takes two numbers and returns a number between them
      //   const y = lerp(this.top, this.bottom, i / this.laneCount);
    }

    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      // begins path, moves to the first border in x
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
