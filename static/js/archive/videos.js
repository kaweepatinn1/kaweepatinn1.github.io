// Archived javascript document, no longer needed.
// Now part of animations.js as hoveringVideo using the $ id tag.

$(document).ready(function(){
    $(document).mousemove(function(){
         if($("#Appleimage:hover").length != 0){
            mouseOverApple = true;
        } else{
            mouseOverApple = false;
            revertApple();
        }

        if($("#OYYGCimage:hover").length != 0){
            mouseOverOYYGC = true;
        } else{
            mouseOverOYYGC = false;
            revertOYYGC();
        }

        if($("#LiveHKimage:hover").length != 0){
            mouseOverLiveHK = true;
        } else{
            mouseOverLiveHK = false;
            revertLiveHK();
        }
    });
});

var mouseOverApple = false;
var mouseWasGoneApple = true;

function regifApple(){
    if (mouseWasGoneApple == true){
    let content = document.getElementById("Appleimage");
    content.play();
    mouseWasGoneApple = false;
    }
}

function revertApple(){
    let content = document.getElementById("Appleimage");
    content.pause();
    content.currentTime = 0;
    mouseWasGoneApple = true;
}

var mouseOverOYYGC = false;
var mouseWasGoneOYYGC = true;

function regifOYYGC(){
    if (mouseWasGoneOYYGC == true){
    let content = document.getElementById("OYYGCimage");
    content.play();
    mouseWasGoneOYYGC = false;
    }
}

function revertOYYGC(){
    let content = document.getElementById("OYYGCimage");
    content.pause();
    content.currentTime = 0;
    mouseWasGoneOYYGC = true;
}

var mouseOverLiveHK = false;
var mouseWasGoneLiveHK = true;

function regifLiveHK(){
    if (mouseWasGoneLiveHK == true){
    let content = document.getElementById("LiveHKimage");
    content.play();
    mouseWasGoneLiveHK = false;
    }
}

function revertLiveHK(){
    let content = document.getElementById("LiveHKimage");
    content.pause();
    content.currentTime = 0;
    mouseWasGoneLiveHK = true;
}