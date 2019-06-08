//랜덤 숫자 함수 생성
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//변수선언
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 300;
const height = 300;
const pixelSize = 10;

let snakeBody = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
  { x: 10, y: 13 }
];
let snakeLength = 4;
let food = { x: randomNumber(0, width), y: randomNumber(0, height) };

//Key 변수
let pressUp = false;
let pressDown = false;
let pressLeft = false;
let pressRight = false;

function createSnake() {
  ctx.fillStyle = "#4CAF50"; //green
  for (let i = 0; i <= snakeLength - 1; i++) {
    ctx.fillRect(
      snakeBody[i].x * pixelSize,
      snakeBody[i].y * pixelSize,
      pixelSize,
      pixelSize
    );
  }
}

function createFood() {
  ctx.fillStyle = "#E91E63"; //pink
  ctx.fillRect(food.x, food.y, pixelSize, pixelSize);
}

function game() {
  //fill background
  ctx.fillStyle = "#263238";
  ctx.fillRect(0, 0, width, height);

  createSnake();
  createFood();

  //calculate snake's head location
  let snakeHeadX = snakeBody[snakeLength - 1].x;
  let snakeHeadY = snakeBody[snakeLength - 1].y;

  snakeBody.push({ x: snakeHeadX, y: snakeHeadY });

  //when snake eat food else, snakeBody.shift
  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    food = { x: randomNumber(0, width), y: randomNumber(0, height) };
    snakeLength += 1;
  } else {
    snakeBody.shift;
  }

  document.addEventListener("keydown", keyDownHandler, false);
  //키 입력 함수;up down left right 순서
  function keyDownHandler(e) {
    if (e.keyCode == 38) {
      pressUp = true;
    } else if (e.keyCode == 40) {
      pressDown = true;
    } else if (e.keyCode == 37) {
      pressLeft = true;
    } else if (e.keyCode == 39) {
      pressRight = true;
    }
  }

  if (pressUp) {
    snakeBody[snakeLength - 1].y += -1;
  } else if (pressDown) {
    snakeBody[snakeLength - 1].y += 1;
  } else if (pressLeft) {
    snakeBody[snakeLength - 1].x += -1;
  } else if (pressRight) {
    snakeBody[snakeLength - 1].x += 1;
  }
}

setInterval(game, 30);
