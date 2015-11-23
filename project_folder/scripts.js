console.log('loaded');

//Stuff I know I'll need at some point

//images?
var cards= [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8
];
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
    console.console.log(this.name + ' wins!');
  }
};

//One Player

function onePlayer() {

}
2 player game:
4 x 4 grid 8 pairs of images

page shows player count on the right.
T
imer begins.

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
hide all squares, replace with large text alerting who won
