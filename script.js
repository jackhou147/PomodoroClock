$(document).ready(function(){
    var $minus = $(".minus");
    var $plus = $(".plus");
    var $clock = $("#clock");
    var $breakLength;
    var $sessionLength = $(".min").html();
    var $sec = $(".sec");
    var $min = $(".min");
    var $thisParent;
    var height = $clock.height();
    var $ani = $("#ani");
    
    //minus button functions
    $minus.click(function(){
        $(".sec").html("00");
        $ani.offset({
            top: $clock.offset().top + 300
        })
        
        var phase = $("#phase").html();
        
        $breakLength = $(".breakLength").html();
        $sessionLength = $(".sessionLength").html();
        $thisParent = $(this).parent();
        if($thisParent.is(".breakSettings")){ // if breakSetting is clicked
            if($breakLength-1 >= 1){ //check if over 1
                $(".breakLength").html($breakLength-1);
                if(phase == "Break!"){ // if it's break phase
                    $(".min").html($breakLength-1);
                }
            }
            
        }else if($thisParent.is(".sessionSettings")){ //if sessioinSetting is clicked
            if($sessionLength-1 >= 1){
                $(".sessionLength").html($sessionLength-1);
                if(phase == "Session"){
                    $(".min").html($sessionLength-1);
                }
            }
        }
        
    })
    
    
    
    //plus button functions
    $plus.click(function(){
        $(".sec").html("00");
        $ani.offset({
            top: $clock.offset().top + 300
        })
        
        var phase = $("#phase").html();
        $breakLength = Number($(".breakLength").html());
        $sessionLength = Number($(".sessionLength").html());
        $thisParent = $(this).parent();
        if($thisParent.is(".breakSettings")){ // if breakSetting is clicked
            $(".breakLength").html($breakLength+1);
            if(phase == "Break!"){ // if it's break phase
                    $(".min").html($breakLength+1);
                    
            }
            
        }else if($thisParent.is(".sessionSettings")){ //if sessioinSetting is clicked
            $(".sessionLength").html($sessionLength+1);
            if(phase == "Session"){
                    $(".min").html($sessionLength+1);
            }
        }
    })
    
    
    //$clock button functions
    var on = false;    //false at the start so interval isn't set
    var sessionInterval = setInterval(function(){
        
        if(on){
            //code for countdown
            //alert("ON!");
            var setLength = $(".sessionLength").html();
            var breakLength = $(".breakLength").html();
            var secLeft = $sec.html();
            var minLeft = $min.html();
            var sessionLengthSet = Number($(".sessionLength").html())*60;
            var breakLengthSet = Number($(".breakLength").html())*60;
            var sesAniPerSec = height/sessionLengthSet;
            var breAniPerSec = height/breakLengthSet;
            var phase = $("#phase").html();
            if(phase == "Session"){
                $ani.animate({
                    top: $ani.position().top - sesAniPerSec
                })
            }else{
                $ani.animate({
                    top: $ani.position().top - breAniPerSec
                })
            }
            
            if(secLeft == "00"){ //when 0 seconds left
                if(minLeft == "0"){ //when 0 minutes left
                    $ani.animate({
                            top: "300"
                        },500);
                    if(phase == "Session"){  // if session time up
                        $("#phase").html("Break!");
                        $min.html($(".breakLength").html());
                    }else{ //if break time up
                        $("#phase").html("Session");
                        $min.html($(".sessionLength").html());
                    }
                    
                }else{   //when not 0 minutes left
                    $min.html(Number(minLeft)-1);
                    $sec.html("5");
                }
            
            }else {  //when not 0 seconds left
                if(Number(secLeft-1)< 10){ //when single digit seconds put a 0 in front
                    var nextSecLeft = Number(secLeft - 1);
                    $sec.html("0"+nextSecLeft);
                }else{
                    $sec.html(secLeft-1);
                }
                
            }
            
            
        }
    },1000)
    $clock.click(function(){  //toggle interval
        on = !on;
    })
    
    //#ani not visible when position is away from clock
    var aniTop;
    var aniInterval = setInterval(function(){
        aniTop = $ani.position().top;
        if(aniTop>=300){
            $ani.css("visibility","hidden");
        }else{
            $ani.css("visibility","visible");
        }
    },1);
    
    
    
})
