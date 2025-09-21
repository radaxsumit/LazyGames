let score = 0;
let timeLeft = 30;
let timer;
let moleTimer;

const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");

function randomHole() {
  holes.forEach(hole => hole.innerHTML = ""); 
  const random = Math.floor(Math.random() * holes.length);

  const mole = document.createElement("div");
  mole.classList.add("mole");
  mole.textContent = "🐔";

  mole.addEventListener("click", hitMole);

  holes[random].appendChild(mole);

  setTimeout(() => mole.classList.add("up"), 50);

  setTimeout(() => {
    if (mole.parentNode) {
      mole.classList.remove("up");
      setTimeout(() => mole.remove(), 300);
    }
  }, 800);
}

function hitMole(e) {
  score++;
  scoreDisplay.textContent = score;
  e.target.remove();
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  startBtn.disabled = true;

  moleTimer = setInterval(randomHole, 1000);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(moleTimer);
      holes.forEach(hole => hole.innerHTML = "");
      alert("⏳ Time’s up! Your score: " + score);
      startBtn.disabled = false;
    }
  }, 1000);
}

startBtn.addEventListener("click", startGame);
