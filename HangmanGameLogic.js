const guessesLeftMessage = document.querySelector('.guessesLeftMessage');
const displayWord = document.querySelector('.displayWord');
const lettersGuessed = document.querySelector('.lettersGuessed');
const displayMessage = document.querySelector('.displayMessage');
const errorMessage = document.querySelector('.errorMessage');
const guessPics = document.querySelector('.pics');
const wordSubmitButton = document.querySelector('.wordSubmitButton');
const randomWordButton = document.querySelector('.randomWordButton');
const guessButton = document.querySelector('.guessButton');
const resetButton = document.querySelector('.resetButton');
const intro = document.querySelector('.intro');
const gameStart = document.querySelector('.gameStart');

let incorrectGuessesLeft = 5; // how many guesses player has left
let lettersRevealed = 0; // how many letters are known through guesses
let displayImage = 1; // cycles through right side hangman graphic, corresponding to incorrectGuessesLeft
let guessCharSet = new Set(); // stores set of characters so there are no duplicate guesses

// wordToDisplay:
// The blanks that display showing which letters are known and which are unknown
// example: a _ _ l _ = a p p l e
let wordToDisplay = "";
let secretWord;
// handle page refreshes
gameStart.style.display = 'none';
errorMessage.style.display = 'none';
document.querySelector('.secretWord').focus();
// parse list of english words from words.txt and stores into wordDictionary
// used to generate a random word
let wordDictionary;
const req = new XMLHttpRequest();
req.onload = function() {
    wordDictionary = this.responseText.split('\n');
};
req.open('GET', 'words.txt');
req.send();
// -----------------------------------------------------------------------------
// helper method similar to str[index] = newChar
function setCharAt(str, index, chr) {
    if (index > str.length - 1)
        return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}
// set up game in event that user enters own word
function setUp2PlayerGame() {
    secretWord = document.querySelector('.secretWord').value;
    if (!isNonEmptyStr(secretWord)) {
        errorMessage.style.display = 'initial';
        return;
    }
    setupGame();
}
// set up game in event that random word option is chosen
function setUpRandomGame() {
    let index = Math.floor(Math.random() * wordDictionary.length);
    secretWord = wordDictionary[index];
    setupGame();
}
// general game setup, toggle between into page and game page
function setupGame() {
    intro.style.display = 'none';
    for (i = 0; i < secretWord.length; i++) {
        wordToDisplay += "_ ";
    }
    guessesLeftMessage.textContent = "You have " + incorrectGuessesLeft + " incorrect guesses remaining.";
    displayWord.textContent = wordToDisplay;
    lettersGuessed.textContent = "Letters guessed: ";
    displayMessage.style.display = 'none';
    gameStart.style.display = 'initial';
    // start with 1 and skip 2 each time, every other node is a text and we only want images
    for (let i = 1; i <= 11; i += 2) {
        guessPics.childNodes[i].style.display = 'none';
    }
    guessPics.childNodes[displayImage].style.display = 'initial';
    resetButton.style.display = 'none';
    document.querySelector('.letterGuess').focus();
}
// check if string is non empty and only contains alphas
function isNonEmptyStr(str) {
    return str.length >= 1 && str.match(/[a-z]/i);
}
// function to evaluate letter guess
function guessLetter() {
    // make sure letter is a-z
    if (!isNonEmptyStr(letterGuess.value)) {
        displayMessage.textContent = "Please guess a letter from a-z!";
        displayMessage.style.display = 'initial';
        letterGuess.focus();
        return;
    }
    // if letter is has already been guessed before
    if (guessCharSet.has(letterGuess.value)) {
        displayMessage.textContent = "You have already guessed that letter!";
        displayMessage.style.display = 'initial';
        letterGuess.focus();
        return;
    }
    // add letter guessed to set
    guessCharSet.add(letterGuess.value);
    displayMessage.style.display = 'none';
    // loop through secretWord to fill in corresponding matching letters
    let letterFound = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (letterGuess.value === secretWord[i]) {
            letterFound = true;
            lettersRevealed++;
            wordToDisplay = setCharAt(wordToDisplay, i * 2, letterGuess.value);
            displayWord.textContent = wordToDisplay;
        }
    }
    // if letter is not in the word
    if (letterFound === false) {
        incorrectGuessesLeft--;
        guessPics.childNodes[displayImage].style.display = 'none';
        displayImage += 2;
        guessPics.childNodes[displayImage].style.display = 'initial';
    }
    lettersGuessed.textContent += letterGuess.value + ' ';
    guessesLeftMessage.textContent = "You have " + incorrectGuessesLeft + " incorrect guesses remaining.";
    // after every letter guess, check if the user has won or lost
    if (checkWinOrLoss() === false) {
        letterGuess.focus();
    }
}
function checkWinOrLoss() {
    if (lettersRevealed === secretWord.length) {
        alert("You win!!!");
        guessButton.disabled = true;
        resetButton.style.display = 'initial';
        return true;
    }
    if (incorrectGuessesLeft === 0) {
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
    incorrectGuessesLeft = 5;
    guessCharSet = new Set();
    lettersRevealed = 0;
    displayImage = 1;
    wordToDisplay = "";
    gameStart.style.display = 'none';
    intro.style.display = 'initial';
    errorMessage.style.display = 'none';
    document.querySelector('.secretWord').focus();
}
// -----------------------------------------------------------------------------
wordSubmitButton.addEventListener('click', setUp2PlayerGame);
randomWordButton.addEventListener('click', setUpRandomGame);
guessButton.addEventListener('click', guessLetter);
resetButton.addEventListener('click', resetGame);
