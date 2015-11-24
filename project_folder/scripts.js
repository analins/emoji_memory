
console.log('loaded');


//Stuff I know I'll need at some point

//images?

//render 4x4 grid
//table or div setup
//8 classes

//array for a 4 x 4 board
var memoryBoard = [
  'a', 'b', 'c', 'd',
  'e', 'f', 'g', 'h',
  'a', 'b', 'c', 'd',
  'e', 'f', 'g', 'h'
];
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
var flippedSquares = 0;
var openSquares = [];
var squareIds = [];

//function that shuffles the memoryBoard array everytime the page loads
Array.prototype.shuffle = function() {
  var i = this.length, tempValue, randomIndex ;
  while (i !== 0 ) {
    randomIndex = Math.floor(Math.random() * i);
    i--;
    tempValue = this[i];
    this[i] = this[randomIndex];
    this[randomIndex] = tempValue;
  }
};




function squareFlip($square, image){

console.log(image)


    //check if square is empty and there are less than two open squares
    if($square.html() == '' && openSquares.length < 2) {
        $square.css({
          'background': 'url(' + image + ')',
          'background-size': 'contain'
        });
        if(openSquares.length == 0) {
            openSquares.push(image);
          //if one card is flipped over...
        } else if(openSquares.length == 1){
            openSquares.push(image);
            squareIds.push($square.attr('id', image));
          //if you have a match...
            if(openSquares[0] == openSquares[1]) {
                flippedSquares+=2;
              //clear both arrays to get ready for a new matching sequence
                openSquares = [];
                squareIds = [];
              //this is if all tiles are flipped...game ended
                if(flippedSquares == openSquares.length) {
                    console.log('game over')
                    setupBoard();
                }
            } else {
                //connected to the if you have a match
                function flipSide(){
                    var $squareOne = $(squareIds[0]);
                    var $squareTwo = $(squareIds[1]);
                    $squareOne.css({
                      'background': 'url("../card_images/flipside.png")',
                      'background-size': 'contain'
                  });
                    $squareOne.html('');
                    $squareTwo.css({
                      'background': 'url("../card_images/flipside.png")',
                      'background-size': 'contain'
                    });
                    $squareTwo.html('');
                  //clear arrays
                    openSquares = [];
                    squareIds = [];
                }
                setTimeout(flipSide, 500);
            }
        }
    }
  }

//Function that sets up the 4 x 4 grid...this goes with the onload function
function setupBoard() {
    flippedSquares = 0;
		var $board = $('#game-setup');
    var i = 0
    // var $output = ''
    imagePairs.shuffle();

		imagePairs.forEach(function(image){
      $('<div>').addClass('divSquares').appendTo($board)


      // $output+=
      $('.divSquares').eq(i++).attr('id', i).on('click', function() {
        //console.log(image)
        // var imageIndex = i;
        // console.log(i, imagePairs[imageIndex])
        var $square = $(this);
        squareFlip($square, image);
      });
    });
};
				//$("<img src='" + image + "'>'").attr('class', image).addClass('squares').appendTo($('.divSquares').eq(i++))



        $(document).ready(function() {
        setupBoard();
          });





/* function setupBoard() {
				var $board = $('#game-setup')
				memoryBoard.forEach(function(i){
					$('<div>').addClass('squares').appendTo($board)
				})
				}
setupBoard()

//Assigns Images to each div
function assignImages() {
  var $squareDivs = $('.squares')
  var i = 0;
  var x = 0;
  shuffle()
  imagePairs.forEach(function(image){
    $squareDivs.eq(i++).append($('<div>').addClass('image'))
    $('.image').eq(x++).append($("<img src='" + image + "'>'").attr('class', image))
  })
}
assignImages()

/*



function renderGame() {
  //data binding to update classes
}
function resetGame() {
  //shuffles cards
  //reset timer
  //reset movecount
}

function onePlayer() {

};

function twoPlayer() {

}


//Player Object

function Player(name, matchesCount, moves) {
  this.name = name //|| Player 1 or 2;
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

function onePlayer() {

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
