var wasHovering = false;
var hovering = "";
var wasHoveringNav = false;
var hoveringNav = "";

$(document).mouseover(function(item){
    var ID = $(item.target).attr('id');

    if (wasHoveringNav){
        if (ID == hoveringNav){
            //does nothing if the item last hovered is still hovered
        } else{
            var toChange = "#\\" + hoveringNav + "Child";
            $(toChange).css('transform', 'translateX(0vw)');
            wasHoveringNav = false;
        }
    }

    if (wasHovering){
        if (ID == hovering){
            //does nothing if the item last hovered is still hovered
        } else{
            var TrueID = hovering.substring(hovering.indexOf("?") + 2);
            var totalplus1 = 1;
            var stop = false;
            while(stop == false){
                var check = document.getElementById("?" + totalplus1 + TrueID)
                if (check != undefined){
                    totalplus1++
                } else{
                    stop = true;
                }
            }
            for(let i = 1; i < totalplus1; i++){
                var TrueID = hovering.substring(hovering.indexOf("?") + 2);
                var toChange = "#\\?" + i + TrueID;
                $(toChange).css('transform', 'translateX(0vw)');
                $(toChange).css('letter-spacing', '0vw');
                $(toChange).css('opacity', '1');
                wasHovering = false;
            }
        }
    }

    if (ID != undefined){
        var type = ID.substr(0, 1);
        if (type == "?"){
            var TrueID = ID.substring(ID.indexOf("?") + 2);
            //Deletes everything including the number
            var index = parseInt(ID.substr(1, 2));
            wasHovering = true;
            hovering = ID;
            var totalplus1 = 1;
            var stop = false;
            while(stop == false){ //counts the amount of elements with the tag and ID
                var check = document.getElementById("?" + totalplus1 + TrueID)
                if (check != undefined){
                    totalplus1++
                } else{
                    stop = true;
                }
            }
            for(let i = 1; i < totalplus1; i++){ // iterates the amount of elements there are
                var toChange = "#\\?" + i + TrueID;
                var distance = Math.abs(i - index);
                var transformDistance = (0.2 * totalplus1) - ((distance + 1) * 0.2);
                var letterSpaceIntensity = 0.05;
                $(toChange).css('transform', 'translateX('+ transformDistance +'vw)');
                $(toChange).css('opacity', '1');
                if (distance == 0){
                    $(toChange).css('opacity', '0.5');
                    if (i == 1){
                        $(toChange).css('letter-spacing', letterSpaceIntensity + 'vw');
                    }
                    if (i == 2){
                        $(toChange).css('letter-spacing', letterSpaceIntensity / 2 + 'vw');
                    }
                    
                }
            }
        } else{
            var TrueID = "null";
        }
        //Above is for the hover move right animations on descriptions
        //Below is for hover move up animations on navbar
        if (type == "!"){
            wasHoveringNav = true;
            hoveringNav = ID;
            var TrueIDNav = ID.substring(ID.indexOf("!") + 1);
            var toChange = "#\\" + ID + "Child";
            $(toChange).css('transform', 'translateY(-0.5vw)');
        }
    }
});

function ThickUp(){
	$("#thick").css({ "transform": "translateY(-1.5vw)"});
}

function ThickDown(){
	$("#thick").css({ "transform": "translateY(0vw)"});
}