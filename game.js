const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false};
let obstacles = [];
let obstacles2 = [];
let shields = [];
let lifes = [];
let gameOver = false;
let gameStarted = false;
let obstacleInterval;
let bgmoveX = 0;
let lifeX = canvas.width;
let lifeY = 370;
let shieldX = canvas.width;
let shieldY = 370;
let shieldTime = 0;
let ob2Interval;
const ob2Time = 2000; 

const shieldSpawnInterval = 14500;
let shieldInterval;

const lifeSpawnInterval = 30000;
let lifeInterval;

const gravity = 1;
const jumpPower = -17;
let obsspeed = 7;
let ob2speed = 6;
let totalDistance = 0;
let lives = 1;
let startpoint = 0;
let checkpoint1 = 5000;
let checkpoint2 = 15000;
let obtime = 1500;
let showSpecialImage = false;
let specialImageX = canvas.width;
let specialImageY = 290;
let doublejump = false;
let djenabled = false;

let isMovingLeft = false;
let isMovingRight = false;
let moveSpeed = 10;
let lastTime = 0;
let speedBoost = false;
let speedReduction = false;

// HOMESCREEN
const initialImage = new Image();
initialImage.src = 'resources/frontpage.png';

//BACKGROUND
const backgroundImage = new Image();
backgroundImage.src = 'resources/backgroundimage.gif';

//CHARLIE
const playerImage = new Image();
playerImage.src = 'resources/charlieclown.gif';

// OBSTACLE 1
const obstacleImage = new Image();
obstacleImage.src = 'resources/ringOfFire.gif';

//OBSTACLE 2
const ob2Image = new Image();
ob2Image.src = 'resources/download.png';

//EXTRA LIFE
const lifeImage = new Image();
lifeImage.src = 'resources/xtralife.png';

//SHIELD
const shieldImage = new Image();
shieldImage.src = 'resources/shieldeffect.png';

// CHECKPOINT MESSAGE
let checkpointMessage = '';
let checkpointTimer = 0;
let timeSinceLastCheckpoint = 0;
const checkpointInterval = 25000;
let cpdistance = 0;

// OBSTACLE CREATION
function createObstacle() {
    let height = 60;
    let width = 20;
    
    const obstacle = { x: canvas.width, y: 430 - height, width: width, height: height };
    obstacles.push(obstacle);
    
}

//OBSTACLE 2 CREATION
function createOb2() {
    let height = 50;
    const ob2  = { x: canvas.width, y: 430 - height, width: 50, height: 50};
    obstacles2.push(ob2);
}

//CREATE LIFE
function createLife() {
    const life = {x: canvas.width, y: life.y, width: 80, height: 80};
    lifes.push(life);
}

//CREATE SHIELD
function createShield() {
    const shield = { x: canvas.width, y: shieldY, width: 55, height: 80 };
    shields.push(shield);
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

// DRAW OBSTACLE 1
function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

//DRAW SHIELD
function drawShields() {
    for (let shield of shields) {
        ctx.drawImage(shieldImage, shield.x, shield.y, shield.width, shield.height);
    }
}


// DRAW OBSTACLE 2
function drawOb2() {
    for (let ob2 of obstacles2) {
        ctx.drawImage(ob2Image, ob2.x, ob2.y, ob2.width, ob2.height);
    }
}

//DRAW LIFE
function drawLife() {
    for(let life of lifes) {
        ctx.drawImage(lifeImage, life.x, life.y, life.width, life.height);
    }
}


//DRAW SHIELD
function drawShield() {
    ctx.drawImage(shieldImage, shieldX, shieldY, 55, 80);
}

// UPDATE LOGIC FOR GAME
function update(deltaTime) {
    if (character.jumping && !doublejump) {
        character.dy += gravity;
        character.y += character.dy;

        if (character.y >= 380) {
            character.y = 380;
            character.jumping = false;
            character.dy = 0;
        }
    }
    else if(doublejump) {
        character.dy += gravity;
        character.y += character.dy;

        if (character.y >= 380) {
            character.y = 380;
            character.jumping = false;
            doublejump = false;
            character.dy = 0;
        }
    }
    
    timeSinceLastCheckpoint += deltaTime;

    if (timeSinceLastCheckpoint >= checkpointInterval) {
        triggerCheckpoint();
        timeSinceLastCheckpoint = 0;  // Reset timer after checkpoint
    }

    for (let shield of shields) {
        shield.x -= obsspeed * (deltaTime / 20);
    }
    for(let life of lifes) {
        life.x -= obsspeed * (deltaTime / 20);
    }
    // REMOVE OFFSCREEN SHIELDS
    shields = shields.filter(shield => shield.x + shield.width > 0);
    lifes = lifes.filter(life => life.x + life.width > 0)

    // SHIELD COLLISION
    for (let shield of shields) {
        if (
            character.x < shield.x + shield.width &&
            character.x + character.width > shield.x &&
            character.y < shield.y + shield.height &&
            character.y + character.height > shield.y
        ) {
            shieldTime = 400;
            shields = shields.filter(s => s !== shield);
        }
    }

    for (let life of lifes) {
        if (
            character.x < life.x + life.width &&
            character.x + character.width > life.x &&
            character.y < life.y + life.height &&
            character.y + character.height > life.y
        ) {
           lives++;
            lifes = lifes.filter(s => s !== life); 
        }
    }
    
    // SPEED CHANGE
    if (isMovingRight && !speedBoost) {
        obsspeed += moveSpeed;
        ob2speed += moveSpeed;
        speedBoost = true;
    } else if (isMovingLeft && !speedReduction) {
        obsspeed = moveSpeed - obsspeed;
        ob2speed = moveSpeed - ob2speed;
        speedReduction = true;
    }
    
    // MOVING OBSTACLES WITH UNIFORM SPEED
    for (let obstacle of obstacles) {
        obstacle.x -= obsspeed * (deltaTime / 16);
    }
    
    
    // MOVING OBSTACLES WITH UNIFORM SPEED
    for (let ob2 of obstacles2) {
        ob2.x -= ob2speed * (deltaTime / 16);
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
                    cp(cpdistance);
                }
                else {
                    gameOver = true;
                }
            }
        }
        for(let ob2 of obstacles2) {
            if(character.x < ob2.x + ob2.width &&
                character.x + character.width > ob2.x &&
                character.y < ob2.y + ob2.height &&
                character.y + character.height > ob2.y) {
                    if (lives > 1) {
                        lives--;
                        cp(cpdistance);
                    }
                    else {
                        gameOver = true;
                    }
                }
            }
        }
            
        // REMOVE OFFSCREEN OBSTACLES
        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
            
        // REMOVE OFFSCREEN OBSTACLES 2
        obstacles2 = obstacles2.filter(ob2 => ob2.x + ob2.width > 0);

        //DISTANCE COUNTING
    if (!gameOver) {
        
        if (isMovingRight) {
            totalDistance += moveSpeed;
            if(totalDistance > 5000)
                {
                    if(!djenabled)
                    {
                    djenabled = true;
                    ctx.fillStyle = 'black';
                    ctx.font = '30px myFont';
                    ctx.fillText('DOUBLE JUMP ENABLED', canvas.width/2 - 200, 200);
                    }
                }
            }
            if (isMovingLeft) {
                if(totalDistance >= 5){
            totalDistance -= moveSpeed;
            }
            else{
                totalDistance = 0;
            }
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
       
        ctx.fillText('Game Over', canvas.width / 2 - 113, canvas.height / 2 - 20);
        ctx.fillText('Total Distance: '+totalDistance, canvas.width/2 - 260, canvas.height/2 +30);
        ctx.fillText('Press R to Restart', canvas.width / 2 - 235, canvas.height / 2 + 82);
        return;
    }

    drawCharacter();
    drawObstacles();
    drawOb2();
    drawShields();
    drawLife();
    update(deltaTime);

    ctx.fillStyle = 'black';
    ctx.font = '25px myFont';
    ctx.fillText('TD: ' + totalDistance, 40, 670);
    ctx.fillText('Lives: ' + lives, 40, 700);
   
    if(shieldTime > 0)
    {
        ctx.fillStyle = 'black';
        ctx.font = '30px myFont';
        ctx.fillText('Immunity: ' + shieldTime, 40, 600);
    }
    // DISPLAY 'CHECKPOINT'
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
    else if(character.jumping && !doublejump && djenabled)
    {
        character.dy = jumpPower;
        doublejump = true;
    }
}

// FIRST VISIBLE SCREEN
window.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(initialImage, 0, 0, canvas.width, canvas.height);
    setTimeout(() => {
        ctx.fillStyle = 'white';
        ctx.font = '55px myFont';
        ctx.fillText('Press P to Play', canvas.width/2 - 400, canvas.height/2 + 100);
    },1000);
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump(); // SPACEBAR FOR JUMP
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
        obsspeed = 7;
        ob2speed = 5;
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = false;
        speedBoost = false;
        obsspeed = 7;
        ob2speed = 5;
    }
});

// START GAME
function startGame() {
    gameStarted = true;
    lastTime = performance.now();
    gameLoop(lastTime);
    obstacleInterval = setInterval(createObstacle, obtime);
    ob2Interval = setInterval(createOb2, ob2Time);
    shieldInterval = setInterval(createShield, shieldSpawnInterval);
    lifeInterval = setInterval(createLife, lifeSpawnInterval);
}
// }

// RESET GAME
function resetGame() {
    clearInterval(obstacleInterval);
    clearInterval(ob2Interval);
    clearInterval(shieldInterval);
    clearInterval(lifeSpawnInterval);
    character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false };
    obstacles = [];
    obstacles2 = [];
    shields = [];
    lifes = [];
    lives = 1;
    gameOver = false;
    checkpointTimer = 0;
    timeSinceLastCheckpoint = 0;
    bgmoveX = 0;
    djenabled = false;
    moveSpeed = 10;
    obtime = 1500;
    obsspeed = 7;
    totalDistance = 0;
    speedBoost = false;
    speedReduction = false;
    lastTime = 0;
    startGame();
}

// CHECKPOINT FUNCTION
function cp(checker) {
    character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false };
    obstacles = [];
    obstacles2 = [];
    bgmoveX = 0;
    speedBoost = false;
    totalDistance = checker;
    speedReduction = false;
    gameStarted = true;
    lastTime = performance.now();
}

//CHECKPOINT MESSAGE FUNCTION
function triggerCheckpoint() {
    checkpointMessage = 'CHECKPOINT REACHED!';
    checkpointTimer = 2000;
    if(moveSpeed <16) {moveSpeed += 2;}
    if (obsspeed < 10){obsspeed += 2;}
    cpdistance = totalDistance;
}