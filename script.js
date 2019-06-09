const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("startBtn");
const width = 1000;
const height = 1000;
const pixelSize = 50;
let gameSpeed = 60;
let xSize = width / pixelSize; //20~40 적당
let ySize = height / pixelSize;
let snakeBody = [
  { x: 10, y: 15 },
  { x: 11, y: 15 },
  { x: 12, y: 15 },
  { x: 13, y: 15 }
];
let snakeLength = 4;
let food = {
  x: Math.floor(Math.random() * xSize - 1) + 1,
  y: Math.floor(Math.random() * ySize - 1) + 1
};
let directionX = 1;
let directionY = 0;

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

function game() {
  ctx.fillStyle = "#37474F";
  ctx.fillRect(0, 0, width, height);

  createSnake();
  createFood();

  let snakeHeadX = (snakeBody[snakeLength - 1].x + directionX) % xSize;
  let snakeHeadY = (snakeBody[snakeLength - 1].y + directionY) % ySize;
  if (snakeHeadX < 0) {
    snakeHeadX += xSize;
  } else if (snakeHeadY < 0) {
    snakeHeadY += ySize;
  }

  snakeBody.push({ x: snakeHeadX, y: snakeHeadY });

  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    food = {
      x: Math.floor(Math.random() * xSize - 1) + 1,
      y: Math.floor(Math.random() * ySize - 1) + 1
    };
    snakeLength += 1;
  } else {
    snakeBody.shift();
  }
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      if (!(directionX === 1 && directionY === 0)) {
        directionX = -1;
        directionY = 0;
        console.log("left");
      }
      break;

    case 38:
      if (!(directionX === 0 && directionY === 1)) {
        directionX = 0;
        directionY = -1;
        console.log("up");
      }
      break;

    case 39:
      if (!(directionX === -1 && directionY === 0)) {
        directionX = 1;
        directionY = 0;
        console.log("right");
      }
      break;

    case 40:
      if (!(directionX === 0 && directionY === -1)) {
        directionX = 0;
        directionY = 1;
        console.log("down");
      }
      break;
  }
}

function startGame() {
  console.log("Start Game!");
  btn.setAttribute("disabled", true);
  setInterval(game, gameSpeed);
}

function init() {
  var btn = document.getElementById("startBtn");
  document.addEventListener("keydown", keyPush);
  btn.addEventListener("click", startGame);
}

init();
