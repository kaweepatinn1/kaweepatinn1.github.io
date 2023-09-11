var boxes = [];
var array = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
var numBoxes = 40;

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
    reorderTiles(true);
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
  if (num == 1){
    var tile = $("<div class='box fourbythree'/>").text(num)[add[0]](container)[0];
  } else if (num == 2){
    var tile = $("<div class='box twobythree'/>").text(num)[add[0]](container)[0];
  } else if (num == 3){
    var tile = $("<div class='box threebytwo'/>").text(num)[add[0]](container)[0];
  } else if (num == 4 || num == 5){
    var tile = $("<div class='box twobytwo'/>").text(num)[add[0]](container)[0];
  } else {
    var tile =  $("<div class='box onebyone'/>").text(num)[add[0]](container)[0];
  }
  indexX = 4;
  indexY = 0;
  offsetX = (indexX * 12.3) + 0.25;
  offsetY = (indexY * 12.3) + 0.25;
  $(tile).css({
    left: offsetX + "vw",
    top: offsetY + 0.25 + "vw",
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
