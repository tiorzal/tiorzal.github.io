const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

document.getElementById("toggle").addEventListener("click", gameStart);
document.addEventListener("click", mousePos);



let scoreText = document.getElementById("score");
let speedText = document.getElementById("speed");
let maxScoreText = document.getElementById("maxScore-text");
let lifeBar = document.getElementById("lifeBar");

ctx.canvas.width = 1000;
ctx.canvas.height = 500;
const scale = 25;

//mouse pos
let xPos;
let yPos;
//random box pos
let randomX = 0;
let randomY = 0;

let currentLevel = 1;
let currentScore = 1;
let speed = 2000;
let gameover = 3;
let maxScore = 0;

//on off mechanism
let interval;
function gameStart() {

  interval = setInterval(function () {
    lifeBarUpdate();
    gameover--;
    checkScore();
    randomThings();
    scoreText.innerHTML = `score : ${currentScore}`
    speedText.innerHTML = `speed(s) : ${speed / 1000}`
    if (gameover === 0) {
      gameReset();
      maxScoreText.innerHTML = `Max Score : ${maxScore}`
      document.getElementById("toggle").innerHTML = 'Start'
    }
  }, speed);
  document.getElementById("toggle").innerHTML = 'Speed up'
}

function gameReset() {
  ctx.clearRect(0, 0, 1000, 500);
  currentScore = 1;
  speed = 3000;
  gameover = 3;
  scoreText.innerHTML = `score : 0`
  speedText.innerHTML = `speed(s) : 0`
  resetLifeBar();
  clearInterval(interval);
}

//mouse  502 279 box  512 286
function mousePos(event) {
  xPos = event.clientX - canvas.offsetLeft - 25;
  yPos = event.clientY - canvas.offsetTop - 25;
  if (xPos > randomX - scale && xPos < randomX + scale && yPos > randomY - scale && yPos < randomY + scale) {
    currentScore++
    if (maxScore < currentScore) {
      maxScore = currentScore;
    }
    gameover = 3;
    resetLifeBar();
  }
}

function checkScore() {
  if (currentScore % 5 === 0) {
    speed /= 2;
    // currentScore = 0;
    currentLevel++;
  }

}



function randomThings() {
  ctx.clearRect(randomX, randomY, scale + 5, scale + 5);
  randomX = Math.floor(Math.random() * (ctx.canvas.width - 100));
  randomY = Math.floor(Math.random() * (ctx.canvas.height - 100));
  drawHitPointer(randomX, randomY, scale, scale);

}

async function drawHitPointer(x, y, xLength, yLength) {
  let base_image = new Image();
  base_image.src = 'assets/patrick.png';
  base_image.onload = function () {
    ctx.drawImage(base_image, x, y, xLength + 5, yLength + 5);
  }

}

function lifeBarUpdate() {
  for (let i = 3; i >= gameover; i--) {
    lifeBar.children[i].setAttribute("class", "life-bar-box")
  }
}

function resetLifeBar() {
  for (let i = 1; i < lifeBar.children.length; i++) {
    lifeBar.children[i].setAttribute("class", "life-bar-box green-color")
  }
}