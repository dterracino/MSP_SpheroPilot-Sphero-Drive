"use strict";

var sphero = require("sphero");
var keypress = require("keypress");

// Port may change when we connect to it; be sure to check this before launching.
var orb = sphero("COM4");
var color = "darkred";

orb.connect(listen);

function handle(ch, key) {
    var roll = orb.roll.bind(orb, 60);

    if (key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit();
    }

    switch (key.name) {
        case "a":
            console.log("a key pressed");
            
            if (colorIndex > 0)
            {
                console.log("Subtracing one from colorIndex");
                --colorIndex;
            }
                
            else
                colorIndex = 0;
                
            break;
      
        case "d":
            console.log("d key pressed");
            
            if (colorIndex < 22)
            {
                console.log("Adding one to colorIndex");
                ++colorIndex;
            }
                
            else
                colorIndex = 22;
                
            break;
      
        case "left":
            roll(270);
            break;
        
        case "right":
            roll(90);
            break;
        
        case "space":
            orb.roll.bind(orb, 0, 0);
    }
    
    color = colorList[colorIndex];
    console.log("Color changed to " + color);
}

function listen() {
    keypress(process.stdin);
    orb.color("aquamarine");
    process.stdin.on("keypress", handle);

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

var colorIndex = 0;
var colorList = [
  "antiquewhite"         ,
  "aqua"                 ,
  "aquamarine"           ,
  "azure"                ,
  "beige"                ,
  "bisque"               ,
  "blanchedalmond"       ,
  "blue"                 ,
  "blueviolet"           ,
  "brown"                ,
  "burlywood"            ,
  "cadetblue"            ,
  "chartreuse"           ,
  "chocolate"            ,
  "silver"               ,
  "skyblue"              ,
  "slateblue"            ,
  "slategray"            ,
  "snow"                 ,
  "springgreen"          ,
  "steelblue"            ,
  "tan"                  ,
  "teal"                 ,
  "thistle"              ,
  "tomato"               ,
  "turquoise"            ,
  "violet"               ,
  "wheat"                ,
  "white"                ,
  "whitesmoke"           ,
  "yellow"               ,
  "yellowgreen"          ,
];