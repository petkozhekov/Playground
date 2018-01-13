function Player(name){
    this.name = name;
    this.deck = new Array();

    this.getNextCard = function () {
        return this.deck.shift();
    }
}