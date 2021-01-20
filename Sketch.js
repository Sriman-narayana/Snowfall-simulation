
var snow = [];
var gravity;
var zoff = 0;

var spriteSheet;
var textures = [];

function preload() {
  spriteSheet = loadImage('snowflakes.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150);

  gravity = createVector(0, 0.02);

  for (var x = 0; x < spriteSheet.width; x += 32) {
    for (var y = 0; y < spriteSheet.height; y += 32) {
      var img = spriteSheet.get(x, y, 32, 32);
      textures.push(img);
      // image(img, x, y);
    }
  }

  for (var i = 0; i < floor(width/2); i++) {
    var design = random(textures);
    snow.push(new Snowflake(design));
  }
}

function draw() {
  background(150);

  zoff += 0.01;

  for (var flake of snow) {
    var xoff = flake.pos.x / width;
    var yoff = flake.pos.y / height;
    var wang = noise(xoff, yoff, zoff) * TWO_PI; // wind Angle
    var wind = p5.Vector.fromAngle(wang);
    wind.mult(0.01);
  
    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.display();
    flake.update();
  }
}