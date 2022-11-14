var ball, ballImage;
var score = 0;
var lives = 3;
// En la clase 29
var paddle;
// En la clase 28
var alienGroup;
var edges;
var blueImage, greenImage, redImage, yellowImage, paddleImage, bgImage;
var gamestate="server";

function preload(){
    ballImage= loadImage("./ball.png")
    blueImage= loadImage("./blue.png")
    greenImage= loadImage("./green.png")
    yellowImage= loadImage("./yellow.png")
    redImage= loadImage("./red.png")
    paddleImage=loadImage("Spaceship.png")
    bgImage=loadImage("bg.jpg")
}

// Esto se ejecutará una vez al inicio
function setup() {
    createCanvas(700, 700);
    ball = createSprite(340,550,10,10);
    ball.addImage("ball",ballImage);
    ball.scale=0.05;
   
    
    paddle = createSprite(340, 600, 120, 10);
    paddle.shapeColor = "blue";
    paddle.addImage("paddle",paddleImage)
    paddle.scale=0.1
    
    edges=createEdgeSprites();
    
    
    alienGroup = createGroup();
    createAlienRow(100, redImage);
    createAlienRow(100+65, blueImage);
    createAlienRow(100+65+65, yellowImage);
    createAlienRow(100+65+65+65, greenImage);
   
}


// Esto se ejecutará varias veces
function draw() {
  // Rellena el lienzo con un gris claro, cubriendo las imágenes previas
  background(bgImage);
 textSize(30);
    fill("black")
    text("Puntuación: "+score,10,40);
    text("vidas: "+lives,10,60);
    fill("black")
    if (gamestate == "server"){
        text("Presiona la barra espaciadora para servir la pelota.", 10,380);
        
        ball.velocityX=0;
        ball.velocityY=0;
        ball.x=340;
        ball.y=550;
        if(keyDown("space")){
            ball.velocityX = 7;
            ball.velocityY = 7;
            if(gamestate=="server"){
                gamestate="play";
                ball.velocityY=-7;
                ball.velocityX=-7;
                alienGroup.setVelocityYEach(0.2);
            }
        }
    }
   else if (gamestate=="end"){
       text("fin del juego" ,300,370);
       ball.remove;
   }
    else{
        gameplay();
    }
    
 
  drawSprites();
}

// Clase 27
function createAlienRow(y, alienImage) {
var x = 125
  for(var c=0; c<6; c++)
  {
    var alien = createSprite(x,y,50, 25);
     x+= alien.width + 40;
    alien.addImage("coloralien",alienImage);
    alien.scale=0.07;
    alienGroup.add(alien);
  }
      
}
    

// Clase 28
function alienHit(ball, alienGroup) {
 alienGroup.remove();
 score = score+5;


}
//cend

// Clase 29

// Clase 28
function gameplay(){
  paddle.x=mouseX
 // paddle.x = ball.x; 
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 650)
  {
    paddle.x = 650;
  }
  //rotation = rotation + 5;
 ball.bounceOff(edges[0]);
 ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(paddle);
  ball.bounceOff(alienGroup, alienHit);    
 if(!alienGroup[0]){
     ball.velocityX=0;
     ball.velocityY=0;
     text("ganaste el juego",250,150);
 }
 if(ball.isTouching(edges[3])){
     lifeover();
 }
// clase 29
}
  
function lifeover(){
    lives=lives-1;
    if(lives>=1){
        gamestate="server"
    }
    else
    {
        gamestate="end"
    }
}