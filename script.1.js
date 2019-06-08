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
let snakeLength = snakeBody.length;
let food = { x: randomNumber(0, width), y: randomNumber(0, height) };

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
  ctx.fillStyle = "#263238";
  ctx.fillRect(0, 0, width, height);

  createSnake();
  createFood();

  let snakeHeadX = snakeBody[snakeLength - 1].x;
  let snakeHeadY = snakeBody[snakeLength - 1].y;

  snakeBody.push({ x: snakeHeadX, y: snakeHeadY });

  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    food = { x: randomNumber(0, width), y: randomNumber(0, height) };
    snakeLength += 1;
  } else {
    snakeBody.shift;
  }
}

game();
