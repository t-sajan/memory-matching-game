const cards = document.querySelectorAll(".memory-card");
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let counter = document.querySelector("#flips");
let moves = 0;

cards.forEach((card) => card.addEventListener("click", flipCard));

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

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
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
      countdowntimer();
    });
  });
}

function countdowntimer() {
  let timeleft = 200;
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      gameOver();
    } else {
      document.getElementById("time-remaining").innerHTML =
        timeleft + " seconds remaining";
    }
    timeleft -= 1;
  }, 1000);
}

function gameOver() {
  clearInterval(this.countdowntimer);
  document.getElementById("game-over-text").classList.add("visible");
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
  ready();
})();
