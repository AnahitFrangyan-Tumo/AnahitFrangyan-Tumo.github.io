const board = document.getElementById("game-board");
const instrectionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
const fail = document.getElementById("fail")
var audio = new Audio ("./UMLGQBU-video-game.mp3 ")
let dead = new Audio ("./ds.mp3")
let walk = new Audio ("./squeak.wav")
let gridSize = 35;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let isGameStarted = false;
let gameSpeed = 200;
let highScore = 0;
let gameIntervalId;


function draw() {
    squeak.play()
    board.innerHTML = ""
    drawSnake();
    drawFood();
    updateScore();
    audio.play()
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });

}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

// draw();

function drawFood() {
    let foodElement = creatElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}



function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw()
        }, gameSpeed);

    } else {
        snake.pop();
    }
}

function startGame() {
    fail.style.display="none"
    isGameStarted = true;
    instrectionText.style.display = "none";
    logo.style.display = "none";

    gameIntervalId = setInterval(() => {
        move();
        checkCollision()
        draw()
    }, gameSpeed);
}

function hendleKeyPress(e) {

    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame();
    }


    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }

    }


}

function resetGame() {
    
    gameSpeed = 200
    stopGame();
    updateHighScore();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    
  updateScore();
  dead.play();
}
function stopGame() {
    fail.style.display ="block"
    // audio.pause();
    // audio = new Audio("")
    // audio.currentTime = 0;
    dead.play();
    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instrectionText.style.display = "block"
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
    if (currentScore == 10) {
        gameSpeed = 100

    }
    else if (currentScore == 20) {
        gameSpeed = 50
    }

}

function updateHighScore(){

    let curentScore  = snake.length - 1;
    if(curentScore > highScore){
         highScore = curentScore;
    }


    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
}


document.addEventListener("keydown", hendleKeyPress)


