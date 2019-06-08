const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 400;
const height = 400;
const pixelSize = 10;
let snakeBody = [
  { x: 100, y: 150 },
  { x: 101, y: 150 },
  { x: 102, y: 150 },
  { x: 103, y: 150 }
];
let snakeLength = snakeBody.length;
let food = { x: 300, y: 150 };

console.log(snakeLength);
