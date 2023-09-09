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
	let borderDarkElement = Array.from(document.getElementsByClassName("bordered"));
	borderDarkElement.forEach((border) => {
		border.classList.add("bordered-black");
		border.classList.remove("bordered");
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
	linksDarkBlue.forEach((link) => {
		link.classList.add("bluelink");
		link.classList.remove("darkbluelink");
	})
	let linksDarkElement = Array.from(document.getElementsByClassName("light-mode-element"));
	linksDarkElement.forEach((link) => {
		link.classList.add("dark-mode-element");
		link.classList.remove("light-mode-element");
	})
	let borderLightElement = Array.from(document.getElementsByClassName("bordered-black"));
	borderLightElement.forEach((border) => {
		border.classList.add("bordered");
		border.classList.remove("bordered-black");
	})
  }
}

function setLogo(){
	// Calculate the distance between the element and the top of the page
	var distanceFromTop = sticky - window.scrollY;
	// console.log($("#mainlogo").offset().top); 
	// some reason this jumps up and down when using a value of higher than -0.03 below.
	// turns out it was due to using main logo offset which obviously changes. use sticky and scrollY instead.
	// console.log($(window).scrollTop());
	// console.log(distanceFromTop);
    // Calculate the translateY value based on the distance from the top
	var mainOffset = -2.9;
	logo = document.getElementById("mainLogo");
	if (logo != undefined){
		var containsLarge = logo.classList.contains("large");
		var containsLarger = logo.classList.contains("larger");
		if (containsLarge){
			var largeImageUp = -3.14;
			var multi = 1.75;
			if (containsLarger){
				var largeImageUp = -3.14;
				var multi = 1.98;
			}
		} else{
			var largeImageUp = 0;
			var multi = 1.18;
		}
	} else{
		var largeImageUp = 0;
		var multi = 1.18;
	}
	var offsetFromPosition = Math.min((-0.01 * distanceFromTop), 0);
	var translateYValue = offsetFromPosition + extramove * multi + largeImageUp + mainOffset;
	$("#mainLogo").css({ "transform": "translateY(" + translateYValue + "vw)" });
}

/*
function downArrow(){
	if (window.scrollY != 0){
		let scrollInits = Array.from(document.getElementsByClassName("scrollInit"));
		scrollInits.forEach((element) => {
			element.classList.add("scrollAnimate");
		})
	} else{
		let scrollInits = Array.from(document.getElementsByClassName("scrollInit"));
		scrollInits.forEach((element) => {
			element.classList.remove("scrollAnimate");
		})
	}

}
*/

$(window).scroll(function() {
	setLogo();
	// downArrow();
});

var extramove

$(document).ready(function(){
    $(document).mousemove(function(){
         if($("#mainLogo:hover").length != 0){
			extramove = 2.5;
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
		if (video != undefined){
			var content = Array.from(document.getElementsByClassName("content"));
			var frameToPlay = Math.round((window.scrollY/sticky)*225);
			var currentFrame = Math.min(frameToPlay,225);
			seekToFrame(currentFrame, 60);
		}
		if ((window.scrollY >= sticky && !window.mobileCheck())) {
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
		if  (video != undefined){
			stickyGiver();
			video.pause();
		}
	});
});

window.onload = function() {
	// Code to be executed after the entire page, including CSS, has been loaded
	navbar = document.getElementById("navbar");
	video = document.getElementById("topVideo");
	if (video == undefined){
		var content = Array.from(document.getElementsByClassName("content"));
		navbar.classList.add("sticky");
		content.forEach((el) => {
			el.classList.add("paddingtop");
		})
	}
	window.scrollTo(0, 0);
	$('.loader').css('display','none');
	extramove = 0;
	loadLogo();
	setTimeout(setLogo, 100);
	sticky = navbar.offsetTop;
  // Perform other initialization tasks, set up event handlers, etc.
};