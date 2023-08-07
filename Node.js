class Node {
  constructor(info, x, y) {
    this.info = info;
    this.x = x;
    this.y = y;
    this.diamet = 50;
    this.color = "gray";
    this.cost = 9999;
    this.prev = null;
  }

  toRed() {
    this.color = "red";
  }

  show() {
    stroke(this.color);
    strokeWeight(3);
    fill("white");
    circle(this.x, this.y, this.diamet);

    //Number inside
    fill(0);
    noStroke();
    textSize(20);
    textFont("Helvetica");
    textAlign(CENTER, CENTER);
    text(this.info, this.x, this.y);
  }
}
