var boxes = [];
var emptyarray = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
var array = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
var sizes = [
  [4, 3],
  [2, 3],
  [3, 2],
  [2, 2],
  [2, 2],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
]
var arrayX = array[0].length;
var arrayY = array.length;
var numBoxes = 13;

// Animation settings
var duration = 0.5; // length of time in secods for box to fade in
var delay = 0.03; // delay in secods before each new box appears

var tiles = [];
var ease = Back.easeOut.config(0.5);
var container = $("#container1")[0];

$(document).ready(function () {
  init();

  $("#shuffle1").click(function () {
    heightFromTop = window.scrollY;
    // reorderTiles(true);
    // init();
    console.log(array);
    window.scrollTo(0, heightFromTop);
  });

  $("#reorder1").click(function () {
    heightFromTop = window.scrollY;
    reorderTiles();
    window.scrollTo(0, heightFromTop);
  });

  $("#reset1").click(function () {
    heightFromTop = window.scrollY;
    init();
    window.scrollTo(0, heightFromTop);
  });
});

function init() {
  tiles = [];
  boxes = [];
  console.log(array);
  array.forEach((secondDimension, indexY) => {
    secondDimension.forEach((item, indexX) => {
      array[indexY][indexX] = 0;
    })
  })
  console.log(array);
  $("#container1").empty();
  createBoxes(numBoxes);
  console.log(boxes);
  appendBoxes(boxes);
}

//
// REORDER TILES
// ====================================================================
function reorderTiles(shuffled) {
  var total = tiles.length;

  var i = total;
  console.log(i);
  while (i--) {
    var tile = tiles[i];

    tile.x = tile.element.offsetLeft;
    tile.y = tile.element.offsetTop;

    container.removeChild(tile.element);
  }

  shuffled ? shuffle(tiles) : tiles.sort(sortOrder);

  for (var i = 0; i < total; i++) {
    var tile = tiles[i];
    //console.log(tile);

    var lastX = tile.x;
    var lastY = tile.y;

    container.appendChild(tile.element);

    tile.x = tile.element.offsetLeft;
    tile.y = tile.element.offsetTop;
    //console.log(tile.transform.x);
    //console.log(lastX);
    //console.log(tile.x);
    var dx = lastX - tile.x; //tile.transform.x + lastX - tile.x
    var dy = lastY - tile.y; //tile.transform.y + lastY - tile.y

    //console.log(Math.sqrt(numBoxes));
    //console.log(-Math.sqrt((numBoxes-i)/10));
    //console.log(Math.sqrt(numBoxes/10)-Math.sqrt((numBoxes-i)/10));

    TweenLite.fromTo(
      tile.element,
      Math.sqrt((numBoxes-i)/10) * (numBoxes + i) / numBoxes,
      { x: dx, y: dy },
      {
        x: 0,
        y: 0,
        ease: "power1.inOut",
        delay: Math.sqrt(numBoxes/10)-Math.sqrt((numBoxes-i)/10) ,
        immediateRender: true
      }
    );
  }
}

//
// CREATE TILE
// ====================================================================
function createTile(num, prepend) {
  var add = prepend ? ["prependTo", "unshift"] : ["appendTo", "push"];
  // use boxes to produce a box of right class size
  var tile = $("<div class='box'/>").text(num)[add[0]](container)[0];
  width = sizes[num-1][0];
  height = sizes[num-1][1];
  console.log("Placing block with size " + width + " and height " + height);

  placed = false;
  tryPosition = [0,0];

  var empty = unusedBoxes();
  var emptyTotalLength = empty.length;
  var tries = 0;
  console.log("TILE NUMBER " + num)
  console.log("New placement attempt with array size remaining " + emptyTotalLength);
  while (!placed && (tries < emptyTotalLength)){
    canPlace = true;
    index = Math.floor(Math.random() * empty.length);
    tryPosition = empty[index];
    if ((tryPosition[0] + width > arrayX || tryPosition[1] + height > arrayY)){ 
    // check overflow
    canPlace = false;
    } 
    // check restrictions

    // SPLIT RESTRICTIONS INTO NUM. ADD ALL CONDITIONS INTO MAIN, OR ELSE ELSE IF WILL TRIGGER.
    else if (num == 1 && tryPosition[1] == 1){
      canPlace = false;
    } 

    else if (num == 2){
      if (tryPosition[1] == 1 && (tryPosition[0] == 1 || tryPosition[0] == 5)){
        canPlace = false;
      } else if (tryPosition[1] == 1){
        array.forEach((arrays) => {
          if (arrays[1] == 43 || arrays[5] == 43){
            canPlace = false;
          }
        });
        canPlace = false;
      }
    }
      
    else if (num == 3){
      if (true){}//////////////////////////////////////////////////////////WORK HERE ON NEXT CONDITION
    } 

    // checks if all the needed positions are empty
    if (canPlace){
      console.log(tryPosition);
      for (let x = tryPosition[0]; x < tryPosition[0] + width; x++){
        for (let y = tryPosition[1]; y < tryPosition[1] + height; y++){
          console.log(y,x);
          console.log(array[y][x]);
          if (array[y][x] != 0){
            canPlace = false;
          }
        }
      }
    }
    
    if (canPlace){
      placed = true;
      console.log("Successful at " + tryPosition);
      for (let x = tryPosition[0]; x < tryPosition[0] + width; x++){
        for (let y = tryPosition[1]; y < tryPosition[1] + height; y++){
          array[y][x] = 1;
        }
      }
      array[tryPosition[1]][tryPosition[0]] = parseInt(width.toString() + height.toString());
      console.log(array);
    } else{
      empty.splice(index, 1);
      console.log("Failed at " + tryPosition)
      tries++;
    } 
  }
  /*
  console.log(!placed && (tries < empty.length));
  console.log(placed);
  console.log(tries < empty.length);
  console.log(tries);
  console.log(empty.length);
  console.log(empty);
  */
  if (!(tries < arrayX * arrayY)){
    console.log("ERROR: TRIED MORE THAN ARRAY AREA")
  }
  indexX = tryPosition[0];
  indexY = tryPosition[1];
  offsetX = (indexX * 12.3) + 0.25;
  offsetY = (indexY * 12.3) + 0.25;
  console.log( (11.3 * width) + 0.5 + "vw");
  $(tile).css({
    width: (12.3 * width) - 0.5 + "vw",
    height: (12.3 * height) - 0.5 + "vw",
    left: offsetX + "vw",
    top: offsetY + "vw",
  });
  TweenLite.set(tile, { x: "+=0" });

  tiles[add[1]]({
    element: tile,
    num: num,
    x: offsetX,
    y: offsetY
  });

  return tile;
}

function unusedBoxes(){
  console.log(array);
  var emptyBoxes = [];
  array.forEach((secondDimension, indexY) => {
    secondDimension.forEach((item, indexX) => {
      if (item == 0){
        emptyBoxes.push([indexX,indexY]);
      }
    });
  });
  return emptyBoxes;
}

// 0 --> empty
// 1 --> not empty

//
// SORT
// ====================================================================
function sortOrder(a, b) {
  return a.num - b.num;
}

function createBoxes(num) {
  for (var i = 0; i < num; i += 1) {
    boxes.push(i + 1);
  }
}

function addBoxes(num) {
  var numBoxes = boxes.length;
  var newBoxes = [];

  for (var i = 0; i < num; i += 1) {
    newBoxes.push(numBoxes + i + 1);
    boxes.push(numBoxes + i + 1);
  }

  return newBoxes;
}

function appendBoxes(collection, isShuffle) {
  var tl = new TimelineLite();
  array = emptyarray;
  collection.forEach(function (num, i) {
    var tile = createTile(num);

    tl.from(
      tile,
      duration,
      {
        opacity: 0,
        scale: 0,
        ease: Sine.easeIn
      },
      "-=" + (duration - delay)
    );
  });
}

function prependBoxes(collection) {
  var tl = new TimelineLite();
  array = emptyarray;
  collection.reverse().forEach(function (num, index) {
    var tile = createTile(num, true);

    tl.from(
      tile,
      duration,
      {
        opacity: 0,
        scale: 0,
        ease: Sine.easeIn,
        delay: -(delay * (index + 1))
      },
      "-=" + (duration - delay)
    );
  });
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
