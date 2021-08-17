"use strict";

//Memory game: find matching pairs of cards and flip both of them
let cardOne, cardTwo;
const head = document.querySelector(".headline");
const reset = document.querySelector(".game__btn");

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

//Shuffle array items in-place and return shuffled array.

function shuffle(items) {
  // Fisher-Yates shuffle algorithm;

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

//Creating a new element for every color in the colors array
function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let [key, color] of colors.entries()) {
    const card = document.createElement("div");
    card.style.background = "#f0f8ff";
    card.classList.add(color);
    card.setAttribute("data-id", key);
    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  }
}

let flip = false;
let twoFlips = false;

//Flip a card face-up
function flipCard() {
  //If true will prevent any card from flipping
  if (twoFlips) return;

  this.style.background = this.classList[0];

  if (!flip) {
    flip = true;
    cardOne = this;
    return;
  }

  cardTwo = this;
  flip = false;

  handleCardClick();
}

//Handle if not a match
function unFlipCard() {
  twoFlips = true;
  setTimeout(() => {
    [cardOne, cardTwo].forEach((item) => (item.style.background = "#f0f8ff"));

    twoFlips = false;
  }, FOUND_MATCH_WAIT_MSECS);
}

//Handle clicks, see if cards match or not
function handleCardClick() {
  cardOne.classList[0] === cardTwo.classList[0] &&
  cardOne.dataset.id !== cardTwo.dataset.id
    ? holdCard()
    : unFlipCard();
}

let total = [];

//Helper function
const holdCard = () => {
  [cardOne, cardTwo].forEach((item) => {
    item.removeEventListener("click", flipCard);
    total.push(item);
    endGame();
  });
};

function endGame() {
  total.length === 10 && (head.innerHTML = "You won the game!");
}

function resetGame() {
  for (let i = 0; i < COLORS.length; i++) {
    total.pop();
    let color = COLORS[i];
    const element = document.querySelector(`.${color}`);
    element.remove();
  }

  const newColors = shuffle(COLORS);
  createCards(newColors);
  head.innerHTML = "Memory Game!";
}

reset.addEventListener("click", resetGame);
