const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let character = { x: 300, y: 400, width: 60, height: 50, dy: 0, jumping: false };
let obstacles = [];
let score = 0;
let gameOver = false;
let gameStarted = false; 
let obstacleInterval;
let bgmoveX = 0;

const gravity = 1;
const jumpPower = -20;
let obsspeed = 4;
let obstacleCount = 0;
const maxDistance = 5000;
let totalDistance = 0;

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

// OBSTACLE CREATION
function createObstacle() {
    obstacleCount++; 
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

    //SPEED CHANGE
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

    //BACKGROUND MOVEMENT
    if (isMovingLeft) {
        bgmoveX += moveSpeed * (deltaTime / 16);
    }
    if (isMovingRight) {
        bgmoveX -= moveSpeed * (deltaTime / 16);   
    }

    //RESET BACKGROUND
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
            gameOver = true;
        }
    }

    // REMOVE OFFSCREEN OBSTACLES
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    // SCORE COUNTING
    if (!gameOver) {
        score++;
        // Track the total distance covered by the character
        totalDistance += obsspeed * (deltaTime / 16);

        // Check if the character has covered the maximum distance
        if (totalDistance >= maxDistance) {
            gameOver = true;
            ctx.fillText('You Win!', canvas.width / 2 - 50, canvas.height / 2 + 80);
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
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
        ctx.fillText('Press R to Restart', canvas.width / 2 - 90, canvas.height / 2 + 80);
        // Check if the player won
        if (totalDistance >= maxDistance) {
            ctx.fillStyle = 'black';
            ctx.fillText('You Win!', canvas.width / 2 - 50, canvas.height / 2 + 120);
        }
        return;
    }

    drawCharacter();
    drawObstacles();
    update(deltaTime);
    ctx.fillText('Score: ' + score, 20, 30); // LIVE SCORE

    requestAnimationFrame(gameLoop);
}

// JUMP ANIMATION
function jump() {
    if (!character.jumping) {
        character.dy = jumpPower;
        character.jumping = true;
    }
}

//FIRST VISIBLE SCREEN
window.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(initialImage, 0, 0, canvas.width, canvas.height);
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump(); // SPACEBAR PRESS FOR JUMP
    }
    if (event.code === 'KeyR' && gameOver) {
        resetGame(); //RESET ON R
    }
    if (event.code === 'KeyP' && !gameStarted) {
        startGame(); //PLAY ON P
    }
    if (event.code === 'ArrowLeft') {
        isMovingLeft = true;
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = true;
    }
});

//REVERTING KEYDOWN EVENTS
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
    score = 0;
    gameOver = false;
    obstacleCount = 0;
    bgmoveX = 0;
    obsspeed = 4;
    totalDistance = 0;
    speedBoost = false;
    speedReduction = false;
    gameStarted = false; 
    lastTime = 0;
    startGame();
}