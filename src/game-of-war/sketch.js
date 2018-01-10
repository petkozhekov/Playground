var cnv, player1, player2,
  cards = new Array();

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function createCards() {
  var face, i = 0, j = 0,
    pips = ['Jack', 'Queen', 'King', 'Ace'],
    suites = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  while (cards.length < 52) {
    face = i % 13 > 8 ? pips[(i % 13) - 9] + ' of ': (i % 13 + 2) + ' of ';
    face += suites[floor(i / 13)];
    cards.push(new Card(face, i % 13))
    i++;
  }
}

function setup() {
  cnv = createCanvas(480, 640);
  centerCanvas();
  background(112, 130, 56);
  createCards();
  console.log(cards);
}

function windowResized() {
  centerCanvas();
}