const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false };
let obstacles = [];
let gameOver = false;
let gameStarted = false;
let obstacleInterval;
let bgmoveX = 0;
let showLife = false;
let showLifeOnce = true;
let lifeX = canvas.width;
let lifeY = 370;
let showShield = false;
let showShieldOnce = true;
let shieldX = canvas.width;
let shieldY = 370;
let shieldTime = 0;

const gravity = 1;
const jumpPower = -17;
let obsspeed = 7;
const maxDistance = 20000;
let totalDistance = 0;
let lives = 3;
let startpoint = 0;
let checkpoint1 = 5000;
let checkpoint2 = 15000;
let time = 3000;
let obtime = 1500;
let showSpecialImage = false;
let specialImageX = canvas.width; // Start the image off-screen
let specialImageY = 290; // Same Y position as the player or customize


let isMovingLeft = false;
let isMovingRight = false;
let moveSpeed = 10;
let lastTime = 0; // TRACKING TIME
let speedBoost = false;
let speedReduction = false;



// let lion_image = new Image();
// lion_image.src = "CircusCharlieSheet1.gif";
let lionx = 40;
let liony = 31;
let lioni = 0;
let gf = 0;
let stagnant = 10;
let runId = null; 
let runLeftId = null;

// ctx.drawImage(lion_image, 163 , 0, 20, 30, 55, 50, 100, 100);


// HOMESCREEN
const initialImage = new Image();
initialImage.src = 'resources/frontpage.png';

//BACKGROUND
const backgroundImage = new Image();
backgroundImage.src = 'resources/backgroundimage.gif';

//CHARLIE
const playerImage = new Image();
playerImage.src = 'CircusCharlieSheet1.gif';

// OBSTACLE1
const obstacleImage = new Image();
obstacleImage.src = 'resources/ringOfFire.gif';

// CHECKPOINT
const specialImage = new Image();
specialImage.src = 'resources/checkpointer.png';

//EXTRA LIFE
const lifeImage = new Image();
lifeImage.src = 'resources/xtralife.png';

//SHIELD
const shieldImage = new Image();
shieldImage.src = 'resources/shieldeffect.png';

// CHECKPOINT MESSAGE
let checkpointMessage = '';
let checkpointTimer = 0;

// OBSTACLE CREATION

drawBackground();
function createObstacle() {
    let height = 50;
    let width = 50;

    const obstacle = { x: canvas.width, y: 430 - height, width: width, height: height };
    obstacles.push(obstacle);
}

// DRAW BACKGROUND
function drawBackground() {
    ctx.drawImage(backgroundImage, bgmoveX, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, bgmoveX + canvas.width, 0, canvas.width, canvas.height);
}

// DRAW PLAYER
function drawCharacter() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height);
    ctx.drawImage(backgroundImage, character.x , character.y - 41, character.width + 50, character.height + 60,character.x , character.y - 50, character.width + 50, character.height + 60);
    // ctx.fillStyle("green");
    // ctx.fill();
    // drawObstacles();
    // drawLife();
    // drawShield();
    // drawLife();
    ctx.drawImage(playerImage,163,0,20,30, character.x+10, character.y-50, character.width, character.height);
    ctx.drawImage(playerImage,160+lioni*38,84,36,20,character.x, character.y, character.width+40, character.height+10);
    if (gf % stagnant === 0) {
        lioni = (lioni < 2) ? lioni + 1 : 0;
    }
    gf++;
    runId = requestAnimationFrame(drawCharacter);  
}

function drawCharacterStop() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height);
    ctx.drawImage(backgroundImage, character.x , character.y - 41, character.width + 50, character.height + 60,character.x , character.y - 50, character.width + 50, character.height + 60);
    // ctx.clearRect(character.x, character.y, character.width, character.height);
    // drawBackground();
    // drawObstacles();
    ctx.drawImage(playerImage,163,0,20,30, character.x+5, character.y-50, character.width, character.height);
    ctx.drawImage(playerImage,160+2*38,84,36,20,character.x, character.y, character.width+40, character.height+10);
    requestAnimationFrame(drawCharacterStop);  
}

function drawCharacterLeft() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height);
    ctx.drawImage(backgroundImage, character.x , character.y - 41, character.width + 50, character.height + 60,character.x , character.y - 50, character.width + 50, character.height + 60);
    // ctx.clearRect(character.x, character.y, character.width, character.height);
    // drawBackground();
    // drawObstacles();
    ctx.drawImage(playerImage,135,0,20,30, character.x, character.y-50, character.width, character.height);
    ctx.drawImage(playerImage,119-lioni*35,84,36,20,character.x, character.y, character.width+40, character.height+10);
    if (gf % stagnant === 0) {
        lioni = (lioni < 2) ? lioni + 1 : 0;
    }
    gf++;
    runLeftId = requestAnimationFrame(drawCharacterLeft);  
}

function drawCharacterStop2() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height);
    ctx.drawImage(backgroundImage, character.x , character.y - 41, character.width + 50, character.height + 60,character.x , character.y - 50, character.width + 50, character.height + 60);
    // ctx.clearRect(character.x, character.y, character.width, character.height);
    // drawBackground();
    // drawObstacles();
    ctx.drawImage(playerImage,135,0,20,30, character.x, character.y-50, character.width, character.height);
    ctx.drawImage(playerImage,119-2*35,84,36,20,character.x, character.y, character.width+40, character.height+10);

    requestAnimationFrame(drawCharacterStop2);  
}

// DRAW OBSTACLE
function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

//DRAW CHECKPOINT
function drawCheckpoint() {
    ctx.drawImage(specialImage, specialImageX, specialImageY, 180, 180);
}

//DRAW EXTRA LIFE
function drawLife() {
    ctx.drawImage(lifeImage, lifeX, lifeY, 80, 80);
}

//DRAW SHIELD
function drawShield() {
    ctx.drawImage(shieldImage, shieldX, shieldY, 55, 80);
}

// UPDATE LOGIC FOR GAME
function update(deltaTime) {
    if (character.jumping) {
        character.dy += gravity;
        character.y += character.dy;

        if (character.y >= 380) {
            character.y = 380;
            character.jumping = false;
            character.dy = 0;
        }
    }

    // Check if totalDistance is 3800 to show the special image
    if ((totalDistance >= 3800 && totalDistance < 3800 + obsspeed) || (totalDistance >= 13800 && totalDistance < 13800 + obsspeed)) {
        showSpecialImage = true;
        specialImageX = canvas.width; // Position it at the right edge of the screen
    }

    //SHOW LIFE
    if (totalDistance >= 8800 && totalDistance < 8800 + obsspeed) {
        showLife = true;
        lifeX = canvas.width;
    }

    //SHOW SHIELD
    if (totalDistance >= 1800 && totalDistance < 1800 + obsspeed) {
        showShield = true;
        shieldX = canvas.width; // Position it at the right edge of the screen
    }

    //MOVE LIFE IMAGE
    if (showLife && showLifeOnce) {
        drawLife();
        if (isMovingLeft) {
            lifeX += moveSpeed * (deltaTime / 16);
        }
        if (isMovingRight) {
            lifeX -= moveSpeed * (deltaTime / 16);
        }
    }

    //MOVE SHIELD IMAGE
    if (showShield && showShieldOnce) {
        drawShield();
        if (isMovingLeft) {
            shieldX += moveSpeed * (deltaTime / 16);
        }
        if (isMovingRight) {
            shieldX -= moveSpeed * (deltaTime / 16);
        }
    }

    //LIFE COLLISION
    if (
        showLife && // Only check collision if the extra life is visible
        character.x < lifeX + 80 && // Using lifeX for the position of the extra life
        character.x + character.width > lifeX &&
        character.y < lifeY + 80 && // Using lifeY for the position of the extra life
        character.y + character.height > lifeY
    ) {
        lives++;  // Grant an extra life
        showLife = false; // Hide the extra life after collision
        showLifeOnce = false;
    }    

    //SHIELD COLLISION
    if (
        showShield &&
        character.x < shieldX + 80 &&
        character.x + character.width > shieldX &&
        character.y < shieldY + 80 &&
        character.y + character.height > shieldY
    ) {
        shieldTime = 400;
        showShield = false;
        showShieldOnce = false;
    }
    // MOVE CHECKPOINT
    if (showSpecialImage) {
        drawCheckpoint();
        if (isMovingLeft) {
            specialImageX += moveSpeed * (deltaTime / 16);
        }
        if (isMovingRight) {
            specialImageX -= moveSpeed * (deltaTime / 16);
        }
    }

    if ((totalDistance > 5000 && totalDistance <5100) || (totalDistance > 15000 && totalDistance <15100)) {
        showSpecialImage = false;
    }

    // SPEED CHANGE
    if (isMovingRight && !speedBoost) {
        obsspeed += moveSpeed;
        speedBoost = true;
    } else if (isMovingLeft && !speedReduction) {
        obsspeed = moveSpeed - obsspeed;
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
    if(shieldTime != 0)
    {
        shieldTime--;
    }
    else {
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

    // drawCharacter();
    drawObstacles();
    update(deltaTime);

    ctx.fillStyle = 'black';
    ctx.font = '25px myFont';
    ctx.fillText('TD: ' + totalDistance, 40, 670);
    ctx.fillText('Lives: ' + lives, 40, 700);
    if(time > 500)
    {
        ctx.fillText('Time left: ' + time, 40, 640);
    }
    else {
        ctx.fillStyle = 'red';
        ctx.font = '30px myFont';
        ctx.fillText('Time left: ' + time, 40, 640)
    }
    if(shieldTime > 0)
    {
        ctx.fillStyle = 'black';
        ctx.font = '30px myFont';
        ctx.fillText('Immunity: ' + shieldTime, 40, 600);
    }
    // DISPLAY 'CHECKPOINT' FOR 3S
    if (checkpointMessage && checkpointTimer > 0) {
        ctx.fillStyle = 'black';
        ctx.font = '40px myFont';
        ctx.fillText(checkpointMessage, canvas.width / 2 - 380, canvas.height / 2);
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
    setTimeout(() => {
        ctx.fillStyle = 'white';
        ctx.font = '70px';
        ctx.fillText('Press P to Play', canvas.width/2 - 250, canvas.height/2 + 100);
    },1000);
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
        if (runLeftId !== null) {
            cancelAnimationFrame(runLeftId);  

        }
        drawCharacterLeft();
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = true;
        if (runId !== null) {
            cancelAnimationFrame(runId);

        }
        drawCharacter();
    }
});

// REVERTING KEYDOWN EVENTS
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = false;
        speedReduction = false;
        obsspeed = 7;
        cancelAnimationFrame(runLeftId);  
        runLeftId = null;
        ctx.clearRect(character.x, character.y, character.width+40, character.height+50);
        drawCharacterStop2();
     
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = false;
        speedBoost = false;
        obsspeed = 7;
        cancelAnimationFrame(runId);  
        runId = null;  
        ctx.clearRect(character.x, character.y, character.width+40, character.height+50);
        drawCharacterStop();

    }
});

// START GAME
function startGame() {
    gameStarted = true;
    lastTime = performance.now();
    gameLoop(lastTime);
    obstacleInterval = setInterval(createObstacle, obtime);
}

// RESET GAME
function resetGame() {
    clearInterval(obstacleInterval);
    character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false };
    obstacles = [];
    lives = 3;
    gameOver = false;
    bgmoveX = 0;
    moveSpeed = 10;
    obtime = 1500;
    showLifeOnce = true;
    showShieldOnce = true;
    obsspeed = 7;
    totalDistance = 0;
    time = 3000;
    speedBoost = false;
    speedReduction = false;
    lastTime = 0;
    startGame();
}

// CHECKPOINT FUNCTION
function cp(checker) {
    clearInterval(obstacleInterval);
    character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false };
    obstacles = [];
    bgmoveX = 0;
    obsspeed = 7;
    showSpecialImage = false;
    speedBoost = false;
    totalDistance = checker;
    speedReduction = false;
    gameStarted = true;
    lastTime = performance.now();
    obstacleInterval = setInterval(createObstacle, obtime);
}

//CHECKPOINT MESSAGE FUNCTION
function triggerCheckpoint() {
    checkpointMessage = 'CHECKPOINT REACHED!';
    checkpointTimer = 2500;
    moveSpeed += 2;
    obsspeed += 2;
    clearInterval(obstacleInterval);
    obstacleInterval = setInterval(createObstacle, obtime-600);
}
