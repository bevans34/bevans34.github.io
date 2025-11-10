// Lab 2 Guess the Number JavaScript File (Brandon Evans)

// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess); // check guesses
document.querySelector("#resetBtn").addEventListener("click", initializeGame); // reset game

// Win/loss variables. These need to be set outside of a function
let wins = 0;
let losses = 0;

// Global variables
let randomNumber;
let attempts;

initializeGame();

function initializeGame() {
   // Assign a random number and set attempts variable to 0
   randomNumber = Math.floor(Math.random() * 99) + 1;
   attempts = 0;
   // console.log("randomNumber: " + randomNumber); // No cheating!

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the guest button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus();
   playerGuess.value = "";

   // Clearing feedback
   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";

   // clearing old guesses
   let guesses = document.querySelector("#guesses");
   guesses.textContent = "";
}

function checkGuess() {
   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";

   let guess = document.querySelector("#playerGuess").value;
   console.log("Player guess: " + guess);

   if (guess < 1 || guess > 99) {
      feedback.textContent = "Enter a number between 1 and 99";
      feedback.style.color = "red";
      return;
   }

   attempts++;
   console.log("Attempts: " + attempts);
   feedback.style.color = "orange";
   if (guess == randomNumber) {
      feedback.textContent = "You guessed the correct number in " + attempts + "/7 attempts. You win!";
      feedback.style.color = "darkgreen";
      wins++;
      gameOver();
   } else {
      document.querySelector("#guesses").textContent += guess + " ";
      if (attempts == 7) {
         feedback.textContent = "Sorry, you lost! The correct number was " + randomNumber;
         feedback.style.color = "red";
         losses++;
         gameOver();
      } else if (guess > randomNumber) {
         feedback.textContent = "Guess was too high! You have " + (7-attempts) + " more remaining!";
         feedback.style.color = "red";
      } else {
         feedback.textContent = "Guess was too low! You have " + (7-attempts) + " more remaining!";
         feedback.style.color = "red";
      }
   }
}

function gameOver() {
   let stats = document.querySelector("#stats");
   let guessBtn = document.querySelector("#guessBtn");
   let resetBtn = document.querySelector("#resetBtn");

   stats.innerHTML = "Wins: " + wins + "<br>Losses: " + losses; // Update wins and losses. innerHTML used to add newline
   guessBtn.style.display = "none"; // Hide guess button
   resetBtn.style.display = "inline"; // Show reset button
}
