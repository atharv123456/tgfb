var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,FeedtheDog;
var foodObj;

//create feed and lastFed variable here
var feed,lastFeed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
getBackgroundImg();

}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,165);
  addFood.mousePressed(addFoods);


  FeedtheDog=createButton("Feed Food");
  FeedtheDog.position(700,165);
  FeedtheDog.mousePressed(feedFoods);

  

}

function draw() {
  background("darkgreen");
  foodObj.display();
  textSize(15);
  fill("white");
  text("Press on Feed Dog To Feed The Dog But RememberThe Milk Bottles Reduce!! ",100,20);
  text("Press on Add Food If You Want To Add Milk Bottles!!",100,40);
  text("There Are Few Milk Bottles Already Given As An Example For You!!",100,60);



  if(lastFeed>=12){
    textSize(17);
    textFont("ShowCard Gothic");
    fill("yellow");
    text("Time:"+hour%12+"pm",700,100)
    }else if(lastFeed == 0)
    {
      textSize(17);
      textFont("ShowCard Gothic");
      fill("yellow");
      text("Time: 12am",700,100)  ;
    }
    else{
      textSize(17);
      textFont("ShowCard Gothic");
      fill("yellow");
      text("Time:"+hour%12+"am",700,100)
    }

    console.log(lastFeed%12);

  

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedFoods(){

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val*1);
  }
  else{
  foodObj.updateFoodStock(food_stock_val*1);
  }
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
  Food:foodS



})
}

async function getBackgroundImg(){

  
  var  response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")


  var awe = await response.json();
  var datetime = awe.datetime;


  lastFeed = datetime.slice(11,13);

  if(feedTime>=06&&feedTime<=08){
    background("darkgreen");
    }
    else if(feedTime>=04&&feedTime<=06){
      background("darkgreen");
        }
        else  if(feedTime>=08&&feedTime<=11){
          background("darkgreen");
            }
            else  if(feedTime>=11&&feedTime<=13){
              background("darkgreen");
                }

                else  if(feedTime>=13&&feedTime<=15){
                  background("darkgreen");
                    }

                    else  if(feedTime>=15&&feedTime<=17){
                      background("darkgreen");
                        }
                        else  if(feedTime>=18&&feedTime<=20){
                          background("darkgreen");
                            }

                            else  if(feedTime>=20&&feedTime<=23){
                              background("darkgreen");
                                }
                                else  if(feedTime>=23&&feedTime==0){
                                  background("darkgreen");
                                    }

                                    else  if(feedTime==0&&feedTime<=03){
                                      background("darkgreen");
                                        }

                                        else{
                                          background("darkgreen");
                                           
                                            }

  background("darkgreen"); 
}


