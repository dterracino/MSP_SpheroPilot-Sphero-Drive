"use strict";

var sphero = require("sphero");
var keypress = require("keypress");

// Port may change when we connect to it; be sure to check this before launching.
var orb = sphero("COM4");

orb.connect(listen);

function handle(ch, key) {
    var roll = orb.roll.bind(orb, 60);

    if (key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit();
    }

    switch (key.name) {
        
        // Our "a" and "d" key will cycle through the colors for now.
        // Going over the max number of colors will return you to the
        // 0th color while going below the minimum number will bring
        // you to the 31st color (thus a continuous cycle).
        case "a":
            (colorIndex > 0) ? --colorIndex : colorIndex = 30;
            break;
      
        case "d":
            (colorIndex < 31) ? ++colorIndex : colorIndex = 0;
            break;
            
        case "up":
            roll(0);
            break;
            
        case "right":
            roll(90);
            break;
            
        case "down":
            roll(180);
            break;
      
        case "left":
            roll(270);
            break;
        
        case "space":
            orb.roll.bind(orb, 0, 0);
    }
    
    // Log our current color to the console and change to that color.
    console.log("Current color is " + colorList[colorIndex]);
    orb.color(colorList[colorIndex]);
}

function listen() {
    keypress(process.stdin);
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