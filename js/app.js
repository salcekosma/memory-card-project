/*
 * Create a list that holds all of your cards
 */
let symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
  opened = [],
  matches = [],
  $deck = $('.deck');





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// Initial Game
function initGame() {
  var cards = shuffle(symbols);
  $deck.empty();
  for (var i = 0; i < cards.length; i++) {
    $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
  }
};

initGame();

// Create function that will flip the cards
/// and store them in 'opened' variable
function addFlipCard() {
  var $card = $('.card');

  $card.bind('click', function() {
    $flippedCard = $(this).addClass('card open show');
    opened.push($flippedCard);
    $flippedCard;
    comparedCard();
  })
};

addFlipCard();

// Creates function that adds to matches the class if after two clicks,
/// there is a match

function comparedCard() {
  if (opened.length > 1) {

    let cardOne = $(opened[0]).children().attr('class'),
        cardTwo = $(opened[1]).children().attr('class');

    if (cardOne === cardTwo) {
      $(opened[0]).toggleClass('.deck .card.match') && $(opened[1]).toggleClass('.deck .card.match');
    } else {
      $(opened[0]).toggleClass('open show') && $(opened[0]).toggleClass('open show');
    }
  }
};








/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
