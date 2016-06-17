var ctx = document.getElementById("canvas").getContext("2d"),
		  img = new Image(),
		  canvasWidth = 1280,
		  canvasHeight = 600;
		  
var hills = new Image();
hills.src='images/background_hills.png';
img.src = "images/bg.png";

var W = canvas.width;
var H = canvas.height;

var ice = new Image();
ice.src ='images/ice.png';
var press = new Image();
press.src = 'images/press.png';
var press2 = new Image();
press2.src = 'images/press2.png';
var photo = new Image();
photo.src = 'images/photo.png';
var oscar = new Image();
oscar.src = 'images/oscar.png';
var jobs = new Image();
jobs.src = 'images/steve_jobs.png';
var martian = new Image();
martian.src = 'images/martian.png';

var vx = 0;
var v = 2280;
var v1 = 2580;
var v2 = v1+200,v3=3500,v4=4300;
var rand;

var leo = {
	srcX:"0",srcY:"0",y:"330",width:"0",height:"0",spriteWidth:"470",spriteHeight:"140",rows:"2",cols:"7"
};

var sWidth = 332; 
 
var rows1 = 1;
var cols1=3;
   
leo.width = leo.spriteWidth/leo.cols;
leo.height = leo.spriteHeight/leo.rows; 
 
var width1 = sWidth/cols1; 

var curFrame = 0,cFrame=0 
var frameCount = 7,frameC=3; 
 
var srcX1,srcX2,srcX3,srcX4; 
var srcY1,srcY2,srcY3,srcY4; 
  
var character = new Image(); 
character.src = "images/leo.png";
 

var ticksPerFrame=5,
      tickUpdate=0,
      tickRender=0;		

var gravity = 0.8 ;
var jump =false;
var speed = 5;
var vel=0;

function updateFrame()
{
 	        tickUpdate+=1;
            if(tickUpdate >ticksPerFrame) 
            {
              tickUpdate = 0;
              curFrame = curFrame % frameCount; curFrame++;
              cFrame = cFrame % frameC; cFrame++;

              leo.srcX = curFrame * leo.width; leo.srcY=0;
              srcX1 = cFrame * width1; srcY1=0;
              srcX2 = cFrame * (128/3); srcY2=0;
              srcX3 = cFrame * (186/3); srcY3=0;
              srcX4 = cFrame * (190/3); srcY4=0;
               if(curFrame == 5) 
               {
                   curFrame = -1;}
               if(cFrame == 3)
               {
    	           cFrame= -1;}
            }
}

function drawImage()
{   ctx.clearRect(0, 0, W, H);
	ctx.drawImage(hills,0,0,1280,300);
   
	ctx.drawImage(img, vx, 10);
	ctx.drawImage(img, img.width-Math.abs(vx), 10);
	rand = Math.floor(Math.random()*2 + 1 );
	
    ctx.drawImage(ice,v,340,70,90);
  
  	ctx.drawImage(press,v1,360,70,70);
	ctx.drawImage(press2,v2,360,70,70);
    ctx.drawImage(photo,srcX1,srcY1,width1,130,v3,180,90,170);
    ctx.drawImage(photo,srcX1,srcY1,width1,130,v4,320,90,170);
    
    ctx.drawImage(martian,srcX4,srcY4,190/3,64,50,370,70,100);
    ctx.drawImage(jobs,srcX3,srcY3,186/3,62,30,280,70,100);
    ctx.drawImage(oscar,srcX2,srcY2,128/3,73,1200,220,70,90);
    
       if(v<0)
       	{v=Math.random()*(1280-700)+700;
       	 v = 1580-v+1280;}

       if(v1<0)
       	{v1=Math.random()*(1280-700)+700;
       	 v1=1080-v1+1280;}
       
       if(v2<0)
       	{v2=v1+200;}
       
       if(v3<0)
       	{v3=Math.random()*(1280-700)+700;
       	  v3= 1380-v3+1280}

       if(v4<0)
       	{v4=Math.random()*(1280-700)+700;
       	  v4= 2380-v4+1280}
        
    ctx.drawImage(character,leo.srcX,leo.srcY,leo.width,leo.height,200,leo.y,90,120);

 document.onkeypress = function (e) 
 { 
	if (e.keyCode==32) 
	{ // Player holding space
		if(!jump&&leo.y==330) 
		{ 
   			jump = true;vel = -speed*2;
   			 leo.y = 220;
  		}
	}
 }

 if (200 < v + 10  && 200 + 30  > v &&
		leo.y < 400 + 70 && leo.y + 100 > 400 || 200 < v2 + 10  && 200 + 30  > v2 &&
		leo.y < 400 + 70 && leo.y + 100 > 400 || 200 < v1 + 10  && 200 + 30  > v1 &&
		leo.y < 400 + 70 && leo.y + 100 > 400 ) 
 {
		 alert("Game Over");location.reload();
 }

 if (leo.y <= 0) 
 {
		leo.y=0;
 }
	
	if(jump!=true)
	{
		vel+=gravity;
	    leo.y+=vel;
    }
 
 if (leo.y > 330) 
  {
	leo.y=330;
  }
    
    jump = false;
    v-=5;
    v1-=5;
    v2-=5;
    v3-=5;
    v4-=5;
	
 if (Math.abs(vx) > img.width) 
 {
		vx = 0;
	}
	
	vx -= 2;
}

function draw()
{
 updateFrame();
 drawImage();
 window.requestAnimationFrame(draw);
}

draw();
