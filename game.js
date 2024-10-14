const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false};
let obstacles = [];
let obstacles2 = [];
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
let ob2Interval; // Store the interval for ob2 creation
const ob2Time = 2000; // Time interval for ob2 creation in milliseconds



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


let player_image2 = new Image();
player_image2.src = "sprites_pomni_by_isaacx1977_dgepo85.png";
let mario_x = 55;
let mario_y = 31;
let mario_i = 0;
let mario_gf = 0;
// let stagnant = 5;
let marioRgId = null; 
let marioLgId = null;





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

drawBackground();
function createObstacle() {
    let height = 50;
    let width = 30;

    const obstacle = { x: canvas.width, y: 430 - height, width: width, height: height };
    obstacles.push(obstacle);

}

//OBSTACLE 2 CREATION
function createOb2() {
    const height = 50;
    const ob2  = { x: canvas.width, y: 430 - height, width: 50, height: 50};
    obstacles2.push(ob2);
}

// DRAW BACKGROUND
function drawBackground() {
    ctx.drawImage(backgroundImage, bgmoveX, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, bgmoveX + canvas.width, 0, canvas.width, canvas.height);
}


function marioRightWalk() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height+20);
    ctx.drawImage(backgroundImage, 100,300, 10,10,character.x , character.y - 20, character.width + 40, character.height + 40);
    ctx.drawImage(player_image2,25 + mario_i * mario_x, 70, 45, 80,character.x,character.y,character.width+40,character.height+40 );
    
    if (mario_gf % stagnant === 0) {
        if(mario_i==0){
            mario_i=3;
        }
        else if(mario_i==3){
            mario_i=4;
        }
        else{
            mario_i=0;
        }
    }
    mario_gf++;
    marioRgId = requestAnimationFrame(marioRightWalk);  
}

// marioRightWalk();

function marioLeftWalk() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height+20);
    ctx.drawImage(backgroundImage, 100,300, 10,10,character.x , character.y - 20, character.width + 40, character.height + 40);
    ctx.drawImage(player_image2,300 - mario_i * mario_x, 70, 45, 80,character.x,character.y,character.width+40,character.height+40 );
    
    if (mario_gf % stagnant === 0) {
        if(mario_i==0){
            mario_i=3;
        }
        else if(mario_i==3){
            mario_i=4;
        }
        else{
            mario_i=0;
        }
    }
    mario_gf++;
    marioLgId = requestAnimationFrame(marioLeftWalk);  
}

function marioRightStop() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height+20);
    ctx.drawImage(backgroundImage, 100,300, 10,10,character.x , character.y - 20, character.width + 40, character.height + 40);
    ctx.drawImage(player_image2,25 + 0 * mario_x, 70, 45, 80,character.x,character.y,character.width+40,character.height+40 );
    // ctx.clearRect(character.x, character.y, character.width, character.height);
    // drawBackground();
    // drawObstacles();
    
    requestAnimationFrame(marioRightStop);  
}

// marioRightWalk();

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
    ctx.drawImage(playerImage,163,0,20,30, character.x+15, character.y-25, character.width-30, character.height-30);
    ctx.drawImage(playerImage,160+lioni*38,84,36,20,character.x, character.y, character.width+20, character.height);
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
    ctx.drawImage(playerImage,163,0,20,30, character.x+15, character.y-25, character.width-30, character.height-30);
    ctx.drawImage(playerImage,160+2*38,84,36,20,character.x, character.y, character.width+20, character.height);
    requestAnimationFrame(drawCharacterStop);  
}

function drawCharacterLeft() {
    ctx.clearRect(character.x, character.y, character.width+40, character.height);
    ctx.drawImage(backgroundImage, character.x , character.y - 41, character.width + 50, character.height + 60,character.x , character.y - 50, character.width + 50, character.height + 60);
    // ctx.clearRect(character.x, character.y, character.width, character.height);
    // drawBackground();
    // drawObstacles();
    ctx.drawImage(playerImage,135,0,20,30, character.x+15, character.y-25, character.width-30, character.height-30);
    ctx.drawImage(playerImage,119-lioni*35,84,36,20,character.x, character.y, character.width+20, character.height);
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
    ctx.drawImage(playerImage,135,0,20,30, character.x+15, character.y-25, character.width-30, character.height-30);
    ctx.drawImage(playerImage,119-2*35,84,36,20,character.x, character.y, character.width+20, character.height);

    requestAnimationFrame(drawCharacterStop2);  
}

// DRAW OBSTACLE 1
function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// DRAW OBSTACLE 2
function drawOb2() {
    for (let ob2 of obstacles2) {
        ctx.drawImage(ob2Image, ob2.x, ob2.y, ob2.width, ob2.height);
    }
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
    
    // Update time since last checkpoint
    timeSinceLastCheckpoint += deltaTime;

    // Trigger checkpoint if 30 seconds have passed
    if (timeSinceLastCheckpoint >= checkpointInterval) {
        triggerCheckpoint();
        timeSinceLastCheckpoint = 0;  // Reset timer after checkpoint
    }

    // REMOVE OFFSCREEN OBSTACLES 2
    obstacles2 = obstacles2.filter(ob2 => ob2.x + ob2.width > 0);

    //SHOW LIFE
    if (totalDistance >= 8800 && totalDistance < 8800 + obsspeed) {
        showLife = true;
        lifeX = canvas.width;
    }

    //SHOW SHIELD
    if (totalDistance >= 1800 && totalDistance < 1800 + obsspeed) {
        showShield = true;
        shieldX = canvas.width;
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
        showLife &&
        character.x < lifeX + 80 &&
        character.x + character.width > lifeX &&
        character.y < lifeY + 80 &&
        character.y + character.height > lifeY
    ) {
        lives++;
        showLife = false;
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
    
    //DISTANCE COUNTING
    if (!gameOver) {
        
        if (isMovingRight) {
            totalDistance += moveSpeed;
            if(totalDistance > 5000)
                {
                    djenabled = true;
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
       
        ctx.fillText('Game Over', canvas.width / 2 - 113, canvas.height / 2 - 11);
    
        ctx.fillText('Press R to Restart', canvas.width / 2 - 235, canvas.height / 2 + 68);
        return;
    }

    // drawCharacter();
    drawObstacles();
    drawOb2();
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
        if(totalDistance<1000){
            if (runLeftId !== null) {
                cancelAnimationFrame(runLeftId);  
            }
            drawCharacterLeft();
        }
        else{
            if(marioLgId!==null){
                cancelAnimationFrame(marioLgId)
            }
            marioLeftWalk();
        }
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = true;
        if(totalDistance<10000){
            if (runId !== null) {
                cancelAnimationFrame(runId);  
            }
            drawCharacter();
        }
        else{
            if(marioRgId!==null){
                cancelAnimationFrame(marioRgId)
            }
            marioRightWalk();
        }
    }
});

// REVERTING KEYDOWN EVENTS
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = false;
        speedReduction = false;
        obsspeed = 7;
        ob2speed = 5;
        if(totalDistance<10000){
            cancelAnimationFrame(drawCharacterLeft);
            runLeftId=null;
            drawCharacterStop2();
        }
        else{
            cancelAnimationFrame(marioLeftWalk);
            marioLgId=null;
            marioRightStop();
        }
        
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = false;
        speedBoost = false;
        obsspeed = 7;
        ob2speed = 5;
        if(totalDistance<10000){
            cancelAnimationFrame(drawCharacter);
            runId=null;
            drawCharacterStop();
        }
        else{
            cancelAnimationFrame(marioRightWalk);
            marioRgId=null;
            marioRightStop();
        }
    }
});

// START GAME
function startGame() {
    gameStarted = true;
    lastTime = performance.now();
    gameLoop(lastTime);
    obstacleInterval = setInterval(createObstacle, obtime);
    // if(totalDistance >= checkpoint2) {
        ob2Interval = setInterval(createOb2, ob2Time);
}
// }

// RESET GAME
function resetGame() {
    clearInterval(obstacleInterval);
    clearInterval(ob2Interval);
    character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false };
    obstacles = [];
    obstacles2 = [];
    lives = 1;
    gameOver = false;
    checkpointTimer = 0;
    bgmoveX = 0;
    djenabled = false;
    moveSpeed = 10;
    obtime = 1500;
    checkpointTimer = 0;
    showLifeOnce = true;
    showShieldOnce = true;
    obsspeed = 7;
    totalDistance = 0;
    speedBoost = false;
    speedReduction = false;
    lastTime = 0;
    startGame();
}

// CHECKPOINT FUNCTION
function cp(checker) {
    clearInterval(obstacleInterval);
    clearInterval(ob2Interval);
    character = { x: 300, y: 380, width: 80, height: 70, dy: 0, jumping: false };
    obstacles = [];
    obstacles2 = [];
    bgmoveX = 0;
    speedBoost = false;
    totalDistance = checker;
    speedReduction = false;
    gameStarted = true;
    lastTime = performance.now();
    obstacleInterval = setInterval(createObstacle, obtime);
    // if(totalDistance >= checkpoint2) {
        ob2Interval = setInterval(createOb2, ob2Time);
    // }
}

//CHECKPOINT MESSAGE FUNCTION
function triggerCheckpoint() {
    checkpointMessage = 'CHECKPOINT REACHED!';
    checkpointTimer = 2000;  // Display message for 2.5 seconds
    if(moveSpeed <16) {moveSpeed += 2;}
    if (obsspeed < 10){obsspeed += 2;}
    clearInterval(obstacleInterval);
    clearInterval(ob2Interval);
    ob2Interval = setInterval(createOb2, ob2Time);
    obstacleInterval = setInterval(createObstacle, obtime);
}
