/*
 * Create a list that holds all of your cards
 */
let symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
  opened = [],
  matches = 0,
  moves = [],
  $moveCount = $('.moves'),
  $starsCount = $('.fa-star'),
  delay = 400,
  $deck = $('.deck'),
  deckSize = symbols.length / 2,
  currentTimer,
  second = 0,
  $timer = $('.timer'),
  $restart = $('.restart'),
  rank3stars = 8,
  rank2stars = 14,
  rank1stars = 18;

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
  let cards = shuffle(symbols);
  $deck.empty();
  match = 0;
  moves = 0;
  $moveCount.text('0');
  $starsCount.removeClass('fa-star-o').addClass('fa-star');
  for (var i = 0; i < cards.length; i++) {
    $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
  }
  addFlipCard();
  resetTimer(currentTimer);
  second = 0;
  $timer.text(`${second}`)
  initTime();

};

// Set Rating and final Score
function setRating(moves) {
  var rating = 3;
  if (moves > rank3stars && moves < rank2stars) {
    $starsCount.eq(2).removeClass('fa-star').addClass('fa-star-o');
    rating = 2;
  } else if (moves > rank2stars && moves < rank1stars) {
    $starsCount.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 1;
  } else if (moves > rank1stars) {
    rating = 1;
  }
  return {
    score: rating
  };
};

// End The Game
function endGame(moves, score) {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Congratulations! You Won!',
    text: 'With ' + moves + ' Moves and ' + score + ' Stars in ' + (second-1) + ' Seconds.\n Woooooo!',
    type: 'success',
    confirmButtonColor: '#02ccba',
    confirmButtonText: 'Play again!',
    // endGame(),
  }).then(function(isConfirm) {
    if (isConfirm) {
      initGame();
    }
  })
};

// Restart All Game
$restart.bind('click', function() {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: "Your progress will be Lost!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Yes, Restart Game!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      initGame();
    }
  })
});

// Creates function that adds to matches the class if after two clicks,
/// there is a match
function comparedCard() {

  if (opened.length == 2) {

    let cardOne = $(opened[0]).children().attr('class'),
      cardTwo = $(opened[1]).children().attr('class');

    if (cardOne === cardTwo) {
      opened[0].addClass('match') && opened[1].addClass('match');
      opened = [];
      match++;

    } else {
      setTimeout(function() {
        opened[0].removeClass('open show') && opened[1].removeClass('open show');
        opened = [];

      }, delay / 1.5);
      moves++;
      setRating(moves);
      $moveCount.html(moves);
    }
    if (deckSize === match) {
      setRating(moves);
      var score = setRating(moves).score;
      setTimeout(function () {
        endGame(moves,score);
      },500);
      resetTimer(currentTimer);
    }
  }
};


// Create function that will flip the cards
/// and store them in 'opened' variable
function addFlipCard() {
  var $card = $('.card');

  $card.bind('click', function() {
    $flippedCard = $(this).addClass('card open show');
    opened.push($flippedCard);
    comparedCard();
  })
};


//Start and reset time
function initTime() {
  currentTimer = setInterval(function() {
    $timer.text(`${second}`)
    second = second + 1
  }, 1000);
}

function resetTimer(timer) {
  if (timer) {
    clearInterval(timer);
  }
}

initGame();









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
