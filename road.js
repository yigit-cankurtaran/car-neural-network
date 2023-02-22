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
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 0; i <= this.laneCount; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
      //   drawing lines on the left
      // i is the lane count the end is gonna be 1, the rest is gonna be percentages
      // lerp is a function that takes two numbers and returns a number between them
    //   const y = lerp(this.top, this.bottom, i / this.laneCount);
    }
  }
}
