var guessesLeftMessage = document.querySelector('.guessesLeftMessage');
var gameText = document.querySelector('.gameText');
var displayWord = document.querySelector('.displayWord');
var lettersGuessed = document.querySelector('.lettersGuessed');
var displayMessage = document.querySelector('.displayMessage');

var guessPics = document.querySelector('.pics');

var wordSubmitButton = document.querySelector('.wordSubmitButton');
var guessButton = document.querySelector('.guessButton');
var secretWord = document.querySelector('.secretWord');
var resetButton = document.querySelector('.resetButton');

var guessCount = 5;
var lettersRevealed = 0;
var displayImage = 1;

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

  displayMessage.style.display = 'none';

  gameStart.style.display = 'initial';
  // start with 1 and skip 2 each time, every other node is a text and we only want images
  for (var i = 1; i <= 11; i+=2) {
    guessPics.childNodes[i].style.display = 'none';
  }

  guessPics.childNodes[displayImage].style.display = 'initial';

  resetButton.style.display = 'none';

}

function guessLetter() {
  if (guessCharSet.has(letterGuess.value)) {
    displayMessage.textContent = "You have already guessed that letter!";
    displayMessage.style.display = 'initial';
    return;
  }
  guessCharSet.add(letterGuess.value);
  displayMessage.style.display = 'none';

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
    guessPics.childNodes[displayImage].style.display = 'none';
    displayImage += 2;
    guessPics.childNodes[displayImage].style.display = 'initial';
  }

  lettersGuessed.textContent += letterGuess.value + ' ';
  guessesLeftMessage.textContent = "You have " + guessCount + " incorrect guesses remaining.";

  checkWinOrLoss();

}

function checkWinOrLoss() {
  if(lettersRevealed === secretWord.value.length) {
    displayMessage.style.display = 'initial';
    displayMessage.textContent = 'You win!!!'
    guessButton.disabled = true;
    resetButton.style.display = 'initial';
    return;
  }
  if(guessCount === 0) {
    displayMessage.style.display = 'initial';
    displayMessage.textContent = 'You lose!!'
    guessButton.disabled = true;
    resetButton.style.display = 'initial';
    return;
  }
}

function resetGame() {
  displayMessage.style.display = 'none';
  guessButton.disabled = false;
  guessCount = 5;
  guessCharSet = new Set();
  lettersRevealed = 0;
  displayImage = 1;
  wordToDisplay = "";
  gameStart.style.display = 'none';
  intro.style.display = 'initial';
}

wordSubmitButton.addEventListener('click', setupGame);
guessButton.addEventListener('click', guessLetter);
resetButton.addEventListener('click',resetGame);
