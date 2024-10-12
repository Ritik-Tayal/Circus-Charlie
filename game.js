const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let character = { x: 300, y: 400, width: 60, height: 50, dy: 0, jumping: false };
let obstacles = [];
let gameOver = false;
let gameStarted = false;
let obstacleInterval;
let bgmoveX = 0;

const gravity = 1;
const jumpPower = -17;
let obsspeed = 4;
const maxDistance = 20000;
let totalDistance = 0;
let lives = 3;
let startpoint = 0;
let checkpoint1 = 5000;
let checkpoint2 = 15000;
let time = 3600;

let isMovingLeft = false;
let isMovingRight = false;
const moveSpeed = 5;
let lastTime = 0; // TRACKING TIME
let speedBoost = false;
let speedReduction = false;

// HOMESCREEN
const initialImage = new Image();
initialImage.src = 'resources/logocc.png';

//BACKGROUND
const backgroundImage = new Image();
backgroundImage.src = 'resources/backgroundimage.gif';

//CHARLIE
const playerImage = new Image();
playerImage.src = 'resources/charlieclown.gif';

// OBSTACLE1
const obstacleImage = new Image();
obstacleImage.src = 'resources/ringOfFire.gif';

// CHECKPOINT MESSAGE
let checkpointMessage = '';  // Store the checkpoint message
let checkpointTimer = 0;     // Timer to display the checkpoint message

// OBSTACLE CREATION
function createObstacle() {
    let height = 50;
    let width = 50;

    const obstacle = { x: canvas.width, y: 420 - height, width: width, height: height };
    obstacles.push(obstacle);
}

// DRAW BACKGROUND
function drawBackground() {
    ctx.drawImage(backgroundImage, bgmoveX, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, bgmoveX + canvas.width, 0, canvas.width, canvas.height);
}

// DRAW PLAYER
function drawCharacter() {
    ctx.drawImage(playerImage, character.x, character.y, character.width, character.height);
}

// DRAW OBSTACLE
function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// UPDATE LOGIC FOR GAME
function update(deltaTime) {
    if (character.jumping) {
        character.dy += gravity;
        character.y += character.dy;

        if (character.y >= 400) {
            character.y = 400;
            character.jumping = false;
            character.dy = 0;
        }
    }

    // SPEED CHANGE
    if (isMovingRight && !speedBoost) {
        obsspeed += moveSpeed;
        speedBoost = true;
    } else if (isMovingLeft && !speedReduction) {
        obsspeed = Math.max(moveSpeed - obsspeed, 2);
        speedReduction = true;
    }

    // MOVING OBSTACLES WITH UNIFORM SPEED
    for (let obstacle of obstacles) {
        obstacle.x -= obsspeed * (deltaTime / 16);
    }

    // BACKGROUND MOVEMENT
    if (isMovingLeft) {
        bgmoveX += moveSpeed * (deltaTime / 16);
    }
    if (isMovingRight) {
        bgmoveX -= moveSpeed * (deltaTime / 16);
    }

    // RESET BACKGROUND
    if (bgmoveX >= 0) {
        bgmoveX = 0;
    }
    if (bgmoveX <= -canvas.width) {
        bgmoveX = 0;
    }

    // END GAME FOR COLLISION
    for (let obstacle of obstacles) {
        if (
            character.x < obstacle.x + obstacle.width &&
            character.x + character.width > obstacle.x &&
            character.y < obstacle.y + obstacle.height &&
            character.y + character.height > obstacle.y
        ) {
            if (lives > 1) {
                lives--;
                if (totalDistance >= checkpoint2) {
                    cp(checkpoint2);
                }
                else if (totalDistance >= checkpoint1) {
                    cp(checkpoint1);
                }
                else {
                    cp(startpoint);
                }
            } else {
                gameOver = true;
            }
        }
    }

    // REMOVE OFFSCREEN OBSTACLES
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    //DISTANCE COUNTING
    if (!gameOver) {
        time--;
        if(time <= 0)
        {
            gameOver = true;
        }
        if (isMovingRight) {
            totalDistance += moveSpeed;
        }
        if (isMovingLeft) {
            if(totalDistance >= 5){
            totalDistance -= moveSpeed;
        }
        else{
            totalDistance = 0;
        }
    }

        //CHECKPOINT MESSAGE
        if (totalDistance >= checkpoint1 && totalDistance < checkpoint1 + obsspeed) {
            triggerCheckpoint();
        }
        if (totalDistance >= checkpoint2 && totalDistance < checkpoint2 + obsspeed) {
            triggerCheckpoint();
        }

        if (totalDistance >= maxDistance) {
            gameOver = true;
        }
    }
}

// GAME LOOP
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '30px myFont';
        if (totalDistance >= maxDistance) {
            ctx.fillText('You Win!', canvas.width / 2 - 110, canvas.height / 2 - 11);
        } else {
            ctx.fillText('Game Over', canvas.width / 2 - 113, canvas.height / 2 - 11);
        }
        ctx.fillText('Press R to Restart', canvas.width / 2 - 235, canvas.height / 2 + 68);
        return;
    }

    drawCharacter();
    drawObstacles();
    update(deltaTime);

    ctx.fillStyle = 'black';
    ctx.font = '25px myFont';
    ctx.fillText('TD: ' + totalDistance, 40, 670);
    ctx.fillText('Lives: ' + lives, 40, 700);
    ctx.fillText('Time left: ' + time, 40, 640);

    // DISPLAY 'CHECKPOINT' FOR 3S
    if (checkpointMessage && checkpointTimer > 0) {
        ctx.fillStyle = 'black';
        ctx.font = '40px myFont';
        ctx.fillText(checkpointMessage, canvas.width / 2 - 400, canvas.height / 2);
        checkpointTimer -= deltaTime;
    } else {
        checkpointMessage = '';
    }

    requestAnimationFrame(gameLoop);
}

// JUMP ANIMATION
function jump() {
    if (!character.jumping) {
        character.dy = jumpPower;
        character.jumping = true;
    }
}

// FIRST VISIBLE SCREEN
window.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(initialImage, 0, 0, canvas.width, canvas.height);
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump(); // SPACEBAR PRESS FOR JUMP
    }
    if (event.code === 'KeyR' && gameOver) {
        resetGame(); // RESET ON R
    }
    if (event.code === 'KeyP' && !gameStarted) {
        startGame(); // PLAY ON P
    }
    if (event.code === 'ArrowLeft') {
        isMovingLeft = true;
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = true;
    }
});

// REVERTING KEYDOWN EVENTS
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = false;
        speedReduction = false;
        obsspeed = 4;
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = false;
        speedBoost = false;
        obsspeed = 4;
    }
});

// START GAME
function startGame() {
    gameStarted = true;
    lastTime = performance.now();
    gameLoop(lastTime);
    obstacleInterval = setInterval(createObstacle, 1500);
}

// RESET GAME
function resetGame() {
    clearInterval(obstacleInterval);
    character = { x: 300, y: 400, width: 60, height: 50, dy: 0, jumping: false };
    obstacles = [];
    lives = 3;
    gameOver = false;
    bgmoveX = 0;
    obsspeed = 4;
    totalDistance = 0;
    time = 3600;
    speedBoost = false;
    speedReduction = false;
    lastTime = 0;
    startGame();
}

// CHECKPOINT FUNCTION
function cp(checker) {
    clearInterval(obstacleInterval);
    character = { x: 300, y: 400, width: 60, height: 50, dy: 0, jumping: false };
    obstacles = [];
    bgmoveX = 0;
    obsspeed = 4;
    speedBoost = false;
    totalDistance = checker;
    speedReduction = false;
    gameStarted = true;
    lastTime = performance.now();
    obstacleInterval = setInterval(createObstacle, 1500);
}

//CHECKPOINT MESSAGE FUNCTION
function triggerCheckpoint() {
    checkpointMessage = 'CHECKPOINT REACHED!';
    checkpointTimer = 3000;
}
