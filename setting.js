const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const width = 1000;
const height = 1000;
const pixelSize = 20;

let gameSpeed = 60;
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
