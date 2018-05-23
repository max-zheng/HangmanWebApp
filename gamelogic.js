var guessesLeftMessage = document.querySelector('.guessesLeftMessage');
var gameText = document.querySelector('.gameText');
var displayWord = document.querySelector('.displayWord');
var lettersGuessed = document.querySelector('.lettersGuessed');
var displayMessage = document.querySelector('.displayMessage');

var wordSubmit = document.querySelector('.wordSubmit');
var guessButton = document.querySelector('.guessButton');
var secretWord = document.querySelector('.secretWord');

var guessCount = 5;
var lettersRevealed = 0;
var resetButton;
var guessCharSet = new Set();

var intro = document.querySelector('.intro');
var gameStart = document.querySelector('.gameStart');

var wordToDisplay = "";

gameStart.style.display = 'none';

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function setupGame() {
  intro.style.display = 'none';

  for (i = 0; i < secretWord.value.length; i++) {
      wordToDisplay += "_ ";
  }

  guessesLeftMessage.textContent = "You have " + guessCount + " incorrect guesses remaining.";

  displayWord.textContent = wordToDisplay;

  lettersGuessed.textContent = "Letters guessed: ";

  gameStart.style.display = 'initial';

}

function guessLetter() {
  if (guessCharSet.has(letterGuess.value)) {
    displayMessage.textContent = "You have already guessed that number!";
    displayMessage.style.backgroundColor = 'blue';
    return;
  }
  guessCharSet.add(letterGuess.value);

  var letterFound = false;
  for (var i = 0; i < secretWord.value.length; i++) {
    if(letterGuess.value === secretWord.value[i]) {
      letterFound = true;
      lettersRevealed++;
      wordToDisplay = setCharAt(wordToDisplay,i*2,letterGuess.value);
      displayWord.textContent = wordToDisplay;
    }
  }

  if(letterFound === false) {
    guessCount --;
  }

  lettersGuessed.textContent += letterGuess.value + ' ';
  guessesLeftMessage.textContent = "You have " + guessCount + " incorrect guesses remaining.";

  checkWinOrLoss();

}

function checkWinOrLoss() {
  if(lettersRevealed === secretWord.value.length) {
    displayMessage.textContent = 'You win!!!'
    return;
  }
  if(guessCount === 0) {
    displayMessage.textContent = 'You lose!!'
    return;
  }
}

wordSubmit.addEventListener('click', setupGame);
guessButton.addEventListener('click', guessLetter);
