function gameinit() {
  snakeBody = [
    { x: 1, y: 15 },
    { x: 2, y: 15 },
    { x: 3, y: 15 },
    { x: 4, y: 15 }
  ];
  snakeLength = 4;
  directionX = 1;
  directionY = 0;
  food = {
    x: Math.floor(Math.random() * xSize - 1) + 1,
    y: Math.floor(Math.random() * ySize - 1) + 1
  };
  score = 0;
} //변수값 초기화

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

function showResult() {
  ctx.fillStyle = "#FFC107";
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = "#3F51B5";
  ctx.font = "40px Calibri";
  ctx.fillText("Result", 45, 60);
  ctx.font = "30px Calibri";
  ctx.fillText(`Score : ${score}`, 45, 150);
} //Result 화면 표시

function gameOver() {
  clearInterval(gameLoop);
  showResult();
  console.log("Game Over");
} //showResult(); game 반복 멈춤:게임 중지

function game() {
  ctx.fillStyle = "#37474F";
  ctx.fillRect(0, 0, width, height);

  createSnake();
  createFood();

  let snakeHeadX = snakeBody[snakeLength - 1].x + directionX;
  let snakeHeadY = snakeBody[snakeLength - 1].y + directionY;
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
  gameinit();
  gameLoop = setInterval(game, gameSpeed);
} //gameinit, game 반복 실행; gameLoop 선언

function init() {
  document.addEventListener("keydown", keyPush);
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", startGame);
} //키 입력, 버튼 클릭하여 startGame() 실행

init();
