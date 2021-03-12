// Get all card elements by class
const cards = document.querySelectorAll(".memory-card");

// declare variables required
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// declare variable for card flips
let moves = 0;
let counter = document.querySelector("#flips");

// @description count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  moveCounter();

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  //second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  // ternary operator for match unmatch conditional logic
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
cards.forEach((card) => card.addEventListener("click", flipCard));

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
// console.log(cards);
// function flipcard() {
//   console.log(this);
//   this.classList.toggle('flip');
// }
