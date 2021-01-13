//Create variables here
var dog,HdogI;
var score=0;
var foodS;

function preload(){
  //load images here
  dogI=loadImage("images/dogImg.png");
  HdogI=loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(800, 700);

  database = firebase.database();
  console.log(database);
  
  dog=createSprite(width/2,height/2+100,20,20);
  dog.addImage(dogI);
  dog.scale=0.3;

  var dogFood = database.ref('food');

  dogFood.on("value",readValue);
  
}


function draw() {  
  background("#34eba1");

  fill("black");
  textSize(35);
  textFont("comic sans ms");
  text("food cans left : "+foodS,width/2-120,height/2-30);

  textFont("lucida handwriting");
  text("Note : Press UP_ARROW to feed the dog",width/2-375,40);

  if(keyWentDown("DOWN_ARROW")){
    dog.addImage(HdogI);
    writeValue(foodS);
  }

  if(frameCount%120===0){
    // score--;
  }

  drawSprites();
  //add styles here

}
function readValue(data){
  foodS = data.val();
}
function writeValue(x){
  if(x <=0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
     food : x
  })
}