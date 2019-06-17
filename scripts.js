/*Author: Adam Kabbara
 *Data: 06-16-2019
 *Purpose: Project
 */

let hasCardFlipped = false; // Determines if one card is already chosen
let firstCard, secondCard;
let lockBoard = false;

const cards = document.querySelectorAll(".memory-card"); // Select all the cards

function flipCard() {
  if (lockBoard) return;  // Corner case
  if (this === firstCard) return; // Corner case

  this.classList.toggle('flip');

  if (!hasCardFlipped) {
    // First Click
    hasCardFlipped = true;
    firstCard = this;
  }
  else {
    // Second Click
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  // Check if the two chosen cards match
  if (firstCard.dataset.framework == secondCard.dataset.framework) {
    // There is a match
    disabledCards();
  }
  else {
    // Not a match
    unflipCards();
  }
}

function disabledCards() {
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
  }, 1500);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  [lockBoard, hasCardFlipped] = [false, false];
}

(function shuffle() {
  cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  })
})();

cards.forEach(card => card.addEventListener("click", flipCard));