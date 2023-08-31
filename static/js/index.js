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
	var wScroll = $(this).scrollTop();
	console.log($(window).scrollTop());
	if ($(window).scrollTop() < 1900) {
		$("#mainlogo").css({ "transform": "translateY(" + 0.02 * ($(window).scrollTop() - 1900) + "vw" + ")" });
		console.log("translateY(" + -0.01 * $(window).scrollTop() + "vw" + ")")
	} else {
		$("#mainlogo").css({ "transform": "translateY(0px)" });
	}
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