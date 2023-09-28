window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
var xPer = 0;
var yPer = 0;
var scrollPercent = 0.1;
var campfireVolume = 0;
var blackout = false;
var light = new Audio("static/assets/lightswitch/Switch.mp3");
var breaklight = new Audio("static/assets/lightswitch/Breaker.mp3");
if (document.getElementById("pageIsAbout") != undefined){
	var campfireaudio = new Audio("static/assets/lightswitch/CampfireAudio.mp3");
	campfireaudio.loop = true;
}

function changeMode() {
  let element = document.body;
  let button = document.getElementById("!0CHover");
  let content = document.getElementById("!0CHoverChild");
  if (!blackout){
	if (content && content.src.includes("lightswitchlight.png")) {
		// dark mode --> light mode
		var toPlay = light.cloneNode(true);
		toPlay.volume = 1.0;
		toPlay.play()
		content.src = "./static/assets/lightswitchdark.png";
		element.className = "light-mode";
		button.classList.add("lightOn");
		button.classList.remove("lightOff");
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
		let logoElement = Array.from(document.getElementsByClassName("clientlogo"));
		logoElement.forEach((logo) => {
			logo.classList.add("clientlogolight");
		})
	} else { // light mode --> dark mode
		spotlightTrigger();
		if(blackout){
			var toPlay = breaklight.cloneNode(true);
			toPlay.volume = 0.8;
			toPlay.play()
			button.classList.add("disabledswitch");
		} else{
			var toPlay = light.cloneNode(true);
			toPlay.volume = 1.0;
			toPlay.play()
		}
		content.src = "./static/assets/lightswitchlight.png";
		element.className = "dark-mode";
		button.classList.add("lightOff");
		button.classList.remove("lightOn");
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
		let logoLightElement = Array.from(document.getElementsByClassName("clientlogolight"));
		logoLightElement.forEach((logo) => {
			logo.classList.remove("clientlogolight");
		})
	  }
  	} else{
		var toPlay = breaklight.cloneNode(true);
		toPlay.volume = 0.8;
		toPlay.play()
	}
}

var triggeredRecently = false;
var recentTriggers = 0;

function spotlightTrigger(){
    if (triggeredRecently){
        recentTriggers++;
        // console.log(recentTriggers);
        triggeredRecently = true
        setTimeout(releaseTrigger.bind(null, recentTriggers), 2000);
    } else{
        recentTriggers = 1;
        triggeredRecently = true
        setTimeout(releaseTrigger.bind(null, recentTriggers), 2000);
    }
	if (recentTriggers == 3){
		blackOut();
	}
}

function releaseTrigger(lastTrigger){
    if (lastTrigger == recentTriggers){
        // console.log("Reset!");
        triggeredRecently = false;
    }
}

function blackOut(){
	var darkness = document.getElementById("blackout");
	blackout = true;
	if ( document.getElementById("pageIsAbout") != undefined ){
		var content = document.getElementById("hiddenvideo");
		content.play();
		content.classList.add("showblackout");
		campfireaudio.volume = campfireVolume * 0.6;
		campfireaudio.play();
	}
	darkness.classList.add("showblackout");
}

function updateSound(){
	if (document.getElementById("pageIsAbout") != undefined){
		// console.log(proxToCorner);
		// console.log("scrollpercent" + scrollPercent);
		var campfireVolume = (0.25 + (xPer / 1.3)) * (0.1 + (yPer / 1.12)) * (scrollPercent * Math.max(scrollPercent, 0.5) * Math.max(scrollPercent, 0.8));
		
		// console.log(campfireVolume);
		campfireaudio.volume = campfireVolume * 0.6;
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

function downArrow(){
	if(document.getElementById("pageIsGallery") == undefined){
		if (window.scrollY != 0){
			let arrow = document.getElementById("downArrow1Parent");
			arrow.classList.add("aos-animate");
			//let scrollInits = Array.from(document.getElementsByClassName("scrollInit"));
			//scrollInits.forEach((element) => {
			//	element.classList.add("scrollAnimate");
			//})
		} else{
			//let scrollInits = Array.from(document.getElementsByClassName("scrollInit"));
			//scrollInits.forEach((element) => {
			//	element.classList.remove("scrollAnimate");
			//})
		}
	}
}

///*
// Couldn't figure out how to get document's max scroll
function scrollCheck(){
	totalHeight = document.documentElement.scrollHeight - window.innerHeight;
	if (totalHeight - window.scrollY < 100){ // if too close to bottom of page (100 scroll), just animate all
		let aosInits = Array.from(document.getElementsByClassName("aos-init"));
		aosInits.forEach((element) => {
			element.classList.add("aos-animate"); 
		}) 
	} 
	/*
	else{
		let aosInits = Array.from(document.getElementsByClassName("aos-init"));
		aosInits.forEach((element) => {
		})
	}
	*/
}
//*/
$(window).scroll(function() {
	setLogo();
	downArrow();
	scrollCheck();
	var $this = $(this),
        $body = $('body');
	var scrollTotal = 0.1 + Math.min(($this.scrollTop() / ($body.height() - $this.height())));
    scrollPercent = Math.min(scrollTotal, 1);
	// console.log("scroll calc" + scrollPercent);
	updateSound();
	// console.log(document.documentElement.scrollHeight - window.innerHeight);
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

function displayLoaderText(){
	$('.loadertext').css('opacity','1');
	$('.loadertext').css('transform','translateY(0)');
	setTimeout(displayLoaderText2, 100);
}

function displayLoaderText2(){
	$('.loadertext2').css('opacity','1');
	$('.loadertext2').css('transform','translateY(0)');
}

document.addEventListener("DOMContentLoaded", function() {
	setTimeout(displayLoaderText, 5000);
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
			// console.log("hi");
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
	
	if (document.getElementById("pageIs404") != undefined){
		const element = document.getElementById("downArrow1Parent");
		element.remove();
	}
	loadLogo();
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
	// if (document.getElementById("pageIsPhotography") == undefined){
	// 		$('.loader').css('display','none');
	// }
	$('.loader').css('display','none');
	extramove = 0;
	sticky = navbar.offsetTop;
	setLogo();
	setTimeout(setLogo, 100);
  // Perform other initialization tasks, set up event handlers, etc.
};

const shadow = document.querySelector('#blackout');

document.addEventListener('mousemove', (e) => {
	if(document.getElementById("pageIsGallery") == undefined){
		let x = e.clientX;
		let y = e.clientY;
		xPer = Math.min((x / document.documentElement.clientWidth) + 0.14, 1);
		yPer = Math.min((y / document.documentElement.clientHeight) + 0.16, 1);
		let xShadow = x - (document.documentElement.clientWidth * 1.5);
		let yShadow =  y - (document.documentElement.clientHeight * 1.5);
		shadow.style.transform = 'translate(' + xShadow + 'px, ' + yShadow + 'px)';
		updateSound();

	}
})

function bindIFrameMousemove(iframe){ // allows the mouse pos to be taken while in iframe
	console.log('hi');
    if (document.getElementById("pageIsAbout") != undefined){
		iframe.contentWindow.addEventListener('mousemove', function(event) {
			var clRect = iframe.getBoundingClientRect();
			var evt = new CustomEvent('mousemove', {bubbles: true, cancelable: false});
			
			evt.clientX = event.clientX + clRect.left;
			evt.clientY = event.clientY + clRect.top;

			// console.log(evt);
			iframe.dispatchEvent(evt);
		});
	}
};
if ( document.getElementById("pageIsAbout") != undefined ){
	document.querySelector("iframe").addEventListener( "load", function(e) {
		var iframe = document.getElementById('phoneframe');
		bindIFrameMousemove(iframe)
	});
}