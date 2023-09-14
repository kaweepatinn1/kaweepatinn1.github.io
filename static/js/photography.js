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

var lasttiles = [];

var lastimage = [];

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

const categories = [
  "main",
];

const subcategories = [
  "2by2",
  "2by3",
  "3by2",
  "4by3"
]

const imgsPerType = [
  10,
  1,
  2,
  1
]

const categoryImageCounts = [
  18, // 2by2
  6, // 2by3
  15, // 3by2
  4 // 4by3
]

var categoryImageCount;

var imgsLeft = [];

var globalInt = 0; // DO NOT TOUCH

function intToStringPadding(index, padding){
  var numberString = index.toString();
  var numberLength = numberString.length;
  var prepend = "";
  for (let i = 0; i < padding - numberLength; i++) {
    prepend = prepend + "0";
  }
  var indexString = prepend + index;
  return indexString
}

/* async function checkFilesInCategory(category, subcategory, index) {
  indexString = intToStringPadding(index, 4);
  var urlToCheck = "./static/assets/photography/" + category + "/webps/" + 
  subcategory + "/" + indexString + ".webp";
  
  try {
    var result = await doesFileExist(urlToCheck);
    // console.log("Got URL:", result);
    if (!result) {
      // console.log(index);
      globalInt = index;
      return index;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return 0;
  }
  
  // Continue with the rest of your code here...

  await checkFilesInCategory(category, subcategory, index + 1);
} */

async function checkAllCategories() {
  /*for (const category of categories) {
    subcategoryCounts = [];
    for (const subcategory of subcategories) {
      subcategoryCount = 0;
      subCategoryCount = await checkFilesInCategory(category, subcategory, 0);
      subcategoryCount = globalInt;
      // console.log(subcategoryCount);
      subcategoryCounts.push(subcategoryCount);
    }
    categoryImageCount = subcategoryCounts;

  }*/
  categoryImageCount = categoryImageCounts;
  // at this point i am just providing the imagecounts because
  // trying to get them takes too long.
}

function doesFileExist(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // console.log('File exists');
        resolve(true);
      } else {
        // console.log('File does not exist');
        resolve(false);
      }
    };
    xhr.onerror = function() {
      // Silently handle the error without logging it to the console
      resolve(false);
    };
    xhr.send();
  });
}

checkAllCategories()
  .then(function() {
    console.log("Please ignore above 404 errors.");
    // console.log(categoryImageCount);
    categoryImageCount.forEach((amount, index) =>{
      reInitImages(index);
    })
    // console.log(imgsLeft);
    // console.log(imgsLeft[1].length);
    init();

  $("#shuffle1").click(function () {
    heightFromTop = window.scrollY;
    reorderTiles(true);
    // init();
    // console.log(array);
    window.scrollTo(0, heightFromTop);
  });

  $("#reset1").click(function () {
    heightFromTop = window.scrollY;
    init();
    window.scrollTo(0, heightFromTop);
  });
  $('.loader').css('display','none');
  })
  .catch(function(error) {
    console.error("An error occurred:", error);
  }); 

  
function reInitImages(index){
  imgsLeft[index] = [];
  for (let i = 0; i < categoryImageCount[index]; i++){
    imgsLeft[index].push(i);
  }
}

function getRandomImageSource(num){
  var type;
  if (num == 1){
    // look in 4,3
    type = 3;
    if (imgsLeft[type].length < 1){
      reInitImages(type);
    }
  } else if (num == 3){
    // look in 3,2
    type = 2;
      if (num == 3){
      if (imgsLeft[type].length < 1){
        reInitImages(type);
      }
    }
  } else if (num == 2){
    // look in 2,3
    type = 1;
      if (imgsLeft[type].length < 2){
        reInitImages(type);
      }
      //check if two spaces left
  } else {
    // look in 2,2
    type = 0;
    if (num == 4){
      if (imgsLeft[type].length < 10){
        reInitImages(type);
      }
    }
  }

  var indexChosen = Math.floor(Math.random() * imgsLeft[type].length);
  while (lastimage[type] = indexChosen && num < 5){
    var indexChosen = Math.floor(Math.random() * imgsLeft[type].length);
  }
  var imgChosen = imgsLeft[type][indexChosen];
  // console.log(imgChosen);
  var indexString = intToStringPadding(imgChosen, 4);
  toReturn = "./static/assets/photography/" + "main" + "/jpgs/" + 
  subcategories[type] + "/" + indexString + ".jpg"
  lastimage[type] = indexChosen;
  imgsLeft[type].splice(indexChosen, 1);
  return toReturn;
}

var arrayX = array[0].length;
var arrayY = array.length;
var numBoxes = 13;

// Animation settings
var duration = 0.5; // length of time in secods for box to fade in
var delay = 0.03; // delay in secods before each new box appears

var tiles = [];
var ease = Back.easeOut.config(0.5);
var container = $("#container1")[0];
var container2 = $("#container2")[0];

function init() {
  tiles = [];
  boxes = [];
  array.forEach((secondDimension, indexY) => {
    secondDimension.forEach((item, indexX) => {
      array[indexY][indexX] = 0;
    })
  })
  // console.log(array);
  $("#container1").empty();
  createBoxes(numBoxes);
  // console.log(boxes);
  appendBoxes(boxes, true);
}

//
// REORDER TILES
// ====================================================================
function reorderTiles() {
  var total = tiles.length;
 //  console.log(tiles);
  var i = total;
  // console.log(i);

  oldtiles = tiles;
  appendBoxes(boxes);
  // console.log(oldtiles);
  // console.log(tiles);
  indexesList = [];
  for (var i = 0; i < total; i++){
    indexesList.push(i);
  }
  tilesLeft = shuffle(indexesList);
  for (var i = 0; i < total; i++) {
    k = indexesList[i];
    var tile = tiles[k];
    var tile2 = lasttiles[k];
    // console.log(oldtiles);
    var oldtile = oldtiles[k];
    // console.log(tile);
    // console.log(oldtile);

    var lastX = oldtile.x;
    var lastY = oldtile.y;
    // tile.x = tile.element.offsetLeft;
    // tile.y = tile.element.offsetTop;
    // console.log(tile.transform.x);
    // console.log(lastX);
    // console.log(tile.x);
    var dx = lastX - tile.x; //tile.transform.x + lastX - tile.x
    var dy = lastY - tile.y; //tile.transform.y + lastY - tile.y

    //console.log(Math.sqrt(numBoxes));
    //console.log(-Math.sqrt((numBoxes-i)/10));
    //console.log(Math.sqrt(numBoxes/10)-Math.sqrt((numBoxes-i)/10));
    // console.log(tile);
    TweenLite.fromTo(
      tile.element,
      Math.sqrt((numBoxes*1.6-i)/10) * (numBoxes + i) / numBoxes,
      { x: dx + "vw", y: dy + "vw", scale: 0.99},
      {
        x: 0,
        y: 0,
        scale: 1,
        ease: "power1.inOut",
        delay: Math.sqrt(numBoxes/10)-Math.sqrt((numBoxes-i)/10) ,
        immediateRender: true
      }
    );
    TweenLite.fromTo(
      tile2.element,
      Math.sqrt((numBoxes*1.6-i)/10) * (numBoxes + i) / numBoxes,
      { x: 0 + "vw", y: 0 + "vw"},
      {
        x: 0 - dx + "vw",
        y: 0 - dy + "vw",
        opacity: 0,
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
function createTile(num) {
  var add = ["appendTo", "push"];
  // use boxes to produce a box of right class size
  var source = getRandomImageSource(num);
  var tile = $("<div class='box'/>")
  .append($("<img>").attr("src", source)
  .css({ width: "100%", height: "100%" })
  .text(num)) // Add the image element inside the div
  .appendTo(container);
  
  width = sizes[num-1][0];
  height = sizes[num-1][1];
  // console.log("Placing block with size " + width + " and height " + height);

  placed = false;
  tryPosition = [0,0];

  var empty = unusedBoxes();
  var emptyTotalLength = empty.length;
  var tries = 0;
  // console.log("TILE NUMBER " + num)
  // console.log("New placement attempt with array size remaining " + emptyTotalLength);
  while (!placed && (tries < emptyTotalLength)){
    canPlace = true;
    index = Math.floor(Math.random() * empty.length);
    tryPosition = empty[index];
    if ((tryPosition[0] + width > arrayX || tryPosition[1] + height > arrayY)){ 
    // check overflow
    canPlace = false;
    } 

    // check restrictions
    
    else if (num == 1 && tryPosition[1] == 1){ // 4,3
      canPlace = false;
    } 
    
    else if (num == 2){ // 2,3
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
    
    else if (num == 3){ // 3,2
      array.forEach((arrays, indexY) => {
        arrays.forEach((element, indexX) =>{
          if (element == 43){
            coords43 = [indexX, indexY];
          } else if (element == 23){
            coords23 = [indexX, indexY];
          }
        });
      });
      condition1 = (Math.abs(coords43[1] - coords23[1]) == 2); // if 23 Y and 43 Y are +-2
      condition2 = (coords43[0] == 1 || coords43[0] == 3); // of 43 X is 1 or 3
      if (condition1 && condition2){
        if (coords23[0] == 5){
          if (coords23[1] == 0){
            if (tryPosition[0] == 1 && tryPosition[1] == 0){
              canPlace = false;
            }
          } else if (coords23[1] == 2){
            if (tryPosition[0] == 1 && tryPosition[1] == 3){
              canPlace = false;
            }
          }
        } else if (coords23[0] == 1){
          if (coords23[1] == 0){
            if (tryPosition[0] == 4 && tryPosition[1] == 0){
              canPlace = false;
            }
          } else if (coords23[1] == 2){
            if (tryPosition[0] == 4 && tryPosition[1] == 3){
              canPlace = false;
            }
          }
        }
      }
    } 

    else if (num == 4){ // 2,2
      array.forEach((arrays, indexY) => {
        arrays.forEach((element, indexX) =>{
          if (element == 43){
            coords43 = [indexX, indexY];
          } else if (element == 23){
            coords23 = [indexX, indexY];
          } else if (element == 32){
            coords32 = [indexX, indexY];
          }
        });
      });
      condition1 = (Math.abs(coords43[0] - coords23[0]) == 5); 
      condition2 = (Math.abs(coords43[0] - coords23[0]) == 3); 
      // 43 will never be at x1
      if (condition1 || condition2){
        if (coords43[1] == coords23[1]){
          if (coords32[1] == 4){
            canPlace = !(tryPosition[0] == 1);
          } else if (coords32[1] == 1){
            canPlace = !(tryPosition[0] == 5);
          }
        } else{
          if (coords32[0] == 1 && coords23[0] == 5){
            canPlace = !(tryPosition[0] == 5);
          } else if (coords32[0] == 4 && coords23[0] == 1){
            canPlace = !(tryPosition[0] == 1);
          }
        }
      }
    }

    // checks if all the needed positions are empty
    if (canPlace){
      // console.log(tryPosition);
      for (let x = tryPosition[0]; x < tryPosition[0] + width; x++){
        for (let y = tryPosition[1]; y < tryPosition[1] + height; y++){
          // console.log(y,x);
          // console.log(array[y][x]);
          if (array[y][x] != 0){
            canPlace = false;
          }
        }
      }
    }
    
    

    if (canPlace){
      placed = true;
      // console.log("Successful at " + tryPosition);
      for (let x = tryPosition[0]; x < tryPosition[0] + width; x++){
        for (let y = tryPosition[1]; y < tryPosition[1] + height; y++){
          array[y][x] = 1;
        }
      }
      array[tryPosition[1]][tryPosition[0]] = parseInt(width.toString() + height.toString());
      // console.log(array);
    } else{
      empty.splice(index, 1);
      // console.log("Failed at " + tryPosition)
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
  unitsize = 12.355;
  offsetX = (indexX * unitsize) + 0.25;
  // console.log(offsetX);
  offsetY = (indexY * unitsize) + 0.25;
  // console.log( (unitsize * width) - 0.5 + "vw");
  $(tile).css({
    width: (unitsize * width) - 0.5 + "vw",
    height: (unitsize * height) - 0.5 + "vw",
    left: offsetX + "vw",
    top: offsetY + "vw",
  });
  TweenLite.set(tile, { x: "+=0" });

  tiles[add[1]]({
    element: tile,
    num: num,
    x: offsetX,
    y: offsetY,
    valid: canPlace
  });
  // console.log(tiles[num-1].x);
  // console.log(tiles[num-1]);
  return tile;
}

function unusedBoxes(){
  // console.log(array);
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

function appendBoxes(collection, isNew) {
  var error = true;
  while (error){
    error = false;
    var tl = new TimelineLite();
    array.forEach((secondDimension, indexY) => {
      secondDimension.forEach((item, indexX) => {
        array[indexY][indexX] = 0;
      })
    })
    // console.log(array);
    $("#container2").empty();
    lasttiles = tiles;
    console.log(lasttiles);
    console.log($("#container1").children().appendTo(container2));
    $("#container1").empty();
    tiles = [];
    collection.forEach(function (num) {
      var tile = createTile(num);
      
      if (isNew){
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
      }
    });
    tiles.forEach((tileItem) => {
      if (!tileItem.valid){
        error = true;
        // added error checking to foolproof code
      }
    })
  }
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
