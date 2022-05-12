const allLetters = document.querySelectorAll(".btn-letter")
const randomWords = ["WATERMELON", "MICROWAVE", "JAVASCRIPT", "PYTHON", "KEYBOARD", "PLAYSTATION", "LAPTOP", "COFFEE", "APPLES"]
let word = ""
let display = []
let chances = 7
let correctGuesses = 0
//functions
const disableKeyboard = () =>{
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].classList.add("selected")
        allLetters[i].disabled = true
    }
}
const pageLoaded = () =>{
    //disable letters until user presses start
    disableKeyboard()
    document.querySelector("#lbl-results").innerText = "Press Start New Game to play"
}
const startNewGame = () =>{
    //reset dashes and counters 
    chances = 7
    correctGuesses = 0
    display = []
    document.querySelector("#word-display").innerText = display
    document.querySelector("#word-display").classList.remove("correct")
    //select random word
    word = randomWords[Math.floor(Math.random() * randomWords.length)]
    //unselect/renable any selected characters from previous game
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].classList.remove("selected")
        allLetters[i].disabled = false
    }
    //prints wordlength in dashes
    for (let i = 0; i < word.length; i++) {
        display.push("-");
      }
    if(!document.querySelector("#word-display").innerText){
        document.querySelector("#word-display").innerText = display.join('')
    }
    //display chances
    document.querySelector("#chances").innerText = `Chances Remaining: ${chances}`
    document.querySelector("#lbl-results").innerText = "Select a letter"
}
const letterClicked = (evt) =>{
    let correct = false

    if (evt.target.classList.contains("btn-letter")){
        let selectedLetter = evt.target.innerText
        //check if word contains letter
        for (let i = 0; i < word.length; i++) {
            if (word[i] === selectedLetter) {
                correct = true
                correctGuesses++
                document.querySelector("#lbl-results").innerText = ""
                display[i] = selectedLetter
            }
            document.querySelector("#word-display").innerText = display.join('')
        }
        if (!correct){
            chances--
            document.querySelector("#lbl-results").innerText = "Incorrect! The word does not contain selected letter"
        }
        //update chances and disable selected letter
        document.querySelector("#chances").innerText = `Chances Remaining: ${chances}`
        evt.target.classList.add("selected")
        evt.target.disabled = true
        //end game if player won or lost after selecting letter
        if(correctGuesses === word.length){
            alert("You Win! :) Press Start New Game to Play Again")
           disableKeyboard()
           document.querySelector("#lbl-results").innerText = "Press Start New Game to play again"
           document.querySelector("#word-display").classList.add("correct")
        }
        if(chances === 0){
            alert("You Lose! :( Press Start New Game to Play Again")
            disableKeyboard()
            document.querySelector("#lbl-results").innerText = "Press Start New Game to play again"
        }
    }
}
//event listeners
document.querySelector("#new").addEventListener("click", startNewGame)
document.querySelector("#letters").addEventListener("click", letterClicked)
document.addEventListener("DOMContentLoaded", pageLoaded) 