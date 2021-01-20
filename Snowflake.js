
function getRandomSize() {
  var r = pow(random(1), 2)
  return constrain((r * 40), 5, 40);
}

class Snowflake {
  constructor(img) {
    this.img = img;
    this.randomize();
    this.dir = (random(1) > 0.5) ? 1 : -1;
    this.angle = random(TWO_PI);
    this.xoff = 0;
  }

  applyForce(force) {
    var frc = force.copy();
    frc.mult(this.r);

    // frc.divide(this.mass);
    this.acc.add(frc);
  }

  update() {
    this.xoff = sin(this.angle) * 2 * this.r;
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);

    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.y > height + this.r) {
      this.randomize();
    }

    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }

    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }

    this.angle += (this.dir * this.vel.mag()) / 5;
  }

  randomize() {
    var x = random(width);
    var y = random(-200, height);
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.r = getRandomSize();
  }

  // offScreen() {
  //   return (this.pos.y > height + this.r ||
  //     this.pos.x < -this.r ||
  //     this.pos.x > width + this.r);
  // }

  display() {
    push();
    translate(this.pos.x + this.xoff, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.r, this.r);
    pop();
  }
}