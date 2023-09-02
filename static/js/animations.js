var wasHovering = false;
var hovering = "";

$(document).mouseover(function(item){
    var ID = $(item.target).attr('id');
    if (ID != undefined){
        var type = ID.substr(0, 1);
        if (type == "?"){
            var TrueID = ID.substring(ID.indexOf(ID.substr(1, 2)) + 1)
            var index = parseInt(ID.substr(1, 2));
            wasHovering = true;
            hovering = TrueID;
            for(let i = 1; i < 4; i++){ // assumes you have 3 items, increase i max for more
                var toChange = "#\\?" + i + TrueID;
                var distance = Math.abs(i - index);
                var transformDistance = 1.2 - (distance * 0.4);
                $(toChange).css('transform', 'translateX('+ transformDistance +'vw)');
                $(toChange).css('opacity', '1');
                if (distance == 0){
                    $(toChange).css('opacity', '0.5');
                }
            }
        } else{
            TrueID = "null";
        }
    }
    if (wasHovering == true){
        if (TrueID == hovering){
            //donothing if the item hovered is still hovered
        } else{
            for(let i = 1; i < 4; i++){
                var toChange = "#\\?" + i + hovering;
                $(toChange).css('transform', 'translateX(0vw)');
                $(toChange).css('opacity', '1');
                wasHovering = false;
            }
        }
    }
});