class Edge {
  constructor(src, dest, weight) {
    this.src = src;
    this.dest = dest;
    this.weight = weight;
    this.color = "#D3D3D3";
  }

  midX() {
    if (this.src.x < this.dest.x) {
      return (this.dest.x + this.src.x) / 2;
    } else {
      return (this.src.x + this.dest.x) / 2;
    }
  }

  midY() {
    if (this.src.y < this.dest.y) {
      return (this.dest.y + this.src.y) / 2;
    } else {
      return (this.src.y + this.dest.y) / 2;
    }
  }

  toRed() {
    this.color = "red";
  }

  toGreen() {
    this.color = "#00FF00";
  }

  show() {
    //Line
    stroke(this.color);
    strokeWeight(4);
    line(this.src.x, this.src.y, this.dest.x, this.dest.y);

    //Weight
    fill("black");
    noStroke();
    textSize(17);
    textFont("Helvetica");
    text(this.weight, this.midX() + 5, this.midY() - 20);
  }
}
