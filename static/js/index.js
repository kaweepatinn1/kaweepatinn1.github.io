window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function changeMode() {
  let element = document.body;
  let button = document.getElementById("!0CHover");
  let content = document.getElementById("!0CHoverChild");
  if (content && content.src.includes("lightswitchlight.png")) {
	// dark mode --> light mode
    content.src = "./static/assets/lightswitchdark.png";
    element.className = "light-mode";
    button.className = "lightOn";
	let linksPurp = Array.from(document.getElementsByClassName("purplink"));
	linksPurp.forEach((link) => {
		link.classList.add("darkpurplink");
		link.classList.remove("purplink");
	})
	let linksBlue = Array.from(document.getElementsByClassName("bluelink"));
	linksBlue.forEach((link) => {
		link.classList.add("darkbluelink");
		link.classList.remove("bluelink");
	})
	let linksDarkElement = Array.from(document.getElementsByClassName("dark-mode-element"));
	linksDarkElement.forEach((link) => {
		link.classList.add("light-mode-element");
		link.classList.remove("dark-mode-element");
	})
  } else { // light mode --> dark mode
    content.src = "./static/assets/lightswitchlight.png";
    element.className = "dark-mode";
    button.className = "lightOff";
	let linksDarkPurp = Array.from(document.getElementsByClassName("darkpurplink"));
	linksDarkPurp.forEach((link) => {
		link.classList.add("purplink");
		link.classList.remove("darkpurplink");
	})
	let linksDarkBlue = Array.from(document.getElementsByClassName("darkbluelink"));
	console.log(linksDarkBlue);
	linksDarkBlue.forEach((link) => {
		link.classList.add("bluelink");
		link.classList.remove("darkbluelink");
	})
	let linksDarkElement = Array.from(document.getElementsByClassName("light-mode-element"));
	linksDarkElement.forEach((link) => {
		link.classList.add("dark-mode-element");
		link.classList.remove("light-mode-element");
	})
  }
}

function setLogo(){
	// Calculate the distance between the element and the top of the page
	var distanceFromTop = sticky - window.scrollY;
	// console.log($("#mainlogo").offset().top); // some reason this jumps up and down when using a value of higher than -0.03 below.
	// console.log($(window).scrollTop());
	// console.log(distanceFromTop);
    // Calculate the translateY value based on the distance from the top
	var offsetFromPosition = Math.min((-0.01 * distanceFromTop), 0);
	var translateYValue = offsetFromPosition - extramove;
	$("#mainLogo").css({ "transform": "translateY(" + translateYValue + "vw)" });
}

$(window).scroll(function() {
	setLogo();
});

var extramove

$(document).ready(function(){
    $(document).mousemove(function(){
         if($("#mainLogo:hover").length != 0){
			extramove = 3;
			setLogo();
        } else{
            extramove = 0;
			setLogo();
        }
    });
});

var sticky
var navbar
var video

document.addEventListener("DOMContentLoaded", function() {
	navbar = document.getElementById("navbar");
	video = document.getElementById("topVideo");
	logo = document.getElementById("mainLogo");
	function seekToFrame(frameNumber, frameRate) {
		var timeInSeconds = frameNumber / frameRate;
		video.currentTime = timeInSeconds;
	}
	function stickyGiver() {
		var content = Array.from(document.getElementsByClassName("content"));
		var frameToPlay = Math.round((window.scrollY/sticky)*225);
		var currentFrame = Math.min(frameToPlay,225);
		seekToFrame(currentFrame, 60);
		if (window.scrollY >= sticky) {
			navbar.classList.add("sticky");
			content.forEach((el) => {
				el.classList.add("paddingtop");
			})
		} else {
			navbar.classList.remove("sticky");
			content.forEach((el) => {
				el.classList.remove("paddingtop");
			})
    }
  }
	window.addEventListener("scroll", function() {
		stickyGiver();
		video.pause();
	});
});



window.onload = function() {
  // Code to be executed after the entire page, including CSS, has been loaded
	window.scrollTo(0, 0);
	sticky = navbar.offsetTop;
  // Perform other initialization tasks, set up event handlers, etc.
};