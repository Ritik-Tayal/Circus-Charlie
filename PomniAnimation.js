let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
let canvas_width = canvas.width = 1000;
let canvas_height = canvas.height = 500;

let player_image2 = new Image();
player_image2.src = "mario2.png";
let x = 40;
let y = 31;
let i = 0;
let gf = 0;
let stagnant = 5;
let marioRgId = null; 
let marioLgId = null;



function marioRightWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2,198 + i * x, 2, 25, 30, 50, 50, 80, 80);
    if (gf % stagnant === 0) {
        if(i==0){
            i=3;
        }
        else if(i==3){
            i=4;
        }
        else{
            i=0;
        }
    }
    gf++;
    marioRgId = requestAnimationFrame(marioRightWalk);  
}

// marioRightWalk();

function marioLeftWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2, 158 - i * x, 2, 25, 30, 50, 50, 80, 80);
    if (gf % stagnant === 0) {
        if(i==0){
            i=3;
        }
        else if(i==3){
            i=4;
        }
        else{
            i=0;
        }
    }
    gf++;
    marioLgId = requestAnimationFrame(marioLeftWalk);  
}

// marioLeftWalk();

function marioRightStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2, 198 + 0 * x, 2, 25, 30, 50, 50, 80, 80);
    requestAnimationFrame(marioRightStop); 
}

function marioLeftStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2, 158 + 0 * x, 2, 25, 30, 50, 50, 80, 80);
    requestAnimationFrame(marioLeftStop); 
}


document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        if (marioRgId !== null) {
            cancelAnimationFrame(marioRgId);  
        }
        marioRightWalk();  
    }
    if (e.key === "ArrowLeft") {
        if (marioLgId !== null) {
            cancelAnimationFrame(marioLgId);  
        }
        marioLeftWalk(); 
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        cancelAnimationFrame(marioRgId);  
        marioRgId = null;  
        marioRightStop();  
    }
    if (e.key === "ArrowLeft") {
        cancelAnimationFrame(marioLgId);  
        marioLgId = null;  
        marioLeftStop();  
    }
});

