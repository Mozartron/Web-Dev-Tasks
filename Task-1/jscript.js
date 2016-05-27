var timeLoop,setDate,repLoop,timeDiff,nowTime;

//Function for Start Button
function start()
{
    
    var hours = $("#c1").val();        //hours
    var minutes = $("#c2").val();        //minutes
    var sec = $("#c3").val();       //seconds
    var day = $("#c4").val();       //date
    var mon = $("#c5").val();     //month
    var mon1 = mon - 1;
    var year = $("#c6").val();       //year
    setDate = new Date(year,mon1,day,hours,minutes,sec,0);     //date
    nowTime = new Date(); 
    timeLoop = setInterval(function(){var t1 = new Date();
      time(setDate,t1);
      if(timeDiff<=0)
      {clearInterval(timeLoop);
       alert("Times Up!")
       }},1000);

     

    $("#d1").disabled = true;              // Buttons          $("#d1").attr('disabled',true);
                                           // are not
    for(var i = 1;i<7;i++)               // getting disabled  
     {$("#c"+i).disabled = true;         //                    $("#c"+i).attr('disabled',true);
     }
}
    
//Finding Time Difference in milliseconds
function time(a,t)
{
    var nTime = t;         //Current Time
    var ms1 = Date.parse(a);     //Date a in milliseconds       
    var ms2 = Date.parse(nTime);   
    timeDiff = ms1-ms2;             //Difference
    


    $("#c1").val( Math.floor( (timeDiff/(1000*60*60)) % 24 ));    //Hours
    $("#c2").val( Math.floor( (timeDiff/1000/60) % 60 ));         //Minutes
    $("#c3").val( Math.floor( (timeDiff/1000) % 60 ));            //Seconds
    $("#c4").val( Math.floor( timeDiff/(1000*60*60*24) ));        //Days
    $("#c5").val( "Time" );
    $("#c6").val( "Left" );
}

//Function for Stop Button
function stop()
{
  clearInterval(timeLoop);         //Stops the timer
  clearInterval(repLoop);
}
    
//Function for Reset Button
function reset()
{  //stop();
   clearInterval(timeLoop);
   clearInterval(repLoop);
       
   for(var i = 1;i<7;i++)               //Buttons
    {$("#c"+i).disabled = false;        // are always      $("#c"+i).attr('disabled',false);
    }                                   //enabled
      
   $("#d1").disabled=false;             //                 $("#d1").attr('disabled',false);
       
   for(var i = 1;i<7;i++)
    {$("#c"+i).val() = 0;
    }
}

//Function for Refresh Button 
function refresh()
{  stop();
   var g = nowTime;
   repLoop = setInterval(function(){
   time(setDate,g);
   g = new Date(Date.parse(g)+1000);
   if(timeDiff<=0)
    {clearInterval(repLoop);
     alert("Times Up!")
       }
     },1000);
}
