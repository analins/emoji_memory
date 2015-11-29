console.log('loaded');

//Global Variables

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

//MOVES MADE

  var $moves = $('.game-info-li').eq(1);
  var movesMade = 1;
  function moveCount() {
    var currentMove = Math.floor(movesMade++/2)
    $moves.text('Moves: ' + currentMove);
    return currentMove;
  };

//TIMER
var $clock = $('.game-info-li').eq(0);
var time = 0
function timer() {
  $clock.text('Time: ' + ++time + 's')
};

//Rain Champagne Emojis on Winner Screen
function makeItRain(){
  var $bottleDiv = $('<div>').appendTo('#game-done');
  var $bottleOne = $('<img src="../card_images/winning.png">').addClass('winning').appendTo($bottleDiv);
  var $bottleTwo = $('<img src="../card_images/winning.png">').addClass('winning').appendTo($bottleDiv);
  $bottleDiv.css({
    'max-width': '200px',
  })
  $('.winning').css({
    'position': 'absolute',
    'margin': '7% 50% 50% 50% '
  })
  $bottleTwo.css({
    'transform': 'scaleX(-1)'
  })
  var rainHeight = $('body').height();
  var rainWidth = $('#game-done').width();

  $bottleOne.animate({
    top: '+=' + rainHeight,
    //right: rainWidth,
    left: (Math.random() * 200) -50 + '%',
    width: 150,
    opacity: 0
  }, 3000);
  $bottleTwo.animate({
    top: '+=' + rainHeight,
    right: (Math.random() * 200) -50 + '%',
    width: 150,
    opacity: 0
  }, 3000);
};

//############# ONE PLAYER #################//

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
};

//Function that sets up the game
function setupBoard() {
	flippedSquares = 0;
	var $board = $('#game-setup');
	var i = 0
  //shuffle images array
	imagePairs.shuffle();
  //adds the 16 squares...4x4 grid
	imagePairs.forEach(function(image) {
		$('<div>').addClass('divSquares').appendTo($board)
		$('.divSquares').eq(i++).attr('id', i).on('click', function() {
			var $square = $(this);
      squareFlipOne($square, image);
      //Moves Made
      moveCount();
		});
	});
  //Timer Start Function
  setInterval(function(){
    timer();
  }, 1000)
};


$(document).ready(function() {
  setupBoard();
});

//ONE PLAYER GAMEOVER
function gameOver(){
  $('#game').hide('slow', function(){
    makeItRain()
    setInterval(function(){
      makeItRain()}, 150);
    var $gameOver = $('<p>').addClass('game-over').appendTo('#game-done')
    $gameOver.text('You matched all the Emojis!').css({
      'font-family': '"Fredoka One", cursive',
      'font-size': '72px',
      'color': '#FF6666',
      'text-align': 'center',
      'width': '600px',
      'margin': 'auto',
      'margin-bottom': '30px',
      'margin-top': '20%'
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

//############# TWO PLAYER #################//

  //Determine Current Player
  var turn = 1
  function playerTurn() {
    var currentPlayer = Math.floor(turn++/2)
    var player;
    if (currentPlayer % 2 == 1) {
      player = 'player1';
      $('#player-2').css({'background-color': '#D4FB79'})
      $('#player-1').css({'background-color': 'white'})
    }  else if (currentPlayer % 2 == 0) {
      player = 'player2';
      $('#player-1').css({'background-color': '#D4FB79'})
      $('#player-2').css({'background-color': 'white'})
    }
    console.log(player);
    return player;
  };

//Two Player squareFlip function
var pOneMatches = 1
var pTwoMatches = 1
function squareFlipTwo($square, image) {
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
  //Two Player logic
    var player = playerTurn();
    if (player == 'player1'){
      $('#player-1').text('Player 1 Matches: ' + pOneMatches++);
    } else if (player == 'player2'){
      $('#player-2').text('Player 2 Matches: ' + pTwoMatches++);
    }
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
};

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
