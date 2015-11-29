console.log('loaded');

//Step 1: Global variables and Arrays
// var memoryBoard = [
// 		'a', 'b', 'c', 'd',
// 		'e', 'f', 'g', 'h',
// 		'a', 'b', 'c', 'd',
// 		'e', 'f', 'g', 'h'
// ];
var imagePairs = [
  '../card_images/card_images.001.png',
	'../card_images/card_images.002.png',
	'../card_images/card_images.003.png',
	'../card_images/card_images.004.png',
	'../card_images/card_images.005.png',
	'../card_images/card_images.006.png',
	'../card_images/card_images.007.png',
	'../card_images/card_images.008.png',
	'../card_images/card_images.001.png',
	'../card_images/card_images.002.png',
	'../card_images/card_images.003.png',
	'../card_images/card_images.004.png',
	'../card_images/card_images.005.png',
	'../card_images/card_images.006.png',
	'../card_images/card_images.007.png',
	'../card_images/card_images.008.png'
];
var openSquares = [];
var squareIds = [];

var flippedSquares = 0;
var matches = 0;
var moves = 0;
var time = 0;


//Step 2: have a prototype function that shuffles all my arrays everytime the page loads
Array.prototype.shuffle = function() {
  var i = this.length, tempValue, randomIndex;
  while (i !== 0) {
    randomIndex = Math.floor(Math.random() * i);
	  i--;
		tempValue = this[i];
		this[i] = this[randomIndex];
		this[randomIndex] = tempValue;
	}
};

//Step 3: function that sets up the logic for flipping the squares, and making a match.
function squareFlip($square, image) {
	//check if square is empty and there are less than two open squares
	if ($square.html() == '' && openSquares.length < 2) {
		$square.css({
			'background': 'url(' + image + ')',
			'background-size': 'contain'
		});
	if (openSquares.length == 0) {
		openSquares.push(image);
    squareIds.push($square);
		//if one card is flipped over...
	} else if (openSquares.length == 1) {
		openSquares.push(image);
		squareIds.push($square);
		//if you have a match...
	if (openSquares[0] === openSquares[1]) {
		flippedSquares += 2;
		//clear both arrays to get ready for a new matching sequence
		openSquares = [];
		squareIds = [];
		//this is if all tiles are flipped...game ended
  	if (flippedSquares == imagePairs.length) {
  		console.log('game over');
      gameOver();
    }
	} else {
		//connected to the if you have a match
  		function flipSide() {
				var $squareOne = $(squareIds[0]);
				var $squareTwo = $(squareIds[1]);
				$squareOne.html('');
				$squareTwo.html('');
				$squareOne.css({
					'background': 'url("../card_images/flipside.png")',
					'background-size': 'contain'
				});
				$squareTwo.css({
					'background': 'url("../card_images/flipside.png")',
					'background-size': 'contain'
				});
				//clear arrays
				openSquares = [];
				squareIds = [];
			}
		setTimeout(flipSide, 600);
	}
	}
	}
}

//Function that sets up the 4 x 4 grid...this goes with the onload function
function setupBoard() {
	flippedSquares = 0;
	var $board = $('#game-setup');
	var i = 0

	imagePairs.shuffle();

	imagePairs.forEach(function(image) {
		$('<div>').addClass('divSquares').appendTo($board)
		$('.divSquares').eq(i++).attr('id', i).on('click', function() {
			var $square = $(this);
      squareFlip($square, image);
      //Moves Made
      moveCount();
		});
	});
  //Timer Start Function
  setInterval(timer, 1000)
};


$(document).ready(function() {
  setupBoard();
});



//Moves Made / 2 player
var $moves = $('.game-info-li').eq(1);
var movesMade = 1;
function moveCount() {
  var currentMove = Math.floor(movesMade++/2)
  $moves.text('Moves: ' + currentMove);
  function playerTurn() {
  var player;
  var currentPlayer = 2
  for(i=0; i<currentPlayer; i++)
  if (currentMove % 2 == 1) {
    player = 'player1';
    $('#player-2').css({'background-color': '#D4FB79'})
    $('#player-1').css({'background-color': 'white'})
  }  else if (currentMove % 2 == 0) {
    player = 'player2';
    $('#player-1').css({'background-color': '#D4FB79'})
    $('#player-2').css({'background-color': 'white'})
  }
  console.log(player);
}
setTimeout(playerTurn, 650)
};

//Timer
var $clock = $('.game-info-li').eq(0);
var time = 0
function timer() {
  $clock.text('Time: ' + ++time + 's')
};

//Rain Champagne Emojis on winner screen



//Two Player Mode
//Same page, but matches count as points...and they have to go to the correct player

//Game over for 1 player mode
function gameOver(){
  $('#game').hide('slow', function(){
    var $gameOver = $('<p>').addClass('game-over').appendTo('#game-done')
    $gameOver.text('You matched all the Emojis!').css({
      'font-family': '"Fredoka One", cursive',
      'font-size': '72px',
      'color': '#FF6666',
      'text-align': 'center',
      'width': '600px',
      'margin': 'auto',
      'margin-bottom': '30px',
      'margin-top': '10%'
    });
    var $playAgainUl = $('<ul>').appendTo('#game-done')
    var $playAgain = $('<li>').addClass('play-again').appendTo($playAgainUl)
    $playAgain.text('Play Again');
    $playAgain.on('click', function() {
      console.log('clicked');
      $('#game-done').hide(setupBoard());

    });


  });
};

/* function reset() {
  var $playAgain = $('.play-again');
  $playAgain.on('click', function() {
    console.log('clicked');
    $('#game-done').hide(function() {
    setupBoard();
    }
  });
} */


//Reset Function









/*
//Player Object

function Player(name, matchesCount, moves) {
  this.name = name || Player ;
  this.matchCount = matchCount;
  this.moves = moves;
  this.win = false;
};

Player.prototype.matchCount = function() {
  if (match === true) {
    matchCount = this.matchCount++;
  } else {
    matchCount = this.matchCount;
  }
};

Player.prototype.win = function() {
  if (this.matchCount === player2.matchCount) {
    win = false;
    console.log('tie!')
  }
  else if (this.matchCount < player2.matchCount) {
    win = false;
    console.log(player2.name + ' wins!')
  }
  else if (this.matchCount > player2.matchCount) {
    win = true;
    console.log(this.name + ' wins!');
  }
};

//One Player

//function onePlayer() {

}
/* 2 player game:
4 x 4 grid 8 pairs of images

page shows player count on the right.
Timer begins.

Player 1 Turn:
click 2 images:
if 2 images are the same:
true…keep images flipped
Player1 matches++
(Maybe add play another round)
if not the same:
false…flip back
Player 2 Turn:
click 2 images:
if 2 images are the same:
true…keep images flipped
Player2 matches++
if not the same:
false…flip back
^^^^^^^^^^^^^
counts as 1 move each time…so 2 clicks = 1 move

game keeps going until first player to get 5 matches || or until all images are flipped (keep track of that with a for loop?)

Stop timer.

Winner:
if pOneMatches = pTwoMatches
winner = tie
if pOneMatches > pTwoMatches
winner = playerOne
else winner = playerTwo
hide all squares, replace with large text alerting who won */
