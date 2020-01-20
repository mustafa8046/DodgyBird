var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg1.jpg";
fg.src = "images/fg1.jpg";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();
var death = new Audio();
var gameOver = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
death.src = "sounds/death.mp3";
gameOver.src="sounds/gameOver.wav"
// on key down

document.addEventListener("keydown",moveUp);
document.addEventListener("keydown",moveRight);
function moveRight(){
    if(event.keyCode===39||event.keyCode===68){
    bX+= 15;
    fly.play();
}}



function moveUp(){
    if(event.keyCode===38||event.keyCode===32){
    bY -= 25;
    fly.play();
}}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 200 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height||bY<0){
            gameOver.play();
            //setTimeout(function(){gameOver1()}, 1500);
            
            
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        

    }
    

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score*10,10,cvs.height-30);
    
    requestAnimationFrame(draw);
    
}

draw();
























