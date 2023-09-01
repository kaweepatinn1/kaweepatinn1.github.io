var mouseOverApple = false;
var mouseWasGoneApple = true;

$(document).ready(function(){
    $(document).mousemove(function(){
         if($("#appleimage:hover").length != 0){
            mouseOverApple = true;
        } else{
            mouseOverApple = false;
        }
        if($("#OYYGCimage:hover").length != 0){
            mouseOverOYYGC = true;
        } else{
            mouseOverOYYGC = false;
            revertOYYGC();
        }
    });
});

function regifApple(){
    if (mouseWasGoneApple == true){
    let content = document.getElementById("appleimage");
    content.src = "./static/assets/applead.gif";
    mouseWasGoneApple = false;
    }
}

function revertApple(){
    if (mouseOverApple == false){
        let content = document.getElementById("appleimage");
        content.src = "./static/assets/applead.webp";
        mouseWasGoneApple = true;
    }
}

var mouseOverOYYGC = false;
var mouseWasGoneOYYGC = true;
var toActivateOYYGC = false;

function regifOYYGC(){
    if (mouseWasGoneOYYGC == true){
    let content = document.getElementById("OYYGCimage");
    console.log(content);
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