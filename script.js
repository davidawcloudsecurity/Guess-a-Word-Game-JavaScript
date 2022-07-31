const inputs = document.querySelector(".inputs");
resetBtn = document.querySelector(".reset-btn");
hint = document.querySelector(".hint span");
guessLeft = document.querySelector(".guess-left span");
typingInput = document.querySelector(".typing-input");
wrongLetter = document.querySelector(".wrong-letter span");

let word, maxGuesses, incorrects =[], corrects = [];

function randomWord(){
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses = 8; incorrects =[]; corrects = [];
    //console.log(word); this shows the random word

    hint.innerHTML = ranObj.hint;
    guessLeft.innerHTML = maxGuesses;
    wrongLetter.innerHTML = incorrects;
    
    let html = "";
    for(let i = 0; i < word.length; i++) {
        html += '<input type="text" disabled>';
    }
    inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)){
        //console.log(key); this shows the key pressed
        if(word.includes(key) ) { //if user letter found in the word
            for (let i=0; i<word.length; i++) {
                if(word[i] === key) {
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }            
        } else {
            maxGuesses--; //decrement by 1
            incorrects.push(` ${key}`); //set spaces between letters
        }
        guessLeft.innerHTML = maxGuesses;
        wrongLetter.innerHTML = incorrects;
    }
    //set delay
    setTimeout(() =>{
        // user found  all letters in the word
        if(corrects.length === word.length) {
            alert(`You found the word ${word.toUpperCase()}`);
            randomWord(); //resets the game
        }
        else if(maxGuesses < 0) { //if user ran out of guesses
            alert("Game over! You don't have remaining guesses!");
            // show all letters in the input
            for (let i=0; i<word.length; i++) {
                inputs.querySelectorAll("input")[i].value=word[i];
            }
        }
    });
    typingInput.value = "";
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus()); //helps phone user
document.addEventListener("keydown", () => typingInput.focus());
