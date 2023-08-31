function changeMode() {
  let element = document.body;
  let button = document.getElementById("lightButton");
  let content = document.getElementById("changeModeA");
  if (content && content.src.includes("lightswitchlight.png")) {
    content.src = "./static/assets/lightswitchdark.png";
    element.className = "light-mode";
    button.className = "lightOn";
  } else {
    content.src = "./static/assets/lightswitchlight.png";
    element.className = "dark-mode";
    button.className = "lightOff";
  }
}

$(window).scroll(function() {
	let width = screen.width;
	var wScroll = $(this).scrollTop();

  // Calculate the distance between the element and the top of the page
	var distanceFromTop = $("#mainlogo").offset().top - $(window).scrollTop();
	console.log(distanceFromTop);
    // Calculate the translateY value based on the distance from the top
	var translateYValue = -0.03 * (distanceFromTop);

// Check if the translateY value is negative (element is above the desired position)
	if (translateYValue > 0) {
		translateYValue = 0;
	}
	$("#mainlogo").css({ "transform": "translateY(" + translateYValue + "vw" + ")" });
});

document.addEventListener("DOMContentLoaded", function() {
	var navbar = document.getElementById("navbar");
	var sticky = navbar ? navbar.offsetTop : 0;

	function stickyGiver() {
		var content = Array.from(document.getElementsByClassName("content"));
		if (window.pageYOffset >= sticky) {
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
  });
});