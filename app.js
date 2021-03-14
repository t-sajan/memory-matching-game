const cards = document.querySelectorAll(".memory-card");
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
const counter = document.querySelector("#flips");
let moves;

function reset() {
  moves = 0;
  counter.innerHTML = moves;
  unmatchedCards = cards.length / 2;
  cards.forEach((card) => card.classList.remove("flip"));
  cards.forEach((card) => card.addEventListener("click", flipCard));
  shuffle();
  countdown = startCountdown();
}
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  moveCounter();

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

let unmatchedCards = cards.length / 2;
function disableCards() {
  unmatchedCards--;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  console.log(unmatchedCards);
  if (unmatchedCards == 0) {
    setTimeout(() => {
      victory();
    }, 500);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      reset();
    });
  });
}

function startCountdown() {
  timeRemaining = 100;
  return setInterval(() => {
    this.timeRemaining--;
    this.document.getElementById("time-remaining").innerHTML =
      timeRemaining + " seconds remaining";
    if (this.timeRemaining === 0) this.gameOver();
  }, 1000);
}

function gameOver() {
  clearInterval(this.countdown);
  document.getElementById("game-over-text").classList.add("visible");
}

function victory() {
  let rating = document.querySelectorAll(".overlay-text-star");
  console.log(this.timeRemaining, rating);
  clearInterval(this.countdown);

  document.getElementById("victory-time").innerHTML =
    "Time Taken: " + this.timeRemaining + " sec";
  document.getElementById("victory-moves").innerHTML = "No. of Flips: " + moves;

  if (moves > 20) {
    rating[3].classList.add("hidden");
  }
  if (moves > 40) {
    rating[2].classList.add("hidden");
  }
  document.getElementById("victory-text").classList.add("visible");
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

window.onload = ready();
