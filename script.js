const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
let width = parseInt(document.getElementById("width").value);
let height = parseInt(document.getElementById("height").value);
let pixelSize = parseInt(document.getElementById("pixelSize").value);
let gameSpeed = parseInt(document.getElementById("gameSpeed").value);
let xSize = width / pixelSize; //20~40 적당
let ySize = height / pixelSize;
let snakeBody = [
  { x: 1, y: 15 },
  { x: 2, y: 15 },
  { x: 3, y: 15 },
  { x: 4, y: 15 }
];
let snakeLength = 4;
let food = {
  x: Math.floor(Math.random() * xSize - 1) + 1,
  y: Math.floor(Math.random() * ySize - 1) + 1
};
let directionX = 1;
let directionY = 0;
let score = 0;

function gameinit() {
  width = parseInt(document.getElementById("width").value);
  height = parseInt(document.getElementById("height").value);
  pixelSize = parseInt(document.getElementById("pixelSize").value);
  gameSpeed = parseInt(document.getElementById("gameSpeed").value);
  xSize = width / pixelSize; //20~40 적당
  ySize = height / pixelSize;
  snakeBody = [
    { x: 1, y: 15 },
    { x: 2, y: 15 },
    { x: 3, y: 15 },
    { x: 4, y: 15 }
  ];
  snakeLength = 4;
  food = {
    x: Math.floor(Math.random() * xSize - 1) + 1,
    y: Math.floor(Math.random() * ySize - 1) + 1
  };
  directionX = 1;
  directionY = 0;
  score = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
} //변수값 초기화, Canvas clear

function createSnake() {
  ctx.fillStyle = "#4CAF50";
  for (let i = 0; i < snakeLength; i++) {
    ctx.fillRect(
      snakeBody[i].x * pixelSize,
      snakeBody[i].y * pixelSize,
      pixelSize,
      pixelSize
    );
  }
}

function createFood() {
  ctx.fillStyle = "#E91E63";
  ctx.fillRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
}

function drawGrid(w, h, step) {
  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0; y <= h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

function showResult() {
  ctx.fillStyle = "#FFC107";
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = "#3F51B5";
  ctx.font = "40px sans-serif";
  ctx.fillText("Result", 45, 60);
  ctx.font = "30px sans-serif";
  ctx.fillText(`Score : ${score}`, 45, 150);
} //Result 화면 표시

function gameOver() {
  clearInterval(gameLoop);
  showResult();
  startBtn.disabled = false;
  console.log("Game Over");
} //showResult(); game 반복 멈춤:게임 중지

function game() {
  ctx.fillStyle = "#37474F";
  ctx.fillRect(0, 0, width, height);

  createSnake();
  createFood();
  drawGrid(width, height, pixelSize);

  const snakeHeadX = snakeBody[snakeLength - 1].x + directionX;
  const snakeHeadY = snakeBody[snakeLength - 1].y + directionY;

  if (
    snakeHeadX == -1 ||
    snakeHeadY == -1 ||
    snakeHeadX == xSize ||
    snakeHeadY == ySize
  ) {
    gameOver();
  }

  snakeBody.push({ x: snakeHeadX, y: snakeHeadY });

  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    food = {
      x: Math.floor(Math.random() * xSize - 1) + 1,
      y: Math.floor(Math.random() * ySize - 1) + 1
    };
    snakeLength += 1;
    score += 1;
  } else {
    snakeBody.shift();
  }
} //메인 게임

function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      if (!(directionX === 1 && directionY === 0)) {
        directionX = -1;
        directionY = 0;
      }
      break;

    case 38:
      if (!(directionX === 0 && directionY === 1)) {
        directionX = 0;
        directionY = -1;
      }
      break;

    case 39:
      if (!(directionX === -1 && directionY === 0)) {
        directionX = 1;
        directionY = 0;
      }
      break;

    case 40:
      if (!(directionX === 0 && directionY === -1)) {
        directionX = 0;
        directionY = 1;
      }
      break;
  }
} //키 입력 받은 값 실행

function startGame() {
  console.log("Start Game!");
  startBtn.disabled = true;
  gameinit();
  gameLoop = setInterval(game, gameSpeed);
} //gameinit, game 반복 실행; gameLoop 선언

function init() {
  document.addEventListener("keydown", keyPush);
  startBtn.addEventListener("click", startGame);
} //키 입력, 버튼 클릭하여 startGame() 실행

init();
