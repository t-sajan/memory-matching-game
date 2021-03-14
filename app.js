const cards = document.querySelectorAll(".memory-card");
const counter = document.querySelector("#flips");

let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let numberofFlips, possibleMatchingCard;

function flipCard() {
  // Disable third card flip and multiple click on same card
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  moveCounter();

  // First Flipped Card
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // Second Flipped Card
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

// Display the number of flips made by the user
function moveCounter() {
  numberofFlips++;
  counter.innerHTML = numberofFlips;
}

// compares if flipped cards match or does not match
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

// if cards match flip both cards and disable click event
function disableCards() {
  possibleMatchingCard--;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  console.log(possibleMatchingCard);
  if (possibleMatchingCard == 0) {
    setTimeout(() => {
      victory();
    }, 500);
  }
}

// if flipped cards does not match then unflip flipped cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 500);
}

// reset values after user flips two cards
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Function to display Star Rating, time taken & No of Flips Made
function addVictoryStats() {
  let rating = document.querySelectorAll(".overlay-text-star");
  // display 3 stars for flips less than 20 & 2 if flips made exceeds 20
  if (numberofFlips > 20) {
    rating[3].classList.add("hidden");
  }
  // display only one star if flips made exceeds 40
  if (numberofFlips > 40) {
    rating[2].classList.add("hidden");
  }
  // display victory time and flips made
  document.getElementById("victory-time").innerHTML =
    "Time Taken: " + this.timeRemaining + " sec";
  document.getElementById("victory-flips").innerHTML =
    "No. of Flips: " + numberofFlips;
}

function victory() {
  clearInterval(this.countdown); //stop game timer
  addVictoryStats();
  //display victory overlay
  document.getElementById("victory-text").classList.add("visible");
}

// Display Game over overlay
function gameOver() {
  clearInterval(this.countdown);
  document.getElementById("game-over-text").classList.add("visible");
}

// function to display countdown timer
function startCountdown() {
  timeRemaining = 100;
  return setInterval(() => {
    this.timeRemaining--;
    this.document.getElementById("time-remaining").innerHTML =
      timeRemaining + " seconds remaining";
    if (this.timeRemaining === 0) this.gameOver(); //End game if time ends
  }, 1000);
}

// Suffles positioning of cards in the gameboard
function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

// function to initialize flips, Gametimer and Cards
function initializeGameBoard() {
  numberofFlips = 0;
  counter.innerHTML = numberofFlips;
  possibleMatchingCard = cards.length / 2;
  cards.forEach((card) => card.classList.remove("flip"));
  cards.forEach((card) => card.addEventListener("click", flipCard));
  shuffle();
  countdown = startCountdown();
}

// function to start game when clicked on ovelay text
function startGame() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      initializeGameBoard();
    });
  });
}

window.onload = startGame();
