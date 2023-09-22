let canvas = $(".canvas")[0];
let ctx = canvas.getContext("2d");

const scale = 20;
const columns = canvas.width / scale;
const rows = canvas.height / scale;
let score = 0;
let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale * 0,
  y: Math.floor(Math.random() * rows) * scale,
};
food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
let playGame = setInterval(draw, 200);
let d = "right";
let keyEvent = $(document);
keyEvent.on("keydown", function (event) {
  let direction = event.keyCode;
  switch (direction) {
    case 37:
      if (d != "right") {
        d = "left";
      }
      break;
    case 38:
      if (d != "down") {
        d = "up";
      }
      break;
    case 39:
      if (d != "left") {
        d = "right";
      }
      break;
    case 40:
      if (d != "up") {
        d = "down";
      }
      break;
    default:
      console.log("nothing happen");
      break;
  }
});
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }
  ctx.fillStyle = "#ff0";
  ctx.strokeStyle = "green";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }
  if(snakeX==food.x&&snakeY==food.y)
  {
    score = score + 1;
    var audio = new Audio("../resources/eat.mp3");
    audio.play();
    food = {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale,
      };
  }
 else{
    snake.pop();
 }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  if(eatSelf(newHead,snake)){
      var audio = new Audio("../resources/gameOver.mp3");
      audio.play();
    alert(" !!!game over!!!! \n"+"your score is " + score)
    clearInterval(playGame);
    restartGame()
    }
  snake.unshift(newHead);
}
function eatSelf(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
  }
function restartGame() {
  clearInterval(playGame); // Clear the interval
  snake = []; // Reset the snake array
  snake[0] = {
    x: Math.floor(Math.random() * columns) * scale * 0,
    y: Math.floor(Math.random() * rows) * scale,
  };
  food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
  };
  score = 0; // Reset the score
  d = "right"; // Reset the direction
  playGame = setInterval(draw, 200); // Start the game again
}