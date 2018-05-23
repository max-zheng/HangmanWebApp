var lettersGuessed = document.querySelector('.lettersGuessed');
var displayWord = document.querySelector('.displayWord');
var gameText = document.querySelector('.gameText');

var wordSubmit = document.querySelector('.wordSubmit');
var secretWord = document.querySelector('.secretWord');

var guessCount = 6;
var resetButton;
var guessCharSet = new Set();

var intro = document.querySelector('.intro');
var gameStart = document.querySelector('.gameStart');
gameStart.style.display = 'none';

function setupGame() {
  intro.style.display = 'none';

  document.getElementById("guessMessage").innerHTML=
  "You have " + guessCount + " guesses remaining.";

  gameStart.style.display = 'initial';
  guessCount--;
}

wordSubmit.addEventListener('click', setupGame);
