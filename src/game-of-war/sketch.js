var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(480, 640);
  centerCanvas();
  background(112, 130, 56);
}

function windowResized() {
  centerCanvas();
}