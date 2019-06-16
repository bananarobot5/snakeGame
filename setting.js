function getParameter(paramName) {
  let returnValue;
  const url = location.href;
  const parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");

  for (let i = 0; i < parameters.length; i++) {
    const name = parameters[i].split("=")[0];
    if (name.toUpperCase() == paramName.toUpperCase()) {
      returnValue = parameters[i].split("=")[1];
      return decodeURIComponent(returnValue);
    }
  }
} //get parameter 얻음

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const width = parseInt(getParameter("width"));
const height = parseInt(getParameter("height"));
const pixelSize = parseInt(getParameter("pixelSize"));

const gameSpeed = parseInt(getParameter("gameSpeed"));
const xSize = width / pixelSize; //20~40 적당
const ySize = height / pixelSize;
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
