let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
let canvas_width = canvas.width = 1000;
let canvas_height = canvas.height = 500;

let player_image = new Image();
player_image.src = "CircusCharlieSheet1.gif";
let x = 20;
let y = 31;
let i = 0;
let gf = 0;
let stagnant = 5;
let walkId = null; 
let leftId = null;



function rightWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image, 163 + i * x, 0, 20, 30, 50, 50, 100, 100);
    if (gf % stagnant === 0) {
        i = (i < 3) ? i + 1 : 0;
    }
    gf++;
    walkId = requestAnimationFrame(rightWalk);  
}

function leftWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image, 135 - i * x, 0, 20, 30, 50, 50, 100, 100);
    if (gf % stagnant === 0) {
        i = (i < 3) ? i + 1 : 0;
    }
    gf++;
    leftId = requestAnimationFrame(leftWalk);  
}

function rightStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image, 163 + 0 * x, 0, 20, 30, 50, 50, 100, 100);
    requestAnimationFrame(rightStop); 
}

function leftStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image, 135 + 0 * x, 0, 20, 30, 50, 50, 100, 100);
    requestAnimationFrame(leftStop); 
}


document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        if (walkId !== null) {
            cancelAnimationFrame(walkId);  
        }
        rightWalk();  
    }
    if (e.key === "ArrowLeft") {
        if (leftId !== null) {
            cancelAnimationFrame(leftId);  
        }
        leftWalk(); 
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        cancelAnimationFrame(walkId);  
        walkId = null;  
        rightStop();  
    }
    if (e.key === "ArrowLeft") {
        cancelAnimationFrame(leftId);  
        leftId = null;  
        leftStop();  
    }
});

