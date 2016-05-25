var x,setd,y;

//Function for Start Button
function start()
{
    
    var h = $("#c1").val();        //hours
    var m = $("#c2").val();        //minutes
    
    if(mon>12||mon<=0)
     {alert("Invalid Month");
    }
    
    var s = $("#c3").val();       //seconds
    var d = $("#c4").val();       //date
    var mon = $("#c5").val();     //month
    var mon1 = mon - 1;
    var y = $("#c6").val();       //year
    setd = new Date(y,mon1,d,h,m,s,0);     //date
     
    x = setInterval(function(){
    time(setd);},1000);

    $("#d1").disabled=true;              // Buttons
                                         // are not
    for(var i = 1;i<7;i++)               // getting disabled
     {$("#c"+i).disabled = true;
     }
}
    
//Finding Time Difference in milliseconds
function time(a)
{
    var nt = new Date();         //Current Time
    var ms1 = Date.parse(a);     //Date a in milliseconds       
    var ms2 = Date.parse(nt);   
    var t = ms1-ms2;             //Difference
    
    $("#c1").val( Math.floor( (t/(1000*60*60)) % 24 ));    //Hours
    $("#c2").val( Math.floor( (t/1000/60) % 60 ));         //Minutes
    $("#c3").val( Math.floor( (t/1000) % 60 ));            //Seconds
    $("#c4").val( Math.floor( t/(1000*60*60*24) ));        //Days
    $("#c5").val( "Time" );
    $("#c6").val( "Left" );
}

//Function for Stop Button
function stop()
{
  clearInterval(x);         //Stops the timer
  clearInterval(y);
}
    
//Function for Reset Button
function reset()
{  //stop();
   clearInterval(x);
   clearInterval(y);
       
   for(var i = 1;i<7;i++)               //Buttons
    {$("#c"+i).disabled = false;        // are always
    }                                   //enabled
      
   $("#d1").disabled=false;     
       
   for(var i = 1;i<7;i++)
    {$("#c"+i).val() = 0;
    }
}

//Function for Refresh Button 
function refresh()
{  y = setInterval(function(){
   time(setd);},1000);
}
