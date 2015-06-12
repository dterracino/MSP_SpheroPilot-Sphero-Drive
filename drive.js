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
        case "up":
            roll(0);
            break;
      
        case "down":
            roll(180);
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
}

function listen() {
    keypress(process.stdin);
    process.stdin.on("keypress", handle);

    process.stdin.setRawMode(true);
    process.stdin.resume();
}