var trex, trex_running;
var edges;
var ground, groundImg;
var pisofalso;
var nube, nubeImg;
var obstaculos6;
var obstaculos5;
var obstaculos4; 
var obstaculos3; 
var obstaculos2; 
var obstaculos1;
var gamestate="START";
var puntos;
var jumps;
var die;
var score;
var obstacleupgr;
var nubesgr;
var chocar;
var restart, restartImg
var gameover, gameoverImg
var teroImg;
var trexdown;
var atardecer, atardecerImg;
var dn
function preload(){
  //loadanimation es para poner mas imagenes para que parezca que se mueve y loadimage solo es para que se vea la imagen 
  trex_running =        loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImg =loadImage("ground2.png");
  nubeImg = loadImage("cloud.png");
  obstaculos1 =loadImage("obstacle1.png");
  obstaculos2 =loadImage("obstacle2.png");
  obstaculos3 =loadImage("obstacle3.png");
  obstaculos4 =loadImage("obstacle4.png");
  obstaculos5 =loadImage("obstacle5.png");
  obstaculos6 =loadImage("obstacle6.png");
  score =loadSound ("checkPoint.mp3");
  die =loadSound ("die.mp3");
  jumps =loadSound ("jump.mp3");
  chocar=loadAnimation("trex_collided.png");
  restartImg=loadImage("restart.png");
  gameoverImg=loadImage("gameOver.png");
  teroImg=loadAnimation("tero1.png","tero2.png");
  trexdown=loadAnimation("trex_down1.png","trex_down2.png");
  atardecerImg=loadImage("luna.png");
}

function setup() {
  createCanvas(600, 200);
  
  //create a trex sprite
    //es diferente ya que tienes que cargar mas imagenes 
  trex=createSprite(50,190,20,50)
  trex.addAnimation("running", trex_running);
  trex.addAnimation("chocar", chocar);
  trex.addAnimation("abajo", trexdown);
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  trex.setCollider("circle",0,0,40);
  restart=createSprite(300,110,50,50);
  restart.addImage("restart", restartImg);
  restart.scale=0.6
  restart.visible=false
  gameover=createSprite(300,60,50,50);
  gameover.addImage("gameover", gameoverImg);
  gameover.scale= 0.8
  gameover.visible=false
  atardecer=createSprite(700,160,20,20)
  atardecer.addImage("LUNA", atardecerImg);
  atardecer.scale=0.10
  dn=1;
  //trex.debug=true
  //piso de verdad
 obstacleupgr=new Group();
  nubesgr=new Group();
  ground=createSprite(200,180,400,20);
//solo para una imagen  
  ground.addImage("ground",groundImg);
  //piso flaso
  puntos=0;
  pisofalso=createSprite(200,190,400,10);
  //el visible=false es para que se haga invisible 
  pisofalso.visible=false
  //edges
  edges=createEdgeSprites();
  
}

function draw() {
  
  if(dn===1){
    background(155);
  }
  if(dn===2){
    noche();
  }
  fill(255,255,255);
  text("score"+puntos,530,190);
  //piso para que se pueda hacer infinito
//ground.velocityX=-3;
  if (ground.x < 0) { 
    ground.x = ground.width / 2; 
  }
//para revisar las velocidades de el piso
 //console.log(frameCount);
  
  //jumping the trex on space key press
  //para que el trex no se valla y se salga del mundo 
  trex.velocityY = trex.velocityY + 0.8
 if(gamestate==="START"&keyDown("space")){
   gamestate="PLAY"
 } 

   
 //esto es para tener los puntos y que se sumen 
 if (gamestate==="PLAY"){
   if(frameCount%1000===1){
     dn=2;
   }
   puntos=puntos+Math.round(frameCount/300);
   if(puntos%1000===0&puntos>0){
     score.play();
   }
   ground.velocityX=-3;
  nubes();
   terofly();
  obstaculo();
   if(keyDown("space")&& trex.y>100) {
    trex.velocityY = -18;
     jumps.play();
     
    
  }
   if(keyWentDown(DOWN_ARROW)){
       trex.changeAnimation("abajo", trexdown);
     trex.scale=0.35;
   }
   if(keyWentUp(DOWN_ARROW)){
     trex.changeAnimation("running", trex_running);
     trex.scale=0.5
   }
  //esto es para que se pueda perder si no ganarias siempre y asi no tiene chiste :/
   if(trex.isTouching(obstacleupgr)){
    gamestate="END";
     trex.changeAnimation("chocar", chocar);
     die.play();
   }
 }
  //esto es para que se pueda parar las nubes el suelo y obstaculo 
   if(gamestate==="END"){
    ground.velocityX=0;
     obstacleupgr.setVelocityXEach(0);
     nubesgr.setVelocityXEach(0);
     restart.visible=true;
     gameover.visible=true;
     trex.velocityY=0;
     if (mousePressedOver(restart)){
       vuelve();
       
       
     }
     
    //console.log("hello dear");
 
   }
 //stop trex from falling down 
  trex.collide(pisofalso);
 //comentar las funciones 
  //nubes();
  //obstaculo();
  drawSprites();
}
// aqui creamos las nubes 
function nubes () {
  if(frameCount%50===0){
    var nube=createSprite(600,30,20,20);
// aqui icimos que la nube tuviera velocidad 
    nube.velocityX=-3;
    //Aqui le pusimos la imagen a la nube 
    nube.addImage(nubeImg);
    // aqui pusimos un numero random para que se puderan ver en diferentes sitios las nubes usando el random 
    nube.y = Math.round(random(10,60));
    nube.depth=trex.depth;
    trex.depth=trex.depth+1;
    nubesgr.add(nube);
console.log(trex.depth)
  }
}
function obstaculo () {
  if(frameCount%120===0){
    var obstacle=createSprite(600,165,20,20);
    obstacle.shapeColor=("blue");
    obstacle.velocityX=-3
    var op=Math.round(random(1,6));
    //nuevo formato 
    //en este comando se dan los casos u opciones para que se hagan aleatorias la aparicion en este caso de obstaculos 
    switch(op){
      case 1:
        obstacle.addImage(obstaculos1);
        break;
        case 2:
        obstacle.addImage(obstaculos2);
        break;
        case 3:
        obstacle.addImage(obstaculos3);
        break;
        case 4:
        obstacle.addImage(obstaculos4);
        break;
        case 5:
        obstacle.addImage(obstaculos5);
        break;
        case 6:
        obstacle.addImage(obstaculos6);
        break;
        default:
        break;
    }
    obstacle.scale=0.5
    obstacleupgr.add(obstacle);
  }
}
function vuelve(){
  gamestate="START";
  obstacleupgr.destroyEach();
  nubesgr.destroyEach();
  puntos=0;
  restart.visible=false;
  gameover.visible=false;
  trex.changeAnimation("running", trex_running);
}
function terofly(){
  if(frameCount%150===0){
  var terod=createSprite(580,40,20,20);
    terod.addAnimation("fly", teroImg);
    terod.velocityX=-6
}
}
function noche(){
  //aqui cambia el fondo a negro y le da velocidad a la luna para que se eleve
  background("black");
  atardecer.velocityX=-3;
  atardecer.velocityY=-1;
  //una vez que pase de a mitad se va abajando para abajo vaya la redondancia 
  if(atardecer.x<300){
    atardecer.velocityY=0.5;
  }
  //esto es paraque se ponga de dia cuando se pase al otro lado y que vuelva al otro sin movimiento 
  if(atardecer.x<0){
    dn=1;
    atardecer.x=700;
    atardecer.y=150;
    atardecer.velocityX=0;
    atardecer.velocityY=0
  }
}