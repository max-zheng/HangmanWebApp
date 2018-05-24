var guessesLeftMessage = document.querySelector('.guessesLeftMessage');
var gameText = document.querySelector('.gameText');
var displayWord = document.querySelector('.displayWord');
var lettersGuessed = document.querySelector('.lettersGuessed');
var displayMessage = document.querySelector('.displayMessage');
var errorMessage = document.querySelector('.errorMessage');

var guessPics = document.querySelector('.pics');

var wordSubmitButton = document.querySelector('.wordSubmitButton');
var randomWordButton = document.querySelector('.randomWordButton');
var guessButton = document.querySelector('.guessButton');
var resetButton = document.querySelector('.resetButton');

var guessCount = 5;
var lettersRevealed = 0;
var displayImage = 1;

var guessCharSet = new Set();

var intro = document.querySelector('.intro');
var gameStart = document.querySelector('.gameStart');

var wordToDisplay = "";

var secretWord;

var wordDictionary;

gameStart.style.display = 'none';
errorMessage.style.display = 'none';

document.querySelector('.secretWord').focus();

var req = new XMLHttpRequest();
req.onload = function(){
  wordDictionary = this.responseText.split('\n');
};
req.open('GET', 'words.txt');
req.send();

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function setUp2PlayerGame() {
  secretWord = document.querySelector('.secretWord').value;
  if(!isNonEmptyStr(secretWord)) {
    errorMessage.style.display = 'initial';
    return;
  }
  setupGame();
}

function setUpRandomGame() {
  var index = Math.floor(Math.random() * wordDictionary.length);
  secretWord = wordDictionary[index];
  setupGame();
}

function setupGame() {
  intro.style.display = 'none';

  for (i = 0; i < secretWord.length; i++) {
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

  document.querySelector('.letterGuess').focus();

}

function isNonEmptyStr(str) {
  return str.length >= 1 && str.match(/[a-z]/i);
}

function guessLetter() {

  if(!isNonEmptyStr(letterGuess.value)) {
    displayMessage.textContent = "Please guess a letter from a-z!"
    displayMessage.style.display = 'initial';
    return;
  }

  if (guessCharSet.has(letterGuess.value)) {
    displayMessage.textContent = "You have already guessed that letter!";
    displayMessage.style.display = 'initial';
    return;
  }
  guessCharSet.add(letterGuess.value);
  displayMessage.style.display = 'none';

  var letterFound = false;
  for (var i = 0; i < secretWord.length; i++) {
    if(letterGuess.value === secretWord[i]) {
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

  if(checkWinOrLoss() === false) {
    letterGuess.focus();
  }
}

function checkWinOrLoss() {
  if(lettersRevealed === secretWord.length) {
    alert("You win!!!");
    guessButton.disabled = true;
    resetButton.style.display = 'initial';
    return true;
  }
  if(guessCount === 0) {
    alert("You lose!!! The secret word was: " + secretWord);
    guessButton.disabled = true;
    resetButton.style.display = 'initial';
    return true;
  }
  return false;
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
  errorMessage.style.display = 'none';

  document.querySelector('.secretWord').focus();
}

wordSubmitButton.addEventListener('click', setUp2PlayerGame);
randomWordButton.addEventListener('click', setUpRandomGame);
guessButton.addEventListener('click', guessLetter);
resetButton.addEventListener('click',resetGame);
