"use strict";

// Selecting element
const popup = document.querySelector(".popup");
const player1 = document.querySelectorAll(".player-1");
const player2 = document.querySelectorAll(".player-2");
const namePlayer1 = document.querySelector(".name-player1");
const namePlayer2 = document.querySelector(".name-player2");
const done = document.querySelector(".done");
const playerHead1 = document.querySelector(".hplayer-1");
const playerHead2 = document.querySelector(".hplayer-2");
const finalScore1 = document.querySelector(".final-score-1");
const finalScore2 = document.querySelector(".final-score-2");
const currentScore1 = document.querySelector(".score-1");
const currentScore2 = document.querySelector(".score-2");
const image = document.querySelector(".image");
const dice = document.querySelector(".btn-dice");
const tryingCount = document.querySelector(".trying");
const newGame = document.querySelector(".btn-new");
// sounds
const soundWin = new Audio("sounds/win.mp3");
soundWin.volume = 0.5;
const soundClick = new Audio("sounds/click.wav");
soundWin.volume = 0.5;
const soundNewGame = new Audio("sounds/new-game.wav");
soundNewGame.volume = 0.5;
const pickOne = new Audio("sounds/one.wav");
pickOne.volume = 0.5;
const startGame = new Audio("sounds/start.wav");
startGame.volume = 0.5;
const turnPlayer = new Audio("sounds/turn.wav");
turnPlayer.volume = 0.5;

// manipulation
let current = 0;
let active = 1;
let trying = 3;

// before start (reset)
function reset() {
  finalScore1.textContent = 0;
  finalScore2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
}
reset();

// function for toggle active player
function toggle() {
  player1[0].classList.toggle("player-active");
  player2[0].classList.toggle("player-active");
}

// Start popup =============================================
// show popup after two seconds (remove hidden class)
setTimeout((e) => {
  popup.classList.remove("hidden");
  namePlayer1.focus();
}, 2000);

// when i press on done button change player name
done.addEventListener("click", function () {
  startGame.play();
  namePlayer1.value != ""
    ? (playerHead1.textContent = namePlayer1.value)
    : (playerHead1.textContent = "Player 1");
  namePlayer2.value != ""
    ? (playerHead2.textContent = namePlayer2.value)
    : (playerHead2.textContent = "Player 2");
  popup.classList.add("hidden");
});

// when i press on enter key, click done
popup.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    done.click();
  }
});
// End popup =============================================

// Start dice button =====================================
dice.addEventListener("click", function () {
  soundClick.play();
  const random = Math.trunc(Math.random() * 6) + 1;
  image.src = `picture/dice-${random}.png`;
  image.classList.remove("hidden");

  // dynamic active
  current += random;
  document.querySelector(`.score-${active}`).textContent = current;
  trying--;
  tryingCount.textContent = trying;

  // when trying count is finished
  if (trying === 0) {
    turnPlayer.play();
    toggle();
    trying = 3;
    tryingCount.textContent = trying;
    if (random === 1) {
      pickOne.play();
      document.querySelector(`.final-score-${active}`).textContent = Number(
        document.querySelector(`.final-score-${active}`).textContent
      );
    } else {
      turnPlayer.play();
      document.querySelector(`.final-score-${active}`).textContent =
        Number(document.querySelector(`.final-score-${active}`).textContent) +
        current;
    }
    current = 0;
    document.querySelector(`.score-${active}`).textContent = current;
    active = active === 1 ? 2 : 1;
  } else {
    // when the random number equal one
    if (random === 1) {
      pickOne.play();
      current = 0;
      document.querySelector(`.score-${active}`).textContent = current;
      toggle();
      trying = 3;
      tryingCount.textContent = trying;
      active = active === 1 ? 2 : 1;
    }
  }

  // when player is winner
  if (
    Number(
      document.querySelector(`.final-score-${active === 1 ? 2 : 1}`).textContent
    ) >= 100
  ) {
    document.querySelectorAll(
      `.player-${active === 1 ? 2 : 1}`
    )[0].style.backgroundImage =
      "linear-gradient(to top left, #20bb8a, #56d542)";
    dice.classList.add("hidden");
    tryingCount.classList.add("hidden");
    image.classList.add("hidden");
    soundWin.play();
  }
});
// End dice button =======================================

// Start new game button ===============================
newGame.addEventListener("click", function () {
  soundNewGame.play();
  active = 1;
  current = 0;
  document.querySelector(`.score-${active}`).textContent = current;
  reset();
  image.classList.add("hidden");
  trying = 3;
  tryingCount.textContent = trying;
  player2[0].classList.remove("player-active");
  player1[0].classList.add("player-active");
  dice.classList.remove("hidden");
  tryingCount.classList.remove("hidden");
  player1[0].style.backgroundImage = "none";
  player2[0].style.backgroundImage = "none";
  player1[0].style.backgroundColor = "rgba(255, 255, 255, 0.6) !important";
});
// End new game button =================================
