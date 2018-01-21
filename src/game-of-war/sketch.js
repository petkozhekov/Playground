var cnv, player1, player2, sprite,
  cardWidth = 81,
  cardHeight = 117,
  cardBack,
  cardBackOffset = 40,
  allCards = new Array();


/*--------------------METHODS--------------------*/
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function createCards() {
  var face, i = 0, j = 0,
    pips = ['Jack', 'Queen', 'King', 'Ace'],
    suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  while (allCards.length < 52) {
    face = i % 13 > 8 ? pips[(i % 13) - 9] + ' of ' : (i % 13 + 2) + ' of ';
    face += suites[floor(i / 13)];
    allCards.push(new Card(face, i % 13, floor(i / 13)));
    i++;
  }
}

function dealCards(cards) {
  var card;
  for (var i = 0; i < cards.length; i++) {
    card = cards[floor(random(52))];
    if (card.picked) {
      i--;
      continue;
    }
    if (i % 2 === 0) {
      player1.deck.push(card);
    } else {
      player2.deck.push(card);
    }
    card.picked = true;
  }
}

function renderCard(posX, posY, card) {
  var x, y;
  x = cardWidth * card.value;
  y = cardHeight * card.suite;
  image(sprite, posX, posY, cardWidth, cardHeight, x, y, cardWidth, cardHeight);
}

function handleWar(cardsOnTable) {
  var card1, card2, card, offset = 20,
    cardX = width / 2 - cardWidth / 2 + cardWidth + offset,
    cardY = cardHeight + cardBackOffset + 20;
  if (player1.deck.length < 2) {
    addCardsToDeck(player2, cardsOnTable);
    return;
  } else if ((player2.deck.length < 2)) {
    addCardsToDeck(player1, cardsOnTable);
    return;
  }
  for (var i = 0; i < 2; i++) {
    card = player1.getNextCard();
    renderCard(cardX + i * offset, cardY, card);
    cardsOnTable.push(card);

    card = player2.getNextCard();
    renderCard(cardX + i * offset, height - (cardY + cardHeight), card);
    cardsOnTable.push(card);
  }

  card1 = player1.getNextCard();
  renderCard(cardX + i * offset, cardY, card1);
  cardsOnTable.push(card1);
  card2 = player2.getNextCard();
  renderCard(cardX + i * offset, height - (cardY + cardHeight), card2);
  cardsOnTable.push(card2);

  if (card1.value > card2.value) {
    addCardsToDeck(player1, cardsOnTable);
  } else if (card1.value < card2.value) {
    addCardsToDeck(player2, cardsOnTable);
  } else {
    handleWar(cardsOnTable);
  }
}

function addCardsToDeck(player, cards) {
  for (var i = 0; i < cards.length; i++) {
    player.deck.push(cards[i]);
  }
}
/*--------------------SETUP--------------------*/
function setup() {
  createCards();
  player1 = new Player('Computer');
  player2 = new Player('Petko');
  dealCards(allCards);

  renderTable();
  console.log(player1);
  console.log(player2);
}

function renderTable(war, cardsOnTable) {
  var cardX, cardY;
  cnv = createCanvas(480, 640);
  centerCanvas();
  background(112, 130, 56);
  cardBack = new Card("back", 0, 4);

  //render back of the card
  renderCard(cardBackOffset, cardBackOffset, cardBack);
  renderCard(cardBackOffset, height - (cardHeight + cardBackOffset), cardBack);

  //render card count
  textSize(32);
  text(player1.deck.length, cardBackOffset + (cardWidth / 2) - 16, cardBackOffset + (cardHeight / 2) + 10);
  text(player2.deck.length, cardBackOffset + (cardWidth / 2) - 16, height - (cardHeight + cardBackOffset) + (cardHeight / 2) + 10);

  //render cards  
  cardX = width / 2 - cardWidth / 2;
  cardY = cardHeight + cardBackOffset + 20;
  if (cardsOnTable && cardsOnTable.length > 0 && !war) {
    renderCard(cardX, cardY, cardsOnTable[0]);
    renderCard(cardX, height - (cardY + cardHeight), cardsOnTable[1]);
  }
}

/*--------------------EVENTS--------------------*/
function windowResized() {
  centerCanvas();
}

function preload() {
  sprite = loadImage('images/fancyCards.gif');
}

function mouseClicked() {
  var cardsOnTable = [];
  cardsOnTable.push(player1.getNextCard());
  cardsOnTable.push(player2.getNextCard());
  renderTable(false, cardsOnTable);

  if (cardsOnTable[0].value > cardsOnTable[1].value) {
    player1.deck.push(cardsOnTable[0]);
    player1.deck.push(cardsOnTable[1]);
  } else if (cardsOnTable[0].value < cardsOnTable[1].value) {
    player2.deck.push(cardsOnTable[0]);
    player2.deck.push(cardsOnTable[1]);
  } else {
    handleWar(cardsOnTable)
  }

  console.log(player1);
  console.log(player2);
}