let rows = 4; // total number of waves
let waveMaxHeight = 200;
let time = 0; // starting time for waves

let swellStart = 0; // starting time for swell
let swell = false;

let birdX;
let birdY;

function preload() {
  bird = loadImage("./images/albatross.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  birdX = width; // staring bird on right side of canvas
}

//adapted wave code from: https://editor.p5js.org/pippinbarr/sketches/bgKTIXoir
function drawWave(n, rows) {
  // drawing one wave
  let waveY = height - (n * waveMaxHeight) / 4;
  let t = time + n * 100;
  let waveX = 0;

  colorMode(HSB);
  //hue range to mimic inspo3
  let hue = map(n, 0, rows, 180, 240);
  fill(hue, 100, 50);
  noStroke();

  beginShape();
  vertex(waveX, waveY);
  for (let x = waveX; x <= width; x += 10) {
    let y = waveY - map(noise(t), 0, 1, 15, waveMaxHeight);
    vertex(x, y);
    t += 0.01;
  }
  vertex(width, waveY);
  vertex(width, height);
  vertex(0, height);
  endShape();
}

function drawWaves(n) {
  for (let idx = n; idx >= 0; idx--) {
    drawWave(idx, n);
  }
  time += 0.005;
}

//make waves swell after a mouse click and then subside
function mouseClicked() {
  swellStart = millis();
  swell = true;
}

function draw() {
  background(255);

  if (swell) {
    let swellDuration = millis() - swellStart;
    if (swellDuration < 2000) {
      waveMaxHeight = map(swellDuration, 0, 2000, 200, 350);
    } else if (swellDuration < 4000) {
      waveMaxHeight = map(swellDuration - 2000, 0, 2000, 350, 200);
    } else {
      swell = false;
      waveMaxHeight = 200;
    }
  }

  drawWaves(rows);

  //bird to fly across the screen
  birdX -= 2;
  birdY = height / 5 + 50 * sin(0.05 * frameCount);
  if (birdX < -150) {
    birdX = width;
    birdY = random(100, 150);
  }

  image(bird, birdX, birdY, 100, 100);
}
