const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessestext = document.querySelector(".guessessed-text b");
const KeyboardDev = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord,correctLetters,wrongGuessCount;
const maxGuesses=6;

const resetGame = () => {
    correctLetters=[];
    wrongGuessCount=0;
    guessestext.innerText=`${wrongGuessCount}/${maxGuesses}`;
    hangmanImage.src=`hangman-${wrongGuessCount}.svg`;
    KeyboardDev.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const {word,hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();


}
const gameOver = (isvictory) => {
setTimeout(() => {
    const modalText = isvictory ? `YOU FOUND THE WORD:` : `THE CORRECT WORD WAS:`;
    gameModal.querySelector("img").src = `${isvictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = `${isvictory ? '!!!Congrats!!!' : '!!!GAME OVER!!!'}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
  gameModal.classList.add("show");
},300);
}
const initGame = (button,clickedLetter) => {
    if(currentWord.includes(clickedLetter )){
        [...currentWord].forEach((letter, index) => {
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessCount++;
        hangmanImage.src=`hangman-${wrongGuessCount}.svg`;
    }
    button.disabled=true;
    guessestext.innerText=`${wrongGuessCount}/${maxGuesses}`;

    if(wrongGuessCount===maxGuesses) return gameOver(false);
    if(correctLetters.length===currentWord.length) return gameOver(true);

}
for ( let i = 97;i<=122; i++){
    const button = document.createElement("button");
    button.innerText =String.fromCharCode(i);
    KeyboardDev.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
   
}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);
