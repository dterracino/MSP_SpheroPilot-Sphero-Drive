"use strict";

var sphero = require("sphero");
var keypress = require("keypress");

// Port may change when we connect to it; be sure to check this before launching.
var orb = sphero("COM4");

var gamepads = new Gamepads(gamepadConfig);

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
    if (gamepads.gamepadsSupported) {
        gamepads.updateStatus = function () {
        gamepads.polling = true;
        gamepads.update();
        window.requestAnimationFrame(gamepads.updateStatus);
        };
    }
    
    keypress(process.stdin);
    process.stdin.on("keypress", handle);

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

var gamepadConfig = {
  axisThreshold: 0,
  indices: {
    'standard': {
      cursorX: 2,
      cursorY: 3,
      scrollX: 0,
      scrollY: 1,
      back: 9,
      forward: 8,
      vendor: 10,
      zoomIn: 5,
      zoomOut: 1
    },
    
    '79-6-Generic   USB  Joystick': {
      cursorX: null,
      cursorY: null,
      scrollX: 3,
      scrollY: 2,
      back: 6,
      forward: 7,
      vendor: null,
      zoomIn: 9,
      zoomOut: 8
    },
    keyEvents: {
      vendor: {
        detail: {
          charCode: 0,
          key: 'Escape',
          keyCode: 27
        }
      }
    }
  }
};

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