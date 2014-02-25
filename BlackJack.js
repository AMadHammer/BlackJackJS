function Card(suit, id) {
    this.suit = suit,
    this.id = id,

    this.face = function () {
        switch (id) {
            case 11:
                return 'J';
                break;
            case 12:
                return 'Q';
                break;
            case 13:
                return 'K';
                break;
            default:
                return id;
        }
    }(),

    this.value = function () {
        if (id > 10) return 10;
        else return id;
    }();
}

function Deck() {
    var deckOfCards = [];
    this.GetCards = function () {
        return deckOfCards;
    };

    this.CreateNewDeck = function () {
        for (var i = 0; i < 13; i++) {
            deckOfCards.push(new Card('♠', i + 1, i + 1));
        }
        for (var i2 = 0; i2 < 13; i2++) {
            deckOfCards.push(new Card('♥', i2 + 1, i2 + 1));
        }

        for (var i3 = 0; i3 < 13; i3++) {
            deckOfCards.push(new Card('♦', i3 + 1, i3 + 1));
        }

        for (var i4 = 0; i4 < 13; i4++) {
            deckOfCards.push(new Card('♣', i4 + 1, i4 + 1));
        }
    };
}

var deck = new Deck();
deck.CreateNewDeck();
var cardArray = deck.GetCards();


//Function to get a card from the deck
var dealCard = function (deck) {
    var randIndex = Math.floor((Math.random() * deck.length)); //0 to deck size
    var returnedCard = deck[randIndex];
    deck.splice(randIndex, 1);
    return returnedCard;
};


//////////////////////////////////////////////////////////////////////////////////
//Play the game
//////////////////////////////////////////////////////////////////////////////////
var playerHand = [];
playerHand.push(dealCard(cardArray));
playerHand.push(dealCard(cardArray));
var DealerHand = [];
DealerHand.push(dealCard(cardArray));
DealerHand.push(dealCard(cardArray));


function getPlayerPoint(){
   return playerHand.reduce( function(total, num){ return total + num.value }, 0);
}

function getDealerPoint(){
   return DealerHand.reduce( function(total, num){ return total + num.value }, 0);
}

function checkWhoWon(){
    var playerPoint = getPlayerPoint();
    if(playerPoint > 21)
    {
        alert("you went over with " + playerPoint);
        //game over
    }
}

drawGame();

$("#hitMeButton").click(function () {
    playerHand.push(dealCard(cardArray));
    clean();
    drawGame();
    checkWhoWon();
});

$("#stayButton").click(function () {
    //add to dealer stack if less or equal to the player
    var playerPoint = getPlayerPoint();
    var dealerPoint = getDealerPoint();
    while(dealerPoint < playerPoint)
    {
        DealerHand.push(dealCard(cardArray));
        dealerPoint = getDealerPoint();
        alert(dealerPoint);
    }
    clean();
    drawGame();

});


//alert(playerHand.length);
//////////////////////////////////////////////////////////////////////////////////
//Display the game
//////////////////////////////////////////////////////////////////////////////////

function clean() {
    $('#playerHand').empty();
    $('#DealerHand').empty();
    $('#cardlist').empty();
}


function drawGame() {
    $('#DealerHand').append("Dealer: ");
    for (var c in DealerHand) {
        $('#DealerHand').append("[" + DealerHand[c].suit + DealerHand[c].face + "] ");
    }
    $('#playerHand').append("Player: ");
    for (var c in playerHand) {
        $('#playerHand').append("[" + playerHand[c].suit +  playerHand[c].face + "] ");
    }
    /*$('#cardlist').append("Card: ");
    for (var c in cardArray) {
        $('#cardlist').append("[" + cardArray[c].suit + cardArray[c].face + "]");
    }
    */
};