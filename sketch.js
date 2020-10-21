var PLAY=1;
var END=0;
var gamestate=1;


var monkey , monkey_running,monkeystop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var ground;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkeystop=loadAnimation("sprite_0.png");
 
}



function setup() {
  
  monkey=createSprite(60,340,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
    
   ground=createSprite(400,350,900,10);
  

  

  bananaGroup=new Group();
  obstacleGroup=new Group();
  
 monkey.setCollider("rectangle",40,30,monkey.width,monkey.height);
  monkey.debug=false;
  
  
}


function draw() {
background(220);
  
  stroke("red");
  textSize(20);
  fill("blue");
  text("survivaltime:" + survivaltime,250,50);
    
  
  
  if(gamestate===PLAY){
     ground.velocityX=-4; 
    
    
  survivaltime=Math.ceil(frameCount/5);
  
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    
    
    if(keyDown("space")&& monkey.y >= 300){
    monkey.velocityY=-13;
  
  }
    
     monkey.velocityY=monkey.velocityY+0.8;
    
    food();
  stone();
    
    if(obstacleGroup.isTouching(monkey)){
  gamestate = END;
    
  }
  
  
  }
  else if(gamestate===END){
    monkey.visible=false;
    
    ground.velocityX = 0;
      monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
  }
  
  
  
  
  
  
   
  stroke("red");
  textSize(20);
  fill("blue");
  text("score:" + score,50,50);
  
  
  
  
  
  
  
  console.log(monkey.y);
  
  
  
  monkey.collide(ground);
  
  
  if(bananaGroup.isTouching(monkey)){
    score=score+1;
    bananaGroup.destroyEach();
  }
  
  
  
 
    
                       
                            
  
  
  
  
  drawSprites();
    
}

function food(){
  if(frameCount%80===0){
    banana=createSprite(600,10,40,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(200,250));
    banana.velocityX=-4;
    banana.lifetime=200;
    bananaGroup.add(banana);
  }
}


function stone(){
  
 if(frameCount%300===0){
obstacle=createSprite(600,327,40,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-7;
  obstacle.scale=0.1;
   obstacle.lifetime=100;
   obstacleGroup.add(obstacle);
}

}