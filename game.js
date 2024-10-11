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
let bgmove = 0;

const gravity = 1;
const jumpPower = -17;
const obsspeed = 10;
let obstacleCount = 0;
const obswin = 20;

// Load the initial screen image
const initialImage = new Image();
initialImage.src = 'resources/logocc.png';

// Load background image
const backgroundImage = new Image();
backgroundImage.src = 'resources/backgroundimage.gif';

// Load player image
const playerImage = new Image();
playerImage.src = 'resources/charlieclown.gif';

// Load obstacle image
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
    ctx.drawImage(backgroundImage, bgmove, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, bgmove + canvas.width, 0, canvas.width, canvas.height);
}


// DRAW PLAYER
function drawCharacter() {
    ctx.drawImage(playerImage, character.x, character.y, character.width, character.height);
}

//DRAW OBSTACLE
function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// UPDATE LOGIC FOR GAME
function update() {
    if (character.jumping) {
        character.dy += gravity;
        character.y += character.dy;

        if (character.y >= 400) {
            character.y = 400;
            character.jumping = false;
            character.dy = 0;
        }
    }

    // MOVING OBSTACLES WITH UNIFORM SPEED
    for (let obstacle of obstacles) {
        obstacle.x -= obsspeed;
    }

    // UPDATE BACKGROUND
    bgmove -= obsspeed;

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

        // END GAME AFTER CROSSING 20 OBSTACLES
        if (obstacleCount >= obswin) {
            gameOver = true;
        }
    }

    // RESET BACKGROUND FOR LOOP MOTION
    if (bgmove <= -canvas.width) {
        bgmove = 0;
    }
}

// GAME LOOP
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBackground();

    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
        ctx.fillText('Press R to Restart', canvas.width / 2 - 90, canvas.height / 2 + 80);
        return;
    }

    drawCharacter();
    drawObstacles();
    update();
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

window.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(initialImage, 0, 0, canvas.width, canvas.height); // Draw the initial image
};


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();// SPACEBAR PRESS FOR JUMP
    }
    if (event.code === 'KeyR' && gameOver) {
        resetGame(); // Reset game on 'R' key
    }
    if (event.code === 'KeyP' && !gameStarted) {
        startGame(); // Start the game on 'P' key
    }
});

// START GAME
function startGame() {
    gameStarted = true;
    gameLoop();
    obstacleInterval = setInterval(createObstacle, 1000);
}

// RESET GAME
function resetGame() {
    clearInterval(obstacleInterval);
    character = { x: 300, y: 400, width: 60, height: 50, dy: 0, jumping: false };
    obstacles = [];
    score = 0;
    gameOver = false;
    obstacleCount = 0;
    bgmove = 0;
    gameStarted = false; 
    startGame();
}