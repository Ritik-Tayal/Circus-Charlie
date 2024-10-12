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
let stagnant = 10;
let runId = null; 
let runLeftId = null;

function lionWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 160 + lioni * 38, 84, 36, 20, 50, 100, 100, 100);
    if (gf % stagnant === 0) {
        lioni = (lioni < 2) ? lioni + 1 : 0;
    }
    gf++;
    runId = requestAnimationFrame(lionWalk);  
}

function runLeft() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 119 - lioni * 35, 85, 35, 20, 50, 100, 100, 100);
    if (gf % stagnant === 0) {
        lioni = (lioni < 2) ? lioni + 1 : 0;
    }
    gf++;
    runLeftId = requestAnimationFrame(runLeft);  
}

function lionRightStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 160 + 2 * 38, 84, 36, 20, 50, 100, 100, 100);
    // if (gf % stagnant === 0) {
    //     i = (i < 3) ? i + 1 : 0;
    // }
    // gf++;
    requestAnimationFrame(lionRightStop);  
}

function lionLeftStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(lion_image, 119 - 2 * 35, 85, 35, 20, 50, 100, 100, 100);
    // if (gf % stagnant === 0) {
    //     i = (i < 3) ? i + 1 : 0;
    // }
    // gf++;
    requestAnimationFrame(lionLeftStop);  
}
// lionLeftStop();
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
        lionRightStop();  
    }
    if (e.key === "ArrowLeft") {
        cancelAnimationFrame(runLeftId);  
        runLeftId = null;  
        lionLeftStop();  
    }
});
