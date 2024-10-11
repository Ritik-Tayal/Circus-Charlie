let canvas=document.querySelector("canvas");
let c=canvas.getContext('2d');
let canvas_width=canvas.width=1000;
let canvas_height=canvas.height=500;

let player_image=new Image();
player_image.src="CircusCharlieSheet1.gif";
let x=20;
let y=31;
let i=0;
let gf=0;
let stagnant=5;
let walkId;

function rightWalk(){
    c.clearRect(0,0,canvas_width,canvas_height);
    c.drawImage(player_image,163+i*x,0,20,30,50,50,100,100);
    if(gf%stagnant==0){
        if(i<3){
            i++;
        }
        else{
            i=0;
        }
    }
    gf++;
    walkId=requestAnimationFrame(rightWalk);
    cancelAnimationFrame();
};

function leftWalk(){
    c.clearRect(0,0,canvas_width,canvas_height);
    c.drawImage(player_image,135-i*x,0,20,30,50,50,100,100);
    if(gf%stagnant==0){
        if(i<3){
            i++;
        }
        else{
            i=0;
        }
    }
    gf++;
    requestAnimationFrame(leftWalk);

};


function rightStop(){
    c.clearRect(0,0,canvas_width,canvas_height);
    c.drawImage(player_image,163+0*x,0,20,30,50,50,100,100);
    // if(gf%stagnant==0){
    //     if(i<3){
    //         i++;
    //     }
    //     else{
    //         i=0;
    //     }
    // }
    // gf++;
    requestAnimationFrame(rightStop);
};

function leftStop(){
    c.clearRect(0,0,canvas_width,canvas_height);
    c.drawImage(player_image,135+0*x,0,20,30,50,50,100,100);
    // if(gf%stagnant==0){
    //     if(i<3){
    //         i++;
    //     }
    //     else{
    //         i=0;
    //     }
    // }
    // gf++;
    requestAnimationFrame(leftStop);
};

document.addEventListener("keydown",function (e){
    if(e.key=="ArrowRight"){
        rightWalk();

    }
    if(e.key=="ArrowLeft"){
        leftWalk();
    }
})

document.addEventListener("keyup", function(e){
    if(e.key=="ArrowRight"){
        rightStop();

    }
    if(e.key=="ArrowLeft"){
        leftStop();
    }    

})