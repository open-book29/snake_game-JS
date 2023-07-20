let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let a = 2;
let b = 29
let snakeArr = [
  { x: Math.round(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) }
]
let food = { x: Math.round(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) }
let hiscoreBox = document.getElementById("hiscoreBox")
let scoreBox = document.getElementById("scoreBox")

// Game function
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snake) {
  // If bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true
    }
  }
  // If you bump into the wall
  if (snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0) {
    return true
  }
  return false
}

function gameEngine() {
  // Part 1: Updating the snake array
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 }
    alert("GAme Over. Press any key to paly again")
    snakeArr = [{ x: Math.round(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) }];
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) };
    score = 0;
    scoreBox.innerHTML = "Score: " + score
  }

  //  If snake have eaten the food so, we increase the score and regenrate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("High Score", JSON.stringify(hiscoreval))
      hiscoreBox.innerHTML = "High Score: " + hiscoreval
    }
    scoreBox.innerHTML = "Score: " + score
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
    let regenFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) }
    if (regenFood === snakeArr) {
      return
    }
    else {
      food = regenFood
    }
  }

  // food = { x: Math.round(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) }

  // Move Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }
  }

  snakeArr[0].x += inputDir.x
  snakeArr[0].y += inputDir.y

  // Part 2: Display the snake  and food
  //  Display the snake
  board.innerHTML = "";
  // console.log(board)
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add('head');
    }
    else {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });
  //  Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement)
}



// main logic is here
let hiscore = localStorage.getItem("High Score")
if (hiscore === null) {
  var hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  moveSound.play();
  inputDir = { x: 0, y: 1 }
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
})
