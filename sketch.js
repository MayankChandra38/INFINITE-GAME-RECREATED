var magma,magmaImage;
var character,characterImage;
var enemyGroup1,enemyGroup2,enemyImg1,enemyImg2;
var invisbleupper;
var invisibleLeft;
var invisibleRight;
var stoneImage;
var score;
var START = 1;
var PLAY = 2;
var END = 0;
var gameState;
var gameOvermp3;
var stoneGroup;
function preload() {
      magmaImage = loadImage("lava background.jpg");
      characterImage = loadImage("snowman image.jpg");
      gameOvermp3 = loadSound("gameover.mp3");
      stoneImage = loadImage("stone.png");
      enemyImg1 = loadImage("alien1.png");
      enemyImg2 = loadImage("alien2.png");
}

function setup() {
      createCanvas(400,400);
      magma = createSprite(50,550,1000,10);
      magma.addImage(magmaImage);
      magma.scale = 3;


      character = createSprite(350,182,10,10);
      character.addImage(characterImage);
      character.scale = 0.03;
      character.debug = false;
      character.setCollider("rectangle",100,100);

      invisibleUpper = createSprite(10,10,1000,10);
      invisibleUpper.visible = false;

      invisibleLeft = createSprite(0,200,15,1000);
      invisibleLeft.visible = false;

      invisibleRight = createSprite(400,200,15,1000);
      invisibleRight.visible = false;

      stoneGroup = createGroup();
      enemyGroup1 = createGroup();
      enemyGroup2 = createGroup();

      score = 0;

      gameState = START;
}

function draw() {
      background("red");

      if(gameState === START) {
         spawnText();
         character.velocityX = 0;
         character.velocityY = 0;
         character.visible = false;
         if(keyDown("S")) {
           gameState = PLAY;
         }
      }
      if(gameState === PLAY) {

      character.visible = true;

      stones();
      monster();
      monster2();

      if(keyDown("LEFT_ARROW")){
        character.x = character.x -7;
      }
      if(keyDown("RIGHT_ARROW")){
        character.x = character.x + 7;
      }
      if(keyDown("DOWN_ARROW")){
        character.y = character.y + 7;
      }
      if(keyDown("Space")){
        character.velocityY = -4;
      }
      if(keyDown("Space")){
        character.velocityY = -4;
      }

      character.velocityY = character.velocityY+0.4;

      character.collide(invisibleUpper);
      character.collide(invisibleLeft);
      character.collide(invisibleRight);

      score = Math.round(score+(getFrameRate()/60));

      if(character.isTouching(magma)||character.isTouching(stoneGroup)||character.isTouching(enemyGroup1)||character.isTouching(enemyGroup2)) {
        gameState = END;
        gameOvermp3.play();
      }
      }

      if(gameState===END) {
        character.visible = false;
        magma.visible = false;
        stoneGroup.destroyEach();
        enemyGroup1.destroyEach();
        enemyGroup2.destroyEach();
        gameOver();
        if(keyDown("R")) {
          gameState = START;
          magma.visible = true;
          score = 0;
          character.x = 350;
          character.y = 182;
        }
      }

      drawSprites();

      stroke("black");
      textSize(13);
      fill("black");
      text("Survival time:"+score,280,20);
}

function spawnText() {
      stroke("black");
      textSize(13);
      fill("black");
      text("Help SnowMan to escape from here.",100,100);
      text("Press S to start",150,120);
      text("Use space to move up,right arrow to move right",80,140);
      text("Use left arrow to move left",135,160);
      text("Use down arrow to move down",125,180);
      text("If you touches magma you loses",120,200);
      text("This is magma",160,280);
      text("Stone will also come from above if it touches you also lose",50,220);
      text("Monster will also come if you also touches it you also loses",50,240);
}

function gameOver() {
      stroke("black");
      textSize(20);
      fill("black");
      text("Game Over!",150,200);
      text("Press R to restart",130,220);
}

function stones() {
      if(frameCount%40===0){
      stone = createSprite(200,10,10,10);
      stone.addImage(stoneImage);
      stone.scale = 0.02;
      stone.velocityY = 6;
      stone.x = Math.round(random(10,400));
      stone.debug = false; 
      stone.lifetime = 70;
      stoneGroup.add(stone);
      }
}
function monster() {
      if(frameCount%200===0) {
        enemy = createSprite(390,200,10,10);
        enemy.addImage(enemyImg1);
        enemy.velocityX = -4;
        enemy.y = Math.round(random(40,300));
        enemy.lifetime = 100;
        enemyGroup1.add(enemy);
      }
}
function monster2() {
    if(frameCount%400===0) {
      enemy2 = createSprite(10,200,10,10);
      enemy2.addImage(enemyImg2);
      enemy2.velocityX = 4;
      enemy2.y = Math.round(random(40,300));
      enemy2.lifetime = 100;
      enemyGroup2.add(enemy2);
    }
}