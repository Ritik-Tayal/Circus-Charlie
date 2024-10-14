let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
let canvas_width = canvas.width = 1000;
let canvas_height = canvas.height = 500;

let player_image2 = new Image();
player_image2.src = "sprites_pomni_by_isaacx1977_dgepo85.png";
let mario_x = 55;
let mario_y = 31;
let mario_i = 0;
let mario_gf = 0;
let stagnant = 5;
let marioRgId = null; 
let marioLgId = null;



function marioRightWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2,25 + mario_i * mario_x, 70, 45, 80, 50, 50, 100, 100);
    if (mario_gf % stagnant === 0) {
        if(mario_i<5){
           mario_i++;
        }
        else{
            mario_i=0;
        }
    }
    mario_gf++;
    marioRgId = requestAnimationFrame(marioRightWalk);  
}


function marioLeftWalk() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2, 300 - mario_i * mario_x, 70, 45, 80, 50, 50, 100, 100);
    if (mario_gf % stagnant === 0) {
        if(mario_i<5){
            mario_i++;
        }
        else{
            mario_i=0;
        }
    }
    mario_gf++;
    marioLgId = requestAnimationFrame(marioLeftWalk);  
}

// marioLeftWalk();

function marioRightStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2, 25, 70, 45, 80, 50, 50, 100, 100);
    requestAnimationFrame(marioRightStop); 
}

function marioLeftStop() {
    c.clearRect(0, 0, canvas_width, canvas_height);
    c.drawImage(player_image2, 25,70,45,80,50,50,100,100);
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

