var ctx = document.createElement('canvas').getContext('2d');
var img = new Image;


/* Discontinued
img.onload = function(){
  // Make the canvas the same size as the image
  var w = ctx.canvas.width  = img.width;
  var h = ctx.canvas.height = img.height;

  // Fill it with (fully-opaque) white
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h);

  // Draw the image in a special blend mode that forces its opacity on the result
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(img,0,0);
  console.log(ctx.canvas.toDataURL());
  // Set an image on the page to use this canvas data
  // The data URI can also be copy/pasted and used inline in HTML or CSS
  document.getElementById("result").src=ctx.canvas.toDataURL();
}

recolorImage(); // TODO

// Load the image to use _after_ setting the onload handler
img.src = "static/assets/list.png";
*/