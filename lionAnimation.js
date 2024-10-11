let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
let canvas_width = canvas.width = 1000;
let canvas_height = canvas.height = 500;

let lion_image = new Image();
lion_image.src = "CircusCharlieSheet1.gif";
let lionx = 40;
let liony = 31;
let lioni = 0;
let gf = 0;
let stagnant = 5;
let runId = null; 
let runLeftId = null;

function lionWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 160 + i * 38, 84, 36, 20, 50, 100, 100, 100);
    if (gf % stagnant === 0) {
        i = (i < 3) ? i + 1 : 0;
    }
    gf++;
    runId = requestAnimationFrame(lionWalk);  
}

function runLeft() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 119 - i * 35, 85, 35, 20, 50, 0, 100, 100);
    if (gf % stagnant === 0) {
        i = (i < 3) ? i + 1 : 0;
    }
    gf++;
    runLeftId = requestAnimationFrame(runLeft);  
}

function lionRightStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 160 + 0 * 38, 84, 36, 20, 50, 100, 100, 100);
    // if (gf % stagnant === 0) {
    //     i = (i < 3) ? i + 1 : 0;
    // }
    // gf++;
    requestAnimationFrame(lionRightStop);  
}

function lionLeftStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 119 - 0 * 35, 85, 35, 20, 50, 0, 100, 100);
    // if (gf % stagnant === 0) {
    //     i = (i < 3) ? i + 1 : 0;
    // }
    // gf++;
    requestAnimationFrame(lionLeftStop);  
}

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        if (runId !== null) {
            cancelAnimationFrame(runId);  
        }
        lionWalk();  
    }
    if (e.key === "ArrowLeft") {
        if (runLeftId !== null) {
            cancelAnimationFrame(runLeftId);  
        }
        runLeft(); 
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        cancelAnimationFrame(runId);  
        runId = null;  
        rightStop();  
    }
    if (e.key === "ArrowLeft") {
        cancelAnimationFrame(runLeftId);  
        runLeftId = null;  
        lionLeftStopStop();  
    }
});
